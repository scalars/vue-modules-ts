const program = require('inquirer');
const path = require('path');
const fs = require('fs');
const mustache = require('mustache');

// functions definitions
const getNames = (name, separator = '-') => {
    // TODO: validate first letter of component name starts whit lowercase
    const pascalCase = name.replace(/^[a-z]/, (char) => char.toUpperCase());
    const kebabCase = name.replace(/[A-Z]/g,
        (char, index) => index > 0 ? `${separator}${char.toLowerCase()}` : char.toLowerCase()
    );
    return {
        'PascalCase_component_name': pascalCase,
        'kebab-case_component_name': kebabCase,
        'camelCase_component_name' : name
    }
};

const getPathAndComponentName = (componentName) => {
    let folder = componentName.split('/');
    const name = folder.pop();
    if (folder.length > 0) {
        folder = folder.join('/');
    } else {
        folder = '.';
    }
    return { path: folder, name };
};

const getRendersMustache = (files, variables) => {
    return files.map((file) => {
        const fileObject = fs.readFileSync(file.path, 'utf-8');
        return {
            ...file,
            template: mustache.render(fileObject, variables)
        };
    });
};

const generateProject = (projectPath, projectName, templateFilesPath, mustacheRenderedFiles) => {
    const projectFolder = path.resolve(projectPath, projectName);
    // if (fs.existsSync(projectFolder)) {
    //     throw new Error(`Project ${projectFolder} already exists`);
    // }
    // fs.mkdirSync(path.resolve(projectPath, projectName), { recursive: true });
    // fs.mkdirSync(path.resolve(projectPath, projectName, 'src'));
    const templateFiles = fs.readdirSync(templateFilesPath);
    templateFiles.forEach((file) => {
        if(file !== 'src'){
            console.log('copy file', file);
            fs.copyFileSync(
                path.resolve(templateFilesPath, file), path.resolve(projectFolder, file)
            )
        }
    });
    const templateFilesSrc = fs.readdirSync(`${templateFilesPath}/src`);
    templateFilesSrc.forEach((file) => {
        console.log('copy file', file);
            fs.copyFileSync(
                path.resolve(`${templateFilesPath}/src`, file), path.resolve(`${projectFolder}/src`, file)
            )
    });
    mustacheRenderedFiles.forEach(file => fs.writeFileSync(path.resolve(projectFolder, file.copyPath), file.template))
};

const generateStory = (storyTemplate, folderStorybook, folderProject, component, names) => {
    // fs.mkdirSync(folderStorybook, { recursive: true });
    console.log(folderStorybook)
    const templateFile = fs.readFileSync(storyTemplate, 'utf-8');
    const renderedTemplate = mustache.render(templateFile, {
        ...names,
        component_path: component.path,
        relative_path: path.relative(folderStorybook, folderProject)
    });
    console.log('Names content:',names)
    fs.writeFileSync(path.resolve(`${folderStorybook}/${names['camelCase_component_name']}`, `${names['camelCase_component_name']}.stories.ts`), renderedTemplate);
};

//inquirer definition
program
    .prompt([
        {
            type: 'input',
            name: 'componentName',
            message: "input the component name",
            validate: function (value){
                const isCamelCase = value.match(/^[a-zA-Z0-9]+$/);
                return isCamelCase ? true : 'please enter a valid camel case name'
            },
        }
    ])
    .then( answers => {
        const componentName = answers.componentName;
        const MODULES_PATH = path.resolve(__dirname, '..', 'packages/modules');
        const STORIES_PATH = path.resolve(__dirname, '..', 'packages/storybook/stories');
        const component = getPathAndComponentName(componentName);
        const names = getNames(component.name);
        const pathMustacheFiles = path.resolve(__dirname, 'mustache');
        const pathTemplateFiles = path.resolve(__dirname, 'template');
        const storyTemplate = path.resolve(pathMustacheFiles, `component.stories.mustache`);
        const mustacheFiles = [
            {
                path: path.resolve(pathMustacheFiles, 'component.mustache'),
                copyPath: `src/components/${names.PascalCase_component_name}.vue`
            },
            {
                path: path.resolve(pathMustacheFiles, 'readme.mustache'),
                copyPath: `readme.md`
            },
            {
                path: path.resolve(pathMustacheFiles, 'package.mustache'),
                copyPath: 'package.json'
            },
            {
                path: path.resolve(pathMustacheFiles, 'index.d.mustache'),
                copyPath: 'index.d.ts'
            }
        ];

        fs.mkdirSync(`${MODULES_PATH}/${names.camelCase_component_name}/src/components`, { recursive: true });
        fs.mkdirSync(`${STORIES_PATH}/${names.camelCase_component_name}`, { recursive: true });

        const mustacheRenderedFiles = getRendersMustache(mustacheFiles, names);

        const projectPath = path.resolve(MODULES_PATH, component.path);
        generateProject(projectPath, names['kebab-case_component_name'], pathTemplateFiles, mustacheRenderedFiles);
        const storyPath = path.resolve(STORIES_PATH, component.path);
        generateStory(storyTemplate, storyPath, projectPath, component, names);

    })
    .catch( error => {
        console.log(error);
    })

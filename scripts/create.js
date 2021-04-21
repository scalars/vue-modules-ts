const program = require('inquirer');
const path = require('path');
const fs = require('fs');
const mustache = require('mustache');

// functions definitions

// get component name in different cases
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

// split folder and path to create directories
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


const generateProject = (projectFolder, templateFilesPath, mustacheRenderedFiles) => {
    const templateFiles = fs.readdirSync(templateFilesPath);
    console.log( '\x1b[38m%s\x1b[33m', 'Creating Files in:', projectFolder );
    templateFiles.forEach((file) => {
        if(file !== 'src'){
            console.log('\x1b[37m%s', file );
            fs.copyFileSync(
                path.resolve( templateFilesPath, file ), path.resolve( projectFolder, file )
            )
        }
    });
    const templateFilesSrc = fs.readdirSync( `${templateFilesPath}/src` );
    templateFilesSrc.forEach( ( file ) => {
        console.log('\x1b[37m%s', file );
            fs.copyFileSync(
                path.resolve( `${templateFilesPath}/src`, file ), path.resolve( `${projectFolder}/src`, file )
            )
    });
    mustacheRenderedFiles.forEach( file => fs.writeFileSync( path.resolve( projectFolder, file.copyPath ), file.template ) )
};

const generateStory = (storyTemplate, folderStorybook, projectPath, component, names) => {
    const templateFile = fs.readFileSync(storyTemplate, 'utf-8');
    const renderedTemplate = mustache.render(templateFile, {
        ...names,
        component_path: component.path,
        relative_path: path.relative(folderStorybook, projectPath)
    } );
    console.log( '\x1b[0m%s\x1b[33m', 'creating story in:', folderStorybook);
    fs.writeFileSync(path.resolve(`${folderStorybook}`, `${names['camelCase_component_name']}.stories.ts`), renderedTemplate);
    console.log('\x1b[37m%s', `${names['camelCase_component_name']}.stories.ts` );
};

//inquirer definition
program
    .prompt([
        {
            type: 'input',
            name: 'componentName',
            message: 'input the component name it can starts with a route example:' +
                'chat/chatInput creates chat/chat-input/[componentFiles]*',
            validate: function (value){
                const isCamelCase = value.match(/^[a-zA-Z0-9-\/]+$/);
                return isCamelCase ? true : 'please enter a valid camel case name'
            },
        }
    ])
    .then( answers => {
        const component = getPathAndComponentName(answers.componentName);
        const names = getNames(component.name);
        const MODULES_PATH = path.resolve(__dirname, '..', 'packages/modules');
        const STORIES_PATH = path.resolve(__dirname, '..', 'packages/storybook/stories');
        const pathMustacheFiles = path.resolve(__dirname, 'mustache');
        const pathTemplateFiles = path.resolve(__dirname, 'template');
        const storyTemplate = path.resolve(pathMustacheFiles, `component.stories.mustache`);
        const componentTemplate = [
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

        const projectPath = path.resolve(MODULES_PATH, component.path);
        const storyPath = path.resolve(STORIES_PATH, component.path);
        const projectFolder = path.resolve( projectPath, names['kebab-case_component_name'])
        const rootPath = path.resolve(__dirname, '..')
        const mustacheGeneratedProjectFiles
            = getRendersMustache(componentTemplate, { ...names, relativePath:path.relative( projectFolder, rootPath ) });

        if (fs.existsSync(projectFolder)) {
            throw new Error(`Project ${projectFolder} already exists`);
        }
        if (fs.existsSync(`${storyPath}/${names['kebab-case_component_name']}`)) {
            throw new Error(`Project ${storyPath} already exists`);
        }

        fs.mkdirSync(`${projectPath}/${names['kebab-case_component_name']}/src/components`, { recursive: true });
        generateProject(projectFolder, pathTemplateFiles, mustacheGeneratedProjectFiles);

        fs.mkdirSync(`${storyPath}/${names['kebab-case_component_name']}`, { recursive: true });
        generateStory(storyTemplate, `${storyPath}/${names['kebab-case_component_name']}`, projectPath, component, names);

    })
    .catch( error => {
        console.log(error);
    })

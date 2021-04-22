# Vue-modules-ts
### _The most dynamic vue modules package, Ever_

####Powered by:

[![madrov](https://i.ibb.co/Ct7RK4n/Group-2796.png)](https://madrov.com/)

Vue-modules-ts is a package that provides a lot of components for easy use and implementation, 
to use in your vue ts projects. In addition to that we have a tool that will allow you to create 
your own modules on an easy way.

## Installation
Use the package manager [yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/get-npm) to install foobar.
```bash
yarn install
```
## Usage
To generate a new component you just need to use the command bellow
```bash
yarn new 
```
after this a text will be displayed requesting the name of the new component 
```bash
? input the component name [componentName]
```
To consider, <span style="color: green"> [componentName] </span> will be written on 
[lowerCamelCase](https://wiki.c2.com/?LowerCamelCase), otherwise, it indicates that 
the component is not named correctly, blank spaces, hyphens, underscores or special 
characters are not accepted either

<span style="color: rgb(245,15,15)"> Incorrect name error: </span>

```bash
>> please enter a valid camelCase name
```

If the process runs successfully, the console will return the result 
with the respective files associated with the component

```bash
Creating Files in: /.../vue-modules-ts/packages/modules/example-component
.browserslistrc
.gitignore
babel.config.js
tsconfig.json
vue.config.js
App.vue
main.ts
shims-tsx.d.ts
shims-vue.d.ts
creating story in: /.../vue-modules-ts/packages/storybook/stories/example-component
exampleComponent.stories.ts
Done in 7721.58s.
batmanuser@batmanuser-PC:~/Documentos/Projects/vue-modules-ts$
```

### Nested Components
If you want to create a nested component inside another folder, 
you need to define the path as follows 

```bash
? input the component name [componentParentFolder]/[componentName]
```
in this case <span style="color: green"> [componentParentFolder] </span> is the main folder where the respective 
components belonging to that class of components are contained.

The expected results are similar to the previous process 

```bash
? input the component name buttons/badButtons
Creating Files in: /.../vue-modules-ts/packages/modules/buttons/bad-buttons
.browserslistrc
.gitignore
babel.config.js
tsconfig.json
vue.config.js
App.vue
main.ts
shims-tsx.d.ts
shims-vue.d.ts
creating story in: /.../vue-modules-ts/packages/storybook/stories/buttons/bad-buttons
badButtons.stories.ts
Done in 64.24s.
```

And that's it, your component is ready to be encoded.


## Implementation

To implement this component on your project you just need to install

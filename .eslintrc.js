module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended',
        '@vue/typescript/recommended'
    ],
    parserOptions: {
        "parser": "@typescript-eslint/parser",
        "project": "./tsconfig.json",
        "extraFileExtensions": [ ".vue" ],
        "ecmaFeatures": {
            "legacyDecorators": true
        }
    },
    rules: {
        "no-useless-escape": "off",
        "no-console": "off",
        "no-unused-vars": "off",
        "semi": [2, "always"],
        "indent": ["error", 4],
        "camelcase": "off",
        "no-async-promise-executor": "off",
        "vue/html-indent": ["error", 4],
        "vue/no-v-html": 0,
        "vue/max-attributes-per-line": ["error"],
        "vue/no-unused-components": "off",
        "vue/attributes-order": ["error"],
        "vue/singleline-html-element-content-newline": ["error"],
        "@typescript-eslint/no-useless-escape": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/restrict-plus-operands": "off",
        "@typescript-eslint/ban-ts-ignore": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-async-promise-executor": "off",
        "@typescript-eslint/indent": ["error", 4, {
            "FunctionDeclaration": {"parameters": "first"},
            "FunctionExpression": {"parameters": "first"}
        }],
        "@typescript-eslint/no-use-before-define": ["error", {
            "variables": true,
            "functions": true
        }],
        "@typescript-eslint/camelcase": "off",
        // Methods could not have more than 40 lines
        "max-lines-per-function": ["error", 40 ],
        // Files could not have more than 300 lines
        "max-lines": [ "error", 300 ],
        "object-curly-spacing": [ "error", "always" ],
        "block-spacing": [ "error", "always" ],
        "space-in-parens": [ "error", "always" ],
        "space-infix-ops": [ "error", { "int32Hint": true } ],
        "no-undef": "off"
    }
}

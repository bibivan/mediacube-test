module.exports = {
    root: true,
    extends: ["@nuxt/eslint-config", "plugin:prettier/recommended"],
    rules: {
        eqeqeq: ['error', 'always'],
        'no-new': 'error',
        'no-unused-expressions': 'error',
        'space-before-function-paren': ['error', {
            "anonymous": "always",
            "named": "never",
            "asyncArrow": "always"
        }],
        "vue/no-multiple-template-root": 0,
        "vue/attributes-order": ["error", {
            "order": [
                "DEFINITION",
                "LIST_RENDERING",
                "CONDITIONALS",
                "RENDER_MODIFIERS",
                "GLOBAL",
                ["UNIQUE", "SLOT"],
                "TWO_WAY_BINDING",
                "OTHER_DIRECTIVES",
                "OTHER_ATTR",
                "EVENTS",
                "CONTENT"
            ],
            "alphabetical": false
        }]
    }
};
module.exports = {
    env: {
        browser: true,
        node: true
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/vue3-recommended",
        "@vue/typescript/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript"
    ],
    overrides: [
        {
            "files": ["*.js", "*.ts"],
            "rules": {
                "sort-keys-fix/sort-keys-fix": "warn"
            }
        }
    ],
    parser: "vue-eslint-parser",
    parserOptions: {
        ecmaVersion: 2020,
        parser: "@typescript-eslint/parser"
    },
    plugins: [
        "@typescript-eslint",
        "sort-keys-fix",
        "import"
    ],
    root: true,
    rules: {
        "@typescript-eslint/type-annotation-spacing": ["error"],
        "array-bracket-spacing": ["error", "never"],
        "arrow-spacing": ["error"],
        "brace-style": ["error", "stroustrup"],
        "comma-dangle": ["error", "never"],
        "eol-last": ["error", "always"],
        "eqeqeq": ["error", "always"],
        "import/order": ["error"],
        "indent": ["error", 4],
        "key-spacing": ["error"],
        "keyword-spacing": ["error"],
        "no-multi-spaces": ["error"],
        "object-curly-spacing": ["error", "always"],
        "prefer-template": "error",
        "quotes": ["error", "double", { "allowTemplateLiterals": true }],
        "semi": ["error", "always"],
        "space-infix-ops": ["error"],
        "template-curly-spacing": ["error", "always"],
        "vue/html-indent": ["error", 4]
    },
    settings: {
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"]
        },
        "import/resolver": {
            "alias": {
                "extensions": [".js", ".ts"],
                map: [
                    ["@", "./src"]
                ]
            },
            "typescript": {}
        }
    }
};

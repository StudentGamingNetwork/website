import js from "@eslint/js";
import globals from "globals";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import stylistic from "@stylistic/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import sortKeysCustomOrder from "eslint-plugin-sort-keys-custom-order";

export default [
    js.configs.recommended,

    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: "module",
            parser: tsParser,
            parserOptions: {
                parser: tsParser,
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },

        plugins: {
            "@typescript-eslint": tseslint,
            "@stylistic": stylistic,
            "sort-keys-custom-order": sortKeysCustomOrder,
            import: importPlugin,
        },

        settings: {
            "import/parsers": {
                "@typescript-eslint/parser": [".ts", ".tsx"],
            },
            "import/resolver": {
                alias: {
                    extensions: [".js", ".ts"],
                    map: [["@", "./src"]],
                },
                typescript: {},
            },
        },

        rules: {
            "@stylistic/array-bracket-spacing": ["error", "never"],
            "@stylistic/arrow-spacing": ["error"],
            "@stylistic/brace-style": ["error", "stroustrup"],
            "@stylistic/comma-dangle": ["error", "never"],
            "@stylistic/eol-last": ["error", "always"],
            "@stylistic/indent": ["error", 4, { SwitchCase: 1 }],
            "@stylistic/key-spacing": ["error"],
            "@stylistic/keyword-spacing": ["error"],
            "@stylistic/no-multi-spaces": ["error"],
            "@stylistic/object-curly-spacing": ["error", "always"],
            "@stylistic/quotes": ["error", "double", { allowTemplateLiterals: true }],
            "@stylistic/semi": ["error", "always"],
            "@stylistic/space-in-parens": ["error", "never"],
            "@stylistic/space-infix-ops": ["error"],
            "@stylistic/template-curly-spacing": ["error", "always"],
            "@stylistic/member-delimiter-style": ["error"],
            "@stylistic/type-annotation-spacing": ["error"],

            eqeqeq: ["error", "always"],
            "prefer-template": "error",

            "import/no-unresolved": "error",
            "import/named": "error",
            "import/default": "error",
            "import/namespace": "error",
            "import/order": ["error"],

            "sort-keys-custom-order/object-keys": ["error", {
                orderedKeys: ["id", "_id", "name", "title", "start", "end"],
            }],
            "sort-keys-custom-order/type-keys": ["error", {
                orderedKeys: ["id", "_id", "name", "title"],
            }],
        }
    },
];

import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import importPlugin from 'eslint-plugin-import';
import sortKeysCustomOrder from 'eslint-plugin-sort-keys-custom-order';
import tseslint from '@typescript-eslint/eslint-plugin';
import stylistic from '@stylistic/eslint-plugin';
import globals from "globals";


export default [
    js.configs.recommended,
    ...vue.configs["flat/recommended"],

    {
        files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            parser: vueParser,
            parserOptions: {
                parser: tsParser,
                extraFileExtensions: ['.vue']
            },
            globals: {
                defineEmits: 'readonly',
                defineExpose: 'readonly',
                defineProps: 'readonly',
                withDefaults: 'readonly',
                ...globals.browser,
                ...globals.node
            }
        },
        plugins: {
            '@typescript-eslint': tseslint,
            '@stylistic': stylistic,
            vue,
            import: importPlugin,
            'sort-keys-custom-order': sortKeysCustomOrder
        },
        settings: {
            'import/parsers': {
                '@typescript-eslint/parser': ['.ts', '.tsx']
            },
            'import/resolver': {
                alias: {
                    map: [['@', './src']],
                    extensions: ['.js', '.ts']
                },
                typescript: {}
            }
        },
        rules: {
            '@stylistic/array-bracket-spacing': ['error', 'never'],
            '@stylistic/arrow-spacing': ['error'],
            '@stylistic/brace-style': ['error', 'stroustrup'],
            '@stylistic/comma-dangle': ['error', 'never'],
            '@stylistic/eol-last': ['error', 'always'],
            '@stylistic/indent': ['error', 4, { SwitchCase: 1 }],
            '@stylistic/key-spacing': ['error'],
            '@stylistic/keyword-spacing': ['error'],
            '@stylistic/no-multi-spaces': ['error'],
            '@stylistic/object-curly-spacing': ['error', 'always'],
            '@stylistic/quotes': ['error', 'double', { allowTemplateLiterals: true }],
            '@stylistic/semi': ['error', 'always'],
            '@stylistic/space-in-parens': ['error', 'never'],
            '@stylistic/space-infix-ops': ['error'],
            '@stylistic/template-curly-spacing': ['error', 'always'],
            '@stylistic/member-delimiter-style': ['error'],

            '@stylistic/type-annotation-spacing': ['error'],

            'eqeqeq': ['error', 'always'],
            'import/order': ['error'],
            'prefer-template': 'error',

            'sort-keys-custom-order/object-keys': ['error', {
                orderedKeys: [
                    'id', '_id', 'name', 'title',
                    'start', 'end', 'components',
                    'data', 'props', 'emits',
                    'computed', 'methods',
                    'none', 'default'
                ]
            }],
            'sort-keys-custom-order/type-keys': ['error', {
                orderedKeys: ['id', '_id', 'name', 'title']
            }],

            'vue/attributes-order': ['error', { alphabetical: true }],
            'vue/html-indent': ['error', 4]
        }
    }
];

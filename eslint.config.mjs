import pluginJs from '@eslint/js'
import pluginImport from 'eslint-plugin-import'
import pluginReact from 'eslint-plugin-react'
import globals from 'globals'
import tseslint from 'typescript-eslint'


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: [
      '**/*.{js,ts,tsx}',
    ],
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      'eslint-plugin-import': pluginImport,
    },
    settings: {
      'eslint-plugin-import/intenal-regex': '^[@\\.]/',
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'semi': ['warn', 'never'],
      'quotes': ['warn', 'single'],
      'no-trailing-spaces': 'warn',
      'eslint-plugin-import/order': ['error', { 'groups': ['builtin', 'external'], 'newlines-between': 'always', 'named': true, 'alphabetize': {'order': 'asc'} }],
    },
  },
]

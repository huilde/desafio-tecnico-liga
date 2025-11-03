import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import ts from '@typescript-eslint/eslint-plugin'
import prettier from 'eslint-config-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser,
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      '@typescript-eslint': ts,
    },
    extends: [
      js.configs.recommended,
      ts.configs.recommended,
      react.configs.recommended,
      reactHooks.configs['recommended-latest'],
      'prettier',
    ],
    rules: {

      indent: ['error', 2],
      '@typescript-eslint/indent': ['error', 2],

      quotes: ['error', 'single'],
      semi: ['error', 'always'],

      'react/react-in-jsx-scope': 'off',
    },
  },
])

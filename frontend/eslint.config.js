import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

/**
 * @see {https://github.com/antfu/eslint-config}
 */
export default antfu(
  {
    ignores: [
      'dist/',
      'node_modules/',
      'public/',
    ],

    stylistic: {
      commaDangle: 'always',
      jsx: true,
      indent: 2,
      semi: false,
      quotes: 'single',
      quoteProps: 'consistent-as-needed',
    },

    typescript: true,
    vue: true,

    ...compat.config({
      rules: {
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'node/prefer-global/process': 'off',
      },
    }),
  },

  {
    rules: {
      'no-alert': 'off',
      'no-console': 'off',
      'no-debugger': 'off',

      'style/brace-style': 'off',

      'vue/attributes-order': ['error', {
        alphabetical: true,
      }],

      'vue/max-attributes-per-line': ['error', {
        singleline: 3,
      }],

      'vue/no-mutating-props': 'off',
      'vue/one-component-per-file': 'off',
    },
  },
)

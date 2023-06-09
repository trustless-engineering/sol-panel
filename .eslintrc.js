module.exports = {
	env: {
		browser: true,
		node: true,
		es2021: true,
	},
	parserOptions: {
		ecmaVersion: 2022,
		sourceType: `module`,
		ecmaFeatures: {
			jsx: true,
		},
		project: './tsconfig.eslint.json',
	},
	extends: ['standard-with-typescript', 'plugin:react/recommended', 'next/core-web-vitals', 'prettier'],
	plugins: ['react', '@typescript-eslint', 'prettier', 'react-hooks'],
	globals: {
		cy: true,
		Cypress: true,
	},
	overrides: [
		{
			files: ['**/*.cy.tsx'],
			rules: {
				'@typescript-eslint/await-thenable': 'off',
			},
		},
	],
	rules: {
		'@next/next/no-html-link-for-pages': 'off',
		'react-hooks/exhaustive-deps': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/strict-boolean-expressions': 'off',
		'@typescript-eslint/no-misused-promises': 'off',
		'@typescript-eslint/restrict-template-expressions': ['error', { allowAny: true }],
	},
};

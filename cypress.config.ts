import { defineConfig } from 'cypress';

export default defineConfig({
	projectId: 'cm4syy',
	component: {
		specPattern: '**/*.cy.tsx',
		devServer: {
			framework: 'next',
			bundler: 'webpack',
		},
	},

	e2e: {
		path: 'cypress/e2e',
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
});

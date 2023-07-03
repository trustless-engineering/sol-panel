import Footer from './Footer';

describe('<Footer />', () => {
	it('renders', async () => {
		cy.mount(await (<Footer />));
	});
});

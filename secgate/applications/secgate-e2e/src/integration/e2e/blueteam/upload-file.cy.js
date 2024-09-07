/// <reference types="cypress" />

describe('Upload File as Blue Team', () => {
	const camp = 'blueteam';
	const fileName = 'gt.secgate';

	it('Upload File as Blue Team', () => {
		cy.uploadCampaignBlue(camp, fileName);
		cy.reload();
	});

	after(() => {
		cy.deleteCampaignGraphQL(camp);
	});
});

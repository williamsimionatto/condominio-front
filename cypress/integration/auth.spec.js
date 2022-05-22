/// <reference types="Cypress" />

describe('Authetication Use Case', () => {
	beforeEach(() => {
		cy.visit('/login')
	})

	it('should rendered login page', () => {
		cy.get('h1').should('contain', 'Login')
	})

	it('should login successfully', () => {
		cy.get('#email')
			.should('be.visible')
			.type(Cypress.env('localUser').email, { log: false, force: true })

		cy.get('#password')
			.should('be.visible')
			.type(Cypress.env('localUser').password, { log: false, force: true })

		cy.contains('button', 'Acessar').should('be.visible').click({ force: true })
	})

	it('should prevent login with invalid credentials', () => {
		cy.get('#email')
			.should('be.visible')
			.type('mail@mail.com', { log: false, force: true })

		cy.get('#password')
			.should('be.visible')
			.type('senha', { log: false, force: true })

		cy.contains('button', 'Acessar').should('be.visible').click({ force: true })
		cy.contains('h1', 'Login').should('be.visible')
	})
})
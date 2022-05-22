/// <reference types="Cypress" />

describe('Perfil Use Case', () => {
    beforeEach(() => {
        cy.login()
        cy.visit('/perfil');
    })

    it('should list perfis in a table', () => {
        cy.get('#nav-cad-perfil')
            .should('be.exist').click({ force: true });
        cy.get('table').should('be.visible');
    })
})
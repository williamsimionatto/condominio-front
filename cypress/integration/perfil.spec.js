/// <reference types="Cypress" />

describe('Perfil Use Case', () => {
    beforeEach(() => {
        cy.login()
        cy.visit('/perfil');
        cy.get('#nav-cad-perfil')
            .should('be.exist').click({ force: true });
    })

    it('should create a new perfil', () => {
        cy.get('#btnNovoRegistro').should('be.visible')
            .click({ force: true });

        cy.contains('button', 'Salvar')
            .should('be.visible')
            .should('be.disabled')

        cy.get('#name').should('be.visible')
            .type('Perfil Teste', { log: false, force: true })
            .should('have.value', 'Perfil Teste');

        cy.get('#sigla').should('be.visible')
            .type('TEST', { log: false, force: true })
            .should('have.value', 'TEST');

        cy.contains('button', 'Salvar')
            .should('be.visible')
            .should('not.be.disabled')
            .click({ force: true });
    })
})
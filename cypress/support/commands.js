Cypress.Commands.add('login', () => {
  cy.log(`Logging into ${Cypress.env('environment') ? Cypress.env('environment') : 'local'} environment`)
  
  if (Cypress.env('environment') === 'homolog') {
    Cypress.env('user', Cypress.env('homologUser'))
  } else if (Cypress.env('environment') === 'prod') {
    Cypress.env('user', Cypress.env('prodUser'))
  } else {
    Cypress.env('user', Cypress.env('localUser'))
  }
  
  cy.visit('/login', {timeout: 80000})

  cy.get('#email')
    .should('be.visible')
    .type(Cypress.env('user').email, { log: false, force: true })

  cy.get('#password')
    .should('be.visible')
    .type(Cypress.env('user').password, { log: false, force: true })

  cy.contains('button', 'Acessar')
    .should('be.visible')
    .click({ force: true })

  cy.get('.img-avatar', {timeout: 60000}).should('be.visible', { timeout: 60000 })
})
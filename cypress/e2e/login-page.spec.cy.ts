describe('Login Page', () => {
  it('visit login page', () => {
    cy.visit('/login')
    cy.get('input[formControlName="email"]').type('ruben@test.com')
    cy.get('input[formControlName="password"]').type('test1234')
    cy.get('#loginButton').click()
    cy.url().should('include', '/students')
  })
})
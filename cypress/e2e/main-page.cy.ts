describe('Redirection Test', () => {
  it('Header Btn should redirect to login if there is no logged user', () => {
    cy.visit('/')
    cy.get('#headerBtn').click()
    cy.url().should('include', '/login')
  })
  it('Visit admin should redirect to login if user is not logged', () => {
    cy.visit('/admin')
    cy.url().should('include', '/login')
  })
  it('Visit students should redirect to login if user is not logged', () => {
    cy.visit('/students')
    cy.url().should('include', '/login')
  })
})
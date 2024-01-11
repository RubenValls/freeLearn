describe('Login Page', () => {

  it('charge login page', () => {
    cy.visit('/login')
   
  })

  it('login with student', () => {
    cy.visit('/login')
    cy.get('input[formControlName="email"]').type('ruben@test.com')
    cy.get('input[formControlName="password"]').type('test1234')
    cy.get('#loginButton').click()
    cy.url().should('include', '/students')
  })
  it('login with admin', () => {
    cy.visit('/login')
    cy.get('input[formControlName="email"]').type('admin@freelearn.com')
    cy.get('input[formControlName="password"]').type('admin2023')
    cy.get('#loginButton').click()
    cy.url().should('include', '/admin')
  })
})
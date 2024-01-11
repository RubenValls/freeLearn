describe('Singin page', () => {
  it('Passes if the user does not exist and is logged in. ', () => {
    cy.visit('/login')
    cy.get('mat-button-toggle[value="signin"]').click();
    cy.get('input[formControlName="email"]').type('newUser@freelearn.com')
    cy.get('input[formControlName="password"]').type('newuser1234')
    cy.get('input[formControlName="confirmPassword"]').type('newuser1234', { force: true });
    cy.get('button[mat-raised-button][color="primary"][type="submit"]').contains('Sign In').click({ force: true });
    cy.url().should('include', '/students')
  })

})

describe('Singin page', () => {
  it('Passes if user already exists and registration fails', () => {
    cy.visit('/login')
    cy.get('mat-button-toggle[value="signin"]').click();
    cy.get('input[formControlName="email"]').type('newUser@freelearn.com')
    cy.get('input[formControlName="password"]').type('newuser1234')
    cy.get('input[formControlName="confirmPassword"]').type('newuser1234', { force: true });
    cy.get('button[mat-raised-button][color="primary"][type="submit"]').contains('Sign In').click({ force: true });
    cy.url().should('include', '/login')
  })
})
describe('Singin page', () => {
  it('passes  if the user already not exist', () => {
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
  it('passes if the user already exist', () => {
    cy.visit('/login')
    cy.get('mat-button-toggle[value="signin"]').click();
    cy.get('input[formControlName="email"]').type('newUser@freelearn.com')
    cy.get('input[formControlName="password"]').type('newuser1234')
    cy.get('input[formControlName="confirmPassword"]').type('newuser1234', { force: true });
    cy.get('button[mat-raised-button][color="primary"][type="submit"]').contains('Sign In').click({ force: true });
    cy.url().should('include', '/login')
  })
})
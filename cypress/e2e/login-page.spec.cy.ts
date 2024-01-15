describe('Login Page', () => {
  it('charge login page', () => {
    cy.visit('/login');
  });

  it('login with student', () => {
    cy.visit('/login');
    cy.get('input[formControlName="email"]').type('ruben@test.com');
    cy.get('input[formControlName="password"]').type('test12345');
    cy.get('#loginButton').click();
    cy.url().should('include', '/students');
  });
  it('login with admin', () => {
    cy.visit('/login');
    cy.get('input[formControlName="email"]').type('admin@freelearn.com');
    cy.get('input[formControlName="password"]').type('admin2023');
    cy.get('#loginButton').click();
    cy.url().should('include', '/admin');
  });


  it('charge login with user in localstorage', () => {
    const userInfo = {
      rememberMe: true,
      displayName: 'Ismaelito Monito',
      id: 'tjMlugI5n4i5OJzgFOYD',
      photoURL:
        'https://images.ecestaticos.com/Ra4ESFsrZzz-sAsa-T09x84jB7w=/1x1:1081x1498/1200x1200/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Ff44%2Fc0c%2Fd81%2Ff44c0cd8101e8a28657b088d57bd438d.jpg',
      authUid: 'wIzCuQxUkbRXS928DDTHipNOjVa2',
      role: 'student',
      uid: 'isma@test.com',
      favorites: [],
      providerId: 'password',
      phoneNumber: '666666666',
      email: 'isma@test.com',
    };
    cy.window().then((win) => win.sessionStorage.setItem('userInfo', JSON.stringify(userInfo)))
   
    cy.window().its('sessionStorage.userInfo').should('equal', JSON.stringify(userInfo))
   
    cy.visit('/login');
    cy.url().should('include', '/students')
    cy.window().then((win) => win.sessionStorage.removeItem('userInfo'))

  });
});

describe('Should create, edit and delete entities', () => {

  it('login with admin', () => {
    cy.visit('/login');
    cy.get('input[formControlName="email"]').type('admin@freelearn.com');
    cy.get('input[formControlName="password"]').type('admin2023');
    cy.get('#loginButton').click();
    cy.url().should('include', '/admin');

    //techs

    cy.visit('/admin/technologies');

    cy.get('#add-technology-button').should('exist').click({ force: true });

    cy.contains('Add technology').click()
    cy.get('input[formControlName="name"]').type('test-cypress-$$');       
    cy.get('textarea[formControlName="description"]').type('test-cypress-$$');
    cy.get('input[formControlName="imagePath"]').type('test-cypress' , { force: true });
    cy.get('#add-technology').click({ force: true });


    cy.get('table[mat-table]').should('exist', { duration: 10000 });      
    cy.get('table[mat-table]').contains('td', 'test-cypress-$$').click(); 

    cy.get('.detail-modal').should('exist');
    cy.get('textarea[formControlName="description"]').should('exist');
    cy.get('textarea[formControlName="description"]').should('exist').then(($textarea) => {
        cy.wait(500); 
        cy.wrap($textarea).clear({ force: true }).type('test-cypress-$$-edit', { force: true });
      });         


    cy.get('.detail-modal').contains('button', 'Edit').click( { force: true });
    cy.get('.update-modal').should('exist');
    cy.get('.update-modal').contains('button', 'Update').click( { force: true });

    cy.get('.detail-modal').should('exist');

    cy.get('.detail-modal').contains('button', 'Delete').click( { force: true });
    cy.get('.delete-modal').should('exist');
    cy.get('.delete-modal').contains('button', 'Delete').click( { force: true }); 
    cy.wait(2000);
    // instructors
    cy.visit('/admin/instructors');
    cy.wait(2000);
    cy.get('#add-instructor-button').should('exist')
    cy.wait(2000);
    cy.contains('Add instructor').click()
    cy.get('input[formControlName="name"]').type('test-cypress-$$');
    cy.get('input[formControlName="imagePath"]').type('test-cypress', { force: true });
    cy.get('div[formGroupName="socialMedia"]').should('exist').then(($div) => {
      cy.wait(1000);
      cy.wrap($div).find('input[formControlName="linkedin"]').type('test-cypress-$$', { force: true });
      cy.wrap($div).find('input[formControlName="twitter"]').type('test-cypress-$$', { force: true });
      cy.wrap($div).find('input[formControlName="youtube"]').type('test-cypress-$$', { force: true });
      cy.wrap($div).find('input[formControlName="web"]').type('test-cypress-$$', { force: true });
    });
    cy.wait(1000);
    cy.get('#add-instructor').click({ force: true });
  
    cy.get('table[mat-table]').should('exist');
    cy.get('table[mat-table]').contains('td', 'test-cypress-$$').click();
    cy.get('.detail-modal').should('exist');
 
     cy.get('.detail-modal').should('exist');

    cy.get('.detail-modal').contains('button', 'Delete').click( { force: true });
    cy.wait(1000);
    cy.get('.delete-modal').should('exist');
    cy.get('.delete-modal').contains('button', 'Delete').click( { force: true }); 
    cy.wait(2000);
    //courses
    cy.visit('/admin/courses');
    cy.wait(2000);
    cy.get('#add-course-button').should('exist');
    cy.contains('Add course').click();
    cy.get('input[formControlName="name"]').type('test-cypress-$$');
  
    cy.get('input[formControlName="imageUrl"]').type('test-cypress', { force: true });
    cy.get('textarea[formControlName="description"]').type('test-cypress-$$');
    cy.get('input[formControlName="introductionURL"]').type('test-cypress-$$');
   

    cy.get('mat-select[formControlName="techs"]').click();
    cy.get('mat-option').contains('Angular').click({ force: true });
    cy.wait(2000);
    cy.get('body').click(0, 0);
    cy.get('mat-select[formControlName="instructorId"]').click();
    cy.get('mat-option').contains('JAB').click({ force: true});
    cy.get('body').click(0, 0);
    cy.get('#add-course').click({ force: true });

    cy.get('table[mat-table]').should('exist');
    cy.get('table[mat-table]').contains('td', 'test-cypress-$$').click();
    cy.get('.detail-modal').should('exist');

    cy.get('.detail-modal').contains('button', 'Delete').click( { force: true });
    cy.get('.delete-modal').should('exist');
    cy.get('.delete-modal').contains('button', 'Delete').click( { force: true }); 
    cy.wait(2000);

    cy.get('#admin-navbar').should('exist');
    cy.wait(2000);
    cy.get('#log-out-btn').click();
  });



});
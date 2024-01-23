describe('Techs Page', () => {

    it('login with admin', () => {
        cy.visit('/login');
        cy.get('input[formControlName="email"]').type('admin@freelearn.com');
        cy.get('input[formControlName="password"]').type('admin2023');
        cy.get('#loginButton').click();
        cy.url().should('include', '/admin');

        cy.visit('/admin/technologies');
        //create techs
        cy.get('#add-technology-button').should('exist').click({ force: true });
        cy.contains('Add technology').click()
        cy.get('input[formControlName="name"]').type('test-cypress-$$');       
        cy.get('textarea[formControlName="description"]').type('test-cypress-$$');
        cy.get('input[formControlName="imagePath"]').type('test-cypress' , { force: true });
        //cy.get('#add-technology').click({ force: true });

        //get tech and open modal
        cy.get('table[mat-table]').should('exist');      
        cy.get('table[mat-table]').contains('td', 'test-cypress-$$').click(); 
         
        cy.get('.detail-modal').should('exist');
        cy.get('textarea[formControlName="description"]').should('exist');
        cy.get('textarea[formControlName="description"]').should('exist').then(($textarea) => {
            cy.wait(500); // Espera medio segundo
            cy.wrap($textarea).clear({ force: true }).type('test-cypress-$$-edit', { force: true });
          });         

        //update tech
        cy.get('.detail-modal').contains('button', 'Edit').click( { force: true });
        cy.get('.update-modal').should('exist');
        cy.get('.update-modal').contains('button', 'Update').click( { force: true });
        //delete tech   
        cy.get('.detail-modal').should('exist');
        cy.get('.detail-modal').contains('button', 'Delete').click( { force: true });
        cy.get('.delete-modal').should('exist');
        cy.get('.delete-modal').contains('button', 'Delete').click( { force: true }); 


      
      });

   
   
});
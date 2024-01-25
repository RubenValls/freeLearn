describe('Should browse the web and rate the courses and modify personal information ', () => {
    it('login with student', () => {
        cy.visit('/login');
        cy.get('input[formControlName="email"]').type('mayra@freelearn.com');
        cy.get('input[formControlName="password"]').type('mayra2023');
        cy.get('#loginButton').click();
        cy.url().should('include', '/students');
        cy.visit('/students/home');
        cy.wait(2000);
        cy.get('.scrollbar').should('exist').then(($div) => {
  
            cy.wrap($div).scrollTo('75%', '20%', { easing: 'linear' })
            cy.wait(1000);
            cy.wrap($div).scrollTo('75%', '35%', { easing: 'linear' })
            cy.wait(1000);
            cy.wrap($div).scrollTo('75%', '45%', { easing: 'linear' })
            cy.wait(1000);
            cy.wrap($div).scrollTo('75%', '65%', { easing: 'linear' })
            cy.wait(1000);
            cy.wrap($div).scrollTo('75%', '85%', { easing: 'linear' })
            cy.wait(1000);
            cy.wrap($div).scrollTo('75%', '95%', { easing: 'linear' })
        });
      

        cy.wait(2000);
        cy.visit('/students/courses');
        cy.wait(2000);
        cy.get('.course').should('exist').then(($div) => {
            cy.get('.course').scrollTo('75%', '20%', { easing: 'linear' })
            cy.wait(1000);
            cy.get('.course').scrollTo('75%', '45%', { easing: 'linear' })
            cy.wait(1000);
            cy.get('.course').scrollTo('75%', '65%', { easing: 'linear' })
            cy.wait(1000);
            cy.get('.course').scrollTo('75%', '95%', { easing: 'linear' })
        });
        cy.wait(3000);
        cy.get('.courses-cards').eq(0).click()
        cy.wait(1000);


        // cy.get('.header-container').should('exist').then(($div) => {
        //     cy.wait(1000);
        //     cy.wrap($div).find('.d-block ').should('exist').then(($div2) => {             

        //         cy.get('.bi-heart-fill').then(($heartFill) => {
        //             if ($heartFill.length > 0) { // si existe el elemento con la clase 'bi-heart-fill'
        //               $heartFill.click(); // hace clic en el elemento
        //             } else {
        //               cy.get('.bi-heart').click(); // si no existe, hace clic en el elemento con la clase 'bi-heart'
        //             }
        //           });



        //     });
        //     // cy.wrap($div).find('.bi').click({ force: true });

        // });


        
        cy.get('.course').scrollTo('75%', '95%', { easing: 'linear' })
        cy.wait(1000);

 

        cy.get('#lessons-course').eq(0).click();
        cy.wait(1000);
        cy.get('.course').scrollTo('75%', '95%', { easing: 'linear' })
        // pendiente clickar en el video






    });

});
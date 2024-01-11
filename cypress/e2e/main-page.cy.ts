describe('Main Page Component', () => {
  it('should render all components of main page', () => {
    cy.visit('/')
    cy.get('app-main-page-header')
    cy.get('app-first-section-main')
    cy.get('app-second-section-main')
    cy.get('app-third-section-main')
    cy.get('app-fourth-section-main')
    cy.get('app-main-page-footer')
  })
})

describe('Redirection Test', () => {
  
  it('Header Btn should redirect to login if there is no logged user', () => {
    cy.visit('/')
    cy.get('#headerBtn').click()
    cy.url().should('include', '/login')
  })
  
  it('First Section Btn should redirect to login if there is no logged user', () => {
    cy.visit('/')
    cy.get('#firstSectionBtn').click()
    cy.url().should('include', '/login')
  })
  
  it('Third Section Btn should redirect to login if there is no logged user', () => {
    cy.visit('/')
    cy.get('#thirdSectionBtn').click()
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
  
  it('Visit login from main page and come back to main page', () => {
    cy.visit('/')
    cy.get('#headerBtn').click()
    cy.url().should('include', '/login')
    cy.get('button[aria-label="Return to home button"]').click()
    cy.url().should('include', '/')
  })

  it('Redirect to /students if student is logged in after click in main page button', () => {
    cy.visit('/')
    
    const studentUser = {
      "providerId": "password",
      "role": "student",
      "phoneNumber": "",
      "photoURL": "",
      "authUid": "jbJjD2d6dMXN48s64udFMvZWvOb2",
      "rememberMe": true,
      "uid": "ruben@test.com",
      "email": "ruben@test.com",
      "displayName": "Rubencillo",
      "id": "r0ZRopUpvbOfAHUFH5OE",
      "favorites": []
    }

    cy.window().then((win) => win.sessionStorage.setItem('userInfo', JSON.stringify(studentUser)))
    
    cy.window().its('sessionStorage.userInfo').should('equal', JSON.stringify(studentUser))
    
    cy.get('#headerBtn').click()
    cy.url().should('include', '/students')
  })

  it('Redirect to /admin if admin is logged in after click in main page button', () => {
    cy.visit('/')
    
    const adminUser = {
      "displayName": "",
      "role": "admin",
      "photoURL": "",
      "authUid": "2In9EO38ujTu2fVsPE8CoFdHfqo2",
      "email": "student@student.com",
      "providerId": "password",
      "rememberMe": true,
      "favorites": [],
      "id": "11u2ZDQb6rWGsMJX62Mo",
      "uid": "student@student.com",
      "phoneNumber": ""
  }

    cy.window().then((win) => win.sessionStorage.setItem('userInfo', JSON.stringify(adminUser)))
    
    cy.window().its('sessionStorage.userInfo').should('equal', JSON.stringify(adminUser))
    
    cy.get('#headerBtn').click()
    cy.url().should('include', '/admin')
  })
})

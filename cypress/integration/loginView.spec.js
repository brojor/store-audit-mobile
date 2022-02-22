/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
beforeEach(() => {
  cy.visit('/');
});

describe('Login', () => {
  it('User not logged in is being redirected to the login page', () => {
    cy.url().should('eq', `${Cypress.config().baseUrl}/#/login`);
  });
  it('Login page is display correctly', () => {
    cy.get('.logo').should('exist');
    cy.get('form input[name=username]').should('exist');
    cy.get('form input[name=password]').should('exist');
    cy.get('form input[type=submit]').should('exist');
  });
  it('Displays the correct error message when the username is missing', () => {
    cy.get('input[type=submit]').click();
    cy.contains('.error-message', 'Zadejte prosím uživetelské jméno');
  });
  it('The error message disappears when input is focused', () => {
    cy.get('input[type=submit]').click();
    cy.get('.error-message').should('exist');
    cy.get('input[name=username]').focus();
    cy.get('.error-message').should('not.exist');
  });
  it('Displays the correct error message when the password is missing', () => {
    cy.get('input[name=username]').type('abcd');
    cy.get('input[type=submit]').click();
    cy.contains('.error-message', 'Zadejte prosím heslo');
  });
  it('The error message disappears when start typing password', () => {
    cy.get('input[name=username]').type('abcd');
    cy.get('input[type=submit]').click();
    cy.get('.error-message').should('exist');
    cy.get('input[name=password]').type('efgh');
    cy.get('.error-message').should('not.exist');
  });
  it('Displays the correct error message when the entered credentials are incorrect', () => {
    cy.get('input[name=username]').type('abcd');
    cy.get('input[name=password]').type('efgh');
    cy.get('input[type=submit]').click();
    cy.contains('.error-message', 'Neplatné přihlašovací údaje');
  });
  it('After entering the correct credencials is user redirected to "/" route', () => {
    cy.get('input[name=username]').type('kaspav');
    cy.get('input[name=password]').type('heslo');
    cy.get('input[type=submit]').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/#/`);
  });
  it('After entering the correct credencials is the authorization token set to Axios instance ', () => {
    cy.get('input[name=username]').type('kaspav');
    cy.get('input[name=password]').type('heslo');
    cy.get('input[type=submit]').click();
    cy.window().then((win) => {
      cy.wait(50).then(() => {
        expect(win.$axiosInstance.defaults.headers.common).to.have.property('Authorization');
        const { Authorization } = win.$axiosInstance.defaults.headers.common;
        const [firstPart, seccondPart] = Authorization.split(' ');
        expect(firstPart).to.equal('Bearer');
        expect(seccondPart.length).to.be.greaterThan(1);
      });
    });
  });
  it('After entering the correct credencials is user authenticated', () => {
    cy.get('input[name=username]').type('kaspav');
    cy.get('input[name=password]').type('heslo');
    cy.get('input[type=submit]').click();
    cy.window().then((win) => {
      cy.wait(50).then(() => {
        cy.wrap(win.$vueApp.$store.getters.isAuthenticated).should('be.ok');
      });
    });
  });
});

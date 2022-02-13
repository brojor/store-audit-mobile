describe('The Home Page', () => {
  it('Redirect to "only mobile view" if visited from desktop', () => {
    cy.visit('/'); // change URL to match your dev URL
    cy.contains('p', 'Tato aplikace je určena pouze pro mobilní zařízení!');
  });
  it('Displays login page if visited from mobile', () => {
    cy.viewport(550, 750);
    cy.visit('/'); // change URL to match your dev URL
    cy.url().should('include', '/login');
  });
  it('Login correctly', () => {
    cy.viewport(550, 750);
    cy.visit('/'); // change URL to match your dev URL
    cy.get('input[name=username]').type('kaspav');
    cy.get('input[name=password]').type('heslo');
    cy.get('button').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/#/');
  });
});

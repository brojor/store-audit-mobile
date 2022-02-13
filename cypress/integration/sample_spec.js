describe('The Home Page', () => {
  it('Redirect to "only mobile view" if visited from desktop', () => {
    cy.viewport(1920, 1080);
    cy.visit('/'); // change URL to match your dev URL
    cy.contains('p', 'Tato aplikace je určena pouze pro mobilní zařízení!');
  });
  it('Displays login page if visited from mobile', () => {
    cy.visit('/'); // change URL to match your dev URL
    cy.url().should('include', '/login');
  });
  it('Login correctly', () => {
    cy.visit('/'); // change URL to match your dev URL
    cy.get('input[name=username]').type('kaspav');
    cy.get('input[name=password]').type('heslo');
    cy.get('button').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/#/');
  });
  it('redirect to categoryView', () => {
    cy.get('#app > main > div:nth-child(3) > div').click();
    cy.url().should('include', '/category/2');
  });
  it('swipeRight', () => {
    cy.get('#app > div > div.categories > div:nth-child(1)')
      .trigger('touchstart', {
        touches: [{ clientX: 0 }],
      })
      .trigger('touchmove', { touches: [{ clientX: 150 }] })
      .trigger('touchend', { force: true });
  });
});

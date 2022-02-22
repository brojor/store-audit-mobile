it('Redirect to "only mobile view" if visited from desktop', () => {
  cy.viewport(1920, 1080);
  cy.visit('/');
  cy.contains('p', 'Tato aplikace je určena pouze pro mobilní zařízení!');
});

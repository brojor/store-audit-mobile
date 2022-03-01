// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {
  const { serverUrl } = Cypress.config();
  cy.intercept({
    method: 'GET',
    url: `${serverUrl}/stores`,
  }).as('getStores');

  cy.intercept({
    method: 'GET',
    url: `${serverUrl}/category-names`,
  }).as('getCategoryNames');

  cy.request({
    method: 'POST',
    url: `${serverUrl}/auth/login`,
    body: {
      username: 'kaspav',
      password: 'heslo',
    },
  }).then(({ body: { success, token } }) => {
    if (!success) {
      throw new Error('Nepodařilo se získat token');
    }
    localStorage.setItem('token', token);
  });
});

Cypress.Commands.add('logout', () => {
  cy.window().then((win) => {
    win.$vueApp.$store.dispatch('logout');
  });
});

Cypress.Commands.add('swipeRight', (selector) => {
  cy.get(selector)
    .as('point')
    .trigger('touchstart', {
      touches: [{ clientX: 0 }],
    })
    .trigger('touchmove', { touches: [{ clientX: 150 }] })
    .trigger('touchend', { force: true });
});

Cypress.Commands.add('swipeLeft', (selector, text = 'Some problem description..') => {
  cy.get(selector)
    .trigger('touchstart', {
      touches: [{ clientX: 0 }],
    })
    .trigger('touchmove', { touches: [{ clientX: -150 }] })
    .trigger('touchend', { force: true });
  cy.get('textarea').type(text);
  cy.get('#submitModalBtn').click();
});

describe('The Home Page', () => {
  it('Redirect to "only mobile view" if visited from desktop', () => {
    cy.viewport(1920, 1080);
    cy.visit('/');
    cy.contains('p', 'Tato aplikace je určena pouze pro mobilní zařízení!');
  });
  it('Displays login page if visited from mobile', () => {
    cy.visit('/');
    cy.url().should('include', '/login');
  });
});

describe('Login', () => {
  it('Login page is display correctly', () => {
    cy.get('.logo');
    cy.get('form').find('input[name=username]');
    cy.get('form').find('input[name=password]');
    cy.get('form').find('input[type=submit]');
  });
  it('Displays the correct error message when the username is missing', () => {
    cy.get('input[type=submit]').click();
    cy.contains('.error-message', 'Zadejte prosím uživetelské jméno');
  });
  it('The error message disappears when input is focused', () => {
    cy.get('input[name=username]').focus();
    cy.get('.error-message').should('not.exist');
  });
  it('Displays the correct error message when the password is missing', () => {
    cy.get('input[name=username]').type('abcd');
    cy.get('input[type=submit]').click();
    cy.contains('.error-message', 'Zadejte prosím heslo');
  });
  it('The error message disappears when start typing password', () => {
    cy.get('input[name=password]').type('e');
    cy.get('.error-message').should('not.exist');
  });
  it('Displays the correct error message when the entered credentials are incorrect', () => {
    cy.get('input[name=password]').type('fgh');
    cy.get('input[type=submit]').click();
    cy.contains('.error-message', 'Neplatné přihlašovací údaje');
  });
  it('A user with the correct credentials can log in', () => {
    cy.get('input[name=username]').type('{selectall}{del}kaspav');
    cy.get('input[name=password]').type('{selectall}{del}heslo');
    cy.get('input[type=submit]').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/#/`);
  });
});

describe.skip('popis', () => {
  it('redirect to categoryView', () => {
    cy.get('#app > main > div:nth-child(3) > div').click();
    cy.url().should('include', '/category/2');
  });
  it('swipeRight', () => {
    cy.get('#app > div > div.categories > div:nth-child(1)')
      .as('point')
      .find('svg')
      .should('have.attr', 'name')
      .and('eq', 'unfilled');
    cy.get('@point')
      .trigger('touchstart', {
        touches: [{ clientX: 0 }],
      })
      .trigger('touchmove', { touches: [{ clientX: 150 }] })
      .trigger('touchend', { force: true });
    cy.get('@point')
      // .children()
      // .eq(0)
      .find('svg')
      .should('have.attr', 'name')
      .and('eq', 'accepted');

    cy.window().then((win) => {
      expect(win.__app__.$store.state.results.C02P01.accepted).to.be.true;
    });
  });
  // it('accept all points', () => {
  //   cy.get('.point').each(($el) => {
  //     cy.wrap($el)
  // .trigger('touchstart', {
  //   touches: [{ clientX: 0 }],
  // })
  // .trigger('touchmove', { touches: [{ clientX: 150 }] })
  // .trigger('touchend', { force: true });
  //   });
  // });
});

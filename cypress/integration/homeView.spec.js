let categories;

beforeEach(() => {
  cy.login();
  cy.visit('/');
  cy.wait(['@getStores', '@getCategoryNames']);

  cy.fixture('categories').then(($categories) => {
    categories = $categories;
  });
});

// afterEach(() => {
//   cy.logout();
// });

describe('HomeView is displayed correct', () => {
  it('Header is displayed correct', () => {
    cy.contains('.total-score', '0.00%');
    cy.get('.logo-container').contains('Store audit');
    cy.get('.logout').should('exist');
    console.log('cats: ', categories);
  });
  it('Main section is displayed correct', () => {
    cy.get('#selectedStore').should('exist');
    cy.get('.category')
      .should('has.length', 11)
      .each((category, i) => {
        cy.wrap(category).contains('span.score-perc', '0%');
        cy.wrap(category).contains('.category-name', categories[i]);
      });
    cy.contains('button', 'Odeslat');
  });
});

describe('After clicking on log out', () => {
  beforeEach(() => {
    cy.get('.logout-icon').click();
  });

  it('User is redirected to the login route', () => {
    cy.url().should('eq', `${Cypress.config().baseUrl}/#/login`);
  });
  it('User not authenticated', () => {
    cy.window().then((win) => {
      cy.wait(50).then(() => {
        cy.wrap(win.$vueApp.$store.getters.isAuthenticated).should('eq', false);
      });
    });
  });
  it('Token is removed from axios instance', () => {
    cy.window().then((win) => {
      expect(win.$axiosInstance.defaults.headers.common).to.not.have.property('Authorization');
    });
  });
  it('Local Storage is clear', () => {
    cy.window().then((win) => {
      expect(win.localStorage).has.not.property('token');
      expect(win.localStorage).has.not.property('seed');
      expect(win.localStorage).has.not.property('selectedStoreId');
    });
  });
});

describe('Click on category', () => {
  it('User is redirected to categoryView', () => {
    cy.get('#category-1').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/#/category/1`);
  });
});

describe('Clicking the submit button', () => {
  it('opens a warning modal if not all points are filled in', () => {
    cy.get('.modal-title').should('not.exist');
    cy.get('.btn').click();
    cy.get('.modal-title').contains('Nedokončená hodnocení');
  });
  it('Sends results to backend and show ok message, when all points are filled in', () => {
    cy.window().then((win) => {
      const { results } = win.$vueApp.$store.state;
      Object.keys(results).forEach((categoryPointId) => {
        win.$vueApp.$store.commit('WRITE_STATUS', {
          accepted: true,
          categoryPointId,
        });
      });
      cy.get('#sendResults').click();
      cy.contains('.modal-title', 'Dokončeno');
      cy.contains('.modal-message', 'Výsledky auditu byly úspěšně uloženy do databáze');
    });
  });
  it('Displays an error message when trying to submit results twice in the same month', () => {
    cy.window().then((win) => {
      const { results } = win.$vueApp.$store.state;
      Object.keys(results).forEach((categoryPointId) => {
        win.$vueApp.$store.commit('WRITE_STATUS', {
          accepted: true,
          categoryPointId,
        });
      });
      cy.get('#sendResults').click();
      cy.contains('.modal-title', 'Chyba');
      cy.contains('.modal-message', 'V této prodejně byl již tento měsíc audit proveden.');
    });
  });
});

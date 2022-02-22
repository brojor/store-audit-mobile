/* eslint-disable no-unused-expressions */
beforeEach(() => {
  cy.login();
  cy.visit('/');
  cy.wait(['@getStores', '@getCategoryNames']);
  cy.visit('/#/category/1');
});

describe('Displaying', () => {
  it('categoryView is displayed correctly', () => {
    cy.contains('.category-name', 'Před prodejnou, vstup do prodejny');
    cy.get('#available-score').contains('Max. score : 60');
    cy.get('#achieved-score').contains('Dosažené score: 0');
    cy.get('#perc-fulfillment').contains('Splněno na 0%');
    cy.get('.point').should('has.length', 6);
    cy.get('#prev-category').should('be.disabled');
    cy.get('#next-category').should('be.not.disabled');
    cy.get('button.home');
  });
  it('All points are marked as unfilled', () => {
    cy.get('.point').each(($el) => {
      cy.wrap($el)
        .find('svg')
        .should('have.attr', 'name')
        .and('eq', 'unfilled');
    });
  });
});
describe('actions', () => {
  it('swipeRight will make the point accepted', () => {
    cy.swipeRight('#C01P01');
    cy.get('#C01P01')
      .find('svg')
      .should('have.attr', 'name')
      .and('eq', 'accepted');

    cy.window().then((win) => {
      expect(win.$vueApp.$store.state.results.C01P01.accepted).to.be.true;
    });
  });
  it('swipeLeft will make the point rejected', () => {
    cy.swipeLeft('#C01P02', 'Popis problému u bodu 2');

    cy.get('#C01P02')
      .find('svg')
      .should('have.attr', 'name')
      .and('eq', 'rejected');
    cy.window().then((win) => {
      const { C01P02 } = win.$vueApp.$store.state.results;
      expect(C01P02.accepted).to.be.false;
      expect(C01P02.comment).to.eq('Popis problému u bodu 2');
    });
  });
  it('Accepted point can be changed to an rejected point', () => {
    cy.swipeRight('#C01P01');
    cy.get('#C01P01')
      .find('svg')
      .should('have.attr', 'name')
      .and('eq', 'accepted');
    cy.swipeLeft('#C01P01', 'Lorem ipsum');
    cy.get('#C01P01')
      .find('svg')
      .should('have.attr', 'name')
      .and('eq', 'rejected');
    cy.window().then((win) => {
      const { C01P01 } = win.$vueApp.$store.state.results;
      expect(C01P01.accepted).to.be.false;
      expect(C01P01.comment).to.eq('Lorem ipsum');
    });
  });
  it('Rejected point can be changed to an accepted point', () => {
    cy.swipeLeft('#C01P02');
    cy.get('#C01P02')
      .find('svg')
      .should('have.attr', 'name')
      .and('eq', 'rejected');
    cy.swipeRight('#C01P02');
    cy.get('#C01P02')
      .find('svg')
      .should('have.attr', 'name')
      .and('eq', 'accepted');
  });
  it('Accepted point is accepted even after page reload', () => {
    cy.swipeRight('#C01P01');
    cy.reload();
    cy.get('#C01P01')
      .find('svg')
      .should('have.attr', 'name')
      .and('eq', 'accepted');
  });

  it('Percentages in the status bar are displayed correctly', () => {
    cy.get('#available-score').contains('Max. score : 60');
    cy.get('#achieved-score').contains('Dosažené score: 0');
    cy.get('#perc-fulfillment').contains('Splněno na 0%');
  });

  it('accept all even points, reject odd', () => {});
  it('Percentages are correctly recalculated in the status bar', () => {
    cy.get('.point').each(($el, $index) => {
      if ($index % 2) {
        cy.swipeLeft(`#${$el[0].id}`);
      } else {
        cy.swipeRight(`#${$el[0].id}`);
      }
    });
    cy.get('#available-score').contains('Max. score : 60');
    cy.get('#achieved-score').contains('Dosažené score: 38');
    cy.get('#perc-fulfillment').contains('Splněno na 63%');
  });
});

describe('Move on to the next category', () => {
  beforeEach(() => {
    cy.get('#next-category').click();
  });
  it('change URL', () => {
    cy.url().should('include', '/category/2');
  });
  it('should change the category title', () => {
    cy.contains('.category-name', 'V prodejně');
  });
  it('both buttons should be enabled', () => {
    cy.get('#prev-category').should('be.not.disabled');
    cy.get('#next-category').should('be.not.disabled');
  });
  it('should change the number of items in the category', () => {
    cy.get('.point').should('has.length', 8);
  });
  it('should change percentages in the status bar', () => {
    cy.get('#available-score').contains('Max. score : 80');
    cy.get('#achieved-score').contains('Dosažené score: 0');
    cy.get('#perc-fulfillment').contains('Splněno na 0%');
  });
  it('Clicking on the previous button redirects back to category 1', () => {
    cy.get('#prev-category').click();
    cy.url().should('include', '/category/1');
    cy.contains('.category-name', 'Před prodejnou, vstup do prodejny');
    cy.get('#prev-category').should('be.disabled');
    cy.get('#next-category').should('be.not.disabled');
  });
});

describe('Click on Home button', () => {
  it('redirects to Home View', () => {
    cy.get('button.home').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/#/`);
  });
});

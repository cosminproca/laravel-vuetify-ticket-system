describe('Login', () => {
  before(() => {
    cy.refreshDatabase().seed();
  });

  context('with invalid credentials', () => {
    it('requires a valid email address', () => {
      cy.visit('/');

      cy.get('input[data-automation="email"]').type('testing');
      cy.contains('valid');
    });

    it('requires a password', () => {
      cy.visit('/');

      cy.get('input[data-automation="email"]').type('test@example.com');
      cy.get('input[data-automation="password"]').focus().blur();

      cy.contains('required');
    });

    it('requires the correct email', () => {
      cy.visit('/');

      cy.get('input[data-automation="email"]').type('test@example.com');
      cy.get('input[data-automation="password"]').type('password');
      cy.get('button[data-automation="submit_button"]')
        .contains('Login')
        .click();

      cy.contains('invalid');
    });

    it('requires the correct password', () => {
      cy.visit('/');

      cy.get('input[data-automation="email"]').type('test.admin@example.com');
      cy.get('input[data-automation="password"]').type('testing');
      cy.get('button[data-automation="submit_button"]')
        .contains('Login')
        .click();

      cy.contains('Invalid');
    });
  });

  context('with valid credentials', () => {
    it('requires the correct password', () => {
      cy.visit('/');

      cy.get('input[data-automation="email"]').type('test.admin@example.com');
      cy.get('input[data-automation="password"]').type('password');
      cy.get('button[data-automation="submit_button"]')
        .contains('Login')
        .click();

      cy.contains('Home');
    });
  });
});

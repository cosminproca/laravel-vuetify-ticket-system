describe('Register', () => {
  before(() => {
    cy.refreshDatabase().seed();
  });

  context('with invalid credentials', () => {
    it('requires a valid email address', () => {
      cy.visit('/register');

      cy.get('input[data-automation="email"]').type('testing');
      cy.contains('valid');
    });

    it('requires a password', () => {
      cy.visit('/register');

      cy.get('input[data-automation="email"]').type('test@example.com');
      cy.get('input[data-automation="password"]').focus().blur();

      cy.contains('required');
    });

    it('requires the same password', () => {
      cy.visit('/register');

      cy.get('input[data-automation="email"]').type('test@example.com');
      cy.get('input[data-automation="password"]').type('testing');
      cy.get('input[data-automation="password_confirmation"]').type(
        'testinggg'
      );

      cy.contains('match');
    });
  });

  context('with valid credentials', () => {
    it('requires the good inputs', () => {
      cy.visit('/register');

      cy.get('input[data-automation="email"]').type('testing_123@example.com');
      cy.get('input[data-automation="password"]').type('password');
      cy.get('input[data-automation="password_confirmation"]').type('password');
      cy.get('button[data-automation="submit_button"]')
        .contains('Register')
        .click();

      cy.contains('Home');
    });
  });
});

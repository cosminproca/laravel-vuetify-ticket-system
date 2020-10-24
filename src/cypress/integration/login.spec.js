describe('Login', () => {
  /*  before(() => {
    cy.refreshDatabase().seed();
  });*/

  context('with invalid credentials', () => {
    it('requires a valid email address', () => {
      cy.visit('/');

      cy.get('input[type="email"]').type('testing');
      cy.contains('valid');
    });

    it('requires a password', () => {
      cy.visit('/');

      cy.get('input[type="email"]').type('test@example.com');
      cy.get('input[type="password"]').focus().blur();

      cy.contains('required');
    });

    it('requires the correct password', () => {
      cy.visit('/');

      cy.get('input[type="email"]').type('test@example.com');
      cy.get('input[type="password"]').type('testing');
      cy.get('button').contains('Login').click();

      cy.contains('Invalid');
    });
  });

  context('with valid credentials', () => {
    it('requires the correct password', () => {
      cy.visit('/');

      cy.get('input[type="email"]').type('test@example.com');
      cy.get('input[type="password"]').type('password');
      cy.get('button').contains('Login').click();

      cy.contains('Home');
    });
  });
});

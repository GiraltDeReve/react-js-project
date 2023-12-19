describe('Authentication', () => {
    it('should log in and log out successfully', () => {
      // Visiter la page de login
      cy.visit('/login');
  
      // Remplir le formulaire de login
      cy.get('#login').type('MONLOGIN');
      cy.get('#password').type('MONPASSWORD');
      cy.get('button[type="submit"]').click();
  
      // Vérifier que nous sommes redirigés vers la page d'accueil
      cy.url().should('eq', 'http://localhost:3000/');
  
      // Vérifier que le bouton de déconnexion est présent
      cy.contains('Déconnexion').should('be.visible');
  
      // Cliquer sur le bouton de déconnexion
      cy.contains('Déconnexion').click();
  
      // Vérifier que le bouton de déconnexion n'est plus présent
      cy.contains('Déconnexion').should('not.exist');
    });
  });
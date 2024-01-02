import HelloWorld from './HelloWorld.vue';

describe('props 傳遞', () => {
  it('msg 應顯示 Hello', () => {
    cy.mount(HelloWorld, {
      props: {
        msg: 'Hello Cypress',
      },
    });
    cy.get('[data-test="title"]').should('have.text', 'Hello Cypress');
  });
});

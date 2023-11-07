import HelloWorld from './HelloWorld.vue';

describe('元件測試', () => {
  it('props設定', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(HelloWorld, {
      props: {
        msg: 'Hello1',
      },
    });
    cy.get('[data-test="title"]').should('have.text', 'Hello1');
  });
});

describe("Tesztelési Bolt - E2E tesztek", () => {
  before(() => {
    cy.viewport("ipad-2");
    cy.visit("https://test.marso.dev/");
  });

  it("Vásárlási folyamat", () => {
    // Kosárba teszem gomb működése //
    cy.get("[data-block-name='woocommerce/product-button']")
      .first()
      .find("button")
      .click();

    // Tovább a kosárba //
    cy.get("[data-block-name='woocommerce/product-button']")
      .first()
      .find("span[data-wc-bind--hidden='!state.displayViewCart']")
      .click();

    // 3 termék hozzáadása a kosárhoz //
    cy.get(".wc-block-components-quantity-selector__button--plus").click();
    cy.get(".wc-block-components-quantity-selector__button--plus").click();
    cy.get(".wc-block-components-quantity-selector__button--plus").click();
    cy.wait(3000);

    // FREESHIPPING promóciós kód beírása //
    cy.get(".wc-block-components-panel__button").type("FREESHIPPING");
    cy.wait(3000);
    cy.get(
      "#wc-block-components-totals-coupon__form > .wc-block-components-button"
    ).click();
    cy.get(".wc-block-cart__submit-container").click();

    // tovább a bejelentkezéshez //
    cy.get(":nth-child(4) > :nth-child(2) > a").click();

    // random generált jelszó és email a regisztrációhoz //
    const email = `firstnamelastname${Cypress._.random(1, 9999)}@aol.com`;
    cy.get("#reg_email").type(email);
    const password = `myPassIs%${Cypress._.random(1000, 9999)}!`;
    cy.get("#reg_password").type(password);
    cy.get(":nth-child(5) > button").click();

    // tovabb a kosarhoz //
    cy.get('[data-block-name="woocommerce/mini-cart"] > button').click();
    cy.get(
      ".wp-block-woocommerce-mini-cart-checkout-button-block > .wc-block-components-button__text"
    ).click();

    // rossz szallitasi cim //
    cy.get("#shipping-country").select("Románia");
    cy.get("#shipping-first_name").type("First");
    cy.get("#shipping-last_name").type("Last");
    cy.get("#shipping-postcode").clear().type("400275");
    cy.get("#shipping-city").clear().type("Kolozsvár");
    cy.get("#shipping-address_1").clear().type("Horia út 41");
    cy.get("#shipping-state").select("Kolozsvár");
    cy.get("#shipping-phone").type("06209664650");
    cy.get(".wc-block-components-checkout-place-order-button__text").click();

    // jo szallitasi cim //
    cy.get("#shipping-country").select("Magyarország", { force: true });
    cy.wait(1000);
    cy.get("#shipping-postcode").clear().type("4241");
    cy.get("#shipping-city").clear().type("Bocskaikert");
    cy.get("#shipping-address_1").clear().type("Bodai út 4");
    cy.get("#shipping-state").select("Hajdú-Bihar");
    cy.get(".wc-block-components-checkout-place-order-button__text").click();
  });
});

describe("Form test", () => {
  it("can fill the form", () => {
    cy.visit("/");
    cy.get("form"); //go and grab form element in the page

    //using css selector to select the input element and typing in it and checking it value for correctness
    //if you want to learn more about assertions like should and get, visit https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Assertions
    cy.get('input[name="name"]').type("Ankit").should("have.value", "Ankit");

    cy.get('input[name="email"]')
      .type("ankit@dev.com")
      .should("have.value", "ankit@dev.com");

    cy.get("textarea")
      .type("what's on your mind?")
      .should("have.value", "what's on your mind?");

    //create virtual server
    cy.server();
    cy.route({
      url: "/users/**",
      method: "POST",
      response: { status: "Saved", code: 401 },
    });

    cy.get("form").submit();
    cy.contains("Saved");
  });
});

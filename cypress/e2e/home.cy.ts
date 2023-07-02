describe("/", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("loads", () => {});

  it("has the correct CTA title", () => {
    cy.get("h1.text-5xl").contains("SOL Panel");
  });
});

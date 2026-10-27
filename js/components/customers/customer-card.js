class CustomerCard extends HTMLElement {
  connectedCallback() {
    if (this.querySelector(".customer-card")) return;

    const tags = [...this.querySelectorAll(":scope > span")];
    const benefits = this.querySelector(":scope > ul");

    this.innerHTML = `
      <article class="customer-card">
        <div class="customer-card__header">
          <div class="customer-card__icon" aria-hidden="true">
            <img class="customer-card__icon-image" alt="" />
          </div>
          <a class="customer-card__button btn btn--secondary">Produtos</a>
        </div>
        <h2 class="customer-card__title"></h2>
        <p class="customer-card__text"></p>
        <h3 class="customer-card__subtitle">Serviços indicados</h3>
        <div class="customer-card__tags"></div>
        <ul class="customer-card__list"></ul>
      </article>
    `;

    this.querySelector(".customer-card__icon-image").src =
      this.getAttribute("icon") ?? "";
    for (const tag of tags) {
      tag.className = "customer-card__tag";
      this.querySelector(".customer-card__tags").append(tag);
    }
    if (benefits) this.querySelector(".customer-card__list").append(...benefits.children);

    this.querySelector(".customer-card__button").href =
      this.getAttribute("product-href") ?? "/pages/404.html";
    this.querySelector(".customer-card__title").textContent =
      this.getAttribute("heading") ?? "";
    this.querySelector(".customer-card__text").textContent =
      this.getAttribute("description") ?? "";
  }
}

customElements.define("customer-card", CustomerCard);

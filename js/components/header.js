class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="header">
        <div class="header__container">
        
          <!-- Brand Logo / Home Link -->
          <a href="/" class="header__brand" aria-label="TechPro - Página Inicial">
            <img
              src="/assets/images/common/techpro-logo.png"
              alt="Logotipo da TechPro"
              class="header__logo"
            />
          </a>

          <!-- Main Navigation Menu -->
          <div class="header__menu-wrapper" id="header-menu">
            <nav class="header__nav" aria-label="Navegação principal">
              <!-- Close Button inside Sidebar -->
              <button class="header__close-btn" type="button" aria-label="Fechar menu">
                <img
                  src="/assets/icons/blue-x.svg"
                  alt=""
                  class="header__close-icon"
                />
              </button>

              <ul class="header__list">
                <li class="header__item">
                  <a class="header__link" href="/">Home</a>
                </li>
                <li class="header__item">
                  <a class="header__link" href="/pages/services.html">Serviços</a>
                </li>
                <li class="header__item">
                  <a class="header__link" href="/pages/customers.html">Clientes</a>
                </li>
                <li class="header__item">
                  <a class="header__link" href="/pages/institutional.html">
                    Institucional
                  </a>
                </li>
                <li class="header__item">
                  <a class="header__link" href="/pages/contact.html">Contato</a>
                </li>
              </ul>

              <!-- Call to Action Button -->
              <a class="header__button btn btn--primary" href="/pages/contact.html">
                Solicitar orçamento
              </a>
            </nav>
          </div>

          <!-- Hamburger Button for smaller screens -->
          <button
            class="header__hamburguer"
            type="button"
            aria-label="Abrir menu"
            aria-expanded="false"
            aria-controls="header-menu"
          >
            <img
              src="/assets/icons/blue-hamburguer.svg"
              alt=""
              class="header__hamburguer-icon"
            />
          </button>
        </div>
      </header>
    `;

    // Menu elements for modal on smaller screens
    const hamburguerBtn = this.querySelector(".header__hamburguer");
    const menuWrapper = this.querySelector(".header__menu-wrapper");
    const closeBtn = this.querySelector(".header__close-btn");

    const setMenuOpen = (isOpen) => {
      menuWrapper.classList.toggle("is-open", isOpen);
      hamburguerBtn.setAttribute("aria-expanded", String(isOpen));
    };

    // Open sidebar on hamburger click
    hamburguerBtn.addEventListener("click", () => {
      setMenuOpen(true);
    });

    // Close sidebar on 'X' button click
    closeBtn.addEventListener("click", () => {
      setMenuOpen(false);
    });

    // Close sidebar when clicking outside (on the dark backdrop overlay)
    menuWrapper.addEventListener("click", (event) => {
      if (event.target === menuWrapper) {
        setMenuOpen(false);
      }
    });

    // Close sidebar on Escape key
    this.ownerDocument.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuWrapper.classList.contains("is-open")) {
        setMenuOpen(false);
        hamburguerBtn.focus();
      }
    });
  }
}

customElements.define("site-header", SiteHeader);

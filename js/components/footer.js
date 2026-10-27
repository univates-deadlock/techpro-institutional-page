class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="footer">
        <div class="footer__container">

          <!-- Newsletter Form -->
          <form class="footer__form" id="newsletter-form">
            <div class="footer__email-wrapper" aria-hidden="true">
              <img
                src="/assets/icons/white-mail.svg"
                alt=""
                class="footer__mail"
              />
            </div>

            <div class="footer__inputs-wrapper">
              <h2 class="footer__inputs-text">Receba nossas ofertas e novidades!</h2>
              <div class="footer__inputs-button">
                <input
                  class="footer__input"
                  type="text"
                  name="name"
                  placeholder="Seu nome"
                  aria-label="Seu nome"
                  required
                />
                <input
                  class="footer__input"
                  type="email"
                  name="email"
                  placeholder="Seu e-mail"
                  aria-label="Seu e-mail"
                  required
                />
                <button
                  class="footer__button btn btn--secondary"
                  type="submit"
                >
                  Cadastrar
                </button>
              </div>
            </div>
          </form>

          <!-- Info Sections & Navigation -->
          <div class="footer__info">

            <!-- Institutional Links -->
            <nav class="footer__info-section" aria-label="Institucional">
              <h3 class="footer__info-section-subtitle">Institucional</h3>
              <a class="footer__info-section-text" href="/pages/institutional.html">Sobre a TechPro</a>
              <a class="footer__info-section-text" href="/pages/institutional.html">Quem somos</a>
              <a class="footer__info-section-text" href="/pages/institutional.html">História</a>
            </nav>

            <!-- Customer Service & Hours -->
            <div class="footer__info-section">
              <h3 class="footer__info-section-subtitle">Atendimento</h3>
              <span class="footer__info-section-text">Email</span>
              <a
                href="https://wa.me/5551993948340?text=Ol%C3%A1%2C%20tudo%20bem%3F"
                target="_blank"
                rel="noopener noreferrer"
                class="footer__info-section-text"
              >
                +55 51 99394-8340
              </a>
              <span class="footer__info-section-text">Segunda a sexta das 08:15 as 18:00</span>
              <span class="footer__info-section-text">Sábado das 08:30 as 12:00</span>
            </div>

            <!-- Usage Policies -->
            <nav class="footer__info-section" aria-label="Políticas de uso">
              <h3 class="footer__info-section-subtitle">Políticas de uso</h3>
              <a class="footer__info-section-text" href="/pages/404.html">Termos de uso</a>
              <a class="footer__info-section-text" href="/pages/404.html">Política de entrega</a>
              <a class="footer__info-section-text" href="/pages/404.html">Política de trocas e devoluções</a>
              <a class="footer__info-section-text" href="/pages/404.html">Políticas de pagamento</a>
            </nav>

            <!-- Social Media & Contact Channels -->
            <nav class="footer__info-section" aria-label="Canais de comunicação">
              <h3 class="footer__info-section-subtitle">Canais de comunicação</h3>
              <a
                class="footer__info-section-text"
                href="https://www.youtube.com/@WelkSpilier"
                target="_blank"
                rel="noopener noreferrer"
              >
                Youtube - Welk Spilier | TechPro
              </a>
              <a
                class="footer__info-section-text"
                href="https://br.linkedin.com/in/welk-spilier-0885981aa"
                target="_blank"
                rel="noopener noreferrer"
              >
                Linkedin - Welk Spilier
              </a>
              <a
                class="footer__info-section-text"
                href="https://www.instagram.com/techprors/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram - @techprors
              </a>
              <a
                class="footer__info-section-text"
                href="https://www.facebook.com/techprors/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook - TechPro - Segurança Eletrônica e Automação
              </a>
            </nav>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define("site-footer", SiteFooter);

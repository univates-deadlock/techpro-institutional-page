class ContactForm extends HTMLElement {
  connectedCallback() {
    if (this.form) return;

    this.form = this.querySelector("form");
    if (!this.form) return;

    this.status = this.querySelector(".form__status");
    this.fallback = this.querySelector(".form__fallback");
    this.submitButton = this.querySelector('[type="submit"]');

    this.form.addEventListener("submit", this.handleSubmit);
    this.form.addEventListener("input", this.handleInput);
    this.form.addEventListener("change", this.handleInput);
    this.submitButton.disabled = false;
  }

  disconnectedCallback() {
    if (!this.form) return;

    this.form.removeEventListener("submit", this.handleSubmit);
    this.form.removeEventListener("input", this.handleInput);
    this.form.removeEventListener("change", this.handleInput);
    this.submitButton.disabled = true;
    this.form = null;
  }

  handleInput = (event) => {
    if (typeof event.target.setCustomValidity === "function") {
      event.target.setCustomValidity("");
    }
    this.status.textContent = "";
    this.status.hidden = true;
    this.fallback.hidden = true;
    this.fallback.removeAttribute("href");
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const fields = this.form.elements;
    const name = fields.namedItem("name");
    const telephone = fields.namedItem("telephone");
    const email = fields.namedItem("email");
    const description = fields.namedItem("obs");
    const customerType = fields.namedItem("customer_type");

    for (const field of [name, telephone, email, description]) {
      field.value = field.value.trim();
    }

    name.setCustomValidity(
      name.value.length < 2 ? "Informe seu nome com pelo menos dois caracteres." : "",
    );

    const phoneDigits = telephone.value.replace(/\D/g, "");
    const hasValidPhone =
      /^[+\d\s().-]+$/.test(telephone.value) &&
      phoneDigits.length >= 10 &&
      phoneDigits.length <= 15;
    telephone.setCustomValidity(
      hasValidPhone ? "" : "Informe um telefone válido com DDD. Ex.: (51) 99394-8340.",
    );

    if (!this.form.reportValidity()) return;

    const message = [
      "Olá! Gostaria de solicitar um orçamento à TechPro.",
      "",
      `Nome: ${name.value}`,
      `Telefone / WhatsApp: ${telephone.value}`,
      `E-mail: ${email.value}`,
      `Tipo de cliente: ${customerType.value ? customerType.selectedOptions[0].textContent : "Não informado"}`,
    ];

    if (description.value) message.push("", `Mensagem: ${description.value}`);

    const url = new URL(this.form.action);
    url.searchParams.set("text", message.join("\n"));
    this.fallback.href = url.href;
    this.fallback.hidden = false;
    this.status.textContent =
      "Mensagem preparada. Revise e confirme o envio no WhatsApp. Se a conversa não abrir, use o link abaixo.";
    this.status.hidden = false;

    try {
      window.open(url.href, "_blank", "noopener,noreferrer");
    } catch {
      this.status.textContent =
        "Não foi possível abrir a conversa automaticamente. Use o link abaixo e confirme o envio no WhatsApp.";
    }
  };
}

customElements.define("contact-form", ContactForm);

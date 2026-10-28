<div align="center">

<img src="assets/images/common/techpro-logo.png" alt="TechPro logo" width="420">

<h1>TechPro</h1>

<p>Institutional website · Electronic security and automation</p>

<p><strong>Laboratório de Programação para Internet · Univates · 2026B</strong></p>

<p><a href="README.md">Português</a> · English</p>

</div>

---

An institutional website developed as an academic project at Univates to present TechPro, its electronic security, AI automation, access control, maintenance, and electrical infrastructure solutions, along with customer segments, company background, and direct contact channels.

## Implementation and technical decisions

- **Plain HTML, CSS, and JavaScript:** runs directly in the browser without frameworks, npm dependencies, or a front-end compilation step.
- **Native Web Components and ES modules:** reusable custom elements in `js/components/`, centrally registered through `js/main.js`.
- **Modular CSS and Design Tokens:** global tokens for colors, typography, spacing, radius, and shadows in `css/variables.css`, base rules in `css/global.css`, shared components in `css/components/`, and page-specific styles in `css/pages/`, following BEM naming, `.is-*` state classes, and primary breakpoints at `1280px`, `890px`, and `600px`.
- **Static routing and 404 page:** the entry point `index.html` redirects to `/pages/home.html`, and assets use root-relative paths. Links to unpublished subpages or policies point to `pages/404.html`, which Caddy also serves automatically on HTTP `404` errors.
- **Docker, Docker Compose, and Caddy:** the `Dockerfile` packages the static files with `caddy:2-alpine` listening internally on `:8080` with `zstd`/`gzip` compression (`Caddyfile`). `compose.yaml` binds `127.0.0.1:8080:8080`, configures a restart policy and HTTP health check, and attaches the container to the external `deadlock_edge` network (alias `techpro-site`) behind a shared HTTPS reverse proxy.
- **Continuous Integration (CI):** `.github/workflows/ci.yml` validates required files, the Docker Compose configuration, and the container image build on pull requests and pushes to `main`.

The `Rubik` font (Google Fonts) and the embedded map on the contact page require internet access.

## Project structure

```text
techpro-institutional-page/
├── assets/
│   ├── icons/          # Vector icons (SVG)
│   └── images/         # Logos, photos, and illustrations grouped by section
├── css/
│   ├── components/     # Reusable styles (buttons, header, footer, cards, CTAs)
│   ├── pages/          # Page-specific stylesheets
│   ├── global.css      # Reset, base layout, utilities, and imports
│   └── variables.css   # Design tokens (colors, typography, spacing, shadows)
├── js/
│   ├── components/     # Native Web Components and shared helpers
│   └── main.js         # Entry point registering custom elements
├── pages/              # Application HTML pages
├── Caddyfile           # Internal Caddy configuration (:8080, compression, and 404 handling)
├── Dockerfile          # Container image based on caddy:2-alpine
├── compose.yaml        # Docker Compose orchestration, healthcheck, and edge network
└── index.html          # Root redirect to /pages/home.html
```

### Available pages

| File | Description |
| :--- | :--- |
| `pages/home.html` | Home page featuring company overview, target audiences, services, differentiators, and quote CTA. |
| `pages/services.html` | Detailed service catalog (maintenance, alarms, AI automation, access control, and cameras) and service workflow. |
| `pages/customers.html` | Customer segments, product-by-profile comparison table, and featured service gallery. |
| `pages/industry.html` | Dedicated industrial solutions page covering perimeter monitoring, license plate reading, thermal cameras, and automation. |
| `pages/institutional.html` | Company background, key metrics, mission, vision, values, and leadership statement. |
| `pages/contact.html` | Direct contact channels, interactive quote request form, and embedded location map. |
| `pages/404.html` | Custom 404 error page with quick navigation shortcuts to main sections. |

### Web Components

- **Global layout and shared sections:** `<site-header>`, `<site-footer>`, `<contact-invitation>` (alias `<site-cta>`), and `<audience-hero>`.
- **Services:** `<service-summary>`, `<service-details>`, and `<service-process-card>`.
- **Customers and industry:** `<customer-card>`, `<featured-service-card>`, and `<industry-service-card>` (built on the shared `renderImageCard` helper).
- **Institutional and contact:** `<institutional-stat-card>`, `<institutional-purpose-card>`, and `<contact-form>`.

## Contact actions

- **Quote requests:** the form validates visitor details and opens WhatsApp with their name, phone, email, customer type, and message filled in. The visitor must review and send the message in WhatsApp; the website does not send messages automatically or store this information on a server.
- **Fallback:** entered values are preserved, and a link lets the visitor open the prepared message if the browser blocks the new window. Without JavaScript, form submission stays disabled and direct contact links remain available on the contact page.
- **Direct channels:** cards open WhatsApp, a phone call, the visitor's email application, or Google Maps. The shared footer offers WhatsApp, phone, and email links rather than a newsletter signup.
- **Contact details:** the phone number `+55 51 99394-8340` and email `contato@techpro.com` have been retained. The business must confirm that both are official contact channels and that the email inbox receives messages. An email link opens the visitor's email application; it does not configure a mailbox or delivery service.

## Run locally

This is the recommended way to develop and test the website **on your own computer**, without Docker, a VM, a public domain, or an internet-facing deployment.

Prerequisites: Git, Python 3, and a modern browser.

1. Clone the repository and enter its directory:

   ```bash
   git clone https://github.com/univates-deadlock/techpro-institutional-page.git
   cd techpro-institutional-page
   ```

2. Start an HTTP server from the project root:

   ```bash
   python3 -m http.server 8080 --bind 127.0.0.1
   ```

3. Open [http://localhost:8080](http://localhost:8080). The entry point redirects to `/pages/home.html`.

Press `Ctrl+C` to stop the server. Binding to `127.0.0.1` limits access to the local computer.

## Run with Docker

Running with Docker reproduces the static container used in production behind the shared reverse proxy (**https://techpro.matbdev.com**).

Prerequisites: Git, a running Docker Engine, and Docker Compose installed, with permission to execute Docker commands.

1. Clone the repository and enter its directory, as shown in step 1 above.
2. If the external `deadlock_edge` network does not exist yet in your Docker environment, create it once:

   ```bash
   docker network inspect deadlock_edge >/dev/null 2>&1 || docker network create deadlock_edge
   ```

3. Build the image and start the service in the background:

   ```bash
   docker compose up -d --build
   ```

4. Check service status, logs, and the local HTTP response:

   ```bash
   docker compose ps
   docker compose logs -f web
   curl -I http://127.0.0.1:8080/pages/home.html
   ```

### Ports and networking

In `compose.yaml`, the service operates as follows:

- **`127.0.0.1:8080:8080`:** HTTP access restricted to the host's `localhost` for local testing and health checks. Port `8080` is not publicly exposed.
- **`deadlock_edge` network (`techpro-site:8080`):** lets the central reverse proxy route public HTTPS traffic (`https://techpro.matbdev.com`, ports `80`/`443`) to this container without host port conflicts.

To apply file changes, run `docker compose up -d --build` again. To stop and remove the container:

```bash
docker compose down
```

---

<div align="center">

<h2>Team</h2>

<p>
  <a href="https://github.com/alexandrapadilha1"><strong>Alexandra Padilha</strong></a>
  &nbsp; · &nbsp;
  <a href="https://github.com/DiogoFZanco"><strong>Diogo Felipe Zanco</strong></a>
</p>

<p>
  <a href="https://github.com/matbdev"><strong>Mateus Carniel Brambilla</strong></a>
  &nbsp; · &nbsp;
  <a href="https://github.com/TainaSchmidt"><strong>Tainá Luiza Schmidt</strong></a>
</p>

</div>

<div align="center">

<img src="assets/images/common/techpro-logo.png" alt="TechPro logo" width="420">

<h1>TechPro</h1>

<p>Institutional website · Electronic security and automation</p>

<p><strong>Laboratório de Programação para Internet · Univates · 2026B</strong></p>

<p><a href="README.md">Português</a> · English</p>

</div>

---

An institutional website developed as an academic project at Univates to present TechPro, its electronic security, automation and electrical installation services, along with customer information and contact channels.

## Implementation and technical decisions

- **Plain HTML, CSS and JavaScript:** runs directly in the browser, without frameworks, npm dependencies or a front-end compilation step.
- **Web Components and ES modules:** reusable headers, footers and cards in `js/components/`, loaded through `js/main.js`.
- **Modular CSS:** separate global, component and page styles in `css/`, with variables for colors, typography and spacing, BEM class naming and responsive layouts using media queries.
- **Static pages:** the entry point is `index.html`, additional pages are in `pages/`, and images and icons are in `assets/`. Resources use absolute paths relative to the site root.
- **Docker and Docker Compose:** the `Dockerfile` builds an image containing the static files and the Caddy web server. `compose.yaml` defines ports, persistent volumes and a restart policy for running on the VM.
- **Caddy:** the web server delivers static files, manages HTTPS for `techpro.matbdev.com`, compresses HTTP responses and serves a custom page for 404 errors.
- **GitHub Actions:** automatically deploys changes from the `main` branch to the Univates VM using SSH, repository updates, Docker Compose and an HTTP availability check.

Some links lead to a placeholder page. The Rubik font and the map require internet access.

## Contact actions

- **Quote requests:** the form validates visitor details and opens WhatsApp with their name, phone, email, customer type and message filled in. The visitor must review and send the message in WhatsApp; the website does not send messages automatically or store this information on a server.
- **Fallback:** entered values are preserved, and a link lets the visitor open the prepared message if the browser blocks the new window. Without JavaScript, form submission stays disabled and direct contact links remain available on the contact page.
- **Direct channels:** cards open WhatsApp, a phone call, the visitor's email application or Google Maps. The shared footer offers WhatsApp, phone and email links rather than a newsletter signup.
- **Existing details:** the phone number `+55 51 99394-8340` and email `contato@techpro.com` have been retained. The business must confirm that both are official contact channels and that the email inbox receives messages. An email link opens the visitor's email application; it does not configure a mailbox or delivery service.

## Run locally

This is the recommended way to develop and test the website **on your own computer**, without Docker, a VM, a public domain or an internet-facing deployment.

Prerequisites: Git, Python 3 and a modern browser.

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

## Run on the VM with Docker

The Univates VM hosts the **production** environment, separately from local development.

Prerequisites: Git, Docker Engine and Docker Compose installed on the VM, permission to execute Docker commands, a domain pointing to the VM, and access to ports 80/443 as required by the network configuration.

1. Clone the repository on the VM:

   ```bash
   git clone https://github.com/univates-deadlock/techpro-institutional-page.git
   cd techpro-institutional-page
   ```

2. Build the image and start the service:

   ```bash
   docker compose up -d --build
   ```

3. Access the deployed website: **https://techpro.matbdev.com**.

4. Check service status and logs:

   ```bash
   docker compose ps
   docker compose logs -f web
   ```

5. Check the HTTP response directly on the VM:

   ```bash
   curl -I http://127.0.0.1:8080/pages/home.html
   ```

### Ports and security

The recommended production port mapping in `compose.yaml` is:

```yaml
ports:
  - "80:80"
  - "443:443"
  - "127.0.0.1:8080:8080"
```

- **80/TCP:** HTTP, HTTPS redirection and certificate validation support.
- **443/TCP:** public HTTPS access to the website.
- **8080/TCP:** HTTP access restricted to the VM's localhost, used by the deployment health check.

The `:8080` block stays in the `Caddyfile`: exposure on the VM is limited by Docker Compose's `127.0.0.1:8080:8080` mapping. Port 8080 **does not need to be publicly accessible**.

To manually apply changes to the container, run `docker compose up -d --build` again. To stop and remove the container:

```bash
docker compose down
```

Caddy's named volumes are preserved by this command.

## Automated deployment

The [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) file defines deployment automation using GitHub Actions.

The workflow runs on a **push to `main`** or can be started manually through **Run workflow** in GitHub.

Deployment flow:

1. The Action configures SSH using the `VM_HOST`, `VM_USER`, `VM_PORT`, `VM_SSH_KEY` and `VM_KNOWN_HOSTS` secrets.
2. It connects to the VM and opens `$HOME/techpro-institutional-page`.
3. It updates the main branch with `git pull --ff-only origin main`.
4. It validates the Compose configuration and runs `docker compose up -d --build` on the VM itself.
5. It checks the availability of `/pages/home.html` by requesting `http://127.0.0.1:8080`.
6. It records diagnostic information on failure and cleans up unused Docker images at the end.

This implements automated **Continuous Deployment (CD)**, but does not run a complete continuous integration (CI) test suite. The health check confirms a valid HTTP response; it does not replace functional testing, and the workflow does not implement automatic rollback.

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

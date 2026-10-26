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

- **Plain HTML, CSS and JavaScript:** runs directly in the browser, without frameworks, npm dependencies or a build step.
- **Web Components and ES modules:** reusable headers, footers and cards in `js/components/`, loaded through `js/main.js`.
- **Modular CSS:** separate global, component and page styles in `css/`, with variables for colors, typography and spacing and BEM class naming. Responsive layouts use media queries.
- **Static pages:** entry point in `index.html`, additional pages in `pages/`, and images and icons in `assets/`. The server must serve the project root because resources use absolute paths.
- **Docker with Caddy Alpine:** an HTTP server for static files, with the image version specified in the `Dockerfile` and configuration in the `Caddyfile`. Compose standardizes execution on the VM, publishes ports 80, 443 and 8080, and restarts the service after reboots, provided Docker is running.

The home page is still at an early stage, and some links lead to a placeholder page. Contact and newsletter forms have no backend integration. The Rubik font and map require internet access.

## Run locally

Prerequisites: Git, Python 3 and a modern browser.

1. Clone the repository and enter its directory:

   ```bash
   git clone https://github.com/univates-deadlock/techpro-web-landing-page.git
   cd techpro-web-landing-page
   ```

2. Start an HTTP server from the project root:

   ```bash
   python3 -m http.server 8080 --bind 127.0.0.1
   ```

3. Open [http://localhost:8080](http://localhost:8080). Press `Ctrl+C` to stop the server.

## Run on a VM with Docker

Prerequisites: Git, a running Docker Engine and Docker Compose installed on the VM, with permission to run Docker commands.

1. Clone the repository and enter its directory, as shown in step 1 above.
2. Build the image and start the container:

   ```bash
   docker compose up -d --build
   ```

3. Open `http://VM_IP:8080` in your browser. The VM must be reachable over the network and allow connections to TCP port 8080. From the VM itself, use `http://localhost:8080`.
4. Check the status and logs:

   ```bash
   docker compose ps
   docker compose logs -f
   ```

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

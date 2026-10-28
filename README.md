<div align="center">

<img src="assets/images/common/techpro-logo.png" alt="Logo da TechPro" width="420">

<h1>TechPro</h1>

<p>Site institucional · Segurança eletrônica e automação</p>

<p><strong>Laboratório de Programação para Internet · Univates · 2026B</strong></p>

<p>Português · <a href="README-en.md">English</a></p>

</div>

---

Site institucional desenvolvido como projeto acadêmico na Univates para apresentar a TechPro, suas soluções em segurança eletrônica, automação com IA, controle de acesso, manutenção e infraestrutura elétrica, além dos perfis de clientes atendidos, histórico institucional e canais diretos de contato.

## Construção e decisões técnicas

- **HTML, CSS e JavaScript puro:** execução direta no navegador, sem frameworks, dependências npm ou etapa de compilação do front-end.
- **Web Components nativos e módulos ES:** elementos customizados reutilizáveis em `js/components/`, registrados centralmente por `js/main.js`.
- **CSS modular e Design Tokens:** tokens globais de cores, tipografia, espaçamento, bordas e sombras em `css/variables.css`, estilos base em `css/global.css`, componentes compartilhados em `css/components/` e estilos específicos em `css/pages/`, seguindo a convenção BEM, estados `.is-*` e breakpoints principais em `1280px`, `890px` e `600px`.
- **Roteamento estático e página 404:** a entrada `index.html` redireciona para `/pages/home.html` e os recursos utilizam caminhos absolutos a partir da raiz do site. Links para subpáginas ou políticas ainda não detalhadas apontam para `pages/404.html`, também servida automaticamente pelo Caddy em erros HTTP `404`.
- **Docker, Docker Compose e Caddy:** o `Dockerfile` empacota os arquivos estáticos com `caddy:2-alpine` escutando internamente em `:8080` com compressão `zstd`/`gzip` (`Caddyfile`). O `compose.yaml` publica `127.0.0.1:8080:8080`, define política de reinicialização, *health check* HTTP e conecta o serviço à rede externa `deadlock_edge` (alias `techpro-site`) para publicação HTTPS via proxy reverso compartilhado.
- **Integração Contínua (CI):** o workflow `.github/workflows/ci.yml` valida arquivos essenciais, a configuração do Docker Compose e o build da imagem a cada pull request ou push na `main`.

A fonte `Rubik` (Google Fonts) e o mapa incorporado na página de contato dependem de acesso à internet.

## Estrutura do projeto

```text
techpro-institutional-page/
├── assets/
│   ├── icons/          # Ícones vetoriais (SVG)
│   └── images/         # Logotipos, fotos e ilustrações por seção
├── css/
│   ├── components/     # Estilos reutilizáveis (botões, cabeçalho, rodapé, cards, CTAs)
│   ├── pages/          # Estilos específicos de cada página
│   ├── global.css      # Reset, layout base, utilitários e importações
│   └── variables.css   # Design tokens (cores, tipografia, espaçamentos, sombras)
├── js/
│   ├── components/     # Web Components nativos e utilitários compartilhados
│   └── main.js         # Ponto de entrada que registra os componentes
├── pages/              # Páginas HTML da aplicação
├── Caddyfile           # Configuração interna do Caddy (:8080, compressão e erro 404)
├── Dockerfile          # Imagem baseada em caddy:2-alpine
├── compose.yaml        # Orquestração Docker Compose, healthcheck e rede de borda
└── index.html          # Redirecionamento da raiz para /pages/home.html
```

### Páginas disponíveis

| Arquivo | Descrição |
| :--- | :--- |
| `pages/home.html` | Página inicial com apresentação, públicos atendidos, serviços, diferenciais e CTA de orçamento. |
| `pages/services.html` | Catálogo detalhado de serviços (manutenção, alarmes, automação com IA, controle de acesso e câmeras) e etapas de atendimento. |
| `pages/customers.html` | Segmentos atendidos, tabela comparativa de aplicações por perfil e galeria de serviços em destaque. |
| `pages/industry.html` | Página dedicada às soluções de monitoramento, leitura de placas, câmeras térmicas e automação industrial. |
| `pages/institutional.html` | História da empresa, indicadores de atuação, missão, visão, valores e mensagem institucional. |
| `pages/contact.html` | Canais diretos de atendimento, formulário interativo de orçamento e mapa de localização. |
| `pages/404.html` | Página personalizada de erro 404 com atalhos rápidos para as seções principais do site. |

### Web Components

- **Layout e seções compartilhadas:** `<site-header>`, `<site-footer>`, `<contact-invitation>` (alias `<site-cta>`) e `<audience-hero>`.
- **Serviços:** `<service-summary>`, `<service-details>` e `<service-process-card>`.
- **Clientes e indústria:** `<customer-card>`, `<featured-service-card>` e `<industry-service-card>` (baseados no helper `renderImageCard`).
- **Institucional e contato:** `<institutional-stat-card>`, `<institutional-purpose-card>` e `<contact-form>`.

## Ações de contato

- **Orçamentos:** o formulário valida os dados e abre o WhatsApp com nome, telefone, e-mail, tipo de cliente e mensagem preenchidos. O visitante precisa revisar e confirmar o envio no WhatsApp; o site não envia mensagens automaticamente nem registra os dados em um servidor.
- **Recuperação:** os campos permanecem preenchidos e um link permite abrir a mensagem caso o navegador bloqueie a nova janela. Sem JavaScript, o envio pelo formulário fica desabilitado e os links diretos de contato continuam disponíveis na página.
- **Canais diretos:** os cartões abrem WhatsApp, ligação telefônica, aplicativo de e-mail ou endereço no Google Maps. O rodapé compartilhado oferece WhatsApp, telefone e e-mail, sem cadastro de newsletter.
- **Dados de atendimento:** foram mantidos o número `+55 51 99394-8340` e o e-mail `contato@techpro.com`. A empresa deve confirmar que ambos são os canais oficiais e que a caixa de e-mail recebe mensagens. Um link de e-mail abre o aplicativo do visitante; não configura uma caixa postal ou serviço de envio.

## Como rodar localmente

Esta é a forma recomendada para desenvolver e testar o site **no próprio computador**, sem Docker, VM, domínio público ou publicação na internet.

Pré-requisitos: Git, Python 3 e um navegador atual.

1. Clone o repositório e entre no diretório:

   ```bash
   git clone https://github.com/univates-deadlock/techpro-institutional-page.git
   cd techpro-institutional-page
   ```

2. Inicie um servidor HTTP na raiz do projeto:

   ```bash
   python3 -m http.server 8080 --bind 127.0.0.1
   ```

3. Abra [http://localhost:8080](http://localhost:8080). A página inicial redireciona para `/pages/home.html`.

Para encerrar o servidor, pressione `Ctrl+C`. O endereço `127.0.0.1` limita o acesso ao próprio computador.

## Como rodar com Docker

A execução via Docker reproduz o contêiner estático utilizado em produção atrás do proxy reverso compartilhado (**https://techpro.matbdev.com**).

Pré-requisitos: Git, Docker Engine ativo e Docker Compose instalado, com permissão para executar comandos Docker.

1. Clone o repositório e entre no diretório, conforme o passo 1 acima.
2. Caso a rede externa `deadlock_edge` ainda não exista no ambiente Docker, crie-a uma única vez:

   ```bash
   docker network inspect deadlock_edge >/dev/null 2>&1 || docker network create deadlock_edge
   ```

3. Construa a imagem e inicie o serviço em segundo plano:

   ```bash
   docker compose up -d --build
   ```

4. Consulte o estado, os logs e a resposta HTTP local:

   ```bash
   docker compose ps
   docker compose logs -f web
   curl -I http://127.0.0.1:8080/pages/home.html
   ```

### Portas e rede

No `compose.yaml`, o serviço expõe e opera da seguinte forma:

- **`127.0.0.1:8080:8080`:** acesso HTTP restrito ao `localhost` da máquina hospedeira para testes locais e verificação de saúde (*health check*). A porta `8080` não fica exposta publicamente.
- **Rede `deadlock_edge` (`techpro-site:8080`):** permite que o proxy reverso central encaminhe o tráfego HTTPS público (`https://techpro.matbdev.com`, portas `80`/`443`) para este contêiner, sem conflito de portas no host.

Para aplicar alterações nos arquivos, execute novamente `docker compose up -d --build`. Para encerrar e remover o contêiner:

```bash
docker compose down
```

---

<div align="center">

<h2>Equipe</h2>

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

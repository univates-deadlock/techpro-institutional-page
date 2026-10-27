<div align="center">

<img src="assets/images/common/techpro-logo.png" alt="Logo da TechPro" width="420">

<h1>TechPro</h1>

<p>Site institucional · Segurança eletrônica e automação</p>

<p><strong>Laboratório de Programação para Internet · Univates · 2026B</strong></p>

<p>Português · <a href="README-en.md">English</a></p>

</div>

---

Site institucional desenvolvido como projeto acadêmico na Univates para apresentar a TechPro, seus serviços de segurança eletrônica, automação e instalações elétricas, além de informações para clientes e canais de contato.

## Construção e decisões técnicas

- **HTML, CSS e JavaScript puro:** execução direta no navegador, sem frameworks, dependências npm ou compilação do front-end.
- **Web Components e módulos ES:** cabeçalho, rodapé e cards reutilizáveis em `js/components/`, carregados por `js/main.js`.
- **CSS modular:** estilos globais, componentes e páginas separados em `css/`, com variáveis para cores, tipografia e espaçamento, convenção BEM e layouts responsivos com media queries.
- **Páginas estáticas:** entrada em `index.html`, demais páginas em `pages/` e imagens e ícones em `assets/`. Os recursos utilizam caminhos absolutos a partir da raiz do site.
- **Docker e Docker Compose:** o `Dockerfile` cria uma imagem com os arquivos estáticos e o servidor Caddy. O `compose.yaml` define portas, volumes persistentes e política de reinicialização para execução na VM.
- **Caddy:** servidor web que entrega os arquivos estáticos, gerencia HTTPS para `techpro.matbdev.com`, aplica compressão HTTP e apresenta uma página personalizada em erros 404.
- **GitHub Actions:** deploy automático na VM da Univates após alterações na branch `main`, utilizando SSH, atualização do repositório, Docker Compose e uma verificação HTTP.

Alguns links levam a uma página de conteúdo não implementado. A fonte Rubik e o mapa dependem de acesso à internet.

## Ações de contato

- **Orçamentos:** o formulário valida os dados e abre o WhatsApp com nome, telefone, e-mail, tipo de cliente e mensagem preenchidos. O visitante precisa revisar e confirmar o envio no WhatsApp; o site não envia mensagens automaticamente nem registra os dados em um servidor.
- **Recuperação:** os campos permanecem preenchidos e um link permite abrir a mensagem caso o navegador bloqueie a nova janela. Sem JavaScript, o formulário fica desabilitado e os links diretos de contato continuam disponíveis na página de contato.
- **Canais diretos:** os cartões abrem WhatsApp, ligação telefônica, aplicativo de e-mail ou endereço no Google Maps. O rodapé compartilhado oferece WhatsApp, telefone e e-mail, sem cadastro de newsletter.
- **Dados existentes:** foram mantidos o número `+55 51 99394-8340` e o e-mail `contato@techpro.com`. A empresa deve confirmar que ambos são os canais oficiais e que a caixa de e-mail recebe mensagens. Um link de e-mail abre o aplicativo do visitante; não configura uma caixa postal ou serviço de envio.

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

## Como rodar na VM com Docker

A execução na VM da Univates é a configuração de **produção**, separada da execução local.

Pré-requisitos: Git, Docker Engine e Docker Compose instalados na VM, com permissão para executar comandos Docker; domínio apontando para a VM e portas 80/443 acessíveis conforme a configuração de rede.

1. Clone o repositório na VM:

   ```bash
   git clone https://github.com/univates-deadlock/techpro-institutional-page.git
   cd techpro-institutional-page
   ```

2. Construa a imagem e inicie o serviço:

   ```bash
   docker compose up -d --build
   ```

3. Acesse o site pelo endereço público: **https://techpro.matbdev.com**.

4. Consulte o estado e os logs:

   ```bash
   docker compose ps
   docker compose logs -f web
   ```

5. Verifique a resposta HTTP diretamente na VM:

   ```bash
   curl -I http://127.0.0.1:8080/pages/home.html
   ```

### Portas e segurança

O mapeamento recomendado no `compose.yaml` de produção é:

```yaml
ports:
  - "80:80"
  - "443:443"
  - "127.0.0.1:8080:8080"
```

- **80/TCP:** HTTP, redirecionamento para HTTPS e suporte à validação de certificados.
- **443/TCP:** acesso público ao site por HTTPS.
- **8080/TCP:** acesso HTTP restrito ao localhost da VM, utilizado pelo health check do deploy.

O bloco `:8080` permanece no `Caddyfile`: quem restringe a exposição da porta na VM é o mapeamento `127.0.0.1:8080:8080` do Docker Compose. A porta 8080 **não precisa estar acessível publicamente**.

Para atualizar manualmente o contêiner após uma alteração nos arquivos, execute `docker compose up -d --build`. Para encerrar e remover o contêiner, use:

```bash
docker compose down
```

Os volumes nomeados do Caddy permanecem após esse comando.

## Deploy automático

O arquivo [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) implementa a publicação automatizada com GitHub Actions.

O workflow é acionado por um **push na branch `main`** ou manualmente pela opção **Run workflow** no GitHub.

Fluxo de implantação:

1. A Action configura a conexão SSH usando os secrets `VM_HOST`, `VM_USER`, `VM_PORT`, `VM_SSH_KEY` e `VM_KNOWN_HOSTS`.
2. Conecta-se à VM e acessa o diretório `$HOME/techpro-institutional-page`.
3. Atualiza a branch principal com `git pull --ff-only origin main`.
4. Valida o Compose e executa `docker compose up -d --build` na própria VM.
5. Verifica a disponibilidade de `/pages/home.html` com uma requisição a `http://127.0.0.1:8080`.
6. Registra informações de diagnóstico em caso de falha e limpa imagens Docker não utilizadas ao final.

O processo automatiza o **Continuous Deployment (CD)**, mas não executa uma suíte completa de testes de integração contínua (CI). O health check confirma uma resposta HTTP válida; não substitui testes funcionais e não há rollback automático configurado no workflow.

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

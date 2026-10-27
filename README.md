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

- **HTML, CSS e JavaScript puro:** execução direta no navegador, sem frameworks, dependências npm ou etapa de build.
- **Web Components e módulos ES:** cabeçalho, rodapé e cards reutilizáveis em `js/components/`, carregados por `js/main.js`.
- **CSS modular:** estilos globais, componentes e páginas separados em `css/`, com variáveis para cores, tipografia e espaçamento e convenção BEM para as classes. Layouts responsivos com media queries.
- **Páginas estáticas:** entrada em `index.html`, demais páginas em `pages/` e imagens e ícones em `assets/`. O servidor deve usar a raiz do projeto, pois os recursos usam caminhos absolutos.
- **Docker com Caddy Alpine:** servidor HTTP para os arquivos estáticos, com a versão da imagem definida no `Dockerfile` e configuração no `Caddyfile`. O Compose padroniza a execução na VM, publica as portas 80, 443 e 8080 e reinicia o serviço após reinicializações, enquanto o Docker estiver ativo.

A Home ainda está em estágio inicial e alguns links levam a uma página de conteúdo não implementado. A fonte Rubik e o mapa dependem de acesso à internet.

## Ações de contato

- **Orçamentos:** o formulário valida os dados e abre o WhatsApp com nome, telefone, e-mail, tipo de cliente e mensagem preenchidos. O visitante precisa revisar e confirmar o envio no WhatsApp; o site não envia mensagens automaticamente nem registra os dados em um servidor.
- **Recuperação:** os campos permanecem preenchidos e um link permite abrir a mensagem caso o navegador bloqueie a nova janela. Sem JavaScript, o formulário fica desabilitado e os links diretos de contato continuam disponíveis na página de contato.
- **Canais diretos:** os cartões abrem WhatsApp, ligação telefônica, aplicativo de e-mail ou endereço no Google Maps. O rodapé compartilhado oferece WhatsApp, telefone e e-mail, sem cadastro de newsletter.
- **Dados existentes:** foram mantidos o número `+55 51 99394-8340` e o e-mail `contato@techpro.com`. A empresa deve confirmar que ambos são os canais oficiais e que a caixa de e-mail recebe mensagens. Um link de e-mail abre o aplicativo do visitante; não configura uma caixa postal ou serviço de envio.

## Como rodar localmente

Pré-requisitos: Git, Python 3 e um navegador atual.

1. Clone o repositório e entre na pasta:

   ```bash
   git clone https://github.com/univates-deadlock/techpro-web-landing-page.git
   cd techpro-web-landing-page
   ```

2. Inicie um servidor HTTP na raiz:

   ```bash
   python3 -m http.server 8080 --bind 127.0.0.1
   ```

3. Acesse [http://localhost:8080](http://localhost:8080). Para encerrar, pressione `Ctrl+C`.

## Como rodar na VM com Docker

Pré-requisitos: Git, Docker Engine ativo e Docker Compose instalado na VM, com permissão para executar comandos Docker.

1. Clone o repositório e entre na pasta, como no passo 1 acima.
2. Construa a imagem e inicie o container:

   ```bash
   docker compose up -d --build
   ```

3. Acesse `http://IP_DA_VM:8080` no navegador. A VM deve estar acessível pela rede e permitir conexões à porta TCP 8080. Dentro da própria VM, use `http://localhost:8080`.
4. Consulte o estado e os logs:

   ```bash
   docker compose ps
   docker compose logs -f
   ```

Para aplicar alterações nos arquivos, execute novamente `docker compose up -d --build`. Para encerrar e remover o container:

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

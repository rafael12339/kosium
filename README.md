# Kosium

Projeto React (Vite) do sistema Kosium — protótipo funcional pronto para publicar.

## Como colocar no ar (sem usar terminal)

### 1. Suba estes arquivos para o repositório no GitHub

No repositório vazio que você criou (`kosium`), clique em **"uploading an existing file"** (ou o botão de upload) e arraste **todo o conteúdo desta pasta** (não a pasta em si, o que está dentro dela: `src/`, `public/`, `index.html`, `package.json`, `vite.config.js`).

Depois clique em **"Commit changes"**.

### 2. Conecte ao Vercel

1. Acesse **vercel.com** e crie uma conta (pode entrar direto com o GitHub — "Continue with GitHub")
2. Clique em **"Add New..." → "Project"**
3. Selecione o repositório `kosium` que você acabou de subir
4. O Vercel já reconhece automaticamente que é um projeto Vite — não precisa mudar nada nas configurações
5. Clique em **"Deploy"**

Em cerca de 1 minuto, o Vercel te dá um link tipo `kosium.vercel.app` — o site já está no ar nesse endereço.

### 3. Conectar o domínio kosium.com.br

1. Dentro do projeto no Vercel, vá em **"Settings" → "Domains"**
2. Digite `kosium.com.br` e clique em **"Add"**
3. O Vercel vai te mostrar 1 ou 2 registros (geralmente um tipo **A** e/ou **CNAME**) que você precisa cadastrar no **registro.br**, na seção de **DNS** do seu domínio
4. Volta no registro.br, entra nas configurações de DNS do kosium.com.br, e adiciona exatamente os registros que o Vercel mostrou
5. Pode levar de alguns minutos a algumas horas para propagar — o Vercel avisa quando o domínio estiver ativo (ícone verde)

Pronto — depois disso, `kosium.com.br` abre o site direto, com HTTPS automático (o cadeado verde) já incluso, sem precisar fazer mais nada.

## O que ainda falta (próximos passos do roteiro)

- Banco de dados + backend (por enquanto o app usa dados fictícios de demonstração, direto no navegador)
- Pagamentos via InfinitePay
- Conectar os módulos ao banco de dados real

Qualquer dúvida em qualquer um desses passos, é só chamar.

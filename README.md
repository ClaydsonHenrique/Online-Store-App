Este projeto é uma aplicação de loja online desenvolvida com React. Os usuários podem navegar pelos produtos, adicionar itens ao carrinho, visualizar detalhes dos produtos e finalizar a compra.
Índice

    Instalação
    Uso
    Estrutura do Projeto
    Componentes
    Rotas
    Serviços
    Estilos

Instalação

    Clone o repositório e instale as dependências:

    bash

git clone https://github.com/seu-usuario/online-store-app.git
cd online-store-app
npm install

Inicie o servidor de desenvolvimento:

bash

    npm start

    A aplicação estará disponível em http://localhost:3000.

Uso

A aplicação permite que os usuários:

    Naveguem pelos produtos por categoria.
    Pesquisem produtos por nome.
    Visualizem os detalhes de um produto.
    Adicionem produtos ao carrinho.
    Visualizem e editem o carrinho de compras.
    Finalizem a compra preenchendo os dados necessários.

Estrutura do Projeto

arduino

online-store-app/
├── public/
├── src/
│   ├── components/
│   │   ├── Categories.js
│   │   ├── Carrinho.js
│   │   ├── Home.js
│   │   ├── InputSearch.js
│   │   ├── LoadingPage.js
│   │   ├── Pagamento.js
│   │   ├── Product.js
│   │   ├── ProductsList.js
│   ├── images/
│   │   ├── arrowIcon.svg
│   │   ├── logo.png
│   ├── services/
│   │   ├── api.js
│   ├── styles/
│   │   ├── Carrinho.css
│   │   ├── Home.css
│   │   ├── ProductList.css
│   ├── App.js
│   ├── index.js
└── README.md

Componentes
App

Define as rotas principais da aplicação.
Home

Página inicial onde os usuários podem pesquisar e navegar pelos produtos.
Carrinho

Página onde os usuários podem visualizar e editar os itens no carrinho de compras.
Product

Página de detalhes de um produto específico.
Pagamento

Página onde os usuários finalizam a compra inserindo seus dados pessoais e informações de pagamento.
Categories

Componente que exibe a lista de categorias de produtos.
ProductsList

Componente que exibe a lista de produtos.
InputSearch

Componente de busca para encontrar produtos por nome.
LoadingPage

Componente de carregamento exibido enquanto os dados estão sendo buscados.
Rotas

A aplicação usa react-router-dom para gerenciar a navegação entre diferentes páginas. As rotas são definidas no arquivo App.js:

    /online-store: Página inicial (Home)
    /product/:id: Página de detalhes do produto
    /Carrinho: Página do carrinho de compras
    /Pagamento: Página de pagamento

Serviços

A pasta services contém funções que interagem com APIs externas para buscar dados de produtos e categorias.

    api.js: Funções para buscar categorias e produtos da API.

Estilos

A pasta styles contém arquivos CSS para estilizar diferentes componentes e páginas da aplicação:

    Carrinho.css
    Home.css
    ProductList.css

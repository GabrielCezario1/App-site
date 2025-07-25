# Repositório Base para Projetos Angular

Este repositório serve como um ponto de partida para novos projetos que utilizam Angular. Ele inclui uma estrutura de projeto organizada e funcionalidades essenciais prontas para uso.

## Funcionalidades Inclusas

O projeto base vem com as seguintes funcionalidades pré-configuradas:

*   **Página de Início (Home):** Uma página inicial simples para apresentar a aplicação.
*   **Gerenciamento de Usuários (Usuarios):**
    *   Listagem de usuários.
    *   Componente de serviço (`usuarios.service.ts`) para interagir com uma API de usuários.
    *   Modelos de dados para requisições e respostas (`usuarios-*.model.ts`).
*   **Componente de Paginação (DsPaginacao):** Um componente de UI reutilizável para lidar com a paginação de dados.
*   **Estrutura de Módulos:** O código é organizado em módulos `core`, `features` e `shared` para melhor manutenibilidade.

## Configuração da API

O projeto está pré-configurado para se comunicar com uma API local através do `UsuariosService`.

*   **URL Base da API:** `https://localhost:7111/api/usuarios`

*   **Endpoints Disponíveis:**
    *   `POST /` - Inserir um novo usuário.
    *   `GET /` - Listar todos os usuários.
    *   `GET /{id}` - Recuperar um usuário por ID.
    *   `PUT /` - Editar um usuário existente.
    *   `DELETE /{id}` - Excluir um usuário por ID.

## Como Usar

1.  Clone este repositório.
2.  Instale as dependências com `npm install`.
3.  Inicie o servidor de desenvolvimento com `ng serve`.
4.  Comece a construir seu projeto a partir desta base.

## link do repositório do Back end: https://github.com/GabrielCezario1/App-api.git
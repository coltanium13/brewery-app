# Brewery App

A full-stack example app with an Apollo GraphQL server backed by Open Brewery DB and a Vue 3 client styled with Tailwind CSS.

## Project Structure

```text
brewery-app/
  server/
  client/
```

## Start

### 1. Install dependencies

```bash
npm install --prefix server
npm install --prefix client
```

### 2. Start the GraphQL server

```bash
npm run dev --prefix server
```

The GraphQL API will run at `http://localhost:4000`.

### 3. Generate GraphQL client types

In a second terminal, after the server is running:

```bash
npm run codegen --prefix client
```

This generates the typed GraphQL client files into `client/src/gql/`.

### 4. Start the Vue client

```bash
npm run dev --prefix client
```

The Vite app will run at `http://localhost:5173`.

## Notes

- The `Home` page is the completed example implementation.
- The `local-brews` page is intentionally stubbed so you can build it yourself.
- The backend exposes two GraphQL queries:
  - `search(query: String!)`
  - `filter(city: String!, type: String)`
- The `filter` query maps to Open Brewery DB using `by_city` and optional `by_type`.

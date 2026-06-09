# MCP Catalog

Monorepo de serveurs MCP (Model Context Protocol) prêts à l'emploi.

## Structure

```
Mcp.catalog/
├── mcps/              # Serveurs MCP
│   └── hiboutik/  # Serveur MCP pour l'API Hiboutik POS
├── packages/          # Packages partagés
│   └── shared-mcp/    # Types et utilitaires communs aux MCP
└── ...
```

## Prérequis

- [Node.js](https://nodejs.org/) >= 23
- [pnpm](https://pnpm.io/) >= 10

## Installation

```bash
pnpm install
```

## Commandes

```bash
# Build tous les packages
pnpm build

# Mode développement
pnpm dev

# Lancer les tests
pnpm test

# Vérification des types
pnpm typecheck
```

## Serveurs MCP disponibles

| Serveur                     | Description                         |
| --------------------------- | ----------------------------------- |
| [hiboutik](./mcps/hiboutik) | 200+ outils pour l'API Hiboutik POS |

## Ajouter un nouveau serveur MCP

1. Créer un dossier dans `mcp/<nom>/`
2. Initialiser le `package.json` en utilisant le catalog pour les dépendances communes
3. Étendre `tsconfig.json` depuis la racine
4. Implémenter le serveur en suivant les patterns de `shared-mcp`

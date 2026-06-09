# MCP Hiboutik Server

Un serveur MCP (Model Context Protocol) complet pour l'API Hiboutik POS. Ce serveur expose plus de 200 outils permettant d'interagir avec toutes les capacités de l'API REST Hiboutik.

## Documentation API

https://emerveille.hiboutik.com/docapi/json/

## Fonctionnalités

Ce serveur MCP implémente les domaines suivants de l'API Hiboutik :

- **Clients** (`hiboutik_customer_*`) - Gestion complète des clients
- **Produits** (`hiboutik_product_*`) - Catalogue produits, recherche, modificateurs
- **Ventes** (`hiboutik_sale_*`) - Tickets, lignes de vente, paiements
- **Inventaire** (`hiboutik_inventory_*`) - Entrées de stock, transferts, inventaires
- **Stock** (`hiboutik_stock_*`) - Stock disponible, alertes, tailles actives
- **Rapports** (`hiboutik_report_*`) - Chiffre d'affaires, ventes par produit/catégorie
- **Catégories** (`hiboutik_category_*`) - Gestion des catégories
- **Marques** (`hiboutik_brand_*`) - Gestion des marques
- **Fournisseurs** (`hiboutik_supplier_*`) - Gestion des fournisseurs
- **Tags** (`hiboutik_tag_*`) - Tags clients, produits, ventes
- **Caisse** (`hiboutik_till_*`) - Gestion de caisse, entrées/sorties
- **Utilisateurs** (`hiboutik_user_*`) - Authentification, gestion utilisateurs
- **Magasins** (`hiboutik_store_*`) - Informations magasins
- **Tailles** (`hiboutik_size_*`) - Types de tailles et tailles
- **Paiements** (`hiboutik_payment_*`) - Types de paiement
- **Modificateurs** (`hiboutik_modifier_*`) - Modificateurs de produits
- **Calendrier** (`hiboutik_calendar_*`) - Événements et rendez-vous
- **Cuisine** (`hiboutik_kitchen_*`) - Affichage cuisine (KDS)
- **Pointage** (`hiboutik_time_tracking_*`) - Suivi du temps
- **Webhooks** (`hiboutik_webhook_*`) - Configuration webhooks
- **Recherche** (`hiboutik_search_*`) - Recherche multi-critères
- **Rapports Z** (`hiboutik_z_*`) - Rapports de clôture
- **Et bien plus encore...**

## Installation

### Prérequis

- Node.js 18 ou supérieur
- npm ou yarn
- Accès API Hiboutik (compte, utilisateur, clé API)

### Étapes d'installation

1. **Cloner le dépôt :**

   ```bash
   git clone https://github.com/Maus3rSR/Mcp.catalog.git
   cd Mcp.catalog
   ```

2. **Installer les dépendances :**

   ```bash
   pnpm install
   ```

3. **Compiler le projet :**
   ```bash
   pnpm build
   ```

## Configuration

### Variables d'environnement

Le serveur nécessite les variables d'environnement suivantes :

| Variable            | Description            | Exemple                  |
| ------------------- | ---------------------- | ------------------------ |
| `HIBOUTIK_BASE_URL` | URL de base de l'API   | `votre_url_hiboutik_api` |
| `HIBOUTIK_ACCOUNT`  | Nom du compte Hiboutik | `votre_email_de_compte`  |
| `HIBOUTIK_USER`     | Nom d'utilisateur API  | `api_user`               |
| `HIBOUTIK_API_KEY`  | Clé API                | `votre_cle_api_ici`      |

### Récupérer vos identifiants API Hiboutik

1. Connectez-vous à votre back-office Hiboutik
2. Allez dans **Paramètres** > **API**
3. Générez ou copiez votre clé API
4. Notez votre nom de compte, utilisateur et clé API

## Utilisation avec Claude Desktop

### 1. Configuration de Claude Desktop

Ajoutez le serveur MCP à votre fichier de configuration Claude Desktop :

**macOS :**

```bash
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Windows :**

```bash
%AppData%\Claude\claude_desktop_config.json
```

**Linux :**

```bash
~/.config/Claude/claude_desktop_config.json
```

### 2. Configuration depuis le dépôt cloné localement

Après avoir cloné le dépôt et compilé (voir [Installation](#installation)) :

```json
{
  "mcpServers": {
    "hiboutik": {
      "command": "node",
      "args": ["/chemin/vers/Mcp.catalog/mcps/hiboutik/dist/index.js"],
      "env": {
        "HIBOUTIK_BASE_URL": "votre_url_hiboutik_api",
        "HIBOUTIK_ACCOUNT": "votre_email_de_compte",
        "HIBOUTIK_USER": "votre_utilisateur",
        "HIBOUTIK_API_KEY": "votre_cle_api"
      }
    }
  }
}
```

### 3. Configuration via GitHub directement avec npx

Pour utiliser le serveur sans cloner le dépôt, `npx` peut exécuter un package **directement depuis GitHub** (dépôt public) :

```json
{
  "mcpServers": {
    "hiboutik": {
      "command": "npx",
      "args": [
        "-y",
        "--package",
        "github:Maus3rSR/Mcp.catalog#main",
        "mcp-hiboutik"
      ],
      "env": {
        "HIBOUTIK_BASE_URL": "votre_url_hiboutik_api",
        "HIBOUTIK_ACCOUNT": "votre_email_de_compte",
        "HIBOUTIK_USER": "votre_utilisateur",
        "HIBOUTIK_API_KEY": "votre_cle_api"
      }
    }
  }
}
```

> **Remarque :** Cette méthode requiert un dépôt **public**. Pour un dépôt **privé**, voir la section [Dépôt privé](#dépôt-privé) ci-dessous.

### 4. Alternative : Configuration avec npx (si publié sur npm)

Si le package est publié sur npm :

```json
{
  "mcpServers": {
    "hiboutik": {
      "command": "npx",
      "args": ["-y", "mcp-hiboutik"],
      "env": {
        "HIBOUTIK_BASE_URL": "votre_url_hiboutik_api",
        "HIBOUTIK_ACCOUNT": "votre_email_de_compte",
        "HIBOUTIK_USER": "votre_utilisateur",
        "HIBOUTIK_API_KEY": "votre_cle_api"
      }
    }
  }
}
```

### 5. Redémarrer Claude Desktop

Après modification de la configuration, redémarrez Claude Desktop pour charger le serveur MCP.

## Utilisation avec d'autres clients MCP

Le serveur est compatible avec tout client MCP supportant le transport stdio :

### Exemple avec l'Inspector MCP

```bash
npx @modelcontextprotocol/inspector node dist/index.js
```

### Exécution directe

```bash
export HIBOUTIK_BASE_URL="votre_url_hiboutik_api"
export HIBOUTIK_ACCOUNT="votre_email_de_compte"
export HIBOUTIK_USER="votre_utilisateur"
export HIBOUTIK_API_KEY="votre_cle_api"

node dist/index.js
```

## Exemples d'utilisation avec Claude

Une fois configuré, vous pouvez demander à Claude d'effectuer des opérations Hiboutik :

### Gestion des clients

- "Liste tous mes clients"
- "Crée un nouveau client nommé Jean Dupont"
- "Recherche les clients qui ont leur anniversaire aujourd'hui"
- "Quel est le solde de crédit du client #123 ?"

### Gestion des produits

- "Liste tous les produits de la catégorie Vêtements"
- "Recherche les produits avec le code-barre 123456789"
- "Quels sont les produits en alerte de stock ?"
- "Crée un nouveau produit : T-shirt bleu à 29.99€"

### Gestion des ventes

- "Liste les ventes d'aujourd'hui au magasin #1"
- "Crée une nouvelle vente pour le client #456"
- "Ajoute le produit #789 à la vente #100"
- "Ferme la vente #100 avec un paiement en espèces"

### Rapports

- "Quel est le chiffre d'affaires du mois dernier ?"
- "Liste les produits les plus vendus cette semaine"
- "Donne-moi le rapport Z d'hier"

### Stock

- "Quel est le stock disponible pour le produit #50 ?"
- "Liste les produits en rupture de stock"
- "Crée un transfert de stock du dépôt #1 au #2"

## Architecture

```
src/
├── index.ts              # Point d'entrée du serveur MCP
├── api/
│   └── client.ts         # Client HTTP pour l'API Hiboutik
└── tools/
    ├── customers.ts      # Outils clients
    ├── products.ts       # Outils produits
    ├── sales.ts          # Outils ventes
    ├── inventory.ts      # Outils inventaire
    ├── stock.ts          # Outils stock
    ├── reports.ts        # Outils rapports
    ├── categories.ts     # Outils catégories
    ├── brands.ts         # Outils marques
    ├── suppliers.ts      # Outils fournisseurs
    ├── tags.ts           # Outils tags
    ├── till.ts           # Outils caisse
    ├── users.ts          # Outils utilisateurs
    ├── stores.ts         # Outils magasins
    ├── sizes.ts          # Outils tailles
    ├── payments.ts       # Outils paiements
    ├── modifiers.ts      # Outils modificateurs
    ├── calendar.ts       # Outils calendrier
    ├── kitchen.ts        # Outils cuisine
    ├── time-tracking.ts  # Outils pointage
    ├── webhooks.ts       # Outils webhooks
    ├── credit-notes.ts   # Outils avoirs
    ├── action-links.ts   # Outils action links
    ├── search.ts         # Outils recherche
    └── others.ts         # Outils divers (taxes, etc.)
```

## Sécurité

- Les credentials sont passés via variables d'environnement uniquement
- L'authentification utilise le Basic Auth avec encodage Base64
- Ne jamais commiter de credentials dans le code
- Utiliser des clés API dédiées avec les permissions minimales nécessaires

## Limites de l'API Hiboutik

- Rate limiting : consultez la documentation Hiboutik pour les limites spécifiques
- Certains endpoints peuvent nécessiter des permissions spéciales
- Les requêtes POST/PUT utilisent souvent `application/x-www-form-urlencoded`
- Les requêtes GET retournent du JSON

## Dépannage

### Le serveur ne démarre pas

1. Vérifiez que toutes les variables d'environnement sont définies
2. Assurez-vous que le projet est compilé (`npm run build`)
3. Vérifiez les logs d'erreur dans Claude Desktop

### Erreurs 401/403

- Vérifiez vos credentials (compte, utilisateur, clé API)
- Assurez-vous que l'accès API est activé dans Hiboutik
- Vérifiez que l'utilisateur a les permissions nécessaires

### Erreurs 404

- Vérifiez que l'ID ressource existe bien
- Certains endpoints nécessitent des paramètres spécifiques

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

- Signaler des bugs
- Proposer des améliorations
- Ajouter de nouveaux outils pour les endpoints manquants

## Licence

MIT

## Ressources

- [Documentation API Hiboutik](https://www.hiboutik.com/api/)
- [Spécification MCP](https://modelcontextprotocol.io/)
- [SDK MCP Node.js](https://github.com/modelcontextprotocol/typescript-sdk)

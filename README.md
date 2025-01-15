Ce projet utilise AdonisJS 6 + Inertia + React

## Installation

1. Installer les dépendances JavaScript
```sh
npm install
```

2. Copier le fichier d'environnement
```sh
cp .env.example .env
```

3. Générer une nouvelle `APP_KEY`
```sh
node ace generate:key
```

4. Ajoutez votre clé API OpenWeatherMap et la ville (optionnel) dans le fichier `.env`:

```sh
OPENWEATHER_API_KEY=YOUR_API_KEY
OPENWEATHER_CITY=YOUR_CITY
```

5. Migrer la base de données
```sh
node ace migration:fresh --seed
```

1. Lancer le serveur
```sh
npm run dev
```

## Commandes disponibles

```sh
node ace account:create                 # Pour créer un compte
node ace account:delete <username>      # Pour supprimer un compte
node ace account:list                   # Pour lister les comptes
node ace account:passwd <username>      # Pour changer le mot de passe d'un compte
```
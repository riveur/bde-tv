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

4. Migrer la base de données
```sh
node ace migration:fresh --seed
```

5. Lancer le serveur
```sh
npm run dev
```
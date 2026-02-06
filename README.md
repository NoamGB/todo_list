# Todo List

Application full-stack de gestion de tâches : backend **NestJS** (API REST) et frontend **React** (TypeScript, MUI, React Router).

---

## Structure du projet

```
todo_list/
├── backend/          # API NestJS (Node.js)
├── frontend/         # Application React (Create React App)
└── README.md
```

---

## Backend (NestJS)

### Structure

```
backend/
├── src/
│   ├── main.ts                 # Point d'entrée, CORS, port
│   ├── app.module.ts           # Module racine (Config, TypeORM, TasksModule)
│   ├── app.controller.ts
│   ├── app.service.ts
│   └── tasks/                 # Module tâches
│       ├── tasks.module.ts
│       ├── controllers/
│       │   └── tasks.controller.ts   # Routes REST (CRUD)
│       ├── services/
│       │   └── tasks.service.ts      # Logique métier + TypeORM
│       ├── entity/
│       │   └── tasks.entity.ts       # Modèle BDD
│       └── dto/
│           ├── create-task.dto.ts
│           └── update-task.dto.ts
├── test/                      # Tests e2e
├── .env                       # Variables d'environnement (à créer)
├── .env.example               # Modèle des variables
└── package.json
```

### Démarrer le backend

```bash
cd backend
npm install
cp .env.example .env
# Éditer .env avec tes valeurs (voir section .env ci-dessous)
npm run start:dev
```

- **`npm run start`** — démarrage simple  
- **`npm run start:dev`** — mode watch (rechargement à chaque modification)  
- **`npm run start:prod`** — après `npm run build`, lance `node dist/main`  
- **`npm run build`** — compile en JavaScript dans `dist/`

L’API écoute par défaut sur le port défini dans `.env` (ex. `http://localhost:3000`). Les routes tâches sont sous le préfixe `/api/tasks`.

---

## Frontend (React)

### Structure

```
frontend/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── index.tsx               # Point d'entrée (ThemeProvider MUI, CssBaseline)
│   ├── App.tsx                 # Router (BrowserRouter, Routes, Layout)
│   ├── theme.ts                # Thème MUI (palette, typo, composants)
│   ├── api/
│   │   └── tasksApi.ts         # Appels HTTP vers le backend (axios)
│   ├── context/
│   │   └── SnackbarContext.tsx # Notifications globales (succès/erreur)
│   ├── components/
│   │   ├── Layout.tsx          # AppBar + Outlet (navigation)
│   │   └── task/
│   │       ├── TaskList.tsx    # Liste des tâches (cards)
│   │       ├── TaskModal.tsx   # Modal création/édition
│   │       ├── DeleteDialog.tsx
│   │       └── ...
│   └── pages/
│       ├── HomePage.tsx        # Liste + ajout + suppression
│       ├── TaskDetailPage.tsx  # Détail / édition / suppression d'une tâche
│       └── NotFoundPage.tsx    # 404
├── .env                        # Variables d'environnement (à créer à la racine de frontend)
├── src/.env.example            # Modèle des variables
└── package.json
```

### Routes (React Router)

| Route           | Page            | Description                          |
|----------------|-----------------|--------------------------------------|
| `/`            | HomePage        | Liste des tâches, ajout, suppression |
| `/tasks/:id`   | TaskDetailPage  | Détail, édition et suppression       |
| `*`            | NotFoundPage    | Page 404                             |

### Démarrer le frontend

```bash
cd frontend
npm install
cp src/.env.example .env
# Éditer .env : REACT_APP_BACKEND_URL (voir section .env ci-dessous)
npm start
```

- **`npm start`** — serveur de dev (souvent `http://localhost:3000` ou 3001 si 3000 pris)  
- **`npm run build`** — build de production dans `build/`  
- **`npm test`** — lancer les tests

---

## Gestion des fichiers `.env`

Les secrets et URLs ne doivent pas être versionnés. On utilise un fichier **`.env`** (ignoré par Git) et un **`.env.example`** (versionné) comme modèle.

### Backend (`backend/.env`)

Créer le fichier à partir de `backend/.env.example` :

```bash
cd backend
cp .env.example .env
```

Variables attendues :

| Variable       | Description                    | Exemple                    |
|----------------|--------------------------------|----------------------------|
| `BACKEND_PORT` | Port du serveur API            | `3000`                     |
| `BACKEND_HOST` | URL de base du backend         | `http://localhost`         |
| `FRONTEND_URL` | Origine autorisée pour CORS   | `http://localhost:3001`    |
| `DB_TYPE`      | Type de BDD (pour info)        | `postgres`                 |
| `DB_USERNAME`  | Utilisateur PostgreSQL         | `postgres`                 |
| `DB_PASSWORD`  | Mot de passe PostgreSQL        | `votre_mot_de_passe`       |
| `DB_DATABASE`  | Nom de la base                 | `todo_list`                |

- Le backend charge `.env` via `ConfigModule` (NestJS).  
- **CORS** : `FRONTEND_URL` doit correspondre à l’URL du frontend en dev (ex. `http://localhost:3001`).  
- La connexion TypeORM utilise `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE` (PostgreSQL).

### Frontend (`frontend/.env`)

Créer le fichier à la **racine du dossier frontend** (à côté de `package.json`) à partir de `frontend/src/.env.example` :

```bash
cd frontend
cp src/.env.example .env
```

Variables attendues :

| Variable               | Description              | Exemple                        |
|------------------------|--------------------------|--------------------------------|
| `REACT_APP_BACKEND_URL`| URL de l’API (sans `/api` si ton backend monte les routes sous `/api`) | `http://localhost:3000/api` |

- Create React App n’expose que les variables préfixées par **`REACT_APP_`**.  
- Dans le code : `process.env.REACT_APP_BACKEND_URL` (voir `src/api/tasksApi.ts`).  
- Après modification de `.env`, redémarrer `npm start`.

### Résumé

1. **Backend** : `.env` dans `backend/`, remplir au minimum port, CORS, et identifiants PostgreSQL.  
2. **Frontend** : `.env` dans `frontend/`, avec `REACT_APP_BACKEND_URL` pointant vers l’API.  
3. Ne jamais commiter `.env` ; garder `.env.example` à jour pour que les autres développeurs sachent quelles variables définir.

---

## Démarrer l’application complète

1. **Base de données** : avoir PostgreSQL installé et une base créée (ex. `todo_list`).

2. **Backend**  
   ```bash
   cd backend
   cp .env.example .env
   # Éditer .env (port, DB_*, FRONTEND_URL)
   npm install
   npm run start:dev
   ```

3. **Frontend**  
   ```bash
   cd frontend
   cp src/.env.example .env
   # Éditer .env : REACT_APP_BACKEND_URL=http://localhost:3000/api
   npm install
   npm start
   ```

4. Ouvrir l’URL du frontend dans le navigateur (ex. `http://localhost:3000` ou `3001`).  
5. S’assurer que `FRONTEND_URL` dans le backend correspond bien à cette URL pour éviter les erreurs CORS.

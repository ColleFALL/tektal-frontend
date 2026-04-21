#  TEKTAL WEB — FRONTEND

##  Description

Tektal Web est l’interface frontend de l’application Tektal.
Elle permet aux utilisateurs de naviguer, créer et gérer des "paths" (chemins), consulter du contenu vidéo et interagir avec la plateforme.

 Le projet est actuellement en phase d’intégration frontend.
Les APIs backend ne sont pas encore connectées.

---

##  Stack technique

* React.js (Vite)
* React Router DOM
* Axios
* TailwindCSS
* Context API / Store (gestion d’état)

---

##  Structure du projet

```bash
src/
├── assets/            # Fichiers statiques (images, icônes)
├── components/        # Composants réutilisables (UI)
├── config/            # Config globale (axios, constantes)
├── context/           # Gestion d’état global (auth, user, etc.)
├── pages/
│   ├── auth/          # Pages d’authentification
│   └── dashboard/     # Pages principales de l’application
├── routes/            # Gestion des routes (AppRoutes.jsx)
├── services/          # Appels API (axios)
├── store/             # State management avancé (optionnel)
└── styles/            # Styles globaux (TailwindCSS)
```

---

##  Gestion des routes

Le routing est centralisé dans :

```bash
src/routes/AppRoutes.jsx
```

###  Pages publiques (auth)

* `/` → Welcome
* `/login` → Connexion
* `/signup` → Inscription
* `/forgot-password` → Mot de passe oublié

---

###  Pages Dashboard

* `/home` → Accueil
* `/ajouter` → Ajouter un path
* `/favoris` → Favoris
* `/mes-chemins` → Mes chemins
* `/recherche` → Recherche
* `/profil` → Profil
* `/edit-profil` → Modifier profil
* `/parametres` → Paramètres

---

###  Création de Path

* `/create-path`
* `/step-creation`
* `/confirmation`

---

###  Vidéo

* `/video-player`
* `/video-upload`

---

###  Fallback

* `*` → Redirection vers Welcome

---

##  Services API

Les appels API sont centralisés dans :

```bash
src/services/api.js
```

###  Rôle

* Configurer Axios
* Définir la base URL
* Gérer les requêtes HTTP
* Préparer l’ajout du token (JWT)

---

###  Exemple de configuration

```js
import axios from "axios"

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export default API
```

---

##  Variables d’environnement

Créer un fichier `.env` à la racine du projet :

```env
VITE_API_URL=http://localhost:8000/api
```

---

##  Backend

Le frontend est conçu pour fonctionner avec une API Django REST.

 Les endpoints backend (accounts, paths, admin, etc.) sont déjà définis côté backend.
 Le développeur doit récupérer la documentation backend pour connecter les services dans `src/services`.

---

##  Installation

```bash
# Cloner le projet
git clone <repo-url>

# Installer les dépendances
npm install

# Lancer le projet
npm run dev
```

---

##  Architecture du projet

Le projet suit une architecture modulaire et scalable :

* UI → `components`
* Pages → `pages`
* Routing → `routes`
* API → `services`
* State global → `context` / `store`

---

##  État du projet

 UI complète
 Routing fonctionnel
 Structure professionnelle
 API non connectée
 Auth sécurisée non implémentée

---

##  Améliorations futures

* Connexion au backend (Axios)
* Interceptors (gestion token)
* Private Routes
* Gestion des erreurs API
* Notifications utilisateur

---

##  Contribution

1. Fork du projet
2. Création d’une branche
3. Développement
4. Pull Request

---

##  Notes importantes

* Le projet reprend la logique de l’application mobile Tektal
* Le fichier `AppRoutes.jsx` est le cœur de la navigation
* L’architecture est prête pour une montée en charge

---

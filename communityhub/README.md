CommunityHub - TP

Ce que j'ai fais ce projet :

BASE
- api.js : appels API (X-Project-Key, X-Auth-Token)
- main.jsx : Bootstrap + Redux
-  store.js : état  global (auth, events, contact, messages, skills, payments)
- Router.jsx + ProtectedRoute + AdminRoute : navigation  et sécurité

AUTH
- Inscription et connexion  (RegisterPage, LoginPage + authSlice)
-  Déconnexion via API

ÉVÉNEMENTS
- Liste, détail et création (premium) via eventsSlice + pages Events

PREMIUM
- Abonnement et historique des paiments (PremiumPage)

COMPÉTENCES
-  Liste et ajout de compétence premium (SkillsPage, MySkillPage)

CONTACTS & MESSAGES
- Gestion des contact et envoi de messages privés

ADMIN
- Création de catégories d'événements (CategoryForm)

ROUTES
/ /login /register /events /events/:id /events/create /dashboard
/contacts /messages /skills /skills/my /premium /admin/categories

RESTE À FAIRE (jour 2)
- Filtres événements
- Inscription événement + Stripe
- Messages forum sur le détail
- Dashboard avancé
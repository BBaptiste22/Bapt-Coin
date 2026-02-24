# 🪙 BAPT-COIN

API REST développée avec **NestJS** permettant la gestion d'une application de collection et d'échange de pièces de monnaie.

---

# 📌 Description

BAPT-COIN permet aux utilisateurs de :

* S'inscrire et s'authentifier (JWT)
* Recevoir un email lors de l'inscription
* Gérer leur collection personnelle de pièces
* Consulter les pièces disponibles
* Créer des annonces d'échange
* Accepter des annonces
* Confirmer des transactions
* Supprimer leurs annonces

---

# ⚙️ Stack Technique

* Node.js
* NestJS
* TypeORM
* MySQL
* JWT (Access + Refresh Token)
* Nodemailer
* Class-validator
* NestSwagger (/api)

---

# 🏗 Architecture du projet

```
src/
│
├── contexts/
│   ├── Auth/                  → Authentification & JWT
│   ├── collection/            → Gestion des collections utilisateurs
│   ├── ressources/
│   │      ├── coin/           → Gestion des pièces
│   │      └── nationality/    → Gestion des nationalités
│   └── announcement/          → Annonces & transactions
│
├── core/
│   ├── permissions/           → Guards & permissions personnalisées
│   ├── mailer/                → Service d'envoi d'emails (Nodemailer)
│   └── events/                → Gestion des événements internes
│
└── app.module.ts
```

Architecture modulaire respectant les bonnes pratiques NestJS.

---

# 🗄 Base de données

* SGBD : MySQL
* Nom de la base : `backend_base`
* ORM : TypeORM
* Synchronisation activée en développement (les tables sont créées automatiquement)

---

# 🚀 Installation du projet

## 1️⃣ Cloner le projet

```bash
git clone <repo-url>
cd BAPT-COIN
```

## 2️⃣ Installer les dépendances

```bash
npm install
```

## 3️⃣ Créer la base de données

```sql
CREATE DATABASE backend_base;
```

## 4️⃣ Configurer les variables d'environnement

Crée un fichier `.env` à la racine du projet en te basant sur `.env.example` :


Contenu du `.env` :

```env
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=votre_adresse_mail
MAIL_PASS=votre_mot_de_passe_mail
```


## 5️⃣ Lancer le serveur

```bash
npm run start:dev
```

API disponible sur :

```
http://localhost:4001
```

## 6️⃣ Tester l'API

Documentation Swagger interactive :

```
http://localhost:4001/api/
```


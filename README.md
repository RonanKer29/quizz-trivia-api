# 🧠 Quizz Trivia

**Une application de quiz multi-catégories avec classement en ligne, conçue avec React, Supabase et Open Trivia DB.**

[🎮 Lancer l'app](https://quizz-trivia-api.vercel.app) · [📘 Open Trivia API](https://opentdb.com/) · [🛠️ Stack technique](#-stack-technique)

---

## ✨ Aperçu

Quizz Trivia est une app de quiz intuitive et responsive, permettant aux utilisateurs de :

- Se connecter de manière sécurisée
- Choisir une catégorie (Histoire, Informatique, Sport, etc.)
- Répondre à une série de questions chronométrées (15s)
- Visualiser leur score avec un feedback personnalisé
- Enregistrer leur score dans un **leaderboard général**

---

## 📸 Aperçu visuel

![Welcome Screen](./public/screenshot-welcome.png)
![Question](./public/screenshot-question.png)
![Score](./public/screenshot-score.png)
![Leaderboard](./public/screenshot-leaderboard.png)

---

## 🚀 Fonctionnalités

- 🔐 **Authentification** via Supabase (email + mot de passe)
- 🧠 **Quiz dynamique** avec questions aléatoires par catégorie
- ⏱️ **Temps limité** : 15 secondes/question
- 🎯 **Résultats instantanés** avec feedback visuel et animation de barre de score
- 🏆 **Leaderboard** (Top 20) :
  - Scores des meilleurs utilisateurs
  - Affichage du rang si dans le top 10
- 📱 **Responsive Design** (mobile, tablette, desktop)
- 🍭 UI moderne avec Tailwind + shadcn/ui

---

## 🛠️ Stack technique

| Technologie      | Usage                          |
|------------------|--------------------------------|
| **React + Vite** | Frontend rapide & modulaire    |
| **Tailwind CSS** | Styling CSS utilitaire         |
| **shadcn/ui**    | Composants UI accessibles      |
| **Supabase**     | Authentification & base de données (PostgreSQL) |
| **Open Trivia DB** | API externe pour les questions |
| **Vercel**       | Déploiement frontend           |

---



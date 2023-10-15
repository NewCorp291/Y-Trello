#Documentation Technique - Y-Trello

##Aperçu du Projet

Ce projet est un clone de l'application de gestion de tâches Trello. Il permet au utilisateurs de créer, organiser et gérer des tâches de manière collaborative. 

###Voici les spécifités demandés :

- Un **Board** communiquant,
- 3 colonnes (ToDo, In progress, Done)
- Une connexion/inscription libre
- Mise à jour en "temps réel"

###Voici les Technologies utilisées : 

- **Front-end**: Next.js, Clerk.
**Pourquoi l'utilisation de Next.js et Clerk ?**
  **Next.js**(13) est un framework **React** pour construire des applications web Fullstack. On utilise **React Components** pour construire une interface utilisateur et **Next.js** pour des fonctionnalités supplémentaires et des optimisations.
  **Clerk** est une librairie JavaScript qui permet de mettre en place facilement un système d'authentification (signIn / signUp) et qui fonctionne parfaitement avec Next.js. Elle donne la possibilité de se connecter grâce plusieurs plate-forme (Google, Git, ...) ou de s'authentifier normalement.
  
- **Base de données**: Prisma Studio, Supabase.
**Pourquoi l'utilisation de Prisma Studio et Supabase ?**
  **Prisma Studio** est un **ORM** qui permet au utilisateurs de mettre en place facilement une base de donnée grace au fichier 'schema.prisma' et qui possède une interface utilisateur qui permet de modifier simplement les données de la base.   **Prisma Studio** à besoin d'être liée à une base de donnée, pour ça nous avons utilisé **Supabase** qui est un plateforme permettant de mettre en place rapidement des bases de données SQL (dans notre cas c'est une base **Postgres**).

- **Communication en temps réel**: Socket.io
**Pourquoi l'utilisation de Soket.io**
  **Socket.io** est une librairie qui permet une communication basé sur les events, bi-directionnel entre un client et un server.

- **Server**: Express.js
**Pourquoi l'utilisation de Express.js ?**
  Dans notre cas **Express.js** ne sert que de passerelle entre le "Back-end" de **Next.js** et **Express.js** pour la bonne utilisation de **Socket.io**.

##Fonctionnalités Clés :

1. **Authentification** : Connexion et inscription des utilisateurs via **Clerk**
2. **Création des Cartes** : Création d'une carte dans un des tableau en renseignant son titre
3. **Gestion des Cartes** : Modification du titre, de la descritption, de la priorité, de l'état
4. **Sauvegarde des données** : données stockées dans la base de donnée **Postgres SQL** sur **Supabase** grâce à **Prisma Studio**

##Installation

1. Clonez le répository :
```bash
git clone https://github.com/[votre_nom_utilisateur]/Y-Trello.git
```

2. Installez les dépendances du projet depuis un Terminal :
```bash
cd Y-Trello
npm install
```

3. Configurez les varaibles d'environnement. Créez un fichier '.env'  à la racine du projet et ajoutez les clés nécessaires pour **Next.js**, **Clerk** et **Supabase** :

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=VOTRE_CLEE_PUBLIQUE_POUR_NEXTJS_ET_CLERK
CLERK_SECRET_KEY=votre_clee_secrete_clerk
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

DATABASE_URL="l'url de votre base de donnée"
```
##Contact

Pour toute question ou préoccupation, veuillez contacter l'équipe de développement aux adresses mails : `lucas.dindault@ynov.com`, `etienne.bachelard@ynov.com`.

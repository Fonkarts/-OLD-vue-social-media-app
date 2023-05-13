# SebastienHOUCHET_7_03022022

PROCEDURE D'INSTALLATION (INSTALLATION STEPS, english version below)

1/ DESCRIPTION

GROUPOMANIA est un prototype de réseau social d'entreprise, réalisé notamment à l'aide de Vue.js, Node.js et MySQL, dans le cadre d'un projet OC.

2/ DEPENDANCES

BACK-END (sous Node.js 14.0, port 3000): 
Depuis le répertoire "...\groupomania-app\back\app" utiliser la commande "npm install"

optionnel :
- nodemon (équivalent back-end de live server, redémarre votre node après chaque sauvegarde)

FRONT-END (port 8080):
Depuis le répertoire "...\groupomania-app" utiliser la commande "npm install"

Les dépendances suivantes devraient être installées automatiquement ou pendant la configuration de vue et vueCLI, vérifiez votre dossier "node-modules":
- @vue/cli-plugin-babel 4.5 
- @vue/cli-plugin-eslint 4.5
- @vue/cli-plugin-router 4.5
- @vue/compiler-sfc 3.0
- core-js 3.6.5
- babel-eslint 10.1
- eslint 6.7.2
- eslint-plugin-vue 7.0
- node-sass 4.12.0
- sass-loader 8.0.2

!! PROBLEME POSSIBLE >>
Si VueCLI n'est pas installé globalement sur votre ordinateur, veillez à le faire avant de cloner ce projet.
Dans le cas contraire, l'installation de VueCLI + router écraseront les fichiers App.vue et Router.js, en plus de générer
des composants de base qui ne sont plus présents/référencés dans l'application.

3/ MySQL

Cette application utilise une base de données MySQL, vous aurez donc besoin :
- d'un prompt MySQL ou d'un GUI tel que MySQLWorkBench (que je vous recommande)
- de configurer votre profil root avec mot de passe
- de vérifier que le port utilisé pour la BDD est bien le 3306 (port par défaut)
- d'ouvrir dans votre IDE le fichier de l'application situé à "...\back\app\config\dbConfig.js" et de renseigner votre mot de passe root (ligne 5)
- d'exécuter enfin une query dans MySQL pour créer la BDD sur votre environnement, avec la commande "CREATE DATABASE groupomaniadb;".

4/ AVANT LE LANCEMENT

Avant de lancer l'application, rendez-vous dans le fichier "...\back\app\server.js" et vérifiez que les lignes 39 à 44 sont bien décommentées !
Ce code a besoin d'être exécuté une première fois au lancement de l'application. 
Il permet de lancer une fonction initialisant les rôles "user" et "moderator", mais aussi de réinitialiser la BDD au besoin en phase de test.
Si vous souhaitez conserver les données de la BDD après redémarrage du Node, recommentez-le.

5/ LANCEMENT

- Lancez votre BDD sur le port 3306 avec votre mot de passe root
- Depuis votre terminal, à "...\groupomania-app\back\app" exécutez "nodemon server" (ou votre commande node habituelle)
- Depuis ".../groupomania-app" exécutez "npm run serve" et ctrl+cliquez dans votre terminal sur "http://localhost:8080"

N'hésitez pas à m'envoyer un mp si vous rencontrez un soucis, bonne navigation !

-------------------------------------------------------------------------------

INSTALLATION STEPS

1/ DESCRIPTION

GROUPOMANIA is a social network prototype, realised with Vue.js, Node.js and MySQL as my last OpenClassrooms student project.

2/ DEPENDENCIES

BACK-END (with Node.js 14.0, port 3000):
From the "...\groupomania-app\back\app" folder, use "npm install"

optional :
- nodemon (quite like live server for back-end, restart your node on save)

FRONT-END (port 8080):
From the "...\groupomania-app" folder, use "npm install"

The following dependencies should be automatically installed, or installed during vue and vueCLI configuration. Check your "node-modules" folder :
- @vue/cli-plugin-babel 4.5 
- @vue/cli-plugin-eslint 4.5
- @vue/cli-plugin-router 4.5
- @vue/compiler-sfc 3.0
- core-js 3.6.5
- babel-eslint 10.1
- eslint 6.7.2
- eslint-plugin-vue 7.0
- node-sass 4.12.0
- sass-loader 8.0.2

!! KNOWN ISSUE >>
If VueCLI is not yet installed on your computer, be sure to do it before cloning this project as the installation process
will overwrite the App.vue and Router.js files, in addition to generate components that are not anymore handled by the app.
If this happens, you still have the possibility to copy/paste the overwritten files from this repo.

3/ MySQL

This app uses a MySQL data base, so you will need :
- a MySQL command prompt or a GUI like "MySQLWorkBench" (that I recommand)
- to configure your root profile and password
- to check that your DB is set on port 3306 (default port)
- to open the "...\back\app\config\dbConfig.js" file in your IDE and complete the 5th line with your root password
- to finally create the DB with "CREATE DATABASE groupomaniadb;" in your MySQL prompt/GUI.

4/ BEFORE LAUNCH

Before launching the app, open the "...\back\app\server.js" file in your IDE and be sure that the lines 39 to 44 are not commented !
You will need to execute that code at first launch to create the "user" and "moderator" roles. 
Moreover if that code is not commented, it restarts the DB as you restart Node.
One that code is read, you can choose to comment it for persistant data, or keep it uncommented to test/work on the app.

5/ LAUNCH

- Start your DB on port 3306, with your root password
- From "...\groupomania-app\back\app" in your IDE, execute "nodemon server" (or your usual node command)
- From "...\groupomania-app", execute "npm run serve" and then ctrl+click on "http://localhost:8080"

You can send me a pm if you're facing any issue, have a nice coding time !

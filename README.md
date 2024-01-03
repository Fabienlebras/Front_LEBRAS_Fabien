Plateforme de Rendez-vous pour la Vaccination - README


Ce projet consiste en la réalisation d'une plateforme destinée à la prise de rendez-vous pour la vaccination. Cette plateforme offre des fonctionnalités telles que la réservation en ligne de rendez-vous, la gestion des médecins, des centres de vaccination, et d'autres fonctionnalités liées à la vaccination.

# Frontend


## Le code source pour la partie frontend du projet est disponible sur GitHub à l'adresse suivante : https://github.com/Fabienlebras/Front_LEBRAS_Fabien.git.

Après avoir cloné le dépôt, suivez ces étapes pour installer les dépendances nécessaires :

Naviguez vers le dossier src du projet.

Exécutez la commande suivante pour installer les dépendances :

Installation des dépendances à l'aide de la commande : 
### npm install


Lancement de l'application à l'aide de la commande : 

### ng serve
L'application sera disponible sur le port 4200 en local, accessible via l'adresse : http://localhost:4200.

## Fonctionnalités Frontend

L'application frontend a été développée avec Angular et utilise le framework Angular Material. Voici quelques points importants concernant l'interface utilisateur :

La partie Front comporte une page page de Connexion et d'Inscription : http://localhost:4200/login

Gestion des Éléments : Chaque entité (docteurs, administrateurs, patients, vaccins, centres de vaccination) dispose d'une page dédiée permettant de visualiser la liste, ajouter, modifier ou supprimer des éléments.

http://localhost:4200/doctors pour les docteurs
http://localhost:4200/vaccinations pour la gestion des rendez-vous
http://localhost:4200/patients pour la gestion des patients 
http://localhost:4200/administrators pour la gestion des administrateurs
http://localhost:4200/centers pour la gestion des centres de vaccinations 

![admin](https://github.com/Fabienlebras/Front_LEBRAS_Fabien/assets/92375317/6d4b9b6b-2611-4c75-9430-d69612439839)
![Ajout](https://github.com/Fabienlebras/Front_LEBRAS_Fabien/assets/92375317/e056e8d8-4386-409c-b61b-d1052ea6dc12)
![Modif](https://github.com/Fabienlebras/Front_LEBRAS_Fabien/assets/92375317/2fe79935-c0cf-460e-855b-bebe28ba3fab)


### Backend

## Je n'ai pas réussi à mettre en place la partie concernant la Basic Aut

Configuration

Clonage du Projet
Le code source pour la partie backend est disponible sur GitHub à l'adresse suivante : https://github.com/Fabienlebras/CovidAPI_LEBRAS.git

Clonez le dépôt avec la commande suivante :
git clone https://github.com/Fabienlebras/CovidAPI_LEBRAS.git

## Configuration de la Base de Données

Accédez au dossier des ressources :

### cd src/main/resources

Modifiez le fichier application.yaml pour adapter les informations de connexion à votre base de données :
datasource:
  url: VOTRE_URL
  username: VOTRE_UTILISATEUR
  password: VOTRE_MOT_DE_PASSE

Lancement de l'Application
Retournez à la racine du projet :

Exécutez l'application Spring Boot :

L'application backend sera disponible sur http://localhost:8080.



## Le backend est structuré en quatre dossiers principaux :

Models : Contient les classes représentant les entités du système (docteurs, administrateurs, patients, vaccins, centres de vaccination).

Repository : Contient les interfaces JpaRepository pour chaque entité, fournissant des méthodes pour interagir avec la base de données.

Service : Contient les services qui implémentent la logique métier de l'application.

Controller : Contient les contrôleurs qui exposent les endpoints REST pour chaque entité.

## Fonctionnalités Backend

Endpoints  : L'API offre des endpoints permettant d'effectuer des opérations CRUD (Create, Read, Update, Delete) sur chaque entité du système (docteurs, administrateurs, patients, vaccins, centres de vaccination).

Gestion de la Base de Données : Les opérations sur la base de données (CRUD) sont effectuées en utilisant les fonctionnalités de Spring Data JPA.

## Implémentation de deux tests : 

Ces tests utilisent mockitos pour isoler les services du backend, assurant ainsi que chaque composant fonctionne correctement de manière indépendante. Vous pouvez exécuter ces tests pour vous assurer que l'ajout et la suppression des patients fonctionnent comme prévu.


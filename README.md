--- | API DE GESTION DE BOOKMARK | ---

Voici les étapes pour essayer le projet :

1 - Installation de la Base de données PostgreSQL :

    - Créer une BDD nommée 'bookmark' ainsi qu'un schéma nommé 'public' 
    ('public' est le schéma par défaut dans pgAdmin)
    - Ouvrir le fichier BDD.sql fourni
    - Copier coller tout le script SQL dans pg admin par exemple
    
La BDD doit avoir ces données :
Pour des raisons évidente, l'accès à la base n'est pas caché et l'utilisation de 'dotenv' n'a pas été utilisé pour simplifier le test

    - database: 'bookmark'
    - user: 'postgres'
    - password: 'root'
    - port: 5432

2 - Executer npm install nécessaire pour installer les dépendances

    - npm install

3 - Démarrage du programme : 

    - npm run dev

Des erreurs vont persistées au démarrage en disant que certaines propriétés n'existent pas dans 'OembedData'. Toutefois, cela n'impact en rien le projet et sont rajoutables à la main dans la fonction "extract" si souhaité.

4 - Utilisation de postman (ou équivalent) pour essayer les requêtes suivantes (jeux d'essai): 

    - Affiche tous les bookmarks en BDD
        GET : http://localhost:8000/api/bookmark
        résultat attendu : [] (vide)
    
    - Ajouter une vidéo
        POST : http://localhost:8000/api/bookmark?url=https://vimeo.com/565486457
        résultat attendu : ajout en BDD

    - Ajouter une photo
        POST : http://localhost:8000/api/bookmark?url=https://www.flickr.com/photos/feuilllu/45771361701/
        résultat attendu : ajout en BDD

    - Affiche tous les bookmarks en BDD
        GET : http://localhost:8000/api/bookmark
        résultat attendu : La vidéo et la photo avec toutes les informations
    
    - Modification d'un bookmark par un autre
        PUT : http://localhost:8000/api/bookmark?oldUrl=https://vimeo.com/565486457&newUrl=https://vimeo.com/506021174
        résultat attendu : l'ancienne URL '565486457' doit disparaître pour afficher '506021174' dans le champ URL de la BDD et tous les champs doivent être modifiés par les données de la nouvelle vidéo.

    - Suppression d'une vidéo
        DELETE : http://localhost:8000/api/bookmark?url=https://vimeo.com/506021174
        résultat attendu : Doit supprimer la nouvelle vidéo qui vient d'être ajouté par l'UPDATE.

    - Affiche tous les bookmarks en BDD
        GET : http://localhost:8000/api/bookmark
        résultat attendu : La photo avec toutes ces informations (suppression de la vidéo)
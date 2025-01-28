# entreprise-search-app
Application web open source permettant de rechercher des entreprises en fonction de leur code postal et de leur code NAF via l'API officielle des entreprises françaises.


```markdown
# Entreprise Search App

**Entreprise Search App** est une application web simple qui permet de rechercher des entreprises françaises en fonction de leur **code postal** et de leur **code NAF**. Elle utilise l'[API officielle des entreprises françaises](https://recherche-entreprises.api.gouv.fr) pour obtenir des données précises et à jour.

## 🎯 Fonctionnalités

- **Recherche d'entreprises :**
  - Renseignez un **code postal** et un **code NAF** pour filtrer les entreprises correspondantes.
  - Résultats affichés avec les informations suivantes :
    - Nom de la société
    - SIRET
    - Dirigeant
    - Adresse complète
    - Code postal
- **Pagination :**
  - Navigation entre les pages de résultats.
- **Indicateur de chargement :**
  - Affichage d'un message de chargement pendant la récupération des données.
- **Gestion des erreurs :**
  - Alertes en cas de problème avec l'API ou d'absence de résultats.

## 🖥️ Installation

Aucune installation n'est nécessaire ! Il vous suffit d'ouvrir le fichier `index.html` avec un navigateur web pour commencer à utiliser l'application.

### Structure du projet

```plaintext
.
├── index.html    # Fichier HTML principal
├── styles.css    # Feuille de styles pour la mise en page
└── script.js     # Fichier JavaScript contenant la logique
```

## 🌐 Utilisation

1. Ouvrez le fichier `index.html` dans votre navigateur.
2. Remplissez les champs suivants dans le formulaire :
   - **Code postal** : Exemple `75001`
   - **Code NAF** : Exemple `62.01Z`
3. Cliquez sur le bouton **Rechercher**.
4. Consultez les résultats paginés dans le tableau.
5. Utilisez les boutons **Précédent** et **Suivant** pour naviguer entre les pages.

## 🚀 Fonctionnement

L'application interagit avec l'[API officielle des entreprises françaises](https://recherche-entreprises.api.gouv.fr) pour obtenir les informations demandées. Elle utilise JavaScript pour gérer les appels API, afficher les résultats, et gérer la pagination.

### Exemple d'appel API

```javascript
const queryParams = new URLSearchParams({
  activite_principale: nafCode,
  code_postal: postalCode,
  page: page,
  per_page: 10,
  etat_administratif: 'A'
});

const response = await fetch(`https://recherche-entreprises.api.gouv.fr/search?${queryParams}`);
```

## 🛠️ Dépendances

- **Aucune** : Ce projet utilise uniquement du HTML, CSS et JavaScript vanilla, sans frameworks ni bibliothèques externes.

## 🔍 Démo en ligne


Vous pouvez tester l'application [ici](https://giiver.github.io/entreprise-search-app/).


## 📃 Licence

Ce projet est sous licence **MIT**. Vous êtes libre de l'utiliser, de le modifier et de le distribuer, même à des fins commerciales. Consultez le fichier [LICENSE](LICENSE) pour plus de détails.

---

🎉 **Profitez de cette application et n'hésitez pas à contribuer si vous le souhaitez !**`


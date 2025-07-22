# 2DoIT Front

This project is the front part of a personnal project to create a note/todo list website that enables one to have shared-with-others items in a personnal todo list

## DEVELOPMENT

Uses :

- Node
- pnpm

### FIRST INSTALLATION

<details>
Cloner le repo vite-amidon dans un dossier (dossier où seront les projets qui utiliseront le modèle) :

```
git clone git@github.com:AmiDon-App/vite-model-amidon.git
```

Ouvrir un terminal dans le dossier où le modèle vite-amidon a été cloné et utiliser la commande d'installation :

```
./vite-amidon/bin/install.sh
# si nécessaire, donner les droits à ce fichier :
# `chmod +x ./vite-amidon/bin/install.sh`
```

Renseigner :

```
git@github.com:MarionLeblanc77/2DoIt_front.git
```

La première fois, cette installation lance VSC, installe les dépendances et active aussi le serveur de dev sur localhost:5173. Le site est normalement accessible sur http://localhost:5173/.

</details>

### RUN LOCALLY

Run on http://localhost:5173/ with:

```bash
pnpm dev
```

## VITE

This template is the original base template of vite that provides a minimal setup to get React working in Vite with HMR and some ESLint rules + a few changes.

## READ-ME FROM VITE TEMPLATE

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Done on top of base VITE config

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## READ-ME FROM MARION

- eslint d'Airbnb (une référence)
- sass
- prettier
- d'autres choses modifier pour coller au modèle du react-vite-model d'O'Clock
- Passage du <html lang="fr"> pour des sites en français
- Ajout d'un reset de style css
- Mise à zéro de App et main
- Suppression des logos et assets par défaut
- Ajout des dépendances React : react react-router-dom redux react-redux @reduxjs/toolkit react-dom
- Ajout de la bibliothèque d'icone : feather-icons
- Ajout de l'extension de language CSS : sass

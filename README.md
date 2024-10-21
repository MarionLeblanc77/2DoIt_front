# vite-amidon

This template is the original base template of vite that provides a minimal setup to get React working in Vite with HMR and some ESLint rules + a few changes.

## READ-ME FROM VITE TEMPLATE

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## READ-ME FROM MARION

+ eslint d'Airbnb (une référence)
+ sass
+ prettier
+ d'autres choses modifier pour coller au modèle du react-vite-model d'O'Clock
+ Passage du <html lang="fr"> pour des sites en français
+ Ajout d'un reset de style css
+ Mise à zéro de App et main
+ Suppression des logos et assets par défaut
+ Ajout des dépendances React : react react-router-dom redux react-redux @reduxjs/toolkit react-dom 
+ Ajout de la bibliothèque d'icone : feather-icons
+ Ajout de l'extension de language CSS : sass

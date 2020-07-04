# Travel Agency App

This part of the documentation will get in depths on how we structured and organized the [travel-agency](https://github.com/pedrogoncalvesk/travel-agency).

## Project summary

This project was initially generated using the [Expo ecosystem  (SDK, CLI, Client)](https://expo.io/tools).

## Folder structure

In this project, we used a very common folder structure, following some base market principles.

- [src](#src-folder)
    - [assets](#assets)
    - [components](#components)
    - [config](#config)
    - [locale](#locale)
    - [routes](#routes)
    - [store](#store-deprecated)
    - [styled](#styled)
    - [utils](#utils)

---
### [Src Folder](#src-folder)

The src folder contains all the main files for the project with the business logic.

#### [Assets](#assets)

General static files for the project, like images, jsons, icons and others. The translation files for the project (`.json`) can be found inside the locale folder.

#### [Components](#components)

Contains all the components that can be used throughout the project. These components generally have generic logic.

#### [Config](#config)

Within this folder there are important files for configuring the project. The `constants.ts` file will define routes names, general react-native-maps settings, endpoints for the API, etc.
The files `images.js`, `locale.ts` and `theme.js` have the responsibility of defining some settings for injecting static files into the project and generally refer to the assets folder.

#### [Locale](#locale)

This is only used to configure the translation lib.

#### [Routes](#routes)

The app project is using the [react-navigation](https://reactnavigation.org/) library to create this "routes". All the system modules organized in folders, for each system route there must be an index file with all the default module JSX.
<br/><br/>
As for now sub-routing is implemented in each route, and each route folder can contain componentes/helpers sub folder to even further help organazing the code base.

#### [Store (deprecated)](#store-deprecated)

This is the redux folders. This should certainly be migrated to Hooks/Context and to StateManager created by us (inside the utils folder).

#### [Styled](#styled)

Contains all generic style components to be used throughout the project.

#### [Utils](#utils)

The utils folder contains all auxiliary and generic files that implement logic. For example, the library that makes the API request is inside this folder. As well as several map operations files.


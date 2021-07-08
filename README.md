Project made with Angular, Angular Material and NGRX

# Back end of the project @ https://github.com/TesaRocks/finalProject

Made by me. Please have a look

# How I like to work (on the front end specifically):

## General architecuture:

- I create a module per each main feature of the app.
- A NAV module is created as per the app's requirements.
- Each module will have a routing-module.ts file.
- Each module will have a model interface definition (when applies).
- Each module will have a http service file (when applies).
- If state modification is involved, the module will have a "NGRX" folder, having the following files:
  - Actions.ts.
  - Effects.ts (if backend calls apply).
  - Reducer.ts.
  - Selectors.ts.
  - For the above I like to work with NGRX Schematics to minimize bugs.
- I create a "shared" module containing error messages and delete confirmations among other features.
  - I have in this folder my Angular Material Module to be shared between the app. when neccessary.
- The app level directory will have an application-state file with the overall state app.
- Naming variables is with camel case formatting, being very descriptive with the naming.
- I like to have the html files clean with zero styling. If there is need for style it will be stored at the html's style sheet accordingly.

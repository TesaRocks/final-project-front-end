# Project made with Angular, Angular Material and NGRX

## Back end of the project @ https://github.com/TesaRocks/finalProject Made by myself. Please have a look

## The state of this project is managed via NGRX throughout all its modules.

## HTML components are made using Angular Material.

## General architecuture:

- A NAV module is created as per the app's requirements.
- I create a module per each main feature of the app.
- Each module will have sub folders with features corresponding to that module.
- Each module will have a routing-module.ts file.
- Each module will have a model interface definition (when applies).
- Each module will have a http service file (when applies).
- If state modification is involved, the module will have a "NGRX" folder, having the following files:
  - Actions.ts.
    - I have a Begin, Succes, Failure pattern for each action.
  - Effects.ts (if backend calls apply).
  - Reducer.ts.
  - Selectors.ts.
  - For the above I like to work with NGRX Schematics to minimize bugs.
- For best UI experience:
  - I have loading spinners whenever an API call is made to the backend. Such spninners on/off triggers are created at the corresponding reducer file.
  - I fetch data in a PAGINATED form to have less traffic between calls.
  - Delete confirmation and custom error messages are created and shared among the app.
- I create a "shared" module containing the above mentioned messages and:
  - Angular Material Module to be shared between the app. when neccessary.
- The app level directory will have an application-state file with the overall state app.
- Naming variables is with camelCase formatting, being very descriptive with the naming.
- Avoiding hard coded values always.
- I like to have the html files clean with zero styling. If there is need for style it will be stored at the html's style sheet accordingly.
- I use Angular Material for all of the HTML components and Material Icons when neccessary.
- I make the app mobile responive.
- Regarding typescript, I like to type variables as much as possible. Not using the "any" keyword and never disabling the null checks, always working around it.

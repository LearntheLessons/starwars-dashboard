# Star Wars Film Explorer

## Overview

The Star Wars Film Explorer is an Angular application that fetches and displays a list of Star Wars films using the [SWAPI](https://swapi.dev/api/films) API. The application is structured with lazy-loaded modules, allowing for optimized loading of features and components. It also includes a communication layer between the main application and the lazy-loaded module, dynamically registering additional routes at runtime and passing values through the communication layer.

## Features

- **Lazy Loading**: The application uses lazy-loaded modules to enhance performance by loading features only when required.
- **Communication Layer**: A simple communication layer is established between the main application and lazy-loaded modules using Angular services, allowing for data and event flow.
- **Dynamic Route Registration**: Additional routes are registered dynamically within the lazy-loaded module when it initializes.
- **Film Details Navigation**: Users can click on a film to view its details, leveraging the Star Wars API to fetch data.
- **DataPassing Between Module and ChildComponnent**: Data passing between
Header Component Back Navigation and FilmDetail component has been established.

## Technologies Used

- Angular 18
- Angular Material for UI components
- RxJS for handling asynchronous data streams
- TypeScript
- NgRx for Store management

## Getting Started

### Prerequisites

- Node.js (version >= v20.18.0)
- Angular CLI (version >= 18)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/LearntheLessons/starwars-dashboard.git
   cd starwars-dashboard
   npm i
   ng serve
   ng test
   ```

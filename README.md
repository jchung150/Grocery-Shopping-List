# Project Title

Intelligent Grocery Shopping Cart!

[View-Demo](https://juanchung.net)

## Description

Intelligent Grocery Shopping Cart is a sophisticated application that allows users to manage their grocery lists effectively. Users can add, update, and delete lists and items within each list. Enhanced with advanced features such as voice-controlled item addition and recipe recommendations based on the items in the cart, this app streamlines the grocery shopping experience.

## Screenshots

### Home Page

![Home Page](path_to_your_image/home-page.png)

### Adding Items

![Adding Items](path_to_your_image/adding-items.png)

### Voice Control Feature

![Voice Control](path_to_your_image/voice-control.png)

### Recipe Recommendations

![Recipe Recommendations](path_to_your_image/recipe-recommendations.png)

## Features

- **Add, Update, and Delete Grocery Lists**: Manage multiple grocery lists with ease.
- **Voice-Controlled Item Addition**: Add items to your list using voice commands for hands-free convenience.
- **Recipe Recommendations**: Get recipe suggestions based on the items currently in your cart.
- **Persistent Storage**: Utilize IndexedDB for offline data storage, ensuring your lists are always accessible.
- **Responsive Design**: Optimized for both desktop and mobile devices using Material-UI components.
- **Real-Time Data Fetching**: Leveraging SWR for efficient data fetching and caching.
- **Iconography**: Enhanced visual appeal using FontAwesome and Material Icons.

## Technologies Used

- **React**: Front-end library for building user interfaces.
- **Vite**: Fast and lightweight build tool for frontend development.
- **Material-UI (MUI)**: React UI framework for implementing responsive designs.
- **FontAwesome**: Icon library for enhancing the visual appeal of the application.
- **Axios**: Promise-based HTTP client for making API requests.
- **Dexie**: Wrapper library for IndexedDB to handle client-side data storage.
- **dotenv**: Module to load environment variables from a `.env` file.
- **React Speech Recognition**: Enables voice recognition for voice-controlled features.
- **SWR**: React Hooks library for data fetching.
- **ESLint**: Linting tool to maintain code quality and consistency.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Operating System**: Windows 10, macOS, or Linux
- **Node.js**: Version 14.x or higher
- **npm**: Version 6.x or higher (comes with Node.js)

## Installing

Follow these steps to set up the project locally:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/jchung150/Grocery-Shopping-List.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd Grocery-Shopping-List
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Configure Environment Variables**

   - Create a `.env` file in the root directory.
   - Add any necessary environment variables as required by the application. For example:

     ```
     REACT_APP_API_KEY=your_api_key_here
     ```

   - **Note**: Ensure you do not commit your `.env` file to version control as it may contain sensitive information.

## Executing the Program

To run the application locally, follow these steps:

1. **Start the Development Server**

   ```bash
   npm run dev
   ```

2. **Open in Browser**

   - Once the server is running, navigate to `http://localhost:3000` in your web browser to view the application.

## Authors

- **Juan Chung** - [https://juanchung.net](https://juanchung.net)

## Version History

- **0.1** - _Initial Release_
  - Implemented core features: add, update, and delete grocery lists and items.
  - Integrated voice-controlled item addition using `react-speech-recognition`.
  - Added recipe recommendation feature leveraging the Spoonacular API.
  - Set up project environment with React, Vite, and Material-UI (MUI).
  - Configured state management with SWR and Dexie for offline storage.

## License

Distributed under the **MIT License**. See `LICENSE.txt` for more information.

## Acknowledgments

- [Awesome Readme](https://github.com/matiassingers/awesome-readme) for providing inspiration and guidelines.
- [Spoonacular API](https://spoonacular.com/food-api) for enabling recipe recommendations based on grocery items.
- [Material-UI (MUI)](https://mui.com/) for the comprehensive UI framework.
- [React Speech Recognition](https://github.com/JamesBrill/react-speech-recognition) for facilitating voice-controlled features.
- [Dexie](https://dexie.org/) for simplifying interactions with IndexedDB.
- [SWR](https://swr.vercel.app/) for efficient data fetching and caching.
- [FontAwesome](https://fontawesome.com/) and [@mui/icons-material](https://mui.com/components/icons/) for enhancing the visual appeal with icons.
- [Axios](https://axios-http.com/) for handling HTTP requests seamlessly.
- [Vite](https://vitejs.dev/) for providing a fast and optimized development environment.

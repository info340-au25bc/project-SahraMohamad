#  Meal Planning Application

This is a comprehensive meal planning web application that helps users manage their fridge inventory, discover new recipes, and plan their meals efficiently.

## Features

### Recipe Exploration
- Browse and search through a wide variety of recipes powered by the Spoonacular API free version, and it only works on 3 tries.
- Filter recipes by meal type (breakfast, lunch, dinner, dessert, etc.)
- Sort recipes by popularity, time, or calories
- View detailed recipe information including ingredients and instructions
- Add favorite recipes to your personal meal collection

### Fridge Management
- Track items in your fridge with expiration dates
- Upload custom photos of your food items
- Receive alerts for items expiring soon
- Visual expiration status indicators (expired, urgent, soon)
- Remove items as you use them

### My Meals Collection
- Save your favorite recipes for easy access
- Filter saved meals by type
- Remove meals from your collection with one click
- Persistent storage using Firebase

### User Authentication
- Sign up and log in with email/password
- Secure authentication powered by Firebase
- Personalized meal collections per user

## Technologies Used

- Frontend Framework: React 18 with Vite
- Styling: Custom CSS with responsive design
- Backend/Database: Firebase (Authentication & Firestore)
- API: Spoonacular Recipe API


### Installation

1. Clone the repository:

git clone https://github.com/info340-au25bc/project-SahraMohamad.git
cd project-SahraMohamad


2. Install dependencies:

npm install



4. Start the development server:

npm run dev


5. Open your browser and navigate to local host

## Building for Production


npm run build


## Deployment

The application is configured for deployment on Firebase Hosting:


npm run build
firebase deploy



## Features in Detail

### Recipe Cards
- Display recipe images with for optimal viewing
- Show meal type tags (e.g., Healthy, Vegetarian)
- Display calorie information
- Toggle favorites with heart button

### Fridge Items
- Visual display with item images
- Centered vertical layout for clean presentation
- Expiration date tracking with color-coded alerts
- Easy removal with confirmation dialog

### Responsive Design
- Mobile first approach
- Breakpoints for tablet and mobile devices
- Grid layouts automatically adjust to single column on smaller screens


## Acknowledgments

- Recipe data powered by [Spoonacular API](https://spoonacular.com/food-api)
- Authentication and database provided by [Firebase](https://firebase.google.com/)
- Fruit images from various sources

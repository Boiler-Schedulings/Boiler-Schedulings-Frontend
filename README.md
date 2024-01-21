# Boiler Schedulings

## Introduction

Boiler Schedulings is a cutting-edge web application designed to transform the way students plan their academic schedules. Leveraging an AI-driven conversational interface, this tool combines a Robust Answer Generation (RAG) system with vector databases to offer personalized and interactive scheduling solutions. Its primary goal is to simplify and optimize academic planning, making it a stress-free and efficient experience for students.

## Features

- **AI-Powered Chat Interface**: Engage in natural conversations with our AI to plan your schedule.
- **Dynamic Widgets**: Visualize your schedule with interactive widgets displaying class recommendations, professor ratings, and course insights.
- **Real-Time Updates**: Get instant recommendations and schedule adjustments based on your preferences and academic requirements.

## Technology Stack

- **Front-End**: React.js for a responsive and dynamic user interface.
- **Back-End**: Node.js/Python for server-side logic.
- **Database**: Firebase Realtime Database for storing user data and chat history.
- **Authentication**: Firebase Authentication for secure user access.
- **AI and Data Handling**: RAG system integrated with vector databases for intelligent response generation.

## Getting Started

### Prerequisites

Before setting up the project, ensure you have the following installed:
- Node.js (v14.x or later)
- npm (v6.x or later) or Yarn (v1.22.x or later)
- A Firebase account for database and authentication setup

### Installation

1. Clone the GitHub repository:
   ```bash
   git clone https://github.com/your-repository/Boiler-Schedulings.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Boiler-Schedulings
   ```
3. Install the necessary dependencies:
   ```bash
   npm install
   ```
4. Set up Firebase:
    - Create a new Firebase project in the [Firebase Console](https://console.firebase.google.com/).
    - Enable Realtime Database and Authentication in your Firebase project.
    - Add your Firebase project configuration to a `.env` file at the root of the project:
      ```
      REACT_APP_FIREBASE_API_KEY=your_api_key
      REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
      REACT_APP_FIREBASE_DATABASE_URL=https://your_project_id.firebaseio.com
      REACT_APP_FIREBASE_PROJECT_ID=your_project_id
      REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
      REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
      REACT_APP_FIREBASE_APP_ID=your_app_id
      ```

### Running the Application

1. Start the application locally:
   ```bash
   npm start
   ```
2. Access the application at [http://localhost:5173](http://localhost:3000).

## Usage

After launching Boiler Schedulings, log in using your university credentials. The AI chat interface will greet you, prompting you to start discussing your scheduling needs. You can ask questions or provide information about your preferred courses, timings, and professors. The AI will use this information to generate a personalized schedule, displayed in dynamic widgets. Interact with these widgets to refine your schedule, view professor ratings, and get detailed course descriptions.

## Contributing

Contributions are what make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the GNU GENERAL PUBLIC LICENSE. See `LICENSE` for more information.

## Acknowledgments

- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [Node.js](https://nodejs.org/)
- [Purdue University](#)

---
ADME provides a comprehensive overview of your project, including how to set it up, run it, and contribute to it. Remember to replace placeholder URLs and texts with actual information relevant to your project.
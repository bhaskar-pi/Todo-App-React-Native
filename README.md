# React Native Expo Task Manager

A task management application built using React Native and Expo. This application allows users to create, update, and delete tasks, categorized into different sections such as Work, Education, Personal, and Social.

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Running the Server](#running-the-server)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## About the Project

The Task Manager app is designed to help users manage their tasks efficiently. Users can categorize tasks, set priorities, and track the status of each task. The app is built using React Native and Expo, providing a seamless experience across both Android and iOS platforms. The backend server is built using Node.js and Express.

## Features

- **Task Creation**: Users can create new tasks with details such as category, name, description, start date, end date, priority, and status.
- **Task Management**: Update or delete existing tasks.
- **Categorization**: Tasks can be categorized into Work, Education, Personal, and Social.
- **Status Tracking**: Track the status of tasks as Pending, In Progress, or Completed.
- **Responsive Design**: Works seamlessly on both Android and iOS devices.

## Installation

1. **Clone the repository**:
    ```sh
    git clone  https://github.com/bhaskar-pi/Todo-App-React-Native.git
    cd task-manager-app
    ```

2. **Install dependencies for the frontend**:
    ```sh
    cd client
    npm install
    ```

3. **Install dependencies for the backend**:
    ```sh
    cd server
    npm install
    ```

4. **Install Expo CLI**:
    If you don't have Expo CLI installed, you can install it globally using npm:
    ```sh
    npm install -g expo-cli
    ```

## Configuration

### Environment Variables

1. **Backend Configuration**:
    Create a `.env` file at the root of your server directory with the following content:
    ```
    PORT=5000
    DB_HOST=your-database-host
    DB_USER=your-database-user
    DB_PASSWORD=your-database-password
    DB_NAME=your-database-name
    ```

## Running the Application

### Running the Frontend

1. **Start the Expo server**:
    ```sh
    cd client
    npm start
    ```

2. **Run on your device**:
    - Use the Expo Go app to scan the QR code from your terminal.
    - Alternatively, you can run the app on an emulator or simulator.

### Running the Server

1. **Start the server**:
    ```sh
    cd server
    npm start
    ```

2. **Server should be running at**:
    ```
    http://localhost:5000
    ```


## Usage

Once the application is running, you can:
- **Create Tasks**: Add new tasks by providing details like category, task name, description, dates, priority, and status.
- **View Tasks**: Browse through the list of tasks categorized into different sections.
- **Update Tasks**: Modify the details of existing tasks.
- **Delete Tasks**: Remove tasks that are no longer needed.
- **Track Progress**: Monitor the status of tasks and update them as needed.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

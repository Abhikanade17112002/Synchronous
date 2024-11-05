# Project Name
A high-performance, full-stack web application delivering real-time communication, robust file handling, and an elegant, responsive design. Developed with the latest technologies, this application ensures secure, efficient, and scalable user experiences.

---

## 🚀 Project Overview

This project is a full-stack application providing users with real-time chat functionality, file uploads, secure JWT-based authentication, and a responsive user interface that scales beautifully across devices. It is designed with an emphasis on modularity, security, and maintainability.

---

## 🏆 Features

- **Frontend Framework**: Developed using **React** with Vite for enhanced development speed and optimized build processes.
- **UI Library**: **ShadCN** components are used to create a clean, cohesive design and reusable elements.
- **Styling**: **Tailwind CSS** provides a fully responsive design, allowing seamless transitions between devices.
- **Authentication**: Secure JWT-based authentication ensures that only authorized users have access.
- **File Handling**: File and image uploads are managed with **Multer**, supporting a range of media.
- **Messaging**: Real-time, instant communication with **Socket.io** for group and individual chats.
- **Emoji Picker**: Emoji integration for enhanced user engagement.
- **Backend Framework**: Built with **Node.js** and **Express** for handling complex backend processes efficiently.
- **Database**: **MongoDB** stores and retrieves data with speed and reliability.
- **State Management**: Managed using **Redux Toolkit** and `createAsyncThunk` for efficient asynchronous actions and predictable state.
- **API Handling**: **Axios** facilitates smooth API communication between client and server.
- **Code Quality**: Modular, well-documented, and scalable code design for future maintainability.

---

## 🛠 Tech Stack

| Layer                | Technology                                               |
|----------------------|----------------------------------------------------------|
| **Frontend**         | React, Vite, ShadCN, Tailwind CSS, Socket.io Client, Redux Toolkit |
| **Backend**          | Node.js, Express, Socket.io                              |
| **Database**         | MongoDB                                                  |
| **Authentication**   | JWT                                                      |
| **File Management**  | Multer                                                   |
| **API**              | Axios                                                    |

---

## 📂 Project Structure

The project is structured into two main directories:

1. **Client**: Frontend files and configurations are located in the `client` folder.
2. **Server**: Backend files, routes, controllers, and configurations are in the `server` folder.

---

### 📁 Directory Structure Overview

```plaintext
project-name/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── App.js
│   │   └── main.js
│   └── package.json
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
└── README.md
```

---

## 📸 App Screenshots

|                     |                     |                     |
|---------------------|---------------------|---------------------|
| ![Screenshot 1](https://github.com/Abhikanade17112002/Synchronous/blob/main/client/src/assets/SynchronousHome.png) | ![Screenshot 2](https://github.com/Abhikanade17112002/Synchronous/blob/main/client/src/assets/SynchronousProfile.png) | ![Screenshot 3](https://github.com/Abhikanade17112002/Synchronous/blob/main/client/src/assets/SynchronousChat.png) |
| ![Screenshot 4](https://github.com/Abhikanade17112002/Synchronous/blob/main/client/src/assets/SignUp.png) | ![Screenshot 5](https://github.com/Abhikanade17112002/Synchronous/blob/main/client/src/assets/SynchronousChat.png) | |



---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (version X.X or later)
- MongoDB (local or cloud instance)
- Git

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/yourproject.git
   cd yourproject
   ```

2. **Install Dependencies**:

   Install all dependencies for both client and server.

   ```bash
   npm install && npm install --prefix client
   ```

3. **Environment Variables**:

   Create a `.env` file in the `server` directory with the following variables:

   ```plaintext
   PORT=your_port
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the Application**:

   - **Development**:

     ```bash
     npm run dev
     ```

   - **Production**:

     ```bash
     npm run build
     npm start
     ```

---

## 📜 Client `package.json`

The following dependencies are required for the client:

```json
{
  "name": "client",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-redux": "^9.1.2",
    "axios": "^1.7.7",
    "socket.io-client": "^4.8.1",
    "tailwindcss": "^3.4.14",
    "emoji-picker-react": "^4.12.0",
    "@reduxjs/toolkit": "^2.3.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.2",
    "eslint": "^9.11.1",
    "postcss": "^8.4.47",
    "vite": "^5.4.8"
  }
}
```

---

## 📜 Server `package.json`

The following dependencies are required for the server:

```json
{
  "name": "server",
  "version": "1.0.0",
  "scripts": {
    "dev": "nodemon server/server.js",
    "build": "npm install && npm install --prefix client && npm run build --prefix client",
    "start": "nodemon server/server.js"
  },
  "dependencies": {
    "express": "^4.21.1",
    "mongoose": "^8.7.2",
    "socket.io": "^4.8.1",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5-lts.1",
    "cors": "^2.8.5"
  }
}
```

---

## 🤝 Contributing

We welcome contributions to enhance the application! To contribute:

1. **Fork** the repository.
2. **Clone** your forked repository.
3. **Create** a branch for your feature (`git checkout -b feature-branch`).
4. **Commit** your changes (`git commit -m 'Add new feature'`).
5. **Push** to your branch (`git push origin feature-branch`).
6. **Open** a Pull Request.

---

## 📄 License

This project is licensed under the **ISC License**.

---

Thank you for exploring this project! If you have questions or need support, please feel free to reach out.

---

This `README.md` is designed for clarity and professionalism, with visually appealing sections and in-depth details. Let me know if you’d like any further adjustments!

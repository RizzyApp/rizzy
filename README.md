# Rizzy

**Rizzy** is a modern dating application designed to connect people meaningfully. Built with cutting-edge technologies, it provides a seamless experience for users to find matches, chat, and build connections. The app features a C# ASP.NET backend, an Entity Framework-powered database, and a React-based frontend.

# Demo Video

https://github.com/user-attachments/assets/2fea6296-c3e3-4946-a031-59be6678908b

## Features

- **User Profiles**: Create and customize your profile with photos and personal information.
- **Matching Algorithm**: Intelligent matching based on preferences and interests.
- **Real-Time Chat**: Instant messaging with your matches.
- **Discover Feature**: Swipe through profiles and discover potential matches.
- **Secure Authentication**: Login with secure credential handling.
- **Scalable Infrastructure**: Robust architecture for handling a growing user base.

---

## Tech Stack

- [![C# ASP.NET Core](https://img.shields.io/badge/C%23%20ASP.NET%20Core-512BD4?style=for-the-badge&logo=.net&logoColor=white)](https://dotnet.microsoft.com/)
- [![Entity Framework](https://img.shields.io/badge/Entity%20Framework-6DB33F?style=for-the-badge&logo=ef&logoColor=white)](https://learn.microsoft.com/en-us/ef/)
- [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
- [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
- [![Identity Framework](https://img.shields.io/badge/Identity%20Framework-35495E?style=for-the-badge&logo=auth0&logoColor=white)](https://learn.microsoft.com/en-us/aspnet/core/security/authentication/)
- [![SignalR](https://img.shields.io/badge/SignalR-5C2D91?style=for-the-badge&logo=dotnet&logoColor=white)](https://learn.microsoft.com/en-us/aspnet/core/signalr/introduction)
- [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
- [![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
- [![SQL Server](https://img.shields.io/badge/SQL%20Server-CC2927?style=for-the-badge&logo=microsoftsqlserver&logoColor=white)](https://www.microsoft.com/en-us/sql-server)
- [![.NET SDK](https://img.shields.io/badge/.NET%20SDK-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/en-us/download)
- [![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/) 


### Backend

- ** ASP.NET CoreASP.NET Core **
  - API development
  - Business logic implementation
- ** Entity Framework **
  - Database ORM
  - Supports migrations and queries
  - Database compatibility

### Frontend
- ** JavaScript/React **
  - Dynamic, responsive user interface
  - Component-based design for maintainability
  - Styled with Tailwind CSS 

### Additional Technologies
- **Authentication**: Identity Framework
- **Real-Time Communication**: SignalR  for chat
- ** Node.js and npm  and  **

---

## Installation

### Prerequisites
- .NET SDK installed
- Node.js installed
- SQL Server or your chosen database system
- IDEs: Visual Studio, JetBrains Rider
  
### Application Setup with Docker

1. **Clone the repository**:
   ```bash
   git clone https://github.com/RizzyApp/rizzy.git
   cd rizzy
   ```
2. **Docker setup**:
- Run the docker-compose.yml file in the terminal with the `docker compose up` command to create the application in Docker.
- Docker compose runs the entire server, frontend and database.

3. **Access the app**:
   Open your browser and navigate to `http://localhost:3000`.

### Native Application Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/RizzyApp/rizzy.git
   cd rizzy
   ```

2. **Backend setup**:
 - Navigate to the backend folder:
   ```bash
   cd .\server\API\
   ```
 - Restore dependencies:
   ```bash
   dotnet restore
   ```
 - Set up the database connection string in `appsettings.json`.
 - Run migrations:
   ```bash
   dotnet ef database update
   ```
 - Start the server:
   ```bash
   dotnet run
   ```

3. **Frontend setup**:
 - Navigate to the frontend folder:
   ```bash
    cd .\client\
   ```
 - Install dependencies:
   ```bash
   npm install
   ```
 - Start the React development server:
   ```bash
   npm run dev
   ```

4. **Access the app**:
   Open your browser and navigate to `http://localhost:5276`.

---

We welcome contributions! To contribute:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```

3. Commit your changes and push the branch.
4. Submit a pull request.


---

## Credits

Rizzy was made possible by the contributions of the following developers:

- **[pixhy](https://github.com/pixhy)**  
  **[LinkedIn Profile](https://www.linkedin.com/in/tunde-bak/)**

- **[hegedus-mark](https://github.com/hegedus-mark)**  
  **[LinkedIn Profile](https://www.linkedin.com/in/m%C3%A1rk-heged%C5%B1s-2a88332ba/)**

- **[kristofNyikes](https://github.com/kristofNyikes)**  
  **[LinkedIn Profile](https://www.linkedin.com/in/krist%C3%B3f-nyikes-31121133a/)**

- **[prvics](https://github.com/prvics)**  
  **[LinkedIn Profile](https://www.linkedin.com/in/pr%C3%A1vics-p%C3%A9ter-760265330/)**

We sincerely thank them for their hard work and dedication to this project. 🎉

---

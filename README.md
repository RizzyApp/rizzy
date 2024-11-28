# Rizzy

**Rizzy** is a modern dating application designed to connect people meaningfully. Built with cutting-edge technologies, it provides a seamless experience for users to find matches, chat, and build connections. The app features a C# ASP.NET backend, an Entity Framework-powered database, and a React-based frontend.

## Features

- **User Profiles**: Create and customize your profile with photos and personal information.
- **Matching Algorithm**: Intelligent matching based on preferences and interests.
- **Real-Time Chat**: Instant messaging with your matches.
- **Discover Feature**: Swipe through profiles and discover potential matches.
- **Secure Authentication**: Login with secure credential handling.
- **Scalable Infrastructure**: Robust architecture for handling a growing user base.

---

## Tech Stack

### Backend
- **C# ASP.NET Core**
  - API development
  - Business logic implementation
- **Entity Framework**
  - Database ORM
  - Supports migrations and queries
  - Database compatibility

### Frontend
- **JavaScript/React**
  - Dynamic, responsive user interface
  - Component-based design for maintainability
  - Styled with Tailwind CSS

### Additional Technologies
- **Authentication**: Identity Framework
- **Real-Time Communication**: SignalR for chat

---

## Installation

### Prerequisites
- .NET SDK installed
- Node.js and npm installed
- SQL Server or your chosen database system
- IDEs: Visual Studio, Rider

### Setup Instructions

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

3. **Docker setup**:
  - Add docker to your services
  - Run the docker-compose.yml file to create the database in Docker.

4. **Frontend setup**:
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

5. **Access the app**:
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

- **[hegedus-mark](https://github.com/hegedus-mark)**  
  **[LinkedIn Profile](https://www.linkedin.com/in/m%C3%A1rk-heged%C5%B1s-2a88332ba/)**

- **[kristofNyikes](https://github.com/kristofNyikes)**  
  **[LinkedIn Profile](https://www.linkedin.com/in/krist%C3%B3f-nyikes-31121133a/)**

- **[prvics](https://github.com/prvics)**  
  **[LinkedIn Profile](https://www.linkedin.com/in/pr%C3%A1vics-p%C3%A9ter-760265330/)**

- **[pixhy](https://github.com/pixhy)**  
  **[LinkedIn Profile](https://www.linkedin.com/in/tunde-bak/)**

We sincerely thank them for their hard work and dedication to this project. 🎉

---

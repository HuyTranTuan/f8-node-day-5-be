Test posts by user_id;
http://localhost:3000/api/posts?page=1&limit=30&user_id=1

🚀 User Post - Backend API
This is the backend API for the An Phu Holdings office rental platform, built with Node.js, Express, and MySQL.🛠 FeaturesPost Management: CRUD operations for office rental posts.Soft Delete: Posts are marked with deleted_at instead of being permanently removed.Pagination: Efficient data fetching using LIMIT and OFFSET.Validation: Secure input handling for slugs, titles, and numeric parameters.CORS Enabled: Configured for local development (Vite) and GitHub Pages deployment.💻 Tech StackRuntime: Node.jsFramework: Express.jsDatabase: MySQL (using mysql2/promise)Deployment: Vercel⚙️ Getting Started1. PrerequisitesNode.js installed.MySQL server running.2. Installation

### Clone the repository

git clone https://github.com/HuyTranTuan/f8-node-day-4-be.git

### Install dependencies

npm install

3.  Environment VariablesCreate a .env file in the root directory and add your database credentials:

    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_password
    DB_NAME=your_db_name
    PORT=3000

4.  Database SetupRun the following SQL to create the posts table:

        CREATE TABLE posts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            slug VARCHAR(255) UNIQUE NOT NULL,
            content TEXT,
            user_id INT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted_at TIMESTAMP NULL DEFAULT NULL
        );

        CREATE TABLE users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL, -- Stored as a hash
        );

    🛣 API EndpointsPostsMethodEndpointDescription

    \_ GET/api/posts Get all posts (Supports page & limit)
    \_ GET/api/posts/:id Get a specific post by ID
    \_ POST/api/posts Create a new post
    \_ PUT/api/posts/:id Update an existing post
    \_ DELETE/api/posts/:id Soft delete a post

👨‍💻 AuthorHuy Tran TuanGitHub

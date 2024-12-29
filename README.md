# 🛠 ExploreAsia Backend

ExploreAsia's backend provides the core API for managing tourist spots and user-specific data. Built with Express and MongoDB, it ensures a secure and scalable experience.

## 🌐 Live API

[ExploreAsia Backend](https://explore-asia-backend.vercel.app)

## 📂 Repository

[Backend Repository](https://github.com/mdferdausalam19/explore-asia-backend)

## 📊 Key Features

- **CRUD Operations**: Manage tourist spots with Create, Read, Update, and Delete endpoints.
- **User-specific Data**: Fetch data specific to the logged-in user.
- **Sorting**: Sort tourist spots by average cost.
- **Middleware**: Helmet and CORS for security and cross-origin resource sharing.

## ⚙️ Technologies Used

### 🛠 Backend Frameworks & Libraries

- **Express.js**: Web framework for building APIs.
- **MongoDB**: Database for storing tourist spots.
- **Helmet.js**: For security.
- **CORS**: For enabling cross-origin requests.

## 📁 Project Structure

```plaintext
explore-asia-backend/
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
├── README.md
└── vercel.json
```

## 🌐 Endpoints

| Method | Endpoint              | Description                                  |
| :----- | :-------------------- | :------------------------------------------- |
| GET    | `/tourist-spots`      | Fetch all tourist spots                      |
| GET    | `/tourist-spots/:id`  | Fetch a single tourist spot by ID            |
| GET    | `/user-tourist-spots` | Fetch tourist spots added by a specific user |
| GET    | `/all-tourist-spots`  | Fetch all tourist spots with sorting options |
| POST   | `/tourist-spots`      | Add a new tourist spot                       |
| PUT    | `/tourist-spots/:id`  | Update a tourist spot                        |
| DELETE | `/tourist-spots/:id`  | Delete a tourist spot                        |

## 🚀 Getting Started

To run the project locally, follow these steps:

### Prerequisites

Ensure that you have **Node.js** and **npm** installed on your system.

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/mdferdausalam19/explore-asia-backend.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd explore-asia-backend
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Set Environment Variables**:

   - Add `DB_USER` and `DB_PASS` to `.env` file for MongoDB credentials.

5. **Run the Server:**:

   ```bash
   npm start
   ```

6. **Access the API**:
   The server will run at [http://localhost:5000](http://localhost:5000).

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://www.mongodb.com/docs/manual/)
- [Helmet.js](https://helmetjs.github.io/)
- [CORS Middleware](https://expressjs.com/id/resources/middleware/cors.html)

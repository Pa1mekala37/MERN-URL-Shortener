# TinyLinker - MERN URL Shortener

TinyLinker is a URL shortener web application developed using React.js, MongoDB, Node.js, Express.js, TypeScript, and Vite. It allows users to generate short URLs for long links and provides usage statistics for each URL.

Visit the live website: [TinyLinker Live](https://mern-url-shortener-1-k8qr.onrender.com/)


## Features

- **URL Shortening:** Enter a long URL, and TinyLinker will generate a short URL for you.
- **Usage Statistics:** Track the number of times each short URL has been used.
- **Technologies Used:** React.js, MongoDB, Node.js, Express.js, TypeScript, and Vite.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

### Installation

### Clone the Repository

1. Open your terminal and clone the repository:

   ```bash
   git clone https://github.com/Pa1mekala37/MERN-URL-Shortener.git
   
### Running the code in Local

1. Navigate to the project directory:

   ```bash
   cd MERN-URL-Shortener

### Backend Setup

1. Navigate to the `Backend` directory:
   
   ```bash
   cd Backend

2. Install backend dependencies:

   ```bash
   npm install

3. Create a `.env` file in the `Backend` directory and add the following line, replacing `<your-mongodb-url>` with your MongoDB database URL:

   ```bash
   CONNECTION_STRING=<your-mongodb-url>

4. Start the backend server:

   ```bash
   nodemon

### Frontend Setup

1. Navigate to the `Frontend` directory:
   
   ```bash
   cd Frontend

2. Install Frontend dependencies:

   ```bash
   npm install

3. Start the Frontend server:

   ```bash
   npm run dev

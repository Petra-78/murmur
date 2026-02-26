# Murmur
Murmur is a full-stack social media platform inspired by Instagram and Threads.
It allows users to create posts, interact with others, and communicate in real time through direct messaging.

Built with a modern JavaScript stack focusing on real-time features, relational data modeling, and scalable backend architecture.

![preview](/frontend/public/preview.png)

## Live Demo
https://murmur-app.netlify.app/

## Tech Stack

### Backend
* [![Node.js](https://img.shields.io/badge/Node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](#)
* [![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](#)
* [![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](#)
* [![Postgres](https://img.shields.io/badge/Postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)](#)

### Frontend
* 	[![React](https://img.shields.io/badge/React-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](#)
* [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=fff)](#)
* 	[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)

## Features
### Authentication
* User signup & login
* Guest signup (creates a new temporary guest profile per login)
* JWT-based authentication
### Posts
* Create text/image/gif posts
* Like posts
* Comment on posts
* Reply to comments

### Social Features
* Follow / unfollow users
* Personalized profiles with bio, nickname and profile picture

### Direct Messaging
* One-on-one private chats
* Real-time updates via Socket.io
* Typing indicator
* Image sending support


## Installation

Here is how you can start the project locally. 


**1. Clone the repo**
```bash
# HTTPS
$ git clone https://github.com/Petra-78/murmur.git

#SSH
$ git clone git@github.com:Petra-78/murmur.git
```

**2. Backend setup**
```
$ cd backend
$ npm install  
```

Create `.env`
```bash
DATABASE_URL=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
GIPHY_API_KEY=
```
Run migrations:
```bash
npx prisma migrate dev
```

Start the backend

`node --watch app.js`

**3. Frontend setup**
```bash
cd frontend
npm install
npm run dev
```

Have fun!

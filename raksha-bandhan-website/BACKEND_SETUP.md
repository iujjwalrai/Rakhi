# Backend Setup Guide

## Overview
This backend provides a MongoDB-based chat system where Mridula can post messages and Ujjwal can reply to them. All data is stored in MongoDB with real-time updates.

## Features
- **Mridula Posts**: Can create new posts with text and emojis
- **Ujjwal Replies**: Can reply to Mridula's posts
- **Love Counter**: Each post and reply has a love counter
- **MongoDB Storage**: Persistent data storage
- **RESTful API**: Clean API endpoints

## Setup Instructions

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. MongoDB Setup
You have two options:

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/sister-chat`

#### Option B: MongoDB Atlas (Recommended)
1. Create free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Replace in `.env` file

### 3. Environment Configuration
Create a `.env` file in the `backend` folder:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sister-chat

# Security
CORS_ORIGIN=http://localhost:3000
```

### 4. Start the Backend
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### GET `/api/posts`
- **Description**: Get all posts with replies
- **Response**: Array of posts with populated replies

### POST `/api/posts`
- **Description**: Create a new post (Mridula only)
- **Body**: `{ "content": "message", "author": "Mridula" }`
- **Response**: Created post object

### POST `/api/posts/:postId/replies`
- **Description**: Add reply to a post (Ujjwal only)
- **Body**: `{ "content": "reply", "author": "Ujjwal" }`
- **Response**: Created reply object

### POST `/api/messages/:messageId/love`
- **Description**: Add love to a post or reply
- **Response**: Updated message object

### DELETE `/api/messages/:messageId`
- **Description**: Delete a post or reply
- **Response**: Success message

### GET `/api/health`
- **Description**: Health check endpoint
- **Response**: Server status

## Frontend Configuration

Add this to your frontend `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Usage

1. **Start Backend**: `cd backend && npm run dev`
2. **Start Frontend**: `npm start` (in main directory)
3. **Toggle Users**: Use the toggle buttons to switch between Mridula and Ujjwal
4. **Mridula**: Can create posts
5. **Ujjwal**: Can reply to Mridula's posts
6. **Love**: Click heart icons to add love to posts/replies

## Data Structure

### Post Object
```json
{
  "_id": "message_id",
  "content": "Post content",
  "author": "Mridula",
  "isPost": true,
  "loves": 5,
  "replies": ["reply_id_1", "reply_id_2"],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Reply Object
```json
{
  "_id": "reply_id",
  "content": "Reply content",
  "author": "Ujjwal",
  "isPost": false,
  "loves": 2,
  "parentPost": "post_id",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## Security Features
- Rate limiting (100 requests per 15 minutes)
- CORS protection
- Input validation
- Helmet security headers

## Troubleshooting

### MongoDB Connection Issues
- Check your connection string
- Ensure MongoDB is running
- Verify network connectivity

### CORS Issues
- Check `CORS_ORIGIN` in `.env`
- Ensure frontend URL matches

### Port Issues
- Change `PORT` in `.env` if 5000 is occupied
- Update frontend `REACT_APP_API_URL` accordingly

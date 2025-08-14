const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sister-chat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Import models
const Message = require('./models/Message');

// Routes

// Get all posts with replies
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Message.find({ isPost: true })
      .populate('replies')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Create a new post (Mridula only)
app.post('/api/posts', async (req, res) => {
  try {
    const { content, author } = req.body;
    
    if (!content || !content.trim()) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const newPost = new Message({
      content: content.trim(),
      author: author || 'Mridula',
      isPost: true,
      loves: 0
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Add reply to a post (Ujjwal only)
app.post('/api/posts/:postId/replies', async (req, res) => {
  try {
    const { content, author } = req.body;
    const { postId } = req.params;

    if (!content || !content.trim()) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const post = await Message.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const newReply = new Message({
      content: content.trim(),
      author: author || 'Ujjwal',
      isPost: false,
      loves: 0,
      parentPost: postId
    });

    const savedReply = await newReply.save();
    
    // Add reply to post's replies array
    post.replies.push(savedReply._id);
    await post.save();

    res.status(201).json(savedReply);
  } catch (error) {
    console.error('Error creating reply:', error);
    res.status(500).json({ error: 'Failed to create reply' });
  }
});

// Add love to post or reply
app.post('/api/messages/:messageId/love', async (req, res) => {
  try {
    const { messageId } = req.params;
    
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    message.loves += 1;
    const updatedMessage = await message.save();
    
    res.json(updatedMessage);
  } catch (error) {
    console.error('Error adding love:', error);
    res.status(500).json({ error: 'Failed to add love' });
  }
});

// Delete a post or reply
app.delete('/api/messages/:messageId', async (req, res) => {
  try {
    const { messageId } = req.params;
    
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    // If it's a post, also delete all its replies
    if (message.isPost) {
      await Message.deleteMany({ parentPost: messageId });
    }

    await Message.findByIdAndDelete(messageId);
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

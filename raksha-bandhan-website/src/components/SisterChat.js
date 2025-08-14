import React, { useState, useEffect } from 'react';
import { Heart, Send, MessageCircle, User, Smile, Reply, Trash2, Loader2 } from 'lucide-react';

const SisterChat = () => {
  const [activeUser, setActiveUser] = useState('Mridula');
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Emoji list
  const emojis = ['❤️', '😊', '😍', '🥰', '😘', '🤗', '💕', '💖', '💝', '🎉', '✨', '🌟', '💫', '🌸', '🌺', '🌷', '🌹', '🌻', '🌼', '🍀', '🎀', '🎁', '💝', '💌', '📝', '💭', '💬', '💋', '👄', '👅', '👁️', '👀', '👂', '👃', '👣', '💪', '👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏'];

  // Fetch posts from backend
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/posts`);
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.error('Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  // Load posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const addEmoji = (emoji) => {
    setNewPost(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      setSubmitting(true);
      
      if (replyTo) {
        // Add reply
        const response = await fetch(`${API_BASE_URL}/posts/${replyTo._id}/replies`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: newPost,
            author: activeUser
          }),
        });

        if (response.ok) {
          await fetchPosts(); // Refresh posts
          setReplyTo(null);
        } else {
          console.error('Failed to add reply');
        }
      } else {
        // Add new post (only Mridula can post)
        if (activeUser !== 'Mridula') {
          alert('Only Mridula can create posts!');
          return;
        }

        const response = await fetch(`${API_BASE_URL}/posts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: newPost,
            author: activeUser
          }),
        });

        if (response.ok) {
          await fetchPosts(); // Refresh posts
        } else {
          console.error('Failed to create post');
        }
      }

      setNewPost('');
    } catch (error) {
      console.error('Error submitting message:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLove = async (messageId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/messages/${messageId}/love`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        await fetchPosts(); // Refresh posts to get updated love count
      } else {
        console.error('Failed to add love');
      }
    } catch (error) {
      console.error('Error adding love:', error);
    }
  };

  const deleteMessage = async (messageId) => {
    if (!window.confirm('Are you sure you want to delete this message?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/messages/${messageId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchPosts(); // Refresh posts
      } else {
        console.error('Failed to delete message');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Loading Animation Component
  const LoadingAnimation = ({ message = "Loading..." }) => (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
        <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-20 animate-ping"></div>
      </div>
      <div className="text-center">
        <p className="text-white/80 text-lg font-medium">{message}</p>
        <p className="text-white/60 text-sm mt-1">Please wait while we fetch your messages...</p>
      </div>
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );

  // Submitting Animation Component
  const SubmittingAnimation = () => (
    <div className="flex items-center justify-center space-x-2 text-white/80">
      <Loader2 className="w-4 h-4 animate-spin" />
      <span className="text-sm">Sending message...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Sister Chat 💕</h1>
          <p className="text-white/80 text-lg">Share your thoughts and love with each other</p>
        </div>

        {/* User Toggle */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => setActiveUser('Mridula')}
              disabled={submitting}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeUser === 'Mridula'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                  : 'bg-white/20 text-white/70 hover:text-white hover:bg-white/30'
              } ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <User className="w-5 h-5" />
              <span className="font-medium">Mridula</span>
            </button>
            <button
              onClick={() => setActiveUser('Ujjwal')}
              disabled={submitting}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeUser === 'Ujjwal'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                  : 'bg-white/20 text-white/70 hover:text-white hover:bg-white/30'
              } ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <User className="w-5 h-5" />
              <span className="font-medium">Ujjwal</span>
            </button>
          </div>
          <div className="text-center mt-4">
            <p className="text-white/80">
              Currently active: <span className="font-semibold text-white">{activeUser}</span>
            </p>
            <p className="text-white/60 text-sm mt-1">
              {activeUser === 'Mridula' ? 'You can create posts' : 'You can reply to Mridula\'s posts'}
            </p>
          </div>
        </div>

        {/* Post Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
          {replyTo && (
            <div className="mb-4 p-3 bg-white/10 rounded-lg border-l-4 border-pink-500">
              <p className="text-white/80 text-sm">Replying to: {replyTo.content.substring(0, 50)}...</p>
              <button
                onClick={() => setReplyTo(null)}
                disabled={submitting}
                className="text-pink-400 text-sm hover:text-pink-300 mt-1 disabled:opacity-50"
              >
                Cancel reply
              </button>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder={replyTo ? 'Write your reply...' : (activeUser === 'Mridula' ? 'Share your thoughts...' : 'Reply to Mridula...')}
                className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:opacity-50"
                rows="3"
                disabled={submitting}
              />
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors disabled:opacity-50"
                disabled={submitting}
              >
                <Smile className="w-5 h-5" />
              </button>
            </div>

            {showEmojiPicker && (
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <div className="grid grid-cols-8 gap-2 max-h-40 overflow-y-auto">
                  {emojis.map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => addEmoji(emoji)}
                      className="text-2xl hover:scale-110 transition-transform p-1 rounded"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-white/70">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">{posts.length} posts</span>
                {submitting && <SubmittingAnimation />}
              </div>
              <button
                type="submit"
                disabled={submitting || !newPost.trim()}
                className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{replyTo ? 'Reply' : 'Send'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Posts Section */}
        {initialLoading ? (
          <LoadingAnimation message="Loading your messages..." />
        ) : loading ? (
          <LoadingAnimation message="Refreshing messages..." />
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post._id} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                {/* Main Post */}
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    post.author === 'Mridula' 
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500' 
                      : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                  }`}>
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-white">{post.author}</span>
                        <span className="text-white/50 text-sm">{formatTime(post.createdAt)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleLove(post._id)}
                          disabled={submitting}
                          className="flex items-center space-x-1 text-pink-400 hover:text-pink-300 transition-colors disabled:opacity-50"
                        >
                          <Heart className={`w-4 h-4 ${post.loves > 0 ? 'fill-current' : ''}`} />
                          <span className="text-sm">{post.loves}</span>
                        </button>
                        {activeUser === 'Ujjwal' && (
                          <button
                            onClick={() => setReplyTo(post)}
                            disabled={submitting}
                            className="flex items-center space-x-1 text-white/70 hover:text-white transition-colors disabled:opacity-50"
                          >
                            <Reply className="w-4 h-4" />
                            <span className="text-sm">Reply</span>
                          </button>
                        )}
                        <button
                          onClick={() => deleteMessage(post._id)}
                          disabled={submitting}
                          className="text-white/50 hover:text-red-400 transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-white text-lg leading-relaxed">{post.content}</p>
                  </div>
                </div>

                {/* Replies */}
                {post.replies && post.replies.length > 0 && (
                  <div className="mt-6 space-y-4">
                    <div className="border-l-2 border-pink-500/30 pl-4">
                      {post.replies.map((reply) => (
                        <div key={reply._id} className="bg-white/5 rounded-xl p-4 mb-3">
                          <div className="flex items-start space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              reply.author === 'Mridula' 
                                ? 'bg-gradient-to-r from-pink-500 to-purple-500' 
                                : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                            }`}>
                              <User className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium text-white text-sm">{reply.author}</span>
                                  <span className="text-white/50 text-xs">{formatTime(reply.createdAt)}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => handleLove(reply._id)}
                                    disabled={submitting}
                                    className="flex items-center space-x-1 text-pink-400 hover:text-pink-300 transition-colors disabled:opacity-50"
                                  >
                                    <Heart className={`w-3 h-3 ${reply.loves > 0 ? 'fill-current' : ''}`} />
                                    <span className="text-xs">{reply.loves}</span>
                                  </button>
                                  <button
                                    onClick={() => deleteMessage(reply._id)}
                                    disabled={submitting}
                                    className="text-white/50 hover:text-red-400 transition-colors disabled:opacity-50"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                              <p className="text-white/90 text-sm">{reply.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {posts.length === 0 && !initialLoading && !loading && (
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <p className="text-white/60 text-lg">No posts yet. Start the conversation!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SisterChat;

# Sister Chat Feature 💕

## Overview
The Sister Chat is a special messaging component designed for Mridula and Ujjwal to share thoughts, messages, and love with each other. It's built with local storage persistence, so there are no cold start issues or backend dependencies.

## Features

### 🎭 User Toggle
- **Mridula Mode**: Can create posts and reply to Ujjwal's responses
- **Ujjwal Mode**: Can reply to Mridula's posts
- Easy toggle between users with beautiful gradient buttons

### 💬 Messaging System
- **Posts**: Mridula can create main posts
- **Replies**: Ujjwal can reply to Mridula's posts
- **Real-time Updates**: All changes are saved instantly to local storage
- **Timestamps**: Shows when messages were posted (e.g., "2m ago", "1h ago")

### ❤️ Love Counter
- Each post and reply has a love counter
- Click the heart icon to add love
- Visual feedback with filled heart when loved

### 😊 Emoji Support
- Rich emoji picker with 80+ emojis
- Click the smile icon to open emoji picker
- Easy one-click emoji insertion

### 💾 Data Management
- **Export Data**: Download all chat data as JSON file
- **Import Data**: Restore chat from backup file
- **Clear All**: Remove all chat data (with confirmation)
- **Local Storage**: Automatic saving to browser storage

## How to Use

### 1. Switching Between Users
- Click the "Mridula" or "Ujjwal" button in the user toggle section
- The active user is highlighted with a gradient background
- Current user is displayed below the toggle buttons

### 2. Creating Posts (Mridula)
1. Make sure "Mridula" is selected
2. Type your message in the text area
3. Add emojis by clicking the smile icon
4. Click "Send" to post

### 3. Replying to Posts (Ujjwal)
1. Switch to "Ujjwal" mode
2. Click "Reply" on any Mridula's post
3. Type your response
4. Click "Send" to reply

### 4. Adding Love
- Click the heart icon on any post or reply
- The love counter will increase
- Loved items show a filled heart icon

### 5. Data Backup & Restore
1. Click the settings icon (gear) in the top right
2. **Export**: Click "Export Data" to download backup
3. **Import**: Click "Import Data" and select a backup file
4. **Clear**: Click "Clear All" to remove all data

## Technical Details

### Storage
- Uses browser's localStorage for persistence
- No server required - works completely offline
- Data persists between browser sessions
- No cold start issues

### File Format
Exported data includes:
```json
{
  "posts": [...],
  "exportDate": "2024-01-01T00:00:00.000Z",
  "version": "1.0"
}
```

### Browser Compatibility
- Works on all modern browsers
- Requires JavaScript enabled
- Responsive design for mobile and desktop

## Tips for Best Experience

1. **Regular Backups**: Export your data regularly to avoid losing messages
2. **Emoji Usage**: Use emojis to make messages more expressive and fun
3. **Love Reactions**: Show appreciation by clicking hearts on messages you like
4. **Clear Communication**: Use the reply feature to keep conversations organized

## Troubleshooting

### Data Not Saving
- Check if JavaScript is enabled
- Ensure you're not in incognito/private browsing mode
- Try refreshing the page

### Import Not Working
- Make sure you're selecting a valid JSON backup file
- Check that the file was exported from this same feature
- Try exporting fresh data and importing that

### Performance Issues
- Clear old data if you have many posts
- Export and import to clean up the data structure
- Refresh the page if the interface becomes slow

## Privacy & Security
- All data is stored locally in your browser
- No data is sent to any server
- Export files contain only your chat data
- You have complete control over your data

---

Enjoy your special sister-brother chat! 💕✨

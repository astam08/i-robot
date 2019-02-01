# i-robot
Homemade Discord bot using **discord.js**, **node-ytdl-core** and **youtube-search**

This bot's main purpose is to stream Youtube videos on a voice channel on Discord

[discord.js.org](https://discord.js.org)


## What is needed
First, a Discord "Application" is needed (a bot), its token will be used here.  
Then, a Youtube v3 API key will be necessary in order to search directly on Youtube.

Once you have all that, put it in the file "config.js" : 
```javascript
module.exports = class Config {
  static token() {
    return 'YOUR_TOKEN';
  }

  static YoutubeApiKey() {
    return 'YOUR_API_KEY';
  }
};
```

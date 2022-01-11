# EveBot
EveBot is a multi-purpose discord bot that is currently in development. This bot supports chat commands, slash commands and context menu.

# To run the bot
1. Install all dependencies with "npm i".
2. Configure config.json to your liking.
3. Create a .env file and put your token in it. example: TOKEN = your_token_here
4. To register slash commands globally, uncomment everything under line 86 and comment everything from line 49 to line 84 in "dir/handler/index.js".
5. To register slash commands for a guild only, insert a guild id to "/config.json".
6. Start the bot with "node .".

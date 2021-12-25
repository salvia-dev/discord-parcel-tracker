import Discord, { Message } from 'discord.js';
import { readyHandler } from './handlers/readyHandler';
import { messageHandler } from './handlers/messageHandler';

export const bot = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });

// Login the bot
(async () => {
    try {
        await bot.login(process.env.BOT_TOKEN);
    } catch (err) {
        console.error(err);
    }
})();

/* Handlers */
bot.once('ready', async () => await readyHandler());
bot.on('messageCreate', async (msg: Message) => await messageHandler(msg));

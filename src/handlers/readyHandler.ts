import { bot } from '../app';

export const readyHandler = async () => {
    console.log(`Logged in as ${bot.user?.tag}!`);
};

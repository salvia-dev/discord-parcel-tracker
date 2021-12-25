import { Message } from 'discord.js';
import { InvalidUsageError } from '../utils/errors';
import type { Carrier } from '../types';

const PREFIX = '!';

// Command validation function
const isCommand = (msg: Message) => {
    return msg.content.startsWith(PREFIX);
};

// Type Guard function which checks whether the provided carrier is supported
const isCarrierValid = (val: string): val is Carrier => {
    const allowedKeys = ['inpost', 'pp', 'dhl', 'ups', 'dpd'];

    return allowedKeys.indexOf(val) !== -1;
};

// Command handle function
const handleCommand = async (msg: Message) => {
    const command = msg.content.slice(PREFIX.length).split(' ')[0];

    switch (command) {
        case 'track':
            const carrier = msg.content.split(' ')[1];
            const trackingId = msg.content.split(' ')[2];

            if (!carrier || !trackingId) {
                throw new InvalidUsageError('Check your input and try once again.');
            }

            if (!isCarrierValid(carrier)) {
                await msg.reply("Provided carrier isn't supported.");
                return;
            }

            msg.reply(`${carrier} ${trackingId}`);
            break;
        default:
            await msg.reply('Command not found.');
            break;
    }
};

/* Message Handler */
export const messageHandler = async (msg: Message) => {
    if (msg.author.bot) return;

    if (isCommand(msg)) {
        try {
            await handleCommand(msg);
        } catch (err) {
            if (err instanceof InvalidUsageError) {
                void msg.reply(err.message);
            } else {
                void msg.reply('Something went wrong.');
                console.error(err);
            }
        }
    }
};

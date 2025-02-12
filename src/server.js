require('dotenv').config();
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const app = express();
const PORT = process.env.PORT || 3000;

const botToken = process.env.BOT_API; // Replace with your actual bot token
const bot = new TelegramBot(botToken, { polling: true });
const QRCode = require('qrcode');


bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    // Send a message with a web page preview
    bot.sendMessage(chatId, 'This is a demo Telegram Web App.\n This app works like tapswap', {
        reply_markup: JSON.stringify({
            inline_keyboard: [[
                { text: 'Try Demo App', url: 'https://t.me/demoswap_bot/app' }
            ]]


        })
    });
});


app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

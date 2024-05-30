const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const app = express();
const PORT = process.env.PORT || 3000;

const botToken = '7330885374:AAHbCenotQ3SdZyErs4ViavZJp8wNqlb4hE'; // Replace with your actual bot token
// const botToken = '7401756498:AAEKhlbdzS3sgoYRGQkloiuU-tfKMbl-5bU'; // Replace with your actual bot token
// const bot = new TelegramBot(botToken);
const bot = new TelegramBot(botToken, { polling: true });
const QRCode = require('qrcode');


bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    // Send a message with a web page preview
    bot.sendMessage(chatId, 'This is a demo Telegram Web App', {
        reply_markup: JSON.stringify({
            inline_keyboard: [[
                { text: 'Try Demo App', url: 'https://t.me/Randywebbot/demoapp' }
            ]]


        })
    });
});


app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

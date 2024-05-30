const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const app = express();
const PORT = process.env.PORT || 3000;

const botToken = '7401756498:AAEKhlbdzS3sgoYRGQkloiuU-tfKMbl-5bU'; // Replace with your actual bot token
// const bot = new TelegramBot(botToken);
const bot = new TelegramBot(botToken, { polling: true });
const QRCode = require('qrcode');

// Middleware to authenticate users

// bot.onText(/\/play/, (msg) => {
//     const chatId = msg.chat.id;

//     console.log(chatId);
//     // Send a request to launch the mini-app with additional user information
//     bot.sendGame(chatId, 'Your_Game_Name', {
//         reply_markup: JSON.stringify({
//             inline_keyboard: [[
//                 { text: 'Play', callback_game: JSON.stringify({ game_short_name: 'Your_Game_Short_Name' }) }
//             ]]
//         })
//     });
// });

bot.onText(/\/play/, (msg) => {
    const chatId = msg.chat.id;

    // Send a message with a web page preview
    bot.sendMessage(chatId, '', {
        reply_markup: JSON.stringify({
            inline_keyboard: [[
                { text: 'Open Mini App', url: 'https://t.me/randynew_bot/randydon' }
            ]]
        })
    });
});


// Listen for game callback query
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const userId = query.from.id;

    // Here, you have the user's chat ID and Telegram user ID (userId)
    console.log('Received callback from user:', userId, 'in chat:', chatId);
    // You can further process this information or pass it to your mini-app
});



// Route to generate QR code
app.get('/generateQR', (req, res) => {
    const chatId = 9489412768//req.query.chat_id; // assuming chat_id is passed as query parameter
    if (chatId) {
        const qrData = `Your unique data for chat ID: ${chatId}`;
        QRCode.toDataURL(qrData, (err, url) => {
            if (err) {
                console.error('Error generating QR code:', err);
                res.status(500).send('Internal Server Error');
            } else {
                res.send(`<img src="${url}" alt="QR Code"/>`);
            }
        });
    } else {
        res.status(400).send('Missing chat_id parameter');
    }
});


app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

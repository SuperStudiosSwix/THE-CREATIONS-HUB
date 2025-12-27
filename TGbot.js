const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Сервер будет показывать все файлы из твоей папки (HTML, CSS, JS)
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Home.html'));
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

// Далее идет твой текущий код бота...



require('dotenv').config({ path: './Secret.env' });
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const token = process.env.BOT_TOKEN; 
const bot = new TelegramBot(token, {polling: true});

// Вместо Secret.env.PASSWORD пишем:
const PASSWORD = process.env.PASSWORD;

const ALLOWED_IDS = [5950590253, 0, 0, 0]; 

const authorized = new Set();

console.log("🤖 Бот запущен и готов к работе!");

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    if (!ALLOWED_IDS.includes(chatId)) {
        return bot.sendMessage(chatId, "🚫 Доступ закрыт.");
    }

    if (text === PASSWORD) {
        authorized.add(chatId);
        return bot.sendMessage(chatId, "🔓 Доступ разрешен! Команды:\n/add Название, Ссылка на игру, ссылку на Картинку\n/del Название");
    }

    if (!authorized.has(chatId)) {
        return bot.sendMessage(chatId, "🔐 Введите пароль:");
    }
    if (text.startsWith('/add ')) {
        const parts = text.replace('/add ', '').split(',').map(s => s.trim());
        if (parts.length === 3) {
            const [title, url, img] = parts;
            let cards = JSON.parse(fs.readFileSync('storage.json', 'utf8'));
            cards.push({ title, url, img });
            fs.writeFileSync('storage.json', JSON.stringify(cards, null, 2));
            bot.sendMessage(chatId, `✅ Карточка "${title}" добавлена на сайт!`);
        }
    }
    if (text.startsWith('/del ')) {
        const title = text.replace('/del ', '').trim();
        let cards = JSON.parse(fs.readFileSync('storage.json', 'utf8'));
        const newCards = cards.filter(c => c.title !== title);
        fs.writeFileSync('storage.json', JSON.stringify(newCards, null, 2));
        bot.sendMessage(chatId, `🗑 Карточка "${title}" удалена.`);
    }
});
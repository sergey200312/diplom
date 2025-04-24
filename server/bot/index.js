const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
require('dotenv').config();

const bot = new Telegraf(process.env.TG_TOKEN);

// 👋 Обработка команды /start
bot.command('start', async (ctx) => {
  const name = ctx.from.first_name || 'друг';
  await ctx.reply(`Привет, ${name}! Рад тебя видеть 😊`);
});

// Ответ на любое сообщение
bot.on(message("text"), async (ctx) => {
  await ctx.reply('Привет!');
});

function startBot() {
  bot.launch();
  console.log('Telegram bot запущен');
}

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

module.exports = startBot;

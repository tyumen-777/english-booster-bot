import { Context, session, Keyboard } from "grammy";
import {
    conversations, createConversation
} from "@grammyjs/conversations";
import { addNewPeople, MyContext, MyConversation } from "../handlers/messages.handler";

const {Bot} = require('grammy')
require('dotenv').config();


const bot = new Bot(process.env.BOT_TOKEN)

bot.use(session({ initial: () => ({}) }));
bot.use(conversations());



bot.use(createConversation(addNewPeople));

bot.api.setMyCommands([
    {
        command: 'start', description: 'Запуск бота'
    },
    {
        command: 'help', description: 'Помощь'
    },
    {
        command: 'add_new_people', description: 'Добавить нового ученика'
    }
])

// bot.command('add_new_people', async (ctx: Context) => {
//     bot.use(createConversation(addNewPeople));
//     console.log(ctx.message)
//     // await ctx.reply('Введите имя ученика')
// })

bot.command("add_new_people", async (ctx : MyContext) => {
    // await ctx.reply("Entering conversation!");
    // enter the function "greeting" you declared
    await ctx.conversation.enter("addNewPeople");
});

// bot.on("message:text", (ctx) => {
//     console.log(ctx.from)
// });

bot.start()
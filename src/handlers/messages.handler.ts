import { ConversationFlavor, type Conversation } from "@grammyjs/conversations"
import { type Context, Keyboard } from "grammy";

export type MyContext = Context & ConversationFlavor
export type MyConversation = Conversation<MyContext>;

export const addNewPeople =  async (conversation :MyConversation, ctx: Context) => { 
    // Кнопка отмены
    const cancelKeyboard = new Keyboard().text("Отмена").resized();

    // Get first name
    await ctx.reply("Введите имя ученика", {reply_markup: cancelKeyboard});
    const firstName = await conversation.wait()
    
    const firstNameText = firstName.message?.text

    if(firstNameText?.toLowerCase() === 'отмена') {
        await ctx.reply("Добавление отменено. Напишите /add_new_people, чтобы попробовать снова.", { reply_markup: { remove_keyboard: true } });
        return
    }

    // Get second name
    await ctx.reply("Введите фамилию ученика", {reply_markup: cancelKeyboard});
    const secondName = await conversation.wait()
    const secondNameText = secondName.message?.text

    if(secondNameText?.toLowerCase() === 'отмена') {
        await ctx.reply("Добавление отменено. Напишите /add_new_people, чтобы попробовать снова.", { reply_markup: { remove_keyboard: true } });
        return 
    }


    await ctx.reply(`Welcome to the chat, ${firstNameText} ${secondNameText}!`);
}
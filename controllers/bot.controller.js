import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import stickers from "../views/stickers.js";
import * as options from "../components/options.js";
import { Message } from "../components/messages.js";
import * as menu from "../components/menu.js";
dotenv.config();

export const start = () => {
  const token = process.env.TOKEN;
  const bot = new TelegramBot(token, { polling: true });
  const botMSG = new Message();

  const workoutParams = {
    body: void 0,
    equipment: new Set(),
    intesive: void 0,
    health: new Set(),
  };

  bot.setMyCommands([
    {
      command: "/start",
      description: "Включить бота",
    },
    {
      command: "/info",
      description: "Как пользоваться ботом",
    },
  ]);

  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    switch (text) {
      // Стартовое сообщение
      case "/start":
        await bot.sendSticker(chatId, stickers.start);
        await bot.sendMessage(
          chatId,
          botMSG.start(msg.from.first_name, msg.from.last_name),
          options.bodyOptions
        );
        break;

      // Информация о боте
      case "/info":
        await bot.sendSticker(chatId, stickers.info);
        await bot.sendMessage(chatId, botMSG.info());
        break;

      // Неизвестная команда
      default:
        await bot.sendSticker(chatId, stickers.def);
        return bot.sendMessage(chatId, botMSG.default(text));
    }
  });

  // Слушатель клавиатур
  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    //   Клавиатура тренировочной схемы
    if (menu.body.includes(data)) {
      workoutParams.body = data;
      await bot.sendMessage(
        chatId,
        botMSG.train(data),
        options.equipmentOptions
      );
      return;
    }

    // Клавиатура оборудования
    if (menu.equipment.includes(data)) {
      const equipment = Array.from(workoutParams.equipment);
      if (data !== menu.equipment[2].toUpperCase()) {
        workoutParams.equipment.add(data);
        return;
      } else if (data === menu.equipment[2].toUpperCase()) {
        equipment.length === 0
          ? await bot.sendMessage(
              chatId,
              botMSG.emptyParams(),
              options.equipmentOptions
            )
          : await bot.sendMessage(
              chatId,
              botMSG.setEquipment(equipment),
              options.intensityOptions
            );
        return;
      }
      return;
    }

    // Клавиатура интенсивности
    if (menu.intensity.includes(data)) {
      workoutParams.intesive = data;
      await bot.sendMessage(
        chatId,
        botMSG.health(msg.from.first_name, data),
        options.healthOptions
      );
      return;
    }

    // Клавиатура здоровья
    if (menu.health.includes(data)) {
      if (data !== menu.health[3].toUpperCase()) {
        return workoutParams.health.add(data);
      } else if (data === menu.health[3].toUpperCase()) {
        return bot.sendMessage(chatId, botMSG.finish());
      }
      return;
    }
  });
};

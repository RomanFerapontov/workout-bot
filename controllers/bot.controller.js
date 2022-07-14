import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import * as options from "../components/keyboards.js";
import { Message } from "../components/messages.js";
import * as menu from "../components/menu.js";
import { Randomizer } from "../helpers/randomizer.js";
import { reset } from "../helpers/helpers.js";
dotenv.config();

let equipment = [];
let planes = [];

const workoutParams = {
  equipment: equipment,
  intensive: "light",
  planes: planes,
};

export const start = () => {
  const token = process.env.TOKEN;
  const bot = new TelegramBot(token, { polling: true });
  const botMSG = new Message();

  bot.setMyCommands([
    {
      command: "/start",
      description: "Start to set workout options.",
    },
  ]);

  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    switch (text) {
      case "/start":
        await bot.sendMessage(chatId, botMSG.start(), options.bodyOptions);
        break;

      default:
        return bot.sendMessage(chatId, botMSG.default(text));
    }
  });

  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    let msgID = msg.message.message_id;

    if (menu.body.includes(data)) {
      if (data !== "OK") {
        planes.push(data.toLowerCase());
        return;
      } else if (data === "OK") {
        if (planes.length !== 0) {
          await bot.deleteMessage(chatId, msgID);
          await bot.sendMessage(
            chatId,
            botMSG.equipment(),
            options.equipmentOptions
          );
        } else {
          await bot.deleteMessage(chatId, msgID);
          await bot.sendMessage(
            chatId,
            botMSG.emptyParams(),
            options.bodyOptions
          );
        }
      }

      return;
    }

    if (menu.equipment.includes(data)) {
      await bot.deleteMessage(chatId, msgID);
      data == menu.equipment[1] ? equipment.push("KB") : false;
      await bot.sendMessage(
        chatId,
        botMSG.intencity(),
        options.intensityOptions
      );
      return;
    }

    if (menu.intensity.includes(data)) {
      workoutParams.intensive = data.toLowerCase();
      await bot.deleteMessage(chatId, msgID);
      await bot.sendMessage(
        chatId,
        botMSG.workout(workoutParams),
        options.getWorkoutButton
      );
      return;
    }

    if (data == menu.getWorkout[1] || data == menu.restart[1]) {
      const WOD = new Randomizer(workoutParams);
      const wod = WOD.getWorkout();
      await bot.sendMessage(chatId, wod, options.restart);
    } else if (data == menu.getWorkout[0] || data == menu.restart[0]) {
      reset(equipment);
      reset(planes);
      await bot.deleteMessage(chatId, msgID);
      await bot.sendMessage(chatId, botMSG.start(), options.bodyOptions);
    }
  });
};

import * as menu from "./menu.js";

export const bodyOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: menu.body[0], callback_data: menu.body[0] }],
      [{ text: menu.body[1], callback_data: menu.body[1] }],
      [{ text: menu.body[2], callback_data: menu.body[2] }],
      [{ text: menu.body[3], callback_data: menu.body[3] }],
      [{ text: menu.body[4], callback_data: menu.body[4] }],
      [{ text: menu.body[5], callback_data: menu.body[5] }],
      [{ text: menu.body[6], callback_data: menu.body[6] }],
    ],
  }),
};

export const equipmentOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        {
          text: menu.equipment[0],
          callback_data: menu.equipment[0],
        },
      ],
      [{ text: menu.equipment[1], callback_data: menu.equipment[1] }],
    ],
  }),
};

export const intensityOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: menu.intensity[0], callback_data: menu.intensity[0] }],
      [{ text: menu.intensity[1], callback_data: menu.intensity[1] }],
    ],
  }),
};

export const getWorkoutButton = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: menu.getWorkout[0], callback_data: menu.getWorkout[0] }],
      [{ text: menu.getWorkout[1], callback_data: menu.getWorkout[1] }],
    ],
  }),
};

export const restart = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: menu.restart[0], callback_data: menu.restart[0] }],
    ],
  }),
};

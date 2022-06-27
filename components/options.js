import * as menu from "./menu.js";

export const bodyOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: menu.body[0], callback_data: menu.body[0] },
        { text: menu.body[1], callback_data: menu.body[1] },
        { text: menu.body[2], callback_data: menu.body[2] },
      ],
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
        { text: menu.equipment[1], callback_data: menu.equipment[1] },
      ],
      [{ text: menu.equipment[2], callback_data: menu.equipment[2] }],
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

export const healthOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: menu.health[0], callback_data: menu.health[0] }],
      [{ text: menu.health[1], callback_data: menu.health[1] }],
      [{ text: menu.health[2], callback_data: menu.health[2] }],
      [{ text: menu.health[3], callback_data: menu.health[3] }],
    ],
  }),
};

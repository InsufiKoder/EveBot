const client = require("../..");
require("dotenv").config();
const economy = require("discord-bot-eco");

client.on("ready", () => {
  economy.setConfig({
    mongoURL: process.env.MONGOURI,
    currency: "$",
    allowBankruptcy: false,
    limits: {
      defaultBankLimit: 3000,
      enabled: false,
    },
    shopEnabled: true,
    shop: [
      {
        itemName: "Example Item",
        itemDescription: "Example Description",
        itemLogo: {
          enabled: true,
          customEmoji: {
            enabled: false,
            emojiName: "",
            emojiID: "",
            isAnimated: false,
          },
          emoji: "🪙 ",
        },
        itemBuyPrice: 1000,
        itemSellPrice: 900,
        parentCategory: "",
        itemBuyable: true,
        itemSellable: false,
      },
    ],
  });

  console.log("Economy System Ready!");
});

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
        itemName: "Goldfish",
        itemDescription: "Received from fishing.",
        itemLogo: {
          enabled: false,
          customEmoji: {
            enabled: false,
            emojiName: "",
            emojiID: "",
            isAnimated: false,
          },
          emoji: "🪙",
        },
        itemBuyPrice: 0,
        itemSellPrice: 125,
        parentCategory: "Fish",
        itemBuyable: false,
        itemSellable: true,
      },
      {
        itemName: "Catfish",
        itemDescription: "Received from fishing.",
        itemLogo: {
          enabled: false,
          customEmoji: {
            enabled: false,
            emojiName: "",
            emojiID: "",
            isAnimated: false,
          },
          emoji: "🪙",
        },
        itemBuyPrice: 0,
        itemSellPrice: 250,
        parentCategory: "Fish",
        itemBuyable: false,
        itemSellable: true,
      },
      {
        itemName: "Swordfish",
        itemDescription: "Received from fishing.",
        itemLogo: {
          enabled: false,
          customEmoji: {
            enabled: false,
            emojiName: "",
            emojiID: "",
            isAnimated: false,
          },
          emoji: "🪙",
        },
        itemBuyPrice: 0,
        itemSellPrice: 500,
        parentCategory: "Fish",
        itemBuyable: false,
        itemSellable: true,
      },
      {
        itemName: "Mackerel",
        itemDescription: "Received from fishing.",
        itemLogo: {
          enabled: false,
          customEmoji: {
            enabled: false,
            emojiName: "",
            emojiID: "",
            isAnimated: false,
          },
          emoji: "🪙",
        },
        itemBuyPrice: 0,
        itemSellPrice: 100,
        parentCategory: "Fish",
        itemBuyable: false,
        itemSellable: true,
      },
      {
        itemName: "Salmon",
        itemDescription: "Received from fishing.",
        itemLogo: {
          enabled: false,
          customEmoji: {
            enabled: false,
            emojiName: "",
            emojiID: "",
            isAnimated: false,
          },
          emoji: "🪙",
        },
        itemBuyPrice: 0,
        itemSellPrice: 75,
        parentCategory: "Fish",
        itemBuyable: false,
        itemSellable: true,
      },
      {
        itemName: "Cod",
        itemDescription: "Received from fishing.",
        itemLogo: {
          enabled: false,
          customEmoji: {
            enabled: false,
            emojiName: "",
            emojiID: "",
            isAnimated: false,
          },
          emoji: "🪙",
        },
        itemBuyPrice: 0,
        itemSellPrice: 200,
        parentCategory: "Fish",
        itemBuyable: false,
        itemSellable: true,
      },
    ],
  });

  console.log("Economy System Ready!");
});

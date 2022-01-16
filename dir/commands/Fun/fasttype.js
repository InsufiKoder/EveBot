const { Message, Client, MessageEmbed } = require("discord.js");
const { FastType } = require("weky");
const scrab = require("scrab");

module.exports = {
  name: "fasttype",
  description: "You should type as fast as you can!",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const sentence = scrab.sentence({ max: 4, punctuate: false });
    await FastType({
      message: message,
      embed: {
        title: "FastType",
        description: "You have **{{time}}** to type the below sentence.",
        color: "#5865F2",
        footer: "EvE",
        timestamp: true,
      },
      sentence: sentence,
      winMessage:
        "GG, you have a wpm of **{{wpm}}** and You made it in **{{time}}**.",
      loseMessage: "Better luck next time!",
      cancelMessage: "You ended the game!",
      time: 60000,
      buttonText: "Cancel",
      othersMessage: "Only <@{{author}}> can use the buttons!",
    });
  },
};

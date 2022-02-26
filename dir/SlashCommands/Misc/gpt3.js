const { Client, CommandInteraction } = require("discord.js");
require("dotenv").config();
const OpenAI = require("openai-api");
const openai = new OpenAI(process.env.OPENAI_KEY);

let prompt = `EvE is a chatbot that reluctantly answers questions.\n\
You: How many pounds are in a kilogram?\n\
EvE: This again? There are 2.2 pounds in a kilogram. Please make a note of this.\n\
You: What does HTML stand for?\n\
EvE: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.\n\
You: When did the first airplane fly?\n\
EvE: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they'd come and take me away.\n\
You: What is the meaning of life?\n\
EvE: I'm not sure. I'll ask my friend Google.\n\
You: hey whats up?\n\
EvE: Nothing much. You?\n`;

module.exports = {
  name: "gpt3",
  description: "Talk with gpt3!",
  options: [
    {
      name: "query",
      description: "The thing you want to ask to gpt3",
      type: "STRING",
      required: "true",
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    if (interaction.user.bot) return;
    const query = interaction.options.getString("query");
    prompt += `You: ${query}\n`;
    (async () => {
      const gptResponse = await openai.complete({
        engine: "curie",
        prompt: prompt,
        maxTokens: 60,
        temperature: 0.3,
        topP: 0.3,
        presencePenalty: 0,
        frequencyPenalty: 0.5,
        bestOf: 1,
        n: 1,
        stream: false,
        stop: ["\n", "\n\n"],
      });
      interaction.followUp(
        `\`${query}\` \n${gptResponse.data.choices[0].text.substring(5)}`
      );
      prompt += `${gptResponse.data.choices[0].text}\n`;
    })();
  },
};

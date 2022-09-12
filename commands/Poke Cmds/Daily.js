const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const Daily = require('../../models/daily.js');
const ms = require("ms");
const config = require('../../config.js')

module.exports = {
  name: "daily",
  description: "Get credit rewards every day for just clicking a button!",
  category: "GettingStarted",
  args: false,
  usage: ["/"],
  permissions: [],
  aliases: ["vote"],
  execute: async (client, message, args, prefix, guild, color, channel) => {


    let user = await User.findOne({ id: message.author.id });
    if (!user) return message.channel.send(`> ${config.no} **You must pick your starter pokÃ©mon with \`${prefix}start\` before using this command.**`);

    if (!user.upvotes) user.upvotes = 0
    await user.save();
    let daily = await Daily.findOne({ id: message.author.id });
    if (!daily) await new Daily({ id: message.author.id }).save();
    daily = await Daily.findOne({ id: message.author.id });

    let upvotes = `${config.no} ${config.no} ${config.no} ${config.no} ${config.no} ${config.no} ${config.no}`;
    if (user.upvotes == 1) upvotes = `${config.yes} ${config.no} ${config.no} ${config.no} ${config.no} ${config.no} ${config.no}`;
    if (user.upvotes == 2) upvotes = `${config.yes} ${config.yes} ${config.no} ${config.no} ${config.no} ${config.no} ${config.no}`;
    if (user.upvotes == 3) upvotes = `${config.yes} ${config.yes} ${config.yes} ${config.no} ${config.no} ${config.no} ${config.no}`;
    if (user.upvotes == 4) upvotes = `${config.yes} ${config.yes} ${config.yes} ${config.yes} ${config.no} ${config.no} ${config.no}`;
    if (user.upvotes == 5) upvotes = `${config.yes} ${config.yes} ${config.yes} ${config.yes} ${config.yes} ${config.no} ${config.no}`;
    if (user.upvotes == 6) upvotes = `${config.yes} ${config.yes} ${config.yes} ${config.yes} ${config.yes} ${config.yes} ${config.no}`;
    if (user.upvotes > 6) upvotes = `${config.yes} ${config.yes} ${config.yes} ${config.yes} ${config.yes} ${config.yes} ${config.yes}`;
    streak = upvotes + `\n\n**Your Rewards**\n>  Bronze Crate: ${user.bronzecrate}\n>  Silver Crate: ${user.silvercrate}\n>  Golden Crate: ${user.goldencrate}\n>  Diamond Crate: ${user.diamondcrate}\n>  Deluxe Crate: ${user.deluxecrate}`



    // console.log(timeleft)

    const Embed = new Discord.MessageEmbed()
      .setTitle(`Voting Rewards`)
      .setColor(color)
      .setDescription(`**[Vote for the bot every 12 hours to gain rewards!](https://top.gg/bot/${client.user.id}/vote)** Voting for the bot multiple days in a row will increase your streak and give you a chance at better rewards!\n\n[Vote Now](https://top.gg/bot/${client.user.id}/vote)`)
      .addField(`Current Voting Streak: ${user.upvotes}`, streak)
      .setFooter("Once you have voted, you will get dm from the bot & Rewards will automatically redeemed to your account.")
    

    return message.channel.send(Embed);
  }
}
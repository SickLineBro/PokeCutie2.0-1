const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");
const { capitalize } = require('../../functions.js')

module.exports = {
	name: "buy",
	description: "Display your credit balance.",
	category: "pokemon",
	args: false,
	usage: ["deluxe"],
	cooldown: 3,
	permissions: [],
	aliases: [""],
	execute: async (client, message, args, prefix, guild, color, channel) => {
	
	let user = await User.findOne({ id: message.author.id });
  if(!user) return message.channel.send("You haven't started yet!")
  


  if (!args[0]) return message.channel.send(embed)

  if (args[0].toLowerCase() === "deluxe"){
    if(user.shards<= -24) return message.reply("You Don't Have Enough Shards")
    user.deluxecrate = user.deluxecrate + 1
    user.shards = user.shards - 25
    await user.save()
    return message.reply("You Bought 1 Deluxe Crate!")
  }
  }
}
const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");


module.exports = {
    name: "quest",
    description: "complete quests for reward",
    category: "Pokemon Commands",
    usage: ["quest"],
    cooldown: 3,
    aliases: ["q"],
    execute: async (client, message, args, prefix, guild, color, channel) => {

      	
	let user = await User.findOne({ id: message.author.id });
  if(!user) return message.channel.send("You haven't started yet!")

  let apiping =  user.questcaught
  let apiping2 =  user.released
  let apiping3 = user.streak

let emoji = "<:back:936553900419469353><:empty:936554063510790175><:empty:936554063510790175><:empty:936554063510790175><:front:936554257652523018>"
let emoji2 = "<:back:936553900419469353><:empty:936554063510790175><:empty:936554063510790175><:empty:936554063510790175><:front:936554257652523018>"
if (apiping < 199) emoji2 =
"<:back:936553900419469353><:empty:936554063510790175><:empty:936554063510790175><:empty:936554063510790175><:front:936554257652523018>"
if (apiping > 199) emoji2 = "<:back:936541983634239549><:empty:936554063510790175><:empty:936554063510790175><:empty:936554063510790175><:front:936554257652523018>"
if (apiping > 399) emoji2 = "<:back:936541983634239549><:fill:936553950885326848><:fill:936553950885326848><:fill:936553950885326848><:empty:936554063510790175><:empty:936554063510790175><:empty:936554063510790175><:front:936554257652523018>"
if (apiping > 599) emoji2 = "<:back:936541983634239549><:fill:936553950885326848><:fill:936553950885326848><:fill:936553950885326848><:empty:936554063510790175><:empty:936554063510790175><:empty:936554063510790175><:front:936554257652523018>"
if (apiping > 799) emoji2 = "<:back:936541983634239549><:fill:936553950885326848><:fill:936553950885326848><:fill:936553950885326848><:front:936554257652523018>"
if (apiping > 999) emoji2 = "<:back:936541983634239549><:fill:936553950885326848><:fill:936553950885326848><:fill:936553950885326848><:bar2:873263404192><:fill2:873266000307572806>"
if (apiping > 1001) emoji2 = "**Quest Completed ✅**"

let emoji3 = "<:back:936553900419469353><:empty:936554063510790175><:empty:936554063510790175><:empty:936554063510790175><:front:936554257652523018>"
if (apiping3 < 5) emoji3 =
"<:back:936553900419469353><:empty:936554063510790175><:empty:936554063510790175><:empty:936554063510790175><:front:936554257652523018>"
if (apiping3 > 5) emoji3 = "<:back:936541983634239549><:empty:936554063510790175><:empty:936554063510790175><:empty:936554063510790175><:front:936554257652523018>"
if (apiping3 > 9) emoji3 = "<:back:936541983634239549><:fill:936553950885326848><:fill:936553950885326848><:fill:936553950885326848><:empty:936554063510790175><:empty:936554063510790175><:empty:936554063510790175><:front:936554257652523018>"
if (apiping3 > 19) emoji3 = "<:back:936541983634239549><:fill:936553950885326848><:fill:936553950885326848><:fill:936553950885326848><:empty:936554063510790175><:empty:936554063510790175><:empty:936554063510790175><:front:936554257652523018>"
if (apiping3 > 29) emoji3 = "<:back:936541983634239549><:fill:936553950885326848><:fill:936553950885326848><:fill:936553950885326848><:front:936554257652523018>"
if (apiping3 > 39) emoji3 = "<:back:936541983634239549><:fill:936553950885326848><:fill:936553950885326848><:fill:936553950885326848><:bar2:873263404192<:fill2:873266000307572806>"
if (apiping3 > 49) emoji3 = "**Quest Completed ✅**"

if (apiping2 < 199) emoji =
"<:back:936553900419469353><:empty:936554063510790175><:empty:936554063510790175><:empty:936554063510790175><:front:936554257652523018>"
if (apiping2 > 199) emoji = "<:back:936541983634239549><:empty:936554063510790175><:empty:936554063510790175><:empty:936554063510790175><:front:936554257652523018>"
if (apiping2 > 399) emoji = "<:back:936541983634239549><:fill:936553950885326848><:fill:936553950885326848><:fill:936553950885326848><:empty:936554063510790175><:empty:936554063510790175><:empty:936554063510790175><:front:936554257652523018>"
if (apiping2 > 599) emoji = "<:back:936541983634239549><:fill:936553950885326848><:fill:936553950885326848><:fill:936553950885326848><:empty:936554063510790175><:empty:936554063510790175><:empty:936554063510790175><:front:936554257652523018>"
if (apiping2 > 799) emoji = "<:back:936541983634239549><:fill:936553950885326848><:fill:936553950885326848><:fill:936553950885326848><:front:936554257652523018>"
if (apiping2 > 999) emoji = "<:back:936541983634239549><:fill:936553950885326848><:fill:936553950885326848><:fill:936553950885326848><:fill2:873266000307572806>"
if (apiping2 > 1001) emoji = "**Quest Completed ✅**"
      let embed = new MessageEmbed()
      .setAuthor('Quests')
        .setColor("	#36393e")
      .setDescription(`Complete these quests to earn special rewards!
      **Quest #1**\n**Catch 250 pokémon.** \n${emoji2} \`${user.questcaught}/250\`\n**Reward:** 50,000 Pokecoins\n**Quest #2**\n**Release 750 pokémon.**\n${emoji} \`${user.released}/750\`\n**Reward:** 50,000 Pokecoins
      `)
  

    if (!args[0]) return message.channel.send(embed);
    if (args[0].toLowerCase() == "claim1") {
      if (user.questcaught <= 251) return message.channel.send("> <:xmark:872833320893939762> Complete the Quest first")
      if(user.questclaim === 1) return message.channel.send("> <:xmark:872833320893939762> You have already claimed the quest reward")
     user.balance = user.balance + 50000;
     user.questclaim = user.questclaim +1;
     await user.save();
      return message.channel.send('>  :tada: Quest Completed. Quest Rewards Recived!!' )
      }
        if (!args[0]) return message.channel.send(embed);
    if (args[0].toLowerCase() == "claim2") {
      if (user.released <= 751) return message.channel.send("> <:x:> Complete the Quest first")
      if(user.questclaim2 === 1) return message.channel.send("> <:x:> You have already claimed the Quest reward")
     user.balance = user.balance + 25000;
     user.questclaim2 = user.questclaim2 + 1;
     await user.save();
      return message.channel.send('>  :tada: Quest Completed. Quest Rewards Recived!!' )
    }
    }
}
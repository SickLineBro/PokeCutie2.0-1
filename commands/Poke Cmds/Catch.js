const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native')
const fs = require("fs");
const { classToPlain } = require("class-transformer");
const { getlength } = require("../../functions");
const Pokemon = require("./../../Classes/Pokemon");
const config = require('../../config.js')
let Guild = require('../../models/guild.js');
let User = require("../../models/user.js");
let levelUp = require("../../db/levelup.js")
let Spawn = require("../../models/spawn.js");
let pokemon = require("../../db/pokemon.js");
let forms = require("../../db/forms.js");
let primal = require("../../db/primal.js");
let shinyDb = require("../../db/shiny");
let gen8 = require('../../db/gen8.js')
let altnames = require("../../db/altnames.js");
const emojis = require("../../db/emojis.json");

const { capitalize } = require("../../functions.js");

module.exports = {
  name: "catch",
  description: "Catch a wild pokemon when it appears in the chat.",
  category: "Pokemon Commands",
  args: false,
  usage: ["catch <pokemon>"],
  aliases: ["c"],
  execute: async (client, message, args, prefix, guild, color, channel) => {

    let spawn = await Spawn.findOne({ id: message.channel.id })
    if (!spawn.pokemon[0]) return;
    let user = await User.findOne({ id: message.author.id })
    if (!user) return message.channel.send(`${config.no} You need to pick a starter pokémon using the \`${prefix}start\` command before using this command!`);
    let embed = new MessageEmbed()
    //let userx = await User.findOne({ id: message.author.id })
    //nature = userx.pokemons.nature.replace(/-+/g, " ")

    let name = args.join("-").toLowerCase()
    for (var i = 0; i < altnames.length; i++) {
      let org = []
      altnames[i].jpname.toLowerCase().split(" | ").forEach(nm => {
        org.push(nm.replace(" ", "-"))
      })
      for (let y = 0; y < org.length; y++) {
        if (org[y] == name.toLowerCase()) {
          let og = `${org[0]} | ${org[1]} | ${org[2]}`
          name = name.replace(name, og.toLowerCase().replace("-", " "))
        }
      }
    }
    const altjp = altnames.find(e => e.jpname.toLowerCase() === name.toLowerCase().replace("shiny-", "")),
      altfr = altnames.find(e => e.frname.toLowerCase() === name.toLowerCase().replace("shiny-", "")),
      altde = altnames.find(e => e.dename.toLowerCase() === name.toLowerCase().replace("shiny-", ""));
    if (altjp) name = name.toLowerCase().replace(altjp.jpname.toLowerCase(), altjp.name.toLowerCase());
    else if (altfr) name = name.toLowerCase().replace(altfr.frname.toLowerCase(), altfr.name.toLowerCase());
    else if (altde) name = name.toLowerCase().replace(altde.dename.toLowerCase(), altde.name.toLowerCase());

    let poke = spawn.pokemon[0];
    if (!poke) return;
    if (poke && name.toLowerCase() == poke.name.toLowerCase().split(/ +/g).join("-")) {
      spawn.pokemon = [];
      spawn.time = 0;
      spawn.hcool = false;
      await spawn.save();
      await spawn.markModified("pokemons");

      let chance = Math.floor(Math.random() * 100)

      let lvl = poke.level;
      poke.xp = ((lvl - 1) + 80 * lvl + 100 + 51);
      // poke.shiny = true 
      if ((user.shname !== null) && (name == user.shname.toLowerCase().replace(" ", "-")) && (chance > 98)) {
        poke.shiny = true
        user.shname = null
        user.shcont = 0
        await user.save()
      }
      await user.pokemons.push(poke);
      await user.caught.push(poke);
      user.lbcaught = user.lbcaught + 1;

      if (poke.shiny) {
                user.shinyCaught = user.shinyCaught + 1;
  await user.save()
        }
      let caughtNo = user.caught.filter(r => r.name == name).length
      let balanceToAdd = 100
      if (caughtNo == 0) balanceToAdd = 100;
      if (caughtNo == 9) balanceToAdd = 250;
      if (caughtNo == 99) balanceToAdd = 2500;
      user.balance = user.balance + parseInt(balanceToAdd)
      await user.save();
      await user.markModified("pokemons");
      // console.log(balanceToAdd)

      let u, footer
      if (user.shname !== null) {
        name.toLowerCase().replace(" ", "-") == user.shname.toLowerCase().replace(" ", "-") ? u = ` Congratulations ${message.author}! You have caught a ${(poke.shiny && emojis[poke.name.toLowerCase()+"_sh"]) ? emojis[poke.name.toLowerCase()+"_sh"] : ""}${(!poke.shiny && emojis[poke.name.toLowerCase()]) ? emojis[poke.name.toLowerCase()] : ""} Level ${poke.level} ${poke.shiny ? "✨ " : ""}${poke.name.replace(/-+/g, " ").replace(/-+/g, " ").replace(/\b\w/g, l => l.toUpperCase())}! ${balanceToAdd == 100 ? "" : `, You got ${balanceToAdd} Cutiecoins!`}   \n+1 Shiny count` : u = `Congratulations ${message.author}! You have caught a ${(poke.shiny && emojis[poke.name.toLowerCase()+"_sh"]) ? emojis[poke.name.toLowerCase()+"_sh"] : ""}${(!poke.shiny && emojis[poke.name.toLowerCase()]) ? emojis[poke.name.toLowerCase()] : ""} Level ${poke.level} ${poke.shiny ? "✨ " : ""}${poke.name.replace(/-+/g, " ").replace(/-+/g, " ").replace(/\b\w/g, l => l.toUpperCase())}! ${balanceToAdd == 0 ? "." : `You got ${balanceToAdd} Cutecoins!`}`


        if (name == user.shname.toLowerCase().replace(" ", "-")) u += `\n\nStreak Count: **${user.shcount + 1}**`

        if (name == user.shname.toLowerCase().replace(" ", "-")) {
          ++user.shcount
          await user.save() 
        }
      } else {
        u = ` Congratulations ${message.author}! You have caught a ${(poke.shiny && emojis[poke.name.toLowerCase()+"_sh"]) ? emojis[poke.name.toLowerCase()+"_sh"] : ""}${(!poke.shiny && emojis[poke.name.toLowerCase()]) ? emojis[poke.name.toLowerCase()] : ""} Level ${poke.level} ${poke.shiny ? "✨ " : ""}${poke.name.replace(/-+/g, " ").replace(/-+/g, " ").replace(/\b\w/g, l => l.toUpperCase())}! ${balanceToAdd == 0 ? "." : `You got ${balanceToAdd} Starcoins!`}` 
        footer = " "
      }
//${poke.shiny ? "Shiny " : ""}${poke.name.replace(/-+/g, " ").replace(/-+/g, " ").replace(/\b\w/g, l => l.toUpperCase())}

        let msg = await message.channel.send(u);        
      
    } else {
      return message.channel.send(`> ${config.no} That is the wrong Guess!`)
    }
  }
}

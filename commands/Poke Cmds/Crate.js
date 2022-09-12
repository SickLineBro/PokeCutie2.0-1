const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const Daily = require('../../models/daily.js');
const ms = require("ms");
const Pokemon = require("../../Classes/Pokemon.js")
const { classToPlain } = require("class-transformer")
const config = require('../../config.js')

module.exports = {
  name: "crates",
  description: "if u vote the bot then u will recive crate if u open that then u will get prizes",
  category: "Getting Started",
  args: false,
  usage: [`crate / <Prefix>crate open <bronze/silver/golden/diamond/deluxe> [amount]`],
  aliases: ["crate"],

  execute: async (client, message, args, prefix, guild, color, channel) => {

    const user = await User.findOne({ id: message.author.id });
    if (!user) return message.channel.send(`> ${config.no} **You must pick your starter pokémon with \`${prefix}start\` before using this command.**`);


    const Embed = new Discord.MessageEmbed()
      .setTitle("Crates")
      .setColor(color)
      .setDescription("Voting Reward Crates")
      .addField(" **Bronze Crate**", `${user.bronzecrate} crates`)
      .addField(" **Silver Crate**", `${user.silvercrate} crates`)
      .addField(" **Golden Crate**", `${user.goldencrate} crates`)
      .addField(" **Diamond Crate**", `${user.diamondcrate} crates`)
      .addField(" **Deluxe Crate**", `${user.deluxecrate} crates`)
      .addField("**Valentine Crate**", `${user.valentinecrate} crates`)
      .setFooter(`You can open your crates with ${prefix}crate open <bronze | silver | golden | diamond | deluxe | ....> [amount]`)

    if (!args[0]) return message.channel.send(Embed)
    else if (args[0].toLowerCase() == "open") {
      const name = args[1].toLowerCase()
      let embed = new MessageEmbed()
        .setAuthor("Opening Crate...")
        .setColor(color)

      if (!name || !args[1]) return
      if (name == "bronze") {
        if (user.bronzecrate <= 0) return message.channel.send(`You don't have enough bronze Chest(s)!`)
        let random = Math.floor(Math.random() * 10)
        let reward, creditReward = 0

        if (random >= 8) {
          reward = "pokemon"
        }
        if (random <= 7) {
          reward = "credits"
          if (random <= 2) creditReward = 400
          else if (random <= 3 && random >= 5) creditReward = 400
          else creditReward = 200
        }
        // console.log(random)
        // console.log(creditReward)


        if (reward == "credits") {
          embed.addField("You Received", creditReward + " Credits")
          user.balance = user.balance + creditReward
          --user.bronzecrate
          await user.save()
          return message.channel.send(embed)
        } else if (reward == "pokemon") {
          let Name = Math.floor(Math.random() * 898)
          let url;
          const options = {
            url: `https://pokeapi.co/api/v2/pokemon/${Name}`,
            json: true
          }

          await get(options).then(async t => {
            let check = t.id.toString().length
            if (check === 1) {
              url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${t.id}.png`
            } else if (check === 2) {
              url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${t.id}.png`
            } else if (check === 3) {
              url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${t.id}.png`
            } else {
              return
            }

            var re
            const Type = t.types.map(r => {
              if (r !== r) re = r
              if (re == r) return
              return `${r.type.name}`
            }).join(" | ")
            let lvl = Math.floor(Math.random() * 50)
            let poke = new Pokemon({ name: t.name, id: t.id, url: url, rarity: Type }, lvl);
            poke = await classToPlain(poke);
            user.pokemons.push(poke)
            await user.markModified("pokemons")
            embed.addField("You received...", `\`\`\`${poke.name.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())} | Level ${poke.level} | ${poke.totalIV}% Iv\`\`\``)
          })
          --user.bronzecrate
          await user.save()
          return message.channel.send(embed)
        } else {
          return
        }

      } else if (name == "silver") {
        if (user.silvercrate <= 0) return message.channel.send(`You don't have enough Silver crate(s)!`)
        let random = Math.floor(Math.random() * 10)
        let reward, creditReward = 0

        if (random >= 8) {
          reward = "pokemon"
        }
        if (random <= 7) {
          reward = "credits"
          if (random <= 2) creditReward = 800
          else if (random <= 3 && random >= 5) creditReward = 400
          else creditReward = 600
        }

        if (reward == "credits") {
          embed.addField("You Received", creditReward + " Credits")
          user.balance = user.balance + creditReward
          --user.silvercrate
          await user.save()
          return message.channel.send(embed)
        }
        else if (reward == "pokemon") {
          let Name = Math.floor(Math.random() * 898)
          let url;
          const options = {
            url: `https://pokeapi.co/api/v2/pokemon/${Name}`,
            json: true
          }

          await get(options).then(async t => {
            let check = t.id.toString().length
            if (check === 1) {
              url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${t.id}.png`
            } else if (check === 2) {
              url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${t.id}.png`
            } else if (check === 3) {
              url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${t.id}.png`
            } else {
              return
            }

            var re
            const Type = t.types.map(r => {
              if (r !== r) re = r
              if (re == r) return
              return `${r.type.name}`
            }).join(" | ")
            let lvl = Math.floor(Math.random() * 50)
            let poke = new Pokemon({ name: t.name, id: t.id, url: url, rarity: Type }, lvl);
            poke = await classToPlain(poke);
            user.pokemons.push(poke)
            await user.markModified("pokemons")
            embed.addField("You received...", `\`\`\`${poke.name.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())} | Level ${poke.level} | ${poke.totalIV}% Iv\`\`\``)
          })
          --user.silvercrate
          await user.save()
          return message.channel.send(embed)
        } else {
          return
        }

      } else if (name == "golden") {

        if (user.goldencrate <= 0) return message.channel.send(`You don't have enough Golden crate(s)!`)
        let random = Math.floor(Math.random() * 10)
        let reward, creditReward = 0

        if (random >= 8) {
          reward = "pokemon"
        }
        if (random <= 7) {
          reward = "credits"
          if (random <= 2) creditReward = 400
          else if (random <= 3 && random >= 5) creditReward = 1200
          else creditReward = 400
        }

        if (reward == "credits") {
          embed.addField("You Received", creditReward + " credits")
          user.balance = user.balance + creditReward
          --user.goldencrate
          await user.save()
          return message.channel.send(embed)
        }

        else if (reward == "pokemon") {
          let Name = Math.floor(Math.random() * 898)
          let url;
          const options = {
            url: `https://pokeapi.co/api/v2/pokemon/${Name}`,
            json: true
          }

          await get(options).then(async t => {
            let check = t.id.toString().length
            if (check === 1) {
              url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${t.id}.png`
            } else if (check === 2) {
              url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${t.id}.png`
            } else if (check === 3) {
              url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${t.id}.png`
            } else {
              return
            }

            var re
            const Type = t.types.map(r => {
              if (r !== r) re = r
              if (re == r) return
              return `${r.type.name}`
            }).join(" | ")
            let lvl = Math.floor(Math.random() * 50)
            let poke = new Pokemon({ name: t.name, id: t.id, url: url, rarity: Type }, lvl);
            poke = await classToPlain(poke);
            user.pokemons.push(poke)
            await user.markModified("pokemons")
            embed.addField("You received...", `\`\`\`${poke.name.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())} | Level ${poke.level} | ${poke.totalIV}% Iv\`\`\``)
          })
          --user.goldencrate
          await user.save()
          return message.channel.send(embed)
        } else {
          return
        }

} else if (name == "deluxe") {

        if (user.deluxecrate <= 0) return message.channel.send(`You don't have enough Deluxe crate(s)!`)
        let random = Math.floor(Math.random() * 15)
        let reward, creditReward = 0, redeemReward = 0, pokemonCredit = false

        if (random >= 9 && random <= 12) {
          reward = "pokemon"
          if (random >= 12) pokemonCredit = true
        }
        if (random <= 8) {
          reward = "credits"
          creditReward = 10000
          if (random >= 8 && random <= 9) creditReward = 10000
          else creditReward = 10000
        }
        if (random >= 14 && random <= 15) {
          reward = "redeem"
          redeemReward = 1
        }

        if (reward == "credits") {
          embed.addField("You Received", creditReward + " Credits")
          user.balance = user.balance + creditReward
          --user.deluxecrate
          await user.save()
          return message.channel.send(embed)
        } else if (reward == "pokemon") {
          let Name = Math.floor(Math.random() * 898)
          let url;
          const options = {
            url: `https://pokeapi.co/api/v2/pokemon/${Name}`,
            json: true
          }

          await get(options).then(async t => {
            let check = t.id.toString().length
            if (check === 1) {
              url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${t.id}.png`
            } else if (check === 2) {
              url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${t.id}.png`
            } else if (check === 3) {
              url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${t.id}.png`
            } else {
              return
            }

            var re
            const Type = t.types.map(r => {
              if (r !== r) re = r
              if (re == r) return
              return `${r.type.name}`
            }).join(" | ")
            let lvl = Math.floor(Math.random() * 50)
            let poke = new Pokemon({ name: t.name, id: t.id, url: url, rarity: Type, shiny: pokemonCredit }, lvl);
            poke = await classToPlain(poke);
            user.pokemons.push(poke)
            await user.markModified("pokemons")
            embed.addField("You received...", `\`\`\`${poke.shiny ? "⭐ " : ""}${poke.name.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())} | Level ${poke.level} | ${poke.totalIV}% Iv\`\`\``)
          })
          --user.deluxecrate
          await user.save()
          return message.channel.send(embed)
        } else if (reward == "redeem") {
          embed.addField("You Received", redeemReward + " Redeem")
          user.redeems = user.redeems + redeemReward
          --user.deluxecrate
          await user.save()
          return message.channel.send(embed)

        } else {
          return
        }
        
      } else if (name == "diamond") {

        if (user.diamondcrate <= 0) return message.channel.send(`You don't have enough Diamond crate(s)!`)
        let random = Math.floor(Math.random() * 15)
        let reward, creditReward = 0, redeemReward = 0, pokemonCredit = false

        if (random >= 9 && random <= 12) {
          reward = "pokemon"
          if (random >= 12) pokemonCredit = true
        }
        if (random <= 8) {
          reward = "credits"
          creditReward = 800
          if (random >= 8 && random <= 9) creditReward = 1600
          else creditReward = 800
        }
        if (random >= 14 && random <= 15) {
          reward = "redeem"
          redeemReward = 1
        }

        if (reward == "credits") {
          embed.addField("You Received", creditReward + " Credits")
          user.balance = user.balance + creditReward
          --user.diamondcrate
          await user.save()
          return message.channel.send(embed)
        } else if (reward == "pokemon") {
          let Name = Math.floor(Math.random() * 898)
          let url;
          const options = {
            url: `https://pokeapi.co/api/v2/pokemon/${Name}`,
            json: true
          }

          await get(options).then(async t => {
            let check = t.id.toString().length
            if (check === 1) {
              url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${t.id}.png`
            } else if (check === 2) {
              url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${t.id}.png`
            } else if (check === 3) {
              url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${t.id}.png`
            } else {
              return
            }

            var re
            const Type = t.types.map(r => {
              if (r !== r) re = r
              if (re == r) return
              return `${r.type.name}`
            }).join(" | ")
            let lvl = Math.floor(Math.random() * 50)
            let poke = new Pokemon({ name: t.name, id: t.id, url: url, rarity: Type, shiny: pokemonCredit }, lvl);
            poke = await classToPlain(poke);
            user.pokemons.push(poke)
            await user.markModified("pokemons")
            embed.addField("You received...", `\`\`\`${poke.shiny ? "⭐ " : ""}${poke.name.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())} | Level ${poke.level} | ${poke.totalIV}% Iv\`\`\``)
          })
          --user.diamondcrate
          await user.save()
          return message.channel.send(embed)
        } else if (reward == "redeem") {
          embed.addField("You Received", redeemReward + " Redeem")
          user.redeems = user.redeems + redeemReward
          --user.diamondcrate
          await user.save()
          return message.channel.send(embed)

        } else {
          return
        }
      
       } else if (name == "valentine") {

      } else {
        return message.channel.send(`\`${name}\` crate doesn't seem to exist.`)
      }
      } else {
      return message.channel.send(module.exports.usage[0])
    }
  }
}
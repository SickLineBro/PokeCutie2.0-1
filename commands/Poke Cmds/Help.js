const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");

module.exports = {
    name: "help",
    description: "Display the help menu!",
    category: "GettingStarted",
    args: false,
    usage: ["help <command>", "help ban", "help adas"],
    cooldown: 3,
    aliases: [""],
   execute: async (client, message, args, prefix, guild, color, channel) => {
        let embed = new MessageEmbed()
            .setAuthor(client.user.username + " Commands")
            .setDescription(`PokeCutie2.0 is the best discord bot to enjoy pokemon in your servers.
Navigate through the help pages : 
\`${prefix}help\` command.\nLike this: \`${prefix}help 2\`\n\n${client.user.username}'s [JOIN SUPPORT SERVER](https://discord.gg/A44r22DGRP)

**HELP PAGES**
> Page 1 : What you'll need to know to start using PokeCutie 2.0 
> Page 2 : The Most Important Commands of the bot
> Page 3 : Other Important Commands
> Page 4 : Commands to do with the shop and buying items.
> Page 5 : Help configuring PokeCutie 2.0 in your server.
> Page 6 : Commands that don't really fit in anywhere else.
> Page 7 : Commands that help filter your Pokémons.
`)
        
            .setFooter("Help Commands will be send to your DM.")

            .setColor(color)

        let embed1 = new MessageEmbed()
            .setAuthor(client.user.username + " Help | Getting Started")
            .setDescription(`Hello there ! \`${prefix}start\` to find out how to get your first pokémon, then come back here and check out the other commands!\n${client.user.username}
**Check Out The Commands below**
> p!start : To check out the pokemons which you can pick
> p!pick : Pick A Starter Pokemon 
> p!help [Command name] Specific Help Command`)
           
            .setColor(color)

        let embed2 = new MessageEmbed()
            .setAuthor(client.user.username + " Important Commands")
            .setDescription(`If you need more information about a specific command, type \`${prefix}help <command>\`
**Check The Commands Below**
${prefix}info pokemon : Gives you your selected pokemon info
${prefix}select : Select a pokemon
${prefix}catch : Catch a spawned pokemon
${prefix}profile : Your Profile
${prefix}nickname : Nickname your selected pokemon
${prefix}duel <@user> : Battle a person
${prefix}gamble <@user> <amount> : Gample Pokemon Balance`)

            .setColor(color)

        let embed3 = new MessageEmbed()
            .setAuthor(client.user.username + " Help | Pokémon Commands II")
            .setDescription(`If you need more information about a specific command, type \`${prefix}help <command>\`.
${prefix}moveinfo <move> : Shows moveinfo
${prefix}daily : Vote For The Bot 12 hours
${prefix}leaderboard <tyoe> : Gets the leaderboard
${prefix}tms : Displays the move the PokeMon Can Learn`)
            .setColor(color)

        let embed4 = new MessageEmbed()
            .setAuthor(client.user.username + " Help | Shop, Market, Auction & Trading")
            .setDescription(`If you need more information about a specific command, type \`${prefix}help <command>\`.
${prefix}market : Pokemon Market
${prefix}trade <user> : Trade With Someone
${prefix}qt <@user> <item> <amount> : quick trade something with someone
${prefix}shop <page> : Shop
${prefix}shopbuy <page no.> <item> : Buy something from shop
${prefix}bal : balance`)

            .setColor(color)

        let embed5 = new MessageEmbed()
            .setAuthor(client.user.username + " Server Settings")
            .setDescription(`If you need more information about a specific command, type \`${prefix}help <command>\`.
${prefix}redirect #channel : Redirect a spawn
${prefix}redirect reset : Reset redirect channel`)
            .setColor(color)

        let embed6 = new MessageEmbed()
            .setAuthor(client.user.username + " Miscellaneous")
          .setDescription(`If you need more information about a specific command, type \`${prefix}help <command>\`.
${prefix}support : Support Server
${prefix}invite : Invite The Bot
${prefix}stats : Display the bot stats
${prefix}ping : Shows the bot ping
${prefix}send : Send a message the official bot server
${prefix}report : Report An User/Server`
)
            .setColor(color)

        let embed7 = new MessageEmbed()
            .setAuthor(client.user.username + " Filters")
            .setDescription(`These are filters that can be used to order and find out your pokemons easily. \nNote: Only most used filters are specified here, if you wanna know all filters, Join support server by doing \`${prefix}support\`, we will help you out.
Filters`,
                `\`--shiny\` | Search for shiny Pokémon\n` +
                `\`--name <Pokémon#name>\` | Search for a certain Pokémon\n` +
                `\`--nick <Nickname>\` | Displays a Pokémon with a certain nickname\n` +
                `\`--level >/< <Level>\` | Search for Pokémon with a certain level\n` +
                `\`--type <Type>\` | Search for Pokémon with a certain type\n` +
                //`\`--price <Price>\` | Search for Pokémon with a certain price\n` +
                `\`--mega\` | Search for mega Pokémon\n` +
                `\`--iv >/< <IV>\` | Search Pokémon with sum of their IVs\n` +
                `\`--legendary\` | Search for legendary Pokémon\n` +
                `\`--mythical\` | Search for mythical Pokémon\n` +
                `\`--ub\` | Search for Ultra Beast Pokémon\n` +
                `\`--alolan\` | Search for Alolan Pokémon\n` +
                `\`--starters\` | Search for starter Pokémon\n` +
                `\`--galarian\` | Search for galarian Pokémon\n` +
                `\`--alolan\` | Search for alolan Pokémon\n\n` +
                `Example: ${prefix}pk --spdef > 10\n\n` +
                `)`)
            .setColor(color)

        let embed8 = new MessageEmbed()
            .setAuthor("Gamble Help")
            .setDescription(`Gamble with other trainer. \n\n**Note: Gamble At Your own risk, if you lose high amount of money the ${client.user.username} Pokécool Team won't be responsible for that and credits won't be returned.**
${prefix}gamble <@user> <amount> : Gamble `)
            .setColor(color)


        let embed9 = new MessageEmbed()
            .setAuthor("Trade")
            .setDescription("Trade Pokémons/Balance/Redeems with other Trainers!")
            .addField("Usage", `${prefix}trade <@user>`)
            .addField(`${prefix}p add <pokemon#id>`, '\`\`\`Add Pokemons to the ongoing Trade\`\`\`')
            .addField(`${prefix}p remove <pokemon#id>`, '\`\`\`Removes added Pokemon from the ongoing Trade\`\`\`')
            .addField(`${prefix}cr add <amount>`, '\`\`\`Add Balance to the ongoing Trade\`\`\`')
            .addField(`${prefix}cr remove <amount>`, '\`\`\`Removes Balance from the ongoing Trade\`\`\`')
            .addField(`${prefix}r add <amount>`, '\`\`\`Add Redeem(s) to the ongoing Trade\`\`\`')
            .addField(`${prefix}r remove <amount>`, '\`\`\`Remove Redeem(s) from the ongoing Trade\`\`\`')
            .addField(`${prefix}confirm`, '\`\`\`Confirms the Trade\`\`\`')
            .addField(`${prefix}cancel`, '\`\`\`Cancels the Trade\`\`\`')
            
            .setColor(color)



        let embed10 = new MessageEmbed()
            .setAuthor("Market Commands")
            .setDescription(`${client.user.username} Market`)
            .addField("Usage", `${prefix}market`)
            .addField(`${prefix}market info <marketid>`, '\`\`\`Display info about Pokemon listed in market\`\`\`')
            .addField(`${prefix}market remove <marketid>`, '\`\`\`Removes your listed Pokemon from market\`\`\`')
            .addField(`${prefix}market buy <marketid>`, '\`\`\`Buy a Pokemon from the market\`\`\`')
            .addField(`${prefix}market search <--filter>`, '\`\`\`Seach market for a Pokémon\`\`\`')
            .addField(`${prefix}market listings`, '\`\`\`Shows all Pokemons you listed in market\`\`\`')
            .addField(`${prefix}market list <Pokemon> <price>`, '\`\`\`Lists your Pokémon in market\`\`\`')
            .setColor(color)
        
        let embed11 = new MessageEmbed()
        .setAuthor("Server Configuration")
        .setDescription("Enable/Disable Commands")
        .addField("Prefix", `\`\`\`${prefix}setprefix <new prefix>\`\`\``, true)
        .addField("Level Up Messages", `\`\`\`${prefix}le\`\`\``)
        .addField("All Commands",'\`\`\`Start, Pick, Daily, Gamble/Bet, Pokemon/pk, Info/i, Profile/pf, Pokedex/dex, Trade/t, Market/m, Auction/a, Moves, Weak, Team, Shop, Hint, Nickname/nick, Shiny hunt/sh, Select, Balance/bal, Back/b, Next/n, Redeem, Buy, Release, Order, Levelup message, Leaderboard/lb, moveinfo/mi and Duel\`\`\`')
        .setFooter(`You can toggle them by ${prefix}enable <command name> or ${prefix}disable <command name> `)
        .setColor(color)

        let auction = new MessageEmbed()
        .setAuthor("Äuction Command")
        .setDescription("Äuction your Pokemon and Let other trainers Bid for it.")
        .addField("Usage",`${prefix}auction`)
        .addField(`${prefix}auction list <pokemon#id> <auction_time>`,'\`\`\`List your Pokémon in the Auctions.\`\`\`')
        .addField(`${prefix}auction listings`,'\`\`\`Shows all Your Listings in the Auctions.\`\`\`')
        .addField(`${prefix}auction remove <pokemon#id>`,'\`\`\`Remove your Pokémon from the Auctions.\`\`\`')
        .addField(`${prefix}auction info <auction#id>`,'\`\`\`Get The info of Pokemon listed in the Auctions.\`\`\`')
        .addField(`${prefix}auction bid <auction#id> <amount>`,'\`\`\`Bid for a specific Pokémon in the Auctions.\`\`\`')
        .addField(`${prefix}auction search [page] [filters]`,'\`\`\`Search for Pokémon in the Auctions.\`\`\`')
        .setColor(color)

        if (!args[0]) {
            message.channel.send(embed)
        } else {
            if (args[0] === "1") {
                message.channel.send("Sent you a DM containing the help message!")
                return message.author.send(embed1).catch(e => {
                    if (e.message.toLowerCase() === "cannot send messages to this user") return message.channel.send("Your DM's are disabled kindly allow me to send DM's.")
                })
            } else if (args[0] === "2") {
                message.channel.send("Sent you a DM containing the help message!")
                return message.author.send(embed2).catch(e => {
                    if (e.message.toLowerCase() === "cannot send messages to this user") return message.channel.send("Your DM's are disabled, kindly allow me to send DM's.")
                })
            } else if (args[0] === "3") {
                message.channel.send("Sent you a DM containing the help message!")
                return message.author.send(embed3).catch(e => {
                    if (e.message.toLowerCase() === "cannot send messages to this user") return message.channel.send("Your DM's are disabled kindly allow me to send DM's.")
                })
            } else if (args[0] === "4") {
                message.channel.send("Sent you a DM containing the help message!")
                return message.author.send(embed4).catch(e => {
                    if (e.message.toLowerCase() === "cannot send messages to this user") return message.channel.send("Your DM's are disabled kindly allow me to send DM's.")
                })
            } else if (args[0] === "5") {
                message.channel.send("Sent you a DM containing the help message!")
                return message.author.send(embed5).catch(e => {
                    if (e.message.toLowerCase() === "cannot send messages to this user") return message.channel.send("Your DM's are disabled kindly allow me to send DM's.")
                })
            } else if (args[0] === "6") {
                message.channel.send("Sent you a DM containing the help message!")
                return message.author.send(embed6).catch(e => {
                    if (e.message.toLowerCase() === "cannot send messages to this user") return message.channel.send("Your DM's are disabled kindly allow me to send DM's.")
                })
            } else if (args[0] === "7") {
                message.channel.send("Sent you a DM containing the help message!")
                return message.author.send(embed7).catch(e => {
                    if (e.message.toLowerCase() === "cannot send messages to this user") return message.channel.send("Your DM's are disabled kindly allow me to send DM's.")
                })
            } else if (args[0] === "gamble") {
                message.channel.send("Sent you a DM containing the help message!")
                return message.author.send(embed8).catch(e => {
                    if (e.message.toLowerCase() === "cannot send messages to this user") return message.channel.send("Your DM's are disabled kindly allow me to send DM's.")
                })
            } else if (args[0] === "trade") {
                message.channel.send("Sent you a DM containing the help message!")
                return message.author.send(embed9).catch(e => {
                    if (e.message.toLowerCase() === "cannot send messages to this user") return message.channel.send("Your DM's are disabled kindly allow me to send DM's.")
                })
            } else if (args[0] === "config") {
                message.channel.send("Sent you a DM containing the help message!")
                return message.author.send(embed11).catch(e => {
                    if (e.message.toLowerCase() === "cannot send messages to this user") return message.channel.send("Your DM's are disabled kindly allow me to send DM's.")
                })
            } else if (args[0] === "market") {
                message.channel.send("Sent you a DM containing the help message!")
                return message.author.send(embed10).catch(e => {
                    if (e.message.toLowerCase() === "cannot send messages to this user") return message.channel.send("Your DM's are disabled kindly allow me to send DM's.")
                })
                } else if (args[0] === "auction") {
                message.channel.send("Sent you a DM containing the help message!")
                return message.author.send(auction).catch(e => {
                    if (e.message.toLowerCase() === "cannot send messages to this user") return message.channel.send("Your DM's are disabled kindly allow me to send DM's.")
                })
            }else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)
          .setColor(color);
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField("PREFIX:", `\`${prefix}\``)
        .addField(
          "COMMAND:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "ALIASES:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases for this command."
        )
        .addField(
          "USAGE:",
          command.usage
            ? `\`${prefix}${command.name}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "DESCRIPTION:",
          command.description
            ? `\`${command.description}\``
            : `\`No description for this command.\``
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(color);
      return message.channel.send(embed);

                message.channel.send("Please check your dm")
                return message.author.send(embed3).catch(e => {
                    if (e.message.toLowerCase() === "cannot send messages to this user") return message.channel.send("Please switch your dms.")
                })
            }
        }
    }
}
const axios = require('axios');
const express = require("express");
const app = express();
const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../models/user.js');
const Guild = require('../models/guild.js');
const Spawn = require('../models/spawn.js');
const Auction = require("../models/auctions.js");
const ms = require("ms");
const mongoose = require("mongoose");


module.exports = async client => {
  mongoose.connect(`mongodb://${client.config.mongo_atlas.username}:${client.config.mongo_atlas.password}@${client.config.mongo_atlas.shard.one},${client.config.mongo_atlas.shard.two},${client.config.mongo_atlas.shard.three}/${client.config.mongo_atlas.cluster}?ssl=true&replicaSet=${client.config.mongo_atlas.cluster}-shard-0&authSource=admin&retryWrites=true`, { useNewUrlParser: true, useUnifiedTopology: true }).then(async mon => {
        await console.log(`Connected to the database!`);
    }).catch((err) => {
        console.log("Unable to connect to the Mongodb Database. Error:" + err, "error")
    });
    await console.log(client.table.toString() + "\n" + client.table2.toString());
    console.log(`${client.user.tag} Has Successfully Connected To Discord API!`
        + `\n-----------------------------------------\n`
        + `> Users: ${client.users.cache.size}\n`
        + `> Channels: ${client.channels.cache.size}\n`
        + `> Servers: ${client.guilds.cache.size}`
    );


    let acts = [
        { name: `p!help  @PokeCutie2.0 `, type: `LISTENING`},
        { name: `ProGamerSoujanya`, type: `PLAYING` }
    ],
        act = 0;
    setInterval(() => {
        //client.user.setPresence()
    }, 15000)


let d = await User.find({});
    let i = 0;
    let activities = [`ProGamer`, `p!help | @PokeCutie2.0`]
    setInterval(() =>
        client.user.setActivity(`${activities[Math.floor(i++ % activities.length)]}`, { type: "LISTENING" }), 30000);


 // Website
    var http = require('http');
http
	.createServer(function(req, res) {
		res.write("chai peelo frands");
		res.end();
	})
	.listen(8080);


    let spawns = await Spawn.find({});
    if (!spawns) return;
    spawns.forEach(async r => {
        if (r.time < Date.now()) {
            r.pokemon = [];
            r.time = 0;
            r.hcool = false;
            await r.save()
        }
    })


    //Auction
    let auction = await Auction.find({});
    setInterval(async () => {
        auction = await Auction.find({});
        auction.map(async r => {
            //console.log(Date.now(), r.time);
            if (Date.now() >= r.time) {
                let member = client.users.cache.get(r.id);
                if (!member) return await Auction.findOneAndDelete({ _id: r._id });

                let user = client.users.cache.get(r.user)
                if (!user) {
                    member.send(`Your auction has been failed due to some technical reasons!`);
                    return await Auction.findOneAndDelete({ _id: r._id });
                }
                let mem = await User.findOne({id: r.id})
                let userDB = await User.findOne({ id: user.id });
                if (!userDB) {
                    member.send(`Your auction has been failed due to some technical reasons!`);
                    return await Auction.findOneAndDelete({ _id: r._id });
                }
               
                mem.balance = mem.balance + r.bid
                userDB.pokemons.push(r.pokemon);
                await userDB.markModified("pokemons");
                await userDB.save();
                await mem.save()
                user.send(`You  have won auction of ${r.pokemon.name}`)
                await Auction.findOneAndDelete({ _id: r._id });
                member.send(`Your auction of ${r.pokemon.name} has ended with the final bid of ${r.bid} Coins`);
            }

            /*if (Date.now() < r.time) {
                let x = await Auction.findOne({ _id: r._id });
                //console.log(x.time, Date.now(), x.time - Date.now())
                x.time = r.time - Date.now();
                await x.save();
            } */
        })
    }, 1000)
    //return console.log(auction.map(r => `${r.pokemon.name}: ${r.time}`).join("\n"))
}
const fs = require("fs");
const axios = require("axios")
const trimage = require("../../trimage.js")
module.exports = {
  name: "amoji",
  aliases: ["am"],
  category: "misc",
  execute: async (client, message, args) => {
    if(!args[0]) return message.reply("Args not specified! example args: 1-50")
    let c = 0;
    let lim = args[0].split("-")
    let min = Number(lim[0])
    let max = Number(lim[1])
    if(min > max) {
      let t = min
      min = max
      max = t
    }
    if(min == max) return message.reply("EH? what?")
    for (let i = min; i <= max; i++){
      c += 1
    }
    if(c > 50) return message.reply("emoji count should not exceed 50!")
   for (let id = min; id <= max; id++){
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`, {json: true}).then(async mon => {
        mon = mon.data
     if(mon.name) {
      const Canvas = require("canvas")
       const canvas = await Canvas.createCanvas(300,300);
          const ctx = await canvas.getContext('2d')
        const background = await Canvas.loadImage(mon.sprites.front_shiny)  

ctx.drawImage(background,0,0,canvas.width,canvas.height)
      let mon_id = mon.id
      if(String(mon.id).length == 1) mon_id = "00"+mon.id
    else if(String(mon.id).length == 2) mon_id = "0"+mon.id
     await message.guild.emojis.create(trimage(canvas), mon_id).then(emoji => {
  const newData = fs.readFileSync(__dirname+"/../../db/emojis.json", {flag: "r", encoding: "utf8"}).replace("\"emoji__\": \"__\"", `"${mon.name}_sh": "<:${emoji.name}:${emoji.id}>",\n`+"\"emoji__\": \"__\"")
       fs.writeFileSync(__dirname+"/../../db/emojis.json", newData)
       message.reply("Emoji saved! <:"+emoji.name+":"+emoji.id+">")
     })
     }
      })
   }
   }
  } 

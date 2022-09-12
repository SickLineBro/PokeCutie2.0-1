 module.exports = {
   	logChannel: '1010448777812914179',
	bugchannelid: '1010448777523515442',
	feedbackchannelid: '1010448777364123715',
	tradechannelid: '1010448777812914179',
	suggestionchannelid: '1010448777812914179',
   
  prefix: "p!",
  server: "https://discord.gg/A44r22DGRP",
token: (process.env.token), // this will be your bot token
  yes: "✅",
  no: "❌",

  owners: ["877577336839634965","968916240104050708","763991363384639500","748908938086449202","895141967346929734", "964554739519983626"], // this will be the users with all perms

  special: ["748908938086449202","748908938086449202",], 

  mongo_atlas: {
    username: process.env.username, 
    password: process.env.password,
    cluster: process.env.cluster,
    shard: {
      one: process.env.shard1,
      two: process.env.shard2,
      three: process.env.shard3
    }
  }, 
  webhooks: {
    cmd: {
      ID: '961289345862606848',
      Token: 'zVE9mPNarOjqiVmN35n3XxWAySgkMFO1n4TIs5A2Xly4QwRg8IHxP2Hc6_hiAvLWtNfH'
    },
    guild: {
      ID: '976088170154295327',
      Token: 'zVE9mPNarOjqiVmN35n3XxWAySgkMFO1n4TIs5A2Xly4QwRg8IHxP2Hc6_hiAvLWtNfH'
    },
	vote: {
		ID: '982718196605927534',
		Token: 'npg1ZsoWDce2nwEGrh3EwETVrJDtUf-yFY3zJQOZ97qFVaZAcPoePc7vU9PrPm2b_ccN'
	}
  },
  cooldown: 100,
  
  topgg: {
	  auth: "",
	  token: ""
    }
};


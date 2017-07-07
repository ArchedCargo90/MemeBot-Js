const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');
const prefix = 'mb!';
const sayvar = ''
const YTDL = require("ytdl-core");
version = '0.2 BETA'
modrole = 'Mods'
adminrole = 'Admins'
game = 'Creamy Memes :D'
var cleverON = false;
var RESTRICT_CLEVERBOT_TO_CHANNEL = false
var cleverbot = require("cleverbot.io");
var notifydevchannel = 302432701108191232;
var clever = new cleverbot(config.cleverbotapiuser,config.cleverbotapikey);
var servers = {};
function play(connection, message) {
  var server = servers[message.guild.id];

  server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

  server.queue.shift();
  
  server.dispatcher.on("end", function() {
      if (server.queue[0]) play(connection, message);
      else connection.disconnect();
  });
}
function commandIs(str, msg) {
  return msg.content.startsWith(prefix + str);
}

function pluck(array) {
  return array.map(function(item) { return item["name"]; });
}


function hasRole(mem, role) {
  if(pluck(mem.roles).includes(role)) {
    return true;
  } else {
    return false;
  }
}

bot.on('ready', () => {
  bot.user.setGame(game);
  console.log('Hi');
  
});

bot.on('message', message => {
  var args = message.content.split(/[ ]+/);
  if (message.content === prefix + 'ping') {
      startTime = Date.now();
      message.channel.sendMessage("Summoning the Lords of memes..").then((message) => {
        endTime = Date.now();
          message.edit("The Lords of memes have pinged you... // " + Math.round(endTime - startTime) + " ms");
      });
  }
  /**if (cleverON) {
        clever.ask(message, function (err, response) {
            message.channel.sendMessage({
                message: response
            });
        });
    }**/

    /**if (commandIs("cleverbot", message)) {
      if (args.length === 1) {
        message.channel.sendMessage("```Incorrect Syntax! Command usage: mb!cleverbot <on | off>```")
      } else if ((args.length === 2) && (message = 'on')) {
        cleverON = true;
      } else if ((args.length === 2) && (message = 'on')) {
        cleverON = false;
      } else {
        message.channel.sendMessage("```Incorrect Syntax! Command usage: mb!cleverbot <on | off>```")
      }
    }**/
    //This command is broken. lolno
   /**if (commandIs("notifydev", message)) {
    if(args.length === 1){
        message.channel.sendMessage('Send a message to the Developers (Dont abuse or get blacklisted.) : ``mb!notifydev <message>``')
      } else {
        bot.sendMessage('302432701108191232', message)
        message.channel.sendMessage('Message sent to Developer.')
      }
   }**/

   /**if (message.content.startsWith('mb!play')) {
     vidurl = message.content.replace("mb!play", "");
     if (!args[1]) {
        message.channel.sendMessage("```Please Proide a Youtube Link!```");
        return;
     }
     if (!message.member.voiceChannel) {
       message.channel.sendMessage("You aren't in a voice channel ._.");
       return;
     }
     if (!servers[message.guild.id]) servers[message.guild.id] = {
       queue: []
     }
     var server = servers[message.guild.id];

     if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
        play(connection, vidurl);
     });
   }

   if (commandIs('skip', message)){
     if(args[1]) {
       var server = servers[message.guild.id];

       if (server.dispatcher) server.dispatcher.end();
     }
   }
   if (commandIs('stop', message)) {
     var server = servers[message.guild.id];

     if (message.guild.voiceConnection){
       message.guild.voiceConnection.disconnect();
     }
   }**/


//Setgame Command
   if (message.content.startsWith('mb!setgame')) {
    if((message.author.id === config.ownerID) || (message.author.id === config.coownerID1) || (message.author.id === config.coownerID2) || (message.author.id === config.coownerID3) || (message.author.id === config.coownerID4) || (message.author.id === config.coownerID5)) {
      game = message.content.replace("mb!setgame", "");
      bot.user.setGame(game);
      message.channel.sendMessage('Successfully changed the game to: ' + '``' + game + '``');
    } else {
      message.channel.sendMessage('Nope!, you are not an owner of the bot :/')
    }
  }

  if (message.content === prefix + 'shutdown') {
    if((message.author.id === config.ownerID) || (message.author.id === config.coownerID1) || (message.author.id === config.coownerID2) || (message.author.id === config.coownerID3) || (message.author.id === config.coownerID4) || (message.author.id === config.coownerID5)) {
      message.channel.sendMessage('bye :hand_splayed::skin-tone-3:')
      bot.destroy()
    } else {
      message.reply('No, Bad!')
    }
  }

  if (message.content === prefix + 'help') {
    message.channel.sendMessage('Check your DMs! :envelope_with_arrow:')
    message.author.sendMessage('***My commands are:***\n' +
      '```ping | the Lords of Memes pings you\n' +
      'info | gives you the bot info\n' +
      'inviteme | gives you the invite link for the bot\n'+
      'setgame | changes the bots game (Only for Bot Owners)\n'+
      'say | makes the bot say what you say\n'+
      'ayylmao | came to earth in a silver chrome UFO\n'+
      'cykablyat | cykablyat meme...\n'+
      'help | shows this message\n'+
      'triggered | triggered boi!\n'+
      'randommeme | Posts a random ass meme\n'+
      'mlg | mlg grandma\n'+
      'spam | sends you spam!\n'+
      '8ball | ask 8ball a question!\n```');
  }

  if (message.content === prefix + 'inviteme') {
    message.channel.sendMessage('Sent you the invite link in DMs');
    message.author.sendMessage('Invite me to your server: https://discordapp.com/oauth2/authorize?scope=bot&client_id=272366384502276097');
  }

  if (message.content === prefix + 'info') {
    message.channel.sendMessage('``Dank af discord bot made by LightWarp#5690``\n ```Version: '+version+'```');
  }


  if (message.content.startsWith('mb!say')) {
    //if(hasRole(message.member, modrole) || hasRole(message.member, adminrole)) {
      var msg = message.content.replace("mb!say", "");
      message.delete();
      message.channel.sendMessage(msg);
    //} else {
      //message.channel.sendMessage('You dont have the ``Mods`` Role')
    //}
  }
  if (message.content === prefix + 'randommeme') {
      var answers = [
        //STOLEN MEMES :>
      'http://i.imgur.com/esZlkxd.jpg', 
      'http://i.imgur.com/hPW0SKr.jpg', 
      'http://i.imgur.com/Pqprl6S.jpg', 
      'http://i.imgur.com/2UsbZdM.jpg',
      'http://i.imgur.com/Ub93dy4.jpg', 
      'http://i.imgur.com/1WssNcV.jpg', 
      'http://i.imgur.com/yGr52CL.jpg', 
      'http://i.imgur.com/mTD0vZh.jpg',
      'http://i.imgur.com/BtBCqMg.jpg', 
      'http://i.imgur.com/cYLudbe.jpg', 
      'http://i.imgur.com/xdZa4Nj.jpg', 
      'http://i.imgur.com/Kb04V4W.jpg', 
      'http://i.imgur.com/5OSaf9u.png',
      'http://i.imgur.com/zqqu4Vi.jpg', 
      'http://i.imgur.com/uIJjMXA.jpg', 
      'http://i.imgur.com/HCfN7P8.jpg', 
      'http://i.imgur.com/cE21Jdc.jpg',
      'http://i.imgur.com/IiA4fRm.jpg', 
      'http://i.imgur.com/iKxAaq0.jpg', 
      'http://i.imgur.com/XEicSEg.jpg',
      'http://i.imgur.com/36yEXvC.jpg', 
      'http://i.imgur.com/vls4AR7.jpg', 
      'http://i.imgur.com/hu7jZr6.png',
      'http://i.imgur.com/gCJrl7e.jpg', 
      'http://i.imgur.com/K9Oetiw.png',
      'http://i.imgur.com/i6UWgIg.jpg',
      'http://i.imgur.com/vWjSwqf.jpg',
      'http://i.imgur.com/YTCAK51.jpg',
      'http://i.imgur.com/UMLm1mL.jpg',
      'http://i.imgur.com/68Zr7rs.jpg',
      'http://i.imgur.com/qnqITS3.jpg',
      'http://i.imgur.com/vOK9gcj.jpg',
      'http://i.imgur.com/qqS1oWu.jpg',
      'http://i.imgur.com/d3Wbs3l.jpg',
      'http://i.imgur.com/L5yUVYw.jpg',
      'http://i.imgur.com/GKnXFsQ.jpg',
      'http://i.imgur.com/Wf733vC.png',
      'http://i.imgur.com/tKQuOEe.jpg',
      'http://i.imgur.com/nf5ncDG.png',
      'http://i.imgur.com/oJVK22f.jpg',
      'http://i.imgur.com/3TQsgvH.jpg',
      'http://i.imgur.com/TuMP4qQ.png',
      'http://i.imgur.com/gPCXHzH.jpg',
      'http://i.imgur.com/5UoZyvQ.png',
      'http://i.imgur.com/SzyiCeS.jpg',
      'http://i.imgur.com/rJ8AnPx.jpg',
      'http://i.imgur.com/9PhB6tR.jpg',
      'http://i.imgur.com/dWwpKhz.jpg',
      'http://i.imgur.com/1DxoHS1.jpg',
      'http://i.imgur.com/T5hphPD.jpg',
      'http://i.imgur.com/D1hMVa3.jpg',
      'http://i.imgur.com/YlBWOUx.jpg',
      'http://i.imgur.com/Hs0bNbm.jpg',
      'http://i.imgur.com/o14goLr.jpg',
      'http://i.imgur.com/TFIA8ds.jpg',
      'http://i.imgur.com/cIiqY8w.jpg',
      'http://i.imgur.com/5dNlLf6.jpg',
      'http://i.imgur.com/ZABeZC8.jpg',
      'http://i.imgur.com/BDvkS64.jpg'
      ];
      var answer = answers[Math.floor(Math.random() * answers.length)];
    message.channel.sendMessage(answer);
  }
  
  if (message.content.startsWith('mb!8ball')) {
    if ( message.content.endsWith('?')) {
      var answers = [
      'Maybe.', 'Lol no.', 'I really hope so.', 'Not in your wildest dreams.',
      'There is a good chance.', 'Quite likely.', 'I think so.', 'I hope not.',
      'I hope so.', 'Wtf no!', 'Fuhgeddaboudit.', 'Ahaha! Really?!?', 'Pfft.',
      'Sorry, bby.', 'fuck, yes.', 'Hell to the no.', 'ehhhhhh, i dont know.',
      'The future is uncertain.', 'I would rather not say.', 'Who cares?',
      'Possibly.', 'Never, ever, ever.', 'There is a small chance.', 'Yes!'];
      var answer = answers[Math.floor(Math.random() * answers.length)];
    } else {
      message.channel.sendMessage('Is that a question?')
    }
  message.channel.sendMessage(answer);
  } 

  if (message.content === prefix + 'cykablyat') {
    message.channel.sendFile('img/cykablyat.png');
  }

  if (message.content === prefix + 'triggered') {
    message.channel.sendFile('img/triggered.png');
  }
  
  if (message.content === prefix + 'ayylmao') {
    message.channel.sendFile('img/ayylmao.gif');
  }

  if (message.content === prefix + 'spam') {
    message.channel.sendFile('img/spam.png');
  }
    if (message.content.startsWith('mb!warn')) {
  if((message.author.id === config.ownerID) || (message.author.id === config.owner2ID) || (message.author.id === config.owner3ID)) {
   var msg = message.content.replace("mb!warn", "");
   let discrim = message.mentions.users.first();
   message.delete();
   discrim.sendMessage(discrim.username + " you have been warned in General Gaming, reason: " + msg);
   message.channel.sendMessage("User has been **successfuly** warned!");
   console.log(message.author.username + " tried to execute in General Gaming gg!warn and it successfuly warned the user: " + discrim.username + " with the reason: " + msg);
       } else {
      message.reply('You arent the owner of the bot to do that!');
      console.log(message.author.username + " tried to execute in General Gaming gg!warn but it failed.")
    }
  }
});
bot.login(config.token);

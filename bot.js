const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');
const prefix = 'mb!';
const sayvar = ''
modrole = 'Mods'
adminrole = 'Admins'
game = 'Creamy Memes :D'
var notifydevchannel = 302432701108191232;

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

   if (commandIs("notifydev", message)) {
    if(args.length === 1){
        message.channel.sendMessage('Send a message to the Developers (Dont abuse or get blacklisted.) : ``mb!notifydev <message>``')
      } else {
        bot.sendMessage('302432701108191232', message)
        message.channel.sendMessage('Message sent to Developer.')
      }
  }

//Setgame Command
  if (message.content.startsWith('mb!setgame')) {
    if((message.author.id === config.ownerID) || (message.author.id === config.coownerID1)) {
      game = message.content.replace("mb!setgame", "");
      bot.user.setGame(game);
      message.channel.sendMessage('Successfully changed the game to: ' + '``' + game + '``');
    } else {
      message.channel.sendMessage('Hell no, you are not the owner of the bot :/')
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
      'mlg | mlg grandma\n'+
      'spam | sends you spam!\n'+
      '8ball | ask 8ball a question!\n```');
  }

  if (message.content === prefix + 'inviteme') {
    message.channel.sendMessage('Sent you the invite link in DMs');
    message.author.sendMessage('Invite me to your server: https://discordapp.com/oauth2/authorize?scope=bot&client_id=272366384502276097');
  }

  if (message.content === prefix + 'info') {
    message.channel.sendMessage('``Dank af discord bot made by LightWarp#5690``\n ```Version: 0.1 BETA```');
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

});
bot.login(config.token);
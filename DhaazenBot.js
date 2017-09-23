const Eris = require('eris')
const config = require('./config.json')
const { exec } = require('child_process')

// Replace BOT_TOKEN with your bot account's token
var bot = new Eris.CommandClient(config.token, {}, {
  description: 'Experimental bot not working very well',
  owner: 'KhaaZ#2030',
  prefix: ['k', '@mention ']
})

// Startup stuff
bot.on('ready', () => { // When the bot is ready
  console.log('Ready!') // Log "Ready!"
})

bot.on('ready', () => { // When the bot is ready
  bot.editStatus(null, { name: 'bullied by Khaaz', type: 0 })
})

// CORE STUFF
var version = 'V 1.x Dev; private release for Khaaz'
var codeblock = '\u0060\u0060\u0060'
var informations = ['0892#.K akiM yb tobmE htiw detaerc', 'etivni/ten.tobonyd//:sptth :tob eno-ni-lla tseb eht - yadot tobonyD yrT', '!snoitcnuf erom rof toB ytrilF teG', ".htlaeh ruoy rof ,kaerb a ekaT !CP ruoy no emit hcum oot dneps t'noD :ofnI", ')lol( DNUOF TON OFNI 404 :ofnI', '?thgir ,ydaerla taht wenk uoy tuB .tob tseb tobmE :ofnI', 'tobme/akimsulpsbn/etis/moc.elgoog.setis//:sptth :tuo siht kcehC ?tobmE ekiL', "!htlaeh ruoy rof doog ton si gnikomS .trats t'nod - trams eB :ofnI", "!erawlam llatsni dluoc yeht ,drocsiD no sknil modnar kcilc t'noD", '!ipa-drocsid/gg.drocsid ot oG ?stoB htiw pleh deeN', 'ecnaraeppA rednu sgnitteS drocsiD ruoy ni edom repoleveD elbanE :ofnI', ')edom repoleveD htiw( DI ypoc tceles dna eman lennahc eht kcilc-thgir ,drocsiD ni lennahc a fo DI eht teg oT :ofnI', ')edom repoleveD htiw( DI ypoc tceles dna eman lennahc eht kcilc-thgir ,drocsiD ni lennahc a fo DI eht teg oT :ofnI', ')edom repoleveD htiw( DI ypoc tceles dna eman lennahc eht kcilc-thgir ,drocsiD ni lennahc a fo DI eht teg oT :ofnI', '!ecivreS fo smreT drocsiD eht yb detibihorp si tnuocca resu a no tob a gninnuR :ofnI', '!drocsiD sgniht lla htiw pleh dnif uoy buh/gg.drocsid tA ?tsol gnileeF :ofnI', 'Baum']// 14 infos//
// CORE STUFF END

// base commands
bot.registerCommandAlias('halp', 'help') // Alias !halp to !help

bot.registerCommand('ping', 'Pong!', { // Make a ping command
// Responds with "Pong!" when someone says "!ping"
  description: 'Pings the bot. But kinda pointless since this already confirms Embot is up.',
  fullDescription: "This command could be used to check if the bot is up. Or entertainment when you're bored."
})

bot.registerCommand('restart', (msg, args) => {
  if (msg.author.id === '179908288337412096') { // USER ID HERE!
    exec('pm2 restart DhaazenBot', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        return
      }
      console.log(`stdout: ${stdout}`)
      console.log(`stderr: ${stderr}`)
    })
  }
  if (msg.author.id !== '179908288337412096') { // USER ID HERE!
    bot.createMessage(msg.channel.id, ':no_entry_sign: Sorry, eval is not available for you.')
  }
}), {
  description: 'Restart the bot',
  fullDescription: 'Restart the bot'
}

var infoCommand = bot.registerCommand('info', (msg, args) => { // Info command 2.0
  bot.createMessage(msg.channel.id, {
    embed: {
      author: {
        name: 'Embot',
        icon_url: 'https://cdn.discordapp.com/avatars/347683207929397248/1b8c9cdf468336b46c9099fc9ed652df.jpg?size=128'
      },
      thumbnail: {
        url: 'https://cdn.discordapp.com/avatars/347683207929397248/1b8c9cdf468336b46c9099fc9ed652df.jpg?size=128'
      },
      fields: [
        {
          name: 'Hi, I am Embot... ',
          value: 'Embot is a simple discord bot that allows you to create embeds\n\nEmbot uses source code from Flirty Bot, made by Mika K.#2980. You can get Embot here: https://sites.google.com/site/nbsplusmika/embot\n\nNeed Help or just wanna talk about code? Join us here: https://discord.gg/7AR5P8H',
          inline: true
        }
      ]
    }
  })
}, {
  description: 'Info about the bot',
  fullDescription: 'Info about the bot',
  usage: ' '
})

var supportCommand = bot.registerCommand('support', (msg, args) => { // Info command 2.0
  bot.createMessage(msg.channel.id, {
    embed: {
      author: {
        name: 'Embot',
        icon_url: 'https://cdn.discordapp.com/avatars/347683207929397248/1b8c9cdf468336b46c9099fc9ed652df.jpg?size=128'
      },
      thumbnail: {
        url: 'https://cdn.discordapp.com/avatars/347683207929397248/1b8c9cdf468336b46c9099fc9ed652df.jpg?size=128'
      },
      fields: [
        {
          name: 'Need help... ',
          value: '...or just wanna talk about code? Join us here: https://discord.gg/7AR5P8H',
          inline: true
        }
      ]
    }
  })
}, {
  description: 'Need Help?',
  fullDescription: 'Need Help?',
  usage: ' '
})

var supportCommand = bot.registerCommand('version', (msg, args) => { // Info command 2.0
  bot.createMessage(msg.channel.id, `This Embot is running Embot version ${version}`)
}, {
  description: 'View the version of Embot',
  fullDescription: 'View the version of Embot',
  usage: ' '
})

bot.registerCommand('eval', (msg, args) => {
  if (msg.author.id === '179908288337412096') { // USER ID HERE!
    var code = args.join(' ')
    var evaled = eval(code)
    var rando = Math.floor((Math.random() * 14) + 1)
    var newrando = rando - 1
    var info = informations[newrando]
    var newinfo = info.split('').reverse().join('')
    var foot = newinfo
    bot.createMessage(msg.channel.id, {
      embed: {
        color: 3447003,
        title: 'EVAL',
        description: `Your eval resulted in this:\n${codeblock}fix\n${evaled}\n${codeblock}`,
        author: {
          name: msg.author.username,
          icon_url: msg.author.avatarURL
        },
        footer: {
          icon_url: bot.user.avatarURL,
          text: foot
        }
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  if (msg.author.id !== '179908288337412096') { // USER ID HERE!
    bot.createMessage(msg.channel.id, ':no_entry_sign: Sorry, eval is not available for you.')
  }
})

var embedCommand = bot.registerCommand('embed', (msg, args) => {
  msg.delete()
  var args = msg.content.split(' ').slice(1).join(' ').split(' | ')
  var title = args[0]
  var desc = args[1]
    // var colour = args[2];//experimental: set colour in the command
  var colour = '3447003'// disable this when using the above
  var rando = Math.floor((Math.random() * 14) + 1)
  var newrando = rando - 1
  var info = informations[newrando]
  var newinfo = info.split('').reverse().join('')
  var foot = newinfo
  bot.createMessage(msg.channel.id, {
    embed: {
      color: colour,
      title: title,
      description: desc,
      author: {
        name: msg.author.username,
        icon_url: msg.author.avatarURL
      },
      footer: {
        icon_url: bot.user.avatarURL,
        text: foot
      }
    }
  }).catch((err) => {
    console.log(err)
  })
}, {
  description: 'Create an Embed.',
  fullDescription: 'Create an Embed.',
  usage: '<title> | <content>'
})

embedCommand.registerSubcommand('warning', (msg, args) => {
  msg.delete()
  var args = msg.content.split(' ').slice(2).join(' ').split(' | ')
  var title = args[0]
  var desc = args[1]
  var rando = Math.floor((Math.random() * 14) + 1)
  var colour = '16776960'
  var newrando = rando - 1
  var info = informations[newrando]
  var newinfo = info.split('').reverse().join('')
  var foot = newinfo
  bot.createMessage(msg.channel.id, {
    embed: {
      color: colour,
      title: title,
      description: desc,
      author: {
        name: msg.author.username,
        icon_url: msg.author.avatarURL
      },
      thumbnail: {
        url: `http://www.clker.com/cliparts/5/6/f/3/11971252291061148562zeimusu_Warning_notification.svg.hi.png`
      },
      footer: {
        icon_url: bot.user.avatarURL,
        text: foot
      }
    }
  })
}, {
  description: 'Warning embed',
  fullDescription: 'Warning embed',
  usage: ' '
})

embedCommand.registerSubcommand('update', (msg, args) => {
  msg.delete()
  var args = msg.content.split(' ').slice(2).join(' ').split(' | ')
  var title = args[0]
  var desc = args[1]
  var rando = Math.floor((Math.random() * 14) + 1)
  var colour = '65280'
  var newrando = rando - 1
  var info = informations[newrando]
  var newinfo = info.split('').reverse().join('')
  var foot = newinfo
  bot.createMessage(msg.channel.id, {
    embed: {
      color: colour,
      title: title,
      description: desc,
      author: {
        name: msg.author.username,
        icon_url: msg.author.avatarURL
      },
      thumbnail: {
        url: `https://imicrothinking.files.wordpress.com/2009/10/refreshicontrans.png`
      },
      footer: {
        icon_url: bot.user.avatarURL,
        text: foot
      }
    }
  })
}, {
  description: 'Update embed',
  fullDescription: 'Update embed',
  usage: ' '
})

embedCommand.registerSubcommand('lock', (msg, args) => {
  msg.delete()
  var args = msg.content.split(' ').slice(2).join(' ').split(' | ')
  var title = args[0]
  var desc = args[1]
  var rando = Math.floor((Math.random() * 14) + 1)
  var colour = '16776960'
  var newrando = rando - 1
  var info = informations[newrando]
  var newinfo = info.split('').reverse().join('')
  var foot = newinfo
  bot.createMessage(msg.channel.id, {
    embed: {
      color: colour,
      title: title,
      description: desc,
      author: {
        name: msg.author.username,
        icon_url: msg.author.avatarURL
      },
      thumbnail: {
        url: `https://vignette3.wikia.nocookie.net/thelastofus/images/9/96/Lock.png/revision/latest?cb=20150811200030`
      },
      footer: {
        icon_url: bot.user.avatarURL,
        text: foot
      }
    }
  })
}, {
  description: 'Lock embed',
  fullDescription: 'Lock embed',
  usage: ' '
})

embedCommand.registerSubcommand('ping', (msg, args) => {
  msg.delete()
  var args = msg.content.split(' ').slice(2).join(' ').split(' | ')
  var title = args[0]
  var desc = args[1]
  var rando = Math.floor((Math.random() * 14) + 1)
  var colour = '16776960'
  var newrando = rando - 1
  var info = informations[newrando]
  var newinfo = info.split('').reverse().join('')
  var foot = newinfo
  bot.createMessage(msg.channel.id, {
    embed: {
      color: colour,
      title: title,
      description: desc,
      author: {
        name: msg.author.username,
        icon_url: msg.author.avatarURL
      },
      thumbnail: {
        url: `https://cdn.discordapp.com/attachments/271648451647766528/351842874398212098/339555345095589889.png`
      },
      footer: {
        icon_url: bot.user.avatarURL,
        text: foot
      }
    }
  })
}, {
  description: 'Ping embed',
  fullDescription: 'Ping embed',
  usage: ' '
})

embedCommand.registerSubcommand('idea', (msg, args) => {
  msg.delete()
  var args = msg.content.split(' ').slice(2).join(' ').split(' | ')
  var title = args[0]
  var desc = args[1]
  var rando = Math.floor((Math.random() * 14) + 1)
  var colour = '65280'
  var newrando = rando - 1
  var info = informations[newrando]
  var newinfo = info.split('').reverse().join('')
  var foot = newinfo
  bot.createMessage(msg.channel.id, {
    embed: {
      color: colour,
      title: title,
      description: desc,
      author: {
        name: msg.author.username,
        icon_url: msg.author.avatarURL
      },
      thumbnail: {
        url: `https://sites.google.com/site/nbsplusmika/_/rsrc/1495708818997/gmotes/miidea.png`
      },
      footer: {
        icon_url: bot.user.avatarURL,
        text: foot
      }
    }
  })
}, {
  description: 'Idea embed',
  fullDescription: 'Idea embed',
  usage: ' '
})

var sayCommand = bot.registerCommand('say', (msg, args) => { // Make an echo command
  if (args.length === 0) { // If the user just typed "!echo", say "Invalid input"
    return 'Invalid input'
  }
  msg.delete()
  var text = args.join(' ') // Make a string of the text after the command label
  return text // Return the generated string
}, {
  description: 'Make the bot say something',
  fullDescription: 'The bot will say whatever is after the command label.',
  usage: '<text>'
})

sayCommand.registerSubcommand('reverse', (msg, args) => { // Make a reverse subcommand under echo
  if (args.length === 0) { // If the user just typed "!echo reverse", say "Invalid input"
    return 'Invalid input'
  }
  msg.delete()
  var text = args.join(' ') // Make a string of the text after the command label
  text = text.split('').reverse().join('') // Reverse the string
  return text // Return the generated string
}, {
  description: 'Make the bot say something in reverse',
  fullDescription: 'The bot will say, in reverse, whatever is after the command label.',
  usage: '<text>'
})

var announceComand = bot.registerCommand('announce', (msg, args) => { // Make an echo command
  if (args.length === 0) { // If the user just typed "!echo", say "Invalid input"
    return 'Invalid input'
  }
  var text = args.join(' ') // Make a string of the text after the command label
  return bot.createMessage(msg.channel.id, {
    embed: {
      author: {
        name: 'Dhaazenbot'
      },
      fields: [
        {
          name: 'Announcement',
          value: text,
          inline: true
        }
      ]
    }
  })
}, {
  description: 'Make the bot announce something with embed',
  fullDescription: 'The bot will announce with embed whatever is after the command label.',
  usage: '<text>'
})

bot.connect()
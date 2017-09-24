const Eris = require('eris')
const config = require('./config.json')
const { exec } = require('child_process')

// CommandClient
var bot = new Eris.CommandClient(config.token, {}, {
  description: 'Experimental bot not working very well',
  owner: 'KhaaZ#2030',
  prefix: ['k', '@mention '],
  defaultHelpCommand: false,
  autoReconnect: true,
  ignoreBots: true,
  ignoreSelf: true
})

// Startup stuff
bot.on('ready', () => { // When the bot is ready
  console.log('Ready!') // Log "Ready!"
})

bot.on('ready', () => { // When the bot is ready
  bot.editStatus(null, { name: 'bullied by Khaaz', type: 0 })
})
//
//

// CORE STUFF
//
var version = 'V 1.x Dev; private release for Khaaz'
var codeblock = '\u0060\u0060\u0060'
var informations = ['0892#.K akiM yb tobmE htiw detaerc', 'etivni/ten.tobonyd//:sptth :tob eno-ni-lla tseb eht - yadot tobonyD yrT', '!snoitcnuf erom rof toB ytrilF teG', ".htlaeh ruoy rof ,kaerb a ekaT !CP ruoy no emit hcum oot dneps t'noD :ofnI", ')lol( DNUOF TON OFNI 404 :ofnI', '?thgir ,ydaerla taht wenk uoy tuB .tob tseb tobmE :ofnI', 'tobme/akimsulpsbn/etis/moc.elgoog.setis//:sptth :tuo siht kcehC ?tobmE ekiL', "!htlaeh ruoy rof doog ton si gnikomS .trats t'nod - trams eB :ofnI", "!erawlam llatsni dluoc yeht ,drocsiD no sknil modnar kcilc t'noD", '!ipa-drocsid/gg.drocsid ot oG ?stoB htiw pleh deeN', 'ecnaraeppA rednu sgnitteS drocsiD ruoy ni edom repoleveD elbanE :ofnI', ')edom repoleveD htiw( DI ypoc tceles dna eman lennahc eht kcilc-thgir ,drocsiD ni lennahc a fo DI eht teg oT :ofnI', ')edom repoleveD htiw( DI ypoc tceles dna eman lennahc eht kcilc-thgir ,drocsiD ni lennahc a fo DI eht teg oT :ofnI', ')edom repoleveD htiw( DI ypoc tceles dna eman lennahc eht kcilc-thgir ,drocsiD ni lennahc a fo DI eht teg oT :ofnI', '!ecivreS fo smreT drocsiD eht yb detibihorp si tnuocca resu a no tob a gninnuR :ofnI', '!drocsiD sgniht lla htiw pleh dnif uoy buh/gg.drocsid tA ?tsol gnileeF :ofnI', 'Baum']// 14 infos//
//
// CORE STUFF END

// HELP COMMAND
//
var dprefix = 'k'

bot.registerCommand('help', (msg, args) => {
  var result = ''
  if (args.length > 0) {
    var cur = bot.commands[bot.commandAliases[args[0]] || args[0]]
    if (!cur) {
      return ':no_entry_sign: Command not found'
    }
    var label = cur.label
    for (var i = 1; i < args.length; ++i) {
      cur = cur.subcommands[cur.subcommandAliases[args[i]] || args[i]]
      if (!cur) {
        return ':no_entry_sign: Command not found'
      }
      label += ' ' + cur.label
    }
    result += `**Command:** [${dprefix}${label}]() \n**Usage:** ${cur.usage}\n**Description:** ${cur.fullDescription}`
    if (Object.keys(cur.aliases).length > 0) {
      result += `\n\n**Aliases:** ${cur.aliases.join(', ')}`
    }
    if (Object.keys(cur.subcommands).length > 0) {
      result += '\n\n**Subcommands:**'
      for (var subLabel in cur.subcommands) {
        if (cur.subcommands[subLabel].permissionCheck(msg)) {
          result += `\n  **${subLabel}** - ${cur.subcommands[subLabel].description}`
        }
      }
    }
  } else {
    result += `${bot.commandOptions.name} - ${bot.commandOptions.description}\n`
    if (bot.commandOptions.owner) {
      result += `by ${bot.commandOptions.owner}\n`
    }
    result += '\n'
    result += '**Commands:**\n'
    for (label in bot.commands) {
      if (bot.commands[label] && bot.commands[label].permissionCheck(msg)) {
        result += `  [${dprefix}${label}]() - ${bot.commands[label].description}\n`
      }
    }
    var footer = `\nType ${dprefix}help <command> for more info on a command.`
  }
  var rando = (function co (lor) {
    return (lor +=
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9][Math.floor(Math.random() * 10)]) &&
                (lor.length == 7) ? lor : co(lor)
  })('')
  bot.createMessage(msg.channel.id, {
    'embed': {
      'color': 3066993,
      'description': result,
      'author': {
        'name': 'Commands',
        'icon_url': bot.user.dynamicAvatarURL('png')
      },
      'footer': {
        'text': footer
      }
    }
  }).catch((err) => {
    console.log(err)
  })
}, {
  description: 'This help text',
  fullDescription: 'This command is used to view information of different bot commands, including this one.',
  usage: `\n${dprefix}help\n${dprefix}help <command>`
})

bot.registerCommandAlias('halp', 'help') // Alias !halp to !help
//
// HELP COMMAND END

// PRIVATE COMMANDS
//
// Restart | Eval
//
// Restart command
bot.registerCommand('restart', (msg, args) => {
  if (msg.author.id === '179908288337412096') { // USER ID HERE!
    msg.delete()
    bot.createMessage(msg.channel.id, {
      embed: {
        color: 3066993,
        description: 'Restarting...'
      }
    })
      .then(msg => {
        setTimeout(function () {
          msg.delete()
        }, 5000)
      })
    setTimeout(function () {
      exec('pm2 restart DhaazenBot', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`)
          return
        }
        console.log(`stdout: ${stdout}`)
        console.log(`stderr: ${stderr}`)
      })
      bot.createMessage(msg.channel.id, {
        embed: {
          color: 3066993,
          description: 'Restarted!'
        }
      })
    }, 6000)
  }
  if (msg.author.id !== '179908288337412096') { // USER ID HERE!
    bot.createMessage(msg.channel.id, ':no_entry_sign: Sorry, restart is not available for you.')
  }
}, {
  description: 'Restart the bot',
  fullDescription: 'Restart the bot',
  usage: `${dprefix}restart`,
  requirements: {
    'userIDs': '179908288337412096'
  },
  permissionMessage: ':no_entry_sign: You dont have permission to do that.'
})
// Eval command
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
        color: 10038562,
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
}, {
  description: 'Eval command',
  fullDescription: 'Eval command',
  usage: `${dprefix}eval`,
  requirements: {
    'userIDs': '179908288337412096'
  },
  permissionMessage: ':no_entry_sign: You dont have permission to do that.'
})
//
// PRIVATE COMMANDS END

// BASE COMMANDS
//
// Ping | Uptime | Membercount | info | say:reverse | announce
//
// Ping command
bot.registerCommand('ping', (msg) => {
  let start = Date.now()
  bot.createMessage(msg.channel.id, {
    embed: {
      color: 3066993,
      description: 'Pong!'
    }
  })
    .then(msg => {
      let diff = (Date.now() - start)
      return msg.edit({
        embed: {
          color: 3066993,
          description: `Pong! \`${diff}ms\``
        }
      })
    })
}, {
  description: 'Pings the bot.',
  fullDescription: "This command could be used to check if the bot is up. Or entertainment when you're bored.",
  cooldown: 2000,
  cooldownMessage: `:no_entry_sign: A little too fast there..`,
  cooldownReturns: 1
})
// Uptime command
bot.registerCommand('uptime', (msg, args) => {
  var uptime = bot.uptime
  var startime = bot.startTime
  var date = new Date(uptime)
  var str = ''
  str += date.getUTCDate() - 1 + 'd, '
  str += date.getUTCHours() + 'h, '
  str += date.getUTCMinutes() + 'min, '
  str += date.getUTCSeconds() + 'sec, '
  str += date.getUTCMilliseconds() + 'ms'
  bot.createMessage(msg.channel.id, {
    embed: {
      color: 1752220,
      fields: [
        {
          name: 'Uptime',
          value: `${str}`,
          inline: false
        }
      ],
      timestamp: new Date(startime),
      footer: {
        text: 'Started at'
      }
    }
  })
}, {
  description: 'Uptime',
  fullDescription: 'Give bot uptime',
  usage: `${dprefix}uptime`,
  cooldown: 2000,
  cooldownMessage: `:no_entry_sign: A little too fast there..`,
  cooldownReturns: 1
})
// Membercount command
bot.registerCommand('members', (msg, args) => {
  bot.createMessage(msg.channel.id, {
    embed: {
      color: 1752220,
      fields: [
        {
          name: 'Members',
          value: `${msg.channel.guild.memberCount}`,
          inline: false
        }
      ]
    }
  })
}, {
  description: 'Membercount',
  fullDescription: 'Give approximate number of members in the server',
  usage: `${dprefix}members`,
  cooldown: 2000,
  cooldownMessage: `:no_entry_sign: A little too fast there..`,
  cooldownReturns: 1
})
// Info command
bot.registerCommand('info', (msg, args) => {
  var uptime = bot.uptime
  var startime = bot.startTime
  var date = new Date(uptime)
  var str = ''
  str += date.getUTCDate() - 1 + 'd, '
  str += date.getUTCHours() + 'h, '
  str += date.getUTCMinutes() + 'min, '
  str += date.getUTCSeconds() + 'sec, '
  bot.createMessage(msg.channel.id, {
    embed: {
      color: 1752220,
      author: {
        name: 'Dhaazen',
        icon_url: bot.user.avatarURL
      },
      thumbnail: {
        url: bot.user.avatarURL
      },
      fields: [
        {
          name: 'Creator',
          value: 'KhaaZ#2030',
          inline: false
        },
        {
          name: 'Description',
          value: '**Owner:**`KhaaZ#2030`\nExperimental bot using *javascript* and *eris* lib\nBased on the awesome Embot source code by `Mika K.#2980`\nBoosted by the dyno team :sunglasses:',
          inline: true
        },
        {
          name: 'Contributors',
          value: '`Mika K.#2980`\n`Ape#7739`\n`AS04™#2793`\n`Zapp#0790`',
          inline: false
        },
        {
          name: 'Language',
          value: 'javascript',
          inline: true
        },
        {
          name: 'Library',
          value: 'eris',
          inline: true
        },
        {
          name: 'Guilds',
          value: `${bot.guilds.size}`,
          inline: true
        },
        {
          name: 'Unavailable',
          value: `${bot.unavailableGuilds.size}`,
          inline: true
        },
        {
          name: 'Users',
          value: `${bot.users.size}`,
          inline: true
        },
        {
          name: 'Uptime',
          value: `${str}`,
          inline: true
        }
      ],
      timestamp: new Date(startime),
      footer: {
        text: 'Started at'
      }
    }
  })
}, {
  description: 'Info about the bot',
  fullDescription: 'Info about the bot',
  usage: `${dprefix}info`,
  cooldown: 2000,
  cooldownMessage: `:no_entry_sign: A little too fast there..`,
  cooldownReturns: 1
})
// Say command
var sayCommand = bot.registerCommand('say', (msg, args) => {
  if (args.length === 0) {
    bot.createMessage(msg.channel.id, {
      embed: {
        color: 3066993,
        description: `**Command:** [${dprefix}say]() \n**Usage:** ${dprefix}say <test>\n**Description:** The bot will say whatever is after the command label.`,
        author: {
          name: 'Commands',
          icon_url: bot.user.dynamicAvatarURL('png')
        }
      }
    })
  }
  msg.delete()
  var text = args.join(' ')
  return text
}, {
  description: 'Make the bot say something',
  fullDescription: 'The bot will say whatever is after the command label.',
  usage: `${dprefix}say <text>`,
  cooldown: 2000,
  cooldownMessage: `:no_entry_sign: A little too fast there..`,
  cooldownReturns: 1
})
// Say:reverse command
sayCommand.registerSubcommand('reverse', (msg, args) => {
  if (args.length === 0) {
    return 'Invalid input'
  }
  msg.delete()
  var text = args.join(' ')
  text = text.split('').reverse().join('') // Reverse the string
  return text
}, {
  description: 'Make the bot say something in reverse',
  fullDescription: 'The bot will say, in reverse, whatever is after the command label.',
  usage: `${dprefix}say <text>`,
  cooldown: 2000,
  cooldownMessage: `:no_entry_sign: A little too fast there..`,
  cooldownReturns: 1
})
// Announce command
var announceCommand = bot.registerCommand('announce', (msg, args) => {
  if (args.length === 0) {
    bot.createMessage(msg.channel.id, {
      embed: {
        color: 3066993,
        description: `**Command:** [${dprefix}announce]() \n**Usage:** ${dprefix}announce <test>\n**Description:** The bot will announce with embed whatever is after the command label.`,
        author: {
          name: 'Commands',
          icon_url: bot.user.dynamicAvatarURL('png')
        }
      }
    })
  }
  var text = args.join(' ')
  return bot.createMessage(msg.channel.id, {
    embed: {
      color: 1752220,
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
  usage: `${dprefix}announce <text>`,
  cooldown: 2000,
  cooldownMessage: `:no_entry_sign: A little too fast there..`,
  cooldownReturns: 1
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

bot.connect()

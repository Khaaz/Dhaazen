const Eris = require('eris')
const config = require('./config.json')
const { exec } = require('child_process')
const { inspect } = require('util')
const request = require('request').defaults({ encoding: null })

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
  bot.editStatus(null, { name: 'bullied by Khaaz | khelp', type: 0 })
})

bot.on('ready', () => {
  bot.createMessage('361524475621277696', { // uptime channel
    embed: {
      timestamp: new Date(),
      color: 2067276, // Dark green
      description: '**Online!**'
    }
  })
})

process.on('uncaughtException', (err) => {
  console.log(`An error occured: ${err}`)
})

bot.on('error', (err, msg) => {
  bot.createMessage('361605085572104203', { // error channel
    embed: {
      timestamp: new Date(),
      color: 10038562, // Dark red
      description: `An Error occured.\n${err}`
    }
  })
  console.log(`${err}`)
})

bot.on('warn', (msg) => {
  bot.createMessage('361605085572104203', { // error channel
    embed: {
      timestamp: new Date(),
      color: 11027200, // Dark orange
      description: `${msg}`
    }
  })
  console.log(`${msg}`)
})
//
//

// CORE STUFF - Global var
//
var version = 'Embot V 1.x Dev; private release for Khaaz | Dhaazen: Alpha 0.5 Dev'
var dprefix = `k`
//
// CORE STUFF END

// HELP COMMAND
//
bot.registerCommand('help', (msg, args) => {
  var result = ''
  if (args.length > 0) { // check arg
    var cmd = bot.commands[bot.commandAliases[args[0]] || args[0]] // cmd = commande
    if (!cmd) { // check !cmd
      return ':no_entry_sign: Command not found'
    } else { // check cmd
      var label = cmd.label // label = cmd
      for (var i = 1; i < args.length; ++i) {
        cmd = cmd.subcommands[cmd.subcommandAliases[args[i]] || args[i]] // cmd = subcmd
        label += ' ' + cmd.label // label =cmd subcmd
        if (!cmd) { // check !cmd
          return ':no_entry_sign: Subcommand not found'
        }
      }
      if (cmd) { // check cmd
        if (cmd.parentCommand) { // if is subcommands
          if (Object.keys(cmd.aliases).length > 0) { // if has aliases
            bot.createMessage(msg.channel.id, { // print subcmd + aliases
              embed: {
                color: 3066993, // green
                timestamp: new Date(),
                author: {
                  name: 'Commands',
                  icon_url: bot.user.dynamicAvatarURL('png')
                },
                footer: {
                  text: 'Dhaazen'
                },
                fields: [
                  {
                    name: `**SubCommand:**`,
                    value: `[${msg.prefix}${label}]()`,
                    inline: true
                  },
                  {
                    name: `**Aliases:**`,
                    value: `${cmd.aliases.join(', ')}`,
                    inline: true
                  },
                  {
                    name: `**Description:**`,
                    value: `${cmd.fullDescription}`
                  },
                  {
                    name: `**Usage:**`,
                    value: `\`${cmd.usage}\``
                  }
                ]
              }
            })
          } else { // if has not alias
            bot.createMessage(msg.channel.id, { // print subcmd
              embed: {
                color: 3066993, // green
                timestamp: new Date(),
                author: {
                  name: 'Commands',
                  icon_url: bot.user.dynamicAvatarURL('png')
                },
                footer: {
                  text: 'Dhaazen'
                },
                fields: [
                  {
                    name: `**SubCommand:**`,
                    value: `[${msg.prefix}${label}]()`
                  },
                  {
                    name: `**Description:**`,
                    value: `${cmd.fullDescription}`
                  },
                  {
                    name: `**Usage:**`,
                    value: `\`${cmd.usage}\``
                  }
                ]
              }
            })
          }
        } else { // if is not !subcmd
          if (Object.keys(cmd.aliases).length > 0) { // if has aliases
            if (Object.keys(cmd.subcommands).length > 0) { // if has subcommands
              for (var subLabel in cmd.subcommands) {
                if (cmd.subcommands[subLabel].permissionCheck(msg)) {
                  result += `\n  **${subLabel}** - ${cmd.subcommands[subLabel].description}`
                  bot.createMessage(msg.channel.id, { // print cmd + aliases + subcmdlist
                    embed: {
                      color: 3066993, // green
                      timestamp: new Date(),
                      author: {
                        name: 'Commands',
                        icon_url: bot.user.dynamicAvatarURL('png')
                      },
                      footer: {
                        text: 'Dhaazen'
                      },
                      fields: [
                        {
                          name: `**Command:**`,
                          value: `[${msg.prefix}${label}]()`,
                          inline: true
                        },
                        {
                          name: `**Aliases:**`,
                          value: `${cmd.aliases.join(', ')}`,
                          inline: true
                        },
                        {
                          name: `**Description:**`,
                          value: `${cmd.fullDescription}`
                        },
                        {
                          name: `**Usage:**`,
                          value: `\`${cmd.usage}\``
                        },
                        {
                          name: `**Subcommand:**`,
                          value: result
                        }
                      ]
                    }
                  })
                }
              }
            } else { // if has not subcmd
              bot.createMessage(msg.channel.id, { // print cmd + aliases
                embed: {
                  color: 3066993, // green
                  timestamp: new Date(),
                  author: {
                    name: 'Commands',
                    icon_url: bot.user.dynamicAvatarURL('png')
                  },
                  footer: {
                    text: 'Dhaazen'
                  },
                  fields: [
                    {
                      name: `**Command:**`,
                      value: `[${msg.prefix}${label}]()`,
                      inline: true
                    },
                    {
                      name: `**Aliases:**`,
                      value: `${cmd.aliases.join(', ')}`,
                      inline: true
                    },
                    {
                      name: `**Description:**`,
                      value: `${cmd.fullDescription}`
                    },
                    {
                      name: `**Usage:**`,
                      value: `\`${cmd.usage}\``
                    }
                  ]
                }
              })
            }
          } else { // if has not alias
            if (Object.keys(cmd.subcommands).length > 0) { // if has subcommands
              for (var subLabel in cmd.subcommands) {
                if (cmd.subcommands[subLabel].permissionCheck(msg)) {
                  result += `\n  **${subLabel}** - ${cmd.subcommands[subLabel].description}`
                  bot.createMessage(msg.channel.id, { // print cmd + subcmdlist
                    embed: {
                      color: 3066993, // green
                      timestamp: new Date(),
                      author: {
                        name: 'Commands',
                        icon_url: bot.user.dynamicAvatarURL('png')
                      },
                      footer: {
                        text: 'Dhaazen'
                      },
                      fields: [
                        {
                          name: `**Command:**`,
                          value: `[${msg.prefix}${label}]()`,
                          inline: true
                        },
                        {
                          name: `**Description:**`,
                          value: `${cmd.fullDescription}`
                        },
                        {
                          name: `**Usage:**`,
                          value: `\`${cmd.usage}\``
                        },
                        {
                          name: `**Subcommand:**`,
                          value: result
                        }
                      ]
                    }
                  })
                }
              }
            } else { // if has not subcmd
              bot.createMessage(msg.channel.id, { // print cmd
                embed: {
                  color: 3066993, // green
                  timestamp: new Date(),
                  author: {
                    name: 'Commands',
                    icon_url: bot.user.dynamicAvatarURL('png')
                  },
                  footer: {
                    text: 'Dhaazen'
                  },
                  fields: [
                    {
                      name: '**Command:**',
                      value: `[${msg.prefix}${label}]()`
                    },
                    {
                      name: '**Description:**',
                      value: `${cmd.fullDescription}`
                    },
                    {
                      name: '**Usage:**',
                      value: `\`${cmd.usage}\``
                    }
                  ]
                }
              })
            }
          }
        }
      }
    }
  } else {
    result += '\u200b'
    for (var label in bot.commands) {
      if (bot.commands[label] && bot.commands[label].permissionCheck(msg)) {
        result += `  [${msg.prefix}${label}]() - ${bot.commands[label].description}\n`
      }
    }
    bot.createMessage(msg.channel.id, { // help global
      embed: {
        color: 3066993, // green
        author: {
          name: 'Commands',
          icon_url: bot.user.dynamicAvatarURL('png')
        },
        footer: {
          text: `Type ${dprefix}help <command> for help about a command.`
        },
        fields: [
          {
            name: 'Dhaazen',
            value: `Author: \`KhaaZ#2030\`.\nVersion:\`${version}\`.\nMore info: \`${dprefix}info\`.`
          },
          {
            name: 'Commands',
            value: result
          },
          {
            name: 'Prefix',
            value: `\`${dprefix}\`\n\`@Dhaazen#6393 \``
          }
        ]
      }
    })
  }
}, {
  description: 'Help command',
  fullDescription: 'This command is used to view information of different bot commands, including this one.',
  usage: `\n${dprefix}help\n${dprefix}help <command>`
})

bot.registerCommandAlias('halp', 'help') // Alias !halp to !help
//
// HELP COMMAND END

// PRIVATE COMMANDS
//
// Restart | Botstop | Eval
//
// Restart command
bot.registerCommand('restart', (msg, args) => {
  if (msg.author.id === '179908288337412096') { // Owner ID
    msg.delete()
    bot.createMessage(msg.channel.id, {
      embed: {
        color: 3066993, // green
        description: 'Restarting...'
      }
    })
      .then(msg => {
        setTimeout(function () {
          msg.delete()
        }, 3000)
      })
    bot.createMessage('361524475621277696', { // uptime channel
      embed: {
        timestamp: new Date(),
        color: 3066993, // green
        description: '==> Restarting!'
      }
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
          timestamp: new Date(),
          color: 3066993, // green
          footer: {
            icon_url: bot.user.avatarURL,
            text: 'Dhaazen'
          },
          description: 'Restarted!'
        }
      })
    }, 4000)
  } else {
    bot.createMessage(msg.channel.id, ':no_entry_sign: Sorry, restart is not available for you.')
  }
}, {
  description: 'Restart the bot',
  fullDescription: 'Restart the bot',
  usage: `${dprefix}restart`,
  requirements: {
    'userIDs': '179908288337412096' // Owner private
  },
  permissionMessage: ':no_entry_sign: You dont have permission to do that.'
})
// Stop command
bot.registerCommand('botstop', (msg, args) => {
  if (msg.author.id === '179908288337412096') { // Owner ID
    msg.delete()
    bot.disconnect()
    bot.createMessage(msg.channel.id, {
      embed: {
        color: 15158332, // red
        description: 'Stopping...'
      }
    })
    .then(msg => {
      setTimeout(function () {
        msg.delete()
      }, 3000)
    })
    setTimeout(function () {
      exec('pm2 stop DhaazenBot', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`)
          return
        }
        console.log(`stdout: ${stdout}`)
        console.log(`stderr: ${stderr}`)
      })
      bot.createMessage(msg.channel.id, {
        embed: {
          timestamp: new Date(),
          color: 15158332, // red
          footer: {
            icon_url: bot.user.avatarURL,
            text: 'Dhaazen'
          },
          description: 'Stopped!'
        }
      })
      bot.createMessage('361524475621277696', { // uptime channel
        embed: {
          timestamp: new Date(),
          color: 10038562, // Dark red
          description: 'Stopped!'
        }
      })
    }, 4000)
  } else {
    bot.createMessage(msg.channel.id, ':no_entry_sign: Sorry, botstop is not available for you.')
  }
}, {
  description: 'Stop the bot',
  fullDescription: 'Stop the bot',
  usage: `${dprefix}botstop`,
  requirements: {
    'userIDs': '179908288337412096' // Owner private
  },
  permissionMessage: ':no_entry_sign: You dont have permission to do that.'
})

bot.registerCommandAlias('bstop', 'botstop')
// Eval command
bot.registerCommand('eval', async (msg, args) => {
  let avatar = msg.author.defaultAvatarURL
  if (msg.author.avatar) avatar = `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.${msg.author.avatar.startsWith('a_') ? 'gif' : 'png'}?size=2048`
  let evaled = await eval(args.join(' '))
  switch (typeof evaled) {
    case 'object':
      evaled = inspect(evaled, { depth: 0 })
      break
    default:
      evaled = String(evaled)
  }
  bot.createMessage(msg.channel.id, {
    embed: {
      color: 3447003,
      title: 'EVAL',
      description: `Your eval resulted in this:\n\`\`\`fix\n${evaled}\n\`\`\``,
      author: {
        name: msg.author.username,
        icon_url: avatar
      },
      footer: {
        icon_url: bot.user.dynamicAvatarURL('png'),
        text: 'Dhaazen | Eval Command'
      }
    }
  }).catch(console.log)
}, {
  description: 'Make the bot evaluate js code.',
  fullDescription: 'Make the bot evaluate js code.',
  usage: `${dprefix}eval <js>`,
  requirements: {
    'userIDs': '179908288337412096' // Owner private
  },
  permissionMessage: ':no_entry_sign: Sorry, eval is not available for you.',
  cooldown: null
})

bot.registerCommandAlias('e', 'eval')
//
// PRIVATE COMMANDS END

// LOGS
//
// GlobalLog
//
bot.on('guildCreate', (guild) => { // Log create guild
  var owner = guild.members.find(member => member.user.id === guild.ownerID).user
  var dateC = new Date(guild.createdAt)
  dateC = dateC.toUTCString()
  var dateJ = new Date(guild.joinedAt)
  dateJ = dateJ.toUTCString()
  bot.createMessage('361246399922307073', {
    embed: {
      timestamp: new Date(),
      color: 3066993, // green
      author: {
        name: `${guild.name}`,
        icon_url: `${guild.iconURL}`
      },
      thumbnail: {
        url: `${guild.iconURL}`
      },
      footer: {
        icon_url: bot.user.avatarURL,
        text: 'Dhaazen'
      },
      description: `Dhaazen was added to: ${guild.name}`,
      fields: [
        {
          name: 'ID:',
          value: `${guild.id}`,
          inline: true
        },
        {
          name: 'Region:',
          value: `${guild.region}`,
          inline: true
        },
        {
          name: 'Owner:',
          value: `${owner.username + '#' + owner.discriminator}`,
          inline: true
        },
        {
          name: 'Owner ID:',
          value: `${guild.ownerID}`,
          inline: true
        },
        {
          name: 'Members:',
          value: `${guild.members.size}`,
          inline: true
        },
        {
          name: 'Channels:',
          value: `${guild.channels.size}`,
          inline: true
        },
        {
          name: 'Created at:',
          value: `${dateC}`
        },
        {
          name: 'Joined at:',
          value: `${dateJ}`
        }
      ]
    }
  })
})

bot.on('guildDelete', (guild) => { // Log delete guild
  var owner = guild.members.find(member => member.user.id === guild.ownerID).user
  var dateC = new Date(guild.createdAt)
  dateC = dateC.toUTCString()
  var dateJ = new Date(guild.joinedAt)
  dateJ = dateJ.toUTCString()
  bot.createMessage('361246399922307073', {
    embed: {
      timestamp: new Date(),
      color: 15158332, // red
      author: {
        name: `${guild.name}`,
        icon_url: `${guild.iconURL}`
      },
      thumbnail: {
        url: `${guild.iconURL}`
      },
      footer: {
        icon_url: bot.user.avatarURL,
        text: 'Dhaazen'
      },
      description: `Dhaazen was removed from: ${guild.name}`,
      fields: [
        {
          name: 'ID:',
          value: `${guild.id}`,
          inline: true
        },
        {
          name: 'Region:',
          value: `${guild.region}`,
          inline: true
        },
        {
          name: 'Owner:',
          value: `${owner.username + '#' + owner.discriminator}`,
          inline: true
        },
        {
          name: 'Owner ID:',
          value: `${guild.ownerID}`,
          inline: true
        },
        {
          name: 'Members:',
          value: `${guild.members.size}`,
          inline: true
        },
        {
          name: 'Channels:',
          value: `${guild.channels.size}`,
          inline: true
        },
        {
          name: 'Created at:',
          value: `${dateC}`
        },
        {
          name: 'Joined at:',
          value: `${dateJ}`
        }
      ]
    }
  })
})

bot.on('guildAvailable', (guild) => { // Log Available guild
  var owner = guild.members.find(member => member.user.id === guild.ownerID).user
  var dateC = new Date(guild.createdAt)
  var dateCreated = dateC.toUTCString()
  var dateJ = new Date(guild.joinedAt)
  var dateJoined = dateJ.toUTCString()
  bot.createMessage('361246399922307073', {
    embed: {
      timestamp: new Date(),
      color: 3066993, // green
      author: {
        name: `${guild.name}`,
        icon_url: `${guild.iconURL}`
      },
      thumbnail: {
        url: `${guild.iconURL}`
      },
      footer: {
        icon_url: bot.user.avatarURL,
        text: 'Dhaazen'
      },
      description: `New guild available: ${guild.name}`,
      fields: [
        {
          name: 'ID:',
          value: `${guild.id}`,
          inline: true
        },
        {
          name: 'Region:',
          value: `${guild.region}`,
          inline: true
        },
        {
          name: 'Owner:',
          value: `${owner.username + '#' + owner.discriminator}`,
          inline: true
        },
        {
          name: 'Owner ID:',
          value: `${guild.ownerID}`,
          inline: true
        },
        {
          name: 'Members:',
          value: `${guild.members.size}`,
          inline: true
        },
        {
          name: 'Channels:',
          value: `${guild.channels.size}`,
          inline: true
        },
        {
          name: 'Created at:',
          value: `${dateC}`
        },
        {
          name: 'Joined at:',
          value: `${dateJ}`
        }
      ]
    }
  })
})

bot.on('guildUnavailable', (guild) => { // Log Unavailable guild
  var owner = guild.members.find(member => member.user.id === guild.ownerID).user
  var dateC = new Date(guild.createdAt)
  var dateCreated = dateC.toUTCString()
  var dateJ = new Date(guild.joinedAt)
  var dateJoined = dateJ.toUTCString()
  bot.createMessage('361246399922307073', {
    embed: {
      timestamp: new Date(),
      color: 15158332, // red
      author: {
        name: `${guild.name}`,
        icon_url: `${guild.iconURL}`
      },
      thumbnail: {
        url: `${guild.iconURL}`
      },
      footer: {
        icon_url: bot.user.avatarURL,
        text: 'Dhaazen'
      },
      description: `New guild unavailable: ${guild.name}`,
      fields: [
        {
          name: 'ID:',
          value: `${guild.id}`,
          inline: true
        },
        {
          name: 'Region:',
          value: `${guild.region}`,
          inline: true
        },
        {
          name: 'Owner:',
          value: `${owner.username + '#' + owner.discriminator}`,
          inline: true
        },
        {
          name: 'Owner ID:',
          value: `${guild.ownerID}`,
          inline: true
        },
        {
          name: 'Members:',
          value: `${guild.members.size}`,
          inline: true
        },
        {
          name: 'Channels:',
          value: `${guild.channels.size}`,
          inline: true
        },
        {
          name: 'Created at:',
          value: `${dateC}`
        },
        {
          name: 'Joined at:',
          value: `${dateJ}`
        }
      ]
    }
  })
})

//
// ServerLog
/*
if(guild.id==='358685866878566400') {
  bot.on()
} else {
  return;
}
*/
// LOGS END

// AUTORESPONDER (disabled)
//
/*
bot.on('messageCreate', (msg) => {
  if (msg.author.bot) return
  else {
    if (msg.content === 'Hai' || msg.content === 'hai' || msg.content === 'ayy' || msg.content === 'ayyy') {
      bot.createMessage(msg.channel.id, 'ayy lmao')
    }
    if (msg.content === 'bancoal' || msg.content === 'Bancoal' || msg.content === 'ban coal' || msg.content === 'Ban coal' || msg.content === 'ban Coal' || msg.content === 'Ban Coal') {
      bot.createMessage(msg.channel.id, '<:bancoal:361845273863127040>')
    }
  }
})
bot.on('messageCreate', (msg) => {
  if (msg.author.bot) return
  else {
    if (msg.content.includes('<@360859616558579713>') || msg.content.includes('Dhaazen') || msg.content.includes('<@!360859616558579713>')) {
      msg.channel.addMessageReaction(msg.id, 'hi:361232073853370378', '@me')
    }
    if (msg.content.includes('<@179908288337412096>') || msg.content.includes('KhaaZ') || msg.content.includes('khaaz') || msg.content.includes('Khaaz') || msg.content.includes('<@!179908288337412096>')) {
      msg.channel.addMessageReaction(msg.id, '🚫', '@me')
    }
    if (msg.content.includes('<@155698776512790528>') || msg.content.includes('<@!155698776512790528>')) {
      msg.channel.addMessageReaction(msg.id, 'bancoal:361845273863127040', '@me')
    }
  }
})
*/
//
// AUTORESPONDER END

// BASE COMMANDS
//
// Support | Ping | Invite | Uptime | Membercount | Info | Say:reverse | Announce | version | Embed
//
// Ping command
bot.registerCommand('ping', (msg) => {
  var startime = bot.startTime
  let start = Date.now()
  bot.createMessage(msg.channel.id, {
    embed: {
      color: 3066993, // green
      timestamp: new Date(startime),
      footer: {
        icon_url: bot.user.avatarURL,
        text: 'Started at'
      },
      description: '**Pinging...**'
    }
  })
    .then(msg => { // edit + pingtime
      let diff = (Date.now() - start)
      return msg.edit({
        embed: {
          timestamp: new Date(startime),
          footer: {
            icon_url: bot.user.avatarURL,
            text: 'Started at'
          },
          color: 3066993,
          description: `**Pong!** \`${diff}ms\``
        }
      })
    })
}, {
  description: 'Pings the bot.',
  fullDescription: "This command could be used to check if the bot is up. Or entertainment when you're bored.",
  usage: `${dprefix}ping`,
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
      color: 1752220, // aqua
      author: {
        name: 'Dhaazen',
        icon_url: bot.user.avatarURL
      },
      thumbnail: {
        url: bot.user.avatarURL
      },
      timestamp: new Date(startime),
      footer: {
        icon_url: bot.user.avatarURL,
        text: 'Started at'
      },
      fields: [
        {
          name: 'Creator',
          value: 'KhaaZ#2030',
          inline: false
        },
        {
          name: 'Version',
          value: `${version}`,
          inline: true
        },
        {
          name: 'Language/Lib',
          value: 'javascript/eris',
          inline: true
        },
        {
          name: 'Description',
          value: 'Experimental bot using *javascript* and *eris* lib\nBased on the awesome Embot source code by `Mika K.#2980`\nBoosted by the dyno team :sunglasses:',
          inline: false
        },
        {
          name: 'Contributors',
          value: '`Mika K.#2980`-Embot source code\n`Ape#7739`-Awesome tips and help\n`AS04™#2793`-Awesome tips and help\n`Zapp#0790`',
          inline: false
        },
        {
          name: 'Guilds',
          value: `${bot.guilds.size}`,
          inline: true
        },
        {
          name: 'Users',
          value: `${bot.guilds.map(g => g.memberCount).reduce((a, b) => a + b)}`,
          inline: true
        },
        {
          name: 'Uptime',
          value: `${str}`,
          inline: false
        },
        {
          name: 'Invite',
          value: '[Add me](https://discordapp.com/oauth2/authorize?client_id=360859616558579713&scope=bot&permissions=201714753)',
          inline: true
        },
        {
          name: 'Discord Server',
          value: '[Join now](https://discord.gg/JtbEDuf)',
          inline: true
        }
      ]
    }
  })
}, {
  description: 'Infos about the bot',
  fullDescription: 'Full infos about the bot',
  usage: `${dprefix}info`,
  cooldown: 2000,
  cooldownMessage: `:no_entry_sign: A little too fast there..`,
  cooldownReturns: 1
})

bot.registerCommandAlias('botinfo', 'info')
// Version command
bot.registerCommand('version', (msg, args) => { // Info command 2.0
  bot.createMessage(msg.channel.id, {
    embed: {
      color: 1752220,
      title: 'Version',
      description: `${version}`
    }
  })
}, {
  description: 'Bot version',
  fullDescription: 'Bot version',
  usage: `${dprefix}version`,
  cooldown: 2000,
  cooldownMessage: `:no_entry_sign: A little too fast there..`,
  cooldownReturns: 1
})
// Support command
bot.registerCommand('support', (msg, args) => { // Info command 2.0
  bot.createMessage(msg.channel.id, {
    embed: {
      color: 1752220, // aqua
      timestamp: new Date(),
      footer: {
        icon_url: bot.user.avatarURL,
        text: 'Dhaazen'
      },
      author: {
        name: 'Dhaazen',
        icon_url: bot.user.avatarURL
      },
      description: 'Need help? Feel free to join our support server!',
      fields: [
        {
          name: 'Support Server',
          value: 'Dhaazen official support server : https://discord.gg/JtbEDuf',
          inline: false
        }
      ]
    }
  })
}, {
  description: 'Need Help?',
  fullDescription: 'Need Help?',
  usage: `${dprefix}support`,
  cooldown: 2000,
  cooldownMessage: `:no_entry_sign: A little too fast there..`,
  cooldownReturns: 1
})
// Invite command
bot.registerCommand('invite', (msg, args) => {
  bot.createMessage(msg.channel.id, {
    embed: {
      color: 1752220, // aqua
      author: {
        name: 'Dhaazen',
        icon_url: bot.user.avatarURL
      },
      footer: {
        icon_url: bot.user.avatarURL,
        text: 'Support server: https://discord.gg/JtbEDuf'
      },
      fields: [
        {
          name: 'Invite',
          value: '[Add me to your server!](https://discordapp.com/oauth2/authorize?client_id=360859616558579713&scope=bot&permissions=201714753)',
          inline: false
        }
      ]
    }
  })
}, {
  description: 'Invite me!',
  fullDescription: 'Invite me to your server!',
  usage: `${dprefix}invite`,
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
      color: 1752220, // aqua
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

bot.registerCommandAlias('up', 'uptime')
// Membercount command
bot.registerCommand('membercount', (msg, args) => {
  bot.createMessage(msg.channel.id, {
    embed: {
      color: 1752220, // aqua
      timestamp: new Date(),
      title: 'Server members',
      fields: [
        {
          name: 'Total',
          value: `${msg.channel.guild.memberCount}`,
          inline: true
        },
        {
          name: 'Humans',
          value: `${msg.channel.guild.memberCount}`,
          inline: true
        },
        {
          name: 'Bots',
          value: `${msg.channel.guild.memberCount}`,
          inline: true
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

bot.registerCommandAlias('members', 'membercount')
// Say command
var sayCommand = bot.registerCommand('say', (msg, args) => {
  if (args.length === 0) {
    bot.createMessage(msg.channel.id, {
      embed: {
        color: 15158332, // red
        description: `**Command:** [${msg.prefix}say]() \n**Usage:** ${msg.prefix}say <test>\n**Description:** The bot will say whatever is after the command label.`,
        author: {
          name: 'Commands',
          icon_url: bot.user.dynamicAvatarURL('png')
        }
      }
    })
  } else {
    msg.delete()
    var text = args.join(' ')
    return text
  }
}, {
  description: 'Say something',
  fullDescription: 'The bot will say whatever is after the command label.',
  usage: `${dprefix}say <text>`,
  cooldown: 2000,
  cooldownMessage: `:no_entry_sign: A little too fast there..`,
  cooldownReturns: 1
})
// Say:reverse command
sayCommand.registerSubcommand('reverse', (msg, args) => {
  if (args.length === 0) {
    bot.createMessage(msg.channel.id, { // error: help say reverse
      embed: {
        color: 15158332, // red
        description: `**Command:** [${msg.prefix}say reverse]() \n**Usage:** ${msg.prefix}say reverse <test>\n**Description:** The bot will say, in reverse, whatever is after the command label.`,
        author: {
          name: 'Commands',
          icon_url: bot.user.dynamicAvatarURL('png')
        }
      }
    })
  } else {
    msg.delete()
    var text = args.join(' ')
    text = text.split('').reverse().join('') // Reverse the string
    return text
  }
}, {
  description: 'Say something in reverse',
  fullDescription: 'The bot will say, in reverse, whatever is after the command label.',
  usage: `${dprefix}say reverse <text>`,
  cooldown: 2000,
  cooldownMessage: `:no_entry_sign: A little too fast there..`,
  cooldownReturns: 1
})
// Announce command
var announceCommand = bot.registerCommand('announce', (msg, args) => {
  if (args.length === 0) {
    bot.createMessage(msg.channel.id, { // error: help announce
      embed: {
        color: 15158332, // red
        description: `**Command:** [${msg.prefix}announce]() \n**Usage:** ${msg.prefix}announce <test>\n**Description:** The bot will announce with embed whatever is after the command label.`,
        author: {
          name: 'Commands',
          icon_url: bot.user.dynamicAvatarURL('png')
        }
      }
    })
  } else {
    var text = args.join(' ')
    bot.createMessage(msg.channel.id, {
      embed: {
        color: 12370112, // Light grey
        description: text
      }
    })
  }
}, {
  description: 'Announce with embed',
  fullDescription: 'The bot will announce with embed whatever is after the command label.',
  usage: `${dprefix}announce <text>`,
  cooldown: 2000,
  cooldownMessage: `:no_entry_sign: A little too fast there..`,
  cooldownReturns: 1
})
// Embed command
bot.registerCommand('embed', (msg, args) => {
  msg.delete()
  var args = msg.content.split(' ').slice(1).join(' ').split(' | ')
  var title = args[0]
  var desc = args[1]
    // var colour = args[2];//experimental: set colour in the command
  var colour = '3447003'// disable this when using the above
  var rando = Math.floor((Math.random() * 14) + 1)
  var newrando = rando - 1
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
        text: 'Dhaazen | embed'
      }
    }
  }).catch((err) => {
    console.log(err)
  })
}, {
  description: 'Create an Embed.',
  fullDescription: 'Create an Embed.',
  usage: `${dprefix}embed <title> | <content>`,
  cooldown: 2000,
  cooldownMessage: `:no_entry_sign: A little too fast there..`,
  cooldownReturns: 1
})
// Upload emote command
bot.registerCommand('upload', (msg, args) => {
  var data = 'clear'
  var name = 'clear'
  if (!msg.member.permission.has('manageEmojis')) {
    return ":no_entry_sign: You don't have permissions to use that command"
  }
  if (args.length <= 1) {
    return ":no_entry_sign: You didn't enter any or not enough information for the emoji upload!"
  }
  if (name !== 'clear') {
    return ':no_entry_sign: An error occured, please try again!'
  }
  name = args[0]
  var url = args[1].startsWith('http')
  if (url) {
    var newurl = args[1]
  } else {
    var emoji = args[1].split('<:').join('').split('>').join('').split(':')
    if (emoji.length === 1) {
      var newurl = 'https://cdn.discordapp.com/emojis/' + emoji[0] + '.png'
    } else {
      var newurl = 'https://cdn.discordapp.com/emojis/' + emoji[1] + '.png'
    }
  }
  request.get(newurl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      data = 'data:' + response.headers['content-type'] + ';base64,' + new Buffer(body).toString('base64')
      console.log(data)
    } else {
      return ':no_entry_sign: An error occured.'
    }
  })
  setTimeout(function () {
    bot.createGuildEmoji(msg.channel.guild.id, {
      'name': name,
      'image': data
    }, 'Ulixes Emoji command').then(emoji => {
      name = 'clear'
      data = 'clear'
      bot.createMessage(msg.channel.id, `:ok_hand: Added Emoji <:${emoji.name}:${emoji.id}> with the name :${emoji.name}:`)
    }).catch(err => {
      name = 'clear'
      data = 'clear'
      bot.createMessage(msg.channel.id, `:no_entry_sign: An error occured: ${err}`)
    })
  }, 500)
}, {
  description: 'Upload emoji with URL | Command by \`Mika K.#2980\`',
  fullDescription: 'Upload emoji with URL | Command by \`Mika K.#2980\`',
  usage: `${dprefix}upload <name> <image url>/<nitro emoji>`,
  cooldown: 2000,
  cooldownMessage: `:no_entry_sign: A little too fast there..`,
  cooldownReturns: 1
})

bot.registerCommand('fr', (msg, args) => {
  let request = args.join(' ')
  try {
    bot.createMessage(378336643247243295, {
      embed: {
        timestamp: new Date(),
        title: `Requested in: ${msg.channel.guild.name}`,
        thumbnail: {
          url: `${msg.channel.guild.iconURL}`,
        },
        description: `${request}`,
        author: {
          name: `Requested by ${msg.author.username}#${msg.author.discriminator}`,
          icon_url: msg.author.avatar
        }
      }
    })
    bot.createMessage(msg.channel.id, "<:success:372785537221787658> Your feature request was successfully submited")
  } catch (err)
    bot.createMessage(378336643247243295, "<:error:372786041637306368> An error occured");
    bot.createMessage(msg.channel.id, "<:error:372786041637306368> An error occured");
}, {
  description: 'Request a feature for the future DynamicBot',
  fullDescription: 'Request a feature for the future DynamicBot by Ape, AS04, CoalSephos, Eleos, KhaaZ, Mika .K',
  usage: `${dprefix}fr <text>`,
  cooldown: 2000,
  cooldownMessage: `:no_entry_sign: A little too fast there..`,
  cooldownReturns: 1
})

//
bot.connect()

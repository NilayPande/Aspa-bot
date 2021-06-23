const Discord = require('discord.js');
const client = new Discord.Client();
const { token } = require('./config.json')
const fs = require('fs');
const path = require('path');

client.on('ready', async() => {
    console.log('Bot is now online')

    const baseFile = 'command-base.js'
    const commandBase = require(`./commands/${baseFile}`)

    const readCommands = (dir) => {
        const files = fs.readdirSync(path.join(__dirname, dir))
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if (stat.isDirectory())
                readCommands(path.join(dir, file))
            else if (file !== baseFile) {
                const option = require(path.join(__dirname, dir, file))
                commandBase(client, option, Discord)
            }
        }
    }
    readCommands('commands')
});


// client.commands = new Discord.Collection();
// const commandFolders = fs.readdirSync('./commands');
// for (const folder of commandFolders) {
//     const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

//     for (const file of commandFiles) {
//         const command = require(`./commands/${folder}/${file}`);
//         client.commands.set(command.name, command);
//     }
// }

// client.on('message', async(message) => {
//     if (!message.content.startsWith(prefix)) return

//     if (message.content.startsWith(prefix)) {
//         const [cmd, ...args] = message.content.trim().substring(prefix.length).split(/ +/);

//         switch (cmd) {
//             case 'random':
//                 client.commands.get('random').execute(message, args);
//                 break;

//             case 'purge':
//                 client.commands.get('purge').execute(message, args);
//                 break;

//             case 'ping':
//                 client.commands.get('ping').execute(message);
//                 break;

//             case 'setNsfw':
//                 client.commands.get('setNsfw').execute(message);
//                 break;

//             case 'setSfw':
//                 client.commands.get('setSfw').execute(message);
//                 break;

//             case 'pin':
//                 client.commands.get('pin').execute(message, args);
//                 break;

//             case 'createchannel':
//                 if (!message.member.permissions.has('MANAGE_CHANNELS')) return;
//                 client.commands.get('createchannel').execute(message, args);
//                 break;
//         }
//     }
// });

client.login(token)
const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json')

client.on('ready', () => {
    console.log('Bot is now online')
});

const fs = require('fs');

client.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

client.on('message', async(message) => {
    if (!message.content.startsWith(prefix)) return

    if (message.content.startsWith(prefix)) {
        const [cmd, ...args] = message.content.trim().substring(prefix.length).split(/ +/);

        switch (cmd) {
            case 'random':
                client.commands.get('random').execute(message, args);
                break;

            case 'purge':
                client.commands.get('purge').execute(message, args);
                break;

            case 'ping':
                client.commands.get('ping').execute(message);
                break;

            case 'setNsfw':
                client.commands.get('setNsfw').execute(message);
                break;

            case 'setSfw':
                client.commands.get('setSfw').execute(message);
                break;

            case 'pin':
                client.commands.get('pin').execute(message, args);
                break;
        }
    }
});

client.login(token)
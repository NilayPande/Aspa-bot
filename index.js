const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const config = require('./config.json')

client.on('ready', () => {
    console.log('Bot is now online')
});

const prefix = '-';

client.on('message', async(message) => {
    if (!message.content.startsWith(prefix)) return

    if (message.content.startsWith(prefix)) {
        const [cmd, ...args] = message.content.trim().substring(prefix.length).split(/ +/);

        switch (cmd) {
            case 'random':
                message.channel.send(Math.floor(Math.random() * (parseInt(args[0]) + 1)))
                break;

            case 'purge':
                purge();
                break;

            case 'ping':
                message.reply('pong');
                break;

            case 'add':
                add();
                break;

            case 'setNsfw':
                setNsfw();
                break;

            case 'setSfw':
                setSfw();
                break;

            case 'pin':
                if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("I don't have the permission to manage messages")
                pinMsg();
        }

        function purge() {
            if (!args[0])
                return message.channel.send(`Please specify the number of messages to delete`).then(msg => {
                    setTimeout(() => message.channel.bulkDelete(2).catch(err => message.channel.send(`Error: ${err}`)), 4000);
                }).catch(err => message.channel.send(`Error: ${err}`));

            if (parseInt(args[0]) > 99)
                return message.reply('Cannot delete more than 99 messages at a time').then(() => {
                    setTimeout(() => message.channel.bulkDelete(2).catch(err => message.channel.send(`Error: ${err}`)), 4000);
                }).catch(err => message.channel.send(`Error: ${err}`));

            if (parseInt(args[0]) < 1)
                return message.reply('Cannot delete less than 1 message').then(() => {
                    setTimeout(() => message.channel.bulkDelete(2).catch(err => message.channel.send(`Error: ${err}`)), 4000);
                }).catch(err => message.channel.send(`Error: ${err}`));

            if (isNaN(args[0]) || args[0] % 1 != 0)
                return message.reply('Please enter a real number').then(() => {
                    setTimeout(() => message.channel.bulkDelete(2).catch(err => message.channel.send(`Error: ${err}`)), 4000);
                }).catch(err => message.channel.send(`Error: ${err}`));

            if (message.member.roles.cache.some(role => role.name === 'Admin') || message.member.roles.cache.some(role => role.name === 'Zeus')) {
                let messagesToDelete = parseInt(args[0]) + 1;
                message.channel.bulkDelete(messagesToDelete).catch(err => message.channel.send(`Error: ${err}`));
            }
        }

        function setNsfw() {
            if (message.channel.nsfw) return message.channel.send('Channel already set to NSFW')
            message.channel.edit({ nsfw: true })
            message.channel.send('Channel set to NSFW')
        }

        function setSfw() {
            if (!message.channel.nsfw) return message.channel.send('Channel already set to SFW')
            message.channel.edit({ nsfw: false })
            message.channel.send('Channel set to SFW')
        }

        function pinMsg() {
            const str = args.join(' ');
            message.delete()
            message.channel.send(str).then(msg => msg.pin())
        }


        function add() {
            if (!args[0]) return message.reply('Give me something to add bruh :/')
            let num1 = parseInt(args[0])
            let num2 = parseInt(args[1])

            message.channel.send(num1 + num2)
        }
    }
});

client.login(config.token)
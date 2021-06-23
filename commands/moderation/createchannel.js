module.exports = {
    commands: ['createchannel', 'createch', 'create_ch'],
    expectedArgs: '<channel_name>',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, args, text) => {
        const channelName = args.join(" ");
        // if (!text) return message.reply('Please specify a channel name')

        message.guild.channels.create(channelName).then(ch => message.channel.send(`Channel ${ch} created`));
    },
    permissions: [],
    requiredRoles: ['Admin', 'Zeus'],
}
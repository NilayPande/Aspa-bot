module.exports = {
    commands: 'setSfw',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, args, text) => {
        if (!message.channel.nsfw) return message.channel.send('Channel already set to SFW')
        message.channel.edit({ nsfw: false })
        message.channel.send('Channel set to SFW')
    },
    permissions: [],
    requiredRoles: ['Admin', 'Zeus'],
}
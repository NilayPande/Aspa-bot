module.exports = {
    commands: 'setNsfw',
    minArgs: 0,
    maxArgs: 0,
    callback: (message) => {
        if (message.channel.nsfw) return message.channel.send('Channel already set to NSFW')
        message.channel.edit({ nsfw: true })
        message.channel.send('Channel set to NSFW')
    },
    permissions: [],
    requiredRoles: ['Admin', 'Zeus'],
}
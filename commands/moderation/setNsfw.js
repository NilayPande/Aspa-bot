module.exports = {
    name: 'setNsfw',
    description: "Change the current channel to a NSFW channel",
    execute(message) {
        if (message.channel.nsfw) return message.channel.send('Channel already set to NSFW')
        message.channel.edit({ nsfw: true })
        message.channel.send('Channel set to NSFW')
    }
}
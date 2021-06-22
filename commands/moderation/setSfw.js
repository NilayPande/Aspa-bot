module.exports = {
    name: 'setSfw',
    description: "Change the current channel to a SFW channel",
    execute(message) {
        if (!message.channel.nsfw) return message.channel.send('Channel already set to SFW')
        message.channel.edit({ nsfw: false })
        message.channel.send('Channel set to SFW')
    }
}
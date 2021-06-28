module.exports = {
    commands: ['pin'],
    expectedArgs: '<text/message_id>',
    permissionError: "I don't have the permission to manage messages",
    minArgs: 1,
    callback: (message, args, text) => {
        // if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("I don't have the permission to manage messages")

        // const str = args.join(' ');
        message.delete()
        if (isNaN(parseInt(text)) || text.length != 18)
            message.channel.send(text).then(msg => msg.pin())
        else {
            message.channel.messages.fetch(text).then(m => {
                m.pin().catch(err => {
                    message.channel.send("Failed to pin message")
                    console.log(err)
                })
            }).catch(() => {
                message.channel.send(`${text} is not a valid message id`)
            })
        }
    },
    permissions: ['MANAGE_MESSAGES'],
    requiredRoles: [],
}
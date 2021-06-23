module.exports = {
    commands: ['pin'],
    expectedArgs: '<text>',
    permissionError: "I don't have the permission to manage messages",
    minArgs: 1,
    callback: (message, args, text) => {
        // if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("I don't have the permission to manage messages")

        // const str = args.join(' ');
        message.delete()
        message.channel.send(text).then(msg => msg.pin())
    },
    permissions: ['MANAGE_MESSAGES'],
    requiredRoles: [],
}
module.exports = {
    name: 'pin',
    description: "Pin a message. Usage: -pin message_to_be_pinned",
    execute(message, args) {
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("I don't have the permission to manage messages")

        const str = args.join(' ');
        message.delete()
        message.channel.send(str).then(msg => msg.pin())
    }
}
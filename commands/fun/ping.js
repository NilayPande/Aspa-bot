module.exports = {
    commands: 'ping',
    minArgs: 0,
    maxArgs: 0,
    callback: (message) => {
        message.lineReply('Pong!')
    },
    permissions: [],
    requiredRoles: [],
}
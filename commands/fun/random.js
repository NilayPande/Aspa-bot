module.exports = {
    commands: ['random', 'ran'],
    expectedArgs: '<num>',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, args, text) => {
        message.channel.send(Math.floor(Math.random() * (parseInt(args[0]) + 1)))
    },
    permissions: [],
    requiredRoles: [],
}
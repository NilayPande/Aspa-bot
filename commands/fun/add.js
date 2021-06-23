module.exports = {
    commands: ['add', 'addition', 'sum'],
    expectedArgs: '<num1> <num2>',
    permissionError: '',
    minArgs: 2,
    maxArgs: 2,
    callback: (message, args, text) => {
        const num1 = +args[0]
        const num2 = +args[1]

        message.channel.send(`Sum is ${num1 + num2}`)
    },
    permissions: [],
    requiredRoles: [],
}
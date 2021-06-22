module.exports = {
    name: 'random',
    description: "Generates a random number from 0 to the specified number. Usage: -random 50",
    execute(message, args) {
        message.channel.send(Math.floor(Math.random() * (parseInt(args[0]) + 1)))
    }
}
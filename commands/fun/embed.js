module.exports = {
    commands: ['embed'],
    expectedArgs: '<text>',
    minArgs: 1,
    callback: (message, args, text, Discord) => {
        const newEmbed = new Discord.MessageEmbed()
            .setColor('#3ba0ff')
            .setTitle('Test')
            .setURL('https://google.com')
            .setDescription(text)
            .setImage('https://i.imgur.com/cvnbFJQ.jpeg')
            .setFooter('Footer');

        message.channel.send(newEmbed);
    },
    permissions: [],
    requiredRoles: [],
}
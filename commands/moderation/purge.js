module.exports = {
    commands: ['purge', 'cl'],
    expectedArgs: '<num>',
    permissionError: '',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, args) => {
        // if (!args[0])
        // return message.channel.send(`Please specify the number of messages to delete`).then(() => {
        //     setTimeout(() => message.channel.bulkDelete(2).catch(err => message.channel.send(`Error: ${err}`)), 1500);
        // }).catch(err => message.channel.send(`Error: ${err}`));

        if (parseInt(args[0]) > 99)
            return message.lineReply('Cannot delete more than 99 messages at a time').then(() => {
                setTimeout(() => message.channel.bulkDelete(2).catch(err => message.channel.send(`Error: ${err}`)), 1500);
            }).catch(err => message.channel.send(`Error: ${err}`));

        if (parseInt(args[0]) < 1)
            return message.lineReply('Cannot delete less than 1 message').then(() => {
                setTimeout(() => message.channel.bulkDelete(2).catch(err => message.channel.send(`Error: ${err}`)), 1500);
            }).catch(err => message.channel.send(`Error: ${err}`));

        if (isNaN(args[0]) || args[0] % 1 != 0)
            return message.lineReply('Please enter a real number').then(() => {
                setTimeout(() => message.channel.bulkDelete(2).catch(err => message.channel.send(`Error: ${err}`)), 1500);
            }).catch(err => message.channel.send(`Error: ${err}`));

        // if (message.member.roles.cache.some(role => role.name === 'Admin') || message.member.roles.cache.some(role => role.name === 'Zeus')) {
        let messagesToDelete = parseInt(args[0]) + 1;
        message.channel.bulkDelete(messagesToDelete).catch(err => message.channel.send(`Error: ${err}`));
        // }
    },
    permissions: [],
    requiredRoles: ['Admin', 'Zeus', 'alt'],
}
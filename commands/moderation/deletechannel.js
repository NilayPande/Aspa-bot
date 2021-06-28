module.exports = {
    commands: ['delete_channel', 'delete_ch', 'dch'],
    expectedArgs: '<#channel_mention1> <#channel_mention2> ...',
    minArgs: 1,
    callback: async(message, args, text, Discord) => {
        // message.delete()
        let c
        message.channel.send('Type confirm to delete the mentioned channel(s) or a random string to exit the process').then(con => c = con)
        const filter = m => m.author.id === message.author.id

        try {
            let msg = await message.channel.awaitMessages(filter, { max: 1, time: 1000 * 10, errors: ['time'] })
            msg.first().delete()
            if (msg.first().content.toLowerCase() === 'confirm') {
                c.delete()
                args.map(snowflake => {
                    let channelID = snowflake.replace(/\W/g, '');
                    let fetchedChannel = message.guild.channels.cache.find(r => r.id === channelID);

                    fetchedChannel.delete()
                        .then(message.channel.send(`${channelID} was successfully removed!`))
                        .catch(err => {
                            console.error(err);
                        });
                });
            } else throw false
        } catch (err) {
            if (!err)
                message.channel.send('Process terminated')
            else
                message.channel.send('You ran out of time! Run the command again')
        }

    },
    permissions: [],
    requiredRoles: [],
}
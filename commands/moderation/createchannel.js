module.exports = {
    commands: ['create_channel', 'create_ch', 'cch'],
    minArgs: 0,
    maxArgs: 0,
    callback: (message, args, text, Discord) => {
        const arr = [
            "**Enter channel name**",
            "**Enter category name or it's id**",
            "**Is it a text or a voice channel? (text/voice)**",
            "**Enter a description for the channel**",
            "**Do you want the channel to be NSFW? (Y/N)**"
        ]

        const filter = m => m.author.id === message.author.id
        let index = 0
        let a = []
        let e
        let input
        let tries = 3
        let flag = true
        const newEmbed = new Discord.MessageEmbed()
            .setColor('3ba0ff')

        message.delete()

        const oldEmbed = new Discord.MessageEmbed()
            .setColor('3ba0ff')
            .setTitle(arr[index])
            .setDescription(' ')
            .setFooter('Type cancel to exit setup');

        message.channel.send(oldEmbed).then(em => {
            e = em
            run()
        })

        async function run() {
            if (tries === -1)
                outOfTries()
            try {
                await message.channel.awaitMessages(filter, { max: 1, time: 1000 * 20, errors: ['time'] })
                    .then(msg => {
                        input = msg.first().content
                        msg.first().delete()

                        if (input.toLowerCase() === 'cancel') {
                            const terminated = new Discord.MessageEmbed()
                                .setColor('ff2934')
                                .setTitle('Session Terminated')
                            message.channel.send(terminated)
                            return
                        }

                        switch (index) {
                            case 0:
                                next()
                                break

                            case 1:
                                if (isNaN(input)) {
                                    let category = message.guild.channels.cache.find(c => c.name.toLowerCase() == input.toLowerCase() && c.type == "category")

                                    if (!category) {
                                        message.channel.send(`Not a valid category name. You have ${tries--} tries left`).then(t => {
                                            setTimeout(() => {
                                                t.delete()
                                            }, 1000 * 2.5);
                                        })
                                        run()
                                    } else {
                                        input = category.id
                                        next()
                                    }
                                } else {
                                    if (message.guild.channels.cache.get(input) === undefined) {

                                        message.channel.send(`Not a valid category id. You have ${tries--} tries left`).then(t => {
                                            setTimeout(() => {
                                                t.delete()
                                            }, 1000 * 2.5);
                                        })
                                        run()
                                    } else
                                        next()
                                }
                                break

                            case 2:
                                input = input.toLowerCase()
                                if (input === 'text')
                                    next()
                                else if (input === 'voice') {
                                    a.push('voice')
                                    createChannel()
                                } else {
                                    message.channel.send(`Please enter either text or voice. You have ${tries--} tries left`).then(t => {
                                        setTimeout(() => {
                                            t.delete()
                                        }, 1000 * 2.5)
                                    })
                                    run()
                                }
                                break

                            case 3:
                                next()
                                break

                            case 4:
                                input = input.toLowerCase()
                                if (input === 'y' || input === 'n' || input === 'yes' || input === 'no') {
                                    if (input === 'y' || input === 'yes')
                                        a.push(true)
                                    else
                                        a.push(false)
                                    createChannel()
                                } else {
                                    message.channel.send(`Please enter either yes or no. You have ${tries--} tries left`).then(t => {
                                        setTimeout(() => {
                                            t.delete()
                                        }, 1000 * 2.5);
                                    })
                                    run()
                                }
                                break
                        }
                    })
            } catch (err) {
                console.log(err)
                if (flag) {
                    const noTimeLeftEmbed = new Discord.MessageEmbed()
                        .setColor('ff2934')
                        .setTitle('You did not provide valid input in time')
                    return message.channel.send(noTimeLeftEmbed)
                }
            }
        }

        function next() {
            a.push(input)
            tries = 3
            index++
            e.edit(newEmbed.setTitle(arr[index]).setFooter('Type cancel to exit setup')).then(run())
        }

        function outOfTries() {
            flag = false
            const noTriesLeft = new Discord.MessageEmbed()
                .setColor('ff2934')
                .setTitle('Sorry but you ran out of tries. Run the command again.')
            return message.channel.send(noTriesLeft)
        }

        function createChannel() {
            // a.forEach(element => {
            //     console.log(element)
            // });
            message.guild.channels.create(a[0], {
                type: a[2],
                topic: a[3],
                nsfw: a[4]
            }).then(ch => {
                ch.setParent(a[1])

                const channelCreated = new Discord.MessageEmbed()
                    .setColor('#35db37')
                    .setTitle(`Channel created successfully`)
                    .setDescription(ch)

                message.channel.send(channelCreated)
            }).catch(console.error)
        }
    },
    permissions: [],
    requiredRoles: [],
}
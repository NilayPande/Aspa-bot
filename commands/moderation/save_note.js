const Note = require('../../schemas/NoteSchema.js')
module.exports = {
    commands: ['sn', 'save_note', 'save'],
    expectedArgs: '[note-name] <content>',
    minArgs: 2,
    callback: async(message, args, text, Discord) => {
        let title, note

        if (text.charAt(0) === '[') {
            title = text.substring(text.lastIndexOf('[') + 1, text.lastIndexOf(']')).trim()
            note = text.substr(text.indexOf("]") + 1).trim()
        } else {
            note = text.substr(text.indexOf(" ") + 1)
            title = args[0]
        }

        await Note.create({
            title,
            note
        }).then(() => {
            message.delete()
            const noteEmbed = new Discord.MessageEmbed()
                .setColor('#3cde33')
                .setTitle(title)
                .setDescription(note)
                .setFooter(`Note saved. Access it by -n ${title}`)
            message.channel.send(noteEmbed)
        }).catch((err) => {
            console.log(err)
            message.channel.send('Failed to save the note')
        })
    },
    permissions: [],
    requiredRoles: [],
}
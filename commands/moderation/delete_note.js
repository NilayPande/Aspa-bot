const Note = require('../../schemas/NoteSchema.js')
module.exports = {
    commands: ['cln', 'del_note', 'deln'],
    expectedArgs: '<note-name>',
    minArgs: 1,
    callback: (message, args, text, Discord) => {
        text.trim()
        const reg = '^' + text + '$'
        const s = new RegExp(reg, "gi")
        Note.findOneAndDelete({ title: { $regex: s } }, function(err, res) {
            if (err)
                console.log(err)
            else {
                if (res === null)
                    return message.lineReply(`Note \`${text}\` not found! Please enter the exact title of the note`)
                const noteEmbed = new Discord.MessageEmbed()
                    .setColor('ff2934')
                    .setTitle(res.title)
                    .setDescription(res.note)
                message.channel.send(noteEmbed)
                console.log(res.note)
                message.channel.send(`This note has been deleted successfully`)
            }
        })
    },
    permissions: [],
    requiredRoles: [],
}
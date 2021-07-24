const Note = require('../../schemas/NoteSchema.js')
const { MessageMentions } = require('discord.js')
module.exports = {
    commands: ['n'],
    expectedArgs: '<note-name>',
    callback: async(message, args, text, Discord) => {

        if (text === null || text === "")
            return message.lineReply('Incorrect syntax! Use -n <note-name>')

        if (text == 'all') {
            const allNotes = await Note.find({})
            let str = ""
            for (const i in allNotes)
                str = str + "> " + (parseInt(i) + 1) + ". " + allNotes[i].title + "\n"
            return message.channel.send('**__Notes__**\n\n' + str)
        }

        let mention
        const regex = MessageMentions.USERS_PATTERN
        if (regex.test(text)) {
            let arr = text.match(regex)
            mention = arr[0]
            text = text.replace(regex, "")
        } else
            mention = '<@' + message.author.id + '>'

        text = text.trim()
        const reg = '\\W*(\\b' + text + '\\b)\\W*'
        const s = new RegExp(reg, "gi")
        const note = await Note.findOne({ title: { $regex: s } }).exec()
        if (note === null)
            return message.lineReply(`No note with the name \`${text}\` found!`)
        const noteEmbed = new Discord.MessageEmbed()
            .setColor('3ba0ff')
            .setTitle(note.title)
            .setDescription(note.note)
        message.delete()
        message.channel.send(`${mention}\n`, { embed: noteEmbed })
    },
    permissions: [],
    requiredRoles: [],
}
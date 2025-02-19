const User = require('../models/User');
require('dotenv').config();
const imagesRoleId = process.env.IMAGES_ROLE_ID;

module.exports = {
    name: 'messageCreate',
    async run(message) {
        if (message.author.bot || !message.member) return;

        let user = await User.findOne({ id: message.author.id });

        if (!user) {
            user = new User({ id: message.author.id });
        }

        user.stats.text++;

        if (user.stats.text >= 100 && !message.member.roles.cache.has(imagesRoleId)) {
            try {
                message.member.roles.add(imagesRoleId);
                message.reply('Niveau de difficulté : Avancée\nDémarrage du niveau 2');
            } catch {}
        }

        user.save();

        if (message.content.includes('<@1332663944732479540>')) {
            message.reply('Current prefix: `/`\nType `/help` for more informations')
        }

        if (message.channel.id === '1333876095593746556') {
            try {
                await message.react(message.guild.emojis.cache.find((emoji) => emoji.name === 'yes').id);
                await message.react(message.guild.emojis.cache.find((emoji) => emoji.name === 'no').id);
            } catch {}
        }
    }
}
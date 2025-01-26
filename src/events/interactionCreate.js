const answerCommand = require('../utils/answerCommand');
const openTicket = require('../utils/openTicket');
const closeTicket = require('../utils/closeTicket');

module.exports = {
    name: 'interactionCreate',
    run(interaction, client) {
        if (interaction.isChatInputCommand()) {
            answerCommand(interaction, client);
        } else if (interaction.isButton()) {
            switch (interaction.customId) {
                case 'open-ticket':
                    openTicket(interaction);
                    break;
                case 'close-ticket':
                    closeTicket(interaction);
                    break;
            }
        }
    }
}
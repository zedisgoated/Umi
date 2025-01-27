const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require("discord.js");
const date = require('date-and-time');
const { ActionRowBuilder } = require("@discordjs/builders");

module.exports = {
    permissions: [],
    usage: 'ticket-setup [channel]',
    data: new SlashCommandBuilder()
        .setName('ticket-setup')
        .setDescription('Setup the ticket system')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addChannelOption(option =>
            option
                .setName('channel')
                .setDescription('The channel where the ticket system will be set up')
        ),
    async run(interaction, client) {
        const channel = interaction.options.getChannel() || interaction.channel;

        try {
            await channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('Tickets')
                        .setDescription('🇬🇧 Click on the button below to contact support\n🇫🇷 Cliquez sur le bouton ci-dessous pour contacter le support')
                        .setColor('#5dade2')
                        .setFooter({
                            iconURL: client.user.displayAvatarURL(),
                            text: 'Please be patient and do not ping staff!'
                        })
                        
                ],
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('open-ticket')
                                .setEmoji('📨')
                                .setLabel('Contact support')
                                .setStyle(ButtonStyle.Primary)
                        )
                ]
            });

            interaction.reply({
                content: `Ticket system has been successfully set up in ${channel}!`,
                flags: MessageFlags.Ephemeral
            });
        } catch (err) {
            interaction.reply({
                content: `Could NOT open ticket in channel ${channel}!\nPlease check my permissions`,
                flags: MessageFlags.Ephemeral
            });

            console.log(err);
        }
    }
}
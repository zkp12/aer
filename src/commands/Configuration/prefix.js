const { Command } = require('klasa');
const { Permissions: { FLAGS } } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			enabled: true,
			runIn: ['text'],
			aliases: ['pre'],
			description: language => language.get('COMMAND_PREFIX_DESCRIPTION'),
			usage: '<new  prefix:string{1,100}>'
		});

		this.defaultPermissions = FLAGS.MANAGE_SERVER;
	}

	async run(msg, [prefix]) {
		await msg.guild.settings.update('prefix', prefix);
		return msg.responder.success(msg.language.get('COMMAND_PREFIX_SUCCESS', prefix));
	}

};

const { Command } = require('klasa');
const { Permissions: { FLAGS }, MessageEmbed } = require('discord.js');
const { POSITIVE } = require('../../../../lib/util/constants').color;

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			enabled: true,
			runIn: ['text'],
			requiredPermissions: ['BAN_MEMBERS'],
			aliases: ['uw', 'pardon', 'warnremove'],
			description: language => language.get('COMMAND_UNWARN_DESCRIPTION'),
			usage: '<user:member> <ids:string> [reason:...string]',
			usageDelim: ' '
		});

		this.defaultPermissions = FLAGS.BAN_MEMBERS;
	}

	async run(msg, [member, id, reason = msg.language.get('COMMAND_UNWARN_NOREASON')]) {
		const warnings = this.getWarns(member, id);
		member.settings.update('warnings', warnings, { arrayAction: 'overwrite' });
		msg.responder.success();
		const options = {
			user: member.user,
			reason,
			moderator: msg.author
		};
		msg.guild.log.unwarn(options);
	}

	getWarns(member, ids) {
		const warnings = member.settings.get('warnings');
		if (!warnings.length) return [];
		const range = /^(?<start>\d)-(?<end>\d)$/;
		const multiple = /^(\d,)+\d$/
		if (ids === 'all') {
			warnings.forEach(warn => warn.active = false);
			return warnings;
		}
		if (range.test(ids)) {
			const { start, end } = range.exec(ids).groups;
			const updated = warnings.splice(start - 1, end - start + 1);
			updated.forEach(warn => warn.active = false);
			return [...updated, ...warnings];
		}
		if (multiple.test(ids)) {
			ids = ids.split(',').map(id => parseInt(id));
			warnings.forEach((warn, idx) => { if (ids.includes(idx + 1)) warn.active = false });
			return warnings;
		}
		if (!Number.isNaN(parseInt(ids)) && warnings[ids - 1]) {
			warnings[ids - 1].active = false;
			return warnings;
		}
		throw 'Invalid id or ids';
	}


};

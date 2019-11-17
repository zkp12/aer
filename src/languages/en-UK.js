const { Language, util } = require('klasa');
const { bold, code, underline } = require('discord-md-tags');
const { error, success, unspecified } = require('../../lib/util/constants').emojis;

module.exports = class extends Language {

	constructor(...args) {
		super(...args);
		this.language = {

			DEFAULT: (key) => `${key} has not been localised for en-UK yet.`,
			DEFAULT_LANGUAGE: 'Default Language',
			PREFIX_REMINDER: (prefix = `@${this.client.user.tag}`) => `The prefix${Array.isArray(prefix)
				? `es for this guild are: ${prefix.map(pre => `\`${pre}\``).join(', ')}`
				: ` in this guild is set to: \`${prefix}\``
				}`,

			ERROR_GENERIC: (error) => `An error occurred: ${error}`,

			ACTIVITY_PLAYING: 'Playing',
			ACTIVITY_LISTENING: 'Listening to',
			ACTIVITY_STREAMING: 'Streaming',

			MESSAGE_PROMPT_TIMEOUT: 'The prompt has timed out.',
			TEXT_PROMPT_ABORT_OPTIONS: ['abort', 'stop', 'cancel'],

			// conf commands
			COMMAND_PERMS_DESCRIPTION: 'Configures usage permission of specific commands for a particular user, roles, or for everyone.',
			COMMAND_PERMS_HELP: prefix => [
				bold`Permission Nodes`,
				`This permission system is ${bold`node based`}, allowing complete control over what commands users and roles can use.`,
				`Permissions have 3 levels: ${bold`User, Role, Everyone`}. Nodes take priority in that order.`,
				'',
				bold`Nodes`,
				`Nodes are represented by ${code`<category>.<command>`}, such as ${code`general.ping`}.`,
				`You can also use wildcards such as ${code`<category>.*`} which includes all commands in the category, and ${code`*`} which includes all commands,`,
				'',
				bold`Examples`,
				`Allow ravy to use the ban command: ${code`${prefix}perms allow @ravy mod.ban`}`,
				`Disallow dragonblitz10 from using all configuration commands: ${code`${prefix}perms remove @dragonblitz10 configuration.*`}`,
				`Allow admins to use all commands: ${code`${prefix}perms allow @Admins *`}`
			],
			COMMAND_PERMS_MISSING: 'Invalid usage: expecting a target and a permission.',
			COMMAND_PERMS_SUCCESS_ALLOW: (permission, target) => `Granted ${code`${permission}`} to ${target.displayName || target.username || target}`,
			COMMAND_PERMS_SUCCESS_DENY: (permission, target) => `Denied ${code`${permission}`} from ${target.displayName || target.username || target}`,
			COMMAND_PERMS_SUCCESS_REMOVE: (permission, target) => `Unset ${code`${permission}`} for ${target.displayName || target.username || target}`,
			COMMAND_PERMS_SUCCESS_CLEAR: 'Cleared permission entries.',
			COMMAND_LOG_DESCRIPTION: [
				'Configures logging. Possible types:',
				'• messages',
				'• moderation',
				'• members'
			],
			COMMAND_LOG_REASON: 'Initialising logging',
			COMMAND_LOG_SUCCESS: (type, channel) => `Now logging ${bold`${type}`} in ${channel}.`,
			COMMAND_LOG_DISPLAY_NOCHANNEL: type => `Not logging ${bold`${type}`}.`,
			COMMAND_LOG_DISPLAY_ONE: (type, channel) => `Currently logging ${bold`${type}`} in ${channel}.`,
			COMMAND_ANTI_DESCRIPTION: 'Configures auto moderation settings.',
			COMMAND_ANTI_DISPLAY_ONE: (type, enabled) => `**Anti-${type}** is currently **${enabled ? 'enabled' : 'disabled'}**.`,
			COMMAND_ANTI_NOTYPE: 'No auto moderation type specified.',
			COMMAND_ANTI_SUCCESS: (type, enabled, users) => `Successfully **${enabled ? 'enabled' : 'disabled'}** filtering **${type}**${users ? ' users' : ''}.`,
			COMMAND_EXEMPT_DESCRIPTION: 'Exempt a user/role/channel from being filtered by automod.',
			COMMAND_UNEXEMPT_DESCRIPTION: 'Removes the exemption of a user/role/channel from automod.',
			COMMAND_RAID_DESCRIPTION: 'Configures raid prevention settings.',
			COMMAND_RAID_HOWTO: (username, prefix) => [
				`${username} features **automatic raid prevention**.`,
				'This includes a global ban system powered by <https://api.ksoft.si> and various detection techniques.',
				"Though, we will never ban anyone without your okay. Thus, you'll have to define a channel where we can ask you.",
				`This is easily done using ${code`${prefix}raid <channel>`}.`,
				'That channel will then receive all updates and prompts upon raids.'
			],
			COMMAND_RAID_SUCCESS: channel => `Raid prevention is now **enabled**. Logging raid attempts in ${channel}.`,
			COMMAND_RAID_DISABLE: 'Raid prevention is now **disabled**.',
			COMMAND_PREFIX_DESCRIPTION: 'Changes the prefix.',
			COMMAND_PREFIX_SUCCESS: prefix => `Updated this server's prefix to ${code`${prefix}`}.`,
			COMMAND_AUTOROLE_DESCRIPTION: 'Sets up an automatic role given to members upon join.',
			COMMAND_AUTOROLE_ADD: name => `Successfully added ${bold`${name}`} to automatically assigned roles.`,
			COMMAND_AUTOROLE_REMOVE: name => `Successfully removed ${bold`${name}`} from automatically assigned roles.`,
			COMMAND_AUTOROLE_DISABLE: `Successfully ${bold`disabled`} automatic assigning of roles.`,
			COMMAND_AUTOROLE_NOADDALL: `The ${code`all`} option can only be used when removing autoroles.`,
			COMMAND_AUTOROLE_NOROLE_ADD: 'You need to specify which role to add to be automatically assigned',
			COMMAND_AUTOROLE_NOROLE_REMOVE: 'You need to specify which role you don\'t want to be automatically assigned any longer',
			COMMAND_AUTOROLE_NOROLE_EXISTS: 'This role is already being automatically assigned',
			COMMAND_AUTOROLE_NOROLE_WRONG: 'This role isn\'t being automatically assigned',
			COMMAND_AUTOROLE_LIST: names => `Currently automatically assigning:\n${names}`,
			COMMAND_AUTOROLE_NOLIST: `Currently not automatically assigning any roles.`,
			COMMAND_BOTROLE_DESCRIPTION: 'Sets up an automatic role given to bots upon join.',
			COMMAND_BOTROLE_SET: name => `Now automatically assigning ${bold`${name}`} to bots.`,
			COMMAND_BOTROLE_DISABLE: 'No longer automatically assigning a role to bots.',
			COMMAND_BOTROLE_NONE: 'No bot role set up',
			COMMAND_BOTROLE_DISPLAY: `Bots are currently automatically assigned ${bold`${name}`} upon joining.`,

			// fun commands
			COMMAND_8BALL_DESCRIPTION: 'Magic 8-Ball, does exactly what the toy does.',
			COMMAND_8BALL_PROMPT: 'What would you like to ask the magic 8ball?',
			COMMAND_8BALL_ANSWERS,
			COMMAND_8BALL_NOQUESTION: "🎱 That doesn't look like a question, try again please.",
			COMMAND_BRAIN_DESCRIPTION: 'Generates an expanding brain meme from a group of sentences. Separate the sentences using commas.',
			COMMAND_CHOICE_DESCRIPTION: 'Makes a decision for you given some choices.',
			COMMAND_CHOICE_PROMPT: 'From what would you like me to choose from? Separate choices with a comma.',
			COMMAND_CHOICE_ONEOPTION: 'You only gave me one choice, dummy.',
			COMMAND_CHOICE_REPLY: choices => `I think you should go with "${choices[Math.floor(Math.random() * choices.length)]}"`,
			COMMAND_CHUCKNORRIS_DESCRIPTION: 'Sends a random Chuck Norris joke. (Powered by https://api.chucknorris.io)',
			COMMAND_COINFLIP_DESCRIPTION: 'Flips one or more coins',
			COMMAND_COINFLIP_REPLY_MULTIPLE: (coins, heads, tails) => `You flipped ${coins} coins. ${heads} ${heads === '1' ? 'was' : 'were'} heads, and ${tails} ${tails === '1' ? 'was' : 'were'} tails.`,
			COMMAND_COINFLIP_REPLY_SINGLE: heads => `You flipped ${heads ? 'Heads' : 'Tails'}.`,
			COMMAND_COLOR_NOCOLOR: 'You need to provide a valid colour to display.',
			COMMAND_COLOR_INVALIDCOLOR: 'You provided an invalid colour!',
			COMMAND_COLOR_DESCRIPTION: 'Outputs the chosen colour from hex.',
			COMMAND_KISS_DESCRIPTION: 'Kiss somebody you really like.',
			COMMAND_CUDDLE_SELF: user => `${user} cuddled themselves. How is that even possible.`,
			COMMAND_CUDDLE_SOMEONE: (from, to) => `${from} cuddled ${to}. How cute. 💕`,
			COMMAND_CUDDLE_DESCRIPTION: `Cuddle with someone! Please!`,
			COMMAND_HUG_SELF: user => `${user} hugged themselves. How awkward.`,
			COMMAND_HUG_SOMEONE: (from, to) => `${from} hugged ${to}. How cute. 💕`,
			COMMAND_HUG_DESCRIPTION: 'Give someone a hug! Yes. Be nice.',
			COMMAND_KISS_SELF: user => `${user} kissed themselves. I have no idea how and why.`,
			COMMAND_KISS_SOMEONE: (from, to) => `${from} gave ${to} a kiss. How cute. 💕`,
			COMMAND_PAT_SELF: user => `Aww ${user}, I see you are lonely, take a pat <3`,
			COMMAND_PAT_SOMEONE: (from, to) => `${to} you have been patted by ${from}.`,
			COMMAND_PAT_DESCRIPTION: 'Pats the specified user.',
			COMMAND_FEED_SELF: user => `${user} is feeding him self.`,
			COMMAND_FEED_SOMEONE: (from, to) => `${from} is feeding ${to}.`,
			COMMAND_FEED_DESCRIPTION: 'feed yourself or someone',
			COMMAND_TICKLE_SELF: user => `${user} is tickling himself.`,
			COMMAND_TICKLE_SOMEONE: (from, to) => `${from} is tickling ${to}.`,
			COMMAND_TICKLE_DESCRIPTION: 'tickle someone or yourself',
			COMMAND_PUN_DESCRIPTION: 'Sends a random pun. (Powered by http://icanhazdadjoke.com)',
			COMMAND_PUN_APIDOWN: 'The API appears to be down. Try again later!',
			COMMAND_PUN_REPLY: pun => `Random pun: **${pun}**`,
			COMMAND_RATE_DESCRIPTION: 'Rates the mentioned user.',
			COMMAND_RATE_REPLY: (user, percentage) => `I rate ${user} **${percentage}/100**!`,
			COMMAND_URBAN_DESCRIPTION: 'Searches the urban dictionary for the definition to a search term.',
			COMMAND_URBAN_MISSINGTERM: 'What would you like to search?',
			COMMAND_URBAN_MAX: length => `Invalid definition. Only found ${length} possible definitions.`,
			COMMAND_YOMAMMA_DESCRIPTION: 'Yo momma is so fat, yo.',

			// games
			COMMAND_GAME_CHALLENGE: user => `${user}, do you accept this challenge?`,
			COMMAND_GAME_OCCURING: 'Only one game may be occuring per channel.',
			COMMAND_GAME_NOBOTS: 'You cannot challenge bots',
			COMMAND_GAME_YOURSELF: 'You can\'t challenge yourself you loner.',
			COMMAND_GAME_DECLINED: 'Looks like they declined...',
			COMMAND_GAME_LOADING: 'Loading...',
			COMMAND_C4_DESCRIPTION: 'Play a game of connect 4.',
			COMMAND_C4_WIN: user => `🎉 The winner is <@${user}>!`,
			COMMAND_C4_MAXMOVES: 'No more possible moves. It\'s a draw!',
			COMMAND_C4_TIMEOUT: user => `Time up! <@${user}> loses.`,
			COMMAND_C4_COLLUMNFULL: user => `<@${user}>, that column is already full. Try again.`,
			COMMAND_C4_QUIT: user => `${user} has quit. They lose!`,

			// general commands
			COMMAND_TAG_DESCRIPTION: 'Allows you to create, remove or list tags (custom commands).',
			COMMAND_TAG_ADDED: (tag, content) => `Added the tag \`${tag}\` with content: \`\`\`${content}\`\`\``,
			COMMAND_TAG_REMOVED: tag => `Removed the tag \`${tag}\``,
			COMMAND_TAG_EMPTY: 'Please include what the tag is supposed to do',
			COMMAND_TAG_NOEXIST: tag => `The tag \`${tag}\` doesn't exist.`,
			COMMAND_TAG_NOTAGS: "There don't appear to be any tags configured.",
			COMMAND_TAG_EXISTS: 'This tag already exists.',

			// misc commands
			COMMAND_INFO_DESCRIPTION: 'Get information about a user, role, the server, or this bot.',
			COMMAND_INFO_USER_DISCORDJOIN: (joinedAt, joinDuration) => `Joined Discord on ${joinedAt} (${joinDuration} ago)`,
			COMMAND_INFO_USER_GUILDJOIN: (guild, joinedAt, joinDuration) => `\nJoined ${guild} on ${joinedAt} (${joinDuration} ago)`,
			COMMAND_INFO_USER_GUILDRCEATE: (guild, createdAt, createdDuration) => `\nCreated ${guild} on ${createdAt} (${createdDuration} ago)`,
			COMMAND_INFO_USER_NOROLES: 'none',
			COMMAND_INFO_BOT: () => [
				`${this.client.user.username} is a bot for intuitive community management.`,
				'',
				'It features 🛠 extensive moderation, 🎮 fun games, and a lot of other useful things.',
				`If you have a cool idea, feel free to share it on our [support server](${this.client.config.supportServer}) or directly [PR it](${this.client.config.repoURL}).`,
				'',
				`If you like what we're doing, please share ${this.client.user.username} with your pals!`,
				`Thank you for using ${this.client.user.username} ♥`
			],
			COMMAND_INFO_USER_KSOFTBANNED: (reason, proof) => `${error} ${bold`Banned`} on KSoft.Si for ${code`${reason}`} [[proof](${proof})]`,
			COMMAND_INFO_USER_DREPBANNED: (reason) => `${error} ${bold`Banned`} on DiscordRep for ${code`${reason}`}`,
			COMMAND_INFO_USER_DSERVICESBANNED: (reason, proof) => `${error} ${bold`Banned`} on Discord.Services for ${code`${reason}`} [[proof](${proof})]`,
			COMMAND_INFO_USER_CWBANNED: (reason) => `${error} ${bold`Blacklisted`} on ChatWatch for ${code`${reason}`}`,
			COMMAND_INFO_USER_KSOFTCLEAN: `${success} Not banned on KSoft.Si`,
			COMMAND_INFO_USER_DREPCLEAN: `${success} Not banned on DiscordRep`,
			COMMAND_INFO_USER_DSERVICESCLEAN: `${success} Not banned on Discord.Services`,
			COMMAND_INFO_USER_CWCLEAN: `${success} Not blacklisted on ChatWatch`,
			COMMAND_INFO_USER_DREPSCORE: (score, int) => `${int === 0 ? unspecified : int < 0 ? error : success} Reputation of ${bold`${score.toString()}`} on DiscordRep`,
			COMMAND_INFO_USER_CWSCORE: (score) => `${score === 50 ? unspecified : score > 50 ? error : success} Spam likeliness of ${bold`${score.toString()}%`} on ChatWatch`,
			COMMAND_HASTEBIN_DESCRIPTION: 'Upload code or text to hastebin.',

			// social commands
			COMMAND_DAILY_DESCRIPTION: 'Claim your daily points! Add --reminder to be reminded in 12h.',
			COMMAND_DAILY_COOLDOWN: time => `You've already collected your daily reward. You can collect it again in ${time}`,
			COMMAND_DAILY_REMINDER: 'Collect daily reward.',
			COMMAND_DAILY_REPLY: 'You succesfully collected your daily reward!',
			COMMAND_PROFILE_DESCRIPTION: 'Shows a profile card of a user.',
			COMMAND_PROFILE_NOTMEMBER: "That user isn't in the server!",
			COMMAND_SOCIAL_DESCRIPTION: 'Configure the economy system of your server, and toggle level up messages.',
			COMMAND_SOCIAL_TOGGLE_SOCIAL: enabled => `There, **${enabled ? 'enable' : 'disable'}d** the economy system in this server.`,
			COMMAND_SOCIAL_TOGGLE_LEVELS: enabled => `There, level up messages in this server are now **${enabled ? 'enable' : 'disable'}d**.`,
			COMMAND_SOCIAL_STATUS: enabled => `The economy system is **${enabled ? 'enable' : 'disable'}d** in this server.`,

			// mod commands
			COMMAND_BAN_DESCRIPTION: [
				'Bans one or more users with an optional timeframe and reason.',
				"Specify p[urge] before the reason to purge the user(s)'s last 24h of messages.",
				"Specify s[oft] before the reason to purge the user(s)'s last 24h of messages and unban them again (commonly referred to as a softban)."
			],
			COMMAND_BAN_NOPERMS: multiple => `You cannot ban ${multiple ? 'any of the specified users' : 'the specified user'}.`,
			COMMAND_BAN_SOFTBANRELEASED: 'softban released',
			COMMAND_BAN_CONFLICT: "You can't softban and tempban at the same time.",
			COMMAND_BAN_NOREASON: 'no reason specified',
			COMMAND_BAN_TEMPBANRELEASED: 'temporary ban released',
			COMMAND_KICK_DESCRIPTION: 'Kicks one or more users with an optional reason.',
			COMMAND_KICK_NOPERMS: multiple => `You cannot kick ${multiple ? 'any of the specified users' : 'the specified user'}.`,
			COMMAND_KICK_NOREASON: 'no reason specified',
			COMMAND_MUTE_DESCRIPTION: 'Mutes one or more users with an optional reason.',
			COMMAND_MUTE_NOPERMS: multiple => `You cannot mute ${multiple ? 'any of the specified users' : 'the specified user'}.`,
			COMMAND_MUTE_NOREASON: 'no reason specified',
			COMMAND_MUTE_ROLE_DEFAULT: 'Silenced',
			COMMAND_MUTE_ROLE_REASON: 'Initialising mute functionality.',
			COMMAND_MUTE_TEMPMUTERELEASED: 'temporary mute released',
			COMMAND_UNBAN_DESCRIPTION: 'Removes the ban(s) for one or more users.',
			COMMAND_UNBAN_NOPERMS: multiple => `You cannot unban ${multiple ? 'any of the specified users' : 'the specified user'}.`,
			COMMAND_UNBAN_NOREASON: 'no reason specified',
			COMMAND_UNMUTE_DESCRIPTION: 'Removes the mute(s) for one or more users.',
			COMMAND_UNMUTE_NOPERMS: multiple => `You cannot unmute ${multiple ? 'any of the specified users' : 'the specified user'}.`,
			COMMAND_UNMUTE_NOREASON: 'no reason specified',
			COMMAND_WARN_DESCRIPTION: 'Warn one or more users for their actions.',
			COMMAND_WARN_NOREASON: 'no reason specified',
			COMMAND_WARN_WARNED: reason => `You've been warned for: ${bold`${reason}`}`,
			COMMAND_WARN_MODERATOR: tag => `Moderator: ${tag}`,
			COMMAND_LOCK_DESCRIPTION: 'Denies users from writing messages in a channel.',
			COMMAND_LOCK_REASON: 'Channel locked.',
			COMMAND_UNLOCK_DESCRIPTION: 'Re-allows users to write messages in a channel.',
			COMMAND_UNLOCK_REASON: 'Channel unlocked.',
			COMMAND_UNWARN_DESCRIPTION: 'Warn one or more users for their actions.',
			COMMAND_UNWARN_NOREASON: 'no reason specified',
			COMMAND_UNWARN_UNWARNED: (reason, pardon) => `Your warn for ${bold`${reason}`} has been pardoned for: ${bold`${pardon}`}`,
			COMMAND_UNWARN_MODERATOR: tag => `Moderator: ${tag}`,

			// core commands
			COMMAND_BLACKLIST_DESCRIPTION: 'Blacklists or un-blacklists users and guilds from the bot.',
			COMMAND_BLACKLIST_SUCCESS: (usersAdded, usersRemoved, guildsAdded, guildsRemoved) => [
				usersAdded.length ? `**Users Added**\n${util.codeBlock('', usersAdded.join(', '))}` : '',
				usersRemoved.length ? `**Users Removed**\n${util.codeBlock('', usersRemoved.join(', '))}` : '',
				guildsAdded.length ? `**Guilds Added**\n${util.codeBlock('', guildsAdded.join(', '))}` : '',
				guildsRemoved.length ? `**Guilds Removed**\n${util.codeBlock('', guildsRemoved.join(', '))}` : ''
			].filter(val => val !== '').join('\n'),
			COMMAND_EVAL_DESCRIPTION: 'Evaluates arbitrary Javascript. Reserved for bot owner.',
			COMMAND_EVAL_EXTENDEDHELP: [
				'The eval command evaluates code as-in, any error thrown from it will be handled.',
				'It also uses the flagArgs feature. Write --silent, --depth=number or --async to customise the output.',
				'• The --silent flag will make it output nothing.',
				"• The --depth flag accepts a number, for example, --depth=2, to customise util.inspect's depth.",
				'• The --async flag will wrap the code into an async function where you can enjoy the use of await, however, if you want to return something, you will need the return keyword.',
				'• The --showHidden flag will enable the showHidden option in util.inspect.',
				'If the output is too large, it\'ll send the output as a file, or in the console if the bot does not have the ATTACH_FILES permission.'
			].join('\n'),
			COMMAND_EVAL_ERROR: (time, output, type) => `**Error**:${output}\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_OUTPUT: (time, output, type) => `**Output**:${output}\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_SENDFILE: (time, type) => `Output was too long... sent the result as a file.\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_SENDCONSOLE: (time, type) => `Output was too long... sent the result to console.\n**Type**:${type}\n${time}`,
			COMMAND_UNLOAD: (type, name) => `Unloaded ${type}: ${name}`,
			COMMAND_UNLOAD_DESCRIPTION: 'Unloads the klasa piece.',
			COMMAND_UNLOAD_WARN: 'You probably don\'t want to unload that, since you wouldn\'t be able to run any command to enable it again',
			COMMAND_TRANSFER_ERROR: 'That file has been transfered already or never existed.',
			COMMAND_TRANSFER_SUCCESS: (type, name) => `Successfully transferred ${type}: ${name}.`,
			COMMAND_TRANSFER_FAILED: (type, name) => `Transfer of ${type}: ${name} to Client has failed. Please check your Console.`,
			COMMAND_TRANSFER_DESCRIPTION: 'Transfers a core piece to its respective folder.',
			COMMAND_RELOAD: (type, name, time) => `Reloaded ${type}: ${name}. (Took: ${time})`,
			COMMAND_RELOAD_FAILED: (type, name) => `Failed to reload ${type}: ${name}. Please check your Console.`,
			COMMAND_RELOAD_ALL: (type, time) => `Reloaded all ${type}. (Took: ${time})`,
			COMMAND_RELOAD_EVERYTHING: (time) => `Reloaded everything. (Took: ${time})`,
			COMMAND_RELOAD_DESCRIPTION: 'Reloads a klasa piece, or all pieces of a klasa store.',
			COMMAND_REBOOT: 'Rebooting...',
			COMMAND_REBOOT_DESCRIPTION: 'Reboots the bot.',
			COMMAND_LOAD: (time, type, name) => `Successfully loaded ${type}: ${name}. (Took: ${time})`,
			COMMAND_LOAD_FAIL: 'The file does not exist, or an error occurred while loading your file. Please check your console.',
			COMMAND_LOAD_ERROR: (type, name, error) => `Failed to load ${type}: ${name}. Reason:${util.codeBlock('js', error)}`,
			COMMAND_LOAD_DESCRIPTION: 'Load a piece from your bot.',
			COMMAND_PING: 'Ping?',
			COMMAND_PING_DESCRIPTION: 'Runs a connection test to Discord.',
			COMMAND_PINGPONG: (diff, ping) => `Pong! (Roundtrip took: ${diff}ms. Heartbeat: ${ping}ms.)`,
			COMMAND_INVITE: () => [
				`To add ${this.client.user.username} to your discord guild:`,
				`<${this.client.invite}>`,
				util.codeBlock('', [
					'The above link is generated requesting the minimum permissions required to use every command currently.',
					"I know not all permissions are right for every guild, so don't be afraid to uncheck any of the boxes.",
					'If you try to use a command that requires more permissions than the bot is granted, it will let you know.'
				].join(' '))
			],
			COMMAND_INVITE_SUCCESS: (name, invite, discord) => `[Invite ${name}](${invite}) | [Support Server](${discord})`,
			COMMAND_INVITE_DESCRIPTION: 'Displays the invite link of the bot, to invite it to your guild.',
			COMMAND_HELP_DESCRIPTION: 'Display help for a command.',
			COMMAND_HELP_SERVERONLY: 'Server only',
			COMMAND_HELP_FOOTER: prefix => `for more help run ${prefix}help usage`,
			COMMAND_HELP_USAGE: prefix => [
				'Information about every command can be gathered directly in discord, without needing to open a command page.',
				`To get a short overview of a specific command, you just run ${code`${prefix}help { Command }`}`,
				'',
				'Understanding the usage section of this is easy too:',
				`curly brackets ${code`{}`} indicate a required argument, square brackets ${code`[]`} an optional argument.`
			],
			COMMAND_ENABLE: (type, name) => `+ Successfully enabled ${type}: ${name}`,
			COMMAND_ENABLE_DESCRIPTION: 'Re-enables or temporarily enables a command/inhibitor/monitor/finaliser. Default state restored on reboot.',
			COMMAND_DISABLE: (type, name) => `+ Successfully disabled ${type}: ${name}`,
			COMMAND_DISABLE_DESCRIPTION: 'Re-disables or temporarily disables a command/inhibitor/monitor/finaliser/event. Default state restored on reboot.',
			COMMAND_DISABLE_WARN: 'You probably don\'t want to disable that, since you wouldn\'t be able to run any command to enable it again',
			COMMAND_CONF_NOKEY: 'You must provide a key',
			COMMAND_CONF_NOVALUE: 'You must provide a value',
			COMMAND_CONF_GUARDED: (name) => `${util.toTitleCase(name)} may not be disabled.`,
			COMMAND_CONF_UPDATED: (key, response) => `Successfully updated the key **${key}**: \`${response}\``,
			COMMAND_CONF_KEY_NOT_ARRAY: 'This key is not array type. Use the action \'reset\' instead.',
			COMMAND_CONF_GET_NOEXT: (key) => `The key **${key}** does not seem to exist.`,
			COMMAND_CONF_GET: (key, value) => `The value for the key **${key}** is: \`${value}\``,
			COMMAND_CONF_RESET: (key, response) => `The key **${key}** has been reset to: \`${response}\``,
			COMMAND_CONF_NOCHANGE: (key) => `The value for **${key}** was already that value.`,
			COMMAND_CONF_SERVER_DESCRIPTION: 'Define per-guild settings.',
			COMMAND_CONF_SERVER: (key, list) => `**Guild Settings${key}**\n${list}`,
			COMMAND_CONF_USER_DESCRIPTION: 'Define per-user settings.',
			COMMAND_CONF_USER: (key, list) => `**User Settings${key}**\n${list}`,
			COMMAND_STATS: (name, memUsage, memTotal, memPercentage, cpuUsage, cpuCount, cpuSpeed, uptime, klasaVersion, discordVersion, processVersion, hostname, currentShard, totalShards) => [
				`${name} is currently using`,
				`• ${bold`${memPercentage}% of RAM`} (${memUsage} / ${memTotal} MB) and`,
				`• ${bold`${cpuUsage}% of CPU`} (${cpuCount}c @ ${cpuSpeed}GHz).`,
				"It's been running",
				`• for ${bold`${uptime}`} on ${bold`${hostname}`} (shard ${currentShard} / ${totalShards})`,
				`• using Node.js ${processVersion}, Discord.js v${discordVersion} and Klasa v${klasaVersion}.`
			],
			COMMAND_STATS_DESCRIPTION: 'Provides some details about the bot and stats.',

			// events
			EVENT_JOIN_PERSISTREASON: 'Role persistency - member had those roles before leaving.',
			EVENT_RAID_TITLE: (success, error) => [
				underline`Possible raid attempt detected.`,
				`React with ${success} to ban the users.`,
				`React with ${error} to mark this as a false alarm.`
			].join('\n'),
			EVENT_RAID_PREVENTED: 'Successfully prevented raid',
			EVENT_RAID_USERS_TITLE: 'Involved users',
			EVENT_RAID_BANREASON: 'Automatic raid prevention.',
			EVENT_GLOBALBAN_REASON: 'Globally banned user.',
			EVENT_AUTOROLE_REASON: 'Autorole - configured to be automatically assigned to each member upon joining.',
			EVENT_BOTROLE_REASON: 'Botrole - configured to be automatically assigned to each bot upon joining.',

			SETTING_GATEWAY_EXPECTS_GUILD: 'The parameter <Guild> expects either a Guild or a Guild Object.',
			SETTING_GATEWAY_VALUE_FOR_KEY_NOEXT: (data, key) => `The value ${data} for the key ${key} does not exist.`,
			SETTING_GATEWAY_VALUE_FOR_KEY_ALREXT: (data, key) => `The value ${data} for the key ${key} already exists.`,
			SETTING_GATEWAY_SPECIFY_VALUE: 'You must specify the value to add or filter.',
			SETTING_GATEWAY_KEY_NOT_ARRAY: (key) => `The key ${key} is not an Array.`,
			SETTING_GATEWAY_KEY_NOEXT: (key) => `The key ${key} does not exist in the current data schema.`,
			SETTING_GATEWAY_INVALID_TYPE: 'The type parameter must be either add or remove.',
			SETTING_GATEWAY_INVALID_FILTERED_VALUE: (piece, value) => `${piece.key} doesn't accept the value: ${value}`,
			RESOLVER_MULTI_TOO_FEW: (name, min = 1) => `Provided too few ${name}s. At least ${min} ${min === 1 ? 'is' : 'are'} required.`,
			RESOLVER_INVALID_BOOL: (name) => `${name} must be true or false.`,
			RESOLVER_INVALID_CHANNEL: (name) => `${name} must be a channel tag or valid channel id.`,
			RESOLVER_INVALID_CUSTOM: (name, type) => `${name} must be a valid ${type}.`,
			RESOLVER_INVALID_DATE: (name) => `${name} must be a valid date.`,
			RESOLVER_INVALID_DURATION: (name) => `${name} must be a valid duration string.`,
			RESOLVER_INVALID_EMOJI: (name) => `${name} must be a custom emoji tag or valid emoji id.`,
			RESOLVER_INVALID_FLOAT: (name) => `${name} must be a valid number.`,
			RESOLVER_INVALID_GUILD: (name) => `${name} must be a valid guild id.`,
			RESOLVER_INVALID_INT: (name) => `${name} must be an integer.`,
			RESOLVER_INVALID_LITERAL: (name) => `Your option did not match the only possibility: ${name}`,
			RESOLVER_INVALID_MEMBER: (name) => `${name} must be a mention or valid user id.`,
			RESOLVER_INVALID_MESSAGE: (name) => `${name} must be a valid message id.`,
			RESOLVER_INVALID_PIECE: (name, piece) => `${name} must be a valid ${piece} name.`,
			RESOLVER_INVALID_REGEX_MATCH: (name, pattern) => `${name} must follow this regex pattern \`${pattern}\`.`,
			RESOLVER_INVALID_ROLE: (name) => `${name} must be a role mention or role id.`,
			RESOLVER_INVALID_STRING: (name) => `${name} must be a valid string.`,
			RESOLVER_INVALID_TIME: (name) => `${name} must be a valid duration or date string.`,
			RESOLVER_INVALID_URL: (name) => `${name} must be a valid url.`,
			RESOLVER_INVALID_USER: (name) => `${name} must be a mention or valid user id.`,
			RESOLVER_STRING_SUFFIX: ' characters',
			RESOLVER_MINMAX_EXACTLY: (name, min, suffix) => `${name} must be exactly ${min}${suffix}.`,
			RESOLVER_MINMAX_BOTH: (name, min, max, suffix) => `${name} must be between ${min} and ${max}${suffix}.`,
			RESOLVER_MINMAX_MIN: (name, min, suffix) => `${name} must be greater than ${min}${suffix}.`,
			RESOLVER_MINMAX_MAX: (name, max, suffix) => `${name} must be less than ${max}${suffix}.`,
			REACTIONHANDLER_PROMPT: 'Which page would you like to jump to?',
			COMMANDMESSAGE_MISSING: 'Missing one or more required arguments after end of input.',
			COMMANDMESSAGE_MISSING_REQUIRED: (name) => `${name} is a required argument.`,
			COMMANDMESSAGE_MISSING_OPTIONALS: (possibles) => `Missing a required option: (${possibles})`,
			COMMANDMESSAGE_NOMATCH: (possibles) => `Your option didn't match any of the possibilities: (${possibles})`,
			// eslint-disable-next-line max-len
			MONITOR_COMMAND_HANDLER_REPROMPT: (tag, error, time, abortOptions) => `${tag} | **${error}** | You have **${time}** seconds to respond to this prompt with a valid argument. Type **${abortOptions.join('**, **')}** to abort this prompt.`,
			// eslint-disable-next-line max-len
			MONITOR_COMMAND_HANDLER_REPEATING_REPROMPT: (tag, name, time, cancelOptions) => `${tag} | **${name}** is a repeating argument | You have **${time}** seconds to respond to this prompt with additional valid arguments. Type **${cancelOptions.join('**, **')}** to cancel this prompt.`,
			MONITOR_COMMAND_HANDLER_ABORTED: 'Aborted',
			// eslint-disable-next-line max-len
			INHIBITOR_COOLDOWN: (remaining, guildCooldown) => `${guildCooldown ? 'Someone has' : 'You have'} already used this command. You can use this command again in ${remaining}.`,
			INHIBITOR_DISABLED_GUILD: 'This command has been disabled by an admin in this guild.',
			INHIBITOR_DISABLED_GLOBAL: 'This command has been globally disabled by the bot owner.',
			INHIBITOR_MISSING_BOT_PERMS: (missing) => `Insufficient permissions, missing: **${missing}**`,
			INHIBITOR_NSFW: 'You can only use NSFW commands in NSFW channels.',
			INHIBITOR_PERMISSIONS: 'You do not have permission to use this command.',
			INHIBITOR_REQUIRED_SETTINGS: (settings) => `The guild is missing the **${settings.join(', ')}** guild setting${settings.length !== 1 ? 's' : ''} and thus the command cannot run.`,
			INHIBITOR_RUNIN: (types) => `This command is only available in ${types} channels.`,
			INHIBITOR_RUNIN_NONE: (name) => `The ${name} command is not configured to run in any channel.`,
			INHIBITOR_DEPRECATED: (reason) => `**This command is currently globally disabled:** ${reason}`,

			LOG_ACTION_BAN: 'user banned',
			LOG_ACTION_UNBAN: 'user unbanned',
			LOG_ACTION_TEMPBAN: 'user temporarily banned',
			LOG_ACTION_TEMPBANEND: 'temporary ban released',
			LOG_ACTION_SOFTBAN: 'user softbanned',
			LOG_ACTION_GLOBALBAN: 'globally blacklisted user banned',
			LOG_ACTION_GLOBALUNBAN: 'global ban appealed',
			LOG_ACTION_BULKBAN: 'multiple users banned',
			LOG_ACTION_KICK: 'user kicked',
			LOG_ACTION_MUTE: 'user muted',
			LOG_ACTION_UNMUTE: 'user unmuted',
			LOG_ACTION_TEMPMUTE: 'user temporarily muted',
			LOG_ACTION_TEMPMUTEEND: 'temporary mute released',
			LOG_ACTION_WARN: 'user warned',
			LOG_ACTION_UNWARN: 'warning removed',

			LOG_ACTION_MESSAGEEDITED: 'message edited',
			LOG_ACTION_MESSAGEDELETED: 'message deleted',

			LOG_ACTION_MEMBERJOINED: 'member joined',
			LOG_ACTION_MEMBERLEFT: 'member left',

			LOG_ARGS_USER: (tag, mention, id) => `**user:**\n${tag} ${mention} [${id}]`,
			LOG_ARGS_MEMBER: (name, mention, id) => `**member:**\n${name} ${mention} [${id}]`,
			LOG_ARGS_USERS: users => `**users:**\n${users}`,
			LOG_ARGS_MODERATOR: (tag, mention, id) => `**moderator:**\n${tag} ${mention} [${id}]`,
			LOG_ARGS_REASON: reason => `**reason:**\n${reason}`,
			LOG_ARGS_DURATION: duration => `**duration:**\n${duration}`,
			LOG_ARGS_MESSAGE: (content, attachments) => `**message:**\n${content}${attachments.length ? `\n${attachments.join('\n')}` : ''}`,
			LOG_ARGS_MESSAGES: (oldContent, oldAttachments, newContent, newAttachments) => [
				'**before:**',
				oldContent,
				oldAttachments.length
					? oldAttachments.join('\n')
					: null,
				'**after:**',
				newContent,
				newAttachments.length
					? newAttachments.join('\n')
					: null
			].filter(item => item !== null).join('\n'),

			LEVEL_MESSAGES

		};
	}

};

const COMMAND_8BALL_ANSWERS = [
	'Maybe.',
	'Certainly not.',
	'I hope so.',
	'Not in your wildest dreams.',
	'There is a good chance.',
	'Quite likely.',
	'I think so.',
	'I hope not.',
	'I hope so.',
	'Never!',
	'Fuhgeddaboudit.',
	'Ahaha! Really?!?',
	'Pfft.',
	'Sorry, bucko.',
	'Hell, yes.',
	'Hell to the no.',
	'The future is bleak.',
	'The future is uncertain.',
	'I would rather not say.',
	'Who cares?',
	'Possibly.',
	'Never, ever, ever.',
	'There is a small chance.',
	'Yes!'
];

const LEVEL_MESSAGES = [
	"Hey, **{user}**, you levelled up! You're now level {level}!",
	"You've been doing excellent, **{user}**. Here's a level up! You're now level {level}!",
	"Oh come on, you're not hacking, are you **{user}**? You're level {level} already!",
	"Oh, how time flies, **{user}**. You're already level {level}!",
	"It's a bird! No, it's a plane! No, it's a level up! **{user}**, you're now level {level}!"
];

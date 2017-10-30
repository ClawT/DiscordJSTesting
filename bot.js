const Discord = require("discord.js");
const config = require("./config.json");
const Commando = require("discord.js-commando");
const path = require("path");

const client = new Commando.Client({
	owner: config.owner,
	commandPrefix: "djs> ",
	unknownCommandResponse: false
});

client.registry
.registerGroups([
	["lol", "Random stuff"]
])
.registerDefaults()
.registerCommandsIn(path.join(__dirname, "commands"));

client.on("ready", () => {
	console.log(`Ready- Logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
	client.user.setPresence({
		game: {
			name: "Canvas",
			url: "https://twitch.tv/."
		}
	});
});

client.login(config.bot_token);

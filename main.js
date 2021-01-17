import { createRequire } from 'module';
import {PythonShell} from 'python-shell';

const require = createRequire(import.meta.url);

const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');
const { createWriteStream } = require('fs');
const {exec} = require("child_process")

const groovyId = '234395307759108106' // ID for the Groovy Bot user.
const helpEmbed = initEmbed(); // Loads the MesageEmbed for the help command.

let userAudio = 0; // BitStream representing the recording of the user's singing.
let botAudio = 0;  // BitStream representing the recording of the bot's music.
let userAudioStream = 0; //FileStream that saves the BitStream for the user recording to a file.
let botAudioStream = 0; //FileStream that saves the BitStream for the bot recording to a file.

client.login(token);

/** 
 * 
 * Called when the client is ready to accept events. 
 * 
 */
client.once('ready', () => {
	console.log('Bot is ready!');

});


/** 
 * 
 * Called when a message is sent in any channel 
 * 
 */
client.on('message', async message => {
	// Checks if the command is inputted correctly
	if ((message.content.startsWith(prefix) == false) || message.author.bot == true){
        return;
	} 

	// The voice channel the user who 
    // entered the command is currently in
	const { voice } = message.member;

	// Checks if the user is currently in a voice channel.
	if (!voice.channelID) {
		message.reply('You are not in a voice channel!');
		return;
	}
	
	// Take the argumnets given in the command and cut them up.
    let args = message.content.slice(prefix.length).trim().split('~');
    let command = args.shift().toLowerCase();

	// Start command
	if (command == 'start') {
		message.channel.send("Recording started!")

		let connection = await voice.channel.join(); // Lets bot join the voice channel
		userAudio = connection.receiver.createStream(message.member, {mode: 'pcm',  end: 'manual'}); // Starts recording the singer
		botAudio = connection.receiver.createStream(message.guild.members.cache.get('234395307759108106'), {mode: 'pcm', end: 'manual'}) // Starts recording the bot

		userAudioStream = createWriteStream('./audio/audio_user_recording') // Create write-stream for user recording.
		botAudioStream = createWriteStream('./audio/audio_bot_recording') // Create write-stream for bot recording.

		userAudio.pipe(userAudioStream); // Writes the recording of the user to the disk.
		botAudio.pipe(botAudioStream); // Writes the recording of the bot to the disk.

		// Play dummy audio to fix issue #2929: https://github.com/discordjs/discord.js/issues/2929
		const dispatcher = connection.play('./audio/pacman.mp3');  
	
		// Prints a message when the dummy track starts
		dispatcher.on('start', () => {
			console.log('Dummy sound started!');
		
		});

		// Prints a message when the dummy track stops
		dispatcher.on('finish', () => {
			console.log('Dummy sound stopped!');
		
		});	

		//writing to json file
		const fs = require('fs');

		let info = { 
			name: args[0],
			song: args[1]
		};

		fs.writeFile("info.json",JSON.stringify(info, null, 4), err =>{
			if (err) throw err;
			message.channel.send("Data written to file");
		});

	// Stop command
	} else if(command == 'stop') {
		await userAudio.unpipe(userAudioStream); // Writes the recording of the user to the disk.
		await botAudio.unpipe(botAudioStream); // Writes the recording of the bot to the disk.
		message.channel.send("Recording stopped! Analysing data...")

		// Calls main.py and also prints the results of the python execution
		var spawn = require("child_process").spawn; 
		var process = await spawn('python',["main.py"] ); 
		let { pitch, lyrics } = require('./results.json');
		message.channel.send(`**Pitch Accuracy:** ${pitch}%\n**Lyrical Accuracy:** ${lyrics}%`);

        // PythonShell.run('main.py', null, null).end( () => {
		// 	console.log('Starting end()');		
		// 	let { pitch, lyrics } = require('./results.json');
		// 	message.channel.send(`**Pitch Accuracy:** ${pitch}%\n**Lyrical Accuracy:** ${lyrics}%`);	
		//  } );

		// exec("python main.py", (error, stdout, stderr) => {
		// 	if (error) {
		// 		console.log(`error: ${error.message}`);
		// 		return;
		// 	}
		// 	if (stderr) {
		// 		console.log(`stderr: ${stderr}`);
		// 		return;
		// 	}
		// 	console.log(`stdout: ${stdout}`);

		// } )


	// Shutdown command
	} else if(command == 'shutdown' || command == 'quit') {
		message.channel.send('Shutting down bot :(');
		client.destroy();

	// Exit command
	} else if(command == 'exit' || command == 'dc'){
		message.channel.send('Disconnecting from vc :(');
		voice.channel.leave();

	// Help command
	} else if(command == "help" || command == "?") {
		message.channel.send(helpEmbed);

	} else
		return;

});
	
function initEmbed() {
	return new Discord.MessageEmbed()
	.setTitle('KaraokeBot - Help Menu')
	.setURL('https://github.com/SherRao/HackTheNorth2020-')
	.setThumbnail('https://github.com/SherRao/HackTheNorth2020-/blob/main/assets/img/mic.gif')
	.setFooter('Bot made by Nausher, Tarandeep, Austin, and Daner')

	.addFields( {name: '~start', value: 'Queues your song input for karaoke! \nFormat:~play~artist~song \nex. ~play~BLACKPINK~Whistle', inline: false}, )
	.addFields( {name: '~stop', value: 'Stops recording your song to calculate your karaoke score!', inline: false}, )
	.addFields( {name: '~exit', value: 'Removes karaoke bot from the voice channel \n :(', inline: false}, )
	.addFields( {name: '~shutdown', value: 'Shutdown bot from the server. \nBot shutting down...', inline: false}, )
	.addFields( {name: '~help', value: 'List of available commands', inline: false}, );
}
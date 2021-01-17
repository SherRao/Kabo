const Discord = require('discord.js');
const Python  = require('python-shell')

const fs = require('fs');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');
const groovyId = '234395307759108106'

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

	// The voice channel the user who entered the command is currently in
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
		let connection = await voice.channel.join(); // Lets bot join the voice channel
		const user_audio = connection.receiver.createStream(message.member, {mode: 'pcm',  end: 'manual'}); // Starts recording the singer
		const bot_audio = connection.receiver.createStream(message.guild.members.cache.get('234395307759108106'), {mode: 'pcm', end: 'manual'}) // Starts recording the bot

		user_audio.pipe(fs.createWriteStream('audio_user_recording')); // Writes the recording of the user to the disk.
		bot_audio.pipe(fs.createWriteStream('audio_bot_recording')); // Writes the recording of the bot to the disk.

		// Play dummy audio to fix issue #2929: https://github.com/discordjs/discord.js/issues/2929
		const dispatcher = connection.play('Pacman.mp3');  
	
		// Prints a message when the dummy track starts
		dispatcher.on('start', () => {
			console.log('Dummy sound started!');
		
		});

		// Prints a message when the dummy track stops
		dispatcher.on('finish', () => {
			console.log('Dummy sound stopped!');
		
		});	
	
	// Exit command
	} else if(command == 'exit') {
        voice.channel.leave();
        message.channel.send('Bot stopping');
		
	// Emergency shutdown command
	} else if(command == 'shutdown'){
		message.channel.send('Bot shutting down :(');
		client.destroy();

	} else
		return;

});


// require the discord.js module
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();

// pull configs
const { prefix, token } = require('./config.json');

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

// file system

const fs = require('fs');

client.login(token);

let vchan = 0;
let tchan = 0;
// enter voice channel

// client.on('message', async message => {
// 	// Join the same voice channel of the author of the message
// 	if (message.member.voice.channel) {
// 		const connection = await message.member.voice.channel.join();
// 	}
// });



// //Receive audio
// const audio = connection.receiver.createStream(user, {mode: 'pcm'});
// audio.pipe(fs.createWriteStream('audio_file'))

// on groovy bot joins\

// client.on("guildMemberSpeaking", function(member, speaking){
//     if(member.speaking.  )

// });


client.on('guildMemberSpeaking', (member, speaking) => {
    console.log(speaking.bitfield);
    if (speaking.bitfield) { 
        //member.guild.channels('Youre talking!');
        client.channels.cache.get(tchan).send(member.user.bot);

    } 
    else {
        client.channels.cache.get(tchan).send('Not talking!');

    }
});

// async, await required???
// send command to discord bot 
client.on('message', async message => {
    // exit early if doesn't start with prefix
    if ((message.content.startsWith(prefix) == false) || message.author.bot == true){
        return;
    } 
    // stores resulting input as string, cutting the prefix and splitting by  
    let args = message.content.slice(prefix.length).trim().split('~');
    let command = args.shift().toLowerCase();

    //bot joins 
    const { voice } = message.member;
    // vchan = voice.channel.id;
    // message.channel.send(`voice channel: ${vchan}`);
    tchan = message.channel.id;
    message.channel.send(`text channel: ${tchan}`);

    if (!voice.channelID) {
        message.reply('You are not in a voice channel!');
    }
    else {
        //--rhytm bot needs to join here first (promise, await required), 235088799074484224

        let connection = await voice.channel.join();
        
        //recording of user
        const user = message.member;
        const audio = connection.receiver.createStream(user, { mode: 'pcm', end: 'manual' });
        audio.pipe(fs.createWriteStream('audio_recording'));

        //recording of bot

        // const dispatcher = connection.play('Pacman.mp3'); 
        
        // dispatcher.on('start', () => {
        //     console.log('music is now playing!');
        // });
        
        // dispatcher.on('finish', () => {
        //     console.log('music has finished playing!');~
        // });

        // dispatcher.on('error', console.error);
    }
    
    if (command === 'start'){
        if (args.length < 2) {
            message.channel.send(`You didn't provide enough arguments, ${message.author}!`);
        }
        else{
            let artist = args[0];
            let song = args[1];
            // start recording
            message.channel.send(`Artist: ${artist} song: ${song}`); 
            console.log(artist, song);

            // member.speaking.FLAGS == 0x0

        }
    } 
    else if (command === 'stop'){
        // stop recording
    } 
    else if(command == 'exit') {
        client.destroy();
        console.log('Bot shut down.');
        message.channel.send('Bot stopping');
    }
});
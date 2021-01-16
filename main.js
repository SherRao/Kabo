
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
        const channel = client.channels.cache.get('799847451157725236');
        channel.send('You are talking!');

    } 
    else {
        console.log('not speaking');

    }
});

//async, await required???
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

    if(!voice.channelID) {
        message.reply('You are not in a voice channel!');
    }
    else {
        const connection = await voice.channel.join();
        const dispatcher = connection.play('Pacman.mp3'); //promise, await required
        
        dispatcher.on('start', () => {
            console.log('music is now playing!');
        });
        
        dispatcher.on('finish', () => {
            console.log('music has finished playing!');
        });

        dispatcher.on('error', console.error);
    }
    
    if (command === 'start'){
        if (args.length < 2) {
            message.channel.send(`You didn't provide enough arguments, ${message.author}!`);
        }
        else{
            let artist = args[0];
            let song = args[1];
            // start recording
            message.channel.send(`Artist: ${artist} song: ${song}`); // \n removed -td
            console.log(artist, song);

            // member.speaking.FLAGS == 0x0

        }
    } 
    else if (command === 'stop'){
        // stop recording
    }
});
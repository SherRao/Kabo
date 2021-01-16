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

//file system

const fs = require('fs');

client.login(token);




//enter voice channel



//Receive audio
const audio = connection.receiver.createStream(user, {mode: 'pcm'});
audio.pipe(fs.createWriteStream('audio_file'))




// send command to discord bot 
client.on('message', message => {
    //exit early if doesn't start with prefix
    if (!message.content.startsWith(prefix) || message.author.bot) return;
        //stores resulting input as string, cutting the prefix and splitting by 
        let args = message.content.slice(prefix.length).trim().split('~');
        let command = args.shift().toLowerCase();

    else if (command === 'start'){
        if (args.length < 2) {
            return message.channel.send(`You didn't provide enough arguments, ${message.author}!`);
        }
        else{
            let artist = args[1];
            let song = args[2];
            //start recording
        }
    } 
    else if (command === 'stop'){
        //stop recording
    }
});
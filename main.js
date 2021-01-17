// require the discord.js module
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();

// pull configs
const { prefix, token } = require('./config.json');

// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

// file system

const fs = require('fs');
const { debug } = require('console');

client.login(token);

// let vchan = 0;
let tchan = 0;
let userSinger = 0;
// enter voice channel

client.on('guildMemberSpeaking', (member, speaking) => {
    console.log(speaking.bitfield);
    if (speaking.bitfield && member.user.bot) { 
        // client.channels.cache.get(tchan).send('Talking!');
        // record user and record bot
        client.channels.cache.get(tchan).send(member.user.bot);
        console.log(userSinger);
        

    } 
    else {
        // stop recording user and recording bot
        client.channels.cache.get(tchan).send('Not talking!');
    }
});

// send command to discord bot 
client.on('message', async message => {
    if ((message.content.startsWith(prefix) == false) || message.author.bot == true){
        return;
    } 
    let args = message.content.slice(prefix.length).trim().split('~');
    let command = args.shift().toLowerCase();

    //bot joins 
    const { voice } = message.member;
    // vchan = voice.channel.id;
    // message.channel.send(`voice channel: ${vchan}`)
    tchan = message.channel.id;
    message.channel.send(`text channel: ${tchan}`);

    if (!voice.channelID) {
        message.reply('You are not in a voice channel!');
    }
    else {
        let connection = await voice.channel.join();
        console.log(connection);
        
        //recording of user
        userSinger = message.member;
        // console.log(userSinger);
        const audio = connection.receiver.createStream(userSinger, { mode: 'pcm', end: 'manual' });
        audio.pipe(fs.createWriteStream('audio_recording'));

        //recording of bot
        const dispatcher = connection.play(''); 
        
        // dispatcher.on('start', () => {
        //     console.log('music is now playing!');
        // });
        
        // dispatcher.on('finish', () => {
        //     console.log('music has finished playing!');
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
        }
    } 
    else if (command === 'stop'){
        // stop recording
    } 
    else if(command == 'exit') {
        voice.channel.leave();
        message.channel.send('Bot stopping');
    }
});
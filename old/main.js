// require the discord.js module
const Discord = require('discord.js');
// create a new Discord client
const client = new Discord.Client();
// pull configs
const { prefix, token } = require('./config.json');
// PythonShell
const Python = require('python-shell');
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

// file system
const fs = require('fs');
const { debug } = require('console');

client.login(token);

let tchan = 0; // Represents the text channel to output all the info to
let userSinger = 0; // User representing the person who ran the command
//let connection = 0;
//let groovyId = 234395307759108106;
//let groovyUser = client.users.fetch(groovyId); // User representing GroovyBot

let audio_bot = null;
//let audio_user = null;
let audioBotStream = fs.createWriteStream('audio_recording_bot');
//let audioSingerStream = fs.createWriteStream('audio_recording_user');

// function recordUser (groovyUser, userSinger, audioBotStream, audioSingerStream) {

// }

// enter voice channel
// Called when a member in a VC stops/starts talking
client.on('guildMemberSpeaking', (member, speaking) => {
    if (speaking.bitfield && member.user.bot) { // When GroovyBot starts talking, we want to start recording both the singer and Groovy.
        console.log('Groovy is talking');
        
        // Play dummy audio to fix issue #2929
        // https://github.com/discordjs/discord.js/issues/2929
        // const dispatcher = connection.play('pacman.mp3'); 
    } 
    else if (!speaking.bitfield && member.user.bot){ // When GroovyBot stops talking, we want to stop both recordings
        console.log('Groovy is not talking');
        client.channels.cache.get(tchan).send('Bot Not talking!');
        
        // Stop recording
        audio_bot.unpipe(audioBotStream);
        audio_user.unpipe(audioSingerStream);

        // Runs main.py
       let shell = Python.run('main.py', null, function(err) {
            if (err) throw err;
            console.log('Finished calling main.py');
        
        }); 

        // Prints output from main.py
        shell.on('message', function(message) {
            console.log(`Python Output: ${message}`);

        } );
    }

    else {
        client.channels.cache.get(tchan).send('No one is talking');
    }
});

// send command to discord bot 
client.on('message', message => {
    if ((message.content.startsWith(prefix) == false) || message.author.bot == true){
        return;
    } 
    let args = message.content.slice(prefix.length).trim().split('~');
    let command = args.shift().toLowerCase();

    //bot joins 
    const { voice } = message.member;

    const userSinger = message.user;
    tchan = message.channel.id;
    message.channel.send(`text channel: ${tchan}`);

    if (!voice.channelID) {
        message.reply('You are not in a voice channel!');
    }
    else{
        voice.channel.join()
            .then(connection => {
                //Start recording Groovy
                //client.channels.cache.get(tchan).send(member.user.bot);
                // audio_bot = connection.receiver.createStream(groovyUser, { mode: 'pcm', end: 'silence' }); //silence to record till bot stops stream
                // console.log("bot stream called", groovyUser);
                // audio_bot.pipe(audioBotStream);        
                // console.log("bot recording completed");

                // Start recording user
                const audio_user = connection.receiver.createStream(userSinger, { mode: 'pcm', end: 'manual' });
                console.log("user stream called", userSinger);
                audio_user.pipe(fs.createWriteStream('audio_recording_user'));
                console.log("user recording completed");

                //bug fix, need to play audio to listen to other users
                const dispatcher = connection.play('pacman.mp3'); 

                dispatcher.on('start', () => {
                    console.log('sound currently');
                });
                dispatcher.on('finish', () => {
                    console.log('sound done');
                });
            })   
            .catch(error => {throw error; });


        let artist = args[0];
        let song = args[1];
        message.channel.send(`Artist: ${artist} song: ${song}`);
        console.log(artist, song);
            
    } 
    if (command === 'stop'){
        // stop recording
    } 
    else if(command == 'exit') {
        voice.channel.leave();
        message.channel.send('Bot stopping');
        
    } 
    else if( command == 'shutdown') {
        client.destroy();

    }

});
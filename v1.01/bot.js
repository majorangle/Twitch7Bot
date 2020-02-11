const tmi = require('tmi.js');
const myModule = require('./login.js');

const opts = {
  identity: {
    username: myModule.username(),
    password: myModule.password()
  },
  channels: [
    'majorlee_army'
  ]
};


// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

switch(commandName){
	case 'dice':
	    const num = rollDice(commandName);
	    client.say(target, `You rolled a ${num}. Link: https://glitch.com/~twitch-chatbot`);
	    console.log(`* Executed ${commandName} command`);
		break;
	case 'help':
		client.say(target, `For now, we chill`);
	    break;
	case 'who':
		client.say(target, `oot`);
	    break;
	case 'reboot':
		client.say(target, `we not there yet, you goto do it manual`);
	    break;
	default:
   		console.log(`* Unknown command ${commandName}`);
		break;
}}

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 20;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}


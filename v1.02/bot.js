const tmi = require('tmi.js');
const myModule = require('./login.js'); // Public define, for github
const activeWin = require('active-win');
const opts = {
  identity: {
    username: myModule.username(),
    password: myModule.password()
  },
  channels: [
    'majorlee_army'
  ]
};
var version = "v1.02";


(async () => { 
	data = await activeWin();
    	console.log(data.title);
})();


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

console.log(`* RX: ${commandName}`);
switch(commandName){
	case 'dice':
	    const num = rollDice(commandName);
	    client.say(target, `You rolled a ${num}.`);
	    console.log(`* Executed ${commandName} command`);
		break;
	case 'help':
		client.say(target, `For now, we chill`);
	    break;
	case 'what': 
		(async () => { 
		data = await activeWin();
		client.say(target, data.title);
		})();
	    break;
	case 'reboot':
		client.say(target, `we not there yet, you goto do it manual`);
	case 'version':
		client.say(target, `${version}`);
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


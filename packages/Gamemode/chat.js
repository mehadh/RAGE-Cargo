mp.events.add("playerJoin", player => {
    //player.call('chat', [true])
    player.call('InitiateCustomChat')
})

mp.events.add("playerQuit", (player) => {
    mp.players.broadcast(`!{#187bcd}SERVER:!{#FFFFFF} ${player.name} left the server!`)
})

mp.events.add("playerChat", (player, message) => {  // Global chat
    mp.players.broadcast(`${player.name}: ${message}`)  
})

mp.events.addCommand("freecam", (player) => {   // Freecam mode, should be restricted to admin in future
	if (player.admin > 1){
		player.call("freecamo", [player])
	}
	else{player.outputChatBox("!{#FF0000}ERROR: !{#FFFFFF}You do not have permission to use that command!")}
})

mp.events.addCommand('coords', (player) => { // DEV coords in logs
	player.outputChatBox(""+player.position);
	console.log(player.position);
});

mp.events.addCommand("color", (player) => { // Dev CMD to test colors
    mp.players.broadcast('!{c2a2da} hey')
    mp.players.broadcast('!{#c2a2da} hey')
    let red = `#ff0000`;
	player.outputChatBox(`!{#dddddd}This is Grey! !{#ffffff}This is White! !{${red}}This is Red!`);
	player.outputChatBox(` !{255, 0, 0}This is too Red! !{green}This is Green! !{255, 0, 255, 0.5}This is opacity Pink!`);
    
})

function findRageMpPlayer(playerNameOrPlayerId) {       // This function finds a player via a part of their name or their ID.
	let listofppl = [];
	if (playerNameOrPlayerId == parseInt(playerNameOrPlayerId)) {
		let foundPlayer = mp.players.at(playerNameOrPlayerId)
		  listofppl.push(foundPlayer);
		  return mp.players.at(playerNameOrPlayerId);
	}
	else
	{
	  let foundPlayer = null;
	  mp.players.forEach((rageMpPlayer) => {
		  if (rageMpPlayer.name.toLowerCase().startsWith(playerNameOrPlayerId.toLowerCase())) {
			foundPlayer = rageMpPlayer;
			listofppl.push(foundPlayer);
		  }
	  });
	  return foundPlayer;
	}
  }

  mp.events.addCommand("id", (player, playerNameorPlayerId) => {    // Basically a command form of the above function.
	if (playerNameorPlayerId != null || playerNameorPlayerId != undefined){
	let listofppl = [];
	function findRageMpPlayer(playerNameOrPlayerId) {
		if (playerNameOrPlayerId == parseInt(playerNameOrPlayerId)) {
			let foundPlayer = mp.players.at(playerNameOrPlayerId)
		  	listofppl.push(foundPlayer);
		  	return mp.players.at(playerNameOrPlayerId);
		}
		else
		{
		  let foundPlayer = null;
		  mp.players.forEach((rageMpPlayer) => {
//			  if (rageMpPlayer.name.toLowerCase().startsWith(playerNameOrPlayerId.toLowerCase())) {
			if (rageMpPlayer.name.toLowerCase().includes(playerNameOrPlayerId.toLowerCase())) {
				foundPlayer = rageMpPlayer;
				listofppl.push(foundPlayer);
			  }
		  });
		  return foundPlayer;
		}
	  }
	let eyedee = findRageMpPlayer(playerNameorPlayerId);
	for (let i = 0; i < listofppl.length; i++){
	if (listofppl[i]){
		player.outputChatBox(`${listofppl[i].name} is ID ${listofppl[i].id}`)
	}
	else{
		player.outputChatBox(`!{#FF0000}ERROR: !{#FFFFFF}No player found!`)
	}
}
}
else{
	player.outputChatBox("!{#f7ec16}USAGE: !{#FFFFFF}/id [name/id]")
}
})

mp.events.addCommand("pm", (player, fullText, id, ...message) => {  // Privat messages between players.
	if (id == null || id == undefined || message == null || message == undefined){
        player.outputChatBox('!{#f7ec16}USAGE: !{#FFFFFF}/pm [id] [message]')
    }
    else{
    let getId = findRageMpPlayer(id);
	if (getId != null){
		message = message.join(' ');
		player.outputChatBox( `!{#f7d216}(( PM to ${getId.name} (${getId.id}): ${message} ))`)
		getId.outputChatBox( `!{#f7d216}(( PM from ${player.name} (${player.id}): ${message} ))`)
	}	
	else{
		player.outputChatBox('!{#FF0000}ERROR: !{#FFFFFF}No player found!')
	}
	}

})

mp.events.addCommand("coin", (player) => {
	let result = Math.floor(Math.random() * 101);
	if (result%2 == 0) {
		let coin = "heads"
		mp.players.broadcast(`!{#C2A2DA} * ${player.name} flipped a coin and it landed on !{#FFFFFF}${coin}!{#C2A2DA}!`);
	}
	else {
		let coin = "tails"
		mp.players.broadcast(`!{#C2A2DA} * ${player.name} flipped a coin and it landed on !{#FFFFFF}${coin}!{#C2A2DA}!`);
	}
})

mp.events.addCommand("me", (player, message) => {
	if (message != null || message != undefined){
	mp.players.broadcast(`!{#C2A2DA} * ${player.name} ${message}`);
	}
	else{
		player.outputChatBox("!{#f7ec16}USAGE: !{#FFFFFF}/me [action]")
	}
})

mp.events.addCommand("stats", (player) => {	// TODO: colors!!!!
	player.outputChatBox("================== RAGE:CARGO ==================")
	player.outputChatBox(`Username: ${player.name} Account ID: ${player.sqlID} Money: $${player.money} Flights: ${player.flights} Deliveries: ${player.deliveries}`)
})
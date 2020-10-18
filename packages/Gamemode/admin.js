let weather = "extrasunny"

mp.events.add('playerJoin', (player) => {
    player.call("client:Weather", [weather])
})

mp.events.addCommand("weather", (player, id) => {
    if (player.admin > 1){
        if (id == null || id == undefined){
            player.outputChatBox('!{#f7ec16}USAGE: !{#FFFFFF}/weather [string] ex: extrasunny')
        }
        else{
            mp.world.weather = id
            weather = id
            player.outputChatBox(`!{#187bcd}SERVER: !{#FFFFFF}Set weather to ${id} (if it was valid)`)
            mp.events.call("client:Weather", [id])
            mp.players.forEach((person) => {
                person.call("client:Weather", [id])
            })
        }
    }
    else{
        player.outputChatBox('!{#FF0000}ERROR: !{#FFFFFF}You do not have permission to use this command.')
    }
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

mp.events.addCommand("admins", (player) => {
      player.outputChatBox('Online Admins:')    // TODO: Colors?
      mp.players.forEach((person) => {
          if (person.admin > 0){player.outputChatBox(`${person.name} - Level ${person.admin} Administrator`)}
      })
  })

  
mp.events.addCommand('veh', (player, fullText, arg1) => { // DEV veh spawner
    if (player.admin > 2){
        if (arg1 != undefined && arg1 != null){
            mp.vehicles.new(arg1, player.position, 
                {
                    color: [[255, 0, 0], [255, 0, 0]]
                });
        }
        else{player.outputChatBox('!{#f7ec16}USAGE: !{#FFFFFF}/veh [model]')}
    }
    else{player.outputChatBox('!{#FF0000}ERROR: !{#FFFFFF}You do not have permission to use this command.')}
});

mp.events.addCommand("cancelmission", (player, id) => {
    if (player.admin > 1){
        if (id != undefined && id != null){
            let getId = findRageMpPlayer(id)
            if (getId != null){
                mp.events.call("server:clearMission", getId)
                player.outputChatBox(`!{#187bcd}ADMIN: !{#FFFFFF} You canceled ${getId.name}'s mission.`)
                getId.outputChatBox(`!{#187bcd}ADMIN: !{#FFFFFF} ${player.name} cancelled your mission.`)
            }
            else{player.outputChatBox('!{#FF0000}ERROR: !{#FFFFFF}No player found!')}
        }
        else{player.outputChatBox('!{#f7ec16}USAGE: !{#FFFFFF}/cancelmission [player]')}

    }
    else{player.outputChatBox('!{#FF0000}ERROR: !{#FFFFFF}You do not have permission to use this command.')}
})
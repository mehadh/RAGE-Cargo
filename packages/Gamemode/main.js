mp.events.add("spawn", (player, location) => {  // This event is called from the NativeUI Spawn menu on the frontend. 
    switch(location){
        case "port":
            player.position = new mp.Vector3(858.7349243164062, -3203.28515625, 5.994997501373291)
            player.outputChatBox("You have spawned at the Port of Los Santos.")
            break;
        case "lsia":
            player.position = new mp.Vector3(-1037.512391015625, -2731.968994140625, 13.756636619567871)
            player.outputChatBox("!{#9b82ad}You have spawned at Los Santos International Airport.")
            break;
        default:
            player.position = player.lastposition   // player.lastposition is set when the account loads. If there is no last position, it defaults to the specified default position, which at the monet is set to the port.
    }
})

mp.events.addCommand("reconnect", (player) => { // This command allows for the player to reconnect themselves.
    reconnection(player);
})

async function reconnection(player){ // We use an async function so we can use await
    await player.outputChatBox("!{#f7ec16}SERVER:!{#FFFFFF} Reconnecting you to the server.")
    player.kickSilent(); // kickSilent will not be executed until the message is sent to the player.
}
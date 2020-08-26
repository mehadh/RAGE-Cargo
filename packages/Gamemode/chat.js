mp.events.add("playerJoin", player => {
    //player.call('chat', [true])
    player.call('InitiateCustomChat')
})

mp.events.add("playerChat", (player, message) => {
    mp.players.broadcast(`the guy sayed hay`)
})
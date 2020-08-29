// Public Vehicle Handling

// LSIA Shamals
// shamal1 = mp.vehicles.new(3080461301, new mp.Vector3(-1286.1102294921875, -3369.31640625, 14.543647766113281), {heading: -30.38749885559082})    // This is how I initially thought to handle vehicles.
// shamal2 = mp.vehicles.new(3080461301, new mp.Vector3(-1269.9617919921875, -3378.049560546875, 14.542424201965332), {heading: -30.38749885559082}) // This works, but upon thinking of mission and respawning, I decided to alter the code.
// shamal3 = mp.vehicles.new(3080461301, new mp.Vector3(-1253.9930419921875, -3386.836181640625, 14.543852806091309), {heading: -30.38749885559082}) 

var shamals = [ // This should be all the Shamals in the server, because anything here will be spawned as a Shamal.
    {hash: 3080461301, id: 1, position: new mp.Vector3(-1286.1102294921875, -3369.31640625, 14.543647766113281), heading: -28.737022399902344, mission: "passengers", extra: 9}, // We use a different pos so they are spawned in different places
    {hash: 3080461301, id: 2, position: new mp.Vector3(-1269.9617919921875, -3378.049560546875, 14.542424201965332), heading: -30.38749885559082, mission: "passengers", extra: 9}, // We define heading because they won't always be the same.
    {hash: 3080461301, id: 3, position: new mp.Vector3(-1253.9930419921875, -3386.836181640625, 14.543852806091309), heading: -27.99010467529297, mission: "passengers", extra: 9} // We define mission for the forEach later.
]   // Define hash might seem repetitive. I thought so too, but now instead of switch case for public vehicles, I can just use a forEach!

var publicVehicles = [  // This will be all the public vehicles (not owned by a player) on the server. This will allow for easy handling timers in forEach, etc.
    shamals
]

// Todo later LSIA and its passenger missions!
// var lsiaPassengers = [           
//     {name}
// ]
// var passengerMissions = [
//     {name: "LSIA - Passengers", id: 1, }
// ]
// Spawning all public vehicles in the server
publicVehicles.forEach(set => {
    set.forEach(vehicle => {
        let newVeh = mp.vehicles.new(vehicle.hash, vehicle.position, {heading: vehicle.heading})    // Why do we let newVeh? So we can make variables of the object.
        newVeh.publicId = vehicle.id    // I'm not entirely sure what we need the ID for, but we'll set it just in case.
        newVeh.publicPos = vehicle.position
        newVeh.publicHeading = vehicle.heading  // This and the above will be used to respawn the vehicle at their correct position on nonusage.
        newVeh.mission = vehicle.mission  // This will be used to determine which mission the vehicle will engage in.
        newVeh.extra = vehicle.extra
    })
})

mp.events.add("playerStartEnterVehicle", (player, vehicle, seat) => { 
    if (vehicle.publicTimer != undefined && vehicle.publicTimer != null){clearInterval(vehicle.publicTimer)}    // Regardless of seat, if you enter a vehicle, and there was a timer to despawn, it will stop!
}) 

mp.events.add("playerExitVehicle", (player, vehicle) => {
    let occupants = vehicle.getOccupants()  // We can't check that he's the driver, so better, let's check if there's no one else in the vehicle that is exited.
    if (vehicle.publicId != undefined && vehicle.publicId != null && occupants.length == 0){ // Only if it is a public vehicle AND you are the driver
        vehicle.publicTimer = setTimeout(function(){mp.events.call("server:publicRespawn", vehicle)}, 300000)   // In five minutes, call the publicRespawn event.
    }
})

mp.events.add("playerQuit", (player) => {
    if (player.vehicle){    // Unsure if this will work, but we can try!
        let vehicle = player.vehicle
        let occupants = vehicle.getOccupants()
        if (vehicle.publicId != undefined && vehicle.publicId != null && occupants.length == 0){
            vehicle.publicTimer = setTimeout(function(){mp.events.call("server:publicRespawn", vehicle)}, 300000)
        }
    }
    mp.players.broadcast(`!{#187bcd}SERVER:!{#FFFFFF} ${player.name} left the server!`)
})

mp.events.add("server:publicRespawn", vehicle => {
    let newVeh = mp.vehicles.new(vehicle.model, vehicle.publicPos, {heading: vehicle.publicHeading})    // Spawn the new vehicle with the parameters of the old one
    newVeh.publicId = vehicle.publicId  
    newVeh.publicPos = vehicle.publicPos
    newVeh.publicHeading = vehicle.publicHeading
    newVeh.mission = vehicle.publicMission    // Setting all of these publics so that it can be respawned again!
    newVeh.extra = vehicle.extra
    vehicle.destroy();  // Destroy the old vehicle
})

// End public vehicle handling
mp.events.add("server:spawn", (player, location) => {  // This event is called from the NativeUI Spawn menu on the frontend. 
    switch(location){ // We use a case switch because in the future there will be enough spawn locations for this to be efficient/needed.
        case "port":
            player.position = new mp.Vector3(858.7349243164062, -3203.28515625, 5.994997501373291)
            player.outputChatBox("!{#187bcd}SERVER:!{#FFFFFF} You have spawned at the Port of Los Santos.")
            break;
        case "lsia":
            player.position = new mp.Vector3(-1255.48974609375, -3347.577880859375, 13.94504624865723)
            player.outputChatBox("!{#187bcd}SERVER:!{#FFFFFF} You have spawned at Los Santos International Airport.")
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

mp.events.add("playerDeath", (player, reason, killer) => {  // This is a simple playerDeath event notifier, hopefully to be expanded in the future.
    switch(reason){
        case 341774354:
            killer ? mp.players.broadcast(`!{#187bcd}SERVER:!{#FFFFFF} ${player.name} died in a helicopter crash because of ${killer.name}!`) : mp.players.broadcast(`!{#187bcd}SERVER:!{#FFFFFF} ${player.name} died in a helicopter crash!`)
            break;
        default:
            killer ? mp.players.broadcast(`!{#187bcd}SERVER:!{#FFFFFF} ${player.name} died because of ${killer.name}`) : mp.players.broadcast(`!{#187bcd}SERVER:!{#FFFFFF} ${player.name} died!`)
    }
    player.call('client:enableCamera')
    player.spawn(new mp.Vector3(-1757.12, -739.53, 10));
    player.call('client:spawnMenu')
})

mp.events.addCommand("pveh", (player) => { // This command is used to help get info for public vehicle points!
    if (player.vehicle){console.log(`${player.vehicle.model} ${player.vehicle.heading} ${player.vehicle.position}`)}//${player.vehicle.position.x} ${player.vehicle.position.y} ${player.vehicle.position.z}`)}
})

mp.events.addCommand("work", (player) => {
    if (player.vehicle){
        let vehicle = player.vehicle
        if (vehicle.mission){
            switch(vehicle.mission){
                case "passengers":
                    player.outputChatBox("TODO: Passengers mission!")
                break;
                default:
                    player.outputChatBox("!{#FF0000}ERROR: !{#FFFFFF}This vehicle can not be used for work!")
            }
        }
    }
    else{player.outputChatBox("!{#FF0000}ERROR: !{#FFFFFF}You must be in a vehicle to use this command!")}
})

// mp.events.addCommand("freezeMyself", (player) => {       // Playing around, I wanted to see if I could run clientside code dynamically. 
//     player.call("client:code", ["mp.players.local.freezePosition(true)"])    // Can change to any code just by asking for an arg and calling the event that way.
//   });    // Obviously commented out because this is NOT something you should do!
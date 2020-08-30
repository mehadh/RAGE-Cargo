// Public Vehicle Handling

// LSIA Shamals
// shamal1 = mp.vehicles.new(3080461301, new mp.Vector3(-1286.1102294921875, -3369.31640625, 14.543647766113281), {heading: -30.38749885559082})    // This is how I initially thought to handle vehicles.
// shamal2 = mp.vehicles.new(3080461301, new mp.Vector3(-1269.9617919921875, -3378.049560546875, 14.542424201965332), {heading: -30.38749885559082}) // This works, but upon thinking of mission and respawning, I decided to alter the code.
// shamal3 = mp.vehicles.new(3080461301, new mp.Vector3(-1253.9930419921875, -3386.836181640625, 14.543852806091309), {heading: -30.38749885559082}) 

var shamals = [ // This should be all the Shamals in the server, because anything here will be spawned as a Shamal.                                                                         // first value each for color
    {hash: 3080461301, id: 1, position: new mp.Vector3(-1286.1102294921875, -3369.31640625, 14.543647766113281), heading: -28.737022399902344, mission: "passengers", extra: 9, publicColor: [[0,0,0],[0,0,0]]}, // We use a different pos so they are spawned in different places
    {hash: 3080461301, id: 2, position: new mp.Vector3(-1269.9617919921875, -3378.049560546875, 14.542424201965332), heading: -30.38749885559082, mission: "passengers", extra: 9, publicColor: [[0,0,0],[0,0,0]]}, // We define heading because they won't always be the same.
    {hash: 3080461301, id: 3, position: new mp.Vector3(-1253.9930419921875, -3386.836181640625, 14.543852806091309), heading: -27.99010467529297, mission: "passengers", extra: 9, publicColor: [[0,0,0],[0,0,0]]} // We define mission for the forEach later.
]   // Define hash might seem repetitive. I thought so too, but now instead of switch case for public vehicles, I can just use a forEach!

var cuban800s = [
    {hash: 3650256867, id: 4, position: new mp.Vector3(-1663.26904296875, -3125.492431640625, 14.633172035217285), heading: -29.662185668945312, mission: "cargo", extra: 5000, publicColor: [[0,0,0],[0,0,0]]},
    {hash: 3650256867, id: 5, position: new mp.Vector3(-1647.3111572265625, -3134.34521484375, 14.632086753845215), heading: -29.535266876220703, mission: "cargo", extra: 5000, publicColor: [[0,0,0],[0,0,0]]},
    {hash: 3650256867, id: 6, position: new mp.Vector3(-1631.5948486328125, -3143.5244140625, 14.635499000549316), heading: -30.316007614135742, mission: "cargo", extra: 5000, publicColor: [[0,0,0],[0,0,0]]},
    {hash: 3650256867, id: 7, position: new mp.Vector3(-2268.5322265625, 3226.346435546875, 33.45222854614258), heading: -119.44808959960938, mission: "cargo", extra: 5000, publicColor: [[0,0,0],[0,0,0]]}, // fz
    {hash: 3650256867, id: 7, position: new mp.Vector3(-2257.689208984375, 3252.461181640625, 33.454010009765625), heading: -119.29988861083984, mission: "cargo", extra: 5000, publicColor: [[0,0,0],[0,0,0]]},
    {hash: 3650256867, id: 7, position: new mp.Vector3(-2236.76806640625, 3272.867431640625, 33.453182220458984), heading: -119.17766571044922, mission: "cargo", extra: 5000, publicColor: [[0,0,0],[0,0,0]]},
    {hash: 3650256867, id: 7, position: new mp.Vector3(1729.3292236328125, 3318.4677734375, 41.864253997802734), heading: -165.5218505859375, mission: "cargo", extra: 5000, publicColor: [[0,0,0],[0,0,0]]}, // ss
    {hash: 3650256867, id: 7, position: new mp.Vector3(1733.0025634765625, 3304.379150390625, 41.86655044555664), heading: -165.20346069335938, mission: "cargo", extra: 5000, publicColor: [[0,0,0],[0,0,0]]},
    {hash: 3650256867, id: 7, position: new mp.Vector3(2134.822998046875, 4779.34228515625, 41.61069869995117), heading: 24.61403465270996, mission: "cargo", extra: 5000, publicColor: [[0,0,0],[0,0,0]]} // mkf
]

// We don't NEED separate vars for each type of vehicle, actually, we could define them all in publicVehicles itself. It just looks cleaner this way though, at least to me!
var publicVehicles = [  // This will be all the public vehicles (not owned by a player) on the server. This will allow for easy handling timers in forEach, etc.
    shamals,
    cuban800s
]
// If an airport is large enough, cargo and passengers is separated. Else, we will use the same array for both missions!

var lsiaCargo = [                                                                           // heading true = positive false = negative
    {id: 1, position: new mp.Vector3(-1390.04052734375, -3259.990966796875, 14.583492279052734), heading: true},
    {id: 2, position: new mp.Vector3(-1145.8974609375, -3409.525390625, 14.584912300109863), heading: true}
]

var lsiaPassengers = [
    {id: 1, position: new mp.Vector3(-1493.689697265625, -3238.815673828125, 14.548547744750977), heading: true},
    {id: 2, position: new mp.Vector3(-1560.244384765625, -3199.7900390625, 14.548239707946777), heading: true},
    {id: 3, position: new mp.Vector3(-1153.3533935546875, -2922.376220703125, 14.547996520996094), heading: false},
    {id: 4, position: new mp.Vector3(-1228.8258056640625, -2875.77099609375, 14.548690795898438), heading: false},
    {id: 5, position: new mp.Vector3(-1336.283203125, -2676.57080078125, 14.548856735229492), heading: false},
    {id: 6, position: new mp.Vector3(-1289.9857177734375, -2596.748046875, 14.54895305633545), heading: true},
    {id: 7, position: new mp.Vector3(-1214.30322265625, -2646.5576171875, 14.547616004943848), heading: true}
]

var ssa = [
    {id: 1, position: new mp.Vector3(1698.148681640625, 3276.595703125, 41.72999954223633), heading: true},
    {id: 2, position: new mp.Vector3(1402.578125, 3000.681396484375, 41.1521110534668), heading: true}
]

var mkf = [
    {id: 1, position: new mp.Vector3(2143.799560546875, 4811.9970703125, 41.82201385498047), heading: false}
]

var fzPassengers = [
    {id: 1, position: new mp.Vector3(-2174.001708984375, 3194.541259765625, 33.414146423339844), heading: false},
    {id: 2, position: new mp.Vector3(-2108.11669921875, 3158.49072265625, 33.41376876831055), heading: false},
    {id: 3, position: new mp.Vector3(-2043.0067138671875, 3120.742919921875, 33.41425323486328), heading: false},
    {id: 4, position: new mp.Vector3(-1977.8876953125, 3083.617431640625, 33.41362762451172), heading: false},
    {id: 5, position: new mp.Vector3(-1912.7076416015625, 3046.28955078125, 33.412967681884766), heading: false}
]

var fzCargo = [
    {id: 1, position: new mp.Vector3(-2470.9443359375, 3274.393798828125, 33.47637939453125), heading: false},
    {id: 2, position: new mp.Vector3(-2293.344970703125, 3185.35498046875, 33.49496078491211), heading: true},
    {id: 3, position: new mp.Vector3(-2022.98779296875, 3155.7392578125, 33.447967529296875), heading: false},
    {id: 4, position: new mp.Vector3(-1922.543212890625, 3131.206787109375, 33.447853088378906), heading: false},
    {id: 5, position: new mp.Vector3(-1879.7237548828125, 3104.76904296875, 33.44794845581055), heading: false}
]

var airports = [
    {id: 1, name: "Los Santos International Airport", position: new mp.Vector3(-1336.6370849609375, -3041.8857421875, 14.593191146850586), cargo: lsiaCargo, passengers: lsiaPassengers},
    {id: 2, name: "Sandy Shores Airfield", position: new mp.Vector3(1698.148681640625, 3276.595703125, 41.72999954223633), cargo: ssa, passengers: ssa},
    {id: 3, name: "McKenzie Field", position: new mp.Vector3(2143.799560546875, 4811.9970703125, 41.82201385498047), cargo: mkf, passengers: mkf},
    {id: 4, name: "Fort Zancudo", position: new mp.Vector3(-2149.30859375, 3023.002685546875, 32.83500289916992), cargo: fzCargo, passengers: fzPassengers}
]

//end airport def

function checkAirport(player) { // had some scope issues with functions in the past so i decided to make this an event instead
    distance = 9999;
    airport = null;
    let pos = player.position
    airports.forEach(obj => {
        let checkDist = player.dist(obj.position)
        if (distance > checkDist){
            distance = checkDist
            airport = obj
        } 
        return airport
    })
    return airport
}

function airportDestination(airport){   // This should pick a destination that is not the place the player is loading, as such, you pass in the airport that the player is loading at.
    destination = airport
    while (destination == airport){
        destination = airports[Math.floor(Math.random()*airports.length)];
    }
    return destination
}

mp.events.addCommand("closestairport", player => {
    checkAirport(player)
    player.outputChatBox(`The closest airport to you is ${airport.name}.`)
})

mp.events.addCommand("marker", player => {
    player.call("client:createMissionMarker", [player.position])
    player.call("client:createMissionBlip", [player.position])
})
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
        let newVeh = mp.vehicles.new(vehicle.hash, vehicle.position, {heading: vehicle.heading, color: vehicle.publicColor})    // Why do we let newVeh? So we can make variables of the object.
        newVeh.publicId = vehicle.id    // I'm not entirely sure what we need the ID for, but we'll set it just in case.
        newVeh.publicPos = vehicle.position
        newVeh.publicHeading = vehicle.heading  // This and the above will be used to respawn the vehicle at their correct position on nonusage.
        newVeh.mission = vehicle.mission  // This will be used to determine which mission the vehicle will engage in.
        newVeh.extra = vehicle.extra
        newVeh.publicColor = vehicle.publicColor
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
})

mp.events.add("server:publicRespawn", vehicle => {
    let newVeh = mp.vehicles.new(vehicle.model, vehicle.publicPos, {heading: vehicle.publicHeading, color: vehicle.publicColor})    // Spawn the new vehicle with the parameters of the old one
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
        case "lsia":    // shamal
            player.position = new mp.Vector3(-1229.2584228515625, -3378.283203125, 13.945043563842773)
            player.outputChatBox("!{#187bcd}SERVER:!{#FFFFFF} You have spawned at Los Santos International Airport.")
            break;
        case "lsia2":   // cuban800
            player.position = new mp.Vector3(-1668.698486328125, -3103.223876953125, 13.944761276245117)
            player.outputChatBox("!{#187bcd}SERVER:!{#FFFFFF} You have spawned at Los Santos International Airport.")
            break;
        case "ssa":
            player.position = new mp.Vector3(1758.20654296875, 3297.60400390625, 41.14912414550781)
            player.outputChatBox("!{#187bcd}SERVER:!{#FFFFFF} You have spawned at Sandy Shores Airfield.")
            break;
        case "mkf":
            player.position = new mp.Vector3(2150.8583984375, 4790.27685546875, 40.99849319458008)
            player.outputChatBox("!{#187bcd}SERVER:!{#FFFFFF} You have spawned at McKenzie Field Hangar.")
            break;
        case "fz":
            player.position = new mp.Vector3(-2282.46240234375, 3247.627197265625, 34.912086486816406)
            player.outputChatBox("!{#187bcd}SERVER:!{#FFFFFF} You have spawned at Fort Zancudo.")           // Similarly with the clientside, we could just input the string rather than redo each time
            break;                                                                                  // We can also just handle player pos setting on clientside, but I have some serverside plans
        default:                                                                                    // so I prefered to handle it this way!
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
            checkAirport(player) // checkAirport will return an airport object, which is what we will use to determine where the player will go
            //player.outputChatBox(`${airport.name}`)
            switch(vehicle.mission){
                case "passengers":
                    let loadAt = airport.passengers[Math.floor(Math.random()*airport.passengers.length)];
                    player.call("client:createMissionMarker", [loadAt.position])
                    player.call("client:createMissionBlip", [loadAt.position])
                    airportDestination(loadAt) // returns destination
                    player.inMission = true
                    player.mission = []
                    player.mission.origin = loadAt
                    player.mission.destination = destination
                    // todo: mission cargo is a random int that is no less than half veh extra and no more than veh extra, potential modifier on airport? 
                    //player.mission.cargo = 
                break;
                case "cargo":
                    player.outputChatBox("TODO: Cargo mission!")
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
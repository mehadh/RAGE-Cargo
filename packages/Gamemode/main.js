// Public Vehicle Handling

// LSIA Shamals
// shamal1 = mp.vehicles.new(3080461301, new mp.Vector3(-1286.1102294921875, -3369.31640625, 14.543647766113281), {heading: -30.38749885559082})    // This is how I initially thought to handle vehicles.
// shamal2 = mp.vehicles.new(3080461301, new mp.Vector3(-1269.9617919921875, -3378.049560546875, 14.542424201965332), {heading: -30.38749885559082}) // This works, but upon thinking of mission and respawning, I decided to alter the code.
// shamal3 = mp.vehicles.new(3080461301, new mp.Vector3(-1253.9930419921875, -3386.836181640625, 14.543852806091309), {heading: -30.38749885559082}) 

var shamals = [ // This should be all the Shamals in the server, because anything here will be spawned as a Shamal.                                                                         // first value each for color
    {hash: 3080461301, id: 1, position: new mp.Vector3(-1286.1102294921875, -3369.31640625, 14.543647766113281), heading: -28.737022399902344, mission: "passengers", extra: 9, publicColor: 0, publicColor2: 0}, // We use a different pos so they are spawned in different places
    {hash: 3080461301, id: 2, position: new mp.Vector3(-1269.9617919921875, -3378.049560546875, 14.542424201965332), heading: -30.38749885559082, mission: "passengers", extra: 9, publicColor: 0, publicColor2: 0}, // We define heading because they won't always be the same.
    {hash: 3080461301, id: 3, position: new mp.Vector3(-1253.9930419921875, -3386.836181640625, 14.543852806091309), heading: -27.99010467529297, mission: "passengers", extra: 9, publicColor: 0, publicColor2: 0} // We define mission for the forEach later.
]   // Define hash might seem repetitive. I thought so too, but now instead of switch case for public vehicles, I can just use a forEach!

var cuban800s = [
    {hash: 3650256867, id: 4, position: new mp.Vector3(-1663.26904296875, -3125.492431640625, 14.633172035217285), heading: -29.662185668945312, mission: "cargo", extra: 5000, publicColor: 0, publicColor2: 0},
    {hash: 3650256867, id: 5, position: new mp.Vector3(-1647.3111572265625, -3134.34521484375, 14.632086753845215), heading: -29.535266876220703, mission: "cargo", extra: 5000, publicColor: 0, publicColor2: 0},
    {hash: 3650256867, id: 6, position: new mp.Vector3(-1631.5948486328125, -3143.5244140625, 14.635499000549316), heading: -30.316007614135742, mission: "cargo", extra: 5000, publicColor: 0, publicColor2: 0},
    {hash: 3650256867, id: 7, position: new mp.Vector3(-2268.5322265625, 3226.346435546875, 33.45222854614258), heading: -119.44808959960938, mission: "cargo", extra: 5000, publicColor: 0, publicColor2: 0}, // fz
    {hash: 3650256867, id: 8, position: new mp.Vector3(-2257.689208984375, 3252.461181640625, 33.454010009765625), heading: -119.29988861083984, mission: "cargo", extra: 5000, publicColor: 0, publicColor2: 0},
    {hash: 3650256867, id: 9, position: new mp.Vector3(-2236.76806640625, 3272.867431640625, 33.453182220458984), heading: -119.17766571044922, mission: "cargo", extra: 5000, publicColor: 0, publicColor2: 0},
    {hash: 3650256867, id: 10, position: new mp.Vector3(1729.3292236328125, 3318.4677734375, 41.864253997802734), heading: -165.5218505859375, mission: "cargo", extra: 5000, publicColor: 0, publicColor2: 0}, // ss
    {hash: 3650256867, id: 11, position: new mp.Vector3(1733.0025634765625, 3304.379150390625, 41.86655044555664), heading: -165.20346069335938, mission: "cargo", extra: 5000, publicColor: 0, publicColor2: 0},
    {hash: 3650256867, id: 12, position: new mp.Vector3(2134.822998046875, 4779.34228515625, 41.61069869995117), heading: 24.61403465270996, mission: "cargo", extra: 5000, publicColor: 0, publicColor2: 0} // mkf
]

var mules = [
    {hash: 904750859, id: 13, position: new mp.Vector3(896.7055053710938, -3205.7890625, 6.133003234863281), heading: 0.7825499176979065, mission: "freight", extra: 7000, publicColor: 111, publicColor2: 111},
    {hash: 904750859, id: 14, position: new mp.Vector3(900.923095703125, -3205.7890625, 6.133003234863281), heading: -1.6787322759628296, mission: "freight", extra: 7000, publicColor: 111, publicColor2: 111},
    {hash: 904750859, id: 15, position: new mp.Vector3(904.8284912109375, -3205.7890625, 6.133003234863281), heading: -0.4723602831363678, mission: "freight", extra: 7000, publicColor: 111, publicColor2: 111},
    {hash: 904750859, id: 16, position: new mp.Vector3(908.9990234375, -3205.7890625, 6.133003234863281), heading: -2.355600118637085, mission: "freight", extra: 7000, publicColor: 111, publicColor2: 111},
    {hash: 904750859, id: 17, position: new mp.Vector3(913.0242309570312, -3205.7890625, 6.133003234863281), heading: 0.5530052185058594, mission: "freight", extra: 7000, publicColor: 111, publicColor2: 111},
    {hash: 904750859, id: 18, position: new mp.Vector3(917.2227783203125, -3205.7890625, 6.133003234863281), heading: 1.3566861152648926, mission: "freight", extra: 7000, publicColor: 111, publicColor2: 111},
    {hash: 904750859, id: 19, position: new mp.Vector3(921.1647338867188, -3205.7890625, 6.133003234863281), heading: 0.10082173347473145, mission: "freight", extra: 7000, publicColor: 111, publicColor2: 111},
    {hash: 904750859, id: 20, position: new mp.Vector3(925.4285888671875, -3205.7890625, 6.133003234863281), heading: -1.2214610576629639 , mission: "freight", extra: 7000, publicColor: 111, publicColor2: 111},
    {hash: 904750859, id: 21, position: new mp.Vector3(929.531982421875, -3205.7890625, 6.133003234863281), heading: -2.160710334777832, mission: "freight", extra: 7000, publicColor: 111, publicColor2: 111},
    {hash: 904750859, id: 22, position: new mp.Vector3(933.5444946289062, -3205.7890625, 6.133003234863281), heading: 1.0950013399124146, mission: "freight", extra: 7000, publicColor: 111, publicColor2: 111},
    {hash: 904750859, id: 23, position: new mp.Vector3(937.5676879882812, -3205.7890625, 6.133003234863281), heading: -0.4408867061138153, mission: "freight", extra: 7000, publicColor: 111, publicColor2: 111},
    {hash: 904750859, id: 24, position: new mp.Vector3(941.6198120117188, -3205.7890625, 6.133003234863281), heading: 0.36921125650405884, mission: "freight", extra: 7000, publicColor: 111, publicColor2: 111},
    {hash: 904750859, id: 25, position: new mp.Vector3(945.7440795898438, -3205.7890625, 6.133003234863281), heading: -2.056684732437134, mission: "freight", extra: 7000, publicColor: 111, publicColor2: 111},
    {hash: 904750859, id: 26, position: new mp.Vector3(949.8757934570312, -3205.7890625, 6.133003234863281), heading: -0.002442173659801483, mission: "freight", extra: 7000, publicColor: 111, publicColor2: 111},
    {hash: 904750859, id: 27, position: new mp.Vector3(953.8026733398438, -3205.7890625, 6.133003234863281), heading: 0.670081615447998, mission: "freight", extra: 7000, publicColor: 111, publicColor2: 111},
    {hash: 904750859, id: 28, position: new mp.Vector3(957.9696044921875, -3205.7890625, 6.133003234863281), heading: -0.9292619228363037, mission: "freight", extra: 7000, publicColor: 111, publicColor2: 111},
    {hash: 904750859, id: 29, position: new mp.Vector3(961.9352416992188, -3205.7890625, 6.133003234863281), heading: -1.0592135190963745, mission: "freight", extra: 7000, publicColor: 111, publicColor2: 111},
    {hash: 904750859, id: 30, position: new mp.Vector3(966.0228881835938, -3205.7890625, 6.133003234863281), heading: -1.0194507837295532, mission: "freight", extra: 7000, publicColor: 111, publicColor2: 111},
    {hash: 904750859, id: 31, position: new mp.Vector3(969.869140625, -3205.7890625, 6.133003234863281), heading: -0.896738588809967, mission: "freight", extra: 7000, publicColor: 111, publicColor2: 111}
]
    // json could help make this look cleaner, you could have just put it in its own files, but i like it here, so i will keep it :) you can also turn /pveh into dynamic that way but i prefer to hardcode it
var bensons = [
    {hash: 2053223216, id: 32, position: new mp.Vector3(892.7745971679688, -3188.1552734375, 5.876063346862793), heading: -179.9793243408203, mission: "freight", extra: 21500, publicColor: 111, publicColor2: 111},
    {hash: 2053223216, id: 33, position: new mp.Vector3(896.7485961914062, -3188.1552734375, 5.876063346862793), heading: 178.60702514648438, mission: "freight", extra: 21500, publicColor: 111, publicColor2: 111},
    {hash: 2053223216, id: 34, position: new mp.Vector3(900.8980102539062, -3188.1552734375, 5.876063346862793), heading: -179.6441192626953, mission: "freight", extra: 21500, publicColor: 111, publicColor2: 111},
    {hash: 2053223216, id: 35, position: new mp.Vector3(905.0723266601562, -3188.1552734375, 5.876063346862793), heading: -179.8654327392578, mission: "freight", extra: 21500, publicColor: 111, publicColor2: 111},
    {hash: 2053223216, id: 36, position: new mp.Vector3(909.1704711914062, -3188.1552734375, 5.876063346862793), heading: -179.3990020751953, mission: "freight", extra: 21500, publicColor: 111, publicColor2: 111},
    {hash: 2053223216, id: 37, position: new mp.Vector3(913.0941162109375, -3188.1552734375, 5.876063346862793), heading: -179.24166870117188, mission: "freight", extra: 21500, publicColor: 111, publicColor2: 111},
    {hash: 2053223216, id: 38, position: new mp.Vector3(917.1388549804688, -3188.1552734375, 5.876063346862793), heading: -179.5190887451172, mission: "freight", extra: 21500, publicColor: 111, publicColor2: 111},
    {hash: 2053223216, id: 39, position: new mp.Vector3(921.1038208007812, -3188.1552734375, 5.876063346862793), heading: -179.18214416503906, mission: "freight", extra: 21500, publicColor: 111, publicColor2: 111},
    {hash: 2053223216, id: 40, position: new mp.Vector3(925.2008666992188, -3188.1552734375, 5.876063346862793), heading: -179.4556884765625, mission: "freight", extra: 21500, publicColor: 111, publicColor2: 111},
    {hash: 2053223216, id: 41, position: new mp.Vector3(929.23974609375, -3188.1552734375, 5.876063346862793), heading: -179.17312622070312, mission: "freight", extra: 21500, publicColor: 111, publicColor2: 111},
    {hash: 2053223216, id: 42, position: new mp.Vector3(933.5180053710938, -3188.1552734375, 5.876063346862793), heading: -179.19593811035156, mission: "freight", extra: 21500, publicColor: 111, publicColor2: 111},
    {hash: 2053223216, id: 43, position: new mp.Vector3(937.4637451171875, -3188.1552734375, 5.876063346862793), heading: -179.18008422851562, mission: "freight", extra: 21500, publicColor: 111, publicColor2: 111},
    {hash: 2053223216, id: 44, position: new mp.Vector3(941.6676635742188, -3188.1552734375, 5.876063346862793), heading: -178.9331817626953, mission: "freight", extra: 21500, publicColor: 111, publicColor2: 111},
    {hash: 2053223216, id: 45, position: new mp.Vector3(945.50537109375, -3188.1552734375, 5.876063346862793), heading: 179.9571075439453, mission: "freight", extra: 21500, publicColor: 111, publicColor2: 111},
    {hash: 2053223216, id: 46, position: new mp.Vector3(949.5975952148438, -3188.1552734375, 5.876063346862793), heading: 179.98248291015625, mission: "freight", extra: 21500, publicColor: 111, publicColor2: 111},
    {hash: 2053223216, id: 47, position: new mp.Vector3(953.7508544921875, -3188.1552734375, 5.876063346862793), heading: -179.31687927246094, mission: "freight", extra: 21500, publicColor: 111, publicColor2: 111},
    {hash: 2053223216, id: 48, position: new mp.Vector3(957.79736328125, -3188.1552734375, 5.876063346862793), heading: 178.52899169921875, mission: "freight", extra: 21500, publicColor: 111, publicColor2: 111},
    {hash: 2053223216, id: 49, position: new mp.Vector3(961.8099365234375, -3188.1552734375, 5.876063346862793), heading: -179.46397399902344, mission: "freight", extra: 21500, publicColor: 111, publicColor2: 111},
    {hash: 2053223216, id: 50, position: new mp.Vector3(965.8074340820312, -3188.1552734375, 5.876063346862793), heading: -178.9840545654297, mission: "freight", extra: 21500, publicColor: 111, publicColor2: 111},
    {hash: 2053223216, id: 51, position: new mp.Vector3(969.6226196289062, -3188.1552734375, 5.876063346862793), heading: -179.7962646484375, mission: "freight", extra: 21500, publicColor: 111, publicColor2: 111},
]

// We don't NEED separate vars for each type of vehicle, actually, we could define them all in publicVehicles itself. It just looks cleaner this way though, at least to me!
var publicVehicles = [  // This will be all the public vehicles (not owned by a player) on the server. This will allow for easy handling timers in forEach, etc.
    shamals,
    cuban800s,
    mules,
    bensons
]

// end vehicle defs, begin airport defs
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

//end airport def, begin freight defs

var port = [
    {id: 1, position: new mp.Vector3(1219.3836669921875, -3204.430419921875, 5.884218692779541), heading: true},
    {id: 2, position: new mp.Vector3(1218.4354248046875, -3231.289794921875, 5.906073570251465), heading: true},
    {id: 3, position: new mp.Vector3(1233.434326171875, -3231.37841796875, 5.887096881866455), heading: true},
    {id: 4, position: new mp.Vector3(1234.422607421875, -3204.59423828125, 5.889626502990723), heading: false},
    {id: 5, position: new mp.Vector3(1244.908203125, -3155.563232421875, 5.845221519470215), heading: false},
    {id: 6, position: new mp.Vector3(1244.908203125, -3148.994140625, 5.845221519470215), heading: false},
    {id: 7, position: new mp.Vector3(1244.908203125, -3142.16650390625, 5.845221519470215), heading: false},
    {id: 8, position: new mp.Vector3(1244.908203125, -3135.733154296875, 5.845221519470215), heading: false},
    {id: 9, position: new mp.Vector3(1189.4459228515625, -3105.68310546875, 5.901604652404785), heading: true},
    {id: 10, position: new mp.Vector3(1244.908203125, -3262.719482421875, 5.845221519470215), heading: false},
    {id: 11, position: new mp.Vector3(1244.908203125, -3288.785888671875, 5.845221519470215), heading: false},
    {id: 12, position: new mp.Vector3(1244.908203125, -3298.11767578125, 5.845221519470215), heading: false},
    {id: 13, position: new mp.Vector3(1233.51611328125, -3330.138916015625, 5.899381160736084), heading: false},
    {id: 14, position: new mp.Vector3(1218.5677490234375, -3330.138916015625, 5.899381160736084), heading: false},
    {id: 15, position: new mp.Vector3(1205.554931640625, -3330.138916015625, 5.899381160736084), heading: false},
    {id: 16, position: new mp.Vector3(1190.3651123046875, -3330.138916015625, 5.899381160736084), heading: true}
]

function checkAirport(player) { // this will check the closest airport to the player!
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

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
        let newVeh = mp.vehicles.new(vehicle.hash, vehicle.position, {heading: vehicle.heading})    // Why do we let newVeh? So we can make variables of the object.
        newVeh.publicId = vehicle.id    // I'm not entirely sure what we need the ID for, but we'll set it just in case.
        newVeh.publicPos = vehicle.position
        newVeh.publicHeading = vehicle.heading  // This and the above will be used to respawn the vehicle at their correct position on nonusage.
        newVeh.mission = vehicle.mission  // This will be used to determine which mission the vehicle will engage in.
        newVeh.extra = vehicle.extra
        newVeh.publicColor = vehicle.publicColor
        newVeh.publicColor2 = vehicle.publicColor2
        newVeh.setColor(vehicle.publicColor, vehicle.publicColor2)
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
    let newVeh = mp.vehicles.new(vehicle.model, vehicle.publicPos, {heading: vehicle.publicHeading})    // Spawn the new vehicle with the parameters of the old one
    newVeh.publicId = vehicle.publicId  
    newVeh.publicPos = vehicle.publicPos
    newVeh.publicHeading = vehicle.publicHeading
    newVeh.mission = vehicle.mission    // Setting all of these publics so that it can be respawned again!
    newVeh.extra = vehicle.extra
    newVeh.publicColor = vehicle.publicColor
    newVeh.publicColor2 = vehicle.publicColor2
    newVeh.setColor(vehicle.publicColor, vehicle.publicColor2)
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
    // switch(reason){
    //     case 341774354:
    //         killer ? mp.players.broadcast(`!{#187bcd}SERVER:!{#FFFFFF} ${player.name} died in a helicopter crash because of ${killer.name}!`) : mp.players.broadcast(`!{#187bcd}SERVER:!{#FFFFFF} ${player.name} died in a helicopter crash!`)
    //         break;
    //     default:
    //         killer ? mp.players.broadcast(`!{#187bcd}SERVER:!{#FFFFFF} ${player.name} died because of ${killer.name}`) : mp.players.broadcast(`!{#187bcd}SERVER:!{#FFFFFF} ${player.name} died!`)
    // }
    mp.events.call("server:clearMission", (player))
    mp.players.broadcast(`!{#187bcd}SERVER:!{#FFFFFF} ${player.name} died!`)
    setTimeout(function(){
        player.call('client:enableCamera')
        player.spawn(new mp.Vector3(-1757.12, -739.53, 10));
        player.call('client:spawnMenu')
    }, 3000)
})

mp.events.addCommand("pveh", (player) => { // This command is used to help get info for public vehicle points!
    if (player.vehicle){
        //console.log(`${player.vehicle.model} ${player.vehicle.heading} ${player.vehicle.position}`)
        console.log(`{hash: ${player.vehicle.model}, id: changeme, position: new mp.Vector3(${player.vehicle.position.x}, -3188.1552734375, 5.876063346862793), heading: ${player.vehicle.heading}, mission: "freight", extra: 7000, publicColor: 111, publicColor2: 111},`)
    }//${player.vehicle.position.x} ${player.vehicle.position.y} ${player.vehicle.position.z}`)}
})

mp.events.addCommand("loc", (player) => {
    if (player.vehicle){
        if (player.vehicle.heading > 0){
            console.log(`id: "id", position: new mp.Vector3(${player.position.x}, ${player.position.y}, ${player.position.z}), heading: true`)
        }
        else if (player.vehicle.heading < 0){
            console.log(`id: "id", position: new mp.Vector3(${player.position.x}, ${player.position.y}, ${player.position.z}), heading: false`)
        }
        else{
            console.log(`id: "id", position: new mp.Vector3(${player.position.x}, ${player.position.y}, ${player.position.z}), heading: ${player.vehicle.heading}`)
        }
    }
    else{
        console.log(`new mp.Vector3(${player.position.x}, ${player.position.y}, ${player.position.z})`)
    }
});

mp.events.addCommand("work", (player) => {
    if (player.vehicle){
        let vehicle = player.vehicle
        if (vehicle.mission){
            // checkAirport(player) // checkAirport will return an airport object, which is what we will use to determine where the player will go edit: only applicable in airport based mission
            // moving this because this might cause an error if player did work while he is somewhere else...really it won't because we store in player.mission but lets be safe
            if (player.inMission != true){
                checkAirport(player)
                checkTerminal(player)
                //player.outputChatBox(`${airport.name}`)
                let loadAt;
                let unloadAt;           // paramaters for createMissionMarker are defined in clientside main.js, heli plane or truck
                switch(vehicle.mission){
                    case "passengers":
                        if (player.flights >= 10){
                            loadAt = airport.passengers[Math.floor(Math.random()*airport.passengers.length)];   // random position for player to load at
                            player.call("client:createMissionMarker", [loadAt.position, "plane"])
                            player.call("client:createMissionBlip", [loadAt.position])  // these clientside will create the blip only for the player
                            player.outputChatBox(`!{#3C9B1B}WORK: !{#FFFFFF}Please proceed to the marked location within ${airport.name} and use /load.`)
                            //airportDestination(loadAt) // returns destination | edit: was this working???? it shoudlnt have been, fix below
                            airportDestination(airport)
                            player.inMission = true
                            player.mission = []
                            player.mission.origin = airport
                            player.mission.destination = destination
                            unloadAt = destination.passengers[Math.floor(Math.random()*destination.passengers.length)];
                            player.mission.loadAt = loadAt
                            player.mission.unloadAt = unloadAt
                            player.mission.loaded = false
                            player.mission.vehicle = vehicle
                            player.mission.type = "plane"
                            player.mission.cargo = getRandomInt(1, vehicle.extra) // We use this function because in cargo we want to specify a minimum weight! Makes no sense to fly with 1 lb. 
                        }
                        else{player.outputChatBox("!{#FF0000}ERROR: !{#FFFFFF}You need to have completed 10 flights to use this vehicle!")}
                        
                    break;
                    case "cargo":
                        loadAt = airport.cargo[Math.floor(Math.random()*airport.cargo.length)];
                        player.call("client:createMissionMarker", [loadAt.position, "plane"])
                        player.call("client:createMissionBlip", [loadAt.position])  
                        player.outputChatBox(`!{#3C9B1B}WORK: !{#FFFFFF}Please proceed to the marked location within ${airport.name} and use /load.`)
                        airportDestination(airport)
                        player.inMission = true
                        player.mission = []
                        player.mission.origin = airport
                        player.mission.destination = destination
                        unloadAt = destination.cargo[Math.floor(Math.random()*destination.cargo.length)];
                        player.mission.loadAt = loadAt
                        player.mission.unloadAt = unloadAt
                        player.mission.loaded = false
                        player.mission.vehicle = vehicle
                        player.mission.type = "plane"
                        player.mission.cargo = getRandomInt(Math.round((vehicle.extra)/2), vehicle.extra) // the minimum cargo will be half of the cargo capability 

                    break;
                    case "freight":
                               
                    break;
                    default:
                        player.outputChatBox("!{#FF0000}ERROR: !{#FFFFFF}This vehicle can not be used for work!")
                }
            }
            else{player.outputChatBox("!{#FF0000}ERROR: !{#FFFFFF}You are already working!")}
        }
    }
    else{player.outputChatBox("!{#FF0000}ERROR: !{#FFFFFF}You must be in a vehicle to use this command!")}
})

// mp.events.addCommand("freezeMyself", (player) => {       // Playing around, I wanted to see if I could run clientside code dynamically. 
//     player.call("client:code", ["mp.players.local.freezePosition(true)"])    // Can change to any code just by asking for an arg and calling the event that way.
//   });    // Obviously commented out because this is NOT something you should do!

mp.events.addCommand("load", (player) => {
    if (player.vehicle){
        let vehicle = player.vehicle
        if (vehicle.mission && player.inMission == true && vehicle == player.mission.vehicle && player.mission.loaded != true){
            let dist = player.dist(player.mission.loadAt.position)
            if (dist < 6){
                player.outputChatBox(`!{#3C9B1B}WORK: !{#FFFFFF}Please wait as your vehicle is loaded.`)
                player.call("client:freezeVeh", [true])
                player.call("client:statusText", ["Loading"])
                setTimeout(function(){
                    player.call("client:freezeVeh", [false])
                    player.call("client:statusText", [null])
                    player.mission.loaded = true
                    switch(vehicle.mission){
                        case "passengers":
                            player.outputChatBox(`!{#3C9B1B}WORK: !{#FFFFFF}Your vehicle has been loaded with ${player.mission.cargo} passengers.`)
                        break;
                        case "cargo":
                            player.outputChatBox(`!{#3C9B1B}WORK: !{#FFFFFF}Your vehicle has been loaded with ${player.mission.cargo} lbs of cargo.`)
                        break;
                        default:
                            player.outputChatBox("!{#FF0000}ERROR: !{#FFFFFF}This vehicle can not be used for work!")
                        break;
                    }
                    player.outputChatBox(`!{#3C9B1B}WORK: !{#FFFFFF}Please proceed to the marked location within ${player.mission.destination.name} and use /unload.`)
                    player.call("client:createMissionMarker", [player.mission.unloadAt.position, player.mission.type])
                    player.call("client:createMissionBlip", [player.mission.unloadAt.position]) 
                }, 30000) // 30 seconds
            }
            else{player.outputChatBox("!{#FF0000}ERROR: !{#FFFFFF}Get closer to the loading point!")}
        }
        else{player.outputChatBox("!{#FF0000}ERROR: !{#FFFFFF}You can not load right now!")}
    }
    else{player.outputChatBox("!{#FF0000}ERROR: !{#FFFFFF}You must be in a vehicle to use this command!")}
})

mp.events.addCommand("text", (player, args) => {
    player.call("client:statusText", [args])
})

// async function missionReward(mission){
//     switch(mission){
//         case "passengers"
//     }
// }

mp.events.addCommand("unload", (player) => {
    if (player.vehicle){
        let vehicle = player.vehicle
        if (vehicle.mission && player.inMission == true && vehicle == player.mission.vehicle && player.mission.loaded == true){
            let dist = player.dist(player.mission.unloadAt.position)
            if (dist < 6){
                player.outputChatBox(`!{#3C9B1B}WORK: !{#FFFFFF}Please wait as your vehicle is unloaded.`)
                player.call("client:freezeVeh", [true])
                player.call("client:statusText", ["Unloading"])
                setTimeout(function(){
                    player.call("client:freezeVeh", [false])
                    player.call("client:statusText", [null])
                    switch(vehicle.mission){
                        case "passengers":
                            mp.events.call('server:incrementMission', player, "flights")
                            mp.players.broadcast(`!{#187bcd}SERVER:!{#FFFFFF} ${player.name} transported ${player.mission.cargo} passenger(s) from ${player.mission.origin.name} to ${player.mission.destination.name}.`)
                        break;
                        case "cargo":
                            mp.events.call('server:incrementMission', player, "flights")
                            mp.players.broadcast(`!{#187bcd}SERVER:!{#FFFFFF} ${player.name} transported ${player.mission.cargo} lbs of cargo from ${player.mission.origin.name} to ${player.mission.destination.name}.`)
                        break;
                        default:
                            player.outputChatBox("!{#FF0000}ERROR: !{#FFFFFF}This vehicle can not be used for work!")
                        break;
                    }
                    mp.events.call("server:clearMission", player) // originally I did all the code in this event here, but it should be better for futureproofing and readability to make it an event
                    player.call("client:destroyMission")
                    let reward = 500 // in the future we will use a function to determine how much the player should get, for now, they just get 500 :)
                    mp.events.call("server:addMoney", player, reward)
                    player.outputChatBox(`!{#3C9B1B}WORK: !{#FFFFFF}You have earned $${reward} for your work.`)
                }, 30000)
            }
            else{player.outputChatBox("!{#FF0000}ERROR: !{#FFFFFF}Get closer to the unloading point!")}
        }
        else{player.outputChatBox("!{#FF0000}ERROR: !{#FFFFFF}You can not unload right now!")}
    }
    else{player.outputChatBox("!{#FF0000}ERROR: !{#FFFFFF}You must be in a vehicle to use this command!")}
})

mp.events.add("server:clearMission", (player) => {
    player.inMission = false            // To be extra safe, I am resetting all the values set in /load.
    player.mission = []
    player.mission.origin = null
    player.mission.destination = null
    player.mission.loadAt = null
    player.mission.unloadAt = null
    player.mission.loaded = false
    player.mission.vehicle = null
    player.mission.cargo = null
    player.mission.blip = null
})


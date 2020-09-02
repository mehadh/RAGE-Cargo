let marker;
mp.events.add("client:createMissionMarker", (position) => {
    if (marker){marker.destroy()}
    marker = mp.markers.new(7, position, 5, {
        //direction: position,
        //rotation: position,
        color: [255, 255, 255, 127],
        visible: true
    })
})

let blip;
mp.events.add("client:createMissionBlip", (position) => {
    if (blip){blip.destroy()}
    blip = mp.blips.new(0, position, {
        name: "Mission",
        scale: 1,
        shortRange: false
    })
})

mp.events.add("client:destroyMission", () => {
    // if (marker){marker.destroy()}
    // if (blip){blip.destroy()}
})

mp.events.add("client:freezeVeh", (bool) => {
    if (mp.players.local.vehicle){mp.players.local.vehicle.freezePosition(bool)}
})

let statusText = null
let original = null
let textTimer = null
mp.events.add("client:statusText", (string) => {
    clearInterval(textTimer)
    statusText = string
    original = string
    if (statusText != null){
        textTimer = setInterval(function(){
            if (statusText.endsWith('...')){
                statusText = original
            }
            else{
                statusText = statusText+"."
            }
        }, 500)
    }
})

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
var money = 0
var moneystring = ""
var res_X = 1920;
var res_Y = 1080;
var showMoney = true
mp.events.add('money', (player, amount) => {
    money = amount;
    if (money != null) {
        moneystring = "$" + numberWithCommas(money.toFixed());
    }
})

mp.events.add("render", () => {
    if (statusText != null){
        mp.game.graphics.drawText(`${statusText}`, [0.5, 0.05], { 
            font: 4, 
            color: [255, 0, 0, 185], 
            scale: [1.2, 1.2], 
            outline: true
          });
    }
    if (showMoney == true){
        mp.game.graphics.drawText(moneystring, [(res_X - 80) / res_X, 0.060], {
          font:7, 
          color:[255, 255, 255, 128],
          scale: [0.6, 0.6], // 8 7
          outline: true,
          centre: true                                // should change both values for bigger monitors
      });
    }

})
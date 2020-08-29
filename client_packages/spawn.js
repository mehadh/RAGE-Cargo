const NativeUI = require("nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const UIMenuListItem = NativeUI.UIMenuListItem;
const UIMenuCheckboxItem = NativeUI.UIMenuCheckboxItem;
const BadgeStyle = NativeUI.BadgeStyle;
const Point = NativeUI.Point;
const ItemsCollection = NativeUI.ItemsCollection;
const Color = NativeUI.Color;
const localPlayer = mp.players.local;
let player = mp.players.local
let spawnMenu = new Menu("Spawn", "", new Point(50, 50));
spawnMenu.AddItem(new UIMenuItem("Port of Los Santos", "Press Enter to spawn here"));
spawnMenu.AddItem(new UIMenuItem("LSIA - Shamal", "Press Enter to spawn here"));
spawnMenu.AddItem(new UIMenuItem("Last Known Position", "Press Enter to spawn here"));
spawnMenu.Visible = false;
let other2 = false

mp.events.add("client:spawnMenu", (player) =>{
    spawnMenu.Visible = true;
    spawnMenu.Open()
});


spawnMenu.ItemSelect.on((item, index) => {
    switch(index){
        case 0:
            other2 = true
            mp.events.callRemote("server:spawn", (player, "port"))
            spawnMenu.Close();
            mp.events.call("client:loginCamera")
        break
        case 1:
            other2 = true
            mp.events.callRemote("server:spawn", (player, "lsia"))
            spawnMenu.Close();
            mp.events.call("client:loginCamera")
        break
        default:
            other2 = true
            mp.events.callRemote("server:spawn", (player, "last"))
            spawnMenu.Close();
            mp.events.call("client:loginCamera")
        break
    }
});

spawnMenu.MenuClose.on(() => {
    if (other2 == true){
        other2 = false
    }
    else{
        spawnMenu.Open()
    }
});

var cursor = false
mp.keys.bind(0x71, true, () => {    // I could have wrote this more efficiently, but I borrowed the code from another project, so it'll stay.
    cursor = !cursor
    if (cursor){
        //mp.gui.cursor.show(true, true);
        mp.gui.cursor.visible = true  
    }
    else{
        //mp.gui.cursor.show(false, false);
        mp.gui.cursor.visible = false
    }
});

// mp.events.add("client:code", (code) => { // Don't mind me, just playing around!
//     var func = new Function(code)
//     func()
//     //mp.players.local.eval(code);
//   });
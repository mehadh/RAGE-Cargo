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
spawnMenu.AddItem(new UIMenuItem("LSIA - Cuban800", "Press Enter to spawn here"));
spawnMenu.AddItem(new UIMenuItem("Sandy Shores Airfield", "Press Enter to spawn here"));
spawnMenu.AddItem(new UIMenuItem("McKenzie Field Hangar", "Press Enter to spawn here"));
spawnMenu.AddItem(new UIMenuItem("Fort Zancudo", "Press Enter to spawn here"));
spawnMenu.AddItem(new UIMenuItem("Last Known Position", "Press Enter to spawn here"));
spawnMenu.Visible = false;
let other2 = false

mp.events.add("client:spawnMenu", (player) =>{
    spawnMenu.Visible = true;
    spawnMenu.Open()
});


spawnMenu.ItemSelect.on((item, index) => {  // This code could've been more efficient by just placing other2/spawnmenuclose/logincamera after this line, and then by doing callRemote of
    switch(index){                                      // The index and naming all the cases as the indexes. That being said, it's not too much of a hassle to do here, so I do it this way.
        case 0:                                 // Furthermore, I mainly just wanted to use some more switch cases with this project! 
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
        case 2:
            other2 = true
            mp.events.callRemote("server:spawn", (player, "lsia2"))
            spawnMenu.Close();
            mp.events.call("client:loginCamera")
        break
        case 3: 
            other2 = true
            mp.events.callRemote("server:spawn", (player, "ssa"))
            spawnMenu.Close();
            mp.events.call("client:loginCamera")
        break
        case 4:
            other2 = true
            mp.events.callRemote("server:spawn", (player, "mkf"))
            spawnMenu.Close();
            mp.events.call("client:loginCamera")
        break
        case 5:
            other2 = true
            mp.events.callRemote("server:spawn", (player, "fz"))
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
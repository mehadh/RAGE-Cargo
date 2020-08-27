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
spawnMenu.AddItem(new UIMenuItem("Los Santos International Airport", "Press Enter to spawn here"));
spawnMenu.AddItem(new UIMenuItem("Last Known Position", "Press Enter to spawn here"));
spawnMenu.Visible = false;
let other2 = false

mp.events.add("spawner", (player) =>{
    spawnMenu.Visible = true;
    spawnMenu.Open()
});


spawnMenu.ItemSelect.on((item, index) => {
    if (index == 0){
        other2 = true
        mp.events.callRemote("spawn", (player, "port"))
        spawnMenu.Close();
    }
    else if (index == 1){
        other2 = true
        mp.events.callRemote("spawn", (player, "lsia"))
        spawnMenu.Close();
    }
    else{
        other2 = true
        mp.events.callRemote("spawn", (player, "last"))
        spawnMenu.Close();
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








// menuRoupas.MenuClose.on(() => {
//     if (player.saved){
//     mp.gui.chat.show(true);
//     mp.gui.cursor.visible = false;
//     player.menuer = false
//     mp.events.callRemote('fixmepls', player);
//     creatorCamera.setActive(false);
//     creatorCamera2.setActive(false);
//     }
//     else{
//         menuRoupas.Open();
//     }
// });
var cursor = false
mp.keys.bind(0x71, true, () => {
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

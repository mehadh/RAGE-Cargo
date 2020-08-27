require('./login.js');
require("/custom-chat/index.js")
require("./cam.js")
require("./spawn.js")
require("/nativeui/index.js")

mp.events.add('playerReady', () => {
    mp.events.call('client:showLoginScreen');
});
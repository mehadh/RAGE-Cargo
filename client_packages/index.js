require('./login.js');
require("/custom-chat/index.js")
mp.events.add('playerReady', () => {
    mp.events.call('client:showLoginScreen');
});
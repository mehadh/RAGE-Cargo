const bcrypt = require('bcryptjs');
const saltRounds = 10;

mp.events.add('server:registerAccount', async (player, username, email, password) => {
    if(username.length >= 3 && password.length >= 5){
        if(validEmail(email)){
            try {
                const res = await attemptRegister(player, username, email, password);
                if(res){
                    console.log(`${username} has registered a new account.`)
                    if (player.idleKick) { 
                        clearTimeout(player.idleKick);
                        player.idleKick = null;
                    }
                    mp.events.call("server:loadAccount", player, username);
                    player.call('client:loginHandler', ['registered']);
                } else {
                    player.call('client:loginHandler', ['takeninfo']);
                    resetTimeout(player);
                }
            } catch(e) { console.log(e) };
        } else {
            player.call('client:loginHandler', ['invalid-info']);
            resetTimeout(player);
        }
    } else {
        player.call('client:loginHandler', ['tooshort']);
        resetTimeout(player);
    }    
});

mp.events.add('server:loginAccount', async (player, username, password) => {
    let loggedAccount = mp.players.toArray().find(p => p.name == username);
    if(!loggedAccount){
        try {
            const res = await attemptLogin(username, password);
            if(res){
                console.log(`${username} has successfully logged in.`);
                if (player.idleKick) { 
                    clearTimeout(player.idleKick);
                    player.idleKick = null;
                }
                mp.events.call("server:loadAccount", player, username);
                player.call('client:loginHandler', ['success']);
            } else {
                player.call('client:loginHandler', ['incorrectinfo']);
                resetTimeout(player);
            }
        } catch(e) { console.log(e) };
    } else {
        player.call('client:loginHandler', ['logged']);
    }
});

mp.events.add('server:loadAccount', async (player, username) => {               // This is where vars should get set. can use player.var for serverside or player.setVariable("var", var) for shared.
    try {
        const [rows] = await mp.db.query('SELECT * FROM `accounts` WHERE `username` = ?', [username]);
        if(rows.length != 0){
            player.sqlID = rows[0].ID; // accId
            player.name = username; // set name to their login name
            // begin new vars 
            player.admin = rows[0].admin
            player.money = rows[0].money
            player.call('money', [player, rows[0].money])
            // end new vars
            rows[0].position === null ? player.lastposition = new mp.Vector3(mp.settings.defaultSpawnPosition) : player.lastposition = new mp.Vector3(JSON.parse(rows[0].position));
            //player.lastposition = new mp.Vector3(JSON.parse(rows[0].position));
            player.call("client:spawnMenu", [player]) // spawn.js
            player.setVariable("loggedIn", true);
        }
    } catch(e) { console.log(`[MySQL] ERROR: ${e.sqlMessage}\n[MySQL] QUERY: ${e.sql}`) };
});

mp.events.add('playerJoin', (player) => {
    player.setVariable("loggedIn", false);
    timeoutKick(player);
});

mp.events.add('playerQuit', async (player) => {
    if(player.getVariable('loggedIn') === false) return;
    let name = player.name;
    try {
        const [status] = await mp.db.query('UPDATE `accounts` SET `position` = ? WHERE username = ?', [JSON.stringify(player.position), player.name]);
        if(status.affectedRows === 1) console.log(`${name}'s data successfully saved.`);
        console.log(`${name} has quit the server.`);
    } catch(e) { console.log(e) }
})

function attemptRegister(player, username, email, pass){
    return new Promise(async function(resolve, reject){
        try {
            await mp.db.query('SELECT * FROM `accounts` WHERE `username` = ? OR `email` = ?', [username, email]).then(([rows]) => {
                return rows.length === 0;
            }).then(function(result){
                if(result){
                    bcrypt.hash(pass, saltRounds).then(async function(hash){
                        await mp.db.query('INSERT INTO `accounts` SET `username` = ?, `email` = ?, `password` = ?, `socialClub` = ?, `socialClubId` = ?', [username, email, hash, player.socialClub, player.rgscId]).then(() => {
                            resolve(true);
                        }).catch(e => reject(`[MySQL] ERROR: ${e.sqlMessage}\n[MySQL] QUERY: ${e.sql}`));
                    }).catch(e => reject(e));
                } else {
                    resolve(false);
                }
            }).catch(e => reject(`[MySQL] ERROR: ${e.sqlMessage}\n[MySQL] QUERY: ${e.sql}`));
        } catch(e) { console.log(e) }
    });
}

function attemptLogin(username, password){
    return new Promise(async function(resolve){
        try {
            await mp.db.query('SELECT `username`, `password` FROM `accounts` WHERE `username` = ?; UPDATE `accounts` SET `lastActive` = now() WHERE username = ?', [username, username]).then(([rows]) => {
                return rows;
            }).then(function(result){
                if(result[0].length != 0){    //  Account found
                    bcrypt.compare(password, result[0][0].password).then(function(res){
                        res ? resolve(true) : resolve(false);
                    });
                } else {    //  No account found
                    resolve(false);
                }
            });
        } catch(e) { console.log(e) }
    });
}

function validEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function resetTimeout(user){
    if (user.idleKick) {
        clearTimeout(user.idleKick);
        user.idleKick = null;
    }
    timeoutKick(user);
}

function timeoutKick(user){
    user.idleKick = setTimeout(() => {
        // user.call('client:hideLoginScreen');
        // user.outputChatBox(`You were kicked for idling too long.`);          // RE ENABLE THIS AFTER DEV
        // user.kick();
    }, 60000);
}
// begin new stuff

mp.events.add('server:addMoney', async (player, amount) => {  
    try {
        const [status] = await mp.db.query('UPDATE `accounts` SET `money` = `money` + ? WHERE `ID` = ?', [amount, player.sqlID]);
        if(status.affectedRows === 1){
            console.log(`${player.name}'s data successfully saved.`);
            mp.events.call('server:updateMoney', (player))
        }
        else{console.log(`${status.affectedRows} and ${player.sqlID} and ${amount} or even ${player.name}`)}
    } catch(e) { console.log(e)
    player.outputChatBox(`!{#FF0000}ERROR: !{#FFFFFF}There was an error while giving you $${amount}. Please contact an admin!`)}
});

mp.events.add('server:removeMoney', async (player, amount) => {  
    try {
        const [status] = await mp.db.query('UPDATE `accounts` SET `money` = `money` - ? WHERE `ID` = ?', [amount, player.sqlID]);
        if(status.affectedRows === 1){
            console.log(`${player.name}'s data successfully saved.`);
            mp.events.call('server:updateMoney', (player))
        }
        else{console.log(`${status.affectedRows} and ${player.sqlID} and ${amount}`)}
    } catch(e) { console.log(e)
    player.outputChatBox(`!{#FF0000}ERROR: !{#FFFFFF}There was an error while saving your data (${amount}). Please contact an admin!`)}
});

mp.events.add('server:updateMoney', async (player) => {
    try {
        const [rows] = await mp.db.query('SELECT `money` FROM `accounts` WHERE `ID` = ?', [player.sqlID]);
        if(rows.length != 0){
            player.call('money', [player, rows[0].money])
        }
    } catch(e) { console.log(`[MySQL] ERROR: ${e.sqlMessage}\n[MySQL] QUERY: ${e.sql}`) };
})

// mp.events.addCommand('money', (player, money) => {
//     mp.events.call('server:addMoney', player, money)
// })

// mp.events.addCommand('wallet', (player) => {
//     mp.events.call("server:updateMoney", (player))
// })
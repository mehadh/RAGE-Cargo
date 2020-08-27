mp.gui.chat.show( false ); //Disables default RageMP Chat
mp.gui.chat.safeMode = false;
mp.gui.chat.safe = false;
mp.gui.chat.colors = true;
mp.gui.chat.activate( false );

mp.events.add( 'ToggleChatBoxActive', ( toggle ) => {
    chatbox.execute( `chatAPI.activate( ${ toggle } );` );
} );

mp.events.add( 'ClearChatBox', ( ) => {
    chatbox.execute( 'chatAPI.clear();' );
} );

mp.events.add( 'SetCurrentMenuId', ( menuId ) => {
    chatbox.execute( `chatAPI.activate( ${ menuId === 0 } );` );
} );

mp.events.add("InitiateCustomChat", () => {
    mp.gui.chat.show(false); 

    //const chatbox = chatbox = mp.browsers.new( 'package://custom-chat/chatUI/index.html' );
     const chatbox = mp.browsers.new( 'package://custom-chat/chatUI/index.html' );
    //chatbox.markAsChat();
    //mp.gui.execute("window.location = 'package://custom-chat/chatUI/index.html'")
    chatbox.safeMode = false;
    chatbox.safe = false;
    chatbox.colors = true;
    chatbox.markAsChat();
});
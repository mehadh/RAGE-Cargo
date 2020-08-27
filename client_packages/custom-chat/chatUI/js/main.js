var chat =
{
    size: 0,
    history_limit: 30,  //Change this if you want to hold more/less chat history
    container: null,
    input: null,
    scrolling: false,
    enabled: false,
    active: true,
    submittedMessageHistory: [ ],
    currentSubmittedMessageHistoryIndex: 0,
    maxSavedSubmittedMessages: 30,
    coolDown: true
};

function coolDownHandler() {
    chat.coolDown = false;

    setTimeout(function () {
        chat.coolDown = true;
    }, 500);
}

function StripColors(text) {
    return text.replace(/~[A-Za-z]~/g, "").replace(/!{.+}/g, "");
}

var validEmoticons =[
    { text: ":)", replacement: "ec ec-slightly-smiling-face" },
    { text: "xd", replacement: "ec ec-laughing" },
    { text: ":joy:", replacement: "ec ec-joy" },
    { text: ":innocent:", replacement: "ec ec-innocent" },
];

function enableChatInput( enable )
{
    if( chat.active === false && enable === true )
        return;

    if( enable !== ( chat.input != null ) )
    {
        //chat_printing = enable;

        mp.invoke( "focus", enable );
        mp.invoke("setTypingInChatState", enable); // added 1.1

        if( enable )
        {
            chat.scrolling = false;
            chat.input = $( "#chat" ).append( '<div><input id="chat_msg" type="text" /></div>' ).children( ":last" );
            chat.input.children( "input" ).focus( );
            mp.trigger( 'ToggleChat', true );
        }
        else
        {
            chat.input.fadeOut( 'fast', function( )
            {
                chat.input.remove();
                chat.input = null;
            } );

            updateScroll( );
            mp.trigger( 'ToggleChat', false );
        }
    }
}


function updateScroll() {
    var element = document.getElementById("chat_messages" );
    element.scrollTop = element.scrollHeight;
}

function addToSubmittedMessageHistory( message ) {
    chat.submittedMessageHistory.push( message );
    chat.currentSubmittedMessageHistoryIndex = chat.submittedMessageHistory.length;

    if( chat.submittedMessageHistory.length > chat.maxSavedSubmittedMessages )
        chat.submittedMessageHistory.shift( );
}

function convertEmoticons( text )
{
    let output = text;

    validEmoticons.forEach( e => {
        output = output.split( e.text ).join( `<span class="${ e.replacement }"></span>` );
    } );

    return output;
}

var chatAPI =
{
    push: (text) =>
	{
        let safeChat = text.replace(/<[^>]*>/g, "");
		let colorPositions = [];
		let colors = [];
		let chatElement = "<li>";

		for (let i = 0; i<safeChat.length; i++) {
			let colorCheck = `${safeChat[i]}${safeChat[i+ 1]}${safeChat[i + 2]}`;
			
			if (colorCheck === "!{#") {
				colorPositions.push(i);
			}
		}

		colorPositions.forEach(el => {
			let sub = safeChat.slice(el, -1);
			colors.push(sub.slice(3, 9));
		});

		colorPositions.forEach((el, i) => {
			let sub = safeChat.slice(colorPositions[i] + 10, colorPositions[i + 1]);
			chatElement += `<span style='color: ${colors[i]}'>${sub}</span>`;
		});

		chatElement += "</li>";

		if (chatElement === "<li></li>") {
			chat.container.prepend("<li>" + safeChat + "</li>");
		} else {
			chat.container.prepend(chatElement);
		}

		chat.size++;

		if (chat.size >= chat.history_limit)
		{
			chat.container.children(":last").remove();
		}
    },
    
    clear: ( ) =>
    {
        chat.container.html( "" );
    },

    activate: ( toggle ) =>
    {
        if( toggle === false && ( chat.input != null ) )
            enableChatInput( false );

        chat.active = toggle;
    },

    show: ( toggle ) =>
    {
        if( toggle )
            $( "#chat" ).show();
        else
            $( "#chat" ).hide();

        chat.active = toggle;
    }
};


function hide() {
    return;
}


$( document ).ready( function( )
{
    chat.container = $( "#chat ul#chat_messages" );

    $( ".ui_element" ).show( );

    chatAPI.push( "Multiplayer started" );

    $( "#chat_messages_container" ).scroll( function( e ) {
        console.log( e.target.scrollHeight );
        chat.scrolling = true;
    } );

    $( "body" ).keydown( function( event )
    {
        // T key
        if( event.which === 84 && chat.input == null && chat.active === true )
        {
            enableChatInput( true );
            event.preventDefault( );
        }
        else if( chat.input != null )
        {
            // Enter key
            if( event.which === 13 ) {
                if (chat.coolDown != false){

                var value = chat.input.children( "input" ).val( );
                // strip colors
                //value = StripColors(value);       // should strip colors ONLY from input
                if (value.length < 286){
                if (value.length > 0)
                {
                    if( value[ 0 ] === "/" )
                    {
                        var cmdText = value.substr( 1 );

                        if( cmdText.length > 0 )
                        {
                            mp.invoke( "command", cmdText.replace( /"/g, '\\"' ) );
                            addToSubmittedMessageHistory( value );
                            coolDownHandler()
                        }
                    }
                    else
                    {
                        mp.invoke( "chatMessage", value.replace( /"/g, '\\"' ) );
                        // chatAPI.push( value.replace( /"/g, '\\"' ) );
                        addToSubmittedMessageHistory( value );
                        coolDownHandler()
                    }

                }
            }
            else{
                let texto2 = `Maximum of 285 characters. You have ${value.length}.`
                mp.trigger("notify", texto2)
            }

                enableChatInput( false );
            }
            else {
                let texto = 'You can not send commands that quickly!'
                mp.trigger("notify", texto)
            }
            }

            // Arrow up key
            if( event.which === 38 ) {
                event.preventDefault( );

                if( chat.currentSubmittedMessageHistoryIndex === 0 )
                    return;

                --chat.currentSubmittedMessageHistoryIndex;
                chat.input.children( "input" ).val( chat.submittedMessageHistory[ chat.currentSubmittedMessageHistoryIndex ] );
            }

            // Arrow down key
            if( event.which === 40 ) {
                event.preventDefault( );

                if( chat.currentSubmittedMessageHistoryIndex === chat.submittedMessageHistory.length )
                    return chat.input.children( "input" ).val( "" );

                ++chat.currentSubmittedMessageHistoryIndex;
                chat.input.children( "input" ).val( chat.submittedMessageHistory[ chat.currentSubmittedMessageHistoryIndex ] );

            }
            if (event.which == 27 && chat.input != null) { // Escape

                enableChatInput(false);
                hide();
            }
        }
    } );
} );

// from rage forums, disabling in favor of below

// let api = {"chat:push": chatAPI.push, "chat:clear": chatAPI.clear, "chat:activate": chatAPI.activate, "chat:show": chatAPI.show}; 

// for(let fn in api)
// {
// 	mp.events.add(fn, api[fn]);
// }

// from 1.1 chat
if(mp.events)
{
	let api = {"chat:push": chatAPI.push, "chat:clear": chatAPI.clear, "chat:activate": chatAPI.activate, "chat:show": chatAPI.show}; 

	for(let fn in api)
	{
		mp.events.add(fn, api[fn]);
	}
}
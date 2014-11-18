/**
 * This file is part of Wakanda software, licensed by 4D under
 *  (i) the GNU General Public License version 3 (GNU GPL v3), or
 *  (ii) the Affero General Public License version 3 (AGPL v3) or
 *  (iii) a commercial license.
 * This file remains the exclusive property of 4D and/or its licensors
 * and is protected by national and international legislations.
 * In any event, Licensee's compliance with the terms and conditions
 * of the applicable license constitutes a prerequisite to any use of this file.
 * Except as otherwise expressly stated in the applicable license,
 * such license does not include any other license or rights on this file,
 * 4D's and/or its licensors' trademarks and/or other proprietary rights.
 * Consequently, no title, copyright or other proprietary rights
 * other than those specified in the applicable license is granted.
 **/
 var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent)
        || this.searchVersion(navigator.appVersion)
        || "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
    searchString: function (data) {
        for (var i=0;i<data.length;i++)	{
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1)
                    return data[i].identity;
            }
            else if (dataProp)
                return data[i].identity;
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
    },
    dataBrowser: [
    {
        string: navigator.userAgent,
        subString: "Chrome",
        identity: "Chrome"
    },
    {
        string: navigator.userAgent,
        subString: "OmniWeb",
        versionSearch: "OmniWeb/",
        identity: "OmniWeb"
    },
    {
        string: navigator.vendor,
        subString: "Apple",
        identity: "Safari",
        versionSearch: "Version"
    },
    {
        prop: window.opera,
        identity: "Opera",
        versionSearch: "Version"
    },
    {
        string: navigator.vendor,
        subString: "iCab",
        identity: "iCab"
    },
    {
        string: navigator.vendor,
        subString: "KDE",
        identity: "Konqueror"
    },
    {
        string: navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox"
    },
    {
        string: navigator.vendor,
        subString: "Camino",
        identity: "Camino"
    },
    {		// for newer Netscapes (6+)
        string: navigator.userAgent,
        subString: "Netscape",
        identity: "Netscape"
    },
    {
        string: navigator.userAgent,
        subString: "MSIE",
        identity: "Explorer",
        versionSearch: "MSIE"
    },
    {
        string: navigator.userAgent,
        subString: "Gecko",
        identity: "Mozilla",
        versionSearch: "rv"
    },
    { 		// for older Netscapes (4-)
        string: navigator.userAgent,
        subString: "Mozilla",
        identity: "Netscape",
        versionSearch: "Mozilla"
    }
    ],
    dataOS : [
    {
        string: navigator.platform,
        subString: "Win",
        identity: "Windows"
    },
    {
        string: navigator.platform,
        subString: "Mac",
        identity: "Mac"
    },
    {
        string: navigator.userAgent,
        subString: "iPhone",
        identity: "iPhone/iPod"
    },
    {
        string: navigator.platform,
        subString: "Linux",
        identity: "Linux"
    }
    ]

};

function treatOpenWindow( contextId ) {

    var

    ctx = $( "#" + contextId );

    if ( ctx.length > 0 ) {

        console.log( "treatOpenWindow ifrm=" , $( "iframe" , ctx ) , " ,url=" , $( ctx ).data( "url" ) );

        if ( $( "#frame-" + contextId ).length <= 0 ) {

            if ( !$( ctx ).data( "url" ) ) {

                ws.send( '{"method":"getURL","id":"' + contextId + '"}' );

                return;

            }

			var

			html = "<iframe src=\"" + $( ctx ).data( "url" ) + "\" class=\"debugFrame\" id =\"frame-" + contextId + "\"></iframe>"

			$( "#framesDiv" ).append( html );

        }

        $( ".context" ).removeClass( "cur_context" );

        ctx.addClass( "cur_context" );

		ctx.addClass( 'expanded' );

        $( ".debugFrame" ).hide( );

        $( "#frame-" + contextId ).show( );

    } else {

        console.log( "treatOpenWindow: non existent contextID=" , contextId );

    }

}

function refreshHtml(message) {
    $("#wakserv_solution").text(WAKANDA_SERVER_SOLUTION_NAME);
    $("#wakserv_solution").css("color","blue");

    $("#wakserv_host").innerHTML = WAKANDA_SERVER_HOST;
    $("#wakserv_port").innerHTML = WAKANDA_SERVER_PORT;

    if(!!ws){
        switch(ws.readyState) {
            case ws.CLOSED:
                $("#wakserv_state").text("CLOSED");
                $("#wakserv_state").css("color","red");
                break;
            case ws.CLOSING:
                $("#wakserv_state").text("CLOSING");
                $("#wakserv_state").css("color","red");
                break;
            case ws.CONNECTING:
                $("#wakserv_state").text("CONNECTING");
                $("#wakserv_state").css("color","red");
                break;
            case ws.OPEN:
                $("#wakserv_state").text("OPEN");
                $("#wakserv_state").css("color","green");
                break;
            default:
                $("#wakserv_state").text("UNKNOWN STATE :" + ws.readyState);
                $("#wakserv_state").css("color","red");
        }
    }else{

        $("#wakserv_state").text(message.connectionStatus);
        $("#wakserv_state").css("color","red");
    }
}

function addNewElement( contextId ) {

	var

	html ,

	name;

	html	= '<div id="${id}" class="context hidden"><div class="context_head"><a href="#" class="expand"></a><span class="fileName">${file}</span>, <span class="lineNumber">line ${line}</span><a href="#" class="abort_button"></a><span>#${id}</span></div><div class="context_body">${code}</div></div>';

	html	= html.replace( new RegExp( '\\$\\{id\\}' , 'g' ) , contextId );

    $( "#contexts_list" ).append( html );

}

function treatMessage( msg ) {

	var

	ctx,

	jsonMsg;

    refreshHtml( );

    console.log("treatMessage called, state=", state," ,ws_state=",ws.readyState," received: ",msg.data);

    if ( state < CONNECTING_STATE ) {

        console.log( "treatMessage BAD STATE" );

        ws.close( );

        return;

    }

    jsonMsg		= JSON.parse( msg.data );

	ctx			= { };

    if ( state == CONNECTING_STATE ) {

        if ( jsonMsg.result == "ok" ) {

            if ( jsonMsg.needsAuthentication == true ) {

                authenticate( );

                return;

            } else {

                WAKANDA_SERVER_SOLUTION_NAME = jsonMsg.solution;

                $( "#wakserv_solution" ).text( WAKANDA_SERVER_SOLUTION_NAME );

                $( "#wakserv_solution" ).css( "color" , "blue" );

                state	= CONNECTED_STATE;

                return;

            }

        }

    }

    if ( state != CONNECTED_STATE ) {

        console.log( "treatMessage BAD STATE2" );

        return;

    }

    if ( jsonMsg.method == "newContext" ) {

        ctx			= {};

        ctx.iframe	= null;

        ctx.url		= null;

        hash[ jsonMsg.contextId ]	= ctx;

        addNewElement( jsonMsg.contextId );

        ws.send( '{"result":"ok","id":"' + jsonMsg.id + '"}' );

    }

    if ( jsonMsg.method == "updateContext" ) {


        if ( $( "#" + jsonMsg.contextId ).length > 0 ) {

            var

			bps,

			tmp,

			html,

            ctx,

			notification;

			ctx		= $( "#" + jsonMsg.contextId );

			$('.lineNumber', ctx).text(jsonMsg.debugLineNb);
			$('.fileName', ctx).text(jsonMsg.debugFileName);
			$('.context_body', ctx).text(jsonMsg.sourceLine.substr(0, 40) + '...');

            console.log( "method=" , jsonMsg.method ," ,iframe=" , ctx.iframe );

            ctx.removeClass( "hidden" );

			if ( windowIsActive == false && window.webkitNotifications && window.webkitNotifications.checkPermission( ) == 0 ) {

				function close_notification( ) {

					notification.close( );

				}

				notification			= window.webkitNotifications.createNotification( 'css/images/debugger.png' , jsonMsg.debugFileName , jsonMsg.debugReason + ' , Line : ' + jsonMsg.debugLineNb );

				notification.tag		= jsonMsg.contextId;

				notification.ondisplay	= function( ) {

					setTimeout( close_notification , 5000 );

				};

				notification.onclose	= function( ) { };

				notification.onclick	= function( ) {

					window.focus();

					this.cancel();

				};

				notification.show( );

			} else {

				window.webkitNotifications.requestPermission( );

			}

			if ( $( ".context:not(.hidden)" ).length == 1 ){

				treatOpenWindow( jsonMsg.contextId );

			}

        } else {

            console.log( "treatMessage: updateContext non existent contextID=" , contextId );

        }

    }

    if(jsonMsg.method == "breakpointsUpdate"){
        function _cleanFileName(path) {  //Replace the ../ by http://
            var pathParts = path.split('/');
            if (pathParts[0] !== '..') {
                return path;
            }
            var solutionName = pathParts[1];
            pathParts.splice(0, 1);
            return 'http://' + solutionName + '/' + pathParts.join('/');
        }        
        var tmp = [];
        for(var j = 0; j < jsonMsg.breakpoints.length; j++){
            bps = jsonMsg.breakpoints[j];
            bps.filename = _cleanFileName(bps.filename);
            for(var i = 0; i < bps.lines.length; i++){
                tmp.push({"sourceFileId":bps.filename,"lineNumber":bps.lines[ i ],"condition":"","enabled":true});
            }
        }
        localStorage.breakpoints = JSON.stringify(tmp);
    }

    if ( jsonMsg.method == "setURLContext" ) {

        ctx = $( "#" + jsonMsg.contextId );

        if ( ctx.length > 0 ) {

            if ( !ctx.data( "url" ) ) {

                ctx.data( "url" , "/walib/debugger/devtools/devtools.html?host=" + WAKANDA_SERVER_HOST + ":" + WAKANDA_SERVER_PORT + "&page=" + jsonMsg.url );

                treatOpenWindow( jsonMsg.contextId );

            }
        } else {

            console.log( "treatMessage: setURLContext non existent contextID=" , contextId );

        }

    }

	if ( jsonMsg.method == "hideContext" ) {
        ctx	= $( "#" + jsonMsg.contextId );
        if ( ctx.length > 0 ) {
            $( "#" + jsonMsg.contextId ).addClass("hidden");
            $( "#frame-" + jsonMsg.contextId ).hide();
            ws.send( '{"result":"ok","id":"' + jsonMsg.id + '"}' );
		}
	}

    if ( jsonMsg.method == "removeContext" ) {

        ctx	= $( "#" + jsonMsg.contextId );

        if ( ctx.length > 0 ) {

            $( "#" + jsonMsg.contextId ).remove( );

            $( "#frame-" + jsonMsg.contextId ).remove( );

            window.focus( );

            ws.send( '{"result":"ok","id":"' + jsonMsg.id + '"}' );

            if ( $( '.debugFrame' ).length > 0 ) {

                    treatOpenWindow( $( '.debugFrame' ).attr( 'id' ).split( '-' )[ 1 ] );

            }

			if ( jsonMsg.method == "hideContext" ) {

				addNewElement( jsonMsg.contextId );

			}

        } else {

            console.log( "treatMessage: removeContext non existent contextID=" , contextId );

        }

    }

}

function authenticate( ) {

	ws.send( '{"method":"disconnect","id":"GuyHERMANN"}' );

    ws.close( );

    $( "#auth" ).dialog( {

        modal		: true ,

        width		: 350 ,

        height		: 200 ,

        position	: [ "center" , 200 ]

    } );

    $( '#password,#login' ).keypress( function ( e ) {

        if ( e.which == 13 ) {

           $( "#auth_submit" ).click( );

        }

    } );

    $( "#auth_submit" ).button( );


    $( "#auth_submit" ).click( function( ) {

        var

        jsonResp ,

        login ,

        xhr;

        xhr			= new XMLHttpRequest( );

        login		= 'login(' + $( "#login" ).attr( "value" ) + ',' + $( "#password" ).attr( "value" ) + ')'

        xhr.open( 'GET' , '/rest/$directory/' + login , false );

        xhr.send( );

        jsonResp	= JSON.parse( xhr.response );

        console.log( "Authenticate RESPresp->" , jsonResp );

        if ( jsonResp.result == true ) {

            ws		= connectWakSrv( );

            $( "#auth" ).dialog( "close" );

            state	= STOPPED_STATE;

        } else {

            $( ".ui-dialog" ).effect( "shake" , null , 100 , null );

            $( "#errorMsg" ).text( "Authentication error !" );

            state	= RETRY_STATE;
        }

    } );

}

function treatError( msg ) {

    console.log( "treatError called, state=" , ws.readyState , " msg=" , msg , "  ws=" , ws );

    // document.getElementById( "username_form" ).style.visibility	= "visible";
    document.getElementById( "username_form" ).style.display	= "block";

	//
	// after a browser refresh (state of new window is STOPPED_STATE), the previous window has closed its websocket but WAKsrv is not immediately aware
	// so WAKsrv still considers no new connection is authorized -> which can cause a treatError call on the refreshed (new) window ws (new connection refused)
	// hence its worth retrying a connection after a while
	//
	if ( (state == STOPPED_STATE) && firstTry ) {
		firstTry = false;
		setTimeout(function(){ws = connectWakSrv();},2000);
	}

}

function treatClose( msg ) {

    console.log( "treatClose called, state=" , ws.readyState , " msg=" , msg );

    $( ".context" ).remove( );

    $( ".debugFrame" ).remove( );

    state = STOPPED_STATE;

    refreshHtml( );

}

function treatOpen( ) {

    console.log( "treatOpen called" );

    if ( state != STOPPED_STATE ) {

        console.log( "treatOpen bad state=" , state );

        ws.close( );

    } else {

        state = CONNECTING_STATE;

        //document.getElementById( "username_form" ).style.visibility = "hidden";
        document.getElementById( "username_form" ).style.display = "none";

        ws.send( '{"method":"connect","id":"GuyHERMANN"}' );

    }

}

function connectWakSrv( ) {

    console.log("trying to connect to ",WAKANDA_SERVER_WS_URL);

    state			= STOPPED_STATE;

    var lWS			= new WebSocket(WAKANDA_SERVER_WS_URL);

    lWS.onmessage	= treatMessage;

    lWS.onclose 	= treatClose;

    lWS.onerror 	= treatError;

    lWS.onopen		= treatOpen;

    console.log( "readystate=" , lWS.readyState );

    return lWS;

}

var windowIsActive						= true;
var id = 1000;
var WAKANDA_SERVER_SOLUTION_NAME		= "";
var WAKANDA_SERVER_HOST					= window.location.hostname;
var WAKANDA_SERVER_PORT					= window.location.port;
console.log("window.location.protocol->"+window.location.protocol);
var WAKANDA_SERVER_IS_SSL				= (window.location.protocol == "https:");
if (WAKANDA_SERVER_IS_SSL) {
	var WAKANDA_SERVER_WS_URL				= "wss://" + WAKANDA_SERVER_HOST + ":" + WAKANDA_SERVER_PORT + "/wka_dbg/devtools/remote_debugger_ws";
} else {
	var WAKANDA_SERVER_WS_URL				= "ws://" + WAKANDA_SERVER_HOST + ":" + WAKANDA_SERVER_PORT + "/wka_dbg/devtools/remote_debugger_ws";
}
var WAKANDA_SERVER_EMPTY_DEBUG_PAGE_URL	= "/wka_dbg/devtools/devtools.html?host=" + WAKANDA_SERVER_HOST + ":" + WAKANDA_SERVER_PORT + "&page=EMPTY"

var hash				= {};
var STOPPED_STATE		= 0;
var CONNECTING_STATE	= 1;
var CONNECTED_STATE		= 2;
var RETRY_STATE			= 3;

var firstTry			= true,
    rpcFirstTry         = true
;
var state				= STOPPED_STATE;
var ws;

var lastContext = null;


function warnUser(messageObject){
    alert(messageObject.message);
}

function commandServer(/* url, params */){
    // summary:
    //      This function is used for ajax calls. We might want to do checks, data manipulation of params, etc, here
    //      By default, this function issue a getDebuggerStatus command to the server
    // url: string
    //      the target url for the ajax call
    // params: object
    //      follows parameters such as defined in http://api.jquery.com/jQuery.ajax/
    //      {
    //          success: callBackFunction,
    //          error: callBackFunction
    //      }

    // if no url is provided we use the default one
	if (WAKANDA_SERVER_IS_SSL) {
		var url = "https://" + WAKANDA_SERVER_HOST + ":" + WAKANDA_SERVER_PORT + "/rpc/";
	} else {
		var url = "http://" + WAKANDA_SERVER_HOST + ":" + WAKANDA_SERVER_PORT + "/rpc/";
    }
    var params = {};

    for (var i = 0; i < arguments.length; i++){
        switch(typeof arguments[i]){
            case "string":
                url = arguments[i];
                break;
            case "object":
                params = arguments[i];
                break;
        }
    }

    // for our needs and convenience, we provide default parameters
    var ajaxParams = {
        type: "POST",
        contentType: "text/plain; charset=utf-8",
        data: '{ "jsonrpc": "2.0", "module": "webAdmin", "id": "2857873", "method": "getDebuggerStatus", "params": [] }',
        dataType: "json",
        success: checkDebuggerStatus
    };
    $.extend(true, ajaxParams, params);

    $.ajax(url, ajaxParams);
}

function checkDebuggerStatus(status){
    var result = (status ? ( (!!status.result) ? JSON.parse(status.result) : null ) : null);
    if(result){
        var cmd = null;
        switch(result.debuggerType){
            case "REMOTE_DEBUGGER":
                if(!!result.started && !result.debuggerConnected){
                    // the debugger is started and nobody is using it
                    ws = connectWakSrv();
                }else{
                    // either the debugger is not started or someone is using it
                    if(!result.started && !result.debuggerConnected){
                        // debugguer is not started, we need to start it
                        commandServer({
                            data: '{"jsonrpc":"2.0","module":"webAdmin","id":6945855,"method":"startDebugger","params":[]}',
                            success: function(msg){
                                console.log("Starting debugger on server...");
                                // calling status again, to make sure it is really started and available
                                // TODO: server should return the status everytime a command asks for a state change
                                commandServer();
                            }
                        });

                    }else{
                        // if we reach here on the first try, we retry once
                        // FIXME: it is a temp hack in order to avoid a "debugger unavailable" after page refresh
                        if (rpcFirstTry) {
                            rpcFirstTry = false;
                            // someone is connected,  warn the user
                            refreshHtml({connectionStatus: "Loading..."});
                            setTimeout('commandServer()', 4000);
                            return;
                        }
                        // someone is connected,  warn the user
                        var message = {
                            message : "Debugger already in use by someone else.",
                            connectionStatus: "UNAVAILABLE (Debugger already in use)"
                        };
                        warnUser(message);
                        refreshHtml(message);
                    }
                }
                break;
            case "WAKANDA_DEBUGGER":
                if((!!result.started && !result.debuggerConnected) || !result.started){
                    // the debugger is started and nobody is using it
                    commandServer({
                        data: '{"jsonrpc":"2.0","module":"webAdmin","id":6945855,"method":"setDebuggerServer","params":[1]}',
                        success: function(msg){
                            console.log("Switching debugger to remote on server...");
                            commandServer();
                        }
                    });
                }else{
                    // someone is connected,  warn the user
                    var message = {
                        message : "Debugger already in use by someone else.",
                        connectionStatus: "UNAVAILABLE (Debugger already in use)"
                    };
                    warnUser(message);
                    refreshHtml(message);
                }
                break;
            case "NO_DEBUGGER":
                // Debugging has been disabled on the server.
                var message = {
                    message : "The debugger is OFF.",
                    connectionStatus: "UNAVAILABLE (Debugger is off)"
                };
                warnUser(message);
                refreshHtml(message);
                break;
            default :
                // we are not supposed to end up here
                var message = {
                    message : "Unable to identify the state of the remote debugger.",
                    connectionStatus: "UNAVAILABLE (Debugger status unknown)"
                };
                warnUser(message);
                refreshHtml(message);
        }
    }
}


window.onload	= function ( ) {

    //document.getElementById( "username_form" ).style.visibility = "hidden";
    document.getElementById( "username_form" ).style.display = "none";


};

window.onbeforeunload = function() {
    treatClose();
    if(!!ws) {
        ws.onclose = function () {}; // disable onclose handler first
        ws.close();
    }
};

// when the user refreshes the browser page, we close the opened debugging windows (thus continuing the currently debugged JS scripts)
window.onunload = function ( ) {
    console.log( "onunload called" );
    treatClose( );
    if(!!ws) {
        ws.close( );
    }
};

BrowserDetect.init( );

BrowserDetect.isCompatible = false;

if ( ( BrowserDetect.browser == "Chrome" ) && ( BrowserDetect.version >= 19 ) ) {

    BrowserDetect.isCompatible = true;

}

if ( ( BrowserDetect.browser == "Safari" )  && ( BrowserDetect.version >= 6 ) ) {

    BrowserDetect.isCompatible = true;

}

if ( !BrowserDetect.isCompatible ) {

    window.alert("Your browser is not compatible with Wakanda's Remote Web Debugger option.");

} else {
    // we do the first RPC calls to make sure the debugger is available and of the correct type
    commandServer();
}

$( 'document' ).ready( function ( ) {

	$( window ).focus( function ( ) {

		windowIsActive	= true;

	});

	$( window ).blur( function ( ) {

		if ( $( document.activeElement ).hasClass( 'debugFrame' ) == false ) {

			windowIsActive	= false;

		} else {

			document.activeElement.contentWindow.addEventListener( "blur" , window.top.frameBlured , false );

		}

	} );

	$( '#contexts' ).resizable( {

				handles		: "e" ,

				distance	: 0 ,

				delay		: 0 ,

				start		: function ( ) {

					$( '#framesDiv iframe' ).css( 'pointer-events' , 'none' );

				} ,

				stop		: function ( ) {

					$( '#framesDiv iframe' ).css( 'pointer-events' , 'auto' );

				}

	} );

	$( 'body' ).on( 'click' , '.context' , function( event ) {

        treatOpenWindow( $( this ).attr( "id" ) );

		event.stopPropagation( );

    } );

	$( 'body' ).on( 'click' , '.context .abort_button' , function ( event ) {

		var

		ctxId;

		event.stopPropagation( );

		ctxId = $( this ).parents( '.context' ).attr( 'id' );

		/*$("#contexts_list div[id]").each(function(idx, node){
			var nodeClass = node.className;
			if(nodeClass.indexOf("hidden") == -1){
				ws.send( '{"method":"abort","id":"' + node.id + '"}' );
			}
		})*/
		ws.send( '{"method":"abort","id":"' + ctxId + '"}' );

	} );

	$( 'body' ).on( 'click' , '.context .debug_button' , function ( event ) {

		event.stopPropagation( );

	} );

	$( 'body' ).on( 'click' , '.context .expand' , function ( event ) {

		var

		p;

		event.stopPropagation( );

		p	= $( this ).parents( '.context' );

		if ( p.hasClass( 'expanded' ) ) {

			p.removeClass( 'expanded' );

		} else {

			p.addClass( 'expanded' );

		}

	} );

    if(window.webkitNotifications && window.webkitNotifications.checkPermission() === 0){ // 0 is PERMISSION_ALLOWED
        $('#show_notif_request').hide();
    }else{
        if(window.webkitNotifications && window.webkitNotifications.checkPermission() !== 0){
            $('#show_notif_request').show();
        }else{
            // if notifications are not supported, we do not even need to show the switch
            $('#show_notif_request').hide();
        }
    }

	$( '#show_notif_request' ).click( function ( event ) {

		var

		notification_test;

		function close_notification( ) {

			notification_test.close( );

		}

		if ( window.webkitNotifications.checkPermission( ) == 0 ) {

			notification_test			= window.webkitNotifications.createNotification( 'css/images/debugger.png' , 'Notification' , 'This is a Wakanda Debugger Notification' );

			notification_test.ondisplay	= function( ) { };

			notification_test.onclose	= function( ) { };

			notification_test.show( );

			setTimeout( close_notification , 5000 );

            $('#show_notif_request').hide();

		} else {

			window.webkitNotifications.requestPermission( );

		}

	} );

} );

function frameBlured ( event ) {

	if ( $( document.activeElement ).hasClass( 'debugFrame' ) == true ) {

		window.top.windowIsActive	= false;

	}

}

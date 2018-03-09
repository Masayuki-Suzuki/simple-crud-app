var keyReturnPath = "rtn_path";

var keyTargetId = "line_notify_entry_target_id";
var keyRequestId = "line_notify_entry_request_id";

var hashLineEntry = '#line-notify-entry';

$(function(){
	$( window ).resize( centeringModalWindow );

	if ( getHash() === hashLineEntry
			&& getParameter( keyTargetId ) !== ""
				&& getParameter( keyRequestId ) !== "" )
		openLineNotifyEntryModal( getParameter( keyTargetId ) );
});

function openLineNotifyEntryModal( targetId ) {
	$( this ).blur();// focus out.
	if( $("#line-notify-entry-modal-window")[0]  ) $( "#line-notify-entry-modal-window"  ).remove(); // renew modal.
	if( $("#line-notify-entry-modal-overlay")[0] ) $( "#line-notify-entry-modal-overlay" ).remove(); // renew modal.

	$( "body" ).append( '<div id="line-notify-entry-modal-window"></div>'  );
	$( "body" ).append( '<div id="line-notify-entry-modal-overlay"></div>' );

	centeringModalWindow();
	pushStateWithHashAndParameters(hashLineEntry, targetId);

	var returnPath = getReturnPath();
	var requestId = getParameter( keyRequestId );

	$.ajax({
		  type : "GET"
		, url : getContextPath() + "/sns/entry/line/form/" + targetId + "/" + requestId
		, data : keyReturnPath + "=" + encodeURIComponent(returnPath)
		, cache : false
		, async : false
		, success : function( data ) {
				$('#line-notify-entry-modal-window').html(data);
				$("#line-notify-entry-button").click( function(){
					var queryString = "?" + keyReturnPath + "=" + encodeURIComponent(returnPath);
					location.href = getContextPath() + "/sns/entry/line/auth/" + targetId + "/" + requestId + queryString;
				});
		}, error : function (XMLHttpRequest, status, errorThrown) {
			$('#line-notify-entry-modal-window').html( '<span style="color: red; font-weight: bold;">※エラーが発生しました。</span>' );
		}
	});

	$( "#line-notify-entry-modal-window"  ).fadeIn( "slow" );
	$( "#line-notify-entry-modal-overlay" ).fadeIn( "slow" );

	$( "#line-notify-entry-modal-overlay,#line-notify-entry-modal-close,#line-notify-entry-complete-button" ).unbind().click( function() {
		$( "#line-notify-entry-modal-window"  ).fadeOut( "slow" );
		$( "#line-notify-entry-modal-overlay" ).fadeOut( "slow", function() {
			$( "#line-notify-entry-modal-overlay" ).remove();
		});
		pushStateRemoveHashAndParameters(hashLineEntry, targetId);
	});
}

function centeringModalWindow() {

	var w = $( window ).width();
	var h = $( window ).height();

	var ow = $( "#line-notify-entry-modal-window" ).outerWidth();
	var oh = $( "#line-notify-entry-modal-window" ).outerHeight();

	//センタリング
	var left = ((w - ow) / 2);
	var top  = $(window).scrollTop() + 20;
	$( "#line-notify-entry-modal-window" ).css( {"left": left + "px","top": top + "px"} );
}

function getContextPath() {
	var contextPath = "";
	var paths = window.location.pathname.split('/');
	for ( i = 0; i < paths.length; i ++ ) {
		if ( paths[i] === "" ) continue;
		contextPath += "/" + paths[i];
		if ( paths[i].indexOf("jobfind") !== -1 )
			return contextPath;
	}
}

function pushStateWithHashAndParameters( hash, targetId ) {
	var href = window.location.href;
	href = href.replace( /[?|#].+/, ""); // # delete after '? or #' character.

	var search = location.search;
	if ( getParameter(keyRequestId) === "" )
		search = appendParameter( search, keyRequestId, uuid() );
	search = appendParameter( search, keyTargetId, targetId );
	window.history.replaceState(null, null, href + search + hash);
}

function pushStateRemoveHashAndParameters( hash, targetId ) {
	var href = location.href;
	href = href.replace( /[?|#].+/, ""); // # delete after '? or #' character.

	var search = location.search;
	search = removeParameter( search, keyTargetId, targetId );
	search = removeParameter( search, keyRequestId, getParameter(keyRequestId) );
	window.history.replaceState(null, null, href + search);
}

function appendParameter( queryString, key, value ) {
	var search = removeParameter( queryString, key, value);
	if ( search !== "" )
		return search + "&" + key + "=" + value;
	return "?" + key + "=" + value;
}

function removeParameter( queryString, key, value ) {
	var search = queryString.replace( key + "=" + value, "").replace( "?&", "?").replace( "&&", "&");
	if ( search === "?" )
		return "";
	return search.replace( /&$/, "");
}

function getReturnPath() {
	return location.pathname + location.search + location.hash;
}

function getHash() {
	var hash = location.hash;
	if ( hash )
		return hash;
	return "";
}

function getParameter( key ) {
	var queries = location.search.replace("?", "").split("&");
	for ( i = 0; i < queries.length; i ++ ) {
		var keyValue = queries[i].split("=");
		if ( keyValue[0] === key )
			return keyValue[1];
	}
	return "";
}

function uuid() {
	var uuid = "", i, random;
	for (i = 0; i < 32; i++) {
		random = Math.random() * 16 | 0;
		if (i == 8 || i == 12 || i == 16 || i == 20)
			uuid += "-";
		uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
	}
	return uuid;
}

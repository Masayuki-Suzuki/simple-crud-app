var gAgent = navigator.userAgent;
var gAppVer = navigator.appVersion;

var gBrowser = navigator.appName;
var gPlatform = null;
var gVersion = null;

if (gAgent.indexOf('Mac') != -1) {
	gPlatform = "Mac";
} else if (gAgent.indexOf('Win') != -1) {
	gPlatform = "Win";
} else {
	gPlatform = "other";
}

if (gAgent.indexOf('Safari') != -1) {
	gBrowser = "Safari";
} else if (gAgent.indexOf('MSIE') != -1) {
	gVersion = gAgent.substring((gAgent.indexOf('MSIE') + 5), (gAgent.indexOf('MSIE') + 9));
	gBrowser = "MSIE";

} else if (gAgent.indexOf('MSIE') == -1) {
	gVersion = gAppVer.substring(0,4);
	if (gAgent.indexOf('Gecko') != -1) {
		if (gAgent.indexOf('Netscape') != -1) {
			gVersion = gAgent.substring((gAgent.indexOf('Netscape') + 10), (gAgent.indexOf('Netscape') + 14));
		}
	}
	if (gBrowser == "Netscape") {
		gBrowser = "NN";
	}
}

if (gVersion.indexOf(';') != -1) {
	gVersion = gVersion.substring(0, gVersion.indexOf(';'));
}
if (gVersion.indexOf(' ') != -1) {
	gVersion = gVersion.substring(0, gVersion.indexOf(' '));
}



if (!gNewWindow) {
	var gNewWindow = null;
}

function openWin(url, n, w, h, st){
	var width = parseInt(w);
	var height = parseInt(h);
	var toolbar;
	var location;
	var directories;
	var status;
	var menubar;
	var resizable;
	var scrollbars;
	var dependent;

	st.charAt(0) == '1'	?  toolbar = 'yes' 		: toolbar = 'no';
	st.charAt(1) == '1'	?  location = 'yes' 	: location = 'no';
	st.charAt(2) == '1'	?  directories = 'yes' 	: directories = 'no';
	st.charAt(3) == '1'	?  status = 'yes' 		: status = 'no';
	st.charAt(4) == '1'	?  menubar = 'yes' 		: menubar = 'no';
	st.charAt(5) == '1'	?  resizable = 'yes' 	: resizable = 'no';
	st.charAt(6) == '1'	?  scrollbars = 'yes' 	: scrollbars = 'no';
	st.charAt(7) == '1'	?  dependent = 'yes' 	: dependent = 'no';

	if (location == 'yes') {
		// NN5 over
		if (gBrowser == "NN" && gVersion >= 5) {
			width += 0;
			height += 0;

		// NN4 for Mac
		} else if (gPlatform == "Mac" && gBrowser == "NN" && gVersion >= 4) {
			width += 15;
			height += 15;

		// NN4(for Win)
		} else if (gBrowser == "NN" && gVersion >= 4) {
			width += 0;
			height += 0;

		// IE5 for Mac
		} else if (gPlatform == "Mac" && gBrowser == "MSIE" && gVersion >= 5) {
			width += 0;
			height += 19;

		// IE4 for Mac
		} else if (gPlatform == "Mac" && gBrowser == "MSIE" && gVersion >= 4) {
			width += 2;
			height += 6;

		// IE6(for Win)
		} else if (gBrowser == "MSIE" && gVersion >= 6) {
			width += 0;
			height -= 19;

		// IE5(for Win)
		} else if (gBrowser == "MSIE" && gVersion >= 5) {
			width += 0;
			height -= 19;

		// IE4(for Win)
		} else if (gBrowser == "MSIE" && gVersion >= 4) {
			width += 0;
			height -= 19;

		// safari for Mac
		} else if (gPlatform == "Mac" && gBrowser == "Safari" && gVersion >= 0) {
			width += -2;
			height += 50;

		// other
		} else {
			width += 0;
			height += 0;
		}
	}

	if (scrollbars == 'yes') {
		// NN5 over
		if (gBrowser == "NN" && gVersion >= 5) {
			width += 17;
			height += 1;

		// NN4 for Mac
		} else if (gPlatform == "Mac" && gBrowser == "NN" && gVersion >= 4) {
			width += 15;
			height -= 0;

		// NN4(for Win)
		} else if (gBrowser == "NN" && gVersion >= 4) {
			width += 16;
			height -= 0;

		// IE5 for Mac
		} else if (gPlatform == "Mac" && gBrowser == "MSIE" && gVersion >= 5) {
			width -= 0;
			height -= 16;

		// IE4 for Mac
		} else if (gPlatform == "Mac" && gBrowser == "MSIE" && gVersion >= 4) {
			width -= 0;
			height -= 14;

		// IE5(for Win)
		} else if (gBrowser == "MSIE" && gVersion >= 5) {
			width += 17;
			height += 0;

		// IE4(for Win)
		} else if (gBrowser == "MSIE" && gVersion >= 4) {
			width += 16;
			height += 0;

		// other
		} else {
			width += 15;
			height += 3;
		}
	} else {
		// NN5 over
		if (gBrowser == "NN" && gVersion >= 5) {
			width += 1;
			height += 1;

		// NN4 for Mac
		} else if (gPlatform == "Mac" && gBrowser == "NN" && gVersion >= 4) {
			width -= 0;
			height -= 0;

		// NN4(for Win)
		} else if (gBrowser == "NN" && gVersion >= 4) {
			width -= 0;
			height -= 0;

		// IE5 for Mac
		} else if (gPlatform == "Mac" && gBrowser == "MSIE" && gVersion >= 5) {
			width -= 0;
			height -= 0;

		// IE4 for Mac
		} else if (gPlatform == "Mac" && gBrowser == "MSIE" && gVersion >= 4) {
			width -= 0;
			height += 2;

		// IE5(for Win)
		} else if (gBrowser == "MSIE" && gVersion >= 5) {
			width += 0;
			height += 0;

		// IE4(for Win)
		} else if (gBrowser == "MSIE" && gVersion >= 4) {
			width += 0;
			height += 0;

		// other
		} else {
			width += 0;
			height += 0;
		}
	}


	if (status == 'yes') {
		// NN4 for Mac
		if (gPlatform == "Mac" && gBrowser == "NN" && gVersion >= 4 && gVersion < 5) {
			width -= 15;
			height -= 15;

		// IE4 for Mac
		}else if(gPlatform == "Mac" && gBrowser == "MSIE" && gVersion >= 4 && gVersion < 5){
			width -= 0;
			height += 16;

		}
	}


	if (status == 'no') {
		// NN4
		if (gBrowser == "NN" && gVersion >= 4 && gVersion < 5) {
			width -= 0;
			height -= 0;

		// NN5 over
		}else if (gPlatform == "Mac" && gBrowser == "NN") {
			width += 0;
			height += 80;

		// NN5 over
		}else if (gPlatform == "Win" && gBrowser == "NN") {
			width += 0;
			height += 20;

		// safari for Mac
		} else if (gPlatform == "Mac" && gBrowser == "Safari" && gVersion >= 0) {
			width += 0;
			height += 20;

		}
	}


	var win_size = 'width=' + width + ',height=' + height;
	var win_attr = 'toolbar=' + toolbar + ',location=' + location + ',directories=' + directories + ',status=' + status + ',menubar=' + menubar + ',resizable=' + resizable + ',scrollbars=' + scrollbars + ',dependent=' + dependent;

	var w = window.open(url, n, win_attr + ',' + win_size);
	return false;
}
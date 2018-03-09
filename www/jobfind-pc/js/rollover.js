function initRollovers() {
	if (!document.getElementById) return;
	
	var aPreLoad = new Array();
	var pPreLoad = new Array();
	var sTempSrc;
	var aImgTemp = document.getElementsByTagName('img');
	var aInputTemp = document.getElementsByTagName('input');
	var aImages = new Array();
	
	for( var i=0; i<aImgTemp.length; i++ ) {
		if (aImgTemp[i].className == 'imgover' || aImgTemp[i].className == 'navover' || aImgTemp[i].className == 'navover2') {
			aImages[ aImages.length ] = aImgTemp[i];
		}
	}
	for( var i=0; i<aInputTemp.length; i++ ) {
		if( aInputTemp[i].getAttribute('type').toLowerCase() == 'image' && aInputTemp[i].className.indexOf('imgover') != -1 ) {
			aImages[ aImages.length ] = aInputTemp[i];
		}
	}
	
	for (var i = 0; i < aImages.length; i++) {
		var src = aImages[i].getAttribute('src');
		var ftype = src.substring(src.lastIndexOf('.'), src.length);
		var hsrc = src.replace(ftype, '_on'+ftype);
		
		aImages[i].setAttribute('hsrc', hsrc);
		
		aPreLoad[i] = new Image();
		aPreLoad[i].src = hsrc;
		
		aImages[i].onmouseover = function() {
			sTempSrc = this.getAttribute('src');
			this.setAttribute('src', this.getAttribute('hsrc'));
		}
		aImages[i].onmouseout =
		aImages[i].onclick = 
		aImages[i].onmouseup = function() {
			sTempSrc = this.getAttribute('src').replace('_on'+ftype, ftype);
			this.setAttribute('src', sTempSrc);
		}
	}
}

window.onload = initRollovers;
function swapMap(imgpath) {
	document.getElementById('mapImage').src = imgpath;
}

function initMapURL(dirpath) {
	var aMap = document.getElementsByTagName('a');
	var urls = new Array();
	for( var i=0; i<aMap.length; i++ ) {
		if (aMap[i].className == 'areatag') {
			urls[urls.length] = aMap[i].getAttribute('href');
		}
	}
	
	var litag = document.getElementsByTagName('li');
	for( var i=0; i<litag.length; i++ ) {
		if (litag[i].className == 'a1') {
			litag[i].onmouseover = function() {
				swapMap(dirpath+'map_tohoku.gif');
			}
			litag[i].onmouseout = function() {
				swapMap(dirpath+'shim.gif');
			}
			litag[i].onclick = function() {
				location.href = urls[0];
			}
			litag[i].style.cursor = 'pointer';
			document.getElementById('area1').onmouseover = function() {
				swapMap(dirpath+'map_tohoku.gif');
			}
			document.getElementById('area1').onmouseout = function() {
				swapMap(dirpath+'shim.gif');
			}
			document.getElementById('area1').onclick = function() {
				location.href = urls[0];
			}
		}
		if (litag[i].className == 'a2') {
			litag[i].onmouseover = function() {
				swapMap(dirpath+'map_kanto.gif');
			}
			litag[i].onmouseout = function() {
				swapMap(dirpath+'shim.gif');
			}
			litag[i].onclick = function() {
				location.href = urls[1];
			}
			litag[i].style.cursor = 'pointer';
			document.getElementById('area2').onmouseover = function() {
				swapMap(dirpath+'map_kanto.gif');
			}
			document.getElementById('area2').onmouseout = function() {
				swapMap(dirpath+'shim.gif');
			}
			document.getElementById('area2').onclick = function() {
				location.href = urls[1];
			}
		}
		if (litag[i].className == 'a3') {
			litag[i].onmouseover = function() {
				swapMap(dirpath+'map_hokushinetsu.gif');
			}
			litag[i].onmouseout = function() {
				swapMap(dirpath+'shim.gif');
			}
			litag[i].onclick = function() {
				location.href = urls[2];
			}
			litag[i].style.cursor = 'pointer';
			document.getElementById('area3').onmouseover = function() {
				swapMap(dirpath+'map_hokushinetsu.gif');
			}
			document.getElementById('area3').onmouseout = function() {
				swapMap(dirpath+'shim.gif');
			}
			document.getElementById('area3').onclick = function() {
				location.href = urls[2];
			}
		}
		if (litag[i].className == 'a4') {
			litag[i].onmouseover = function() {
				swapMap(dirpath+'map_tokai.gif');
			}
			litag[i].onmouseout = function() {
				swapMap(dirpath+'shim.gif');
			}
			litag[i].onclick = function() {
				location.href = urls[3];
			}
			litag[i].style.cursor = 'pointer';
			document.getElementById('area4').onmouseover = function() {
				swapMap(dirpath+'map_tokai.gif');
			}
			document.getElementById('area4').onmouseout = function() {
				swapMap(dirpath+'shim.gif');
			}
			document.getElementById('area4').onclick = function() {
				location.href = urls[3];
			}
		}
		if (litag[i].className == 'a5') {
			litag[i].onmouseover = function() {
				swapMap(dirpath+'map_kansai.gif');
			}
			litag[i].onmouseout = function() {
				swapMap(dirpath+'shim.gif');
			}
			litag[i].onclick = function() {
				location.href = urls[4];
			}
			litag[i].style.cursor = 'pointer';
			document.getElementById('area5').onmouseover = function() {
				swapMap(dirpath+'map_kansai.gif');
			}
			document.getElementById('area5').onmouseout = function() {
				swapMap(dirpath+'shim.gif');
			}
			document.getElementById('area5').onclick = function() {
				location.href = urls[4];
			}
		}
		if (litag[i].className == 'a6') {
			litag[i].onmouseover = function() {
				swapMap(dirpath+'map_chugoku.gif');
			}
			litag[i].onmouseout = function() {
				swapMap(dirpath+'shim.gif');
			}
			litag[i].onclick = function() {
				location.href = urls[5];
			}
			litag[i].style.cursor = 'pointer';
			document.getElementById('area6').onmouseover = function() {
				swapMap(dirpath+'map_chugoku.gif');
			}
			document.getElementById('area6').onmouseout = function() {
				swapMap(dirpath+'shim.gif');
			}
			document.getElementById('area6').onclick = function() {
				location.href = urls[5];
			}
		}
		if (litag[i].className == 'a7') {
			litag[i].onmouseover = function() {
				swapMap(dirpath+'map_kyushu.gif');
			}
			litag[i].onmouseout = function() {
				swapMap(dirpath+'shim.gif');
			}
			litag[i].onclick = function() {
				location.href = urls[6];
			}
			litag[i].style.cursor = 'pointer';
			document.getElementById('area7').onmouseover = function() {
				swapMap(dirpath+'map_kyushu.gif');
			}
			document.getElementById('area7').onmouseout = function() {
				swapMap(dirpath+'shim.gif');
			}
			document.getElementById('area7').onclick = function() {
				location.href = urls[6];
			};
		}
	}
}

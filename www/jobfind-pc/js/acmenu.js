/*======================================================================*/
/*																		*/
/*		【アコーディオンメニュー共通化js】								*/
/*																		*/
/*		acmenu.cssとacmenu.js（当js）を一緒に組み込んでください			*/
/*		実装はcss側に記載されている同名のクラス名を記述するだけです		*/
/*																		*/
/*		AC_contents1～AC_contents5は互いに干渉させないためのもので		*/
/*		アコーディオンメニューの動作を互いに干渉させたくない場合は		*/
/*		違うAC_contentsの番号を割り当ててください（５種類まで可能）		*/
/*																		*/
/*		開きっぱなしにしたい場合は『AC_contentsS』を実装してください	*/
/*																		*/
/*																		*/
/*		★レスポンシブ対応させたい場合★								*/
/*		AC_contents1R～AC_contents5R、AC_contentsRRを使用してください	*/
/*		※末尾に半角大文字「R」がつきます。								*/
/*		SP時のみに機能するようになります								*/
/*																		*/
/*																		*/
/*======================================================================*/


$(window).load(function(){
	accordionmenu()
});
$(window).resize(function(){
	accordionmenu()
});

function accordionmenu(){
	if (
	($('.AC_trriger1R').css('display')=="inline-block")	||
	($('.AC_trriger2R').css('display')=="inline-block")	||
	($('.AC_trriger3R').css('display')=="inline-block")	||
	($('.AC_trriger4R').css('display')=="inline-block")	||
	($('.AC_trriger5R').css('display')=="inline-block")	||
	($('.AC_trrigerRR').css('display')=="inline-block")
	){
		/*SP⇒PC:コンテンツを閉じる*/
		$(".AC_contents1R").removeAttr("style");
		$(".AC_contents2R").removeAttr("style");
		$(".AC_contents3R").removeAttr("style");
		$(".AC_contents4R").removeAttr("style");
		$(".AC_contents5R").removeAttr("style");
		$(".AC_contentsRR").removeAttr("style");
		$(".AC_trriger1R").removeClass("AC_open1R");
		$(".AC_trriger2R").removeClass("AC_open2R");
		$(".AC_trriger3R").removeClass("AC_open3R");
		$(".AC_trriger4R").removeClass("AC_open4R");
		$(".AC_trriger5R").removeClass("AC_open5R");
		$(".AC_trrigerRR").removeClass("AC_openRR");
	}
}

$(function(){
	/*アコーディオンメニュー１*/
$(".AC_trriger1").click(function(){
	$(".AC_contents1").slideUp();
	$(".AC_trriger1").removeClass("AC_open1");
	if($(this).next(".AC_contents1").css("display")=="none"){
		$(this).next(".AC_contents1").slideDown();
		$(this).addClass("AC_open1");
	}
});

/*アコーディオンメニュー２*/
$(".AC_trriger2").click(function(){
	$(".AC_contents2").slideUp();
	$(".AC_trriger2").removeClass("AC_open2");
	if($(this).next(".AC_contents2").css("display")=="none"){
		$(this).next(".AC_contents2").slideDown();
		$(this).addClass("AC_open2");
	}
});

/*アコーディオンメニュー３*/
$(".AC_trriger3").click(function(){
	$(".AC_contents3").slideUp();
	$(".AC_trriger3").removeClass("AC_open3");
	if($(this).next(".AC_contents3").css("display")=="none"){
		$(this).next(".AC_contents3").slideDown();
		$(this).addClass("AC_open3");
	}
});

/*アコーディオンメニュー４*/
$(".AC_trriger4").click(function(){
	$(".AC_contents4").slideUp();
	$(".AC_trriger4").removeClass("AC_open4");
	if($(this).next(".AC_contents4").css("display")=="none"){
		$(this).next(".AC_contents4").slideDown();
		$(this).addClass("AC_open4");
	}
});

/*アコーディオンメニュー５*/
$(".AC_trriger5").click(function(){
	$(".AC_contents5").slideUp();
	$(".AC_trriger5").removeClass("AC_open5");
	if($(this).next(".AC_contents5").css("display")=="none"){
		$(this).next(".AC_contents5").slideDown();
		$(this).addClass("AC_open5");
	}
});

/*アコーディオンメニュー開きっぱなしVer*/
$(".AC_trrigerS").click(function(){
	    $(this).next(".AC_contentsS").slideToggle();
	    $(this).toggleClass("AC_openS");
});

/*======================================================================*/
/*		レスポンシブ対応版												*/
/*======================================================================*/
/*アコーディオンメニュー１*/
$(".AC_trriger1R").click(function(){
	if($(".AC_trriger1R").css("display")=="block"){
		$(".AC_contents1R").slideUp();
		$(".AC_trriger1R").removeClass("AC_open1R");
		if($(this).next(".AC_contents1R").css("display")=="none"){
			$(this).next(".AC_contents1R").slideDown();
			$(this).addClass("AC_open1R");
		}
	}
});

/*アコーディオンメニュー２*/
$(".AC_trriger2R").click(function(){
	$(".AC_contents2R").slideUp();
	$(".AC_trriger2R").removeClass("AC_open2R");
	if($(this).next(".AC_contents2R").css("display")=="none"){
		$(this).next(".AC_contents2R").slideDown();
		$(this).addClass("AC_open2R");
	}
});

/*アコーディオンメニュー３*/
$(".AC_trriger3R").click(function(){
	$(".AC_contents3R").slideUp();
	$(".AC_trriger3R").removeClass("AC_open3R");
	if($(this).next(".AC_contents3R").css("display")=="none"){
		$(this).next(".AC_contents3R").slideDown();
		$(this).addClass("AC_open3R");
	}
});

/*アコーディオンメニュー４*/
$(".AC_trriger4R").click(function(){
	$(".AC_contents4R").slideUp();
	$(".AC_trriger4R").removeClass("AC_open4R");
	if($(this).next(".AC_contents4R").css("display")=="none"){
		$(this).next(".AC_contents4R").slideDown();
		$(this).addClass("AC_open4R");
	}
});

/*アコーディオンメニュー５*/
$(".AC_trriger5R").click(function(){
	$(".AC_contents5R").slideUp();
	$(".AC_trriger5R").removeClass("AC_open5R");
	if($(this).next(".AC_contents5R").css("display")=="none"){
		$(this).next(".AC_contents5R").slideDown();
		$(this).addClass("AC_open5R");
	}
});

/*アコーディオンメニュー開きっぱなしVer*/
$(".AC_trrigerRR").click(function(){
	    $(this).next(".AC_contentsRR").slideToggle();
	    $(this).toggleClass("AC_openRR");
});
	
	
});
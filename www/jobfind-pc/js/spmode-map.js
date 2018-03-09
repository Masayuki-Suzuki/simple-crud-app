<!--ウィンドウ可変処理-->
<!--数値に依存しない方式なので画面幅の調整はspmode-map.cssにて-->

/*[.btn_acmap]SP用アコーディオンメニューのトリガー*/
$(window).load(function(){
	accordionmap()
});

$(window).resize(function(){
	accordionmap()
});

function accordionmap(){
	/*SP⇒PC:地図を表示しメニューを閉じる*/
	if (($('.btn_acmap').css('display') == 'none')){
		$("div.submap").show();
		$(".btn_acmap").removeClass("openmap");
	}
	/*SP⇒SP:メニュー開放中は維持する(PCモードに移項するまで)*/
	else if (($(".btn_acmap").hasClass('openmap')) ){
		return true;
	}
	/*PC⇒SP:地図を消去する*/
	else{
		$("div.submap").hide();	
	}
}

// アコーディオンメニュー(デフォルト地図）
$(function(){
		$(".btn_acmap").click(function(){
			$('div.submap').slideUp();
			$(".btn_acmap").removeClass('openmap');
			if($(this).next('div.submap').css("display") == 'none'){
				$(this).next('div.submap').slideDown();
				$(this).addClass('openmap');	
			}
		});
});
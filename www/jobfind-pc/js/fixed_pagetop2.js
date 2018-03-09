/*--------------------------------------------------------------------------------------------------

fixed_Pagetop.js
「ページトップヘ」ボタン追従処理

ブラウザのスクロールでボタンがフェードインし、
以後はついて来るように画面下に固定されます。
ボタン押下でスクロールアニメーションし、htmlに#pagetopのような余計なタグをつけることもありません。

フェードインのタイミングは任意のタイミングに変更できます(初期値は100)

----------------------------------------------------------------------------------------------------*/


$(function() {
	var showFlag = false;
	var bottomFlag = false;
	var topBtn = $('#floatButton');
	var topBtn_img = $('#floatButton a');
	topBtn.css('bottom', '-100px');
//	topBtn.hide();


	btnPosition();
	$(window).scroll(function () {
		btnPosition();
	});
	
	//マウスオーバー
	topBtn_img.hover(
	function(){$(this).fadeTo("fast",1.0);},
	function(){if(bottomFlag){$(this).fadeTo("fast",0.8);}
	});
	
	
	
	//ボタンポジショニング
	function btnPosition(){
		var width = $(window).width();
		var scrollHeight = $(document).height();// ドキュメントの高さ
		var scrollPosition = $(window).height() + $(window).scrollTop();//　ウィンドウの高さ+スクロールした高さ→　現在のトップからの位置
		if ($(this).scrollTop() > 100) {
			bottomFlag=true;
			if (showFlag == false) {
				showFlag = true;
				topBtn.stop().animate({'bottom' : '0'}, 200); 
			}
		} else {
			showFlag = false;
			topBtn.stop().animate({'bottom' : '-100px'}, 200); 
		}
		// 現在の下から位置が、フッターの高さの位置にはいった場合
		if ( (scrollHeight - scrollPosition) / scrollHeight <= 0.03) {
			//topBtn.css({"position":"relative","bottom": "0","opacity":"1.0"});
			topBtn.css({"opacity":"1.0"});
			topBtn_img.css({"opacity":"1.0"});
			bottomFlag=false;
				
			if($("ul#fnav_list").height() == 40){
				topBtn.stop().animate({'bottom' : '90px'}, 200); 
			}
			else if($("ul#fnav_list").height() == 60){
				topBtn.stop().animate({'bottom' : '90px'}, 200); 
			}
			else if($("ul#fnav_list").height() == 80){
				topBtn.stop().animate({'bottom' : '90px'}, 200); 
			}
			else{
				topBtn.stop().animate({'bottom' : '90px'}, 200);
			}
		}else{
			topBtn_img.css({"opacity":"0.8"});
			if (showFlag){
				topBtn.stop().animate({'bottom' : '0'}, 200); 
			}
		}
	}
	
	topBtn_img.click(function(){
		var speed = 700;
		var href= jQuery(this).attr("href");
		var target = jQuery(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
	 	$("html, body").animate({scrollTop:position}, speed, "swing");
		return false;
	});
});

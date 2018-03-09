/*==============================================================================================================*/
/*【map_module_noEdit.js】
/* デフォルトマップ・カスマイズ処理
/*==============================================================================================================*/

var
agent=navigator.userAgent,//ユーザーエージェント
htmlElement=document.documentElement,//html要素
$int_breakpoint = parseInt($("#js_smartMap").attr("data-breakpoint")),
$bln_textmode=$("#js_smartMap").attr("data-font"),
$bln_dualmode=$("#js_smartMap").attr("data-dual");//地図二行表示


$(document).ready(function(){
/*==============================================================================================================*/
/*▼旧IE対応（widthの挙動が違うため）
/*==============================================================================================================*/
if(agent.search("MSIE 8")!=-1){
	$("html").addClass('oldIEmode');
}
/*==============================================================================================================*/
/*▼フォントマップ対応
/*==============================================================================================================*/
	if($bln_textmode=="true"){
		$('#mapObj').addClass("js_textmode");
	}
	$('p.head + ul').each(function(){
		$(this).addClass("miniArea");
	});
	/*************************/
	/*◆クラス処理
	/*************************/
	/*〓deadを排して共通クラスのno_offerを設定〓*/
	for(var j=1;j<8;j++){
		var
		$removeClass_dead1=".a"+j+"-dead",
		$removeClass_dead2="a"+j+"-dead",
		$aj="a"+j;
		$($removeClass_dead1).each(function(){
			if(!($(this).parent("tbody").length>0)){
				$(this).removeClass($removeClass_dead2).addClass($aj).addClass("no_offer");
				$(this).find("a").removeAttr("href");
			}
		});
	};
	/*〓k_deadクラス付与〓*/
	for(var k=1;k<10;k++){
		var $removeClass_k_dead=".k"+k+"-dead";
		$($removeClass_k_dead).each(function(){
			$(this).addClass("k_dead");
		});
	}
	/*************************/
	/*◆マウスオーバー処理追加
	/*************************/
	/*〓地図画像〓*/
	$("#mapImageMap area").hover(
	function(){
		var $numArea=".a"+$(this).attr("id").match(/\d/g).join("");
		$($numArea).find("p").addClass("_hover");
		$($numArea).find("li").addClass("_hover");
	},
	function(){
		var $numArea=".a"+$(this).attr("id").match(/\d/g).join("");
		$($numArea).find("p").removeClass("_hover");
		$($numArea).find("li").removeClass("_hover");
	});
	
	/*〓エリア〓*/
	$(".miniArea").hover(
	function(){
		if(!$(this).find("li").hasClass("starthover")){
			$(this).prev("p").addClass("_hover");
			$(this).find("li").addClass("_hover");
		}
	},
	function(){
		$(this).prev("p").removeClass("_hover");
		$(this).find("li").removeClass("_hover");
	});
	
	/*〓地方タイトル〓*/
	$("p.head").hover(
	function(){
		$(this).addClass("_hover");
		$(this).next(".miniArea").find("li").addClass("_hover");
	},
	function(){
		$(this).removeClass("_hover");
		$(this).next(".miniArea").find("li").removeClass("_hover");
	});
	
	/*〓４７都道府県〓*/
	$(".miniArea a").hover(
	function(){
		var $target_li = $(this).parent("li");
		$(this).parents(".miniArea").prev("p").addClass("_hover");
		$target_li.addClass("_hover starthover");
		$target_li.prevAll("li").removeClass("_hover");
		$target_li.nextAll("li").removeClass("_hover");
	},
	function(){
		var $target_li = $(this).parent("li");
		$target_li.removeClass("starthover");
		$target_li.prevAll("li").addClass("_hover");
		$target_li.nextAll("li").addClass("_hover");
	});

/*==============================================================================================================*/
/*▼モバイル対応
/*==============================================================================================================*/
	
	/*************************/
	/*◆モバイル生成
	/*************************/
	if(!isNaN($int_breakpoint)){
	$("#mapObj").after("<div id='mapObj_sp'></div>");
	
	/*************************/
	/*◆モバイル取得
	/*************************/
	$("#mapObj .area > ul > li").each(function(i){
		i++;
		var
		$ttl = $(this).find("p").html(),
		$arealist = $(this).children("ul").html(),
		$c_areaName = "spArea" + i,
		$a_areaName = "." + $c_areaName; /*募集地域のみ*/
		if(!$(this).hasClass("no_offer")){
			$("#mapObj_sp").append("<ul class='"+ $c_areaName +"'><li>"+ $ttl +"</li></ul>");
		}
		$($a_areaName).append($arealist);
	});

	/*************************/
	/*◆モバイル設定
	/*************************/
	$("#mapObj_sp ul").each(function(i){
		i++;
		/*トグルボタン設定*/
		$(this).find(".areatag")
		.removeAttr("class")
		.removeAttr("href")
		.removeAttr("alt")
		.parent("li").addClass("acbtn").attr("id","btn0"+i);
		
		/*募集地域リンク設定*/
		var
		j=1,//カウント・募集エリア
		k=1;//カウント・都道府県
		$(this).children("li").each(function(){
			/*非募集エリアはバイバイ*/
			if($(this).attr("class").indexOf("dead")>0){
				$(this).remove();
			}
			/*募集エリアは設定*/
			else if($(this).attr("class").indexOf("k")==0){
				$(this).removeAttr("class").addClass("acmenu");
				//[eve][odd]のcss枠線設定
				if(k%2==0){
					$(this).addClass("eve");//偶数
				}else{
					$(this).addClass("odd");//奇数
				}
				k++;
			}
			j++;
		});
		if(k==1){
			$(this).remove();
		}
		//募集エリアが奇数だった場合、ブランクの配列を追加し帳尻をあわせる
		if( ($bln_dualmode=="true") && (k%2==0) ){
			$(this).append("<li class='acmenu eve blank'><a>blank</a></li>")
		}
	});
	
	/*47都道府県二段表示*/
	if($bln_dualmode == "true"){
		$(".acmenu").addClass("dual");
	}
	
	/*************************/
	/*◆ウィンドウ可変
	/*************************/
	var timer = null;
	$F_settingMap();
	
	$(window).on('resize', function() {
		clearTimeout(timer);
		timer = setTimeout(function() {
			$F_settingMap()
		}, 200);
	});
	/*リサイズ処理*/
	function $F_settingMap() {
		var $width=window.innerWidth;
		if($("html").hasClass('oldIEmode')){
			$width=document.documentElement.clientWidth + 17;
		}

		if($width<$int_breakpoint){
			$("#mapObj").addClass("_js-Hidden");
			$("#mapObj_sp").removeClass("_js-Hidden");
		}else{
			$("#mapObj").removeClass("_js-Hidden");
			$("#mapObj_sp").addClass("_js-Hidden");
		}
	};

	
	/*************************/
	/*◆アコーディオン押下
	/*************************/
	//エリア
	$(".acbtn").click(function(){
		$(".acbtn").removeClass("opened").removeClass("_hover");
		$(".acmenu").slideUp("fast");
		if($(this).nextAll().is(":hidden")){
			$(this).addClass("opened");
			$(this).nextAll().slideDown("fast");
		}
	});
	//エリア・マウスオーバー
	$(".acbtn").on({
		'touchstart':function(){
			$(this).unbind('mouseover mouseout')
		},
		'touchstart mouseover':function(){
			if(!($(this).next(".acmenu").is(":visible"))){
				$(this).addClass("opened");
			}
		},
		'touchend mouseout': function(){
			if(!($(this).next(".acmenu").is(":visible"))){
				$(this).removeClass("opened");
			}
		}
	});
	//47都道府県・マウスオーバー
	$(".acmenu:not(.blank)").on({
		'touchstart':function(){$(this).unbind('mouseover mouseout')},
		'touchstart mouseover':function(){$(this).addClass("_hover")},
		'touchend mouseout':function(){$(this).removeClass("_hover")}
	});
	}
});

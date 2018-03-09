////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//	【 rs_frameworks.js 】
//	下層ページレスポンシブ対応化jsファイル
//	
//	2015/09/15:chromeによる検索絞込テーブルのレイアウト崩れを修正
//	
////////////////////////////////////////////////////////////////////////////////////////////////////////////

//初期処理
$(document).ready(function(){	
	var parameterURL=location.href;
	
	/*一覧ページ*/
	if (parameterURL.indexOf("area")!=-1){
		var freewordInput= $("#freeword");//フリーワード
		$("#listContent table td").addClass("acmode_td");
		$("#listContent table th").addClass("acmode_trigger");
		//各種検索項目ID追加処理
		//もし項目が追加された場合はここに追加入力を行う
		$(function($){
			var th=$('table').find('th');
			th.each(function(){	
			if($(this).text().indexOf("フリーワード")!=-1){$(this).attr("id","fwrd");}
			else if($(this).text().indexOf("勤務地")!=-1){$(this).attr("id","area");}
			else if($(this).text().indexOf("職種")!=-1){$(this).attr("id","jobtype");}
			else if($(this).text().indexOf("時間帯")!=-1){$(this).attr("id","jobtime");}
			else if($(this).text().indexOf("メリット")!=-1){$(this).attr("id","merit");}
			else if($(this).text().indexOf("雇用形態")!=-1){$(this).attr("id","jobmode");}
			else if($(this).text().indexOf("ブランド")!=-1){$(this).attr("id","brand");}
			else if($(this).text().indexOf("沿線・駅")!=-1){$(this).attr("id","train");}

			var rowspan=$(this).attr("rowspan"); 
			var sublist=$(this).parents("tr").next("tr").children("td");
			if(rowspan > 1){
				sublist.addClass("acmode_td");
			}
			$(this).next("td").addClass("acmode_td");
			});
		});
	}
	/*原稿詳細ページ*/
	else if (parameterURL.indexOf("job")!=-1){
		//leftcontent←→rightContentいれかえ
		//$("#rightContent").insertBefore($("#leftContent"));
		$(function($){
			var detailTitle=$('#leftContent').children($(".detailTitle"));
			detailTitle.each(function(){	
			if($(this).text().indexOf("仕事情報")!=-1){
				$(this).addClass("trigger_works");
			}
			else if($(this).text().indexOf("事業内容")!=-1){
				$(this).addClass("trigger_business");
			}
		});
		var detailTitle2=$('#rightContent').children($(".detailTitle"));
		if($(this).text().indexOf("募集情報")!=-1){
			$(this).addClass("trigger_info");
		}
		$('#rightContent').children("h2").addClass("trigger_info");
		$(".trigger_info").after('<div class=table_wrapper></div>');
		$('#rightContent').children("table").appendTo($('.table_wrapper'));
		$(".trigger_info").next().css({"margin-bottom": "20px"});//更に仕事情報の項目は元のインライン要素を付け足す
	});
	}
});


$(window).bind("load resize", function(){
	var parameterURL=location.href;
	var timer=false;
	if (timer !==false){clearTimeout(timer);}
	timer=setTimeout(function(){
	// リサイズが終了した時点で行う
	if (parameterURL.indexOf("area")!==-1){
		windowResearch();
		PankuzuMove()
	}
	else if (parameterURL.indexOf("job")!==-1){
		PankuzuPosition();
		OptimizeJobpage();
	}
	}, 200);
});


//クリック処理
$(function(){
	$("th.acmode_trigger").click(function(){
		var table=$("#listContent table");
		if(table.hasClass("Mode_mobile")){
			var rowspan=$(this).attr("rowspan"); 
			var sublist=$(this).parents("tr").next("tr").children("td");
			if (rowspan > 1){
				sublist.slideToggle();
			}
			$(this).next("td").slideToggle("fast",function(){
			if($(this).is(':visible')){
				$(this).prev("th").addClass("th_opened");
				$(this).prev("th").removeAttr('style');
			}else{
				$(this).prev("th").removeClass("th_opened");
			}
			});
	}
	});
	/*仕事情報・事業内容*/
	$("#leftContent .detailTitle").click(function(){
		if($("#leftContent").css("float")=="none" && ($("table.middle th").css("float")=="left")){
			$(this).toggleClass("active");
			$(this).next().slideToggle("slow",function(){
				if ($(this).css("display")=="none"){
					$(this).removeAttr('style');	//閉じたときインライン要素を削除（PC画面遷移対策）
					if($(this).hasClass("trigger_works")){
						$(this).css({"margin-bottom": "20px"});	//更に仕事情報の項目は元のインライン要素を付け足す
					}
				}
			});
		}
	});
	/*BR除去*/
	$('#leftContent .descriptions').each(function(){
		var txt=$(this).html();
		$(this).html(txt.replace(/\<br\>/g,''));
	});
});

//パンくずリスト＆地域リンク対応
function PankuzuMove(){
	//PC→SP
	if ($(".acmode_trigger").css('float')=='left'){
		//headContentにあったパンくずリストを下にコピーし、従来のは消す
		if (!($("#listContent").children().hasClass(".bottom_flatlink"))){
			$(".pankuzuObj").insertAfter(".paging-bottom");
			$(".flatlink").insertAfter(".paging-bottom");
			$("#headContent .flatlink").remove();  
			$("#headContent .pankuzuObj").remove();  
			$("#listContent .flatlink").removeClass("flatlink").addClass("bottom_flatlink");
			$("#listContent .pankuzuObj").removeClass("pankuzuObj").addClass("bottom_pankuzuObj");
		}
	}
	//SP→PC
	else{
		//パンくずリストをheadContentにコピーし、消す
		if (!($("#headContent").children().hasClass(".flatlink"))){
			$(".bottom_flatlink").prependTo("#headContent");
			$(".bottom_pankuzuObj").prependTo("#headContent");
			$("#listContent .bottom_flatlink").remove();  
			$("#listContent .bottom_pankuzuObj").remove();  
			$(".bottom_flatlink").removeClass("bottom_flatlink").addClass("flatlink");
			$(".bottom_pankuzuObj").removeClass("bottom_pankuzuObj").addClass("pankuzuObj");
		}
	}
}

/*パンくずリスト処理※原稿詳細ページ用*/
function PankuzuPosition(){
	//PC→SP
	if ($("#leftContent").css('float')=='none'){
		//headContentにあったパンくずリストを下にコピーし、従来のは消す
		$(".pankuzuObj").insertAfter(".flatlink");
		$(".pankuzuObj").css({
			"clear": "both",
			"font-size": "10px",
			"height": "auto",
			"overflow": "hidden",
			"padding": "5px",
			"margin-left": "20px",
			"margin-right": "20px"
		})
		$(".pankuzuObj ul").css({
			"text-align":"right"
		})

		$(".pankuzuObj ul li").css({
			"display":"inline-block",
			"padding-right":"5px",
			"width":"auto"
		})
	}
	//SP→PC
	else{
		//パンくずリストをheadContentにコピーし、消す
		$(".pankuzuObj").prependTo("#headContent");
		$(".pankuzuObj").removeAttr('style');
		$(".pankuzuObj ul").removeAttr('style');
		$(".pankuzuObj ul li").removeAttr('style');
	}
}



//ウィンドウ切り替え＆各項目表示処理
function windowResearch(){
	var table=$("#listContent table");
	//スマホ画面
	if ($(".acmode_trigger").css('float')=='left'){
		table.addClass("Mode_mobile");
		table.removeClass("Mode_Desctop");
	 	$("#listContent table th").addClass("acmode_trigger");
	//------------------------------------------------------------------------------//
	//■フリーワード検索
	//・何かが入力されている場合は開くが、未入力時には閉じる
	//------------------------------------------------------------------------------//
	if(($("#fwrd").next("td").find("input").val()=="")&& !($("#fwrd").hasClass("th_opened"))){
		//未入力時
		$("#fwrd").next("td").css("display","none");
	}else if($("#fwrd").next("td").is(":hidden")){
		//「すべて」以外選択時で閉じられたとき
	}else if($("#fwrd").next("td").is(":visible")){
		//「すべて」以外選択時で開かれているとき
		$("#fwrd").addClass("th_opened")
	}else{
		//指定検索時は[0]=falseとなる。
	}	
	//------------------------------------------------------------------------------//
	//■指定検索
	//・「すべて」選択＆閉じている場合のみに行う
	//・「すべて」以外が選択されている場合は開く
	//・もし項目が追加された場合は追加する（コピペ＆クラス書換で大丈夫）
	//------------------------------------------------------------------------------//
	/*職種*/
	if(($("#jobtype").next("td").find("li:first-child b strong").length)&& !($("#jobtype").hasClass("th_opened"))){
		//「すべて」選択時は[1]=trueの値が返される
		$("#jobtype").next("td").css("display","none");
	}else if($("#jobtype").next("td").is(":hidden")){
		//「すべて」以外選択時で閉じられたとき
	}else if($("#jobtype").next("td").is(":visible")){
		//「すべて」以外選択時で開かれているとき
		$("#jobtype").addClass("th_opened")
	}else{
		//指定検索時は[0]=falseとなる。
	}
	/*勤務時間*/
	if(($("#jobtime").next("td").find("li:first-child b strong").length)&& !($("#jobtime").hasClass("th_opened"))){
		//「すべて」選択時は[1]=trueの値が返される
		$("#jobtime").next("td").css("display","none");
	}else if($("#jobtime").next("td").is(":hidden")){
		//「すべて」以外選択時で閉じられたとき
	}else if($("#jobtime").next("td").is(":visible")){
		//「すべて」以外選択時で開かれているとき
		$("#jobtime").addClass("th_opened")
	}else{
		//指定検索時は[0]=falseとなる。
	}

	/*メリット*/
	if(($("#merit").next("td").find("li:first-child b strong").length)&& !($("#merit").hasClass("th_opened"))){
		//「すべて」選択時は[1]=trueの値が返される
		$("#merit").next("td").css("display","none");
	}else if($("#merit").next("td").is(":hidden")){
		//「すべて」以外選択時で閉じられたとき
	}else if($("#merit").next("td").is(":visible")){
		//「すべて」以外選択時で開かれているとき
		$("#merit").addClass("th_opened")
	}else{
		//指定検索時は[0]=falseとなる。
	}
	
	/*雇用形態*/
	if(($("#jobmode").next("td").find("li:first-child b strong").length)&& !($("#jobmode").hasClass("th_opened"))){
		//「すべて」選択時は[1]=trueの値が返される
		$("#jobmode").next("td").css("display","none");
	}else if($("#jobmode").next("td").is(":hidden")){
		//「すべて」以外選択時で閉じられたとき
	}else if($("#jobmode").next("td").is(":visible")){
		//「すべて」以外選択時で開かれているとき
		$("#jobmode").addClass("th_opened")
	}else{
		//指定検索時は[0]=falseとなる。
	}
	
	/*ブランド*/
	if(($("#brand").next("td").find("li:first-child b strong").length)&& !($("#brand").hasClass("th_opened"))){
		//「すべて」選択時は[1]=trueの値が返される
		$("#brand").next("td").css("display","none");
	}else if($("#brand").next("td").is(":hidden")){
		//「すべて」以外選択時で閉じられたとき
	}else if($("#brand").next("td").is(":visible")){
		//「すべて」以外選択時で開かれているとき
		$("#brand").addClass("th_opened")
	}else{
		//指定検索時は[0]=falseとなる。
	}
	
	//------------------------------------------------------------------------------//
	//■プルダウン項目
	//地域・路線の項目がない場合は消去する。
	//------------------------------------------------------------------------------//
	/*勤務地*/
	if(($("#area").hasClass("th_opened"))){
		//開いているときはなにもしない
	}else if(!($("#prefecturePath").length)){
		//市区町村が非表示
		$("#area").removeClass("th_opened")
		$("#area").next("td").css("display","none");
		$("#area").parent("tr").next("tr").children("td").css("display","none");
	}else if($("#area").next("td").is(":visible")){
		//「すべて」以外選択時で開かれているとき
		$("#area").addClass("th_opened")
	}else{
	}	
	
	/*駅・路線*/
	if(($("#train").parent("tr").next("tr").find("ul").text().indexOf("選択して下さい")>0) && !($("#train").hasClass("th_opened"))){
		//市区町村非表示
		$("#train").next("td").css("display","none");
		$("#train").parent("tr").next("tr").children("td").css("display","none");
	}else if($("#train").next("td").is(":hidden")){
		//「すべて」以外選択時で閉じられたとき
	}else if($("#train").next("td").is(":visible")){
		//「すべて」以外選択時で開かれているとき
		$("#train").addClass("th_opened");
	}else{
		//市区町村表示中
	}	
	
//一定幅以上（PC表示：どの幅で変えるかについての数値はcss側で行う)
}else{
	table.addClass("Mode_Desctop");
	table.removeClass("Mode_mobile");
	$("#listContent table td").addClass("acmode_td");
	
	$("#fwrd").removeClass("th_opened");
	$("#jobtype").removeClass("th_opened");
	$("#jobtime").removeClass("th_opened");
	$("#merit").removeClass("th_opened");
	$("#jobmode").removeClass("th_opened");
	$("#brand").removeClass("th_opened");
	$("#area").removeClass("th_opened");
	$("#train").removeClass("th_opened");
	//各種再表示
	$("#fwrd").next("td").css("display","table-cell");
	$("#jobtype").next("td").css("display","table-cell");
	$("#jobtime").next("td").css("display","table-cell");
	$("#merit").next("td").css("display","table-cell");
	$("#jobmode").next("td").css("display","table-cell");
	$("#brand").next("td").css("display","table-cell");
	$("#area").next("td").css("display","table-cell");
	$("#area").parent("tr").next("tr").children("td").css("display","table-cell");
	$("#train").next("td").css("display","table-cell");
	$("#train").parent("tr").next("tr").children("td").css("display","table-cell");
	}
}

//トグル処理(連打による表示ミスの対応）
//連打してアニメーションが激しく動いている間に画面を切り替えると処理が追いつかずクラスが残り表示がおかしくなるので最適化
//スマホ時のみに表示される背景画像で判定。
function OptimizeJobpage(){
	if($("#leftContent").css("float")=="none" && ($("table.middle th").css("float")=="left")){
		/*-----------------
		仕事情報
		-------------------*/
		//パターン1：トリガーが開いている状態、かつコンテンツが閉じている状態
		if($(".trigger_works").hasClass("active")&& $(".trigger_works").next().is(":hidden")){
			$(".trigger_works").removeClass("active");
		}
		//パターン2：トリガーが閉じている状態、かつコンテンツが開いている状態
		else if(!($(".trigger_works").hasClass("active"))&& $(".trigger_works").next().is(":visible")){
			$(".trigger_works").next().hide();
		}
		/*-----------------
		企業情報
		-------------------*/
		//パターン1：トリガーが開いている状態、かつコンテンツが閉じている状態
		if($(".trigger_business").hasClass("active")&& $(".trigger_business").next().is(":hidden")){
			$(".trigger_business").removeClass("active");
		}
		//パターン2：トリガーが閉じている状態、かつコンテンツが開いている状態
		else if(!($(".trigger_business").hasClass("active"))&& $(".trigger_business").next().is(":visible")){
			$(".trigger_business").next().hide();
		}
	}else{
		//PC・タブレット表示のときはスライドアニメーションを強制終了させる
		$("#leftContent .detailTitle").next().stop(true,true).slideDown();
	}
};
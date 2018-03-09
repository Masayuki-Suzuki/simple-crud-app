/*******************************************************

【rs_opt_insertButton.js】
一覧ページにスマートフォン用ボタンを挿入するスクリプト
原稿一覧に文言を入れる必要はありません。

********************************************************/
//スマホ用ボタン自動生成
var word1 = "WEB応募";	
var word2 = "詳細を見る";
var word3 = "LINE応募";

//初期処理
$(document).ready(function(){
	$(function($){
		var listbox = $(".listObj").find(".listbox");
		listbox.each(function() {
			$(this).find("p.salery").after("<div class=spButton></div>");
			$(this).find(".button").clone(true).appendTo( $(this).find(".spButton")).removeClass("jobbox_btn_pc");
			$(this).find(".spButton .l1 a").append(word1)
			$(this).find(".spButton .l2 a").append(word2)
			$(this).find(".spButton .l3 a").append(word3)
		});
	});
});
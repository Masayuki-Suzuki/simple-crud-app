/*==============================================================================================
【addin_newmap.js】テキストマップ化＆アコーディオンマップ化js
================================================================================================*/
var
undefined,
$pURL=location.pathname,
$debug=Boolean($("#js_smartMap").attr("data-debug")),
$bln_font=$("#js_smartMap").attr("data-font"),
$bln_maps=$("#js_smartMap").attr("data-toggle");

//jQuery判定(1.7以下の場合は1.10版にする)
var 
$ver_Query=Number($.fn.jquery.replace( /\./g, "" )),
$calc_Query;
if($ver_Query.toString(10).length==2){
	$ver_Query=$ver_Query*10;
}
$calc_Query=$ver_Query;
var $bln_oldjQuery= $calc_Query<170;

// リンクURL生成
var
$url ="",
$src = $("#js_smartMap").attr("src"),
$split= $src.split("/");
for(var i=0;i<$split.length-1;i++){
	$url+=$split[i]+"/";
}

var $source = $url;

//=================================
//◆インポート処理
//=================================
if($pURL=="/jobfind-pc/" || $debug){
	if($bln_oldjQuery){
		document.write('<script src="'+$source+'/jquery.min.js" type="text/javascript" ></script>');
	}
	//原稿ページのみ適応
	document.write('<script src="'+$source+'map_module_noEdit.js" type="text/javascript" ></script>');
	document.write('<link href="'+$source+'map_module_noEdit.css" rel="stylesheet" type="text/css">');
	document.write('<link href="'+$source+'map_setting.css" rel="stylesheet" type="text/css">');

}
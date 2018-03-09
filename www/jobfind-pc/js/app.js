var recop = function(){};
recop.settings = {};
recop.afterPaging = function(){};
recop.afterChangePerPage = function(){};

$(document).ready(function() {
	$.ajaxSetup({ cache: false });
});

//-----------------------
// ◆jquery plugin
//-----------------------
(function($){
	//---------------------------------------------------------------------
	// ajaxResponse
	//   通信結果にAjaxResponseを返すajax通信のresponseを扱うjQueryPlugin
	//---------------------------------------------------------------------
	$.fn.ajaxResponse = function( config ){
		var defaults={
			successTarget    :"",                 //成功時のターゲット要素を指定する
			errorTarget      :"",                 //失敗時のターゲット要素を指定する
			successTargets   :{},                 //成功時のbody要素のキーを複数指定する場合({key:target...})
			errorTargets     :{},                 //失敗時のbody要素のキーを複数指定する場合({key:target...})
			onBeforeSuccess  :function(root){},   //成功時targetのhtml書き換え前に呼ばれる
			onBeforeError    :function(root){},   //失敗時targetのhtml書き換え前に呼ばれる
			onAfterSuccess   :function(root){},   //成功時targetのhtml書き換え後に呼ばれる
			onAfterError     :function(root){}    //失敗時targetのhtml書き換え後に呼ばれる
		};

		var options = $.extend( defaults, config );
		var isAjaxRequest = false;
		var xml = this;
		$( "root", xml ).each(function(){
			isAjaxRequest = true;
			var root = this;
			if( $( "status", root ).text() === "SUCCESS")
			{
				options.onBeforeSuccess(root);

				if(options.successTarget !== "")
				{
					options.successTarget.html($( "body[key=single]", root ).text());
				}

				$.each(options.successTargets, function( key, selector ) {
					selector.html($( "body[key="+key+"]", root ).text());
				});

				options.onAfterSuccess(root);
			}
			else if( $( "status", root ).text() === "ERROR")
			{
				options.onBeforeError(root);

				if(options.errorTarget !== "")
				{
					options.errorTarget.html($( "body[key=single]", root ).text());
				}

				$.each(options.errorTargets, function( key, selector ) {
					selector.html($("body[key="+key+"]", root ).text());
				});

				options.onAfterError(root);
				$('p.err').parents('td.input').addClass('err');
			}
		});

		if(isAjaxRequest)
		{
			return;
		}
		//AjaxResponse形式でない場合
		location.href = $("a#ajaxLogout").attr("href");
	};

})(jQuery);

//-----------------------
// ◆common function
//-----------------------

/**
 * 複数のAjax処理を並列実行する
 *
 * @param options Ajaxのオプション（配列）
 * @param allCompleteHandler 全Ajax処理終了時に呼ばれる処理
 * @return
 */
function executeAjaxOrdered( options, allCompleteHandler )
{
	var defaults = {
		type : "POST",
		dataType : "text",
		contentType: false,
		complete : function()
		{
			options.shift();
			if (options.length == 0 ) {
				if (allCompleteHandler) {
					allCompleteHandler();
				}
			} else {
				option = options[0];
				opts = $.extend({}, defaults, option);
				$.ajax(opts);
			};
		}
	};

	var option = options[0];
	var opts = $.extend({}, defaults, option);
	$.ajax(opts);
};


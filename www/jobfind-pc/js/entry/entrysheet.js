(function($){
	$.entrySheet = new EntrySheet();
	$.entrySheet.settings = {};
	function EntrySheet(){};

	EntrySheet.prototype.initialize = function(){
		var timer = null;
		
		$("iframe[name=dummyEntrySheet1Frame]").unbind("load");
		$("iframe[name=dummyEntrySheet1Frame]").bind("load", function(){
			clearInterval(timer);
			
			var _html = this.contentWindow.document.body.innerHTML;
			var $form = $("form[name=entrySheet1Form]");
			var $target = $("#_entrySheet1");
			
			if(_html.indexOf( '_entrySheet1Container') > -1 )
			{
				$target.html( _html );
				$.entrySheet.initialize();
				confirmButtonEnable();
				return;
			}
			
			if(_html.indexOf( 'MaxUploadSizeExceededException') > -1 )
			{
				$(".loading", $("#_entrySheet1") ).hide();
				$("#_entrySheet1Container").show();
				uploadErrorMessage( $("#_entrySheet1Container"), $("#_entrySheet1") );
				$.entrySheet.initialize();
				confirmButtonEnable();
				return;
			}
			
			var _orderEntrySheet = $("input.orderEntrySheet", $form).attr("name");
			if( _orderEntrySheet == "upload" || _orderEntrySheet == "remove" )
			{
				location.href = $.entrySheet.settings.indexUrl;
			}
		});
		
		$("#_entrySheet1 .file").unbind("change");
		$("#_entrySheet1 .file").bind("change", function(){
			confirmButtonDisable();
			$("#_entrySheet1Container").hide();
			$(".loading", $("#_entrySheet1") ).show();
			var $form = $("form[name=entrySheet1Form]");
			$(".file", $form).remove();
			resetEntrySheetForm( $form, "upload", "post");
			$form.append( $(this) );
			$form.submit();
			
			clearInterval(timer);
			timer = setInterval(function() {
				var _html1 = $("iframe[name=dummyEntrySheet1Frame]").contents().find("html").html();
				if(_html1.indexOf( 'MaxUploadSizeExceededException') > -1 )
				{
					$(".loading", $("#_entrySheet1") ).hide();
					$("#_entrySheet1Container").show();
					uploadErrorMessage( $("#_entrySheet1Container"), $("#_entrySheet1") );
					$.entrySheet.initialize();
					confirmButtonEnable();
					clearInterval(timer);
				}
			}, 3000);
		});
		
		$("#_removeEntrySheet1").unbind("click");
		$("#_removeEntrySheet1").bind("click", function(){
			if(!window.confirm('ファイルを削除してもよろしいですか？'))
				return;
			confirmButtonDisable();
			$("#_entrySheet1Container").hide();
			$(".loading", $("#_entrySheet1") ).show();
			var $form = $("form[name=entrySheet1Form]");
			resetEntrySheetForm( $form, "remove", "get");
			$form.submit();
		});
		
		$("iframe[name=dummyEntrySheet2Frame]").unbind("load");
		$("iframe[name=dummyEntrySheet2Frame]").bind("load", function(){
			clearInterval(timer);
			
			var _html = this.contentWindow.document.body.innerHTML;
			var $form = $("form[name=entrySheet2Form]");
			var $target = $("#_entrySheet2");
			
			if(_html.indexOf( '_entrySheet2Container') > -1 )
			{
				$target.html( _html );
				$.entrySheet.initialize();
				confirmButtonEnable();
				return;
			}
			
			if(_html.indexOf( 'MaxUploadSizeExceededException') > -1 )
			{
				$(".loading", $("#_entrySheet2") ).hide();
				$("#_entrySheet2Container").show();
				uploadErrorMessage( $("#_entrySheet2Container"), $("#_entrySheet2") );
				$.entrySheet.initialize();
				confirmButtonEnable();
				return;
			}
			
			var _orderEntrySheet = $("input.orderEntrySheet", $form).attr("name");
			if( _orderEntrySheet == "upload" || _orderEntrySheet == "remove" )
			{
				location.href = $.entrySheet.settings.indexUrl;
			}
		});

		$("#_entrySheet2 .file").unbind("change");
		$("#_entrySheet2 .file").bind("change", function(){
			confirmButtonDisable();
			$("#_entrySheet2Container").hide();
			$(".loading", $("#_entrySheet2") ).show();
			var $form = $("form[name=entrySheet2Form]");
			$(".file", $form).remove();
			resetEntrySheetForm( $form, "upload", "post");
			$form.append( $(this) );
			$form.submit();
			
			clearInterval(timer);
			timer = setInterval(function() {
				var _html2 = $("iframe[name=dummyEntrySheet2Frame]").contents().find("html").html();
				if(_html2.indexOf( 'MaxUploadSizeExceededException') > -1 )
				{
					$(".loading", $("#_entrySheet2") ).hide();
					$("#_entrySheet2Container").show();
					uploadErrorMessage( $("#_entrySheet2Container"), $("#_entrySheet2") );
					$.entrySheet.initialize();
					confirmButtonEnable();
					clearInterval(timer);
				}
			}, 3000);
		});

		$("#_removeEntrySheet2").unbind("click");
		$("#_removeEntrySheet2").bind("click", function(){
			if(!window.confirm('ファイルを削除してもよろしいですか？'))
				return;
			confirmButtonDisable();
			$("#_entrySheet2Container").hide();
			$(".loading", $("#_entrySheet2") ).show();
			var $form = $("form[name=entrySheet2Form]");
			resetEntrySheetForm( $form, "remove", "get");
			$form.submit();
		});
		
		$("iframe[name=dummyEntrySheet3Frame]").unbind("load");
		$("iframe[name=dummyEntrySheet3Frame]").bind("load", function(){
			clearInterval(timer);
			
			var _html = this.contentWindow.document.body.innerHTML;
			var $form = $("form[name=entrySheet3Form]");
			var $target = $("#_entrySheet3");
			
			if(_html.indexOf( '_entrySheet3Container') > -1 )
			{
				$target.html( _html );
				$.entrySheet.initialize();
				confirmButtonEnable();
				return;
			}
			
			if(_html.indexOf( 'MaxUploadSizeExceededException') > -1 )
			{
				$(".loading", $("#_entrySheet3") ).hide();
				$("#_entrySheet3Container").show();
				uploadErrorMessage( $("#_entrySheet3Container"), $("#_entrySheet3") );
				$.entrySheet.initialize();
				confirmButtonEnable();
				return;
			}
			
			var _orderEntrySheet = $("input.orderEntrySheet", $form).attr("name");
			if( _orderEntrySheet == "upload" || _orderEntrySheet == "remove" )
			{
				location.href = $.entrySheet.settings.indexUrl;
			}
		});

		$("#_entrySheet3 .file").unbind("change");
		$("#_entrySheet3 .file").bind("change", function(){
			confirmButtonDisable();
			$("#_entrySheet3Container").hide();
			$(".loading", $("#_entrySheet3") ).show();
			var $form = $("form[name=entrySheet3Form]");
			$(".file", $form).remove();
			resetEntrySheetForm( $form, "upload", "post");
			$form.append( $(this) );
			$form.submit();
			
			clearInterval(timer);
			timer = setInterval(function() {
				var _html3 = $("iframe[name=dummyEntrySheet3Frame]").contents().find("html").html();
				if(_html3.indexOf( 'MaxUploadSizeExceededException') > -1 )
				{
					$(".loading", $("#_entrySheet3") ).hide();
					$("#_entrySheet3Container").show();
					uploadErrorMessage( $("#_entrySheet3Container"), $("#_entrySheet3") );
					$.entrySheet.initialize();
					confirmButtonEnable();
					clearInterval(timer);
				}
			}, 3000);
		});

		$("#_removeEntrySheet3").unbind("click");
		$("#_removeEntrySheet3").bind("click", function(){
			if(!window.confirm('ファイルを削除してもよろしいですか？'))
				return;
			confirmButtonDisable();
			$("#_entrySheet3Container").hide();
			$(".loading", $("#_entrySheet3") ).show();
			var $form = $("form[name=entrySheet3Form]");
			resetEntrySheetForm( $form, "remove", "get");
			$form.submit();
		});
		
		function resetEntrySheetForm( $form, parameter, formMethod ) {
			$("input[type=file]", $form).remove();
			$("input.orderEntrySheet", $form).remove();
			$form.attr("method", formMethod);

			var $input = $("<input />");
			$input.attr("type", "hidden");
			$input.attr("name", parameter);
			$input.attr("class", "orderEntrySheet");
			$form.append( $input );
		}
		
		function uploadErrorMessage( $entrySheetContainer, $entrySheet )
		{
			var $fileButton = $("<input />");
			$fileButton.attr("name", "fileData");
			$fileButton.attr("type", "file");
			$fileButton.attr("accept", "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
			$fileButton.attr("class", "file");
			if($entrySheetContainer.children('input.file[name="fileData"]').length <= 0)
				$entrySheetContainer.prepend( $fileButton );
			var $error = $("ul.errors", $entrySheet );
			$error.html("<li style='color:red;'>・ファイルのアップロードに失敗しました。</li>");
		}
		
		function confirmButtonDisable()
		{
			var $confirmButton = $(".actionObj input#confirm");
			if( isHide( $confirmButton ) )
				return;
			$confirmButton.attr('disabled', 'disabled');
			$confirmButton.attr("class", "disabled");
			$(".actionObj p#confirmButtonAlert").show();
		}
		
		function confirmButtonEnable()
		{
			if(isHide( $("#_entrySheet1Container") ))
				return;
			if(isHide( $("#_entrySheet2Container") ))
				return;
			if(isHide( $("#_entrySheet3Container") ))
				return;
			$(".actionObj p#confirmButtonAlert").hide();
			var $confirmButton = $(".actionObj input#confirm");
			$confirmButton.removeClass("disabled");
			$confirmButton.removeAttr('disabled');
		}
		
		function isHide( object )
		{
			if ( object.css('display') == 'none')
				return true;
			return false;
		}
	};
})(jQuery);
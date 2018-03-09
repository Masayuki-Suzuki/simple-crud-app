(function($){
	$.profilePhoto = new ProfilePhoto();
	$.profilePhoto.settings = { buttonLock : false };

	function ProfilePhoto(){};

	ProfilePhoto.prototype.initialize = function(){
		$("iframe[name=dummyPrimaryPhotoFrame]").unbind("load");
		$("iframe[name=dummyPrimaryPhotoFrame]").bind("load", function(){
			var _html = this.contentWindow.document.body.innerHTML;
			var $form = $("form[name=primaryPhotoForm]");

			// success
			var _order = $("input.order", $form).attr("name");
			if( _html.indexOf("primaryPhoto.jpg") > -1 ) {
				if( _order == "rotate" ) {
					resetForm( $form, "reload", "get");
					$form.submit();
					return;
				}
				var $target = $("#_primaryPhoto");
				$target.html( _html );
				$.profilePhoto.settings.buttonLock = false;
				$.profilePhoto.initialize();
				return;
			}
			// failed
			if( _order == "upload" ) {
				var $fileButton = $("<input />");
				$fileButton.attr("name", "fileData");
				$fileButton.attr("type", "file");
				$fileButton.attr("accept", "image/jpeg,image/jpg");
				$fileButton.attr("class", "file");
				$(".fileUpload", $("#_primaryPhoto") ).append( $fileButton );

				var $error = $("ul.errors", $("#_primaryPhoto") );
				$error.html("<li style='color:red;'>・ファイルのアップロードに失敗しました。</li>");
				$(".loading", $("#_primaryPhoto") ).hide();

				$.profilePhoto.settings.buttonLock = false;
				$.profilePhoto.initialize();
				return;
			}
			if( _order == "rotate" ) {
				location.href = $.profilePhoto.settings.indexUrl;
				return;
			}
			if( _order == "remove" ) {
				location.href = $.profilePhoto.settings.indexUrl;
				return;
			}
		});

		$("#_primaryPhoto .file").unbind("change");
		$("#_primaryPhoto .file").bind("change", function(){
			var $photoButton = $(this).closest(".fileUpload");
			if( $photoButton.is(".disabled") )
				return false;

			$.profilePhoto.settings.buttonLock = true;
			$(".loading", $("#_primaryPhoto") ).show();

			var $form = $("form[name=primaryPhotoForm]");
			$(".file", $form).remove();
			resetForm( $form, "upload", "post");
			$form.append( $(this) );
			$form.submit();
		});

		$("#_rotatePrimaryPhoto").unbind("click");
		$("#_rotatePrimaryPhoto").bind("click", function(){
			if( $(this).is(".disabled") )
				return false;
			if( $.profilePhoto.settings.buttonLock )
				return false;

			$.profilePhoto.settings.buttonLock = true;
			$(".loading", $("#_primaryPhoto") ).show();

			var $form = $("form[name=primaryPhotoForm]");
			resetForm( $form, "rotate", "get");
			$form.submit();
		});

		$("#_removePrimaryPhoto").unbind("click");
		$("#_removePrimaryPhoto").bind("click", function(){
			if( $(this).is(".disabled") )
				return false;
			if( $.profilePhoto.settings.buttonLock )
				return false;

			$.profilePhoto.settings.buttonLock = true;
			$(".loading", $("#_primaryPhoto") ).show();

			var $form = $("form[name=primaryPhotoForm]");
			resetForm( $form, "remove", "get");
			$form.submit();
		});

		$("iframe[name=dummySecondaryPhotoFrame]").unbind("load");
		$("iframe[name=dummySecondaryPhotoFrame]").bind("load", function(){
			var _html = this.contentWindow.document.body.innerHTML;
			var $form = $("form[name=secondaryPhotoForm]");

			// success
			var _order = $("input.order", $form).attr("name");
			if( _html.indexOf("secondaryPhoto.jpg") > -1 ) {
				if( _order == "rotate" ) {
					resetForm( $form, "reload", "get");
					$form.submit();
					return;
				}
				var $target = $("#_secondaryPhoto");
				$target.html( _html );
				$.profilePhoto.settings.buttonLock = false;
				$.profilePhoto.initialize();
				return;
			}
			// failed
			if( _order == "upload" ) {
				var $fileButton = $("<input />");
				$fileButton.attr("name", "fileData");
				$fileButton.attr("type", "file");
				$fileButton.attr("accept", "image/jpeg,image/jpg");
				$fileButton.attr("class", "file");
				$(".fileUpload", $("#_secondaryPhoto") ).append( $fileButton );

				var $error = $("ul.errors", $("#_secondaryPhoto") );
				$error.html("<li style='color:red;'>・ファイルのアップロードに失敗しました。</li>");
				$(".loading", $("#_secondaryPhoto") ).hide();

				$.profilePhoto.settings.buttonLock = false;
				$.profilePhoto.initialize();
				return;
			}
			if( _order == "rotate" ) {
				location.href = $.profilePhoto.settings.indexUrl;
				return;
			}
			if( _order == "remove" ) {
				location.href = $.profilePhoto.settings.indexUrl;
				return;
			}
		});

		$("#_secondaryPhoto .file").unbind("change");
		$("#_secondaryPhoto .file").bind("change", function(){
			var $photoButton = $(this).closest(".fileUpload");
			if( $photoButton.is(".disabled") )
				return false;

			$.profilePhoto.settings.buttonLock = true;
			$(".loading", $("#_secondaryPhoto") ).show();

			var $form = $("form[name=secondaryPhotoForm]");
			$(".file", $form).remove();
			resetForm( $form, "upload", "post");
			$form.append( $(this) );
			$form.submit();
		});

		$("#_rotateSecondaryPhoto").unbind("click");
		$("#_rotateSecondaryPhoto").bind("click", function(){
			if( $(this).is(".disabled") )
				return false;
			if( $.profilePhoto.settings.buttonLock )
				return false;

			$.profilePhoto.settings.buttonLock = true;
			$(".loading", $("#_secondaryPhoto") ).show();

			var $form = $("form[name=secondaryPhotoForm]");
			resetForm( $form, "rotate", "get");
			$form.submit();
		});

		$("#_removeSecondaryPhoto").unbind("click");
		$("#_removeSecondaryPhoto").bind("click", function(){
			if( $(this).is(".disabled") )
				return false;
			if( $.profilePhoto.settings.buttonLock )
				return false;

			$.profilePhoto.settings.buttonLock = true;
			$(".loading", $("#_secondaryPhoto") ).show();

			var $form = $("form[name=secondaryPhotoForm]");
			resetForm( $form, "remove", "get");
			$form.submit();
		});

		if( $.support.tbody == false ) {
			$("#_rotatePrimaryPhoto").html("右回転");
			$("#_removePrimaryPhoto").html("削除");
			$("#_rotateSecondaryPhoto").html("右回転");
			$("#_removeSecondaryPhoto").html("削除");
		}
	};

	ProfilePhoto.prototype.reloadForLegacyIE = function(){
		if( $.support.opacity == false ) {
			var $form;
			$form = $("form[name=primaryPhotoForm]");
			resetForm( $form, "reload", "get");
			$form.submit();

			$form = $("form[name=secondaryPhotoForm]");
			resetForm( $form, "reload", "get");
			$form.submit();
		}
	};

	function resetForm( $form, parameter, formMethod ) {
		$("input[type=file]", $form).remove();
		$("input.order", $form).remove();
		$form.attr("method", formMethod);

		var $input = $("<input />");
		$input.attr("type", "hidden");
		$input.attr("name", parameter);
		$input.attr("class", "order");
		$form.append( $input );
	}
})(jQuery);

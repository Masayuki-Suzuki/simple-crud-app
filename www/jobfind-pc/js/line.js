function lineSearch(url, prefectureCode)
{
	if(prefectureCode == ""){
		$("div#lineSelection").text("");
		return false;
	}
	$.ajax
	(
		{
			type : "POST",
			url : url,
			success : function( data )
			{
				$(data).ajaxResponse({
					successTarget:$("div#lineSelection")
				});
			},
			error : function (XMLHttpRequest, status, errorThrown)
			{
				$('html').text( XMLHttpRequest.responseText );
			}
		}
	);
}


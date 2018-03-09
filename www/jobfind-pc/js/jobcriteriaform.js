(function($){
	$.jobCriteriaForm = new JobCriteriaForm();
	$.jobCriteriaForm.settings = { buttonLock : false };

	function JobCriteriaForm(){};

	JobCriteriaForm.prototype.initialize = function(){
		$.ajax({
			type     : "GET",
			dataType : "html",
			url      : $.jobCriteriaForm.settings.formUrl,
			success  : function( data, dataType ) {
				$.jobCriteriaForm.output( data );
			}
		});
	};

	JobCriteriaForm.prototype.output = function( responseHTML ){
		var $form = $("#_searchForm form");
		var $action = $("<input/>");
		$action.attr("type", "hidden");
		$action.attr("name", "search");
		$action.attr("value", "true");
		$form.append( $action );

		var $response = $("<div/>");
		$response.html( responseHTML );
		
		$(".freewordCriteria", $form).html( $( ".freewordCriteria", $response ).html() );
		$(".prefectureCriteria", $form).html( $(".prefectureCriteria", $response).html() );
		$(".jobTypeCriteria", $form).html( $(".jobTypeCriteria", $response).html() );
		$(".workingTimeCriteria", $form).html( $(".workingTimeCriteria", $response).html() );
		$(".meritCriteria", $form).html( $(".meritCriteria", $response).html() );
		$(".employmentFormCriteria", $form).html( $(".employmentFormCriteria", $response).html() );
		$(".brandCriteria", $form).html( $(".brandCriteria", $response).html() );
	};
})(jQuery);

$(document).ready(function(){
	canNotBookingInterviewDisabled();
	radioButtonsDisabled();
	
	$("#adjustInterviewScheduleCheck").live('click',function(){
		radioButtonsDisabled();
	});
	
	function radioButtonsDisabled()
	{
		var radioButtons = $(".interviewBookingRadio");
		if( $("#adjustInterviewScheduleCheck").is(':checked') ){
			radioButtons.attr('disabled', 'disabled');
		}else{
			radioButtons.removeAttr('disabled');
			canNotBookingInterviewDisabled();
		}
	}
	
	function canNotBookingInterviewDisabled()
	{
		$(".interviewBookingRadio.disabled").attr('disabled', 'disabled');
	}
});
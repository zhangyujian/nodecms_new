$(function(){
	$(".J_addBtn").click(function(){
		if($(".J_addCon").css("display") == "none"){
			$(".J_addCon").show();
			$(".J_addBtn span").removeClass("span").removeClass("glyphicon-chevron-up");
			$(".J_addBtn span").addClass("glyphicon-chevron-down");
		}else{
			$(".J_addCon").hide();
			$(".J_addBtn span").removeClass("glyphicon-chevron-down");
			$(".J_addBtn span").addClass("glyphicon-chevron-up");
		}
		return false;
	});
});
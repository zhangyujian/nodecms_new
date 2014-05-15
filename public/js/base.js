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

function markUp(text, raw){
	var DivElement = document.getElementById("textdisplay");
	var RawElement = document.getElementById("rawdisplay");

	if (!raw) {

	DivElement.setAttribute("style", "display:inline;");
	RawElement.setAttribute("style", "display:none");
	DivElement.innerHTML = Markdown(text);

	} else {

	DivElement.setAttribute("style", "display:none;");
	RawElement.setAttribute("style", "display:inline; margin-top: 20px;");
	document.getElementById("rawoutput").value = Markdown(text);
  
  }
  
}

function debug(string, marker) {

	if (!marker) {
	marker = "";
	}

	DebugElement = document.getElementById("debugdisplay");

	DebugElement.setAttribute("style", "display:inline");
	document.getElementById("debugoutput").value += "\n"+marker+": \n\n"+string+"\n\n";

}
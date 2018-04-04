$(document).ready(function() {
	setTimeout(popup, 3000);
	function popup() {

		$("#onclick").click(function() {
			$("#contactdiv").css("display", "block");
			$(".pagination").css("opacity", "0");
			$("#add").prop('disabled',false);
			$("#upd").prop("disabled", true);
		});
		$("#contact #add").click(function() {
			$(".pagination").css("opacity", "1");
			$(this).parent().parent().hide();
		});
		$("#contact #cancel").click(function() {
			$(".pagination").css("opacity", "1");
			$(this).parent().parent().hide();
		});
		
		$("#onclickIndex").click(function() {
			$("#contactdivIndex").css("display", "block");
			$(".pagination").css("opacity", "0");
		});
		$("#contactIndex #addIndex").click(function() {
			$(".pagination").css("opacity", "1");
			$(this).parent().parent().hide();
		});
		$("#contactIndex #cancelIndex").click(function() {
			$(".pagination").css("opacity", "1");
			$(this).parent().parent().hide();
		});
		
		//------------------------------
		$(".redact").click(function() {
			$("#contactdiv").css("display", "block");
			$(".pagination").css("opacity", "0");
			$("#add").prop('disabled',true);
			$("#upd").prop("disabled", false);
		});
		$("#contact #upd").click(function() {
			$(".pagination").css("opacity", "1");
			$("#add").prop('disabled',true);
			$("#upd").prop("disabled", true);
			$(this).parent().parent().hide();
		});
		$("#contact #cancel").click(function() {
			$(".pagination").css("opacity", "1");
			$("#add").prop('disabled',false);
			$("#upd").prop("disabled", true);
			$(this).parent().parent().hide();
		});
	}
	$("#price").keypress(function(e) {
		e = e || event;
		if (e.ctrlKey || e.altKey || e.metaKey) return;
		var chr = String.fromCharCode(e.keyCode);
		if (chr == null) return;
		if ((chr < '0' || chr > '9')&&(chr!=='.')) {
			return false;
		}
	});
	$("#priceIndex").keypress(function(e) {
		e = e || event;
		if (e.ctrlKey || e.altKey || e.metaKey) return;
		var chr = String.fromCharCode(e.keyCode);
		if (chr == null) return;
		if ((chr < '0' || chr > '9')&&(chr!=='.')){
			return false;
		}
	});	
});
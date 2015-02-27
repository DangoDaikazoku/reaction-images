
$(document).ready(function(){

	url_list = localStorage["url_list"].split(",");

	url_list.forEach(function(url){

		var title_html = $.parseHTML("<div class='url-title'><label style='font-weight:bold'>URL : </label><span></span></div>")

		$(title_html).find("span").html(url);
		
		$("#google_pubconsole_gwrapper").append(title_html);

		htmlContent = $.parseHTML(localStorage["consoleHTML-"+url.trim()]);
		
		$("#google_pubconsole_gwrapper").append(htmlContent);

	});

	// add labels page request
	$("td > span:contains(1)").each(function(){
		$(this).parent().parent().addClass("success-data")
	})

	$("td > span:contains(2)").each(function(){
		$(this).parent().parent().addClass("warning-data")
	})

	$("td > span:contains(3)").each(function(){
		$(this).parent().parent().addClass("error-data")
	})

	// ad slot label
	$("span.primary:contains(Warning)").each(function(){
		$(this).closest(".gbox.gbox-primary").addClass("warning-data")
	})


	$("#all-tab").click(function(){
		$(".warning-data").show();
		$(".success-data").show();
		$(".error-data").show();
	});

	$("#error-tab").click(function(){
		$(".warning-data").hide();
		$(".success-data").hide();
		$(".error-data").show();
	});
	
	$("#warning-tab").click(function(){
		$(".warning-data").show();
		$(".success-data").hide();
		$(".error-data").hide();
	});

	$("#success-tab").click(function(){
		$(".warning-data").hide();
		$(".success-data").show();
		$(".error-data").hide();
	});

	$("#tabs > span").click(function(){

		if(!$(this).hasClass("active")){
			$(this).addClass("active");
			$(this).siblings().removeClass("active");

			var id = $(this).attr("id");

			if(id == "ad_slot"){
				$("content_0").show();
				$("content_1").hide();
			}
			else{
				$("content_1").show();
				$("content_0").hide();
			}

		}
	});

})
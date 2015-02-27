var bgMessage = function(obj, t) {
  if(chrome && chrome.runtime) {
    chrome.runtime.sendMessage({type: t, obj: obj});
  }
}



chrome.runtime.onMessage.addListener(onMessageProc);

function onMessageProc(message, sender, sendResponse)
{
    // populate
    jQuery.parseJSON(message).forEach(function(item){
    	console.log(item);
    	$("#_rection_container_11 > ul").append("<li>"+item.label+"</li>")
    });
    
}

var watching = false;
var el = document;

document.onkeypress = function (e) {
    e = e || window.event;
    console.log(e.keyCode);
    if(!watching){

    	if(e.keyCode == 126){
	    	el = document.activeElement;
	    	if(el.tagName == "TEXTAREA" || el.tagName == "INPUT"){
	    	    		
	    	    }
	    	else if(el.tagName == "DIV" && el.getAttribute("role") == "combobox"){
	    		watching = true;
	    		console.log(el.textContent);

		    	inject_html = $.parseHTML("<div id='_rection_container_11' style='position:fixed; top:50px; left:0px;'><ul></ul></div>")

		    	$("body").append(inject_html);

	    		el.addEventListener("blur", function(){
	    			watching = false;
	    			$("#_rection_container_11").remove();
	    		});
	    		}
	    	}
	    }
    else{

    	text = el.textContent;

    	//inject code

    	text = text.replace("~","");

    	if(text.length > 2)
	    	requestReaction(text)

    }
    
    // use e.keyCode
};


function requestReaction(r){

	bgMessage(r, "bgAJAX");

}
$(document).ready(function(){

	var list_url = chrome.extension.getURL("url_list.html");
    var results_url = chrome.extension.getURL("results.html");
      
    $("#url-list-link").click(function(){
      	chrome.tabs.create({"url":list_url}, function(tab){
        
    	}); 
    })
      
    $("#results-link").click(function(){
      	chrome.tabs.create({"url":results_url}, function(tab){
        
    	}); 
    })

      
})
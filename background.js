var onMessageListener = function(message, sender, sendResponse) {
    switch(message.type) {
        case "bglog":
            console.log(message.obj);
        	// console.log(message);
        break;
        case "bgDomLog":
            // console.log("dom object", currURL, $.parseHTML(message.obj));
            localStorage["consoleHTML-"+currURL] = message.obj;
            // console.log(message);
        break;        
        case "bgAJAX":
            // console.log("uri = ",message.obj);
            var r = message.obj;
            requestReaction(r)
        break;

        case "bgBot":
            console.log("bot status - ", message.obj);
            
            url_list = localStorage["url_list"].split(",");
            url_list.forEach(function(newURL){
                console.log("window open", newURL);
                chrome.tabs.create({ url: newURL });
            })
            // console.log(message);
        break;

        chrome.tabs.create({ url: newURL });
    }
    return true;
}

function requestReaction(r){

    $.ajax({
      url: "http://reactionimage.org/connector/ajax.php?a=ac&term="+r,
    }).done(function(data) {
      console.log(data);

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            console.log("sent");
            chrome.tabs.sendMessage(tabs[0].id,  data, function(response) {});  
        });

    });
}


chrome.runtime.onMessage.addListener(onMessageListener);

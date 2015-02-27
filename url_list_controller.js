
var bglog = function(obj) {
  if(chrome && chrome.runtime) {
    chrome.runtime.sendMessage({type: "bglog", obj: obj});
  }
}



var appy = angular.module('DFPbot',[]);

appy.controller('urlController',['$scope',function($scope){

    if("url_list" in localStorage)
      this.url_list = localStorage["url_list"].split(",");
    else this.url_list = [];

    $scope.runBot = function(){
      
      if(chrome && chrome.runtime) {
        chrome.runtime.sendMessage({type: "bgBot", obj: "start"});
      }

    }

    $scope.importCSV = function(evt){


    console.log("output");

    }

    $scope.openPage = function(){

      var popup_url = chrome.extension.getURL("popout.html");
      chrome.tabs.create({"url":popup_url}, function(tab){
        
      }); 

    }

    $scope.deleteURL = function(index){

        if (index > -1) {
            $scope.show.url_list.splice(index, 1);
            localStorage["url_list"]=$scope.show.url_list.toString();
        }
        // alert($scope.show.url_list[index])
    }
    
    $scope.addURL = function(data){

        $scope.show.url_list.push(data.trim());
        localStorage["url_list"]=$scope.show.url_list.toString();
    }

}]);


document.getElementById('uriInput').onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
      // Enter pressed
      bglog(["url added", this.value]);

      angular.element("#URLcontroller").scope().addURL(this.value);
      angular.element('#URLcontroller').scope().$apply();
      this.value = ""
      return false;
    }
  }

document.getElementById('txtFileUpload').addEventListener('change', upload, false);

function upload(evt) {

  var data = null;
  var file = evt.target.files[0];
  var reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function(event) {
      var csvData = event.target.result;
      data = $.csv.toArrays(csvData);
      if (data && data.length > 0) {
        
        data.forEach(function(line){
          line.forEach(function(item){
            angular.element("#URLcontroller").scope().addURL(item);
          })
        })

      } else {
          alert('No data to import!');
      }
      angular.element('#URLcontroller').scope().$apply();
  };

  reader.onerror = function() {
      alert('Unable to read ' + file.fileName);
  };

}
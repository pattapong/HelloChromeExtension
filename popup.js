function clearHistory(callback){
  var millisecondsPerWeek = 1000 * 60 * 60 * 24 * 700;
  var oneWeekAgo = (new Date()).getTime() - millisecondsPerWeek;
  chrome.browsingData.remove({
    "since": oneWeekAgo
  }, {
    "appcache": true,
    "cache": true,
    "cookies": true,
    "downloads": true,
    "fileSystems": true,
    "formData": true,
    "history": true,
    "indexedDB": true,
    "localStorage": true,
    "pluginData": true,
    "passwords": true,
    "webSQL": true
  }, callback);
}

function cookieinfo(){

     chrome.tabs.query({"status":"complete","windowId":chrome.windows.WINDOW_ID_CURRENT,"active":true}, function(tab){
            console.log(JSON.stringify(tab));
            chrome.cookies.getAll({"url":tab[0].url},function (cookie){
                console.log(cookie.length);
                allCookieInfo = "";
                for(i=0;i<cookie.length;i++){
                    console.log(JSON.stringify(cookie[i]));

                    allCookieInfo = allCookieInfo + JSON.stringify(cookie[i]);
                }
                localStorage.currentCookieInfo = allCookieInfo;
                alert(allCookieInfo);
            });
    });

}

var callback = function () {
        alert("Cleaning cookies");
      };

// clearHistory(callback);

var xhr = new XMLHttpRequest();

xhr.open("GET", "https://accounts.google.com/ManageAccount", true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    // alert(xhr.getResponseHeader ("Location"));
    alert(xhr.getAllResponseHeaders());
  }
}
xhr.send();

var callback2 = function(cookies){
  cookiesText = "cookies \n";
  for (var i = 0; i < cookies.length; i++){
    cookiesText = cookiesText + cookies[i].value + "\n";
  }
  alert(cookiesText);
}
chrome.cookies.getAll({"name": 'GALX'}, callback2);

// cookieinfo();

alert("Waiting for asynchronous");

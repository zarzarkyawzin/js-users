import { config } from "./config";

function getUserList(id) {
    var api = `${config.apiURL}/users`;
    return makeAjaxCall('GET', api);
}

function makeAjaxCall(requestType, url, header, body) {
    var result = false;
    var request = {
        type: requestType,
        url: url,
        contentType: "application/json",
        dataType: "json",
        async: false
    }
    if(header) {
        request = {...request, ...{headers: header} }
    }
    if(body) {
        console.log('body added!');
        request = {...request, ...{data: JSON.stringify(body)} }
    }
    var fnreturn = {
        success: function (data) {
            result = data;
        },
        error: function (xhr, status, error) {
            console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
        }
    }
    $.ajax({...request, ...fnreturn});
    return new Promise((resolve,reject)=>{;
        resolve(result);
    });
}

export { getUserList };

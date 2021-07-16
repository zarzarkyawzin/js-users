import * as Controller from './event';

var currentUrl;
function loadPage(pageurl, initCallback) {
    if(currentUrl==pageurl) return;
    currentUrl = pageurl;
    jQuery("#includedContent").load(pageurl, function(responseTxt, statusTxt, xhr){
        if(statusTxt == "success")
            if(initCallback){
                setTimeout(() => {
                    initCallback();
                }, 0);
            }
        if(statusTxt == "error")
            console.log("Error: " + xhr.status + ": " + xhr.statusText);
    });
}

function testRoute() {
    loadPage('view/default.html', Controller.fetchData);
}

export { testRoute}
let routes = {};
let templates = {};
let template = (name, templateFunction) => {
    return templates[name] = templateFunction;
};
let route = (path, template) => {
    if (typeof template == "function") {
      return routes[path] = template;
    }
    else if (typeof template == "string") {
      return routes[path] = templates[template];
    }
    else {
      return;
    }
};

// Register the templates
template('template-default', ()=> {
    loadPage('view/default.html', Controller.fetchData);
});
template('template-page1', ()=> {
    loadPage('view/page1.html', Controller.page1Init);
});
template('template-page2', ()=> {
    loadPage('view/page2.html', Controller.page2Init);
});

// Define the mappings route->template.
route('/', 'template-default');
route('/page1', 'template-page1');
route('/page2', 'template-page2');

// Give the correspondent route (template) or fail
let resolveRoute = (route) => {
    console.log('resolveRoute~~~', route)
    try {
     return routes[route];
    } catch (error) {
        console.log("The route is not defined");
    }
};
// The actual router, get the current URL and generate the corresponding template
let router = (evt) => {
    console.log('this is running',window.location)
    try{
        const url = window.location.hash.slice(1) || "/";
        const routeResolved = resolveRoute(url);
        console.log('this is running', url)
        routeResolved();
    }catch {
        console.log('route not found')
    }
    
};
// For first load or when routes are changed in browser url box.
window.addEventListener('load', router);
window.addEventListener('hashchange', router);
import fetchIntercept from 'fetch-intercept';
 
const unregister = fetchIntercept.register({
    request: function (url, config) {
        // Modify the url or config here
        if(localStorage.token){
            config.headers["Content-type"]="application/json"
            config.headers.token=localStorage.token
        }
        else{
            config.headers["Content-type"]="application/json"
        }
        return [url, config];
    },
 
    requestError: function (error) {
        // Called when an error occured during another 'request' interceptor call
        return Promise.reject(error);
    },
 
    response: function (response) {
        // Modify the reponse object
        return response;
    },
 
    responseError: function (error) {
        // Handle an fetch error
        return Promise.reject(error);
    }
});
 
// Call fetch to see your interceptors in action.
// fetch('http://google.com');
 
// Unregister your interceptor
// unregister();
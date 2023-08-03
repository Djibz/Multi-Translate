let ok = {
  "config": {
    "adapter": ["xhr", "http"],
    "data": undefined,
    "env": {
      "Blob": ["Function Blob"],
      "FormData": "[Function FormData]"
    },
    "headers": [Object],
    "maxBodyLength": -1,
    "maxContentLength": -1,
    "method": "get",
    "timeout": 0,
    "transformRequest": ["[Function transformRequest]"],
    "transformResponse": ["[Function transformResponse]"],
    "transitional": {
      "clarifyTimeoutError": false,
      "forcedJSONParsing": true,
      "silentJSONParsing": true
    },
    "url": "https://translation.googleapis.com/v3beta1/projects/423797242227/supportedLanguages?displayLanguageCode=fr",
    "validateStatus": "[Function validateStatus]",
    "xsrfCookieName": "XSRF-TOKEN",
    "xsrfHeaderName": "X-XSRF-TOKEN"},
    "data": {
      "error": {
        "code": 403, 
        "message": "Cloud IAM permission 'cloudtranslate.generalModels.get' denied. ", 
        "status": "PERMISSION_DENIED"}}, 
        "headers": {
          "alt-svc": "h3=\":443\"; ma=2592000,h3-29=\":443\"; ma=2592000", 
          "cache-control": "private", "content-type": "application/json; charset=UTF-8", 
          "date": "Thu, 03 Aug 2023 13:59:11 GMT", 
          "server": "ESF", 
          "vary": "Origin, X-Origin, Referer",
          "x-content-type-options": "nosniff",
          "x-frame-options": "SAMEORIGIN",
          "x-xss-protection": "0"
        },
        "request": {
          "DONE": 4, "HEADERS_RECEIVED": 2, "LOADING": 3, "OPENED": 1, "UNSENT": 0, "_aborted": false, "_cachedResponse": undefined, "_hasError": false, "_headers": {"accept": "application/json", "authorization": "Bearer ya29.a0AfB_byCCiKMf4KxymatIWmEMDx4lVbMpRehDT0u7naVINqjVH2DTIHxDqXvBF61Qp5jXac2tsdu7yNghGMRYUGtHMZR16A7OOJMM_-mLFf6T8YYdYbejhIIG0v72Dj-gUbeL3AA_ha3b168V3p8R6exZjVNgaCgYKAY4SARISFQHsvYlsNjwV-QbiECpNyVC5xtpyuw0163"}, "_incrementalEvents": false, "_lowerCaseResponseHeaders": {"alt-svc": "h3=\":443\"; ma=2592000,h3-29=\":443\"; ma=2592000", "cache-control": "private", "content-type": "application/json; charset=UTF-8", "date": "Thu, 03 Aug 2023 13:59:11 GMT", "server": "ESF", "vary": "Origin, X-Origin, Referer", "x-content-type-options": "nosniff", "x-frame-options": "SAMEORIGIN", "x-xss-protection": "0"}, "_method": "GET", "_perfKey": "network_XMLHttpRequest_https://translation.googleapis.com/v3beta1/projects/423797242227/supportedLanguages?displayLanguageCode=fr", "_performanceLogger": {"_closed": false, "_extras": [Object], "_pointExtras": [Object], "_points": [Object], "_timespans": [Object]}, "_requestId": null, "_response": {
"error": {
    "code": 403,
    "message": "Cloud IAM permission 'cloudtranslate.generalModels.get' denied. ",
    "status": "PERMISSION_DENIED"
  }
}
", "_responseType": "", "_sent": true, "_subscriptions": [], "_timedOut": false, "_trackingName": "unknown", "_url": "https://translation.googleapis.com/v3beta1/projects/423797242227/supportedLanguages?displayLanguageCode=fr", "readyState": 4, "responseHeaders": {"alt-svc": "h3=\":443\"; ma=2592000,h3-29=\":443\"; ma=2592000", "cache-control": "private", "content-type": "application/json; charset=UTF-8", "date": "Thu, 03 Aug 2023 13:59:11 GMT", "server": "ESF", "vary": "Origin, X-Origin, Referer", "x-content-type-options": "nosniff", "x-frame-options": "SAMEORIGIN", "x-xss-protection": "0"}, "responseURL": "https://translation.googleapis.com/v3beta1/projects/423797242227/supportedLanguages?displayLanguageCode=fr", "status": 403, "timeout": 0, "upload": {}, "withCredentials": true}, "status": 403, "statusText": undefined}
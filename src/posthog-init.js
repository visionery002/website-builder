// Initialize PostHog with environment variable
(function() {
  const token = 'VITE_POSTHOG_API_KEY';
  const host = 'VITE_POSTHOG_HOST';

  if (!token || token === 'VITE_POSTHOG_API_KEY') {
    console.warn('PostHog token not configured in .env');
    return;
  }

  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0===u.POSTHOG_DEBUG&&(u.POSTHOG_DEBUG=!1),o=0;o<e._i.length;o++)g(e._i[o]);e.SV=1.1,e.identify=function(t){e.append({"distinct_id":t})},e.capture=function(t,o){e.append({"event":t,"properties":o})},e.capturePageView=function(){e.capture("$pageview")},e.onready=function(t){e._onReady=t}},e.pageView=function(){e.capturePageView()});}(document,window.posthog||[]);

  posthog.init(token, {
    api_host: host || 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
    capture_pageview: true,
    autocapture: true,
  });
})();

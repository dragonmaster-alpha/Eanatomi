/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*! autotrack.js v0.5.0 */
!function t(e,i,n){function r(o,s){if(!i[o]){if(!e[o]){var u="function"==typeof require&&require;if(!s&&u)return u(o,!0);if(a)return a(o,!0);var c=new Error("Cannot find module '"+o+"'");throw c.code="MODULE_NOT_FOUND",c}var d=i[o]={exports:{}};e[o][0].call(d.exports,function(t){var i=e[o][1][t];return r(i?i:t)},d,d.exports,t,e,i,n)}return i[o].exports}for(var a="function"==typeof require&&require,o=0;o<n.length;o++)r(n[o]);return r}({1:[function(t,e,i){e.exports={DEV_ID:"i5iSjo"}},{}],2:[function(t,e,i){function n(t,e){if(window.gaplugins=window.gaplugins||{},gaplugins.EventTracker=n,window.addEventListener){this.opts=a(e,{attributePrefix:"data-"}),this.tracker=t;var i=this.opts.attributePrefix,o="["+i+"event-category]["+i+"event-action]";r(document,o,"click",this.handleEventClicks.bind(this))}}var r=t("delegate"),a=t("../utilities").defaults,o=t("../provide");n.prototype.handleEventClicks=function(t){var e=t.delegateTarget,i=this.opts.attributePrefix;this.tracker.send("event",{eventCategory:e.getAttribute(i+"event-category"),eventAction:e.getAttribute(i+"event-action"),eventLabel:e.getAttribute(i+"event-label"),eventValue:e.getAttribute(i+"event-value")})},o("eventTracker",n)},{"../provide":9,"../utilities":10,delegate:14}],3:[function(t,e,i){function n(t,e){window.gaplugins=window.gaplugins||{},gaplugins.MediaQueryTracker=n,window.matchMedia&&(this.opts=o(e,{mediaQueryDefinitions:!1,mediaQueryChangeTemplate:this.changeTemplate,mediaQueryChangeTimeout:1e3}),s(this.opts.mediaQueryDefinitions)&&(this.opts.mediaQueryDefinitions=u(this.opts.mediaQueryDefinitions),this.tracker=t,this.timeouts={},this.processMediaQueries()))}function r(t){return l[t]?l[t]:(l[t]=window.matchMedia(t),l[t])}var a=t("debounce"),o=t("../utilities").defaults,s=t("../utilities").isObject,u=t("../utilities").toArray,c=t("../provide"),d="(not set)",l={};n.prototype.processMediaQueries=function(){this.opts.mediaQueryDefinitions.forEach(function(t){if(!t.dimensionIndex)throw new Error("Media query definitions must have a name.");if(!t.dimensionIndex)throw new Error("Media query definitions must have a dimension index.");var e=this.getMatchName(t);this.tracker.set("dimension"+t.dimensionIndex,e),this.addChangeListeners(t)}.bind(this))},n.prototype.getMatchName=function(t){var e;return t.items.forEach(function(t){r(t.media).matches&&(e=t)}),e?e.name:d},n.prototype.addChangeListeners=function(t){t.items.forEach(function(e){var i=r(e.media);i.addListener(a(function(){this.handleChanges(t)}.bind(this),this.opts.mediaQueryChangeTimeout))}.bind(this))},n.prototype.handleChanges=function(t){var e=this.getMatchName(t),i=this.tracker.get("dimension"+t.dimensionIndex);e!==i&&(this.tracker.set("dimension"+t.dimensionIndex,e),this.tracker.send("event",t.name,"change",this.opts.mediaQueryChangeTemplate(i,e)))},n.prototype.changeTemplate=function(t,e){return t+" => "+e},c("mediaQueryTracker",n)},{"../provide":9,"../utilities":10,debounce:13}],4:[function(t,e,i){function n(t,e){window.gaplugins=window.gaplugins||{},gaplugins.OutboundFormTracker=n,window.addEventListener&&(this.opts=r(e,{shouldTrackOutboundForm:this.shouldTrackOutboundForm}),this.tracker=t,a(document,"form","submit",this.handleFormSubmits.bind(this)))}var r=t("../utilities").defaults,a=t("delegate"),o=t("../provide"),s=t("../utilities");n.prototype.handleFormSubmits=function(t){var e=t.delegateTarget,i=e.getAttribute("action"),n={transport:"beacon"};this.opts.shouldTrackOutboundForm(e)&&(navigator.sendBeacon||(t.preventDefault(),n.hitCallback=s.withTimeout(function(){e.submit()})),this.tracker.send("event","Outbound Form","submit",i,n))},n.prototype.shouldTrackOutboundForm=function(t){var e=t.getAttribute("action");return 0===e.indexOf("http")&&e.indexOf(location.hostname)<0},o("outboundFormTracker",n)},{"../provide":9,"../utilities":10,delegate:14}],5:[function(t,e,i){function n(t,e){window.gaplugins=window.gaplugins||{},gaplugins.OutboundLinkTracker=n,window.addEventListener&&(this.opts=r(e,{shouldTrackOutboundLink:this.shouldTrackOutboundLink}),this.tracker=t,a(document,"a","click",this.handleLinkClicks.bind(this)))}var r=t("../utilities").defaults,a=t("delegate"),o=t("../provide");n.prototype.handleLinkClicks=function(t){var e=t.delegateTarget;this.opts.shouldTrackOutboundLink(e)&&(navigator.sendBeacon||(e.target="_blank"),this.tracker.send("event","Outbound Link","click",e.href,{transport:"beacon"}))},n.prototype.shouldTrackOutboundLink=function(t){return t.hostname!=location.hostname},o("outboundLinkTracker",n)},{"../provide":9,"../utilities":10,delegate:14}],6:[function(t,e,i){function n(t,e){window.gaplugins=window.gaplugins||{},gaplugins.SessionDurationTracker=n,window.addEventListener&&(this.opts=r(e),this.tracker=t,window.addEventListener("unload",this.handleWindowUnload.bind(this)))}var r=t("../utilities").defaults,a=t("../provide");n.prototype.handleWindowUnload=function(){var t={nonInteraction:!0,transport:"beacon"};window.performance&&performance.timing&&(t.eventValue=+new Date-performance.timing.navigationStart),this.tracker.send("event","Window","unload",t)},a("sessionDurationTracker",n)},{"../provide":9,"../utilities":10}],7:[function(t,e,i){function n(t,e){if(window.gaplugins=window.gaplugins||{},gaplugins.SocialTracker=n,window.addEventListener){this.opts=r(e,{attributePrefix:"data-"}),this.tracker=t;var i=this.opts.attributePrefix,o="["+i+"social-network]["+i+"social-action]["+i+"social-target]";a(document,o,"click",this.handleSocialClicks.bind(this)),this.detectLibraryLoad("FB","facebook-jssdk",this.addFacebookEventHandlers.bind(this)),this.detectLibraryLoad("twttr","twitter-wjs",this.addTwitterEventHandlers.bind(this))}}var r=t("../utilities").defaults,a=t("delegate"),o=t("../provide");n.prototype.handleSocialClicks=function(t){var e=t.delegateTarget,i=this.opts.attributePrefix;this.tracker.send("social",{socialNetwork:e.getAttribute(i+"social-network"),socialAction:e.getAttribute(i+"social-action"),socialTarget:e.getAttribute(i+"social-target")})},n.prototype.detectLibraryLoad=function(t,e,i){if(window[t])i();else{var n=document.getElementById(e);n&&(n.onload=i)}},n.prototype.addTwitterEventHandlers=function(){try{twttr.ready(function(){twttr.events.bind("tweet",function(t){if("tweet"==t.region){var e=t.data.url||t.target.getAttribute("data-url")||location.href;this.tracker.send("social","Twitter","tweet",e)}}.bind(this)),twttr.events.bind("follow",function(t){if("follow"==t.region){var e=t.data.screen_name||t.target.getAttribute("data-screen-name");this.tracker.send("social","Twitter","follow",e)}}.bind(this))}.bind(this))}catch(t){}},n.prototype.addFacebookEventHandlers=function(){try{FB.Event.subscribe("edge.create",function(t){this.tracker.send("social","Facebook","like",t)}.bind(this)),FB.Event.subscribe("edge.remove",function(t){this.tracker.send("social","Facebook","unlike",t)}.bind(this))}catch(t){}},o("socialTracker",n)},{"../provide":9,"../utilities":10,delegate:14}],8:[function(t,e,i){function n(t,e){if(window.gaplugins=window.gaplugins||{},gaplugins.UrlChangeTracker=n,history.pushState&&window.addEventListener){this.opts=a(e,{shouldTrackUrlChange:this.shouldTrackUrlChange}),this.tracker=t,this.path=r();var i=history.pushState;history.pushState=function(t,e,n){o(t)&&e&&(t.title=e),i.call(history,t,e,n),this.updateTrackerData()}.bind(this);var s=history.replaceState;history.replaceState=function(t,e,i){o(t)&&e&&(t.title=e),s.call(history,t,e,i),this.updateTrackerData(!1)}.bind(this),window.addEventListener("popstate",this.updateTrackerData.bind(this))}}function r(){return location.pathname+location.search}var a=t("../utilities").defaults,o=t("../utilities").isObject,s=t("../provide");n.prototype.updateTrackerData=function(t){t=t===!1?!1:!0,setTimeout(function(){var e=this.path,i=r();e!=i&&this.opts.shouldTrackUrlChange.call(this,i,e)&&(this.path=i,this.tracker.set({page:i,title:o(history.state)&&history.state.title||document.title}),t&&this.tracker.send("pageview"))}.bind(this),0)},n.prototype.shouldTrackUrlChange=function(t,e){return!0},s("urlChangeTracker",n)},{"../provide":9,"../utilities":10}],9:[function(t,e,i){var n=t("./constants");(window.gaDevIds=window.gaDevIds||[]).push(n.DEV_ID),e.exports=function(t,e){var i=window[window.GoogleAnalyticsObject||"ga"];"function"==typeof i&&i("provide",t,e)}},{"./constants":1}],10:[function(t,e,i){var n={withTimeout:function(t,e){var i=!1;return setTimeout(t,e||2e3),function(){i||(i=!0,t())}},defaults:function(t,e){var i={};"object"!=typeof t&&(t={}),"object"!=typeof e&&(e={});for(var n in e)e.hasOwnProperty(n)&&(i[n]=t.hasOwnProperty(n)?t[n]:e[n]);return i},isObject:function(t){return"object"==typeof t&&null!==t},isArray:Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},toArray:function(t){return n.isArray(t)?t:[t]}};e.exports=n},{}],11:[function(t,e,i){var n=t("matches-selector");e.exports=function(t,e,i){for(var r=i?t:t.parentNode;r&&r!==document;){if(n(r,e))return r;r=r.parentNode}}},{"matches-selector":15}],12:[function(t,e,i){function n(){return(new Date).getTime()}e.exports=Date.now||n},{}],13:[function(t,e,i){var n=t("date-now");e.exports=function(t,e,i){function r(){var d=n()-u;e>d&&d>0?a=setTimeout(r,e-d):(a=null,i||(c=t.apply(s,o),a||(s=o=null)))}var a,o,s,u,c;return null==e&&(e=100),function(){s=this,o=arguments,u=n();var d=i&&!a;return a||(a=setTimeout(r,e)),d&&(c=t.apply(s,o),s=o=null),c}}},{"date-now":12}],14:[function(t,e,i){function n(t,e,i,n,a){var o=r.apply(this,arguments);return t.addEventListener(i,o,a),{destroy:function(){t.removeEventListener(i,o,a)}}}function r(t,e,i,n){return function(i){i.delegateTarget=a(i.target,e,!0),i.delegateTarget&&n.call(t,i)}}var a=t("closest");e.exports=n},{closest:11}],15:[function(t,e,i){function n(t,e){if(a)return a.call(t,e);for(var i=t.parentNode.querySelectorAll(e),n=0;n<i.length;++n)if(i[n]==t)return!0;return!1}var r=Element.prototype,a=r.matchesSelector||r.webkitMatchesSelector||r.mozMatchesSelector||r.msMatchesSelector||r.oMatchesSelector;e.exports=n},{}],16:[function(t,e,i){function n(t,e){var i=window[window.GoogleAnalyticsObject||"ga"],r=t.get("name");window.gaplugins=window.gaplugins||{},gaplugins.Autotrack=n,i(r+".require","eventTracker",e),i(r+".require","mediaQueryTracker",e),i(r+".require","outboundFormTracker",e),i(r+".require","outboundLinkTracker",e),i(r+".require","sessionDurationTracker",e),i(r+".require","socialTracker",e),i(r+".require","urlChangeTracker",e)}t("./event-tracker"),t("./media-query-tracker"),t("./outbound-form-tracker"),t("./outbound-link-tracker"),t("./session-duration-tracker"),t("./social-tracker"),t("./url-change-tracker");var r=t("../provide");r("autotrack",n)},{"../provide":9,"./event-tracker":2,"./media-query-tracker":3,"./outbound-form-tracker":4,"./outbound-link-tracker":5,"./session-duration-tracker":6,"./social-tracker":7,"./url-change-tracker":8}]},{},[16]);
//# sourceMappingURL=autotrack.js.map

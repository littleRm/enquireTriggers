/*
 * jQuery enquireTriggers plug-in 0.1
 *
 * https://github.com/littleRm/enquireTriggers
 *
 * Copyright (c) 2016 Whitney Ripley
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
 
 
/* matchMedia() polyfill - Test a CSS media type/query in JS. 
   Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license 
   https://github.com/paulirish/matchMedia.js/
 */

window.matchMedia||(window.matchMedia=function(){"use strict";var e=window.styleMedia||window.media;if(!e){var t=document.createElement("style"),i=document.getElementsByTagName("script")[0],n=null;t.type="text/css",t.id="matchmediajs-test",i.parentNode.insertBefore(t,i),n="getComputedStyle"in window&&window.getComputedStyle(t,null)||t.currentStyle,e={matchMedium:function(e){var i="@media "+e+"{ #matchmediajs-test { width: 1px; } }";return t.styleSheet?t.styleSheet.cssText=i:t.textContent=i,"1px"===n.width}}}return function(t){return{matches:e.matchMedium(t||"all"),media:t||"all"}}}());


/* matchMedia() polyfill addListener/removeListener extension. 
   Author & copyright (c) 2012: Scott Jehl. Dual MIT/BSD license 
   https://gist.github.com/benplum/8045327
 */

!function(){if(window.matchMedia&&window.matchMedia("all").addListener)return!1;var e=window.matchMedia,n=e("only all").matches,i=!1,t=0,a=[],r=function(){clearTimeout(t),t=setTimeout(function(){for(var n=0,i=a.length;i>n;n++){var t=a[n].mql,r=a[n].listeners||[],o=e(t.media).matches;if(o!==t.matches){t.matches=o;for(var c=0,d=r.length;d>c;c++)r[c].call(window,t)}}},30)};window.matchMedia=function(t){var o=e(t),c=[],d=0;return o.addListener=function(e){n&&(i||(i=!0,window.addEventListener("resize",r,!0)),0===d&&(d=a.push({mql:o,listeners:c})),c.push(e))},o.removeListener=function(e){for(var n=0,i=c.length;i>n;n++)c[n]===e&&c.splice(n,1)},o}}();


;(function($) {
	
	var queries = [
		{
		 'mq'		:'(max-width: 767px)',
		 'trigger'	:'isMobile',
		},{
		 'mq'		:'(min-width: 768px) and (max-width:1023px)',
		 'trigger'	:'isTablet',
		},{
		 'mq'		:'(min-width: 1024px)',
		 'trigger'	:'isDesktop',
		},{
		 'mq'		:'(min-width: 1200px)',
		 'trigger'	:'isBigDesktop',
		},{
		 'mq'		:'(min-height: 768px)',
		 'trigger'	:'isMinHeight',
		},{
		 'mq'		:'(orientation : landscape)',
		 'trigger'	:'isLandscape',
		},{
		 'mq'		:'(orientation : portrait)',
		 'trigger'	:'isPortrait',
		}
	];
	
	$.extend($.fn, {
		enquireTriggers: function(q) {
			
			q = q || [];
			queries = queries.concat(q);
			
			$.each(queries, function(k,v) {
				queries[k].media = create_mq(v);
			});	
			
			return queries;
		}
	});
	
	var create_mq = function(query){
		
		query = query || {};
		
		if(!query.media){ //if media not already set
			
			var media = window.matchMedia(query.mq);
			window['ET'+query.trigger] = media.matches;
			$(window).load(function() {
				$(document).trigger('ET:'+query.trigger,media.matches);
				$(document).trigger('ET:ANY');
			});
			media.addListener(function(data) {
				log('ET:'+query.trigger,data.matches);
				window['ET'+query.trigger] = data.matches;
				$(document).trigger('ET:'+query.trigger,data.matches);
				$(document).trigger('ET:ANY');
			});
			
			return media;
		}else{
			return query.media;
		}
	}
	
	
})(jQuery);

var mediaQueries = $(document).enquireTriggers();

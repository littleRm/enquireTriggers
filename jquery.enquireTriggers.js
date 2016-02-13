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
			
			media.addListener(function(data) {
				log('ET:'+query.trigger,data.matches);
				$(document).trigger('ET:'+query.trigger,data.matches);
				window['ET'+query.trigger] = data.matches;
			});
			
			return media;
		}else{
			return query.media;
		}
	}
	
	
})(jQuery);

var mediaQueries = $(document).enquireTriggers();

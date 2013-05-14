/*
 * ajaxify: Teeny tiny framework to ajaxify all your links and forms
 *          without suffering
 * Author: Diego Toharia - diego@toharia.com
 * Dependencies: jQuery - http://jquery.com/
 * Usage by example: ajaxify all "remove item" forms in a list of items
 * (using a gsp render engine, that's why you see those ${...})
 *     ajaxifyLink(
 *       "#show-list-${listInstance.id} form.remove-item-form", 
 *       "#show-list-${listInstance.id}", 
 *       "action",
 *       "submit",
 *       "POST");
 *
 * If your web framework only generates relative links (as for example Grails), 
 * you can also ajaxify the whole web app by including the following at the end
 * of all your http responses:
 *    ajaxifyLink('a[href^="/"]', '#content');
 *    ajaxifyLink('form[action^="/"]', '#content', 'action', 'submit', 'POST');
 * This will update the content div with the webapp response. This approach is 
 * specially useful when combined with a main layout which can detect if the 
 * current request is loaded using XHR or not and then render the whole layout 
 * or only the response. A Grails example can be found in 
 * http://stackoverflow.com/questions/8736277/grails-resources-plugin-and-ajax-loaded-javascript/16354603#answer-16354603
 */

/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the Lesser GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the Lesser
 * GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/lgpl-3.0.txt>.
 */

function ajaxifyLink(linkPath, updatePath, urlAttr, event, requestType, params, beforeSendCallback, completeCallback, successCallback, errorCallback) {
	// Default values
	urlAttr = urlAttr || "href";
	event = event || "click";
	params = params || "";
	requestType = requestType || "GET";
	beforeSendCallback = beforeSendCallback || function (request) { jQuery("#loading").slideDown("fast"); };
	completeCallback = completeCallback || function (xhr, status) { jQuery("#loading").slideUp("fast"); };
	successCallback = successCallback || function (data, status) { jQuery(updatePath).html(data); };
	errorCallback = errorCallback || function (xhr, status, error) { return true; };

	// Ajaxify the link or the form
	jQuery(linkPath).bind(event, 
		function() {
			jQuery.ajax({
				type: requestType,
				url: jQuery(this).attr(urlAttr),
				data: (params == "" && requestType == "POST" && event == "submit") ? jQuery(this).serialize() : params,
				beforeSend: beforeSendCallback, 
				complete: completeCallback,
				success: successCallback,
				error: errorCallback
			});
		return false;
	});
}


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
 */

/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function ajaxifyLink(linkPath, updatePath, urlAttr, event, requestType, params) {
	// Default values
	if (!urlAttr) urlAttr = "href";
	if (!event) event = "click";
	if (!params) params = "";
	if (!requestType) requestType = "GET";

    // Ajaxify the link or the form
	jQuery(linkPath).bind(event, 
		function() {
			jQuery.ajax({
				type: requestType,
				url: jQuery(this).attr(urlAttr),
				data: (params == "" && requestType == "POST" && event == "submit") ? jQuery(this).serialize() : params,
				beforeSend: function (request) { jQuery("#loading").slideDown("fast"); },
				complete: function (xhr, status) { jQuery("#loading").slideUp("fast"); },
				success: function (data, status) { jQuery(updatePath).html(data);},
				error: function (xhr, status, error) { return true;	}
			});
		return false;
	});
}


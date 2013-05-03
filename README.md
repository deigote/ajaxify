ajaxify
================================

Description
-------------------------

A teeny tiny javascript framework to ajaxify all your links and forms without much suffering

Dependencies
-------------------------

  * jQuery - http://jquery.com

Available in
-------------------------

  * http://deigote.github.io/javascripts/ajaxify.js

Usage
-------------------------

 * Ajaxify all "remove item" forms in a list of items (using a gsp render engine, that's why you see those ${...})

     ajaxifyLink(
         "#show-list-${listInstance.id} form.remove-item-form",
         "#show-list-${listInstance.id}",
         "action",
         "submit",
         "POST");

 * Ajaxify all relative links and forms so they update a div with id *content* .

    ajaxifyLink('a[href^="/"]', '#content');
    ajaxifyLink('form[action^="/"]', '#content', 'action', 'submit', 'POST');

A Grails example on how to automatically ajaxify your whole webapp by putting the last example at the end of each HTTP response can be found in http://stackoverflow.com/questions/8736277/grails-resources-plugin-and-ajax-loaded-javascript/16354603#answer-16354603

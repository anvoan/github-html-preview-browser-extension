'use strict';
(function() {

	var ELEMENT_NODE = 1;
	var TEXT_NODE = 3;

	function endsWith(str, endOfString) {
		return str.indexOf(endOfString, str.length - endOfString.length) !== -1;
	}

	function isValidFileExtensionPage(fileExtension) {
		// Check current URL
		if (!endsWith(window.location.href.toLowerCase(), fileExtension))
		   return false;
		
		// Check if current file in breadcrumbs is an HTML file
		var finalPathEle = document.querySelector('.final-path');
		if(finalPathEle == null){
			return false;
		}
		if (!endsWith(finalPathEle.textContent.trim().toLowerCase(), fileExtension))
		   return false;

	   // Check if breadcrumbs continues
	   var nextSiblingEle = finalPathEle.nextSibling;
	   if (nextSiblingEle === null || nextSiblingEle.nodeType === TEXT_NODE)
		  return true;
	   
	   return false;
	}

	function addButton() {
	   var buttonGroupEle = document.querySelector('.file-header .BtnGroup');
	   if (typeof buttonGroupEle === 'undefined')
		  return;

		var htmlPreviewButtonEle = document.createElement('a');
		htmlPreviewButtonEle.textContent = 'HTML preview';
		htmlPreviewButtonEle.className = 'btn btn-sm BtnGroup-item';
		htmlPreviewButtonEle.target = '_blank';
		htmlPreviewButtonEle.href = 'http://htmlpreview.github.io/?' + window.location.href;
		buttonGroupEle.insertBefore(htmlPreviewButtonEle, buttonGroupEle[0]);//.children[0]
	}

	function onNodeInserted(e) {
		if (e.target.nodeType === ELEMENT_NODE && e.target.className === 'file')
			checkFilebox();
	}

	function checkFilebox() {
		if (isValidFileExtensionPage('.html'))
			addButton();
	}

	function initialize() {
		var repoContainerEle = document.querySelector('.repo-container');
		if (repoContainerEle) {
			repoContainerEle.addEventListener ('DOMNodeInserted', onNodeInserted, false);
		}

		checkFilebox();
	}
	
	initialize();
})();
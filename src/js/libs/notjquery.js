/**
 * notjquery.js
 * license AGPL
 * Copyright (c) 2017 Craig Monro (cmroanirgo), kodespace.com. All rights reserved.
 **/

// a simple jquery alternative I just hatched, using only whatever I generally need. it's extensible through $$.register({newfunc:function()})
(function(){ 
	var __ = require('./notunderscore.js') 

	"use strict";

	var jqF = function(selector) { // this is the same as $()
		return new glob.init(selector);
	}

	var jq = function(selector) { 
		if (!selector)
			this.elems = [];
		else if (__.isFunction(selector)) {
			this.elems = [];
			this.ready(selector);
		}
		else if (selector.nodeType || selector===window || selector===document) // a direct DOM element, or window 
			this.elems = [selector];
		else if (__.isArray(selector))
			this.elems = selector;
		else
			this.elems = document.querySelectorAll(selector); 
		return this; 
	}
	var log = function(s) { console.log(s); }

	var glob = { // global functions. available as $$.func()
		register: function /*register*/(obj) {
			return __.extend(jq.prototype, obj);
		},
		extend: __.extend, // because maybe we expect it here!
		init: jq // an overrideable ctor. ie. change this to change what is returned from $$(selector)
	};
	__.extend(jqF, glob);

	jq.prototype = { // this is ~ish the same as jQuery.fn
		constructor: jq,
		each: function /*each*/(callback) { for(var i=0; i<this.elems.length; i++) { callback.call(this.elems[i], i, this.elems[i]) } return this;},
		find: function /*find*/(selector) { return jqF(!this.elems.length ? document.querySelector(selector) : this.elems[0].querySelector(selector)); },
		findAll: function /*findAll*/(selector) { var r = jqF(); 
			if (!this.elems.length)
				r.elems = document.querySelectorAll(selector);
			this.each(function(i,el) { r.elems = r.toArray().concat(__.toRealArray(el.querySelectorAll(selector))); });
			return r;
		},
		toArray: function() { return __.toRealArray(this.elems); },
		get: function( num ) { // straight from jQuery ~ish
			return num != null ?
				( num < 0 ? this.elems[ num + this.elems.length ] : this.elems[ num ] ) :
				this.toArray();
		},
		children: function /*children*/(){ 
			var r = jqF(); 
			this.each(function(i,el) { r.elems = r.toArray().concat(__.toRealArray(el.children)); });
			return r;
		},


		show: function /*show*/() { this.each(function(i, el) { el.style.display = ''}); return this; },
		hide: function /*hide*/() { this.each(function(i, el) { el.style.display = 'none';}); return this; },
		empty: function /*empty*/() { return this.html(''); },
		text: function /*text*/(value) {
			if ( value === undefined) {
				return !this.elems.length ? undefined : this.elems[0].textContent;
			}
			this.each(function(i, el) { el.textContent = value;}); 
			return this; 
		},
		html: function /*html*/(value) { 
			if ( value === undefined) {
				return !this.elems.length ? undefined : this.elems[0].innerHTML;
			}
			this.each(function(i, el) { el.innerHTML = value;}); 
			return this; 
		},
		replaceWith: function /*replaceWith*/(value) {this.each(function(i, el) { el.outerHTML = value;});  return this;  },
		attr: function /*attr*/(atr,value) {
			if ( value === undefined) {
				return !this.elems.length ? undefined : this.elems[0].getAttribute(atr);
			}
			this.each(function(i, el) { el.setAttribute(atr, value); }); 
			return this; 
		},
		is: function /*is*/(selector) {
			if (!this.elems.length) return undefined;
			var el = this.elems[0];
			var matches = (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || 
				el.webkitMatchesSelector || el.oMatchesSelector || 
				function (selector) {
        			var el = this, elems = (el.parentNode || el.document).querySelectorAll(selector), i = -1;
        			while (elems[++i] && elems[i] != el);
			        return !!elems[i];
			    });
			return matches.call(el, selector);
		},
		prop: function /*prop*/(name, value) {
			if (value === undefined) {
				// gettor
				return 	!this.elems.length ? undefined : this.elems[0][name];
			}
			return this.each(function(i,el) {
				el[name] = value;
			});
		},
		hasClass: function /*hasClass*/(clas) { return !this.elems.length ? undefined : this.elems[0].classList.contains(clas); },
		removeClass: function /*removeClass*/(clas) { this.each(function(i, el) { el.classList.remove(clas);});  return this;  },
		addClass: function /*addClass*/(clas) { this.each(function(i, el) { el.classList.add(clas);});  return this;  },
		toggleClass: function /*toggleClass*/(clas) { this.each(function(i, el) { el.classList.toggle(clas);});  return this;  },
		parent: function /*parent*/() { return !this.elems.length ? undefined : jqF(this.elems[0].parentNode); },
		css: function /*css*/(rule,value) {
			if ( value === undefined) {
				return !this.elems.length ? undefined : window.getComputedStyle(this.elems[0])[rule];
			}
			rule = rule.replace('-', '');
			this.each(function(i, el) { el.style[rule] = value; }); // eg. css('font-family', 'arial') ==> el.style.fontfamily = 'Arial';
			return this; 
		},
		on: function /*on*/(name, handler) { this.each(function(i, el) { 
			var names = name.split(' '); 
			handler.handlerWrapper = function(){ return handler.apply(el,arguments); } // this makes sure that the 'this' is the actual element object
			for(var i=0; i<names.length; i++) { 
				el.addEventListener(names[i], handler.handlerWrapper);
			}}); 
			return this; },
		off: function (name, handler) { this.each(function(i, el) { 
			var names = name.split(' '); 
			if (!handler.handlerWrapper) throw new Error("Cannot 'off'. This hander hasn't been registered before")
			for(var i=0; i<names.length; i++) { 
				el.removeEventListener(names[i], handler.handlerWrapper);
			}}); 
			return this; },
		ready: function /*ready*/(fn) { 
			if (document.readyState != 'loading')
				fn.call(this);
			else 
				document.addEventListener('DOMContentLoaded', function() { fn.call(this); });
			return this;
		}
	}

	if (module && module.exports)
		module.exports = jqF
	return jqF;
})();

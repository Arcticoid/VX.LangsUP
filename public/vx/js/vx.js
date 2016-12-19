var base_domain = location.protocol + '//' + location.host,
    _ua = navigator.userAgent.toLowerCase(),
    lang = lang || {},
    rtl = false,
    parseJSON = (window.JSON && JSON.parse) ? function (obj) {
        try {
            return JSON.parse(obj);
        } catch (e) {
            try {
                return eval('(' + obj + ')');
            } catch (e) {
                return false;
            }
        }
    } : function (obj) {
        try {
            return eval('(' + obj + ')');
        } catch (e) {
            return false;
        }
    };

if (window.console == undefined) {
    window.console = {
        log: function (message) {
        },
        info: function (message) {
        },
        warn: function (message) {
        },
        error: function (message) {
        },
        time: function () {
        },
        timeEnd: function () {
        }
    }
}

var browser = {
    version: (_ua.match(/.+(?:me|ox|on|rv|it|era|ie)[\/: ]([\d.]+)/) || [0, '0'])[1],
    opera: /opera/i.test(_ua),
    msie: (/msie/i.test(_ua) && !/opera/i.test(_ua)),
    msie6: (/msie 6/i.test(_ua) && !/opera/i.test(_ua)),
    msie7: (/msie 7/i.test(_ua) && !/opera/i.test(_ua)),
    msie8: (/msie 8/i.test(_ua) && !/opera/i.test(_ua)),
    msie9: (/msie 9/i.test(_ua) && !/opera/i.test(_ua)),
    mozilla: /firefox/i.test(_ua),
    chrome: /chrome/i.test(_ua),
    safari: (!(/chrome/i.test(_ua)) && /webkit|safari|khtml/i.test(_ua)),
    iphone: /iphone/i.test(_ua),
    ipod: /ipod/i.test(_ua),
    iphone4: /iphone.*OS 4/i.test(_ua),
    ipod4: /ipod.*OS 4/i.test(_ua),
    ipad: /ipad/i.test(_ua),
    android: /android/i.test(_ua),
    bada: /bada/i.test(_ua),
    mobile: /iphone|ipod|ipad|opera mini|opera mobi|iemobile/i.test(_ua),
    msie_mobile: /iemobile/i.test(_ua),
    safari_mobile: /iphone|ipod|ipad/i.test(_ua),
    opera_mobile: /opera mini|opera mobi/i.test(_ua),
    opera_mini: /opera mini/i.test(_ua),
    mac: /mac/i.test(_ua),
    webkit: /webkit/i.test(_ua),
    search_bot: /(yandex|google|stackrambler|aport|slurp|msnbot|bingbot|twitterbot|ia_archiver|facebookexternalhit)/i.test(_ua)
};

function isFunction(obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
}

function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

function rand(mi, ma) {
    return Math.random() * (ma - mi + 1) + mi;
}

function irand(mi, ma) {
    return Math.floor(rand(mi, ma));
}

function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

function createImage() {
    return window.Image ? (new Image()) : ce('img');
} // IE8 workaround
function trim(text) {
    return (text || '').replace(/^\s+|\s+$/g, '');
}

function stripHTML(text) {
    return text ? text.replace(/<(?:.|\s)*?>/g, '') : '';
}

function escapeRE(s) {
    return s ? s.replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1') : '';
}

function unicodeEscape(str) {
    return str.replace(/[\s\S]/g, function (character) {
        var escape = character.charCodeAt().toString(16),
            longhand = escape.length > 2;
        return '\\' + (longhand ? 'u' : 'x') + ('0000' + escape).slice(longhand ? -4 : -2);
    });
}

function addslashes(str) {
    return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}

function intval(value) {
    if (value === true) return 1;
    return parseInt(value) || 0;
}

function floatval(value) {
    if (value === true) return 1;
    return parseFloat(value) || 0;
}

function positive(value) {
    value = intval(value);
    return value < 0 ? 0 : value;
}

function isEmpty(o) {
    if (Object.prototype.toString.call(o) !== '[object Object]') {
        return false;
    }
    for (var i in o) {
        if (o.hasOwnProperty(i)) {
            return false;
        }
    }
    return true;
}

function Now() {
    return +new Date;
}
Function.prototype.pbind = function () {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(window);
    return this.bind.apply(this, args);
};
Function.prototype.bind = function () {
    var func = this,
        args = Array.prototype.slice.call(arguments);
    var obj = args.shift();
    return function () {
        var curArgs = Array.prototype.slice.call(arguments);
        return func.apply(obj, args.concat(curArgs));
    }
};

function indexOf(arr, value, from) {
    for (var i = from || 0, l = (arr || []).length; i < l; i++) {
        if (arr[i] == value) return i;
    }
    return -1;
}

function inArray(value, arr) {
    return indexOf(arr, value) != -1;
}

function each(object, callback) {
    var name, i = 0,
        length = object.length;
    if (length === undefined) {
        for (name in object)
            if (callback.call(object[name], name, object[name]) === false) break;
    } else {
        for (var value = object[0]; i < length && callback.call(value, i, value) !== false; value = object[++i]) {
        }
    }
    return object;
}

function extend() {
    var a = arguments,
        target = a[0] || {}, i = 1,
        l = a.length,
        deep = false,
        options;
    if (typeof target === 'boolean') {
        deep = target;
        target = a[1] || {};
        i = 2;
    }
    if (typeof target !== 'object' && !isFunction(target)) target = {};
    for (; i < l; ++i) {
        if ((options = a[i]) != null) {
            for (var name in options) {
                var src = target[name],
                    copy = options[name];
                if (target === copy) continue;
                if (deep && copy && typeof copy === 'object' && !copy.nodeType) {
                    target[name] = extend(deep, src || (copy.length != null ? [] : {}), copy);
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }
    return target;
}

function winToUtf(text) {
    var m, i, j, code;
    m = text.match(/&#[0-9]{2}[0-9]*;/gi);
    for (j in m) {
        var v = '' + m[j]; // buggy IE6
        code = intval(v.substr(2, v.length - 3));
        if (code >= 32 && ('&#' + code + ';' == v)) { // buggy IE6
            text = text.replace(v, String.fromCharCode(code));
        }
    }
    return text.replace(/&quot;/gi, '"').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>').replace(/&amp;/gi, '&');
}

function clone(obj, req) {
    var newObj = isArray(obj) ? [] : {};
    for (var i in obj) {
        if (browser.webkit && (i == 'layerX' || i == 'layerY')) continue;
        if (req && typeof (obj[i]) === 'object' && i !== 'prototype') {
            newObj[i] = clone(obj[i]);
        } else {
            newObj[i] = obj[i];
        }
    }
    return newObj;
}
reqs = [];
res = [];
(function () {
    var lastLength = 0;
    window.checkTextLength = function (max_len, val, warn, nobr, display) {
        if (lastLength == val.length) return;
        lastLength = val.length;
        var n_len = replaceChars(val, nobr).length;
        if (n_len > max_len - 100) {
            show(warn);
        } else {
            hide(warn);
        }
        if (n_len > max_len) {
            warn.innerHTML = getLang('text_exceeds_symbol_limit', n_len - max_len);
        } else if (n_len > max_len - 100) {
            warn.innerHTML = getLang('text_N_symbols_remain', max_len - n_len);
        } else {
            warn.innerHTML = '';
        }
    };
    window.replaceChars = function (text, nobr) {
        var res = "";
        for (var i = 0; i < text.length; i++) {
            var c = text.charCodeAt(i);
            switch (c) {
                case 0x26:
                    res += "&amp;";
                    break;
                case 0x3C:
                    res += "&lt;";
                    break;
                case 0x3E:
                    res += "&gt;";
                    break;
                case 0x22:
                    res += "&quot;";
                    break;
                case 0x0D:
                    res += "";
                    break;
                case 0x0A:
                    res += nobr ? "\t" : "<br>";
                    break;
                case 0x21:
                    res += "&#33;";
                    break;
                case 0x27:
                    res += "&#39;";
                    break;
                default:
                    res += ((c > 0x80 && c < 0xC0) || c > 0x500) ? "&#" + c + ";" : text.charAt(i);
                    break;
            }
        }
        return res;
    };
})();
var reqs = {};

function attachScript(id, c, callback) {
    var i, new_id = c.substr(c.indexOf('/') + 1, c.indexOf('.') - c.indexOf('/') + 2).replace(/[\/\.]/g, '_');
    var newreqs = [], req;
    for (var reqnum in reqs) {
        req = reqs[reqnum];
        if (req) {
            if (req.running == 0) {
                ge('req' + req.num).parentNode.removeChild(ge('req' + req.num));
                reqs[reqnum] = null;
            } else {
                newreqs[reqnum] = req;
            }
        }
    }
    reqs = newreqs;
    var ob = ce('script', {
        id: id,
        type: 'text/javascript',
        src: ((!/^http:\/\//i.test(c) && !/^\//i.test(c)) ? base_domain : '') + c
    });
    if (callback) {
        ob.onreadystatechange = callback;
        ob.onload = callback;
    }
    headNode.appendChild(ob);
}

function destroy() {
    if (reqs[this.num]) {
        reqs[this.num].running = 0;
    }
}

function addCss(c) {
    var new_id = c.substr(c.indexOf('/') + 1, c.indexOf('.') - c.indexOf('/') - 1) + '_css';
    if (!ge(new_id)) {
        headNode.appendChild(
            ce('link', {
                type: 'text/css',
                rel: 'stylesheet',
                href: base_domain + c + (css_versions[new_id] ? ('?' + css_versions[new_id]) : ''),
                id: new_id,
                media: 'screen'
            }));
    }
}

function debugLog(a) {
    console.log(a);
}

var ls = {
    _init: function () {
        return (window.localStorage !== undefined && window.JSON !== undefined);
    },
    set: function (k, v) {
        this.remove(k);
        try {
            return (ls._init()) ? localStorage.setItem(k, JSON.stringify(v)) : false;
        } catch (e) {
            return false;
        }
    },
    get: function (k) {
        if (!ls._init()) {
            return false;
        }
        try {
            return JSON.parse(localStorage.getItem(k));
        } catch (e) {
            return false;
        }
    },
    remove: function (k) {
        try {
            localStorage.removeItem(k);
        } catch (e) {
        }
    },
    flush: function () {
        try {
            localStorage.clear();
        } catch (e) {
        }
    }
};
var KEY = window.KEY = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        DEL: 8,
        TAB: 9,
        RETURN: 13,
        ENTER: 13,
        ESC: 27,
        PAGEUP: 33,
        PAGEDOWN: 34,
        SPACE: 32,
        CTRL: 17,
        BACKSPACE: 8
    },
    eventExpand = 'EV' + Now(),
    eventUUID = 0,
    eventCache = {},
    eventDebugMode = false;


function addEvent(elem, types, handler, custom, context) {
    elem = ge(elem);
    if (!elem || elem.nodeType == 3 || elem.nodeType == 8) return;
    if (/mousewheel/.test(types)) {
        types = types + ' DOMMouseScroll';
    }
    if (/outclick/.test(types) || /outpress/.test(types)) {
        types = types.replace('outclick', 'mousedown');
        types = types.replace('outpress', 'keypress keydown');
        handler = eventOut.set(elem, handler);
        elem = document;
    }

    var realHandler = context ? function () {
        var newHandler = function (e) {
            var prevData = e.data;
            e.data = context;
            var ret = handler.apply(this, [e]);
            e.data = prevData;
            return ret;
        };
        newHandler.handler = handler;
        return newHandler;
    }() : handler;
    // For IE
    if (elem.setInterval && elem != window) elem = window;
    var events = data(elem, 'events') || data(elem, 'events', {}),
        handle = data(elem, 'handle') || data(elem, 'handle', function () {
            _eventHandle.apply(arguments.callee.elem, arguments);
        });
    // to prevent a memory leak
    handle.elem = elem;
    each(types.split(/\s+/), function (index, type) {
        if (!events[type]) {
            events[type] = [];
            if (!custom && elem.addEventListener) {
                elem.addEventListener(type, handle, false);
            } else if (!custom && elem.attachEvent) {
                elem.attachEvent('on' + type, handle);
            }
        }
        events[type].push(realHandler);
    });
    elem = null;
}

function removeEvent(elem, types, handler) {
    elem = ge(elem);
    if (!elem) return;
    if (/outclick/.test(types) || /outpress/.test(types)) {
        types = types.replace('outclick', 'mousedown');
        types = types.replace('outpress', 'keypress keydown');
        handler = eventOut.get(handler);
        eventOut.del(handler);
        elem = document;
    }
    var events = data(elem, 'events');
    if (!events) return;
    if (typeof (types) != 'string') {
        for (var i in events) {
            removeEvent(elem, i);
        }
        return;
    }
    if (/mousewheel/.test(types)) {
        types = types + ' DOMMouseScroll';
    }

    each(types.split(/\s+/), function (index, type) {
        if (!isArray(events[type])) return;
        var l = events[type].length;
        if (isFunction(handler)) {
            for (var i = l - 1; i >= 0; i--) {
                if (events[type][i] && (events[type][i] === handler || events[type][i].handler === handler)) {
                    events[type].splice(i, 1);
                    l--;
                    break;
                }
            }
        } else {
            for (var i = 0; i < l; i++) {
                delete events[type][i];
            }
            l = 0;
        }
        if (!l) {
            if (elem.removeEventListener) {
                elem.removeEventListener(type, data(elem, 'handle'), false);
            } else if (elem.detachEvent) {
                elem.detachEvent('on' + type, data(elem, 'handle'));
            }
            delete events[type];
        }
    });
    if (isEmpty(events)) {
        removeData(elem, 'events');
        removeData(elem, 'handle');
    }
}

function triggerEvent(elem, type, ev, now) {
    elem = ge(elem);
    var handle = data(elem, 'handle');
    if (handle) {
        var f = function () {
            handle.call(elem, extend((ev || {}), {
                type: type,
                target: elem
            }))
        };
        now ? f() : setTimeout(f, 0);
    }
}

function cancelEvent(event) {
    event = (event || window.event);
    if (!event) return false;
    while (event.originalEvent) {
        event = event.originalEvent;
    }
    if (event.preventDefault) event.preventDefault();
    if (event.stopPropagation) event.stopPropagation();
    event.cancelBubble = true;
    event.returnValue = false;
    return false;
}

function removeData(elem, name) {
    var id = elem ? elem[eventExpand] : false;
    if (!id) return;
    if (name) {
        if (eventCache[id]) {
            delete eventCache[id][name];
            name = '';
            var count = 0;
            for (name in eventCache[id]) {
                if (name !== '__elem') {
                    count++;
                    break;
                }
            }
            if (!count) {
                removeData(elem);
            }
        }
    } else {
        removeEvent(elem);
        removeAttr(elem, eventExpand);
        delete eventCache[id];
    }
}

function cleanElems() {
    var a = arguments;
    for (var i = 0; i < a.length; ++i) {
        var el = ge(a[i]);
        if (el) {
            removeData(el);
            removeAttr(el, 'btnevents');
        }
    }
}

function data(elem, name, data) {
    var id = elem[eventExpand],
        undefined;
    if (!id) {
        id = elem[eventExpand] = ++eventUUID;
    }
    if (data !== undefined) {
        if (!eventCache[id]) {
            eventCache[id] = {};
            if (eventDebugMode) eventCache[id].__elem = elem;
        }
        eventCache[id][name] = data;
    }
    return name ? eventCache[id] && eventCache[id][name] : id;
}

function removeAttr(el) {
    for (var i = 0, l = arguments.length; i < l; ++i) {
        var n = arguments[i];
        if (el[n] === undefined) continue;
        try {
            delete el[n];
        } catch (e) {
            try {
                el.removeAttribute(n);
            } catch (e) {}
        }
    }
}

function _eventHandle(event) {
    event = normEvent(event);
    var handlers = data(this, 'events');
    if (!handlers || typeof (event.type) != 'string' || !handlers[event.type] || !handlers[event.type].length) {
        return;
    }
    for (var i in (handlers[event.type] || [])) {
        if (event.type == 'mouseover' || event.type == 'mouseout') {
            var parent = event.relatedElement;
            while (parent && parent != this) {
                try {
                    parent = parent.parentNode;
                } catch (e) {
                    parent = this;
                }
            }
            if (parent == this) {
                continue
            }
        }
        var ret = handlers[event.type][i].apply(this, arguments);
        if (ret === false || ret === -1) {
            cancelEvent(event);
        }
        if (ret === -1) {
            return false;
        }
    }
}

function normEvent(event) {
    event = event || window.event;
    var originalEvent = event;
    event = clone(originalEvent);
    event.originalEvent = originalEvent;
    if (!event.target) {
        event.target = event.srcElement || document;
    }
    // check if target is a textnode (safari)
    if (event.target.nodeType == 3) {
        event.target = event.target.parentNode;
    }
    if (!event.relatedTarget && event.fromElement) {
        event.relatedTarget = event.fromElement == event.target;
    }
    if (event.pageX == null && event.clientX != null) {
        var doc = document.documentElement,
            body = bodyNode;
        event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc.clientLeft || 0);
        event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc.clientTop || 0);
    }
    if (!event.which && ((event.charCode || event.charCode === 0) ? event.charCode : event.keyCode)) {
        event.which = event.charCode || event.keyCode;
    }
    if (!event.metaKey && event.ctrlKey) {
        event.metaKey = event.ctrlKey;
    } else if (!event.ctrlKey && event.metaKey && browser.mac) {
        event.ctrlKey = event.metaKey;
    }
    // click: 1 == left; 2 == middle; 3 == right
    if (!event.which && event.button) {
        event.which = (event.button & 1 ? 1 : (event.button & 2 ? 3 : (event.button & 4 ? 2 : 0)));
    }

    if ((event.type==="mousewheel" || event.type==="wheel" || event.type==="DOMMouseScroll") && (event.wheelDelta || event.detail)) {
        event.wheelDelta = event.detail = ((event.wheelDelta) ? event.wheelDelta / 120 : event.detail / -3) > 0 ? 1 : -1;
    }

    return event;
}

function onCtrlEnter(event, handler) {
    event = event || window.event;
    if (event.keyCode == 10 || event.keyCode == 13 && (event.ctrlKey || event.metaKey && browser.mac)) {
        handler();
        cancelEvent(event);
    }
}

function press(e, code)
{
    return ((e.keyCode==KEY[code]));
}

function getTarget(e) {
    return e.srcElement || e.target;
}

var eventOut = {
    '_o': [],
    '_n': [],
    'get': function(handle){
        var i;
        for(i=0; i<this._o.length; i++){
            if(this._o[i] == handle){
                break;
            }
        }
        return this._n[i] ? this._n[i] : false;
    },
    'set': function(obj, handle){
        var _n_handle = this.prepare(obj, handle);
        this._o.push(handle);
        this._n.push(_n_handle);
        return _n_handle;
    },
    'del': function(handle){
        var i;
        for(i=0; i<this._n.length; i++){
            if(this._n[i] == handle){
                break;
            }
        }

        if(this._o[i])
            delete this._o[i];
        if(this._n[i])
            delete this._n[i];
    },
    'prepare': function(obj, handle){
        if (!isFunction(handle))
            return;
        return (function(e){
            var isChildOf = function (obj, target) {
                if (obj !== target) {
                    if (target.parentNode) {
                        isChildOf(obj, target.parentNode);
                    } else {
                        handle(e);
                    }
                }
            };
            isChildOf(obj, getTarget(e));
        });
    }
};
(function () {
    var isReady = false,
        readyBind = false,
        readyList = [];
    window.onDomReady = function (handle) {
        bindReady();
        if (isReady) {
            handle.call(document);
        } else {
            readyList.push(function () {
                handle.call(document);
            });
        }
    };
    var ready = function () {
        if (!isReady) {
            isReady = true;
            if (readyList) {
                var l = readyList;
                l.reverse();
                while (handle = l.pop()) {
                    handle.apply(document);
                }
                readyList = null;
            }
        }
    };
    var bindReady = function () {
        if (readyBind) return;
        readyBind = true;
        if (document.addEventListener && !browser.opera) document.addEventListener("DOMContentLoaded", ready, false);
        if (browser.msie && window == top)(function () {
            if (isReady) return;
            try {
                document.documentElement.doScroll("left");
            } catch (e) {
                setTimeout(arguments.callee, 0);
                return;
            }
            ready();
        })();
        if (browser.opera) document.addEventListener("DOMContentLoaded", function () {
            if (isReady) return;
            ready();
        }, false);
        if (browser.safari) {
            (function () {
                if (isReady) return;
                if (document.readyState != "loaded" && document.readyState != "complete") {
                    setTimeout(arguments.callee, 0);
                    return;
                }
                ready();
            })();
        }
        if (window.addEventListener) window.addEventListener('load', ready, false);
        else if (window.attachEvent) window.attachEvent('onload', ready);
    }
})();


onDomReady(function () {
    window.headNode = geByTag1('head');
    extend(window, {
        icoNode: geByTag1('link', headNode),
        bodyNode: geByTag1('body'),
        htmlNode: geByTag1('html')
    });
    if ('devicePixelRatio' in window && window.devicePixelRatio == 2) {
        addClass(bodyNode, 'is_2x');
    }
    if(!supportsSvg()){
        addClass(bodyNode, 'no_svg');
    }
    if(browser.chrome){
        addClass(bodyNode, 'ch');
    } else if (browser.mozilla){
        addClass(bodyNode, 'ff');
    } else if (browser.safari_mobile){
        addClass(bodyNode, 'sfm');
    } else if (browser.safari){
        addClass(bodyNode, 'sf');
    }
});

function supportsSvg() {
    try{
        return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Shape", "1.0");
    } catch(e){}
    return false;
}

function ge(el) {
    return (typeof el == 'string' || typeof el == 'number') ? document.getElementById(el) : el;
}

function geByClass(searchClass, node, tag) {
    node = node || document;
    tag = tag || '*';
    var classElements = [];
    if (!browser.msie8 && node.querySelectorAll && tag != '*') {
        return node.querySelectorAll(tag + '.' + searchClass);
    }
    if (node.getElementsByClassName) {
        var nodes = node.getElementsByClassName(searchClass);
        if (tag != '*') {
            tag = tag.toUpperCase();
            for (var i = 0, l = nodes.length; i < l; ++i) {
                if (nodes[i].tagName.toUpperCase() == tag) {
                    classElements.push(nodes[i]);
                }
            }
        } else {
            classElements = Array.prototype.slice.call(nodes);
        }
        return classElements;
    }
    var els = geByTag(tag, node);
    var pattern = new RegExp('(^|\\s)' + searchClass + '(\\s|$)');
    for (var i = 0, l = els.length; i < l; ++i) {
        if (pattern.test(els[i].className)) {
            classElements.push(els[i]);
        }
    }
    return classElements;
}

function geByClass1(searchClass, node, tag) {
    node = node || document;
    tag = tag || '*';
    return !browser.msie8 && node.querySelector && node.querySelector(tag + '.' + searchClass) || geByClass(searchClass, node, tag)[0];
}

function geByTag(searchTag, node) {
    return (node || document).getElementsByTagName(searchTag);
}

function geByTag1(searchTag, node) {
    node = node || document;
    return node.querySelector && node.querySelector(searchTag) || geByTag(searchTag, node)[0];
}

function ce(tagName, attr, style) {
    var el = document.createElement(tagName);
    if (attr) extend(el, attr);
    if (style) setStyle(el, style);
    return el;
}

function re(el) {
    el = ge(el);
    if (el && el.parentNode) el.parentNode.removeChild(el);
    return el;
}

function hasClass(obj, name) {
    obj = ge(obj);
    return obj && (new RegExp('(\\s|^)' + name + '(\\s|$)')).test(obj.className);
}

function addClass(obj, name) {
    if ((obj = ge(obj)) && !hasClass(obj, name)) {
        obj.className = (obj.className ? obj.className + ' ' : '') + name;
    }
}

function removeClass(obj, name) {
    if (obj = ge(obj)) {
        obj.className = trim((obj.className || '').replace((new RegExp('(\\s|^)' + name + '(\\s|$)')), ' '));
    }
}

function toggleClass(obj, name, v) {
    if (v === undefined) {
        v = !hasClass(obj, name);
    }
    (v ? addClass : removeClass)(obj, name);
}

function replaceClass(obj, oldName, newName) {
    removeClass(obj, oldName);
    addClass(obj, newName);
}

function getStyle(elem, name, force) {
    elem = ge(elem);
    if (isArray(name)) {
        var res = {};
        each(name, function (i, v) {
            res[v] = getStyle(elem, v);
        });
        return res;
    }
    if (force === undefined) {
        force = true;
    }
    if (!force && name == 'opacity' && browser.msie) {
        var filter = elem.style['filter'];
        return filter ? (filter.indexOf('opacity=') >= 0 ?
            (parseFloat(filter.match(/opacity=([^)]*)/)[1]) / 100) + '' : '1') : '';
    }
    if (!force && elem.style && (elem.style[name] || name == 'height')) {
        return elem.style[name];
    }
    var ret, defaultView = document.defaultView || window;
    if (defaultView.getComputedStyle) {
        name = name.replace(/([A-Z])/g, '-$1').toLowerCase();
        var computedStyle = defaultView.getComputedStyle(elem, null);
        if (computedStyle) {
            ret = computedStyle.getPropertyValue(name);
        }
    } else if (elem.currentStyle) {
        if (name == 'opacity' && browser.msie) {
            var filter = elem.currentStyle['filter'];
            return filter && filter.indexOf('opacity=') >= 0 ? (parseFloat(filter.match(/opacity=([^)]*)/)[1]) / 100) + '' : '1';
        }
        var camelCase = name.replace(/\-(\w)/g, function (all, letter) {
            return letter.toUpperCase();
        });
        ret = elem.currentStyle[name] || elem.currentStyle[camelCase];
        //dummy fix for ie
        if (ret == 'auto') {
            ret = 0;
        }
        if (!/^\d+(px)?$/i.test(ret) && /^\d/.test(ret)) {
            var style = elem.style,
                left = style.left,
                rsLeft = elem.runtimeStyle.left;
            elem.runtimeStyle.left = elem.currentStyle.left;
            style.left = ret || 0;
            ret = style.pixelLeft + 'px';
            style.left = left;
            elem.runtimeStyle.left = rsLeft;
        }
    }
    if (force && (name == 'width' || name == 'height')) {
        var ret2 = getSize(elem, true)[({
            'width': 0,
            'height': 1
        })[name]];
        ret = (intval(ret) ? Math.max(floatval(ret), ret2) : ret2) + 'px';
    }
    return ret;
}

function setStyle(elem, name, value) {
    elem = ge(elem);
    if (!elem) return;
    if (typeof name == 'object') return each(name, function (k, v) {
        setStyle(elem, k, v);
    });
    if (name == 'opacity') {
        if (browser.msie) {
            if ((value + '').length) {
                if (value !== 1) {
                    elem.style.filter = 'alpha(opacity=' + value * 100 + ')';
                } else {
                    elem.style.filter = '';
                }
            } else {
                elem.style.cssText = elem.style.cssText.replace(/filter\s*:[^;]*/gi, '');
            }
            elem.style.zoom = 1;
        }
        elem.style.opacity = value;
    } else {
        try {
            var isN = typeof (value) == 'number';
            if (isN && (/height|width/i).test(name)) value = Math.abs(value);
            elem.style[name] = isN && !(/z-?index|font-?weight|opacity|zoom|line-?height/i).test(name) ? value + 'px' : value;
        } catch (e) {
            console.log([name, value]);
        }
    }
}

function str2hash(str){
    var hash = 5381;
    for (var i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) + str.charCodeAt(i); /* hash * 33 + c */
    }
    return hash;
}

function str2color(str) {
    var hash = str2hash(str);
    var r = (hash & 0xFF0000) >> 16;
    var g = (hash & 0x00FF00) >> 8;
    var b = hash & 0x0000FF;
    return "#" + ("0" + r.toString(16)).substr(-2) + ("0" + g.toString(16)).substr(-2) + ("0" + b.toString(16)).substr(-2);
}

function getRGB(color) {
    var result;
    if (color && isArray(color) && color.length == 3) return color;
    if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color)) return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];
    if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color)) return [parseFloat(result[1]) * 2.55, parseFloat(result[2]) * 2.55, parseFloat(result[3]) * 2.55];
    if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color)) return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
    if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color)) return [parseInt(result[1] + result[1], 16), parseInt(result[2] + result[2], 16), parseInt(result[3] + result[3], 16)];
}

function getColor(elem, attr) {
    var color;
    do {
        color = getStyle(elem, attr);
        if (color != '' && color != 'transparent' || elem.nodeName.toLowerCase() == "body") break;
        attr = "backgroundColor";
    } while (elem = elem.parentNode);
    return getRGB(color);
}

function animate(el, params, speed, callback) {
    el = ge(el);
    if (!el) return;
    var _cb = isFunction(callback) ? callback : function () {};
    var options = extend({}, typeof speed == 'object' ? speed : {
        duration: speed,
        onComplete: _cb
    });
    var fromArr = {}, toArr = {}, visible = isVisible(el),
        self = this,
        p;
    options.orig = {};
    params = clone(params);
    if (params.discrete) {
        options.discrete = 1;
        delete(params.discrete);
    }
    if (browser.iphone) options.duration = 0;
    var tween = data(el, 'tween'),
        i, name, toggleAct = visible ? 'hide' : 'show';
    if (tween && tween.isTweening) {
        options.orig = extend(options.orig, tween.options.orig);
        tween.stop(false);
        if (tween.options.show) toggleAct = 'hide';
        else if (tween.options.hide) toggleAct = 'show';
    }
    for (p in params) {
        if (!tween && (params[p] == 'show' && visible || params[p] == 'hide' && !visible)) {
            return options.onComplete.call(this, el);
        }
        if ((p == 'height' || p == 'width') && el.style) {
            if (!params.overflow) {
                if (options.orig.overflow == undefined) {
                    options.orig.overflow = getStyle(el, 'overflow');
                }
                el.style.overflow = 'hidden';
            }
            if (!hasClass(el, 'inl_bl') && el.tagName != 'TD') {
                el.style.display = 'block';
            }
        }
        if (/show|hide|toggle/.test(params[p])) {
            if (params[p] == 'toggle') {
                params[p] = toggleAct;
            }
            if (params[p] == 'show') {
                var from = 0;
                options.show = true;
                if (options.orig[p] == undefined) {
                    options.orig[p] = getStyle(el, p, false) || '';
                    setStyle(el, p, 0);
                }
                var o;
                if (p == 'height' && browser.msie6) {
                    o = '0px';
                    el.style.overflow = '';
                } else {
                    o = options.orig[p];
                }
                var old = el.style[p];
                el.style[p] = o;
                params[p] = parseFloat(getStyle(el, p, true));
                el.style[p] = old;
                if (p == 'height' && browser.msie && !params.overflow) {
                    el.style.overflow = 'hidden';
                }
            } else {
                if (options.orig[p] == undefined) {
                    options.orig[p] = getStyle(el, p, false) || '';
                }
                options.hide = true;
                params[p] = 0;
            }
        }
    }
    if (options.show && !visible) {
        show(el);
    }
    tween = new Fx.Base(el, options);
    each(params, function (name, to) {
        if (/backgroundColor|borderBottomColor|borderLeftColor|borderRightColor|borderTopColor|color|borderColor|outlineColor/.test(name)) {
            var p = (name == 'borderColor') ? 'borderTopColor' : name;
            from = getColor(el, p);
            to = getRGB(to);
        } else {
            var parts = to.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),
                start = tween.cur(name, true) || 0;
            if (parts) {
                to = parseFloat(parts[2]);
                if (parts[1]) {
                    to = ((parts[1] == '-=' ? -1 : 1) * to) + to;
                }
            }
            if (options.hide && name == 'height' && browser.msie6) {
                el.style.height = '0px';
                el.style.overflow = '';
            }
            from = tween.cur(name, true);
            if (options.hide && name == 'height' && browser.msie6) {
                el.style.height = '';
                el.style.overflow = 'hidden';
            }
            if (from == 0 && (name == 'width' || name == 'height')) from = 1;
            if (name == 'opacity' && to > 0 && !visible) {
                setStyle(el, 'opacity', 0);
                from = 0;
                show(el);
            }
        }
        if (from != to || (isArray(from) && from.join(',') == to.join(','))) {
            fromArr[name] = from;
            toArr[name] = to;
        }
    });
    tween.start(fromArr, toArr);
    data(el, 'tween', tween);
    return tween;
}

function fadeTo(el, speed, to, callback) {
    return animate(el, {
        opacity: to
    }, speed, callback);
}
var Fx = {
    Transitions: {
        linear: function(t, b, c, d) { return c*t/d + b; },
        sineInOut: function(t, b, c, d) { return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b; },
        halfSine: function(t, b, c, d) { return c * (Math.sin(Math.PI * (t/d) / 2)) + b; },
        easeOutBack: function(t, b, c, d) { var s = 1.70158; return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b; },
        easeInCirc: function(t, b, c, d) { return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b; },
        easeOutCirc: function(t, b, c, d) { return c * Math.sqrt(1 - (t=t/d-1)*t) + b; },
        easeInQuint: function(t, b, c, d) { return c*(t/=d)*t*t*t*t + b; },
        easeOutQuint: function(t, b, c, d) { return c*((t=t/d-1)*t*t*t*t + 1) + b; },
        easeOutCubic: function(t, b, c, d) { return c*((t=t/d-1)*t*t + 1) + b;},
        swiftOut: function(t, b, c, d) { return c * cubicBezier(0.4, 0, 0.22, 1, t/d, 4/d) + b; }
    },
    Attrs: [
        [ 'height', 'marginTop', 'marginBottom', 'paddingTop', 'paddingBottom' ],
        [ 'width', 'marginLeft', 'marginRight', 'paddingLeft', 'paddingRight' ],
        [ 'opacity', 'left', 'top' ]
    ],
    Timers: [],
    TimerId: null
}, fx = Fx;
Fx.Base = function (el, options, name) {
    this.el = ge(el);
    this.name = name;
    this.options = extend({
        onComplete: function () {},
        transition: Fx.Transitions.sineInOut,
        duration: 500
    }, options || {});
};

function genFx(type, num) {
    var obj = {};
    each(Fx.Attrs.concat.apply([], Fx.Attrs.slice(0, num)), function () {
        obj[this] = type;
    });
    return obj;
}
// Shortcuts for custom animations
each({
    slideDown: genFx('show', 1),
    slideUp: genFx('hide', 1),
    slideToggle: genFx('toggle', 1),
    fadeIn: {
        opacity: 'show'
    },
    fadeOut: {
        opacity: 'hide'
    },
    fadeToggle: {
        opacity: 'toggle'
    }
}, function (f, val) {
    window[f] = function (el, speed, callback) {
        return animate(el, val, speed, callback);
    }
});
Fx.Base.prototype = {
    start: function (from, to) {
        this.from = from;
        this.to = to;
        this.time = Now();
        this.isTweening = true;
        var self = this;

        function t(gotoEnd) {
            return self.step(gotoEnd);
        }
        t.el = this.el;
        if (t() && Fx.Timers.push(t) && !Fx.TimerId) {
            Fx.TimerId = setInterval(function () {
                var timers = Fx.Timers;
                for (var i = 0; i < timers.length; i++)
                    if (!timers[i]()) timers.splice(i--, 1);
                if (!timers.length) {
                    clearInterval(Fx.TimerId);
                    Fx.TimerId = null;
                }
            }, 13);
        }
        return this;
    },
    stop: function (gotoEnd) {
        var timers = Fx.Timers;
        // go in reverse order so anything added to the queue during the loop is ignored
        for (var i = timers.length - 1; i >= 0; i--)
            if (timers[i].el == this.el) {
                if (gotoEnd)
                // force the next step to be the last
                    timers[i](true);
                timers.splice(i, 1);
            }
        this.isTweening = false;
    },
    step: function (gotoEnd) {
        var time = Now();
        if (!gotoEnd && time < this.time + this.options.duration) {
            this.cTime = time - this.time;
            this.now = {};
            for (p in this.to) {
                // color fx
                if (isArray(this.to[p])) {
                    var color = [],
                        j;
                    for (j = 0; j < 3; j++)
                        color.push(Math.min(parseInt(this.compute(this.from[p][j], this.to[p][j])), 255));
                    this.now[p] = color;
                } else this.now[p] = this.compute(this.from[p], this.to[p]);
            }
            this.update();
            return true;
        } else {
            //      if (this.el.className == 'im_tab3') alert('this.time: ' + this.time + ', ' + (time - this.time) + ' > ' + this.options.duration);
            setTimeout(this.options.onComplete.bind(this, this.el), 10);
            this.now = extend(this.to, this.options.orig);
            this.update();
            if (this.options.hide) hide(this.el);
            this.isTweening = false;
            return false;
        }
    },
    compute: function (from, to) {
        var change = to - from;
        return this.options.transition(this.cTime, from, change, this.options.duration);
    },
    update: function () {
        for (var p in this.now) {
            if (isArray(this.now[p])) setStyle(this.el, p, 'rgb(' + this.now[p].join(',') + ')');
            else this.el[p] != undefined ? (this.el[p] = this.now[p]) : setStyle(this.el, p, this.now[p]);
        }
    },
    cur: function (name, force) {
        if (this.el[name] != null && (!this.el.style || this.el.style[name] == null)) return this.el[name];
        return parseFloat(getStyle(this.el, name, force)) || 0;
    }
};

function getXY(obj) {
    obj = ge(obj);
    if (!obj) return [0, 0];
    var left = 0,
        top = 0,
        pos, lastLeft;
    if (obj.offsetParent) {
        do {
            left += (lastLeft = obj.offsetLeft);
            top += obj.offsetTop;
            pos = getStyle(obj, 'position');
            if (pos == 'fixed' || pos == 'absolute' || (pos == 'relative')) {
                left -= obj.scrollLeft;
                top -= obj.scrollTop;
                if (pos == 'fixed') {
                    left += ((obj.offsetParent || {}).scrollLeft || document.body.scrollLeft || document.documentElement.scrollLeft);
                    top += ((obj.offsetParent || {}).scrollTop || document.body.scrollTop || document.documentElement.scrollTop);
                }
            }
        } while (obj = obj.offsetParent);
    }
    return [left, top];
}

function getSize(elem, withoutBounds) {
    elem = ge(elem);
    var s = [0, 0],
        de = document.documentElement;
    if (elem == document) {
        s = [Math.max(
            de.clientWidth,
            bodyNode.scrollWidth, de.scrollWidth,
            bodyNode.offsetWidth, de.offsetWidth), Math.max(
            de.clientHeight,
            bodyNode.scrollHeight, de.scrollHeight,
            bodyNode.offsetHeight, de.offsetHeight)];
    } else if (elem) {
        function getWH() {
            s = [elem.offsetWidth, elem.offsetHeight];
            if (!withoutBounds) return;
            var padding = 0,
                border = 0;
            each(s, function (i, v) {
                var which = i ? ['Top', 'Bottom'] : ['Left', 'Right'];
                each(which, function () {
                    s[i] -= parseFloat(getStyle(elem, 'padding' + this)) || 0;
                    s[i] -= parseFloat(getStyle(elem, 'border' + this + 'Width')) || 0;
                });
            });
            s = [Math.round(s[0]), Math.round(s[1])];
        }
        if (!isVisible(elem)) {
            var props = {
                position: 'absolute',
                visibility: 'hidden',
                display: 'block'
            };
            var old = {};
            each(props, function (i, v) {
                old[i] = elem.style[i];
                elem.style[i] = v;
            });
            getWH();
            each(props, function (i, v) {
                elem.style[i] = old[i];
            });
        } else getWH();
    }
    return s;
}

function getPosition(e) {
    var left = 0;
    var top = 0;
    while (e.offsetParent) {
        left += e.offsetLeft;
        top += e.offsetTop;
        e = e.offsetParent;
    }
    left += e.offsetLeft;
    top += e.offsetTop;
    return [left, top];
}

function getMouseOffset(e, target) {
    var docPos = getPosition(target || e.target);
    return [e.pageX - docPos[0], e.pageY - docPos[1]];
}

function elfocus(el, from, to) {
    el = ge(el);
    try {
        el.focus();
        if (from === undefined || from === false) from = el.value.length;
        if (to === undefined || to === false) to = from;
        if (el.createTextRange) {
            var range = el.createTextRange();
            range.collapse(true);
            range.moveEnd('character', to);
            range.moveStart('character', from);
            range.select();
        } else if (el.setSelectionRange) {
            el.setSelectionRange(from, to);
        }
    } catch (e) {}
}

function scrollGetY() {
    return intval(window.pageYOffset) || document.documentElement.scrollTop;
}

function scrollGetX() {
    return window.pageXOffset || document.documentElement.scrollLeft;
}


function getScroll() {
    var b = document.body,
        de = document.documentElement;
    return [
        b.scrollLeft || de.scrollLeft || window.pageXOffset || 0,
        b.scrollTop || de.scrollTop || window.pageYOffset || 0,
        de.clientWidth || b.clientWidth || 0,
        de.clientHeight || b.clientHeight || 0
    ];
}

function windowSize() {
    return [windowWidth(), windowHeight()];
}

function windowHeight() {
    return window.innerHeight ? window.innerHeight : (document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.offsetHeight);
}

function windowWidth() {
    return window.innerWidth ? window.innerWidth : (document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.offsetWidth);
}

function show(elem) {
    if (arguments.length > 1) {
        for (var i = 0, l = arguments.length; i < l; ++i) {
            show(arguments[i]);
        }
        return;
    }
    elem = ge(elem);
    if (!elem || !elem.style) return;
    var old = elem.olddisplay,
        newStyle = 'block',
        tag = elem.tagName.toLowerCase();
    elem.style.display = old || '';
    if (getStyle(elem, 'display') == 'none') {
        if (hasClass(elem, 'inline')) {
            newStyle = 'inline';
        } else if (tag == 'tr' && !browser.msie) {
            newStyle = 'table-row';
        } else if (tag == 'table' && !browser.msie) {
            newStyle = 'table';
        } else {
            newStyle = 'block';
        }
        elem.style.display = elem.olddisplay = newStyle;
    }
}

function hide(elem) {
    var l = arguments.length;
    if (l > 1) {
        for (var i = 0; i < l; i++) {
            hide(arguments[i]);
        }
        return;
    }
    elem = ge(elem);
    if (!elem || !elem.style) return;
    var d = getStyle(elem, 'display');
    elem.olddisplay = (d != 'none') ? d : '';
    elem.style.display = 'none';
}

function isVisible(elem) {
    elem = ge(elem);
    if (!elem || !elem.style) return false;
    return getStyle(elem, 'display') != 'none';
}

function toggle(elem, v) {
    if (v === undefined) {
        v = !isVisible(elem);
    }
    if (v) {
        show(elem);
    } else {
        hide(elem);
    }
}

function placeholderSetup(id) {
    var el = ge(id);
    if (!el) return;
    if (browser.opera && browser.mobile) {
        el.getValue = function () {
            return el.value;
        };
        el.setValue = function (v) {
            el.value = v;
        };
        return;
    }
    var ph = el.getAttribute("placeholder");
    if (!el['phevents'] && ph && ph != "") {
        el['active'] = 1;
        if ((!el.value || el.value == ph) && !el.focused) {
            el.style.color = '#777';
            el.value = ph;
            el['active'] = 0;
        }
        addEvent(el, 'focus', function () {
            if (el['active']) return;
            el['active'] = 1;
            el.value = '';
            el.style.color = '#000';
        });
        addEvent(el, 'blur', function () {
            if (!el['active'] || !ph || el.value != "") return;
            el['active'] = 0;
            el.style.color = '#777';
            el.value = ph;
        });
        el.getValue = function () {
            return (el['active'] || el.value != ph) ? el.value : '';
        };
        el.setValue = function (val) {
            el.active = val ? 1 : 0;
            el.value = val ? val : ph;
            el.style.color = val ? '#000' : '#777';
        };
        el['phevents'] = 1;
    }
}

function boxRefreshCoords(cont, center) {
    var wsize = windowSize(),
        top = scrollGetY(),
        containerSize = getSize(cont);
    cont.style.top = Math.max(0, top + (wsize[1] - containerSize[1]) / 3) + 'px';
    if (center) cont.style.left = Math.max(0, (wsize[0] - containerSize[0]) / 2) + 'px';
}

function BGLayer() {
    if (!ge('popupTransparentBG')) {
        window.transparentBG = ce('div', {
            id: 'popupTransparentBG',
            className: 'popup_transparent_bg'
        }, {
            display: 'none',
            height: getSize(document)[1]
        });
        addEvent(window, 'resize', function () {
            transparentBG.style.height = getSize(document)[1] + 'px';
        });
        onDomReady(function () {
            bodyNode.appendChild(transparentBG);
        });
    }
}

function sbWidth() {
    return 16;
}

function notaBene(el, color, nofocus) {
    el = ge(el);
    if (!el) return;

    if (!nofocus) elfocus(el);
    if (data(el, 'backstyle') === undefined) data(el, 'backstyle', el.style.backgroundColor || '');
    var oldBack = data(el, 'back') || data(el, 'back', getStyle(el, 'backgroundColor'));
    var colors = {notice: '#FFFFE0', warning: '#FAEAEA'};
    setStyle(el, 'backgroundColor', colors[color] || color || colors.warning);
    setTimeout(animate.pbind(el, {backgroundColor: oldBack}, 300, function() {
        el.style.backgroundColor = data(el, 'backstyle');
    }), 400);
}

function doGetCaretPosition (el) {
    el = ge(el);
    var pos = 0;
    if (document.selection)
    {
        el.focus();
        var Sel = document.selection.createRange();
        Sel.moveStart('character', -el.value.length);
        pos = Sel.text.length;
    }
    else if (el.selectionStart || el.selectionStart == '0') pos = el.selectionStart;
    return pos;
}

function setCaretPosition(el, pos)
{
    el = ge(el);
    if(el.setSelectionRange)
    {
        el.focus();
        el.setSelectionRange(pos,pos);
    }
    else if (el.createTextRange) {
        var range = el.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
    return true;
}

function se(html) {return ce('div', {innerHTML: html}).firstChild;}
function rs(html, repl) {
    each (repl, function(k, v) {
        html = html.replace(new RegExp('%' + k + '%', 'g'), v);
    });
    return html;
}

function val(input, value, nofire) {
    input = ge(input);
    if (!input) return;

    if (value !== undefined) {
        if (input.setValue) {
            input.setValue(value);
            !nofire && input.phonblur && input.phonblur();
        } else if (input.tagName == 'INPUT' || input.tagName == 'TEXTAREA') {
            input.value = value
        } else {
            input.innerHTML = value
        }
    }
    return input.getValue ? input.getValue() :
        (((input.tagName == 'INPUT' || input.tagName == 'TEXTAREA') ? input.value : input.innerHTML) || '');
}

function domEL(el, p) {
    p = p ? 'previousSibling' : 'nextSibling';
    while (el && !el.tagName) el = el[p];
    return el;
}
function domNS(el) {
    return domEL((el || {}).nextSibling);
}
function domPS(el) {
    return domEL((el || {}).previousSibling, 1);
}
function domFC(el) {
    return domEL((el || {}).firstChild);
}
function domLC(el) {
    return domEL((el || {}).lastChild, 1);
}
function domPN(el) {
    return (el || {}).parentNode;
}

function onMousePast(ovner, onHide){
    var past = {
        obj:ge(ovner),
        test: function(obj){
            if(obj!==past.obj){
                if(obj.parentNode) {
                    past.test(obj.parentNode);
                } else {
                    if(isFunction(onHide)) onHide();
                    past.hide();
                }
            }
        },
        detect: function(e){
            past.test(e.target);
        },
        show: function(){
            addEvent(document, 'keypress keydown mousedown', past.detect);
        },
        hide: function(){
            removeEvent(document, 'keypress keydown mousedown', past.detect);
        }
    };
    return past;
}

function scrollToY(y, speed, anim) {
    if (speed == undefined) speed = 400;

    var isTouchDevice = ('ontouchstart' in document.documentElement);
    if (isTouchDevice) {
        speed = 0;
    }

    if (browser.msie6) {
        if (data(bodyNode, 'tween')) data(bodyNode, 'tween').stop(false);
    } else {
        if (data(bodyNode, 'tween')) data(bodyNode, 'tween').stop(false);
        if (data(htmlNode, 'tween')) data(htmlNode, 'tween').stop(false);
    }
    window.scrollAnimation = false;
    if (speed) {
        var updT = function() {
            window.scrollAnimation = false;
        };
        window.scrollAnimation = true;
        if (browser.msie6) {
            animate(bodyNode, {scrollTop: y}, speed, updT);
        } else {
            animate(htmlNode, {scrollTop: y, transition: Fx.Transitions.easeInCirc}, speed, updT);
            animate(bodyNode, {scrollTop: y, transition: Fx.Transitions.easeInCirc}, speed, updT);
        }
    } else {
        if (anim && anim !== 2) {
            var diff = scrollGetY() - y;
            if (Math.abs(diff) > 6) {
                scrollToY(y+(diff > 0 ? 6 : -6), 0, 2);
            }
            clearTimeout(window.scrlToTO);
            window.scrlToTO = setTimeout(scrollToY.pbind(y, 100, 2), 0);
            return;
        }
        window.scroll(scrollGetX(), y);
        if (browser.msie6) {
            bodyNode.scrollTop = y;
        }
    }
}

function scrollToTop(speed) {
    return scrollToY(0, speed);
}
var ajax = {
    badbrowser: '/badbrowser.php',
    isFormDataSupport: (window.FormData !== undefined),
    _init: function () {

        var r = false;
        try {
            if (r = new XMLHttpRequest()) {
                ajax._req = function () {
                    return new XMLHttpRequest();
                };
                return;
            }
        } catch (e) {
        }
        each(['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP'], function () {
            try {
                var t = '' + this;
                if (r = new ActiveXObject(t)) {
                    (function (n) {
                        ajax._req = function () {
                            return new ActiveXObject(n);
                        }
                    })(t);
                    return false;
                }
            } catch (e) {
            }
        });
        if (!ajax._req && !browser.search_bot) {
            location.replace(ajax.badbrowser);
        }
    },
    _getreq: function () {
        if (!ajax._req) ajax._init();
        return ajax._req();
    },
    _post: function (url, query, callback, urlonly) {
        var r = ajax._getreq();
        r.onreadystatechange = function () {
            if (r.readyState == 4) {
                var is_fail = !(r.status >= 200 && r.status < 300);
                if (callback) callback(r.responseText, is_fail, r);
            }
        };
        try {
            r.open('POST', url, true);
        } catch (e) {
            return false;
        }
        if (!urlonly) {
            r.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            r.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        }
        r.send(query);
        return r;
    },
    _get: function (url, callback) {
        var r = ajax._getreq();
        r.onreadystatechange = function () {
            if (r.readyState == 4) {
                var is_fail = !(r.status >= 200 && r.status < 300);
                if (callback) callback(r.responseText, is_fail, r);
            }
        };
        try {
            r.open('GET', url, true);
        } catch (e) {
            return false;
        }
        r.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        r.send('');
        return r;
    },
    plainpost: function (url, query, callback, urlonly) {
        var q = (typeof(query) != 'string') ? ajx2q(query) : query;
        return ajax._post(url, query, callback, urlonly);
    },
    post: function (url, query, callback) {
        var urlonly = false, q = query,
            done = function (res, fail, req) {

                var json = parseJSON(res);

                if (!json || fail) {
                    res = {"error": true, "message": "global-error", "traceback": res};
                    fail = true;
                } else {
                    res = json;
                }

                if (callback) callback(res, fail, req);
            };

        if (typeof (query) != 'string') {
            urlonly = ajax.checkDataFile(query);
            q = urlonly ? ajax.createFormData(query) : ajx2q(query);
        }

        return ajax._post(url, q, done, urlonly);
    },
    get: function (url, query, callback) {
        var q = (typeof (query) != 'string') ? ajx2q(query) : query;
        if (q) {
            url += ~url.indexOf('?') ? '&' : '?';
            url += q;
        }

        return ajax._get(url, callback);
    },
    parseRes: function (r) {
        var res = r.replace(/^[\s\n]+/g, '');
        if (res.substr(0, 10) == "<noscript>") {
            try {
                var arr = res.substr(10).split("</noscript>");
                eval(arr[0]);
                return arr[1];
            } catch (e) {
                console.log('eval ajax script:' + e.message);
            }
        }
        return r;
    },
    isInput: function (obj) {
        return Object.prototype.toString.call(obj) === '[object HTMLInputElement]';
    },
    checkDataFile: function (obj) {
        if (!isObject(obj) || !ajax.isFormDataSupport) return false;
        for (var i in obj) {
            if (ajax.isInput(obj[i]) && 'files' in obj[i] && obj[i].files.length > 0) {
                return true;
            }
        }
        return false;
    },
    createFormData: function (obj) {
        var formData = new FormData();

        for (var i in obj) {
            if (ajax.isInput(obj[i]) && 'files' in obj[i] && obj[i].files.length > 0) {
                formData.append(i, obj[i].files[0]);
            } else {
                formData.append(i, obj[i]);
            }
        }

        return formData;
    }
};


function ajx2q(qa) {
    var query = [],
        enc = function (str) {
            if (window._decodeEr && _decodeEr[str]) {
                return str;
            }
            try {
                return encodeURIComponent(str);
            } catch (e) {
                return str;
            }
        };
    for (var key in qa) {
        if (qa[key] == null || isFunction(qa[key])) continue;
        if (isArray(qa[key])) {
            for (var i = 0, c = 0, l = qa[key].length; i < l; ++i) {
                if (qa[key][i] == null || isFunction(qa[key][i])) {
                    continue;
                }
                query.push(enc(key) + '[' + c + ']=' + enc(qa[key][i]));
                ++c;
            }
        } else {
            query.push(enc(key) + '=' + enc(qa[key]));
        }
    }
    query.sort();
    return query.join('&');
}

function q2ajx(qa) {
    if (!qa) return {};
    var query = {}, dec = function (str) {
        try {
            return decodeURIComponent(str);
        } catch (e) {
            window._decodeEr = window._decodeEr || {};
            _decodeEr[str] = 1;
            return str;
        }
    };
    qa = qa.split('&');
    each(qa, function (i, a) {
        var t = a.split('=');
        if (t[0]) {
            var v = dec(t[1] + '');
            if (t[0].substr(t.length - 2) == '[]') {
                var k = dec(t[0].substr(0, t.length - 2));
                if (!query[k]) {
                    query[k] = [];
                }
                query[k].push(v);
            } else {
                query[dec(t[0])] = v;
            }
        }
    });
    return query;
}

var JsonpCallbackRegister = {};
function Jsonp(url, data, options) {
    var onSuccess,
        onFail,
        q = (typeof (data) != 'string') ? ajx2q(data) : data,
        scriptOk = false,
        callbackName = 'f' + String(Math.random()).slice(2);
    if (!options) options = {};
    if (isFunction(options)) {
        onSuccess = options;
    } else {
        onSuccess = options.onSuccess;
        onFail = options.onFail;
    }
    url += ~url.indexOf('?') ? '&' : '?';
    url += 'callback=JsonpCallbackRegister.' + callbackName;
    url += '&' + q;

    JsonpCallbackRegister[callbackName] = function (response) {
        scriptOk = true;
        delete JsonpCallbackRegister[callbackName];
        onSuccess(response);
    };

    function checkCallback() {
        if (scriptOk) return;
        delete JsonpCallbackRegister[callbackName];
        onFail(url);
    }

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.setAttribute('encoding', 'UTF-8');
    script.onreadystatechange = function () {
        if (this.readyState == 'complete' || this.readyState == 'loaded') {
            this.onreadystatechange = null;
            setTimeout(checkCallback, 0);
        }
    };
    script.onload = script.onerror = checkCallback;
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

if (!lang) var lang = {};

lang['global-yes'] = 'Да';
lang['global-no'] = 'Нет';
lang['global-search'] = 'Поиск';
lang['global-save'] = 'Сохранить';
lang['global-close'] = 'Закрыть';
lang['global-loading'] = 'Загрузка';

lang['qsearch-popular-hints'] = 'Страницы, которые Вы недавно посещали:';
lang['qsearch-no-search-result'] = 'Поиск не дал результатов';
lang['qsearch-connectiong-error'] = 'Ошибка соединения с сервером';

lang['text_exceeds_symbol_limit'] = ['', 'Допустимый объем превышен на %s знак.', 'Допустимый объем превышен на %s знака.', 'Допустимый объем превышен на %s знаков.'];
lang['text_N_symbols_remain'] = ['', 'Остался %s знак.', 'Осталось %s знака.', 'Осталось %s знаков.'];

function langNumeric(count, vars, formatNum) {
    if (!vars) {
        return count;
    }
    var res;
    if (!isArray(vars)) {
        res = vars;
    } else {
        res = vars[1];
        if (count != Math.floor(count)) {
            res = vars[2];
        } else {
            each([[100, [11, 12, 13, 14], 3], [10, [1], 1], [10, [2, 3, 4], 2], ["*", 0, 3]], function (i, v) {
                if (v[0] == '*') {
                    res = vars[v[2]];
                    return false;
                }
                var c = v[0] ? count % v[0] : count;
                if (indexOf(v[1], c) != -1) {
                    res = vars[v[2]];
                    return false;
                }
            });
        }
    }
    if (formatNum) {
        var n = count.toString().split('.'), c = [];
        for (var i = n[0].length - 3; i > -3; i -= 3) {
            c.unshift(n[0].slice(i > 0 ? i : 0, i + 3));
        }
        n[0] = c.join(langConfig.numDel);
        count = n.join(langConfig.numDec);
    }
    res = (res || '%s').replace('%s', count);
    return res;
}

function langSex(sex, vars) {
    if (!isArray(vars)) return vars;
    var res = vars[1];
    each([[1, 2], ["*", 1]], function (i, v) {
        if (v[0] == '*') {
            res = vars[v[1]];
            return false;
        }
        if (sex == v[0] && vars[v[1]]) {
            res = vars[v[1]];
            return false;
        }
    });
    return res;
}

function langKeyNotFound(key) {
    console.log(key);
}

function getLang() {
    try {
        var args = Array.prototype.slice.call(arguments);
        var key = args.shift();
        if (!key) return '...';
        var val = (window.lang && window.lang[key]) || (window.langpack && window.langpack[key]) || window[key];
        if (!val) {
            langKeyNotFound(key);
            return key.split('-').join(' ');
        }
        if (isFunction(val)) {
            return val.apply(null, args);
        } else if (args[0] !== undefined || isArray(val)) {
            return langNumeric(args[0], val, args[1]);
        } else {
            return val;
        }
    } catch (e) {
        debugLog('lang error:' + e.message + '(' + Array.prototype.slice.call(arguments).join(', ') + ')');
    }
}

function writeLang(key) {
    if (!key) {
        return document.write('...');
    }
    var val = (window.lang && window.lang[key]) || (window.langpack && window.langpack[key]) || window[key];
    if (!val) {
        var res = key.split('-');
        //res.shift();
        return document.write('≠' + res.join(' '));
    }
    return document.write(val);
}

function parseLatin(text, back) {
    var outtext = text, i;
    var lat1 = ["y", "yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"];
    var rus1 = ["ий", "ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"];
    for (i = 0; i < lat1.length; i++) {
        if (back) {
            outtext = outtext.split(rus1[i]).join(lat1[i]);
        } else {
            outtext = outtext.split(lat1[i]).join(rus1[i]);
        }
    }
    var lat2 = "abvgdeziyklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCY" + "ёЁ";
    var rus2 = "абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫ" + "еЕ";
    for (i = 0; i < lat2.length; i++) {
        if (back) {
            outtext = outtext.split(rus2.charAt(i)).join(lat2.charAt(i));
        } else {
            outtext = outtext.split(lat2.charAt(i)).join(rus2.charAt(i));
        }
    }
    if (!back) return text;
    return (outtext == text) ? text : outtext;
}

function highlight(b, e) {
    b = b + '';
    e = e + '';
    if (e == '') return b;
    b = e.indexOf(" ") == -1 ? b.split(" ") : [b];
    var d = "";
    var a = parseLatin(e);
    if (a !== null) {
        e = escapeRE(e) + "|" + escapeRE(a);
    }
    var f = new RegExp("(?![^&;]+;)(?!<[^<>]*)((\\(*)(" + e + "))(?![^<>]*>)(?![^&;]+;)", "gi");
    for (var c in b) {
        d += (c > 0 ? " " : "") + b[c].replace(f, "$2<em>$3</em>")
    }
    return d;
}
var cookies = {
    cookies: null,
    set: function (name, value, days) {
        if (!this.cookies) this.init();
        this.cookies[name] = value;
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        } else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    },
    get: function (name) {
        if (!this.cookies) this.init();
        return this.cookies[name];
    },
    init: function () {
        this.cookies = {};
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].split("=");
            if (c.length == 2) this.cookies[c[0].match(/^[\s]*([^\s]+?)$/i)[1]] = c[1].match(/^[\s]*([^\s]+?)$/i)[1];
        }
    }
};
function inherit(child, parent) {
    var F = function () {
    };
    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
    child.superclass = parent.prototype;
}

function createChildClass(className, parent, proto) {
    var code = 'function ' + className + ' (a, b, c, d) {\
    if (this == window || this.setInterval) return new ' + className + '(a, b, c, d);\
    this.__className = "' + className + '";\
    return this.__construct__(arguments);\
  };';
    if (window.execScript) {
        window.execScript(code);
    } else {
        window.eval(code);
    }
    var childClass = eval('(' + className + ')');
    inherit(childClass, parent);
    if (('common' in proto)) {
        extend(childClass, proto['common']);
        proto['common'] = childClass;
    }
    extend(childClass.prototype, proto);
}
if (window._ui === undefined) {
    var _ui = {
        _guid: 0,
        _sel: false,
        _uids: [false],
        reg: function (obj) {
            _ui._uids.push(obj);
            return ++_ui._guid;
        },
        sel: function (nsel) {
            if (nsel !== undefined) {
                var s = _ui.selobj();
                if (s && s._blur) {
                    s._blur();
                }
                _ui._sel = nsel;
            }
            return _ui._sel;
        },
        selobj: function (val) {
            if (_ui._sel && val !== undefined) {
                _ui._uids[_ui._sel] = val;
            }
            return _ui._uids[_ui._sel];
        }
    };
    addEvent(document, 'keypress keydown mousedown', function (e) {
        if (_ui.sel()) {
            var sel = _ui.selobj();
            if (!sel) {
                return _ui.sel(false);
            }
            if (sel.container && sel.container != ge(sel.container.id)) {
                _ui.selobj(false);
                return _ui.sel(false);
            }
            sel.onEvent(e);
        }
    });
}

function UiControl(args) {
    return this.__construct__(args);
}
extend(UiControl.prototype, {
    CSS: {},
    defaultOptions: null,
    dom: {},
    __construct__: function (args) {
        if (this.beforeInit)
            if (this.beforeInit.apply(this, args) === false) return false;
        if (this.initOptions)
            if (this.initOptions.apply(this, args) === false) return false;
        if (this.init.apply(this, args) === false) return false;
        if (this.initDOM)
            if (this.initDOM.apply(this, args) === false) return false;
        if (this.initEvents) this.initEvents.apply(this, args);
        if (this.afterInit) this.afterInit.apply(this, args);
        return this;
    },
    beforeInit: null,
    initOptions: null,
    init: null,
    initDOM: null,
    initEvents: null,
    afterInit: null,
    show: null,
    hide: null
});

function createUiClass(className, functions) {
    return createChildClass(className, UiControl, functions);
}

function UiUtil(args) {
    return this.__construct__(args);
}
extend(UiUtil.prototype, {
    defaultOptions: null,
    __components: {},
    __cid: 0,
    storage: null,
    __construct__: function (args) {
        if (this.beforeInit) this.beforeInit.apply(this, args);
        if (this.initOptions) this.initOptions.apply(this, args);
        this.init.apply(this, args);
        if (this.initEvents) this.initEvents.apply(this, args);
        if (this.afterInit) this.afterInit.apply(this, args);
        this.__components[(this.componentName ? this.componentName : this.__className) + (this.__cid++)] = this;
        return this;
    },
    beforeInit: null,
    initOptions: null,
    init: null,
    initEvents: null,
    afterInit: null
});

function createUtilClass(className, functions) {
    return createChildClass(className, UiUtil, functions);
}

function JsClass(args) {
    return this.__construct__(args);
}
extend(JsClass.prototype, {
    defaultOptions: null,
    __construct__: function (args) {
        if (this.beforeInit) this.beforeInit.apply(this, args);
        if (this.initOptions) this.initOptions.apply(this, args);
        this.init.apply(this, args);
        if (this.initEvents) this.initEvents.apply(this, args);
        if (this.afterInit) this.afterInit.apply(this, args);
        return this;
    },
    beforeInit: null,
    initOptions: null,
    init: null,
    initEvents: null,
    afterInit: null
});

function createClass(className, functions) {
    return createChildClass(className, JsClass, functions);
}
function createButton(el, onClick) {
    el = ge(el);
    if (!el || el.btnevents) return;
    if (hasClass(el, 'flat_button')) {
        if (isFunction(onClick)) {
            el.onclick = onClick.pbind(el);
        }
        return;
    }
    var p = el.parentNode;
    if (hasClass(p, 'button_blue') || hasClass(p, 'button_gray')) {
        if (isFunction(onClick)) {
            el.onclick = onClick.pbind(el);
        }
        return;
    }
    var hover = false;
    addEvent(el, 'click mousedown mouseover mouseout', function (e) {
        if (hasClass(p, 'locked')) return;
        switch (e.type) {
            case 'click':
                if (!hover) return;
                el.className = 'button_hover';
                onClick(el);
                return cancelEvent(e);
                break;
            case 'mousedown':
                el.className = 'button_down';
                break;
            case 'mouseover':
                hover = true;
                el.className = 'button_hover';
                break;
            case 'mouseout':
                el.className = 'button';
                hover = false;
                break;
        }
    });
    el.btnevents = true;
}

function lockButton(el) {
    if (!(el = ge(el))) return;
    if (hasClass(el, 'flat_button')) {
        lockFlatButtonNew(el);
        return;
    }
    var btn = (el.tagName.toLowerCase() == 'button'),
        d = btn ? 0 : ((browser.msie6 || browser.msie7) ? 2 : 4),
        tEl = btn ? el : geByClass1('file_button_text', el);
    if (!btn && !hasClass(el, 'file_button') || buttonLocked(el)) return;
    var lock = ce('span', {
        className: 'button_lock'
    });
    el.parentNode.insertBefore(lock, el);
    el['old_width'] = el.style.width;
    el['old_height'] = el.style.height;
    var s = getSize(el.parentNode);
    setStyle(el, {
        width: s[0] - d,
        height: s[1] - d
    });
    if (browser.msie6 || browser.msie7) {
        tEl['old_html'] = tEl.innerHTML;
        tEl.innerHTML = '';
    } else {
        tEl.style.textIndent = '-9999px';
    }
}

function unlockButton(el) {
    if (!(el = ge(el))) return;
    if (hasClass(el, 'flat_button')) {
        unlockFlatButtonNew(el);
        return;
    }
    var lock = geByClass1('button_lock', el.parentNode, 'span'),
        btn = (el.tagName.toLowerCase() == 'button'),
        tEl = btn ? el : geByClass1('file_button_text', el);
    if (!lock) return;
    el.parentNode.removeChild(lock);
    el.style.width = el['old_width'];
    el.style.height = el['old_height'];
    if (browser.msie6 || browser.msie7) tEl.innerHTML = tEl['old_html'];
    tEl.style.textIndent = '';
}

function buttonLocked(el) {
    if (!(el = ge(el))) return;
    if (hasClass(el, 'flat_button')) {
        return isButtonLocked(el);
    }
    return geByClass1('button_lock', el.parentNode, 'span') ? true : false;
}

function lockFlatButton(el) {
    if (!el || el.tagName.toLowerCase() != 'button' || isButtonLocked(el)) return;
    addClass(el, 'flat_btn_lock');
    el.innerHTML = '<span class="flat_btn_h">' + el.innerHTML + '</span>';
}

function unlockFlatButton(el) {
    if (!isButtonLocked(el)) return;
    el.innerHTML = el.firstChild.innerHTML;
    removeClass(el, 'flat_btn_lock');
}

function isButtonLocked(el) {
    if (!(el = ge(el))) return;
    return hasClass(el, 'flat_btn_lock');
}


function disableButton(el, disable) {
    if (!(el = ge(el)) || el.tagName.toLowerCase() !== 'button') return;
    if (hasClass(el, 'flat_button')) {
        return disableFlatButton(el, disable);
    }
    toggleClass(el.parentNode, 'button_disabled', !!disable);
    if (disable) {
        el.parentNode.insertBefore(ce('button', {
            innerHTML: el.innerHTML,
            className: 'disabled'
        }), el);
        hide(el);
    } else {
        var disabledEl = geByClass1('disabled', el.parentNode);
        if (disabledEl) re(disabledEl);
        show(el);
    }
}

function disableFlatButton(el, disable) {
    if (!(el = ge(el)) || el.tagName.toLowerCase() !== 'button') return;

    if (disable) {
        el.parentNode.insertBefore(ce('button', {
            innerHTML: el.innerHTML,
            className: el.className + ' button_disabled'
        }, {
            width: getSize(el)[0] + 'px'
        }), el);
        hide(el);
    } else {
        var disabledEl = domPS(el);
        if (disabledEl && hasClass(disabledEl, 'button_disabled')) re(disabledEl);
        show(el);
    }
}

function lockFlatButtonNew(el) {
    if (!(el = ge(el)) || el.tagName.toLowerCase() !== 'button') return;
    el.parentNode.insertBefore(ce('button', {
        innerHTML: '<span class="flat_btn_h">' + el.innerHTML + '</span>',
        className: el.className + ' flat_btn_lock'
    }, {
        width: getSize(el)[0] + 'px'
    }), el);
    hide(el);
}

function unlockFlatButtonNew(el) {
    if (!(el = ge(el)) || el.tagName.toLowerCase() !== 'button' || !isButtonLockedNew(el)) return;
    var disabledEl = domPS(el);
    if (disabledEl && hasClass(disabledEl, 'flat_btn_lock')) re(disabledEl);
    show(el);
}

function isButtonLockedNew(el) {
    if (!(el = ge(el)) || el.tagName.toLowerCase() !== 'button') return;
    var disabledEl = domPS(el);
    return (disabledEl && hasClass(disabledEl, 'flat_btn_lock'));
}
createUiClass('MessageBox', {
    defaultOptions: {
        type: 'MESSAGE',        // "MESSAGE" || "POPUP"
        hideOnOutClick: false,
        title: false,
        width: 410,
        dark: false,
        height: 'auto',
        bodyStyle: '',
        flat_buttons: true,
        closeButton: false,     // AntanubiS - 'X' close button in the caption.
        fullPageLink: '',       // If is set - 'box'-like button in the caption.
        returnHidden: true,     // AntanubiS - When hide - return previously hidden box.
        closeEsc: true,
        onShow: function () {
        },
        onHide: function () {
        },
        onLoadError: function () {
        },
        onLoad: false
    },
    beforeInit: function () {
        if (!window._message_boxes) {
            window._message_box_guid = 0;
            window._message_boxes = [];
            window._message_box_shown = 0;
            window._doc_block_timeout = null;
            window._doc_blocked = false;
        }
        this.guid = (++_message_box_guid);
    },
    bgLayer: function () {
        if (!ge('box_layer_bg')) {
            window.box_layer_bg = ce('div', {
                id: 'box_layer_bg',
                className: this.options.dark ? 'dark' : ''
            }, {
                height: getSize(document)[1]
            });
            addEvent(window, 'resize', function () {
                box_layer_bg.style.height = getSize(document)[1] + 'px';
            });
            onDomReady(function () {
                bodyNode.appendChild(box_layer_bg);
            });
        }

        if (!ge('layer_wrap')) {
            window.layer_wrap = ce('div', {
                id: 'layer_wrap'
            }, {
                height: windowHeight()
            });
            addEvent(window, 'resize', function () {
                layer_wrap.style.height = windowHeight() + 'px';
            });
            onDomReady(function () {
                bodyNode.appendChild(layer_wrap);
            });
        }
    },
    initOptions: function (options) {
        this.options = extend({}, this.defaultOptions, options);
        this.options.type = this.options.type == 'POPUP' ? 'POPUP' : 'MESSAGE';
    },
    init: function (options) {
        this.buttonsCount = 0;
        this.boxContainer = null;
        this.boxLayout = null;
        this.boxTitle = null;
        this.boxBody = null;
        this.boxControls = null;
        this.closeButton = null;
        this.fullPageLink = null;
        this.isVisible = false;
        this.hiddenBox = null;
        this.closeButton = null;
        this.fullPageLink = null;
        this.bgLayer();
    },
    setCloseButton: function () {
        if (!this.boxContainer || this.closeButton) return false;
        var self = this;
        this.closeButton = ce('div', {className: 'box_x_button'});
        if (this.fullPageLink) {
            this.boxTitle.parentNode.insertBefore(this.closeButton, this.fullPageLink);
        } else {
            this.boxTitle.parentNode.insertBefore(this.closeButton, this.boxTitle);
        }
        addEvent(this.closeButton, 'click', function () {
            self.hide()
        });
        return true;
    },
    setFullPageLink: function () {
        if (!this.boxContainer || this.options.fullPageLink == '') return false;
        if (this.fullPageLink) {
            this.fullPageLink.href = this.options.fullPageLink;
            return true;
        }
        this.fullPageLink = ce('a', {className: 'box_full_page_link', href: this.options.fullPageLink});
        this.boxTitle.parentNode.insertBefore(this.fullPageLink, this.boxTitle);
        return true;
    },
    initDOM: function (options) {
        var opt = this.options;
        this.boxContainer = ce('div', {
            className: 'popup_box_container',
            innerHTML: '' +
            '<div class="box_layout">' +
            '<div class="box_title_wrap cf">' +
            '<div class="box_title"></div>' +
            '</div>' +
            '<div class="box_body box_progress" style="' + opt.bodyStyle + '"></div>' +
            '<div class="box_controls_wrap">' +
            '<div class="box_controls cf"></div>' +
            '</div>' +
            '</div>'
        }, {
            display: 'none'
        });

        this.boxLayout = geByClass1('box_layout', this.boxContainer);
        this.boxTitle = geByClass1('box_title', this.boxContainer);
        this.boxBody = geByClass1('box_body', this.boxContainer);
        this.boxControls = geByClass1('box_controls', this.boxContainer);

        if (!window.layer_wrap) {
            return;
        }

        window.layer_wrap.appendChild(this.boxContainer);

        if (opt.type == 'MESSAGE') {
            if (opt.closeButton) {
                this.setCloseButton();
            }
            if (opt.fullPageLink) {
                this.setFullPageLink();
            }
        }
        this.refreshBox();
    },
    refreshBox: function () {
        var self = this,
            opt = this.options,
            hide = function () {
                self.hide();
            },
            closeEsc = function (e) {
                if (e.keyCode == KEY.ESC) self.hide();
            };
        this.boxTitle.innerHTML = opt.title;
        this.boxContainer.style.width = typeof (opt.width) == 'string' ? opt.width : opt.width + 'px';
        this.boxContainer.style.height = typeof (opt.height) == 'string' ? opt.height : opt.height + 'px';
        removeClass(this.boxContainer, 'box_no_controls');
        removeClass(this.boxContainer, 'message_box');
        removeEvent(layer_wrap, 'click', hide);
        removeEvent(document, 'keydown', closeEsc);
        if (opt.hideOnOutClick) {
            addEvent(layer_wrap, 'click', function(e){
                if(getTarget(e).id == 'layer_wrap'){
                    hide();
                }
            });
        }
        if (opt.closeEsc) {
            addEvent(document, 'keydown', closeEsc);
        }
        addClass(this.boxContainer, opt.type == 'POPUP' ? 'box_no_controls' : 'message_box');
    },
    removeButtons: function () {
        var buttons = [], self = this;
        this.buttonsCount = 0;
        each(this.boxControls.childNodes, function (i, x) {
            if (x) {
                removeEvent(x);
                buttons.push(x);
            }
        });
        each(buttons, function () {
            self.boxControls.removeChild(this);
        });
        return this;
    },
    addButton: function (options) {
        this.buttonsCount++;
        options = options || {};
        options = extend({
            label: 'Button' + this.buttonsCount,
            style: this.options.flat_buttons ? 'flat_button' : 'button_blue'
        }, options);


        if (this.options.flat_buttons) {
            if (options.style == 'button_no') options.style = 'flat_button secondary';
            if (options.style == 'button_yes') options.style = 'flat_button';
            var button = ce('button', {
                id: 'button' + this.guid + '_' + this.buttonsCount,
                innerHTML: options.label,
                className: options.style + ' ' + (options.left ? 'fl' : 'fr')
            });
            this.boxControls.appendChild(button);
            createButton(button, options.onClick);
            return button;
        } else {
            if (options.style == 'button_no') options.style = 'button_gray';
            if (options.style == 'button_yes') options.style = 'button_blue';
            var buttonWrap = ce('div', {
                className: options.style + ' ' + (options.left ? 'fl' : 'fr'),
                innerHTML: '<button id="button' + this.guid + '_' + this.buttonsCount + '">' + options.label + '</button>'
            });
            this.boxControls.appendChild(buttonWrap);
            createButton(buttonWrap.firstChild, options.onClick);
            return buttonWrap.firstChild;
        }
    },
    addControlsText: function (text) {
        text = text || '';
        var textWrap = ce('div', {
            className: 'controls_wrap',
            innerHTML: text
        });
        this.boxControls.appendChild(textWrap);
        return textWrap;
    },
    content: function (html) {
        html = html || '';
        this.boxBody.innerHTML = html;
        removeClass(this.boxBody, 'box_progress');
        this.refreshCoord();
        return this;
    },
    loadContent: function (url, params, evaluate, loader_style, noloader) {
        var st = loader_style ? loader_style : '';
        if (!noloader) this.boxBody.innerHTML = '<div class="box_loader" style="' + st + '"></div>';
        params = params || {};
        var self = this;

        ajax.post(url, params, function (responseText, isFail) {

            if (isFail) {
                self.onLoadError('Request error occured.');
            } else {
                if (evaluate) {
                    try {
                        var result = eval('(' + responseText + ')');
                        self.boxBody.innerHTML = result.html ? result.html : '';
                        if (result.script) window.execScript ? window.execScript(result.script) : eval.call(window, result.script);
                    } catch (e) {
                        return self.onLoadError(responseText);
                    }
                } else {
                    self.boxBody.innerHTML = responseText;
                }
                self.refreshCoord();
                removeClass(self.boxBody, 'box_progress');
                if (isFunction(self.options.onLoad)) self.options.onLoad(responseText);
            }

        });
        return this;
    },
    onLoadError: function (text) {
        this.boxBody.innerHTML = 'Error: ' + text;
        this.removeButtons();
        this.addButton({
            label: getLang('global-close'),
            onClick: this.hide
        });
        removeClass(this.boxBody, 'box_progress');
        this.refreshCoord();
        if (isFunction(this.options.onLoadError)) this.options.onLoadError(text);
    },
    show: function () {
        if (this.isVisible) return;
        this.isVisible = true;
        this.hiddenBox = 0;
        if (_message_box_shown && _message_boxes[_message_box_shown].isVisible) {
            var box = _message_boxes[_message_box_shown];
            if (this.options.returnHidden) {
                this.hiddenBox = _message_box_shown;
                box.hideContainer();
            } else {
                box.hide();
            }
        }

        if (!_message_box_shown) {
            box_layer_bg.className = this.options.dark ? 'dark' : '';
            bodyNode.style.overflow = 'hidden';
            htmlNode.style.overflow = 'hidden';
            addClass(bodyNode, 'layers_shown');
            clearTimeout(_doc_block_timeout);
            if (!_doc_blocked) {
                _doc_blocked = true;
            }
        }
        show(this.boxContainer);
        this.refreshCoord();
        _message_box_shown = this.guid;
        if (this.options.onShow) this.options.onShow();
        return this;
    },
    hide: function () {
        if (!this.isVisible) return;
        this.isVisible = false;
        hide(this.boxContainer);
        var showHidden = false;
        if (this.options.returnHidden && this.hiddenBox) {
            _message_boxes[this.hiddenBox].showContainer();
            _message_box_shown = this.hiddenBox;
            showHidden = true;
        }
        if (!showHidden) {
            _message_box_shown = 0;
            bodyNode.style.overflow = 'auto';
            htmlNode.style.overflow = 'auto';
            removeClass(bodyNode, 'layers_shown');
            clearTimeout(_doc_block_timeout);
            if (_doc_blocked) {
                _doc_block_timeout = setTimeout(function () {
                    _doc_blocked = false;
                }, 50);
            }
        }
        if (this.options.onHide) this.options.onHide();
        return this;
    },
    setOptions: function (newOptions) {
        this.options = extend(this.options, newOptions);
        var self = this;
        if ("bodyStyle" in newOptions) {
            var items = this.options.bodyStyle.split(';');
            for (var i = 0; i < items.length; ++i) {
                var name_value = items[i].split(':');
                if (name_value.length > 1 && name_value[0].length) {
                    self.boxBody.style[trim(name_value[0])] = trim(name_value[1]);
                    if (self.boxBody.style.setProperty) {
                        self.boxBody.style.setProperty(trim(name_value[0]), trim(name_value[1]), '');
                    }
                }
            }
        }
        if (this.options.closeButton) this.setCloseButton();
        if (this.options.fullPageLink) this.setFullPageLink();
        this.refreshBox();
        this.refreshCoord();
        return this;
    },
    hideContainer: function () {
        this.isVisible = false;
        hide(this.boxContainer);
    },
    showContainer: function () {
        this.isVisible = true;
        show(this.boxContainer);
    },
    refreshCoord: function () {
        var w_height = windowHeight(),
            containerSize = getSize(this.boxContainer)[1],
            scroll = getScroll()[1];
        this.boxContainer.style.marginTop = (w_height < containerSize ? 40 : (w_height - containerSize) / 3) + 'px';
        ge('layer_wrap').style.top = scroll + 'px';
    },
    afterInit: function () {
        _message_boxes[this.guid] = this;
    }
});
function getShownBox() {
    try {
        var b = _message_boxes[_message_box_shown];
        return (b && b.isVisible) ? b : false;
    } catch (e) {
        return false;
    }
}
// Extends MessageBox
function AlertBox(title, text, callback, options) {
    var aBox = new MessageBox({
        title: title
    });

    if (typeof options == 'object') aBox.setOptions(options);
    else options = {};
    aBox.removeButtons();

    if (options.boxType == 'CONFIRM') {
        aBox.addButton({
            label: options.no || getLang('global-no'),
            style: 'button_no',
            onClick: function () {
                aBox.hide();
            }
        });
        aBox.addButton({
            label: options.yes || getLang('global-yes'),
            onClick: function () {
                if (isFunction(callback) && callback() === false) return;
                aBox.hide();
            }
        });
    } else {
        aBox.addButton({
            label: options.no || getLang('global-close'),
            onClick: function () {
                aBox.hide();
                if (isFunction(callback))callback();
            }
        });
    }
    return aBox.content(text).show();
}

function ConfirmBox(title, text, callback, options) {
    options = options || {};
    options = extend({
        boxType: 'CONFIRM'
    }, options);
    return AlertBox(title, text, callback, options);
}

function Popup(text, options) {
    options = extend({
        type: 'POPUP',
        width: 420,
        dark: true
    }, options);

    var box = new MessageBox(options);
    box.content(text);
    box.show();
}

var winBoxes = {};
function showBox(name, url, query, lnk, reload, params, files) {
    if (typeof lnk == 'object') {
        reload = lnk.reload;
        params = lnk.params;
        files = lnk.files;
        lnk = lnk.href;
    }
    if (lnk && window.event && (window.event.which == 2 || window.event.button == 1)) {
        return true;
    }
    params = extend({
        title: getLang('global-loading')
    }, params);
    if (!winBoxes[name]) {
        winBoxes[name] = new MessageBox(params);
        reload = true;
        if (files) {
            for (var i in files) {
                if (/\.css/i.test(files[i])) {
                    addCss(files[i]);
                } else if (/\.js/i.test(files[i])) {
                    attachScript('script' + i, files[i]);
                }
            }
        }
    } else if (reload) {
        winBoxes[name].setOptions(params);
    }
    if (reload) {
        winBoxes[name].removeButtons();
        winBoxes[name].addButton({
            label: getLang('global-close'),
            onClick: function () {
                winBoxes[name].hide();
            }
        });
        winBoxes[name].loadContent(url, query, false);
    }
    winBoxes[name].show();
    return false;
}

var balloon_global_permit = false;
function showBalloonBox(message, options) {
    options = extend({
        width: 240,
        onHide: undefined,
        onConfirm: undefined,
        center: false,
        left: false,
        timeout: 5000,
        permit: undefined,
        check_global_permit: true
    }, options);

    var balloon = ce('div', {
        className: 'result_balloon_item_fly_area cf' + (options.center ? ' result_balloon_center' : ''),
        innerHTML: '<div style="width: ' + options.width + 'px" class="result_balloon_item cf">' +
        '<div class="result_balloon_item_message fl" style="width: ' + (options.onConfirm ? (options.width - 20) + 'px' : 'auto') + '">' + message + '</div>' +
        '<div class="result_balloon_confirm_button fr"></div>' +
        '</div>'
    }), wrap, top = 0, _fadeOut = function (force) {
        force = !!(force);
        setTimeout(function () {
            if ((isFunction(options.permit) && !options.permit()) || (options.check_global_permit && balloon_global_permit && !force)) {
                _fadeOut();
                return;
            }
            animate(balloon, options.center ? {top: top - 10, opacity: 0} : {
                marginTop: -10,
                opacity: 0
            }, 200, function () {
                re(balloon);
                if (isFunction(options.onHide)) {
                    options.onHide();
                }
            });
        }, force ? 0 : options.timeout);
    };

    if (options.center) {
        wrap = bodyNode;
    } else {
        var id = 'result_balloon_wrap_' + (options.left ? 'left' : 'right');
        wrap = ge(id);
        if (!wrap) {
            wrap = ce('div', {id: id});
            addEvent(wrap, 'mouseover mouseout', function (e) {
                balloon_global_permit = e.type == 'mouseover';
            });
            bodyNode.appendChild(wrap);
        }
    }
    wrap.appendChild(balloon);

    if (options.center) {
        var ws = windowSize(), bs = getSize(balloon);
        top = ws[1] / 3 - bs[1] / 2;
        setStyle(balloon, {left: ws[0] / 2 - bs[0] / 2, top: top});
    }

    animate(balloon, options.center ? {top: top - 5, opacity: 1} : {marginTop: 0, opacity: 1}, 300);

    if (isFunction(options.onConfirm)) {
        options.timeout = 0;
        options.onHide = options.onConfirm;
        var confirm_button = geByClass1('result_balloon_confirm_button', balloon);
        confirm_button.style.display = 'block';
        addEvent(confirm_button, 'click', function () {
            _fadeOut(true);
        });
    } else {
        _fadeOut();
    }
}

/* Migrate */
function showDoneBox(message, options) {
    options = extend({center: true}, options);

    if (options.w) options.width = options.w;
    if (options.out) options.timeout = options.out;
    if (options.callback) options.onHide = options.callback;

    showBalloonBox(message, options);
}

function showBandBox(message, options) {
    options = extend({}, options);

    if (options.w) options.width = options.w;
    if (options.out) options.timeout = options.out;
    if (options.callback) options.onHide = options.callback;

    showBalloonBox(message, options);
}

var MESSAGE_ERROR = 'error',
MESSAGE_SUCCESS = 'success',
MESSAGE_INFO = 'info',
MESSAGE_NOTIFY = MESSAGE_INFO,
MESSAGE_CONFIRM = 'confirm';


function showMessage(text, message_type, options) {
    message_type = message_type || MESSAGE_ERROR;
    options = extend({width: 240}, options);

    var message = '<div class="balloon_message_box cf">' +
        '<div class="message_icon message_type_' + message_type + ' fl"></div>' +
        '<div class="message_text fl" style="width:' + (options.width - 50) + 'px">' + text + '</div>' +
        '</div>';

    showBalloonBox(message, options);
}
function Dropdown(a, c, b) {
    if (!b) {
        b = {}
    }
    return new Selector(a, b.autocomplete ? c : [], extend({
        introText: "",
        multiselect: false,
        autocomplete: false,
        selectedItems: b.selectedItem
    }, b, {
        defaultItems: c
    }))
}

function Autocomplete(a, c, b) {
    return new Selector(a, c, b)
}
createChildClass("Selector", UiControl, {
    CSS: {},
    defaultOptions: {
        selectedItems: [],
        defaultItems: [],
        multiselect: true,
        multinostop: false,
        autocomplete: true,
        dropdown: true,
        maxItems: 50,
        selectFirst: true,
        dividingLine: "smart",
        resultField: undefined,
        customField: undefined,
        enableCustom: false,
        valueForCustom: -1,
        width: 300,
        height: 250,
        resultListWidth: 0,
        progressBar: false,
        imageId: undefined,
        noImageSrc: "/images/question_s.gif",
        hrefPrefix: "id",
        noBlur: false,
        zeroDefault: false,
        customArrow: false,
        customArrowWidth: 0,
        big: false,
        placeholder: "",
        placeholderColor: "#777777",
        placeholderColorBack: "#AFB8C2",
        zeroPlaceholder: false,
        introText: "Start typing",
        disabledText: "",
        noResult: "Nothing found",
        cacheLength: 100,
        indexkeys: undefined,
        onShow: undefined,
        onHide: undefined,
        onChange: undefined,
        onTagAdd: undefined,
        onTagRemove: undefined,
        onItemSelect: undefined,
        onTokenSelected: undefined,
        customSearch: false,
        chooseFirst: false,
        maxItemsShown: function (a) {
            if (a > 6) {
                return 500
            } else {
                if (a > 4) {
                    return 200
                } else {
                    if (a > 2) {
                        return 150
                    } else {
                        return 100
                    }
                }
            }
        },
        highlight: function (b, e) {
            b = e.indexOf(" ") == -1 ? b.split(" ") : [b];
            var d = "";
            var a = parseLatin(e);
            if (a !== null) {
                e = escapeRE(e) + "|" + escapeRE(a);
            }
            var f = new RegExp("(?![^&;]+;)(?!<[^<>]*)((\\(*)(" + e + "))(?![^<>]*>)(?![^&;]+;)", "gi");
            for (var c in b) {
                d += (c > 0 ? " " : "") + b[c].replace(f, "$2<em>$3</em>")
            }
            return d
        },
        formatResult: function (a) {
            return a[1] + (typeof (a[2]) == "string" ? " <span>" + a[2] + "</span>" : "")
        },
        lastOptionWithoutCommaAtEnd: false
    },
    controlName: "Selector",
    beforeInit: function (a) {
        if (a === null || a.autocomplete) {
            try {
                console.error("Can't init ", a)
            } catch (b) {}
            return false
        }
        this.guid = _ui.reg(this)
    },
    initOptions: function (a, c, b) {
        this.options = extend({}, this.defaultOptions, {
            resultField: a.name || "selectedItems",
            customField: a.name ? (a.name + "_custom") : "selectedItems_custom"
        }, this.prepareOptionsText(b || {}));
        this.options.highlight = this.options.highlight || function (d) {
            return d
        };
        if (!isArray(this.options.selectedItems) && isEmpty(this.options.selectedItems)) {
            this.options.selectedItems = []
        }
        if (a.value && !this.options.selectedItems.length) {
            this.options.selectedItems = a.value
        }
        this.options.width = parseInt(this.options.width) > 0 ? parseInt(this.options.width) : this.defaultOptions.width;
        this.options.height = parseInt(this.options.height) > 0 ? parseInt(this.options.height) : this.defaultOptions.height;
        this.options.resultListWidth = parseInt(this.options.resultListWidth) > 0 ? parseInt(this.options.resultListWidth) : this.options.width;
        if (this.options.imageId) {
            this.options.imageId = ge(this.options.imageId)
        }
    },
    init: function (a, b) {
        this.disableSomeFeatures = (location.pathname.indexOf("/join") === 0);
        this.dataURL = typeof (b) == "string" ? b : null;
        this.dataItems = isArray(b) ? b : [];
        this.currentList = this.dataItems;
        if (this.dataURL) {
            this.cache = new Cache(this.options)
        } else {
            this.indexer = new Indexer(this.dataItems, {
                indexkeys: this.options.indexkeys
            })
        }
        this._selectedItems = [];
        this.input = a;
        this.disabled = false;
        this.mouseIsOver = false;
        this.hasFocus = 0;
        this.scrollbarWidth = 0;
        this.timeout = null;
        this.readOnly = (!this.options.autocomplete ? 'readonly="true"' : "");
        this.requestTimeout = null;
        this.selectedTokenId = 0;
        this.selectorWidth = this.options.width
    },
    initDOM: function (b, c) {
        var a = this;
        this.container = ce("div", {
            id: "container" + this.guid,
            className: "selector_container" + (!a.options.autocomplete ? " dropdown_container" : "") + (a.options.big ? " big" : "") + (browser.mobile ? " mobile_selector_container" : ""),
            innerHTML: '<table cellspacing="0" cellpadding="0" class="selector_table">                  <tr>                    <td class="selector">                      <div class="placeholder_wrap1">                        <div class="placeholder_wrap2">                          <div class="placeholder_content"></div>                          <div class="placeholder_cover"></div>                        </div>                      </div>                      <span class="selected_items"></span>                      <input type="text" class="selector_input" ' + this.readOnly + ' />        <input type="hidden" name="' + a.options.resultField + '" id="' + a.options.resultField + '" value="" class="resultField">        <input type="hidden" name="' + a.options.customField + '" id="' + a.options.customField + '" value="" class="customField">      </td>' + (a.options.dropdown ? '<td id="dropdown' + this.guid + '" class="selector_dropdown">&nbsp;</td>' : "") + '    </tr>  </table>  <div class="results_container">    <div class="result_list" style="display:none;"></div>    <div class="result_list_shadow">      <div class="shadow1"></div>      <div class="shadow2"></div>    </div>  </div>'
        }, {
            width: a.options.width + "px"
        });
        b.parentNode.replaceChild(this.container, b);
        each({
            selector: "selector",
            resultList: "result_list",
            resultListShadow: "result_list_shadow",
            input: "selector_input",
            placeholder: "placeholder_wrap1",
            placeholderContent: "placeholder_content",
            selectedItemsContainer: "selected_items",
            resultField: "resultField",
            customField: "customField",
            dropdownButton: "selector_dropdown"
        }, function (e, d) {
            a[e] = geByClass(d, a.container)[0]
        });
        if (browser.chrome) {
            this.resultList.style.opacity = 1
        }
        b.autocomplete = "1";
        if (a.options.dividingLine) {
            addClass(this.resultList, "dividing_line")
        }
        this.resultList.style.width = this.resultListShadow.style.width = a.options.resultListWidth + "px";
        if (this.options.dropdown) {
            this.initDropdown()
        }
        this.updatePlaceholder();
        this.select = new Select(this.resultList, this.resultListShadow, {
            selectFirst: a.options.selectFirst,
            height: a.options.height,
            onItemActive: function (d) {
                a.showImage(d);
                a.activeItemValue = d
            },
            onItemSelect: a._selectItem.bind(a),
            onShow: function () {
                _ui.sel(a.guid);
                a.highlightInput(true);
                if (isFunction(a.options.onShow)) {
                    a.options.onShow()
                }
            },
            onHide: function () {
                _ui.sel(false);
                a.highlightInput(false);
                if (isFunction(a.options.onHide)) {
                    a.options.onHide()
                }
            }
        })
    },
    initEvents: function () {
        var a = this;
        if (this.options.dropdown) {
            this.initDropdownEvents()
        }
        var c = browser.opera || browser.mozilla ? "keypress" : "keydown";
        var b = browser.opera ? "keypress" : "keydown";
        this.onEvent = function (g) {
            if (g.type == "mousedown") {
                var f = true;
                var d = g.target;
                while (d && d != d.parentNode) {
                    if (d == a.container) {
                        f = false;
                        break
                    }
                    d = d.parentNode
                }
                if (f) {
                    a.select.hide();
                    a.deselectTokens()
                }
            }
            if (g.type == c) {
                a.handleKeyboardEventOutside(g)
            }
            if (g.type == b) {
                a.select.handleKeyEvent(g)
            }
        };
        if (this.disableSomeFeatures) {
            addEvent(this.input, "paste keypress keydown focus blur", this.handleKeyboardEvent, false, {
                self: this
            })
        } else {
            addEvent(this.input, "keydown keypress change paste cut drop input focus blur", this.handleKeyboardEvent, false, {
                self: this
            })
        }
        addEvent(this.selector, "mousedown", function (f) {
            var g = false;
            var d = f.target;
            while (d !== null) {
                if (hasClass(d, "token")) {
                    g = true;
                    break
                }
                d = d.parentNode
            }
            if (!g) {
                return a.onInputClick(f)
            }
            return true
        }, false, {
            self: this
        })
    },
    afterInit: function () {
        this.updateInput();
        var a = this;
        if (this.options.selectedItems !== undefined) {
            if (isArray(this.options.selectedItems)) {
                for (var b in this.options.selectedItems) {
                    this._selectItem(this.options.selectedItems[b], false)
                }
            } else {
                each((this.options.selectedItems + "").split(","), function (d, c) {
                    a._selectItem(c, false)
                })
            }
        }
        if (!this._selectedItems.length && !this.options.autocomplete && !this.options.multiselect && this.options.defaultItems.length) {
            this._selectItem(this.options.defaultItems[0], false)
        }
    },
    prepareOptionsText: function (a) {
        each(["disabledText", "placeholder"], function () {
            if (this in a) {
                a[this] = winToUtf(stripHTML(a[this]))
            }
        });
        return a
    },
    fadeButtonToColor: function () {
        if (this.options.customArrow || this.options.big) {
            return
        }
        var b = window.is_rtl ? {
            backgroundColor: "#E1E8ED",
            borderRightColor: "#D2DBE0"
        } : {
            backgroundColor: "#E1E8ED",
            borderLeftColor: "#D2DBE0"
        };
        var a = this;
        animate(this.dropdownButton, b, 200, function () {
            if (!a.mouseIsOver) {
                if (!a.select.isVisible()) {
                    a.fadeButtonToWhite()
                } else {
                    a.dropdownButton.style.backgroundColor = a.dropdownButton.style[window.is_rtl ? "borderRightColor" : "borderLeftColor"] = ""
                }
            }
        })
    },
    fadeButtonToWhite: function () {
        if (this.options.customArrow || this.options.big) {
            return
        }
        var a = this;
        animate(this.dropdownButton, {
            backgroundColor: "#FFFFFF",
            borderLeftColor: "#FFFFFF"
        }, 200, function () {
            a.dropdownButton.style.backgroundColor = a.dropdownButton.style[window.is_rtl ? "borderRightColor" : "borderLeftColor"] = "";
            if (a.mouseIsOver) {
                a.fadeButtonToColor()
            }
        })
    },
    initDropdown: function () {
        this.scrollbarWidth = this.options.customArrowWidth || this.options.big && 25 || window.sbWidth();
        if (this.scrollbarWidth <= 3) {
            this.scrollbarWidth = browser.mobile ? 20 : 14
        }
        if (!this.options.customArrow) {
            this.dropdownButton.style.width = this.scrollbarWidth + "px"
        }
        this.selectorWidth -= this.scrollbarWidth
    },
    initDropdownEvents: function () {
        var a = this;
        addEvent(this.dropdownButton, "mouseover", function () {
            addClass(this, "selector_dropdown_hover")
        });
        addEvent(this.dropdownButton, "mouseout", function () {
            removeClass(this, "selector_dropdown_hover")
        });
        addEvent(this.container, "mouseover", function (b) {
            a.mouseIsOver = true;
            if (a.disabled) {
                return
            }
            a.fadeButtonToColor()
        });
        addEvent(this.container, "mouseout", function () {
            a.mouseIsOver = false;
            if (a.disabled) {
                return
            }
            setTimeout(function () {
                if (a.mouseIsOver) {
                    return
                }
                if (!a.select.isVisible()) {
                    a.fadeButtonToWhite()
                } else {
                    a.dropdownButton.style.backgroundColor = a.dropdownButton.style[window.is_rtl ? "borderRightColor" : "borderLeftColor"] = ""
                }
            }, 0)
        });
        addEvent(this.dropdownButton, "mousedown", function () {
            if (!a.select.isVisible()) {
                a.showDefaultList()
            } else {
                a.select.toggle()
            }
        })
    },
    destroyDropdown: function () {
        cleanElems(this.dropdownButton)
        removeEvent(this.container, "mouseover");
        removeEvent(this.container, "mouseout");
        this.scrollbarWidth = 0;
        this.selectorWidth = this.options.width
    },
    destroy: function () {
        if (this.destroyed) {
            return
        }
        this.destroyDropdown();
        var a = ge(this.options.imageId);
        if (a) {
            removeEvent(a, "click")
        }
        this.select.destroy();
        cleanElems(this.container, this.input, this.selector, this.resultList, this.resultListShadow, this.placeholderContent);
        for (var b = this.selectedItemsContainer.firstChild; b; b = b.nextSibling) {
            cleanElems(b, b.firstChild.nextSibling)
        }
        this.destroyed = true
    },
    updateInput: function () {
        if (!this.options.autocomplete && this.options.multiselect && this._selectedItems.length) {
            hide(this.input)
        } else {
            if (!isVisible(this.input)) {
                show(this.input)
            }
            this.input.style.width = "20px";
            var a = (this.options.big ? 12 : 9);
            var c = this._selectedItems.length ? this.input.offsetLeft : (window.is_rtl ? this.selectorWidth - a : 0);
            var b = window.is_rtl ? c : (this.selectorWidth - c - a);
            this.input.style.width = Math.max(20, b) + "px"
        }
        this.updatePlaceholder()
    },
    updatePlaceholder: function () {
        if (this.disableSomeFeatures) {
            return
        }
        var c = (this.resultField.value == "0" && this.options.zeroPlaceholder);
        var d = ((this.disabled && this.options.disabledText) ? this.options.disabledText : this.options.placeholder);
        var e = (this.hasFocus ? this.options.placeholderColorBack : this.options.placeholderColor);
        var b = ((c || this.disabled) && this.options.placeholderColor || "#000");
        var a = !(this._selectedItems.length && this.options.multiselect || this.input.value.length || c);
        if (d !== this.placeholderTextPrev) {
            this.placeholderContent.innerHTML = d
        }
        if (e !== this.placeholderColorPrev) {
            animate(this.placeholderContent, {
                color: e
            }, 200)
        }
        if (b !== this.placeholderInputColorPrev) {
            this.input.style.color = b
        }
        if (a !== this.placeholderVisiblePrev) {
            toggle(this.placeholder, a)
        }
        this.placeholderTextPrev = d;
        this.placeholderColorPrev = e;
        this.placeholderInputColorPrev = b;
        this.placeholderVisiblePrev = a
    },
    handleKeyboardEvent: function (d) {
        var b = d.data.self;
        switch (d.type) {
            case "paste":
            case "cut":
            case "drop":
            case "input":
                clearTimeout(b.timeout);
                b.timeout = setTimeout(function () {
                    b.onChange()
                }, 0);
                break;
            case "keypress":
                if (d.which == KEY.RETURN && browser.opera && b.options.enableCustom && (b.select.selectedItem() === null || b.select.selectedItem() === undefined)) {
                    b.select.hide();
                    if (!b.options.noBlur) {
                        b.input.blur()
                    } else {
                        if (isFunction(b.options.onChange)) {
                            b.updateCustom();
                            b.options.onChange(b.resultField.value)
                        }
                    }
                    return false
                } else {
                    if (d.which == KEY.SPACE || d.which > 40 && !d.metaKey) {
                        clearTimeout(b.timeout);
                        b.timeout = setTimeout(function () {
                            b.onChange()
                        }, 0)
                    }
                }
                break;
            case "keydown":
                switch (d.keyCode) {
                    case KEY.DOWN:
                        if (!b.select.isVisible()) {
                            setTimeout(b.showDefaultList.bind(b), 0);
                            return false
                        }
                        break;
                    case KEY.DEL:
                        if (b.input.value.length > 0) {
                            clearTimeout(b.timeout);
                            b.timeout = setTimeout(b.onChange.bind(b), 0)
                        } else {
                            if (b.selectedTokenId) {
                                var a = 0;
                                for (var c = b._selectedItems.length - 2; c >= 0; c--) {
                                    if (b._selectedItems[c][0] == b.selectedTokenId && b._selectedItems[c + 1]) {
                                        a = b._selectedItems[c + 1][0]
                                    }
                                }
                                b.removeTagData(b.selectedTokenId);
                                if (a) {
                                    b.selectToken(a)
                                } else {
                                    if (!b.readOnly) {
                                        setTimeout(function () {
                                            b.input.focus()
                                        }, 0)
                                    }
                                }
                            } else {
                                if (b.hasFocus && b._selectedItems.length) {
                                    b.selectToken(b._selectedItems[b._selectedItems.length - 1][0])
                                }
                            }
                            cancelEvent(d)
                        }
                        return true;
                        break;
                    case KEY.RETURN:
                        if (!browser.opera && b.options.enableCustom && (b.select.selectedItem() === null || b.select.selectedItem() === undefined)) {
                            b.select.hide();
                            if (!b.options.noBlur) {
                                b.input.blur()
                            } else {
                                if (isFunction(b.options.onChange)) {
                                    b.updateCustom();
                                    b.options.onChange(b.resultField.value)
                                }
                            }
                            return false
                        }
                        break;
                    case KEY.ESC:
                        b.input.blur();
                        break
                }
                break;
            case "focus":
                if (!b.disabled && !b.select.isVisible() && !b.focusSelf) {
                    b.showDefaultList()
                }
                b.focusSelf = false;
                if (b.disabled || b.readOnly) {
                    b.input.blur();
                    return true
                }
                if ((b._selectedItems.length == 0) || b.options.multiselect) {
                    if (browser.mozilla) {
                        setTimeout(function () {
                            b.input.value = ""
                        }, 0)
                    } else {
                        b.input.value = ""
                    }
                }
                addClass(b.input, "focused");
                b.input.style.color = "#000";
                b.hasFocus++;
                b.updatePlaceholder();
                break;
            case "blur":
                if (isFunction(b.options.chooseFirst) && b.options.chooseFirst(b.input.value)) {
                    b.select.active = 0;
                    if (isFunction(b.select.options.onItemSelect)) {
                        b.select.options.onItemSelect(b.select.selectedItem(), undefined, true)
                    }
                    return cancelEvent(d)
                }
                if (b.readOnly) {
                    return true
                }
                if (!b.disabled) {
                    b.updateCustom();
                    clearTimeout(b.requestTimeout);
                    if (b.changeAfterBlur && isFunction(b.options.onChange)) {
                        if (!b.options.enableCustom || !b._selectedItems.length) {
                            b.options.onChange("")
                        }
                        b.changeAfterBlur = false
                    }
                    if (b.options.onBlur) {
                        b.options.onBlur()
                    }
                }
                removeClass(b.input, "focused");
                b.hasFocus = 0;
                b.updatePlaceholder();
                break
        }
        return true
    },
    updateCustom: function () {
        var a = this;
        if (a.options.enableCustom && a.input.value.length) {
            var b = a.input.value;
            if (a._selectedItems.length == 0) {
                a.resultField.value = parseInt(!a.options.valueForCustom);
                a.customField.value = b;
                a._selectItem([a.options.valueForCustom, b])
            }
        } else {
            if (a._selectedItems.length == 0) {
                a.input.value = ""
            } else {
                if (a.options.multiselect) {
                    a.input.value = ""
                }
            }
        }
        a.updatePlaceholder()
    },
    handleKeyboardEventOutside: function (b) {
        var a;
        if (this.disabled || this.input.value.length > 0 && this.hasFocus || !this.hasFocus && this.selectedTokenId == 0) {
            return true
        }
        switch (b.keyCode) {
            case KEY.RETURN:
                return false;
                break;
            case KEY.LEFT:
                for (a = this._selectedItems.length - 1; a >= 0; a--) {
                    if (!this.selectedTokenId || this._selectedItems[a][0] == this.selectedTokenId && a > 0) {
                        if (this.selectedTokenId) {
                            a--
                        }
                        this.selectToken(this._selectedItems[a][0]);
                        this.input.blur();
                        break
                    }
                }
                return false;
                break;
            case KEY.RIGHT:
                for (a = 0; a < this._selectedItems.length; a++) {
                    if (this._selectedItems[a][0] == this.selectedTokenId) {
                        if (a < this._selectedItems.length - 1) {
                            this.selectToken(this._selectedItems[a + 1][0]);
                            this.input.blur()
                        } else {
                            if (!this.readOnly) {
                                this.deselectTokens();
                                this.input.focus()
                            }
                        }
                        break
                    }
                }
                return false;
                break
        }
        return true
    },
    onInputClick: function (b) {
        var a = b.data.self;
        a.deselectTokens();
        if (!a.select.isVisible()) {
            a.showDefaultList()
        } else {
            if (a.input.readOnly) {
                a.focusSelf = true;
                a.select.toggle()
            } else {
                a.onChange()
            }
        } if (!a.readOnly) {
            a.input.focus()
        } else {
            a.input.blur()
        }
    },
    highlightInput: function (a) {
        if (a) {
            addClass(this.container, "selector_focused")
        } else {
            removeClass(this.container, "selector_focused")
        }
    },
    selectToken: function (a) {
        if (!this.options.multiselect) {
            return
        }
        this.select.hide();
        removeClass(ge("bit_" + this.guid + "_" + this.selectedTokenId), "token_selected");
        addClass(ge("bit_" + this.guid + "_" + a), "token_selected");
        this.selectedTokenId = a;
        if (isFunction(this.options.onTokenSelected)) {
            this.options.onTokenSelected(a)
        }
        this.showImage(a)
    },
    deselectTokens: function () {
        if (!this.selectedTokenId || !this.options.multiselect) {
            return
        }
        removeClass(ge("bit_" + this.guid + "_" + this.selectedTokenId), "token_selected");
        this.selectedTokenId = 0;
        if (isFunction(this.options.onTokenSelected)) {
            this.options.onTokenSelected()
        }
        this.showImage()
    },
    _blur: function () {
        this.select.hide()
    },
    showImage: function (e, a) {
        if (!this.options.imageId) {
            return false
        }
        var b = ge(this.options.imageId);
        if (!b) {
            return false
        }
        if (a === undefined) {
            if (!e) {
                e = this.resultField.value.split(",")[0]
            }
            var d = this._selectedItems.concat(this.currenDataItems);
            if (d && d.length) {
                for (var c in d) {
                    if (d[c] && d[c][0] == e) {
                        a = d[c];
                        break
                    }
                }
            }
        }
        if (a !== undefined && typeof (a[3]) == "string" && a[3].length) {
            if (a[3] == "none") {
                b.style.display = "none"
            } else {
                b.style.display = "";
                b.setAttribute("src", a[3]);
                b.parentNode.href = "/" + this.options.hrefPrefix + a[0];
                removeEvent(b.parentNode, "click")
            }
        } else {
            b.style.display = "";
            b.setAttribute("src", this.options.noImageSrc);
            b.parentNode.href = "#";
            addEvent(b.parentNode, "click", function () {
                return true
            })
        }
        return true
    },
    _selectItem: function (e, d, a) {
        if (e === null || e === undefined) {
            return
        }
        if (d === undefined) {
            d = true
        }
        var f;
        if (e == -2000000000) {
            f = [this.curTerm, this.curTerm, cur.lang.mail_enter_email_address, "/images/contact_info.png", 0, ""]
        } else {
            if (typeof (e) == "string" && e.indexOf("@") != -1) {
                f = [e, e, cur.lang.mail_enter_email_address, "/images/contact_info.png", 0, ""]
            } else {
                if (typeof (e) == "object") {
                    f = e
                } else {
                    var b = [];
                    each([this.dataItems, this.options.defaultItems, this.receivedData], function (h, g) {
                        if (g && g.length) {
                            b = b.concat(g)
                        }
                    });
                    for (var c in b) {
                        if (b[c][0] == e || b[c] == e) {
                            f = b[c];
                            break
                        }
                    }
                }
            }
        }

        if (typeof f != "object") {
            f = [e, e]
        }
        f[0] = f[0].toString();
        f[1] = f[1].toString();
        this.changeAfterBlur = false;
        if (f[0] === this.resultField.value) {
            if (!this.options.multiselect) {
                this.input.value = winToUtf(stripHTML(f[1]));
                this.showImage();
                if (this.input.value.length || !this.options.placeholder) {
                    addClass(this.input, "selected")
                }
                this.updatePlaceholder()
            }
            return
        }
        if (this._selectedItems.length >= this.options.maxItems) {
            this.select.hide();
            return
        }
        this.deselectTokens();
        this.addTagData(f);
        this.showImage();
        if (this.options.multiselect) {
            this.input.value = "";
            if (this.dataURL) {
                this.select.clear()
            } else {
                this.select.removeItem(f[0])
            }
        } else {
            this.input.value = winToUtf(stripHTML(f[1]));
            addClass(this.input, "selected");
            this.updatePlaceholder()
        }
        this.select.hide();
        this.updateInput();
        if (a && this.options.multiselect && !this.readOnly) {
            setTimeout(function () {
                if (!this.options.multinostop) {
                    this.focusSelf = true
                }
                hide(this.input);
                show(this.input);
                this.input.focus()
            }.bind(this), 100)
        } else {
            if (!this.options.noBlur) {
                this.input.blur()
            }
        } if (d) {
            if (this.options.multiselect && isFunction(this.options.onTagAdd)) {
                this.options.onTagAdd(f, this.resultField.value)
            }
            if (isFunction(this.options.onChange)) {
                this.options.onChange(this.resultField.value)
            }
        }
    },
    addTagData: function (c) {
        if (!c || c.length < 2) {
            return
        }
        if (!this.options.multiselect) {
            this._selectedItems.splice(0, this._selectedItems.length, c);
            this.resultField.value = c[0];
            return
        }
        for (var e in this._selectedItems) {
            if (this._selectedItems[e][0] == c[0]) {
                this.selectToken(this._selectedItems[e][0]);
                return
            }
        }
        this._selectedItems.push(c);
        var d = [];
        for (e in this._selectedItems) {
            d.push(this._selectedItems[e][0])
        }
        this.resultField.value = d.join(",");
        this.input.style.width = "1px";
        var b = ce("div", {
            id: "bit_" + this.guid + "_" + c[0],
            className: "token"
        });
        var f = Math.max(this.selector.clientWidth, getSize(b)[0]);
        var j = this;
        b.innerHTML = '<span class="l">' + c[1] + '</span><span class="x" />';
        addEvent(b, "click", function () {
            j.selectToken(c[0]);
            return false
        });
        addEvent(b, "dblclick", function () {
            if (c[4]) {
                j.removeTagData(c[0]);
                each(c[4], function (l, k) {
                    j._selectItem(k, false)
                })
            }
            return false
        });
        addEvent(b, "mouseover", function (k) {
            addClass(b, "token_hover");
            j.showImage(c[0], c)
        });
        addEvent(b, "mouseout", function (k) {
            removeClass(b, "token_hover");
            j.showImage(j.activeItemValue ? j.activeItemValue : j.selectedTokenId)
        });
        var h = b.firstChild.nextSibling;
        addEvent(h, "mousedown", function () {
            j.select.hide();
            j.removeTagData(c[0]);
            if (!j.readOnly && j.hasFocus) {
                j.input.focus()
            }
            return false
        });
        j.selectedItemsContainer.appendChild(b);
        var g = b.firstChild;
        var a = g.innerHTML;
        while (b.offsetWidth > f && a.length > 3) {
            a = a.substr(0, a.length - 2);
            g.innerHTML = a + "..."
        }
    },
    removeTagData: function (e) {
        this.selectedTokenId = 0;
        var b = ge("bit_" + this.guid + "_" + e);
        if (!b) {
            return false
        }
        var d = b.firstChild.nextSibling;
        cleanElems(b, d)
        b.parentNode.removeChild(b);
        var a, c = [];
        for (i in this._selectedItems) {
            if (this._selectedItems[i][0] == e) {
                a = i;
                continue
            }
            c.push(this._selectedItems[i][0])
        }
        if (a == undefined) {
            return false
        }
        this.resultField.value = c.join(",");
        if (isFunction(this.options.onTagRemove)) {
            this.options.onTagRemove(this._selectedItems[a], this.resultField.value)
        }
        if (isFunction(this.options.onChange)) {
            this.options.onChange(this.resultField.value)
        }
        this._selectedItems.splice(a, 1);
        if (this.options.multiselect) {
            this.defaultList = false
        }
        this.showImage();
        this.updateInput();
        return false
    },
    onChange: function () {
        var b = trim(this.input.value.toLowerCase());
        if (!this.options.multiselect) {
            if (this._selectedItems.length) {
                this.changeAfterBlur = true
            }
            this._clear()
        }
        this.updatePlaceholder();
        clearTimeout(this.requestTimeout);
        if (b.length == 0) {
            this.showDefaultList();
            return
        }
        this.curTerm = b;
        var a = isFunction(this.options.customSearch) && this.options.customSearch(b);
        var c;
        if (a) {
            this.receiveData(b, a);
            return
        }
        if (this.dataURL) {
            c = this.cache.getData(b);
            if (c === null) {
                this.requestTimeout = setTimeout(function () {
                    this.request(this.receiveData.bind(this), this.showNoDataList.bind(this))
                }.bind(this), 300)
            } else {
                if (c && c.length) {
                    this.receiveData(b, c)
                } else {
                    this.showNoDataList()
                }
            }
        } else {
            c = this.indexer.search(b);
            if (c && c.length) {
                this.receiveData(b, c)
            } else {
                this.showNoDataList()
            }
        }
    },
    showNoDataList: function () {
        if (this.hasFocus || this.readOnly) {
            this._showSelectList(this.options.noResult);
            this.defaultList = false
        }
    },
    showDefaultList: function () {
        var c = hasClass(this.resultList, "reverse");
        var a = this.needsReverse();
        if (c != a) {
            if (this.currenDataItems) {
                this.setSelectContent(this.currenDataText || "", this.currenDataItems)
            }
            toggleClass(this.resultList, "reverse", a);
            toggleClass(this.resultListShadow, "reverse", a);
            c = a
        }
        if (this.defaultList && this.select.hasItems()) {
            if (this.options.multiselect || !this._selectedItems.length) {
                this.select.show()
            } else {
                this.select.show(this._selectedItems[0][0])
            }
        } else {
            this.defaultList = true;
            //var b = null;
            var b = this.options.autocomplete ? this.options.introText : null;
            this._showSelectList(b, (this.options.defaultItems.length || this.options.zeroDefault) ? this.options.defaultItems : this.dataItems)
        } if (c) {
            if (!this._selectedItems.length) {}
            setStyle(this.resultList, {
                bottom: getSize(this.container)[1] - 1
            })
        } else {
            setStyle(this.resultList, {
                bottom: "auto"
            })
        }
    },
    showDataList: function (a, b) {
        this.defaultList = false;
        this._showSelectList(null, a, b)
    },
    needsReverse: function () {
        var g = window.scrollGetY ? scrollGetY() : getScroll()[1];
        var c = getXY(this.container)[1] || 0;
        var j = getSize(this.container)[1] || 22;
        var d = this.options.height || 250;
        var e = this.options.minHeight || 0;
        var a = (window.pageNode && window.browser.mozilla ? Math.min(getSize(pageNode)[1], window.lastWindowHeight) : window.lastWindowHeight) || getScroll()[3];
        var k = this.resultList && this.resultList.firstChild;
        var f;
        if (k && k.firstChild) {
            var h = getStyle(this.resultList, "display"),
                b = getStyle(this.resultList, "visibility");
            setStyle(this.resultList, {
                visibility: "hidden",
                display: "block"
            });
            f = getSize(this.resultList)[1];
            setStyle(this.resultList, {
                visibility: b,
                display: h
            })
        } else {
            f = e ? e : (this.currenDataItems ? this.currenDataItems.length * getSize(this.container)[1] : d)
        } if (f > d) {
            f = d
        }
        return (c + j + f - g > a && c - f - g > 0 && c - f > 40)
    },
    setSelectContent: function (g, e, f) {
        e = isArray(e) && e.length ? e : [];
        var a = [];
        this.select.clear();
        if (g) {
            a.push(["", g, true])
        }
        var d;
        if (e.length) {
            for (d in e) {
                if (typeof e[d] != "object") {
                    e[d] = [e[d], e[d]]
                }
            }
            if (this.options.multiselect) {
                e = this.filterData(e)
            }
            if (this.options.dividingLine == "smart") {
                removeClass(this.resultList, "dividing_line");
                for (d in e) {
                    if (typeof (e[d][2]) == "string" && e[d][2].length) {
                        addClass(this.resultList, "dividing_line")
                    }
                }
            }
            var h = (this.options.autocomplete && f) ? this.options.maxItemsShown(f.length) : e.length;
            var j = this;
            for (d = 0; d < e.length; ++d) {
                var c = e[d];
                if (!h) {
                    break
                }
                var b = j.options.formatResult(c);
                if (f) {
                    if ((b = j.options.highlight(b, f))) {
                        --h
                    }
                }
                if (!b) {
                    continue
                }
                a.push([c[0], b])
            }
        }
        if (g && a.length > 1) {
            a = a.slice(1)
        }
        this.select.content(a)
    },
    _showSelectList: function (d, b, c) {
        this.currenDataItems = b;
        this.currenDataText = d;
        if (window.is_rtl) {
            var a = getXY(this.container)[0];
            if (a) {
                geByClass("results_container", this.container)[0].style.left = a + "px"
            }
        }
        this.setSelectContent(d, b, c);
        if (this.select.hasItems()) {
            if (this.options.multiselect || !this._selectedItems.length) {
                this.select.show()
            } else {
                this.select.show(this._selectedItems[0][0])
            }
        }
        return true
    },
    receiveData: function (b, a) {
        if (b != this.curTerm) {
            return
        }
        if (b !== "" && a && a.length && this.hasFocus) {
            this.receivedData = a;
            this.showDataList(a, b)
        } else {
            this.select.hide()
        }
    },
    filterData: function (c) {
        var a = [];
        var b = this;
        each(c, function (e) {
            for (var d in b._selectedItems) {
                if (this[0] == b._selectedItems[d][0]) {
                    return
                }
            }
            a.push(this)
        });
        return a
    },
    request: function (success, failure) {
        if (!this.dataURL) {
            return
        }
        var term = trim(this.input.value.toLowerCase());
        var self = this;
        if (term.length == 0) {
            return
        }
        var sep = this.dataURL.indexOf("?") == -1 ? "?" : "&";
        var url = this.dataURL + sep + "str=" + encodeURIComponent(term);
        var done = function (data) {
            if (self.options.progressBar) {
                hide(self.options.progressBar)
            }
            try {
                data = eval("(" + data + ")")
            } catch (e) {}
            if (data.length) {
                self.cache.setData(term, data);
                if (isFunction(success)) {
                    success(term, data)
                }
            } else {
                self.cache.setData(term, []);
                if (isFunction(failure)) {
                    failure(term)
                }
            }
        };
        ajax.plainpost(url, {}, done);
        if (this.options.progressBar) {
            show(this.options.progressBar)
        }
    },
    doSort: function (d) {
        var c, a, b;
        if (!d.length || d.length < 2) {
            return
        }
        for (c = 0; c < d.length - 1; c++) {
            for (a = c + 1; a < d.length; a++) {
                if (d[c][1] > d[a][1]) {
                    b = d[c];
                    d[c] = d[a];
                    d[a] = b
                }
            }
        }
    },
    disable: function (b) {
        if (b && !this.disabled) {
            this.disabled = true;
            addClass(this.container, "disabled");
            var a = getSize(this.container);
            if (this.options.disabledText) {
                this.input.value = ""
            }
            this.container.appendChild(ce("div", {
                className: "hide_mask"
            }, {
                position: "absolute",
                background: "#000",
                opacity: 0,
                width: a[0] + "px",
                height: a[1] + "px",
                marginTop: -a[1] + "px"
            }));
            this.input.blur();
            this.input.style.color = "";
            this.select.hide()
        } else {
            if (!b && this.disabled) {
                this.disabled = false;
                if (this.options.autocomplete) {
                    this.input.value = ""
                }
                removeClass(this.container, "disabled");
                this.container.removeChild(geByClass("hide_mask", this.container)[0])
            }
        }
        this.updatePlaceholder()
    },
    _clear: function () {
        this.showImage();
        if (this.options.multiselect) {
            this.selectedTokenId = 0;
            this.selectedItemsContainer.innerHTML = "";
            this.defaultList = false
        }
        if (!this.options.multiselect && !this.options.autocomplete) {
            if (this._selectedItems[0] != this.options.defaultItems[0]) {
                this._selectItem(this.options.defaultItems[0], false)
            }
        } else {
            removeClass(this.input, "selected");
            this.resultField.value = "";
            this._selectedItems.splice(0, this._selectedItems.length)
        }
        return false
    },
    setURL: function (a) {
        if (typeof (a) == "string") {
            this.dataURL = a;
            if (!this.cache) {
                this.cache = new Cache(this.options)
            } else {
                this.cache.flush()
            } if (this.indexer) {
                delete this.indexer
            }
            this.dataItems = []
        }
    },
    setData: function (b) {
        if (!isArray(b)) {
            return
        }
        if (!this.options.autocomplete) {
            this.select.clear();
            this.options.defaultItems = b;
            if (!this.options.multiselect) {
                if (!this._selectedItems.length && this.options.defaultItems.length) {
                    this._selectItem(this.options.defaultItems[0], false)
                } else {
                    if (this._selectedItems.length) {
                        var d = false;
                        for (var a in this.options.defaultItems) {
                            var c = this.options.defaultItems[a][0] || this.options.defaultItems[a];
                            if (c == this._selectedItems[0][0] || c == this._selectedItems[0][0]) {
                                d = true;
                                break
                            }
                        }
                        if (!d) {
                            this._selectItem(this.options.defaultItems[0], false)
                        } else {
                            this._selectItem(this._selectedItems[0][0], false)
                        }
                    }
                }
            }
        } else {
            this.dataItems = b;
            this.dataURL = null
        } if (!this.indexer) {
            this.indexer = new Indexer(b)
        } else {
            this.indexer.setData(b)
        } if (this.cache) {
            delete this.cache
        }
    },
    focus: function () {
        if (!this.readOnly) {
            this.input.focus()
        }
    },
    selectItem: function (b, a) {
        this._selectItem(b, a)
    },
    setOptions: function (c) {
        c = this.prepareOptionsText(c);
        extend(this.options, c);
        if ("maxItems" in c && this.options.maxItems >= 0) {
            for (var b = this._selectedItems.length - 1; b >= this.options.maxItems; b--) {
                this.removeTagData(this._selectedItems[b][0])
            }
        }
        if ("defaultItems" in c) {
            this.select.clear();
            if (this.select.isVisible(this.container)) {
                this.showDefaultList()
            }
        }
        if ("enableCustom" in c) {
            if (this.options.enableCustom && !this.options.autocomplete) {
                this.options.autocomplete = c.autocomplete = true
            }
        }
        if ("width" in c) {
            this.container.style.width = this.options.width + "px";
            this.resultList.style.width = this.resultListShadow.style.width = this.options.width + "px";
            this.selectorWidth = this.options.width - this.scrollbarWidth
        }
        if ("dropdown" in c) {
            var a = geByClass("selector_dropdown", this.container)[0];
            if (!this.options.dropdown && a) {
                this.destroyDropdown();
                a.parentNode.removeChild(a)
            } else {
                if (!a && this.options.dropdown) {
                    a = this.container.firstChild.rows[0].insertCell(1);
                    a.id = "dropdown" + this.guid;
                    a.className = "selector_dropdown";
                    a.innerHTML = "&nbsp;";
                    this.dropdownButton = a;
                    this.initDropdown();
                    this.initDropdownEvents()
                }
            }
        }
        if ("autocomplete" in c) {
            if (this.options.autocomplete) {
                removeClass(this.container, "dropdown_container");
                this.input.readOnly = false;
                this.readOnly = ""
            } else {
                addClass(this.container, "dropdown_container");
                this.input.readOnly = true;
                this.options.enableCustom = false;
                this.readOnly = 'readonly="true"'
            }
        }
        if (("width" in c) || ("autocomplete" in c) || ("dropdown" in c) || ("placeholder" in c) || ("disabledText" in c)) {
            this.updateInput()
        }
    },
    val: function (b, a) {
        if (b !== undefined) {
            this._selectItem(b, (a === undefined) ? false : a)
        }
        return this.resultField.value
    },
    val_full: function () {
        if (this.options.multiselect) {
            return this._selectedItems
        } else {
            if (this._selectedItems.length) {
                return this._selectedItems[0]
            } else {
                return [this.resultField.value, this.input.value]
            }
        }
    },
    customVal: function (b, a) {
        if (b !== undefined) {
            this.customField.value = b;
            this.selectItem([this.options.valueForCustom, b], (a === undefined) ? false : a)
        }
        return this.customField.value
    },
    selectedItems: function () {
        return this._selectedItems
    },
    clear: function () {
        this._clear();
        this.updateInput()
    }
});
createChildClass("Select", UiControl, {
    common: {
        _sel: window.Select && Select._sel || [],
        reg: function (a) {
            this._sel.push(a);
            return this._sel.length
        },
        destroy: function (a) {
            this._sel[a - 1] = false
        },
        itemMouseMove: function (b, a, c) {
            this._sel[b - 1].onMouseMove(a, c)
        },
        itemMouseDown: function (b, a, c) {
            this._sel[b - 1].onMouseDown(a, c)
        }
    },
    CSS: {
        FIRST: "first",
        LAST: "last",
        ACTIVE: "active",
        SCROLLABLE: "result_list_scrollable"
    },
    controlName: "SelectList",
    initOptions: function (a, c, b) {
        this.options = b || {}
    },
    init: function (a, c, b) {
        this.container = a;
        this.shadow = c;
        this.active = -1;
        this.data = [];
        this.uid = this.common.reg(this);
        this.maxHeight = this.options.height ? this.options.height : 250
    },
    initDOM: function () {
        this.list = ce("ul");
        this.container.appendChild(this.list)
    },
    show: function (e) {
        var d = isVisible(this.container);
        if (!d) {
            this.performShow()
        }
        var c;
        var b;
        if (e) {
            for (b = 0; b < this.list.childNodes.length; b++) {
                c = this.list.childNodes[b];
                if (c.getAttribute("val") == e) {
                    this.highlight(b, c);
                    break
                }
            }
        } else {
            if (this.options.selectFirst) {
                var f = false;
                var a;
                for (b = 0; b < this.list.childNodes.length; b++) {
                    a = f ? this.list.childNodes.length - 1 - b : b;
                    c = this.list.childNodes[a];
                    if (!c.getAttribute("dis")) {
                        this.highlight(a, c);
                        break
                    }
                }
            }
        } if (!d && isFunction(this.options.onShow)) {
            this.options.onShow()
        }
    },
    hide: function () {
        if (!isVisible(this.container)) {
            return
        }
        hide(this.container);
        hide(this.shadow);
        if (isFunction(this.options.onHide)) {
            this.options.onHide()
        }
        this.highlight(-1);
        if (isFunction(this.options.onItemActive)) {
            this.options.onItemActive()
        }
    },
    handleKeyEvent: function (a) {
        if (!isVisible(this.container)) {
            return true
        }
        switch (a.keyCode) {
            case KEY.UP:
                this.movePosition(-1);
                return cancelEvent(a);
                break;
            case KEY.DOWN:
                this.movePosition(1);
                return cancelEvent(a);
                break;
            case KEY.TAB:
                this.hide();
                break;
            case KEY.RETURN:
                if (isFunction(this.options.onItemSelect) && this.active > -1) {
                    this.options.onItemSelect(this.selectedItem(), undefined, true)
                }
                cancelEvent(a);
                return false;
                break;
            case KEY.ESC:
                this.hide();
                return false;
                break;
            case KEY.PAGEUP:
            case KEY.PAGEDOWN:
                return false;
                break
        }
        return true
    },
    clear: function () {
        this.highlight(-1);
        this.list.innerHTML = "";
        this.updateContainer()
    },
    destroy: function () {
        this.clear();
        Select.destroy(this.uid)
    },
    selectedItem: function () {
        if (this.active >= 0) {
            var a = this.list.childNodes[this.active];
            var b = a.getAttribute("val") || a.innerHTML;
            return b
        }
        return undefined
    },
    movePosition: function (c) {
        var b = intval(this.active) + intval(c);
        if (b < 0) {
            this.container.scrollTop = 0
        } else {
            if (b + 1 > this.list.childNodes.length) {
                this.container.scrollTop = this.list.offsetTop + this.list.offsetHeight - this.container.offsetHeight
            }
        }
        while (1) {
            if (b + 1 > this.list.childNodes.length || b < 0) {
                if (this.options.cycle) {
                    break
                } else {
                    return false
                }
            }
            var a = this.list.childNodes[b];
            if (a && !a.getAttribute("dis")) {
                break
            }
            b++
        }
        this.highlight(b, this.list.childNodes[b]);
        return true
    },
    highlight: function (a, b) {
        if (this.active != -1) {
            removeClass(this.list.childNodes[this.active], this.CSS.ACTIVE)
        }
        if (!b) {
            this.active = -1;
            return
        }
        this.active = a;
        addClass(b, this.CSS.ACTIVE);
        if (isFunction(this.options.onItemActive)) {
            this.options.onItemActive(b.getAttribute("val") || b.innerHTML)
        }
        if (b.offsetTop + b.offsetHeight + this.list.offsetTop > this.container.offsetHeight + this.container.scrollTop - 1) {
            this.container.scrollTop = b.offsetTop + this.list.offsetTop + b.offsetHeight - this.container.offsetHeight + 1
        } else {
            if (b.offsetTop + this.list.offsetTop < this.container.scrollTop) {
                this.container.scrollTop = b.offsetTop + this.list.offsetTop
            }
        }
    },
    onMouseMove: function (a, b) {
        if (hasClass(b, "active")) {
            return false
        }
        this.highlight(a, b);
        return true
    },
    onMouseDown: function (a, b) {
        var c = b.getAttribute("val") || b.innerHTML;
        if (isFunction(this.options.onItemSelect)) {
            this.options.onItemSelect(c, undefined, true)
        }
        this.hide()
    },
    updateContainer: function () {
        var b = this.container && hasClass(this.container, "reverse");
        if (this.maxHeight < this.list.offsetHeight) {
            this.container.style.height = this.maxHeight + "px";
            if (b) {
                hide(this.shadow)
            } else {
                show(this.shadow);
                this.shadow.style.marginTop = (this.maxHeight + 1) + "px"
            }
            addClass(this.container, this.CSS.SCROLLABLE)
        } else {
            removeClass(this.container, this.CSS.SCROLLABLE);
            this.container.style.height = "auto";
            var a = intval(this.list.offsetHeight) + intval(this.list.offsetTop);
            if (a && !b) {
                show(this.shadow);
                this.shadow.style.marginTop = a + "px"
            } else {
                hide(this.shadow)
            }
        }
    },
    content: function (j) {
        var f = [];
        var e, c, l, m, h, k, b;
        var g = j.length;
        for (e = 0; e < g; ++e) {
            c = j[e];
            l = c[0];
            m = c[1];
            h = c[2];
            b = this.uid + ", " + e;
            l = (l === undefined) ? "" : l.toString();
            m = ((m === undefined) ? "" : m.toString()) || l;
            f.push("<li ", !h ? 'onmousemove="Select.itemMouseMove(' + b + ', this)" onmousedown="Select.itemMouseDown(' + b + ', this)"' : 'dis="1"', ' val="', l.replace(/&/g, "&amp;").replace(/"/g, "&quot;"), '" class="', (h ? "disabled " : ""), ((e == g - 1) ? (this.CSS.LAST + " ") : ""), (e ? "" : this.CSS.FIRST) + '">', m, "</li>")
        }
        this.list.innerHTML = f.join("");
        this.updateContainer();
        return true
    },
    removeItem: function (e) {
        var f;
        var b = this.list.childNodes;
        var a = b.length;
        var c;
        if (e === f) {
            return
        }
        for (c = 0; c < a; ++c) {
            var d = b[c];
            if (d.getAttribute("val") != e && d.innerHTML != e) {
                continue
            }
            d.setAttribute("dis", "1");
            hide(d);
            break
        }
        for (c = 0; c < a; ++c) {
            if (isVisible(b[c])) {
                addClass(b[c], this.CSS.FIRST);
                break
            }
        }
        for (c = a; c > 0; --c) {
            if (isVisible(b[c - 1])) {
                addClass(b[c - 1], this.CSS.LAST);
                break
            }
        }
        this.updateContainer()
    },
    performShow: function () {
        this.list.style.position = "absolute";
        this.list.style.visibility = "hidden";
        show(this.container);
        show(this.shadow);
        this.updateContainer();
        this.list.style.position = "relative";
        this.list.style.visibility = "visible"
    },
    isVisible: function () {
        return isVisible(this.container)
    },
    hasItems: function () {
        return this.list.childNodes.length > 0
    },
    toggle: function () {
        if (this.isVisible(this.container)) {
            this.hide()
        } else {
            this.show()
        }
    }
});
createChildClass('Indexer', UiUtil, {
    defaultOptions: {
        chars: 2,
        delimeter: /[\s\(\)\.,\-]+/
    },
    componentName: 'Indexer',
    initOptions: function (data, options) {
        this.options = extend({}, this.defaultOptions, {
            indexkeys: [1]
        }, options);
    },
    init: function (data) {
        this.setData(data);
    },
    setData: function (data) {
        delete this.storage;
        this.storage = {
            data: clone(data),
            index: {}
        };
        clearTimeout(this.indexTimer);
        this.indexTimer = setTimeout(this.createIndex.bind(this), 10);
    },
    createIndex: function () {
        if (!this.storage.data.length) return;
        this.storage.index = {};
        each(this.storage.data, this.indexItem.bind(this));
    },
    indexItem: function (k, v) {
        var i, j, current_words = '',
            index_key, already_indexed = {};
        for (i = 0; i < this.options.indexkeys.length; i++) {
            if (!v[this.options.indexkeys[i]]) continue;
            current_words += ' ' + v[this.options.indexkeys[i]].toString().replace(this.options.delimeter, ' ').replace(/<[^>]*>/, '');
        }
        current_words = trim(winToUtf(current_words).toLowerCase()).split(/\s+/);
        for (i = 0; i < current_words.length; i++) {
            for (j = 1; j <= this.options.chars; j++) {
                index_key = current_words[i].substr(0, j);
                if (already_indexed[index_key]) {
                    continue;
                }
                already_indexed[index_key] = 1;
                if (this.storage.index[index_key] === undefined) this.storage.index[index_key] = [];
                this.storage.index[index_key].push(k);
            }
        }
    },
    search: function (pattern) {
        pattern = trim(pattern.toLowerCase().replace(this.options.delimeter, ' '));
        var self = this;
        if (!pattern) {
            return self.storage.data;
        }
        if (pattern.length <= this.options.chars && pattern.indexOf(' ') == -1) {
            var retArr = [];
            each((this.storage.index[pattern] || []), function () {
                retArr.push(self.storage.data[this]);
            });
            return retArr;
        }
        pattern = pattern.split(' ');
        var min_size = 0,
            min_pattern = '';
        each(pattern, function () {
            var items = self.storage.index[this.substr(0, self.options.chars)];
            if (!min_pattern || !items || items.length < min_size) {
                min_size = items ? items.length : 0;
                min_pattern = this.substr(0, self.options.chars);
            }
            return !min_size;
        });
        var ret_arr = [];
        if (!min_size) return ret_arr;
        each(self.storage.index[min_pattern.substr(0, self.options.chars)], function (k, v) {
            var item = self.storage.data[v];
            var i, fail = false,
                current_words = '',
                index_key;
            for (i = 0; i < self.options.indexkeys.length; i++) {
                current_words += ' ' + item[self.options.indexkeys[i]].replace(self.options.delimeter, ' ').replace('<b>', '').replace('</b>', '');
            }
            current_words = winToUtf(current_words).toLowerCase();
            for (i = 0; i < pattern.length; i++) {
                if (current_words.indexOf(' ' + pattern[i]) == -1) {
                    fail = true;
                    break;
                }
            }
            if (fail) return;
            ret_arr.push(item);
        });
        return ret_arr;
    },
    flush: function () {
        delete this.storage;
    }
});
createChildClass('Cache', UiUtil, {
    defaultOptions: {
        cacheLength: 100
    },
    componentName: 'Cache',
    initOptions: function (options) {
        this.options = extend({}, this.defaultOptions, options);
    },
    init: function () {
        this.storage = {};
        this.length = 0;
    },
    setData: function (key, value) {
        if (this.length > this.options.cacheLength) {
            this.flush();
        }
        if (!(key in this.storage)) {
            this.length++;
        }
        this.storage[key] = clone(value);
    },
    getData: function (key) {
        if (!this.options.cacheLength || !this.length || !(key in this.storage)) {
            return null;
        }
        return this.storage[key];
    },
    flush: function () {
        delete this.storage;
        this.storage = {};
        this.length = 0;
    }
});
createChildClass('Checkbox', UiControl, {
    // Standart fields
    CSS: {
        STANDART: 'checkbox_'
    },
    defaultOptions: {
        checkedValue: 1,
        notCheckedValue: '',
        width: 300,
        label: 'checkbox',
        circle: false
    },
    beforeInit: function () {
        this.guid = _ui.reg(this);
    },
    controlName: 'CheckBox',
    initOptions: function (input, options) {
        if (!input) return false;
        this.options = extend({}, this.defaultOptions, {
            checked: input['value'],
            resultField: input.name || input.id || 'checkbox'
        }, options);
        this.options.checked = intval(this.options.checked) ? true : false;
        this.options.width = intval(this.options.width) > 0 ? intval(this.options.width) : this.defaultOptions.width;
    },
    init: function () {
        this.disabled = false;
    },
    initDOM: function (input, options) {
        this.container = ce('div', {
            id: 'container' + this.guid,
            className: 'checkbox_container'+(this.options.circle?' checkbox_circle':''),
            innerHTML: '<table cellpadding=0 cellspacing=0><tr><td class="checkbox"><div class="checkbox_off"></div></td><td class="checkbox_label">' + this.options.label + '<input type="hidden" name="' + this.options.resultField + '" id="' + this.options.resultField + '" value="' + (this.options.checked ? this.options.checkedValue : this.options.notCheckedValue) + '"></td></tr></table>'
        }, {
            width: this.options.width + 'px'
        });
        input.parentNode.replaceChild(this.container, input);
        this.checkbox = geByClass('checkbox_off', this.container)[0];
        this.resultField = ge(this.options.resultField);
    },
    initEvents: function () {
        addEvent(this.container, 'click mouseover mouseout', this.handleMouseEvent, false, {
            'self': this
        });
    },
    afterInit: function () {
        this.setState(this.options.checked, false, true);
    },
    destroy: function () {
        if (this.destroyed) return;
        removeEvent(this.container, 'click mouseover mouseout', this.handleMouseEvent);
        this.destroyed = true;
    },
    show: function () {
        show(this.container);
    },
    hide: function () {
        hide(this.container);
    },
    // extended methods
    handleMouseEvent: function (e) {
        if (e.type == 'click') {
            if (!e.data.self.disabled) {
                e.data.self.setState(!e.data.self.options.checked);
            }
        } else {
            e.data.self.is_over = (e.type == 'mouseover');
            e.data.self.updateClass();
        }
    },
    disable: function (value) {
        if (value && !this.disabled) {
            this.disabled = true;
            addClass(this.container, 'disabled');
        } else if (!value && this.disabled) {
            this.disabled = false;
            removeClass(this.container, 'disabled');
        }
    },
    updateClass: function () {
        this.checkbox.className = 'checkbox_' + (this.options.checked ? 'on' : 'off') + (this.is_over ? '_over' : '');
    },
    setState: function (checked, fireEvent, forceUpdate) {
        if (fireEvent === undefined) fireEvent = true;
        if (forceUpdate === undefined) forceUpdate = false;
        checked = checked ? true : false;
        if (this.options.checked == checked && !forceUpdate) {
            return;
        }
        this.options.checked = checked;
        this.updateClass();
        this.resultField.value = this.options.checked ? this.options.checkedValue : this.options.notCheckedValue;
        if (fireEvent && isFunction(this.options.onChange)) {
            this.options.onChange(this.resultField.value);
        }
    },
    // shortcuts
    setOptions: function (new_options) {
        extend(this.options, new_options);
        if (('checked' in new_options) || ('checkedValue' in new_options) || ('notCheckedValue' in new_options)) {
            this.setState(this.options.checked, false, true);
        }
    },
    checked: function (value) {
        if (value !== undefined) this.setState(value);
        return this.options.checked;
    },
    val: function () {
        return this.resultField.value;
    }
});
createChildClass('Radiobutton', UiControl, {
    // Static class fields
    common: {
        _radio_buttons: {},
        _callbacks: {},
        // static methods
        deselect: function (name) {
            for (var i = 0; i < this._radio_buttons[name].length; ++i) {
                this._radio_buttons[name][i].checked(false);
            }
        },
        select: function (name, value) {
            for (var i = 0; i < this._radio_buttons[name].length; ++i) {
                if (this._radio_buttons[name][i].val() == value) {
                    this._radio_buttons[name][i].checked(true);
                    return;
                }
            }
        },
        setChangeEvent: function (name, callback) {
            if (isFunction(callback)) this._callbacks[name] = callback;
            else delete(this._callbacks[name]);
        }
    },
    CSS: {
        STANDART: 'radiobutton_',
        CONTAINER: 'radiobtn_container'
    },
    defaultOptions: {
        checked: false,
        width: 300,
        label: 'radiobutton'
    },
    controlName: 'Radiobutton',
    beforeInit: function () {
        this.guid = _ui.reg(this);
    },
    initOptions: function (input, options) {
        if (!input) return false;
        this.options = extend({}, this.defaultOptions, {
            value: input.value,
            resultField: input.name || 'radiobutton'
        }, options);
        this.options.checked = intval(this.options.checked) ? true : false;
        this.options.width = intval(this.options.width) > 0 ? intval(this.options.width) : this.defaultOptions.width;
    },
    init: function () {
        this.disabled = false;
        this.is_over = false;
        this.inputName = this.options.resultField;
    },
    initDOM: function (input, options) {
        this.container = ce('div', {
            id: 'container' + this.guid,
            className: this.CSS.CONTAINER,
            innerHTML: '<table cellpadding=0 cellspacing=0><tr><td class="radiobtn"><div class="radiobtn_off"><div></div></div></td><td class="radiobtn_label">' + this.options.label + '<input type="radio" id="' + input.id + '" name="' + this.options.resultField + '" value="' + (this.options.checked ? 'checked="true"' : '') + '"></td></tr></table>'
        }, {
            width: this.options.width + 'px'
        });
        input.parentNode.replaceChild(this.container, input);
        this.radiobutton = geByClass('radiobtn_off', this.container)[0];
        this.resultField = this.container.getElementsByTagName('input')[0];
        this.resultField.value = this.options.value;
    },
    initEvents: function () {
        addEvent(this.container, 'click mouseover mouseout', this.handleMouseEvent, false, {
            'self': this
        });
    },
    afterInit: function () {
        if (!isArray(this.common._radio_buttons[this.inputName])) {
            this.common._radio_buttons[this.inputName] = [];
        }
        this.common._radio_buttons[this.inputName].push(this);
        this.setState(this.options.checked, false, true);
    },
    destroy: function () {
        if (this.destroyed) return;
        for (var i = 0; i < this.common._radio_buttons[this.inputName].length; ++i) {
            if (this.common._radio_buttons[this.inputName][i] === this) {
                this.common._radio_buttons[this.inputName].splice(i, 1);
                break;
            }
        }
        if (!this.common._radio_buttons[this.inputName].length) {
            delete this.common._radio_buttons[this.inputName];
            this.common.setChangeEvent(this.inputName);
        }
        removeEvent(this.container, 'click mouseover mouseout', this.handleMouseEvent);
        this.destroyed = true;
    },
    handleMouseEvent: function (e) {
        var t = e.data.self;
        if (e.type == 'click') {
            if (!t.disabled && !t.options.checked) {
                t.setState(true);
            }
        } else {
            t.is_over = (e.type == 'mouseover');
            t.updateClass();
        }
    },
    disable: function (value) {
        if (value && !this.disabled) {
            this.disabled = true;
            addClass(this.container, 'disabled');
        } else if (!value && this.disabled) {
            this.disabled = false;
            removeClass(this.container, 'disabled');
        }
    },
    updateClass: function () {
        this.radiobutton.className = 'radiobtn_' + (this.options.checked ? 'on' : 'off') + (this.is_over ? '_over' : '');
    },
    setState: function (checked, fireEvent, forceUpdate) {
        if (fireEvent === undefined) fireEvent = true;
        forceUpdate = forceUpdate || false;
        checked = checked ? true : false;
        if (this.options.checked == checked && !forceUpdate)
            return;
        if (checked)
            this.common.deselect(this.inputName);
        this.options.checked = checked;
        this.updateClass();
        this.resultField.checked = checked;
        if (fireEvent) {
            if (this.options.checked && isFunction(this.options.onSelect))
                this.options.onSelect(this.resultField.value);
            if (isFunction(this.options.onChange))
                this.options.onChange(this.resultField.value, checked);
            if (checked) {
                if (isFunction(this.common._callbacks[this.inputName])) this.common._callbacks[this.inputName](this.resultField.value);
            }
        }
    },
    setOptions: function (new_options) {
        extend(this.options, new_options);
        if (('checked' in new_options)) {
            this.setState(this.options.checked, false);
        }
    },
    checked: function (value) {
        if (value !== undefined) this.setState(value);
        return this.options.checked;
    },
    val: function () {
        return this.resultField.value;
    }
});

function Radiobuttons(input, buttons, options) {
    var id = input.id;
    Radiobutton._radio_buttons[id] = [];
    Radiobutton._callbacks[id] = [];
    each(buttons, function (i, v) {
        new Radiobutton(ge(id + v[0]), {
            label: v[1],
            width: options.width,
            resultField: id
        });
    });
    Radiobutton.select(id, options.selected !== undefined ? options.selected : input.value);
    Radiobutton.setChangeEvent(id, function (value) {
        input.value = value;
        if (isFunction(options.onChange)) {
            options.onChange(value);
        }
    });
}
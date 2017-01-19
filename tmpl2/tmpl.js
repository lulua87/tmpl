;
(function($) {
    'use strict'
    // str可以是模板，也可以是模板元素的id。data是需要被替换的json对象。
    // data可以不传，这时tmpl返回的是一个转化json对象的工具函数。
    var tmpl = function(str, data) {
        // /[^\w\-\.:]/检查str是否是id
        // 如果不是，说明str是模板，就通过这个模板返回new Function(){}
        // 如果是id，先检查缓存里是否有相应的函数
        // 没有缓存的话，就调用自身，传入模板元素里的innerHTML
        var f = !/[^\w\-\.:]/.test(str) ? tmpl.cache[str] = tmpl.cache[str] || tmpl(tmpl.load(str)) : new Function(
            tmpl.arg + ',tmpl',
            'var _e=tmpl.encode' + tmpl.helper + ",_s='" +
            str.replace(tmpl.regexp, tmpl.func) + "';return _s;"
        )
        return data ? f(data, tmpl) : function(data) {
            return f(data, tmpl)
        }
    }
    tmpl.cache = {}
    tmpl.load = function(id) {
        var element = document.getElementById(str);
        var html = /^(textarea|input)$/i.test(element.nodeName) ? element.value : element.innerHTML;
        return html
    }

    tmpl.regexp = /([\s'\\])(?!(?:[^{]|\{(?!%))*%\})|(?:\{%(=|#)([\s\S]+?)%\})|(\{%)|(%\})/g
    tmpl.func = function(s, p1, p2, p3, p4, p5) {
        if (p1) { // whitespace, quote and backspace in HTML context
            return {
                '\n': '\\n',
                '\r': '\\r',
                '\t': '\\t',
                ' ': ' '
            }[p1] || '\\' + p1
        }
        if (p2) { // interpolation: {%=prop%}, or unescaped: {%#prop%}
            if (p2 === '=') {
                return "'+_e(" + p3 + ")+'"
            }
            return "'+(" + p3 + "==null?'':" + p3 + ")+'"
        }
        if (p4) { // evaluation start tag: {%
            return "';"
        }
        if (p5) { // evaluation end tag: %}
            return "_s+='"
        }
    }
    tmpl.encReg = /[<>&"'\x00]/g
    tmpl.encMap = {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        "'": '&#39;'
    }
    tmpl.encode = function(s) {
        return (s == null ? '' : '' + s).replace(
            tmpl.encReg,
            function(c) {
                return tmpl.encMap[c] || ''
            }
        )
    }
    tmpl.arg = 'o'
    tmpl.helper = ",print=function(s,e){_s+=e?(s==null?'':s):_e(s);}" +
        ',include=function(s,d){_s+=tmpl(s,d);}'
    
    // 如果是基于requirejs或者seajs，tmpl对象通过define返回。
    // 如果不是，就把它放进当前环境的tmpl对象里（如果是浏览器环境，当前的环境就是window）

    if (typeof define === 'function' && define.amd) {
        define(function() {
            return tmpl
        })
    } else if (typeof module === 'object' && module.exports) {
        module.exports = tmpl
    } else {
        $.tmpl = tmpl
    }
}(this))

// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
(function() {
    var cache = {};

    this.tmpl = function tmpl(str, data) {
        // Figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.
        // !/\W/检查str是否是id
        debugger;
        var fn = !/\W/.test(str) ?
            cache[str] = cache[str] ||
            tmpl(document.getElementById(str).innerHTML) :

            // Generate a reusable function that will serve as a template
            // generator (and which will be cached).
            new Function("obj",
                "var p=[],print=function(){p.push.apply(p,arguments);};" +

                // Introduce the data as local variables using with(){}
                "with(obj){p.push('" + (function(){
                    // Convert the template into pure JavaScript
                    // /[\r\t\n]/g匹配 \r回车 \t制表符Tab \n换行符 替换为一个空格
                   str = str.replace(/[\r\t\n]/g, " ")
                    // 用\t替换<%
                    str = str.split("<%").join("\t")
                    // 例如 name%>'\t替换为 "name%> "
                    str = str.replace(/((^|%>)[^\t]*)'/g, "$1\r")
                    // 例如 \t=name%>替换为 ',name,'
                    str = str.replace(/\t=(.*?)%>/g, "',$1,'")
                    // 用');替换\t
                    str = str.split("\t").join("');")
                    // 用p.push('替换%>
                    str = str.split("%>").join("p.push('")
                    // \\'用替换\r, 并把数组p拼接为字符串返回
                    str = str.split("\r").join("\\'");
                    return str;
                })()

                 + "');}return p.join('');");
                debugger;

        // Provide some basic currying to the user
        return data ? fn(data) : fn;
    };
})();

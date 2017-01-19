<script type="text/x-tmpl" id="tmpl-demo">
<h3>{%=o.title%}</h3>
<p>Released under the
<a href="{%=o.license.url%}">{%=o.license.name%}</a>.</p>
<h4>Features</h4>
<ul>
{% for (var i=0; i<o.features.length; i++) { %}
    <li>{%=o.features[i]%}</li>
{% } %}
</ul>
</script>

(function(o,tmpl) {
var _e=tmpl.encode,print=function(s,e){_s+=e?(s==null?'':s):_e(s);},include=function(s,d){_s+=tmpl(s,d);},_s='<h3>'+_e(o.title)+'</h3><p>Released under the<a href="'+_e(o.license.url)+'">'+_e(o.license.name)+'</a>.</p><h4>Features</h4><ul>'; for (var i=0; i<o.features.length; i++) { _s+='<li>'+_e(o.features[i])+'</li>'; } _s+='</ul>';return _s;
})
/*
* withdraw
一、无法正确处理转义字符，如：
tmpl('<%=name%>\\<%=id%> ', {name:'糖饼', id: '1987'});
它就会报错。若正常工作，它应该输出：糖饼\1987
实际上解决起来很简单，添加一行正则对转义符进行转义：
str.replace(/\\/g, "\\\\")
二、它有时候无法正确区分第一个参数是ID还是模板。
假若页面模板ID带有下划线，如 tmpl-photo-thumb 它不会去查找这个名称的模板，会认为这传入的是原始模板直接编译输出。
原始模板与元素id最直观的区别就是是否含有空格，因此改动下正则表达式即可：
!/\s/.test(str)
*/
<script type="text/html" id="item_tmpl">
  <div id="<%=id%>" class="<%=(i % 2 == 1 ? " even" : "")%>">
    <div class="grid_1 alpha right">
      <img class="righted" src="<%=profile_image_url%>"/>
    </div>
    <div class="grid_6 omega contents">
      <p><b><a href="/<%=from_user%>"><%=from_user%></a>:</b> <%=text%></p>
    </div>
  </div>
</script>

<script type="text/html" id="user_tmpl">
  <% for ( var i = 0; i < users.length; i++ ) { %>
    <li><a href="<%=users[i].url%>"><%=users[i].name%></a></li>
  <% } %>
</script>
var dataObject = {users: [{url: 'XXX', name:'123'},{url: '$$$', name:'234'}]};
var results = document.getElementById("results");
results.innerHTML = tmpl("user_tmpl", dataObject);

(function(obj) {
var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push(''); for ( var i = 0; i < users.length; i++ ) { p.push('<li><a href="',users[i].url,'">',users[i].name,'</a></li>'); } p.push('');}return p.join('');
})
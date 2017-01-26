define(['handlebars.runtime'], function(Handlebars) {
  Handlebars = Handlebars["default"];  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
return templates['swimmer'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class = \"swimmerContainer\">\n    <img src=\""
    + alias4(((helper = (helper = helpers.Photo || (depth0 != null ? depth0.Photo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Photo","hash":{},"data":data}) : helper)))
    + "\"/>\n    <ul>\n        <li>"
    + alias4(((helper = (helper = helpers.Name || (depth0 != null ? depth0.Name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Name","hash":{},"data":data}) : helper)))
    + "</li>\n        <li>"
    + alias4(((helper = (helper = helpers.RFID_Tag || (depth0 != null ? depth0.RFID_Tag : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"RFID_Tag","hash":{},"data":data}) : helper)))
    + "</li>\n    </ul>\n\n    <button class=\"delete\">Delete</button>\n</div>\n</div>";
},"useData":true});
});
define(['handlebars'], function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["./public/views/addSwimmer.handlebars"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"swimmer\">\n    <form id=\"addSwimmer\" action=\"#\">\n        <div>\n            <label for=\"Photo\">"
    + alias4(((helper = (helper = helpers.Photo || (depth0 != null ? depth0.Photo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Photo","hash":{},"data":data}) : helper)))
    + ": </label><input id=\"Photo\" type=\"file\" />\n            <label for=\"Name\">"
    + alias4(((helper = (helper = helpers.Name || (depth0 != null ? depth0.Name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Name","hash":{},"data":data}) : helper)))
    + ": </label><input id=\"Name\" type=\"text\"/>\n            <label for=\"RFID Tag\">"
    + alias4(((helper = (helper = helpers.RFID_Tag || (depth0 != null ? depth0.RFID_Tag : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"RFID_Tag","hash":{},"data":data}) : helper)))
    + ": </label><input id=\"RFID Tag\" type=\"text\" />\n            <button id=\"add\">Add</button>\n        </div>\n    </form>\n</div>";
},"useData":true});

this["JST"]["./public/views/error.handlebars"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h1>Something went wrong, check the console</h1>";
},"useData":true});

this["JST"]["./public/views/layouts/main.handlebars"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<!DOCTYPE html>\n<html>\n<head>\n    <meta charset=\"utf-8\">\n    <title>Example App</title>\n</head>\n<body>\n\n"
    + ((stack1 = ((helper = (helper = helpers.body || (depth0 != null ? depth0.body : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"body","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n\n</body>\n</html>";
},"useData":true});

this["JST"]["./public/views/swimmer.handlebars"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class = \"swimmerContainer\">\n    <img src=\""
    + alias4(((helper = (helper = helpers.Photo || (depth0 != null ? depth0.Photo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Photo","hash":{},"data":data}) : helper)))
    + "\"/>\n    <ul>\n        <li>"
    + alias4(((helper = (helper = helpers.Name || (depth0 != null ? depth0.Name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Name","hash":{},"data":data}) : helper)))
    + "</li>\n        <li>"
    + alias4(((helper = (helper = helpers.RFID_Tag || (depth0 != null ? depth0.RFID_Tag : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"RFID_Tag","hash":{},"data":data}) : helper)))
    + "</li>\n    </ul>\n\n    <button class=\"delete\">Delete</button>\n</div>\n</div>";
},"useData":true});

return this["JST"];

});
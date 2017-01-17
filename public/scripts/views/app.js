define(['hbs!../../views/home'], function(myTemplateHome) {
        document.body.innerHTML = myTemplateHome({test: 'This is from RequireJS!'});
    });

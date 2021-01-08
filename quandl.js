var Quandl = require("quandl");

var quandl = new Quandl({
    auth_token: "",
});

quandl.dataset({ source: "ETFG", table: "FUND" }, function(err, response){
    if(err)
        throw err;

    console.log(response);
});

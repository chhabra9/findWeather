const express=require("express")
const http=require("http");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
// var url="http://api.openweathermap.org/data/2.5/weather?q=dewas&units=metric&appid=6ed7f65cf21cfe0f7cf28656f5de17ff";
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res){
    var city=req.body.cityName;
    var url="http://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=6ed7f65cf21cfe0f7cf28656f5de17ff";
    http.get(url,function(response){
        response.on('data',function(data){
                var obj=JSON.parse(data);
                var temp=obj.main.temp;
                var weatherDes=obj.weather[0].description;
                var weatherIcon=obj.weather[0].icon;
                var url= "http://openweathermap.org/img/wn/"+weatherIcon+"@2x.png"
                res.write("<p> the weather in "+city+"is currently "+weatherDes+"</p> ");
                res.write("<h1>the temprature in "+city+"is "+temp+" degree celcius</h1>");
                res.write("<img src='"+url+"'>");
                res.send();
        })
    })
})
app.listen(3000,function(){
    console.log("server is running on port 3000");

})

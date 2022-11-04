const express = require ("express");
const bodyParser = require ("body-parser");
const https = require ("https");
const ejs = require ("ejs");
const _ = require ("lodash");
const func = require (__dirname+"/function.js");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

var slokaTelugu = "";

app.get("/", function(req,res){
    res.render("home");
})

app.get("/about", function(req,res){
    res.render("about");
})

app.post("/sloka", function(req,res){
    // console.log(req.body);
    let chapter_number = req.body.chapter_number;
    let sloka_number = req.body.sloka_number;
    const api_url = "https://bg-express-api.herokuapp.com/getSlok?book=bhagavad_gita&lang=telugu&chapter="+chapter_number+"&slok="+sloka_number;
    https.get(api_url, function(response){
        console.log(response.statusCode);
        if(response.statusCode === 200){
            response.on("data", function(dataresponse){
                let result = JSON.parse(dataresponse);
                slokaTelugu = result.value;
                res.render("sloka", {slokaTelugu : slokaTelugu});
            })
        }else{
            res.render("error");
        }
    })
})

app.listen(3000, function(){
    console.log("server is running at port 3000:")
})
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var express = require("express");

var app = express();

mongoose.connect("mongodb://localhost/restful_blog_app");
app.use(bodyParser.urlencoded({extended :true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
// 	title:"Blog about dogs",
// 	image:"https://images.unsplash.com/photo-1446730853965-62433e868929?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=466e80764d1b6ee8c988c1f5163e80a8&auto=format&fit=crop&w=750&q=80",
// 	body:"This is my first Blog post"
// }, function(err, blog){
// 	if(err){
// 		console.log(err);
// 	} else{
// 		console.log("create campground");
// 	}
// });

app.get("/", function(req,res){
	res.redirect("/blogs");
});

//INDEX ROUTE
app.get("/blogs", function(req,res){
	Blog.find({}, function(err,blogs){
		if(err){
			console.log(err);
		} else{
			res.render("index", { blogs:blogs });
		}
	});
});

//NEW ROUTE
app.get("/blogs/new", function(req,res){
	res.render("new");
});

//CREATE ROUTE
app.post("/blogs", function(req,res){
	Blog.create(req.body.blog, function(err,newBlog){
		if(err){
			res.render("new");
		}
		else{
			res.redirect("/blogs");
		}
	});
});

app.listen(3000, function() {
    console.log("Server has started");
});

// Filename - index.js

// Importing the http module
const sqlite= require("sqlite3")
const express = require("express");
const path = require('path');
const PORT =  8080;
const app = express();



const db = new sqlite.Database("all.db", (err) => {
  console.log("Connected to: all.db");
  if (err) {
    console.error(err.message);
  }
 
});

var goals = {};

db.serialize(function() {
  //console.log("Server is Running"+db);
  db.each("SELECT * FROM blocks", (err, row) => {
	 if (err) {
		console.error(err.message);
	 }
 
     console.log(row.name + ": " + row.render);
  });
  
   db.each("SELECT * FROM goals", (err, row) => {
	 if (err) {
		console.error(err.message);
	 }
     goals[row.name] = row;
    
  });
   console.log(goals);
});

// server/index.js


app.get("/goals", (req, res) => {
	if (req.query.list != null) {
		var arr = [];
		for(g in goals) {			
			arr[arr.length] = g;
		}
		res.json(arr);
		return;
	}
	if (req.query.data != null) {
		var out = {};
		for(g in goals) {
			if (g == req.query.data) {
				out.name = goals[g].name;
				out.cols = goals[g].cols;
				out.rows = goals[g].rows;
				out.planes = goals[g].planes;
				out.hashSeeds = JSON.parse(goals[g].hashSeeds);
			    res.json(out);
			  break;
			}
		}
		
		return;
	}
	if (req.query.pict != null) {
		var out = {};
		for(g in goals) {
			if (g == req.query.pict) {
			    res.json(goals[g].pict);
			  break;
			}
		}
		
		return;
	}
	console.log(req);
	console.log(req.originalUrl);
	console.log(req.query);
	//res.json(req);
    //res.json(goals);
});



const fs = require('node:fs');
if (process.env.CODESPACE_NAME == null)
	process.env.CODESPACE_NAME = "test";
const content = process.env.CODESPACE_NAME;
fs.writeFile(__dirname+'codespace2.txt', content, err => {
  if (err) {
    console.error(err);
  } else {
    // file written successfully
  }
});

app.use(express.static(__dirname+"/"))
app.listen(PORT,(req, res) => {
	 console.log(req);
});

console.log(__dirname + "\\");
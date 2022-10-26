const express = require("express");
const path = require("path");

const port = 8000;

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());

app.use(express.static("assets"));

app.set("views", path.join(__dirname, "views"));

var todoList = [
    {
        content:
            "This is demo todo item created to test the functionality of passing a list from express js to the ejs view engine.",
        deadline: "13/12/1998 10:00:10",
        category: "Coding Ninjas",
    },

    {
        content:
            "This is second demo todo item created to test the functionality of passing a list from express js to the ejs view engine. & check if it scrolls",
        deadline: "31/05/1997 01:12:30",
        category: "Pune University",
    },
];

app.get("/", function (req, res) {
    return res.render("index", {
        todo_list: todoList,
    });
});

app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("server is up and running successfully");
    }
});

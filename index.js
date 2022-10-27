const express = require("express");
const path = require("path");
const port = 8000;

const db = require("./config/mongoose");
const TodoSchema = require("./models/todo-item");
const CategorySchema = require("./models/category-item");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());

app.use(express.static("assets"));

app.set("views", path.join(__dirname, "views"));

app.get("/", function (req, res) {
    var todoListGlobal = [];
    var categoryListGlobal = [];
    TodoSchema.find({}, function (err, todoList) {
        if (err) {
            console.log(err);
            return;
        }
        todoListGlobal = todoList;
        CategorySchema.find({}, function (err, categoryList) {
            if (err) {
                console.log(err);
                return;
            }
            categoryListGlobal = categoryList;
            return res.render("index", {
                todo_list: todoListGlobal,
                categories: categoryListGlobal,
            });
        });
    });
});

app.post("/add-category", function (req, res) {
    CategorySchema.create(req.body, function (err, newCategory) {
        if (err) {
            console.log("error creating category");
            return;
        }
        console.log("****category added****");
        return res.redirect("back");
    });
    console.log(req.body);
});

app.post("/add-task", function (req, res) {
    // todoList.push(req.body);
    console.log(req.body);
    TodoSchema.create(req.body, function (err, newTask) {
        if (err) {
            console.log("error in storing task", err);
            return;
        }
        console.log("****task added****");
        return res.redirect("back");
    });
});

app.post("/delete-task", function (req, res) {
    TodoSchema.findByIdAndDelete(req.body.post_id, function (err, res2) {
        if (err) {
            console.log("error deleting task");
            return;
        }
        console.log("deleted successfully!, ");
        return res.redirect("back");
    });
});

app.post("/delete-selected-request", function (req, res) {
    let ids = req.body.ids.split(",");
    for (var i = 0; i < ids.length; i++) {
        TodoSchema.findByIdAndDelete(ids[i], function (err, res2) {
            res = res2;
            if (err) {
                console.log("error deleting task");
                return;
            }
        });
    }
    console.log("deleted successfully!, ");
    return res.redirect("back");
});

app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("server is up and running successfully");
    }
});

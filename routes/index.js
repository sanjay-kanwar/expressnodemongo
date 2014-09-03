var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

module.exports = router;


router.get('/helloworld', function (req, res) {
    res.render("helloworld", {title: "Hello World"})
});

router.get('/userlist', function (req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({}, function (e, docs) {
        res.render('userlist', {'userlist': docs
        })
    })
});

router.get('/addnewuser', function (req, res) {
    res.render("addnewuser", {title: 'Add New User'})
});

router.post('/addUser', function (req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var db = req.db;

    var collection = db.get('usercollection');

    collection.insert({
        "username": username,
        "email": email
    }, function (err, docs) {
        if (err) {
            res.send("There was an error saving the information into db");
        }
        else {
            res.location("userlist");
            res.redirect("userlist");
        }

    })
});
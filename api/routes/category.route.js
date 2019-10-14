// Category.route.js

const express = require('express');
const app = express();
const businessRoutes = express.Router();

// Defined store route
businessRoutes.route('/add').post(function (req, res) {
  db.connect(function(err) {
    var categoryName = req.body.categoryName;
    var sql = "INSERT INTO `categories` (`categoryName`) VALUES ('"+categoryName+"');";
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).json({'msg': 'Category added successfully'});
  });
});
});

// Defined get data(index or listing) route
businessRoutes.route('/').get(function (req, res) {
  db.connect(function(err) {
    // if (err) throw err;
    db.query("SELECT id as _id, categoryName FROM categories WHERE 1", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.json(result);
    });
  });
});

// Defined edit route
businessRoutes.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;
  db.connect(function(err) {
    db.query("SELECT c.id as _id, c.categoryName as categoryName FROM categories as c WHERE c.id ="+id, function (err, result, fields) {
      if (err) throw err;
      res.json(result);
    });
  });
});

//  Defined update route
businessRoutes.route('/update/:id').post(function (req, res) {
  var id = req.params.id;
  db.connect(function(err) {
    var categoryName = req.body.categoryName;
    sql = "UPDATE categories SET categoryName ='"+categoryName+"' WHERE id ="+id;
    db.query(sql, function (err, result) {
      if (err) throw err;
      res.json({'msg': 'Category updated successfully'});
    });
  });
});

// Defined delete | remove | destroy route
businessRoutes.route('/delete/:id').get(function (req, res) {
  var id = req.params.id;
  db.connect(function(err) {
    var sql = "DELETE FROM categories WHERE id = '"+id+"'";
    db.query(sql, function (err, result) {
      if (err) throw err;
      res.json({'msg': 'Category updated successfully'});
    });
  });
});

module.exports = businessRoutes;

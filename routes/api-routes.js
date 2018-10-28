//import our db models
const db = require('../models');


//Routing

module.exports = function (app) {

    //GET request to retrieve all products
    app.get('/api/products', function (req, res) {
        db.Product.findAll({}).then(function (rows) {
            res.json(rows)
        }).catch(function (error) {
            res.json({ error: error });
        });
    });

    //POST request for adding new products
    app.post('/api/products', function (req, res) {
        db.Product.create(req.body).then(function (rows) {
            res.json({ success: true });
        }).catch(function (error) {
            res.json({ error: error })
        })
    });

    //GET request for a specefied product
    app.get('/api/products/:id', function (req, res) {
        db.Product.find({ where: { id: req.params.id } })
            .then(function (data) {
                res.json(data);
            }).catch(function (error) {
                res.json({ error: error });
            });
    });

    //PUT request to update product data
    app.put('/api/products/:id', function (req, res) {
        db.Product.update(
            req.body,
            { where: { id: req.params.id } }
        ).then(function (response) {
            res.json({ success: true });
        }).catch(function (error) {
            res.json({ error: error });
        });
    });

}
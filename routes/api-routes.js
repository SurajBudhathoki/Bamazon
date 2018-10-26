//import our db models
const db = require('../models');


//Routing

module.exports = function(app) {

    app.get('/api/products', function(req, res) {
        db.Product.findAll({}).then(function(rows) {
            res.json(rows)
        }).catch(function(error) {
            res.json({ error: error});
        });
    });

    app.post('/api/products', function(req, res) {
        db.Product.create(req.body).then(function(rows){
            res.json({ success: true});
        }).catch(function(error){
            res.json({ error: error})
        })
    });
}
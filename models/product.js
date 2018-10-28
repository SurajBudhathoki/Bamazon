module.exports = function (sequelize, DataTypes) {
    const Product = sequelize.define('Product', {
        product_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        department_name: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.INTEGER
        },
        stock_quantity: {
            type: DataTypes.INTEGER
        }

    });
    return Product;

}
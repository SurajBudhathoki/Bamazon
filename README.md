# Bamazon

Bamazon an Amazon-like storefront with the MySQL and Sequelize skills you learned this unit. The web app will take in orders from customers
and deplete stock from the store's inventory. Users are able to select available products from a dropdown list and view the product information. They can then calculate the total depending on the quantity they would like to purchase from the store. Once they decide to purchase, the quantity they chose is subtracted from that product's stock. 

## Deployment

The app is deployed to heroku and is available on the link below:

https://dry-mesa-73880.herokuapp.com/

## File Structure

```
bamazon
  - config
    - config.json
  - models
    - Product.js
    - index.js
  - public
    -js
      - app.js
    -css
      - style.css
    - index.html
  - routes
    - api-routes.js
    - html-routes.js
  - .gitignore
  - package.json
  - server.js
  ```

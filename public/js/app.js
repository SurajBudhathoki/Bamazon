
$(function() {


    //function to make an ajax call back to api to get the products
    const runProductQuery = function () {

     $.ajax({ url: '/api/products', method: 'GET'}).then(function(productList) {

        renderProducts('#productList', productList);
       

     })   

    }

    //function to render/print the data from the database to our html page
    const renderProducts = function(outputElement, dataList)
    {
        let rowsToAdd = [];
        for(let i = 0; i < dataList.length; i++) {

            //getting a reference to the productList and populating it with tables
            const output = $(outputElement);
        
        //displaying it in the HTML sections
        const listItem = $('<li class=\'list-group-item mt-4\'>');

        listItem.append(
            $('<h3>').text('Product #' + (i + 1)),
            $('<hr>'),
            $('<h2>').text('Name: ' +  dataList[i].product_name),
            $('<h2>').text('Department Name: ' +  dataList[i].department_name),
            $('<h2>').text('Price: $' +  dataList[i].price),
            $('<h2>').text('Quantity: ' +  dataList[i].stock_quantity)
        );

        output.append(listItem);

        rowsToAdd.push(createProductRow(dataList[i]));
        }

        $('#product').append(rowsToAdd);
        $('#product').val(id);


     
    }

    const createProductRow = function(product) {
        let listOption = $('<option>');
        listOption.attr('value', product.id);
        listOption.text(product.product_name);
        return listOption;
    }


    runProductQuery();


})
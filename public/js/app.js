


//function to make an ajax call back to api to get the products
const runProductQuery = function () {

    $.ajax({ url: '/api/products/', method: 'GET' }).then(function (productList) {

        renderProducts(productList);

    })

}

const findOneProduct = function () {

    const id = $(this).attr('data-id');

    $.ajax({ url: `/api/products/1`, method: 'GET' }).then(function (data) {

        render('#productInfo', data);


    })
}

//function to render information about the products from the database
const render = function (outputElement, data) {


    const output = $(outputElement);


    //displaying it in the HTML sections
    const listItem = $('<li class=\'list-group-item mt-4\'>');

    listItem.append(


        $('<h2>').text('Name: ' + data.product_name),
        $('<h2>').text('Department Name: ' + data.department_name),
        $('<h2>').text('Price: $' + data.price),
        $('<h2>').text('Available Quantity: ' + data.stock_quantity),

    );


    const inputDiv = $('<div>');

    inputDiv.append(
        $('<h4>').text('How many: '),
        $('<input>').attr('placeholder', 'Enter amount').attr('id', 'quantity')
    );


    const buttonDiv = $('<br><div>');

    buttonDiv.append(
        $('<button>').text('Calculate total').addClass('btn btn-warning total').attr('data-id', data.id), $('<br>'),
        $('<button>').text('Purchase').addClass('btn btn-primary purchase').attr('data-id', data.id)
    );

    output.append(listItem, inputDiv, buttonDiv);


    //function to calculate total price for the user
    function total() {


        input = $('#quantity').val();

        let totalPrice = input * data.price;

        $('#stuff').append(`Your total is ${totalPrice}`);
        console.log(`Your total is $${totalPrice}`);

    }


    //function to purchase an item
    const purchaseItem = function () {

        input = $('#quantity').val();


        if (input < data.stock_quantity) {

            $('#stuff').append(`Thank you for purchasing the ${data.product_name}`);
        }

        else {
            $('#stuff').append('Sorry! Stock Unavailable.');
        }



    }


    //clicking the total and purchase item buttons
    $('.total').on('click', total);
    $('.purchase').on('click', purchaseItem);


}



//function to render/print the data from the database to our html page
const renderProducts = function (dataList) {


    let rowsToAdd = [];
    for (let i = 0; i < dataList.length; i++) {
        rowsToAdd.push(createProductRow(dataList[i]));

    }

    $('#product').append(rowsToAdd);
}

//creating thr products options in the dropdown
const createProductRow = function (product) {
    let listOption = $('<option>');
    listOption.attr('value', product.id);
    listOption.text(product.product_name);
    return listOption;
}



runProductQuery();


$('#submit').on('click', findOneProduct);


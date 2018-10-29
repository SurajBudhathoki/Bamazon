
//function to make an ajax call to the db to get the products in the dropdown
const runProductQuery = function () {

    $.ajax({ url: '/api/products/', method: 'GET' }).then(function (productList) {

        renderProducts(productList);


    })

}

//function to grab each product infromation from the database
const findOneProduct = function () {

    const id = $('#product').val();

    $.ajax({ url: `/api/products/${id}`, method: 'GET' }).then(function (data) {


        render('#productInfo', data);


    });
    $('#productInfo').empty();
}


//function to render information about the products from the database
const render = function (outputElement, data) {

    $('.container1').hide();
    $('#product').hide();
    $('#submit').hide();

    const output = $(outputElement);

    const home = $('<button>').text('Back to Product Selection').addClass('btn btn-success home');

    const divHeader = $('<div>').addClass('card-header');
    const divBody = $('<div>').addClass('card-body');

    //displaying it in the HTML sections
    divHeader.append(`<h3>Product Information</h3>`);
    const listItems = $('<p><br>');

    listItems.append(


        $('<h2>').text(data.product_name),
        $('<h3>').text('Department: ' + data.department_name),
        $('<h3>').text('Price: $' + data.price),

    );



    const inputDiv = $('<div>');

    inputDiv.append(
        $('<h4>').text('Quantity: '),
        $('<input>').attr('placeholder', 'Enter amount').attr('id', 'quantity')
    );


    const buttonDiv = $('<br><div>');

    buttonDiv.append(
        $('<button>').text('Calculate total').addClass('btn btn-success total').attr('data-id', data.id),
        $('<button>').text('Purchase').addClass('btn btn-success purchase').attr('data-id', data.id)
    );

    divBody.append(listItems, inputDiv, buttonDiv);

    output.append(home, divHeader, divBody);



    //function to calculate total price for the user
    function total() {

        input = $('#quantity').val();

        if (!input) {
            $('#totalInfo').text('Please enter quantity!');
            $("#totalModal").modal("toggle");
        }

        else {

            let totalPrice = input * data.price;

            $('#totalInfo').text(`Your total is $${totalPrice}`);
            $("#totalModal").modal("toggle");

        }

    }


    //function to purchase an item
    const purchaseItem = function () {

        input = $('#quantity').val();

        if (!input) {
            $('#purchaseInfo').text('Please enter quantity!');
            $("#purchaseModal").modal("toggle");
        }

        else {


            if (input <= data.stock_quantity) {

                $('#purchaseInfo').text(`Thank you for purchasing the ${data.product_name}`);
                $("#purchaseModal").modal("toggle");

                //subtracting users input from the stock_quantity currently in the database 
                updatedQuantity = data.stock_quantity - input;


                //getting id to make the ajax call
                const id = $(this).attr('data-id');

                //assigning the updated stock_quantity  and creating an object to send it back to the database 
                const newProduct = {
                    product_name : data.product_name,
                    department_name : data.department_name,
                    price : data.price,
                    stock_quantity : updatedQuantity
                }

                console.log(newProduct);

                //ajax call to update the stock quantity in the database
                    $.ajax({ url: `/api/products/${id}`, method: 'PUT', data: newProduct }).then(function (data) {
                              
                        if (data.success) {
                           
                            console.log(`amount left: ${newProduct.stock_quantity}`);
                        }
                
                        else {
                            console.log('The was a problem!');
                        }
                
                    })
                
                
            }

            else {
                $('#purchaseInfo').text(`Sorry! We currently only have ${data.stock_quantity} ${data.product_name} available.`);
                $("#purchaseModal").modal("toggle");
            }

        }

    }

    //function to display the previous dropdown 
    const renderHome = function () {
        $('.container1').show();
        $('#product').show();
        $('#submit').show();
        $('.home').hide();

    }

    $('#purchaseInfo').empty();
    //clicking the total and purchase item buttons
    $('.home').on('click', renderHome);
    $('.total').on('click', total);
    $('.purchase').on('click', purchaseItem);


}

$('#productInfo').empty();

//function to render/print the data from the database to our html page
const renderProducts = function (dataList) {


    let rowsToAdd = [];
    for (let i = 0; i < dataList.length; i++) {
        rowsToAdd.push(createProductRow(dataList[i]));
    }


    $('#product').append(rowsToAdd);

    $('#submit').on('click', findOneProduct);

}

//creating thr products options in the dropdown
const createProductRow = function (product) {
    let listOption = $('<option>');
    listOption.attr('value', product.id);
    listOption.text(product.product_name);
    return listOption;

}

runProductQuery();

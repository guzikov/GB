function Cart(idCart){
    Container.call(this, idCart);

    this.cartAmount = 0; //Общая стоимость
    this.cartQuantity = 0; //Количество товаров
    this.cartItems = []; //Массив товаров

//    Получаем все товары JSON при создании корзины
    this.getItemToCart();
}

Cart.prototype = Object.create(Container.prototype);
Cart.prototype.constructor = Cart;

Cart.prototype.render = function (root) {

    var $cartDiv = $('<div />', {
        id: this.id
    });

    var $h4 = $('<h4> ИТОГО </h4>');

    $h4.appendTo($cartDiv);
    $cartDiv.appendTo(root);
};

/**
 * Метод добавления товаров в корзину
 */

Cart.prototype.getItemToCart = function () {

    var appendId = '#' + this.id;

    $.get({
        url: 'https://raw.githubusercontent.com/guzikov/JSONforGB/master/cart.json',
        dataType: 'json',
        context: this,
        success: function (data) {

            var $cartData = $('<div />', {
                id: 'cart_data',
                class: 'result'
            });

            this.cartQuantity = data.cart.length;
            this.cartAmount = data.amount;

            $('#cartQuantity').text(this.cartQuantity + ' товаров в корзине');

            $cartData.append('<p> Общая сумма: &nbsp;&nbsp;' + this.cartAmount + '&#8381;' + '</p>');
            $cartData.append('<p> Всего товаров: &nbsp;&nbsp;' + this.cartQuantity + '</p>');
            $cartData.appendTo(appendId);

            for (var itemKey in data.cart){
                this.cartItems.push(data.cart[itemKey]);
            }

        }
    })
};

// Cart.prototype.addItem = function (itemId, price, quantity) {
//     var cartItem = {
//         "id_item": itemId,
//         "price": price,
//         "quantity": quantity
//     };
//
//     this.cartQuantity++;
//     this.cartAmount += price;
//     this.cartItems.push(cartItem);
//
//     this.refresh();
// };

Cart.prototype.changeCartData = function (itemId, price, quantity) {
    var cartItem = {
        "id_item": itemId,
        "price": price,
        "quantity": quantity
    };

    //Определяем, есть ли в корзине уже такой товар, если да - у
    //даляем старую запись этого товара с количеством и добавляем новую
    //(хотя в данном случае в корзине не может быть других товаров)

    for (var j = 0; j < this.cartItems.length; j++){
        if (this.cartItems[j].id_item === cartItem.id_item){
            this.cartItems.splice(j, 1);
        }
    }

    this.cartItems.push(cartItem);

    //обнуляем данные корзины
    this.cartQuantity = 0;
    this.cartAmount = 0;

    //Пересчитываем данные корзины

    for (var i = 0; i < this.cartItems.length; i++){
        this.cartAmount += this.cartItems[i].price * this.cartItems[i].quantity;
        this.cartQuantity += this.cartItems[i].quantity;
    }

    this.refresh();
};

Cart.prototype.remove = function (itemId, title, price, quantity) {
    var cartItem = {
        "id_item": itemId,
        "title": title,
        "price": price,
        "quantity": quantity
    };

    //Определяем, есть ли в корзине уже такой товар, если да - у
    //даляем старую запись этого товара с количеством и добавляем новую
    //(хотя в данном случае в корзине не может быть других товаров)

    for (var j = 0; j < this.cartItems.length; j++){
        if (this.cartItems[j].id_item === cartItem.id_item){
            this.cartItems.splice(j, 1);
        }
    }

    //обнуляем данные корзины
    this.cartQuantity = 0;
    this.cartAmount = 0;

    //Пересчитываем данные корзины

    for (var i = 0; i < this.cartItems.length; i++){
        this.cartAmount += this.cartItems[i].price * this.cartItems[i].quantity;
        this.cartQuantity += this.cartItems[i].quantity;
    }

    //

    $('.cart-item').remove(':contains("' + title + '")');


    console.log(this.cartItems);
    this.refresh();


};




Cart.prototype.refresh = function () {

    // Берем имеющийся div для cart_data (создан в get) и чистим
    var $cartData = $('#cart_data');
    $cartData.empty();

    // Отрисовываем новые значения
    $('#cartQuantity').text(this.cartQuantity + ' товаров в корзине');
    $cartData.append('<p> Общая сумма:' + this.cartAmount + '</p>');
    $cartData.append('<p> Всего товаров:' + this.cartQuantity + '</p>');




};
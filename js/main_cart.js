$(document).ready (function () {

    //Получаем информацию с сервера об актуальных товарах


        $.get({
            url: './js/cart.json',
            dataType: 'json',
            context: this,
            success: function (data) {

                //Отображаем товар корзины на странице корзины
                for (var prodKey in data.cart){
                    var good = new Good(
                        data.cart[prodKey].id_item,
                        data.cart[prodKey].title,
                        data.cart[prodKey].price,
                        data.cart[prodKey].quantity
                    );
                    good.renderToCart($('#cart-block'));
                }

                var cart = new Cart('cart');
                cart.render($('.cart'));

                var allInputs = $('input');

                for (var i = 0; i < allInputs.length; i++){

                    $(allInputs[i]).on('change', function () {

                        var idProduct = parseInt($(this).attr('data-id'));
                        var priceProduct = parseInt($(this).parent().find('.item-price').text());
                        var quantityProduct = parseInt($(this).parent().find('#quantity-input').val());
                        cart.changeCartData(idProduct, priceProduct, quantityProduct);

                        console.log(idProduct);
                        console.log(priceProduct);
                        console.log(quantityProduct);
                        console.log(allInputs);
                    });
                }

                var allDelButtons = $('.delete-btn');

                for (var i = 0; i < allDelButtons.length; i++){

                    $(allDelButtons[i]).on('click', function () {

                        var idProduct = parseInt($(this).attr('data-id'));
                        var titleProduct = $(this).parent().find('.title').text();
                        var priceProduct = parseInt($(this).parent().find('.item-price').text());
                        var quantityProduct = parseInt($(this).parent().find('#quantity-input').val());
                        cart.remove(idProduct, titleProduct, priceProduct, quantityProduct);

                        console.log(idProduct);
                        console.log(titleProduct);
                        console.log(priceProduct);
                        console.log(quantityProduct);

                    });
                }


            }
        });

});
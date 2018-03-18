$(document).ready (function () {

    //Получаем информацию с сервера об актуальных товарах


        $.get({
            url: './js/products.json',
            dataType: 'json',
            context: this,
            success: function (data) {

                //Отображаем товар на сайте
                for (var prodKey in data.products){
                    var good = new Good(
                        data.products[prodKey].id_item,
                        data.products[prodKey].title,
                        data.products[prodKey].price
                    );
                    good.render($('#shop-block'));
                }

                // Создаем корзину

                var cart = new Cart('cart');

                cart.render($('.cart'));

                $('.buy-btn').on('click', function () {
                    var idProduct = parseInt($(this).attr('data-id'));
                    var priceProduct = parseInt($(this).parent().find('.item-price').text());
                    cart.addItem(idProduct, priceProduct);

                });



            }
        });

});
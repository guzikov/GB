function Good(id, title, price, quantity) {
    Container.call(this, id);
    this.title = title;
    this.price = price;
    this.quantity = quantity;
}

Good.prototype = Object.create(Container.prototype);
Good.prototype.constructor = Good;

Good.prototype.render = function (jQuerySelector) {

    var $goodContainer = $('<div />', {
        class: 'shop-item'
    });

    var $goodImage = $('<img>', {
        src: "img/" + this.id + ".png",
        alt: "id_"+ this.id
    });

    var $imgLink = $('<a />', {
        href: ""
    });


    var $goodTitle = $('<p>' + this.title + '</p>');

    var $goodPrice = $('<p class="item-price"> <span class="item-price">' + this.price + '</span>' + '&#8381;' + '</p>');

    // var $goodBtn = $('<a href="" class="buy-btn" data-id="' + this.id + '"> <span class="ti-package" /> Купить</a>');
    var $goodBtn = $('<button class="buy-btn" data-id="' + this.id + '"><span class="ti-package" />Купить</button>');

    $goodImage.appendTo($imgLink);
    $imgLink.appendTo($goodContainer);
    $goodTitle.appendTo($goodContainer);
    $goodPrice.appendTo($goodContainer);
    $goodBtn.appendTo($goodContainer);
    jQuerySelector.prepend($goodContainer);

};

Good.prototype.renderToCart = function (jQuerySelector) {

    var $goodContainer = $('<div />', {
        class: 'cart-item'
    });

    var $goodImage = $('<img>', {
        src: "img/" + this.id + ".png",
        alt: "id_"+ this.id
    });

    var $imgLink = $('<a />', {
        href: ""
    });

    var $goodQuantity = $('<input />', {
        type: 'number',
        name: 'quantity',
        value: this.quantity,
        min: 0,
        id: "quantity-input"
    });

    $goodQuantity.attr('data-id', this.id);

    var $goodTitle = $('<p class="title">' + this.title + '</p>');

    var $goodPrice = $('<p class="item-price"> <span class="item-price">' + this.price + '</span>' + '&#8381;' + '</p>');


    // var $reCalcBtn = $('<button class="recalc-btn" data-id="' + this.id + '">' + 'Пересчитать</button>');
    var $delBtn = $('<button class="delete-btn" data-id="' + this.id + '">' + 'Удалить</button>');


    $goodImage.appendTo($imgLink);
    $imgLink.appendTo($goodContainer);
    $goodTitle.appendTo($goodContainer);
    $goodPrice.appendTo($goodContainer);
    $('<label for="#quantity-input">Количество</label>').appendTo($goodContainer);
    $goodQuantity.appendTo($goodContainer);

    // $reCalcBtn.appendTo($goodContainer);
    $delBtn.appendTo($goodContainer);

    jQuerySelector.prepend($goodContainer);

};
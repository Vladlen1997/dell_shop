function initSlider() {
    $(".introSlider").owlCarousel({
        loop:true,
        margin:0,
        nav:false,
        responsive:false,
        items: 1,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        animateOut: 'slideOutDown',
        animateIn: 'flipInX',
        mouseDrag: false
    });

    $(".servicesSlider").owlCarousel({
        loop:true,
        margin:0,
        nav:true,
        navText: [$('.custom-owl-prev'),$(".custom-owl-next")],
        responsive:false,
        items: 1,
        autoplay: false,
        autoplayTimeout: 5000,
        autoplayHoverPause: true
    });

    $(".introCatalogSlider").owlCarousel({
        loop:true,
        margin:0,
        nav:true,
        navText: [$('.custom-owl-prev1'),$(".custom-owl-next1")],
        responsive:false,
        items: 1,
        autoplay: false,
        autoplayTimeout: 500000,
        autoplayHoverPause: true
    });

    $(".stockColSlider").owlCarousel({
        loop:true,
        nav:true,
        navText: [$('.custom-owl-prev'),$(".custom-owl-next")],
        margin: 1,
        responsive:false,
        items: 1,
        autoplay: false,
        autoplayTimeout: 5000,
        autoplayHoverPause: true
    });

    $(".newsListSlider").owlCarousel({
        loop:true,
        nav:true,
        navText: [$('.custom-owl-prev1'),$(".custom-owl-next1")],
        margin: 1,
        responsive:false,
        autoWidth:true,
        items: 3,
        dots: false,
        autoplay: false,
        autoplayTimeout: 5000,
        autoplayHoverPause: true
    });

    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 'auto',
        grid: {
            rows: 2,
        },
        spaceBetween: 5,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".button-next",
            prevEl: ".button-prev",
        }
    });

    var productThumbs = new Swiper(".js-productThumbs", {
        loop: true,
        spaceBetween: 0,
        slidesPerView: 3,
        watchSlidesProgress: true,
        navigation: false,
        pagination: false,
        noSwiping: true
    });
    var productView = new Swiper(".js-productView", {
        loop: true,
        spaceBetween: 10,
        navigation: {
            nextEl: ".productViewNext",
            prevEl: ".productViewPrev",
        },
        pagination: {
            el: ".productViewPagination",
            clickable: true,
        },
        thumbs: {
            swiper: productThumbs,
        },
    });
}

function initCounters (elSelector) {
    var counters = [], timeLeft, timeInterval, time, str;

    $(elSelector).each(function() {
        var el = $(this),
            tl = el.attr('time_left_sec');
        if (tl) {
            counters.push({el: el, timeleft: tl});
        }
    });

    function parseTime(endtime) {
        var seconds = Math.floor(endtime % 60);
        var minutes = Math.floor((endtime / 60) % 60);
        var hours = Math.floor((endtime / (60 * 60)) % 24);
        return {
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }
    
    function updateTimer() {
        counters.forEach(function(arrEl, index) {
            arrEl.timeleft -= 1;
            if (arrEl.timeleft > 0) {
                time = parseTime(arrEl.timeleft);
                str = ((time.hours) ? ((time.hours < 10) ? '0' + time.hours + ':' : time.hours + ':' ) : '');
                str += ((!time.minutes && !time.hours) ? '': ((time.minutes < 10) ? '0' + time.minutes + ':' : time.minutes + ':'))
                str +=  (time.seconds < 10) ? '0' + time.seconds : time.seconds;
                arrEl.el.html(str);
            } else {
                counters.splice(index, 1);
                if (!counters.length) {
                    clearInterval(timeInterval);
                }
            }
        });
    }
    if (counters.length) {
        updateTimer();
        timeInterval = setInterval(updateTimer, 1000);
    }
}

function initRangeSlider(selector) {
    var wrap = $(selector),
        el = wrap.find(".slider-range"),
        inp1 = wrap.find(".sc-input1"),
        inp2 = wrap.find(".sc-input2");
    if (el.length && inp1.length && inp2.length) {
        el.slider({
            animate: "slow",
            range: "min",
            values: [141000, 521000],
            max: 521000,
            step: 1000,
            range: true,
            slide : function(event, ui) {
                inp1.val("от " + ui.values[ 0 ]);
                inp2.val("до " + ui.values[ 1 ]);
            }
        });
        inp1.val("от " + 141000);
        inp2.val("до " + 521000);
    }
}

var scrollPosition;

function toggleMobFilter() {
    var filter =  $(".mobFilter");
    if (!filter.hasClass('isOpen')) {
        scrollPosition = $(window).scrollTop();
    }
    filter.toggleClass('isOpen');
    $("body").toggleClass('mobFixed');
    if (!filter.hasClass('isOpen')) {
        $(window).scrollTop(scrollPosition);
    }
}

function initPcTabs() {
    var tabsBtns = $(".pcTabs li"),
        tabsContent = $(".tabsContent").children();
    tabsBtns.eq(0).addClass('active');
    tabsContent.eq(0).addClass('active');
    tabsBtns.click(function () {
        var el = $(this);
        if (!el.hasClass('avtive')) {
            tabsBtns.removeClass('active');
            el.addClass('active');
            tabsContent.removeClass('active');
            tabsContent.eq(el.index()).addClass('active');
        }
    });
}

function initEvents() {

    $(".addComment").click(function (e) {
        e.preventDefault();
        $(this).toggleClass('active').next().slideToggle();
    })

    $(".js-submitForm").click(function(e) {
        e.preventDefault();
        var formId = $(this).attr('form_id');
        if (formId) $("#" + formId).submit();
    });

    $(".messengerLink .icon").click(function() {
        $(this).parent().toggleClass('isOpen');
    });

    $("#toggleMenu").change(function() {
        var isChecked = $(this).prop("checked");
        $("body").toggleClass('mobFixed', isChecked);
    });

    $(".viewType svg").click(function() {
        var el = $(this), list = $(".categoryList");
        if (!el.hasClass('active')) {
            el.parent().children().toggleClass('active');
            list.toggleClass('viewList', el.index())
        }
    });

    $(".callFilterMob").click(function() {
        toggleMobFilter();
    });

    $(".iconFCross").click(function() {
        toggleMobFilter();
    });

    $(".quest").click(function(){
        $(this).parent().toggleClass('isOpen');
    });

    $(".js-cSelect").selectmenu({ icons: { button: "custom-icon" } });
    $(".js-cSelectTC").selectmenu({ icons: { button: "custom-icon" } }).selectmenu("widget").addClass("blue");

    $(".spinner").spinner({
        min: 1,
        icons: { down: "custom-down-icon", up: "custom-up-icon" }
    });

    $(".commentsVisibility").click(function() {
        $(this).toggleClass('commentsIsHidden').parent().prev().slideToggle();
    });

    $(".categoryFilter .title").click(function() {
        $(this).next().slideToggle();
        $(this).parent().toggleClass('isOpen')
    });

    $(".showAllFields span").click(function() {
        $(this).parent().addClass('iHide');
        $(this).parent().next().slideToggle();
    });

    $(".js-openSearch").click(function() {
        $(this).next().addClass('isOpen').find('input').focus();
    });

    $(".categoryList .like").click(function(e) {
        var el = $(this);
        e.preventDefault();
        el.toggleClass('isActive');
        el.hasClass('isActive') ? showNotification('Добавлено в избранное.') : showNotification('Удалено из избранного.');
    });

    $(".categoryList .compare").click(function(e) {
        var el = $(this);
        e.preventDefault();
        el.toggleClass('isActive');
        el.hasClass('isActive') ? showNotification('Добавлено в сравнение.') : showNotification('Удалено из сравнения.');
    });

    $(".js-addInCart").click(function(e) {
        var el = $(this);
        e.preventDefault();
        el.toggleClass('isActive');
        el.hasClass('isActive') ? showNotification('Добавлено в корзину.') : showNotification('Удалено из корзины.');
    });
}

var notTO;

function showNotification(str) {
    var el = $("#userNotification");
    el.text(str).addClass('isVisible');
    clearTimeout(notTO);
    notTO = setTimeout(function() {
        el.text(str).removeClass('isVisible');
    }, 1000);
}

function initRating() {
    var el = $(".js-rating"),
        rating = el.attr('rating'),
        star = el.children().eq(4),
        showPart;
    el.after(el.clone());
    el.next().addClass('ratingBg');
    el.wrap('<div class="floatingRating"></div>');
    showPart = Math.trunc(rating)*4 + 3.4*(rating - Math.trunc(rating));
    el.parent().width(showPart + 'rem');
}

function initRatingS() {
    var els = $(".js-ratingSmall"),
        rating, el,
        star = els.eq(0).children().eq(4),
        showPart;
    els.each(function() {
        el = $(this);
        rating = el.attr('rating')
        el.after(el.clone());
        el.next().addClass('ratingBg');
        el.wrap('<div class="floatingRating"></div>');
        if (el.hasClass('mobOriginalSize')) el.parent().addClass('mobOriginalSize')
        showPart = Math.trunc(rating)*2.4 + 2.2*(rating - Math.trunc(rating));
        el.parent().width(showPart + 'rem');
    });
}

function ratingChoise(selector) {
    var els = $(selector),
        index, el;
    els.each(function() {
        el = $(this);
        el.children('div').mouseover(function () {
            var layouts, input;
            layouts = $(this).parent().children('div');
            input = $(this).parent().children('input');
            index = $(this).index();
            input.val((index + 1) / 2);
            console.log((index + 1) / 2);
            layouts.each(function () {
                var el = $(this);
                $(this).toggleClass('active', index >= el.index());
            });
        });
    });
}

$(document).ready(function () {
    initSlider();
    initCounters(".js-counter");
    initRangeSlider(".rangeSlider");
    initEvents();
    initPcTabs();
    initRating();
    initRatingS();

    $(".js-openUserMenu").click(function() {
        $(".autorizedUser").toggleClass('userMenuOpen');
    });

    $(document).click( function(e){
        if (!$(e.target).closest('.js-openUserMenu').length) {
            $(".autorizedUser").removeClass('userMenuOpen');
        }

        if (!$(e.target).closest('.searchBox').length && !$(e.target).closest('.js-openSearch').length) {
            $(".searchBox").removeClass('isOpen');
        }
    });
});
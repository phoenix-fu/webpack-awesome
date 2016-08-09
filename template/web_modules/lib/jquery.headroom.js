import 'web/lib/headroom.min'

(function($) {

    if (!$) {
        return;
    }

    ////////////
    // Plugin //
    ////////////
    $.fn.headroom = function(option) {
        return this.each(function() {
            var $this = $(this),
            data = $this.data('headroom'),
            options = typeof option === 'object' && option;

            options = $.extend(true, {},
            Headroom.options, options);

            if (!data) {
                data = new Headroom(this, options);
                data.init();
                $this.data('headroom', data);
            }
            if (typeof option === 'string') {
                data[option]();
            }
        });
    };

    //////////////
    // Data API //
    //////////////
    $('[data-headroom]').each(function() {
        var $this = $(this);
        $this.headroom($this.data());
    });

    $.extend({

        startHeadRoom: function(){
            $("header").headroom({
                "tolerance": 5,
                "offset": 100,
                "classes": {
                    "initial": "animated",
                    "pinned": "slideDown",
                    "unpinned": "slideUp"
                }
            });
        }
        
    });

} (window.Zepto || window.jQuery));

$("header").headroom({
    "tolerance": 5,
    "offset": 100,
    "classes": {
        "initial": "animated",
        "pinned": "slideDown",
        "unpinned": "slideUp"
    }
});

// to destroy
$("#header").headroom("destroy");

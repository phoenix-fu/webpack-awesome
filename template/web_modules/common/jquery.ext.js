$(function () {
    $.extend({
        startHeadRoom: function () {
            $('header').headroom({
                'tolerance': 5,
                'offset': 100,
                'classes': {
                    'initial': 'animated',
                    'pinned': 'slideDown',
                    'unpinned': 'slideUp'
                }
            })
        }
    })
})

export default $

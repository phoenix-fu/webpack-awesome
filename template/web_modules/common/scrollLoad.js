var scrollLoad = (function () {
    var range = 0 // 距下边界长度/单位px
    // var elemt = 500; // 插入元素高度/单位px
    // var maxnum = 20; // 设置加载最多次数
    var num = 2
    var totalheight = 0
    var init = function (event) {
        $(window).scroll(function () {
            var srollPos = $(window).scrollTop() // 滚动条距顶部距离(页面超出窗口的高度)

            totalheight = parseFloat($(window).height()) + parseFloat(srollPos)

            if (($(document).height() - range) === totalheight) {
                event()
                num++
            }
        })
    }
    return {
        init: init
    }
})()

export default scrollLoad

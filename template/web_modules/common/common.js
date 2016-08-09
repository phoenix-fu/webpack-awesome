import yii from 'web/yii/yii.validation.ext'
import config from 'web/config'

var common = {

    getTimestamp: function () {
        return (new Date()).getTime()
    },

    getTimeArray: function (timeStamp) {
        timeStamp = timeStamp * 1000
        var date = new Date(timeStamp)
        var year = date.getFullYear()
        var month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        var hour = date.getHours()
        var minute = date.getMinutes()
        var second = date.getSeconds()

        return [year, month, day, hour, minute, second]
    },

    timeFormatType: {
        chinese: ['年', '月', '日 ', '时', '分', '秒'],
        standard: ['-', '-', ' ', ':', ':', '']
    },

    log: function (error) {
        if (typeof console !== 'undefined') {
            if (console.log) {
                console.log(error)
                return
            }
        }
    },

    info: function (message) {
        if (typeof console !== 'undefined') {
            if (console.info) {
                console.info(message)
                return
            }
        }
    },

    _throw: function (error) {
        bughd('notify', 'warn', error)
        if (typeof console !== 'undefined') {
            if (console.warn) {
                console.warn(error)
                return
            }
        }
        throw (error)
    },

    error: function (error) {
        bughd('notify', 'error', error)
        if (typeof console !== 'undefined') {
            if (console.error) {
                console.error(error)
                return
            }
        }
    },

    setValue: function (valueData) {
        var data = {}
        for (key in valueData) {
            if (valueData[key] !== undefined) {
                data[key] = valueData[key]
            }
        }
        return data
    },

    validateFile: function (attrName, options) {
        var fileInput = document.getElementById(attrName)
        var attribute = {
            input: fileInput
        }

        var messages = []
        var defaultOptions = {
            extensions: ['png', 'jpg', 'jpeg'],
            mimeTypes: ['image/jpeg', 'image/png'],
            wrongExtension: '文件格式不正确',
            wrongMimeType: '文件类型不正确',
            tooBig: '文件太大',
            tooSmall: '文件太小'
        }
        options = $.extend({}, defaultOptions, options)

        yii.validation.file(attribute, messages, options)

        return messages.length > 0 ? messages[0] : true
    },

    formatMoney: function (s, n) {
        n = n !== undefined ? n : 2
        n = n > 0 && n <= 20 ? n : 2
        s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + ''
        var l = s.split('.')[0].split('').reverse()
        var r = s.split('.')[1]
        var t = ''
        for (var i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
        }
        return t.split('').reverse().join('') + '.' + r
    },

    formatIntMoney: function (s, n) {
        var money = this.formatMoney(s, n)
        return money.substring(0, money.indexOf('.'))
    },

    /**
     * 获取表单下所有input键值堆
     * @param 表单id
     */
    getFormData: function (formId) {
        var data = {}
        var inputs = $('#' + formId).serializeArray()
        common.info(inputs)
        for (var i = 0; i < inputs.length; i++) {
            var record = inputs[i]
            data[record.name] = record.value
        }
        return data
    },

    getPathName: function () {
        return window.location.pathname.endsWith('/') ? window.location.pathname
            : window.location.pathname + '/'
    },

    addPathName: function (url) {
        return common.getPathName() + url
    },

    getHost: function () {
        return window.location.host.endsWith('/') ? window.location.host
            : window.location.host + '/'
    },

    addHost: function (url) {
        return 'http://' + common.getHost() + url
    },

    random: function () {
        return Math.random().toString(36).substr(2)
    },

    supportInput: function (type) {
        var element = document.createElement('input')
        element.setAttribute('type', type)
        return element.type !== 'text'
    },

    pluralize: function (time, lable) {
        return time + lable
    },

    fromNow: function (time) {
        const between = (Date.now() / 1000 - Number(time)) < 0 ? 0 : Date.now() / 1000 - Number(time)
        if (between < 3600) {
            return this.pluralize(~~(between / 60), ' 分钟')
        } else if (between < 86400) {
            return this.pluralize(~~(between / 3600), ' 小时')
        } else {
            return this.pluralize(~~(between / 84600), ' 天')
        }
    },

    toFirstUpper (word) {
        return word.substring(0, 1).toUpperCase() + word.substring(1)
    },

    tempIFrame () {
        let $iframe = $('<iframe src="/favicon.ico" style="display: none"></iframe>').on('load', function () {
            setTimeout(function () {
                $iframe.off('load').remove()
            }, 0)
        }).appendTo($('body'))
    },

    setDocTitle (title) {
        if (typeof title !== 'string') {
            title = document.appTitle === undefined ? config.title : document.appTitle
        }
        if (title != document.title) {
            document.title = title
            this.tempIFrame()
        }
    },

    /*
     记录分享事件到ga
     type: article 或者 tool
     id: 文章id 或者 工具id
     */
    gaShareAppMessage (userId, type, id, title) {
        var eventCategory = type
        switch (type) {
            case "tool":
                eventCategory = '分享工具'
                break;
            case "article":
                eventCategory = '分享文章'
                break;
        }
        return this.gaSendEvent(eventCategory, '分享朋友', userId, id, title)
    },

    /*
     记录分享事件到ga
     type: article 或者 tool
     id: 文章id 或者 工具id
     */
    gaShareTimeLine (userId, type, id, title) {
        var eventCategory = type
        switch (type) {
            case "tool":
                eventCategory = '分享工具'
                break;
            case "article":
                eventCategory = '分享文章'
                break;
        }
        return this.gaSendEvent(eventCategory, '分享朋友圈', userId, id, title)
    },

    /*
     记录阅读事件到 ga
     type: article 或者 tool
     id: 文章id 或者 工具id
     */
    gaReadFrom (userId, type, id, title, from) {
        var eventCategory = type
        switch (type) {
            case "tool":
                eventCategory = '使用工具'
                break;
            case "article":
                eventCategory = '阅读文章'
                break;
        }
        var eventAction = from
        switch (from) {
            case "singlemessage":
                eventAction = '朋友'
                break;
            case "groupmessage":
                eventAction = '群组'
                break;
            case "timeline":
                eventAction = '朋友圈'
                break;
        }
        return this.gaSendEvent(eventCategory, eventAction, userId, id, title)
    },

    gaSendEvent(eventCategory, eventAction, userId, id, title){
        ga('send', {
            hitType: 'event',
            eventCategory: eventCategory,
            eventAction: eventAction,
            eventLabel: id + ' ' + title,
            dimension1: userId
        })
    },
    randPassword(length) {
        let number = '0123456789'
        let password = ''
        for (let i=0; i<length; i++) {
            let index = Math.floor((Math.random() * 10))
            password = password + number.charAt(index)
        }
        return password
    },

     getQueryVariable(variable) {
        let query = window.location.search.substring(1)
        let vars = query.split('&')
        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split('=')
            if (decodeURIComponent(pair[0]) == variable) {
                return decodeURIComponent(pair[1])
            }
        }
        return null
    },

    // >= start && < end
    generateRandom (start, end) {
        return Math.floor(Math.random() * (end - start) + start)
    }

}

export default common

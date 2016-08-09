export default {
    config () {
        return {
            phoenix: {
                key: 'ad4a32c2-20e6-4c7a-8ad6-30948e17d90b'
            },
            jas: {
                key: 'b0bcd7fd-577f-4dae-a0c9-d061a697f5fd'  
            },
            rocket: {
                key: 'd3292845-b34c-42a3-bc83-33f12f63c356'  
            },
            mason: {
                key: '9687e62a-b0b8-4a28-a469-aeb85326a018'  
            }
        }
    },

    attach () {
        if (process.env.NODE_ENV === 'sit') {
            let developer = window.location.hash.replace(/.*developer=/, '')
            let developerConfig = this.config()[developer]
            if (developerConfig !== undefined) {
                let key = developerConfig.key
                let path = `http://jsconsole.com/js/remote.js?${key}`
                this.insertJs(path)
            }
        }
    },

    insertJs (path) {
        let inspectorScript = document.createElement('script')
        inspectorScript.type = 'text/javascript'
        inspectorScript.src = path
        document.head.appendChild(inspectorScript)
    }
}

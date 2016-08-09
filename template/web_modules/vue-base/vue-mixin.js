import Vue from 'vue'

export default function () {
    Vue.mixin({
        data () {
            return {
                docTitle: ''
            }
        },

        methods: {
            handleRequest (deferred) {
                var self = this
                return deferred.then(function (...resultArray) {
                    for (var key in resultArray) {
                        var itemResult = resultArray[key]
                        if (itemResult !== undefined && !$.requestOK(itemResult)) {
                            return $.Deferred().reject($.getRequestStatus(itemResult))
                        }
                    }
                    return $.when(...resultArray)
                }).fail(function (status) {
                    self.$loadingRouteData = false
                    self.showPopupError(status.message)
                }).always(() => {
                    self.hideLoading()
                })
            },

            request (apis, { loading = false, loadingText } = {}) {
                if (typeof apis === 'object' && apis !== null && !Array.isArray(apis)) {
                    apis = [apis]
                }

                if (loading) {
                    this.showLoading(loadingText)
                }

                let requestApis = []
                for (let api of apis) {
                    let requestApi = $api.getRequest(api.api, api.params, api.config)
                    requestApis.push(requestApi)
                }
                return this.handleRequest($.when(...requestApis))
            },

            handlePromise (deferred, { loading = false, loadingText } = {}) {
                if (loading) {
                    this.showLoading(loadingText)
                }
                return this.handleRequest(deferred)
            },

            go: function (param) {
                if (typeof param === 'string') {
                    this.$route.router.go({name: param})
                } else {
                    this.$route.router.go(param)
                }
            },

            broadcast (eventName, ...params) {
                if (Array.isArray(this.$children)) {
                    this.$broadcast(eventName, ...params)
                }
            },

            showPopupError (message) {
                this.$root.$broadcast('show-popup-error', message)
            },

            showLoading (message) {
                this.$root.$broadcast('show-loading', message)
            },

            hideLoading () {
                this.$root.$broadcast('hide-loading')
            }
        }
    })
}

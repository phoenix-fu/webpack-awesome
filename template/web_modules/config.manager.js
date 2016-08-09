export default {
    extend: function (appConfig) {
        $.extend(appConfig, {
            setVersion: function (version) {
                appConfig.version = version
            },

            checkVersion: function (newVersion) {
                if (appConfig.version !== newVersion) {
                    window.location.reload()
                }
            },

            ajaxCheckVersion: function () {
                $.ajax({
                    url: appConfig.apiDomain + '/api/v1/app/version' // common.addPathName('api/v1/app/version')
                }).done(function (newVersion) {
                    appConfig.checkVersion(newVersion.data)
                })
            }
        })
        return appConfig
    }
}

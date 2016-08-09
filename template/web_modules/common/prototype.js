export default function () {
    if (typeof String.prototype.startsWith !== 'function') {
        String.prototype.startsWith = function (str) {
            return this.slice(0, str.length) === str
        }
    }

    if (typeof String.prototype.endsWith !== 'function') {
        String.prototype.endsWith = function (str) {
            return this.slice(-str.length) === str
        }
    }

    if (!String.prototype.format) {
        String.prototype.format = function () {
            var args = arguments
            return this.replace(/{(\d+)}/g, function (match, number) {
                return typeof args[number] !== 'undefined' ? args[number] : match
            })
        }
    }

    if (typeof String.toText !== 'function') {
        String.toText = function (func) {
            return func.toString().replace(/^[^\/]+\/\*!?\s?/, '').replace(/\*\/[^\/]+$/, '')
        }
    }
}

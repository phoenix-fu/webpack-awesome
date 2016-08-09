export default {
    order (itemId, code, fee) {
        var data = {
            itemId: itemId,
            code: code,
            fee: fee
        }
        return $.mainRequest("payment/api/order", data,
            { type: "post", isHostUrl: true  })
    },

    refund (itemId, code) {
        var data = {
            itemId: itemId,
            code: code
        }
        return $.mainRequest("payment/api/refund", data,
            { type: "post", isHostUrl: true })
    }
}

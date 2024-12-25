const { ClickError } = require("../enum/transaction.enum")
const orderModel = require('../models/order.model')

class ClickService {
    async prepare(data){
        const { click_trans_id, service_id, merchant_trans_id, amount, action, sign_time, sign_string } = data
        const order = await orderModel.findById(merchant_trans_id)
        if (!order) {
			return { error: ClickError.TransactionNotFound, error_note: 'Transaction not found' }
		}

        const userId = order.user
		const productId = order.product
		const orderId = order._id

        const signatureData = { click_trans_id, service_id, orderId, amount, action, sign_time }
        const checkSignature = clickCheckToken(signatureData, sign_string)

    }
}

module.exports = new ClickService()
import axios from "axios";

const PAYMENT_API_BASE_URL = "https://54.255.199.121/api/v1/payments";

class PaymentService {
  savePayment(Payment) {
    return axios.post(PAYMENT_API_BASE_URL, Payment);
  }

  getPayments() {
    return axios.get(PAYMENT_API_BASE_URL);
  }

  getPaymentById(id) {
    return axios.get(PAYMENT_API_BASE_URL + "/" + id);
  }

  updatePayment(Payment) {
    return axios.patch(PAYMENT_API_BASE_URL, Payment);
  }
}

export default new PaymentService();

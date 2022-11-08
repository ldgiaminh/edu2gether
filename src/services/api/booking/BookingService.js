import axios from "axios";

const BOOKING_API_BASE_URL = "https://54.255.199.121/api/v1/bookings";

class BookingService {
  getBookings() {
    return axios.get(BOOKING_API_BASE_URL);
  }

  getBookingById(id) {
    return axios.get(BOOKING_API_BASE_URL + "/" + id);
  }

  updateBooking(Booking) {
    return axios.patch(BOOKING_API_BASE_URL, Booking);
  }

  getBookingByMentorId(id) {
    return axios.get(BOOKING_API_BASE_URL + "/mentors/" + id);
  }
}

export default new BookingService();

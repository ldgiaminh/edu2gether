import axios from "axios";

const MENTEE_API_BASE_URL = "https://54.255.199.121/api/v1/mentees";

class MenteeService {
  saveMentee(mentee) {
    return axios.post(MENTEE_API_BASE_URL, mentee);
  }

  getMentees() {
    return axios.get(MENTEE_API_BASE_URL);
  }

  deleteMentee(id) {
    return axios.delete(MENTEE_API_BASE_URL + "/" + id);
  }

  getMenteeById(id) {
    return axios.get(MENTEE_API_BASE_URL + "/" + id);
  }

  updateMentee(mentee) {
    return axios.patch(MENTEE_API_BASE_URL, mentee);
  }
}

export default new MenteeService();

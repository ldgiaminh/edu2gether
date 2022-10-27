import axios from "axios";

const MENTOR_API_BASE_URL = "http://54.255.199.121/api/v1/mentors";

class MentorService {
  saveMentor(mentor) {
    return axios.post(MENTOR_API_BASE_URL, mentor);
  }

  getMentors(mentor) {
    return axios.get(MENTOR_API_BASE_URL);
  }

  deleteMentor(id) {
    return axios.delete(MENTOR_API_BASE_URL + "/" + id);
  }

  getMentorById(id) {
    return axios.get(MENTOR_API_BASE_URL + "/" + id);
  }

  updateMentor(mentor) {
    return axios.patch(MENTOR_API_BASE_URL, mentor);
  }
}

export default new MentorService();

import axios from "axios";

const MAJOR_API_BASE_URL = "http://54.255.199.121/api/v1/majors";

class MajorService {
  saveMajor(Major) {
    return axios.post(MAJOR_API_BASE_URL, Major);
  }

  getMajors() {
    return axios.get(MAJOR_API_BASE_URL);
  }

  deleteMajor(id) {
    return axios.delete(MAJOR_API_BASE_URL + "/" + id);
  }

  getMajorById(id) {
    return axios.get(MAJOR_API_BASE_URL + "/" + id + "?MajorId=" + id);
  }

  updateMajor(Major) {
    return axios.patch(MAJOR_API_BASE_URL, { data: Major });
  }
}

export default new MajorService();

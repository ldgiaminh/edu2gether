import axios from "axios";

const MAJOR_API_BASE_URL = "https://54.255.199.121/api/v1/majors";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

class MajorService {
  saveMajor(Major) {
    return axios.post(MAJOR_API_BASE_URL, Major, config);
  }

  getMajors() {
    return axios.get(MAJOR_API_BASE_URL);
  }

  getMajorById(id) {
    return axios.get(MAJOR_API_BASE_URL + "/" + id + "?MajorId=" + id);
  }

  updateMajor(Major) {
    return axios.patch(MAJOR_API_BASE_URL, { data: Major });
  }
}

export default new MajorService();

import axios from "axios";

const SUBJECT_API_BASE_URL = "http://54.255.199.121/api/v1/subjects";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

class SubjectService {
  saveSubject(Subject) {
    return axios.post(SUBJECT_API_BASE_URL, Subject, config);
  }

  getSubjects() {
    return axios.get(SUBJECT_API_BASE_URL);
  }

  deleteSubject(id) {
    return axios.delete(SUBJECT_API_BASE_URL + "/" + id);
  }

  getSubjectById(id) {
    return axios.get(SUBJECT_API_BASE_URL + "/" + id + "?SubjectId=" + id);
  }

  updateSubject(Subject) {
    return axios.patch(SUBJECT_API_BASE_URL, { data: Subject });
  }
}

export default new SubjectService();

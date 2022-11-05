import axios from "axios";

const COURSE_API_BASE_URL = "http://54.255.199.121/api/v1/courses";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

class CourseService {
  saveCourse(Course) {
    return axios.post(COURSE_API_BASE_URL, Course, config);
  }

  getCourses() {
    return axios.get(COURSE_API_BASE_URL);
  }

  deleteCourse(id) {
    return axios.delete(COURSE_API_BASE_URL + "/" + id);
  }

  getCourseById(id) {
    return axios.get(COURSE_API_BASE_URL + "/" + id + "?CourseId=" + id);
  }

  updateCourse(Course) {
    return axios.patch(COURSE_API_BASE_URL, { data: Course });
  }
}

export default new CourseService();

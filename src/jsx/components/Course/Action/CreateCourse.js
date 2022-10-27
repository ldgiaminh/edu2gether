import PageTitle from "../../../layouts/PageTitle";
import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";

import CourseService from "../../../../services/api/CourseService";

const CreateCourse = () => {
  const history = useHistory();

  const [courses, setCourses] = useState({
    id: "",
    name: "",
    detail: "",
    videoUrl: "",
    image: "",
    price: "",
    discount: "",
    capacity: "",
    classUrl: "",
    estimateHour: "",
    subjectId: "",
    mentorId: "",
    createTime: "",
    updateTime: "",
    publishDate: "",
    isActived: "",
    approver: "",
    approveStatus: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setCourses({ ...courses, [e.target.name]: value });
  };

  const saveCourses = (e) => {
    e.preventDefault();
    CourseService.saveCourse(courses)
      .then((response) => {
        console.log(response);
        history.push("/course");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reset = (e) => {
    e.preventDefault();
    setCourses({
      id: "",
      firstName: "",
      lastName: "",
      emailId: "",
    });
  };

  return (
    <Fragment>
      <PageTitle activeMenu="Edit" motherMenu="Mentor" pageContent="Edit" />

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Edit Mentor</h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form onSubmit={saveCourses}>
                  <div className="row">
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="id"
                        onChange={(e) => handleChange(e)}
                        value={courses.name}
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Mentor
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="fullName"
                        onChange={(e) => handleChange(e)}
                        value={courses.fullName}
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Qualification
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="qualification"
                        onChange={(e) => handleChange(e)}
                        value={courses.qualification}
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Phone
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="phone"
                        onChange={(e) => handleChange(e)}
                        value={courses.phone}
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Evidence
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="evidence"
                        onChange={(e) => handleChange(e)}
                        value={courses.evidence}
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Address
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="address"
                        onChange={(e) => handleChange(e)}
                        value={courses.address}
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Job
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="job"
                        onChange={(e) => handleChange(e)}
                        value={courses.job}
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Country
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="country"
                        onChange={(e) => handleChange(e)}
                        value={courses.country}
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Image
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="image"
                        onChange={(e) => handleChange(e)}
                        value={courses.image}
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Gender
                      </label>
                      <div className="radio form-control-lg text-center ">
                        <label className="col-md-3">
                          <input
                            type="radio"
                            className="form-check-input"
                            checked={courses.gender === "Male"}
                            name="gender"
                            onChange={(e) => handleChange(e)}
                            value="Male"
                          />{" "}
                          Male
                        </label>
                        <label>
                          <input
                            type="radio"
                            className="form-check-input"
                            checked={courses.gender === "Female"}
                            name="gender"
                            onChange={(e) => handleChange(e)}
                            value="Female"
                          />{" "}
                          Female
                        </label>
                      </div>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Website
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="websiteUrl"
                        onChange={(e) => handleChange(e)}
                        value={courses.websiteUrl}
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Status
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="status"
                        onChange={(e) => handleChange(e)}
                        value={courses.approveStatusId}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <button className="me-2 btn btn-primary">Save</button>
                    <button onClick={reset} className="me-2 btn btn-dark">
                      Clear
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateCourse;

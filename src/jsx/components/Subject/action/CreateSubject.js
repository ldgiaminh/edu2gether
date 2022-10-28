import PageTitle from "../../../layouts/PageTitle";
import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import SubjectService from "../../../../services/api/subject/SubjectService";
import MajorService from "../../../../services/api/major/MajorService";

const CreateSubject = () => {
  const [majors, setMajors] = useState([{ id: "", name: "" }]);

  const [subjects, setSubjects] = useState({
    name: "",
    detail: "",
    image: "",
    majorId: "",
  });

  //Fetch Data Api

  useEffect(() => {
    const fetchData = async () => {
      const response = await MajorService.getMajors();
      const newData = await response.data;
      setMajors(newData);
      //console.log(newData);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSubjects({ ...subjects, [e.target.name]: value });
  };

  // const handleChangeMajor = (e) => {
  //   setMajors(e.target.value);
  // };

  const saveSubjects = (e) => {
    e.preventDefault();
    // SubjectService.saveSubject(subjects)
    //   .then((response) => {
    //     console.log(response);
    //     history.push("/major");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    console.log(subjects);
  };

  const reset = (e) => {
    e.preventDefault();
    setSubjects({
      name: "",
      detail: "",
      image: "",
    });
  };

  return (
    <Fragment>
      <PageTitle
        activeMenu="Create New Subject"
        motherMenu="Subject"
        pageContent="Create New Subject"
      />

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">New Subject</h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form onSubmit={saveSubjects}>
                  <div className="row">
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="name"
                        onChange={(e) => handleChange(e)}
                        value={subjects.name}
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Major
                      </label>
                      <select
                        className="form-control form-control-lg"
                        onChange={(e) => handleChange(e)}
                        value={subjects.majorId}
                        name="majorId"
                      >
                        <option value="" disabled>
                          -- Choose Major --
                        </option>
                        {majors.map((major) => (
                          <option value={major.id} key={major.id}>
                            {major.name}
                          </option>
                        ))}
                      </select>
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
                        value={subjects.image}
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Detail
                      </label>
                      <textarea
                        type="text"
                        className="form-control form-control-lg"
                        name="detail"
                        onChange={(e) => handleChange(e)}
                        value={subjects.detail}
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

export default CreateSubject;

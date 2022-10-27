import PageTitle from "../../../layouts/PageTitle";
import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";

import SubjectService from "../../../../services/api/subject/SubjectService";
import MajorService from "../../../../services/api/major/MajorService";

const CreateSubject = () => {
  const history = useHistory();

  //const [majors, setMajors] = useState(null);

  const [subjects, setSubjects] = useState({
    name: "",
    detail: "",
    image: "",
  });

  //Fetch Data Api
  const [options, setOptions] = useState([""]);

  useEffect(() => {
    const getData = async () => {
      const arr = [];
      await MajorService.getMajors().then((res) => {
        let result = res.data.items;
        result.map((user) => {
          return arr.push({ value: user.login, label: user.login });
        });
        setOptions(arr);
      });
    };
    getData();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSubjects({ ...subjects, [e.target.name]: value });
  };

  const saveSubjects = (e) => {
    e.preventDefault();
    SubjectService.saveSubject(subjects)
      .then((response) => {
        console.log(response);
        history.push("/major");
      })
      .catch((error) => {
        console.log(error);
      });
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
        activeMenu="Create New Major"
        motherMenu="Major"
        pageContent="Create New Major"
      />

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">New Major</h4>
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
                      <select className="form-control form-control-lg">
                        <option>Option 1</option>
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

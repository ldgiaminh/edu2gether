import PageTitle from "../../../layouts/PageTitle";
import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";

import MajorService from "../../../../services/api/major/MajorService";

const CreateMajor = () => {
  const history = useHistory();

  const [majors, setMajors] = useState({
    name: "",
    detail: "",
    image: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setMajors({ ...majors, [e.target.name]: value });
  };

  const saveMajors = (e) => {
    e.preventDefault();
    MajorService.saveMajor(majors)
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
    setMajors({
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
                <form onSubmit={saveMajors}>
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
                        value={majors.name}
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
                        value={majors.image}
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
                        value={majors.detail}
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

export default CreateMajor;

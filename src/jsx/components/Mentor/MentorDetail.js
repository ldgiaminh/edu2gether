import React, { Fragment, useState, useEffect } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SRLWrapper } from "simple-react-lightbox";
import swal from "sweetalert";

import { useHistory, useParams } from "react-router-dom";

import MentorService from "../../../services/api/mentor/MentorService";
import CourseService from "../../../services/api/course/CourseService";

//** Import Image */
import profile01 from "../../../images/profile/1.jpg";
import profile02 from "../../../images/profile/2.jpg";
import profile03 from "../../../images/profile/3.jpg";
import profile04 from "../../../images/profile/4.jpg";
import profile05 from "../../../images/profile/5.jpg";
import profile06 from "../../../images/profile/6.jpg";
import profile07 from "../../../images/profile/7.jpg";
import profile08 from "../../../images/profile/8.jpg";
import profile09 from "../../../images/profile/9.jpg";
import profile from "../../../images/profile/profile.png";
import PageTitle from "../../layouts/PageTitle";

const MentorDetail = () => {
  const { id } = useParams();

  const history = useHistory();

  const [activeToggle, setActiveToggle] = useState("aboutMe");

  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState(null);

  const [mentors, setMentors] = useState({
    id: id,
    fullName: "",
    phone: "",
    address: "",
    country: "",
    qualification: "",
    evidence: "",
    job: "",
    gender: "",
    image: "",
    websiteUrl: "",
    approveStatusId: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setMentors({ ...mentors, [e.target.name]: value });
  };

  const updateMentor = (e) => {
    e.preventDefault();
    MentorService.updateMentor(mentors)
      .then(() => {
        //history.push("./mentor");
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(mentors);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MentorService.getMentorById(id);
        setMentors(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CourseService.getCourseByMentorId(id);
        setCourses(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <Fragment>
      <PageTitle activeMenu="Profile" motherMenu="App" />

      <div className="row">
        <div className="col-lg-">
          <div className="profile card card-body px-3 pt-3 pb-0">
            <div className="profile-head">
              {/* <div className="photo-content ">
                <div className="cover-photo rounded"></div>
              </div> */}
              <div className="profile-info">
                <div className="profile-photo">
                  <img
                    src={mentors.image}
                    className="img-fluid rounded-circle"
                    alt="profile"
                  />
                </div>
                <div className="profile-details">
                  <div className="profile-name px-3 pt-2">
                    <h2 className="text-primary mb-0">{mentors.fullName}</h2>
                    <h4>{mentors.job}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body">
              <div className="profile-tab">
                <div className="custom-tab-1">
                  <ul className="nav nav-tabs">
                    <li
                      className="nav-item"
                      onClick={() => setActiveToggle("aboutMe")}
                    >
                      <Link
                        to="#about-me"
                        data-toggle="tab"
                        className={`nav-link ${
                          activeToggle === "aboutMe" ? "active show" : ""
                        }`}
                      >
                        Overview
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="#profile-settings"
                        data-toggle="tab"
                        onClick={() => setActiveToggle("setting")}
                        className={`nav-link  ${
                          activeToggle === "setting" ? "active show" : ""
                        }`}
                      >
                        Setting
                      </Link>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div
                      id="about-me"
                      className={`tab-pane fade ${
                        activeToggle === "aboutMe" ? "active show" : ""
                      }`}
                    >
                      <div className="profile-personal-info mt-4">
                        <h4 className="text-primary mb-4">Thông tin cá nhân</h4>
                        <div className="row mb-2">
                          <div className="col-3">
                            <h5 className="f-w-500">
                              {" "}
                              Full Name<span className="pull-right">:</span>
                            </h5>
                          </div>
                          <div className="col-9">
                            <h6 className="text-muted">{mentors.fullName}</h6>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-3">
                            <h5 className="f-w-500">
                              Phone<span className="pull-right">:</span>
                            </h5>
                          </div>
                          <div className="col-9">
                            <h6 className="text-muted">{mentors.phone}</h6>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-3">
                            <h5 className="f-w-500">
                              {" "}
                              Gender<span className="pull-right">:</span>
                            </h5>
                          </div>
                          <div className="col-9">
                            <h6 className="text-muted">{mentors.gender}</h6>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-3">
                            <h5 className="f-w-500">
                              {" "}
                              Location<span className="pull-right">:</span>
                            </h5>
                          </div>
                          <div className="col-9">
                            <h6 className="text-muted">
                              {mentors.address}, {mentors.country}
                            </h6>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-3">
                            <h5 className="f-w-500">
                              Website
                              <span className="pull-right">:</span>
                            </h5>
                          </div>
                          <div className="col-9">
                            <h6 className="text-muted">{mentors.websiteUrl}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="profile-settings"
                      className={`tab-pane fade ${
                        activeToggle === "setting" ? "active show" : ""
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="row">
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header border-0 pb-0">
              <h5 className="text-primary">Course</h5>
            </div>
            <div className="card-body pt-3">
              <div className="profile-blog ">
                <img
                  src={profile01}
                  alt="profile"
                  className="img-fluid  mb-4 w-100 "
                />
                <Link to="/post-details">
                  {" "}
                  <h4>haha</h4>{" "}
                </Link>
                <p className="mb-0">
                  A small river named Duden flows by their place and supplies it
                  with the necessary regelialia. It is a paradisematic country,
                  in which roasted parts of sentences fly into your mouth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </Fragment>
  );
};

export default MentorDetail;

import React, { Fragment, useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import swal from "sweetalert";

import CourseService from "../../../services/api/course/CourseService";

import { Row, Col, Card } from "react-bootstrap";

///Images
import profile10 from "./../../../images/profile/10.jpg";

import PageTitle from "../../layouts/PageTitle";
import hotel1 from "../../../images/hotel/pic1.jpg";
import { millisecondsToHours } from "date-fns/esm";

//import BookingSlider from "./Orthers/BookingSlider";

const GuestDetail = () => {
  const { id } = useParams();

  const history = useHistory();

  const [mentors, setMentor] = useState({
    mentor: "",
  });

  const [majors, setMajors] = useState({
    major: "",
  });

  const [subjects, setSubjects] = useState({
    subject: "",
  });

  const [courses, setCourses] = useState({
    id: id,
    name: "",
    image: "",
    detail: "",
    videoUrl: "",
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CourseService.getCourseById(id);
        setCourses(response.data);
        setMentor(response.data);
        setMajors(response.data);
        setSubjects(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleChangeStatus = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", courses.name);
    formData.append("detail", courses.detail);
    formData.append("videoUrl", "");
    formData.append("image", courses.image);
    formData.append("price", courses.price);
    formData.append("discount", courses.discount);
    formData.append("capacity", courses.capacity);
    formData.append("classUrl", courses.classUrl);
    formData.append("estimateHour", courses.estimateHour);
    formData.append("subjectId", courses.subjectId);
    formData.append("mentorId", courses.mentorId);
    formData.append("createTime", courses.createTime);
    formData.append("updateTime", "");
    formData.append("publishDate", "");
    formData.append("isActived", courses.isActived);
    formData.append("approver", courses.approver);
    formData.append("approveStatus", 3);
    CourseService.updateCourse(formData)
      .then((response) => {
        console.log(response.data);
        swal("Success!", "Approved Successful", "success");
        history.push("/course");
      })
      .catch((error) => {
        console.log(error);
      });
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
  };

  return (
    <>
      <PageTitle
        activeMenu="Course Detail"
        motherMenu="Course"
        pageContent="Course Detail"
      />
      <div className="row">
        <div className="col-xl-9 col-xxl-8">
          <div className="card">
            {/* <div className="card-header border-0 pb-0">
              <h4 className="card-title">{courses.name}</h4>
            </div> */}
            <div className="card-body">
              <div className="owl-carousel gallery-carousel owl-theme pb-3">
                <div className="items px-2">
                  <img src={courses.image} alt="" />
                </div>
              </div>
              <div className="card-header d-flex flex-wrap">
                <h3 className="me-auto">{courses.name}</h3>
                <h3
                  className={
                    courses.approveStatus === 1
                      ? "me-5 badge badge-xl badge-warning"
                      : courses.approveStatus === 3
                      ? "me-5 badge badge-xl badge-success"
                      : "me-5 badge badge-xl badge-danger"
                  }
                >
                  {courses.approveStatus === 1
                    ? "Pending"
                    : courses.approveStatus === 3
                    ? "Approved"
                    : "Reject"}
                </h3>
              </div>
            </div>
            <div className="card-body d-flex pt-0 ms-3 align-items-center flex-wrap course-detail-title">
              <div className="d-flex align-items-center me-5 pe-4 mb-xxl-0 mb-2  ">
                <span className="key-icon me-3">
                  <svg
                    width="32"
                    height="16"
                    viewBox="0 0 32 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.1585 6.41671C16.8932 2.80354 20.0899 0.0833735 23.9168 0.0833737C28.2868 0.0833739 31.8335 3.63004 31.8335 8.00004C31.8335 12.3685 28.2868 15.9167 23.9168 15.9167C20.0899 15.9167 16.8932 13.195 16.1585 9.58337L9.66683 9.58337L9.66683 12.75C9.66683 13.6225 8.9575 14.3334 8.0835 14.3334C7.2095 14.3334 6.50016 13.6225 6.50016 12.75L6.50016 9.58337L3.3335 9.58337L3.3335 12.75C3.3335 13.6225 2.62416 14.3334 1.75016 14.3334C0.876161 14.3334 0.166828 13.6225 0.166828 12.75L0.166828 8.00004C0.166828 7.12446 0.876162 6.41671 1.75016 6.41671L16.1585 6.41671ZM28.6668 8.00004C28.6668 10.6205 26.5388 12.75 23.9168 12.75C21.2948 12.75 19.1668 10.6205 19.1668 8.00004C19.1668 5.37804 21.2948 3.25004 23.9168 3.25004C26.5388 3.25004 28.6668 5.37804 28.6668 8.00004Z"
                      fill="white"
                    />
                  </svg>
                </span>
                <div>
                  <h5 className="text-primary">Course ID #{courses.id}</h5>
                  <h4 className="card-title mb-0">{courses.classUrl}</h4>
                </div>
              </div>

              <div className="d-sm-flex d-inline-block align-items-center mt-4 course-detail-infor">
                <div className="col-5 me-5 mb-sm-0 mb-3">
                  <p className="mb-2">
                    <i className="far fa-calendar-minus scale3 me-3"></i>Create
                    Date
                  </p>
                  <h4 className="mb-0 card-title">{courses.createTime}</h4>
                </div>
                <div className="col-3 me-5 mb-sm-0 mb-3">
                  <p className="mb-2">
                    <i className="far fa-user scale3 me-3"></i>Estimate Hours
                  </p>
                  <h4 className="mb-0 card-title">
                    {courses.estimateHour} hours
                  </h4>
                </div>
                <div className="col-4 me-5 mb-sm-0 mb-3">
                  <p className="mb-2">
                    <i className="fas fa-bed scale3 me-3"></i>Price
                  </p>
                  <h4 className="mb-0 card-title">{courses.price} VND</h4>
                </div>
              </div>
              <button
                type="button"
                class="me-2 btn btn-outline-success btn-rounded"
                onClick={handleChangeStatus}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-xxl-4">
          <div className="card profile-card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <img
                  src={mentors.mentor.image}
                  alt=""
                  className="rounded profile-img me-4"
                />
                <div>
                  <h5 className="text-primary">#{mentors.mentor.id}</h5>
                  <h4 className="mb-0">{mentors.mentor.fullName}</h4>
                </div>
              </div>
              <div className="row mt-1 pt-3">
                <div className="col-8">
                  <Link to={"#"} className="btn btn-dark light btn-block">
                    View Profile
                  </Link>
                </div>
                {/* <div className="col-4">
                  <Link to={"#"} className="btn btn-danger btn-block">
                    <i className="far fa-times-circle scale3"></i>
                  </Link>
                </div> */}
              </div>
              <ul className="user-info-list">
                <li>
                  <i className="fas fa-phone-volume"></i>
                  <span>{mentors.mentor.phone}</span>
                </li>
                <li>
                  <i className="far fa-envelope"></i>
                  <span className="overflow-hidden">{mentors.mentor.job}</span>
                </li>
                <li>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>
                    {mentors.mentor.address}, {mentors.mentor.country}
                  </span>
                </li>
              </ul>
              {/* <Col xs={12}>
                <hr />
                <br />
              </Col> */}
            </div>
            <div className="card-header ">
              <div className="card-body p-0 pb-3">
                <h3 className="text-align-center">More Information</h3>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <span className="mb-0 title">Publish Date</span> :
                    <span className="text-black ms-2">
                      {courses.publishDate}
                    </span>
                  </li>
                  <li className="list-group-item">
                    <span className="mb-0 title">Update Date</span> :
                    <span className="text-black ms-2">
                      {courses.publishDate}
                    </span>
                  </li>
                  <li className="list-group-item">
                    <span className="mb-0 title">Capacity</span> :
                    <span className="text-black desc-text ms-2">
                      {courses.capacity}
                    </span>
                  </li>
                  <li className="list-group-item">
                    <span className="mb-0 title">Discount</span> :
                    <span className="text-black ms-2">
                      {courses.discount} %
                    </span>
                  </li>
                  <li className="list-group-item">
                    <span className="mb-0 title">Subject</span> :
                    <span className="text-black ms-2">
                      {subjects.subject.name}
                    </span>
                  </li>
                  <li className="list-group-item">
                    <span className="mb-0 title">Major</span> :
                    <span className="text-black desc-text ms-2">
                      {majors.major.name}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default GuestDetail;

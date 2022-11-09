import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import swal from "sweetalert";
import ReactPlayer from "react-player";
import { connect, useDispatch } from "react-redux";
import Loader from "../../loader";
import { loadingToggleAction } from "../../../store/actions/AuthActions";

import CourseService from "../../../services/api/course/CourseService";

import PageTitle from "../../layouts/PageTitle";

const CourseDetail = (props) => {
  const { id } = useParams();

  const history = useHistory();
  const dispatch = useDispatch();

  const today = new Date(),
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      " " +
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds();

  const [mentors, setMentor] = useState({
    mentor: "",
  });

  const [majors, setMajors] = useState({
    major: "",
  });

  const [subjects, setSubjects] = useState({
    subject: "",
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const [checked, setChecked] = useState(false);

  const canBeSubmitted = () => {
    return checked ? setIsDisabled(true) : setIsDisabled(false);
  };

  const onCheckboxClick = () => {
    setChecked(!checked);
    return canBeSubmitted();
  };

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
      dispatch(loadingToggleAction(true));
      try {
        const response = await CourseService.getCourseById(id);
        setCourses(response.data);
        setMentor(response.data);
        setMajors(response.data);
        setSubjects(response.data);
      } catch (error) {
        console.log(error);
      }
      dispatch(loadingToggleAction(false));
    };
    fetchData();
  }, [id]);

  const handleChangeStatus = (e) => {
    //e.preventDefault();
    dispatch(loadingToggleAction(true));
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", courses.name);
    formData.append("detail", courses.detail);
    formData.append("videoUrl", courses.videoUrl);
    formData.append("image", courses.image);
    formData.append("price", courses.price);
    formData.append("discount", courses.discount);
    formData.append("capacity", courses.capacity);
    formData.append("classUrl", courses.classUrl);
    formData.append("estimateHour", courses.estimateHour);
    formData.append("subjectId", courses.subjectId);
    formData.append("mentorId", courses.mentorId);
    formData.append("createTime", courses.createTime);
    formData.append("updateTime", " ");
    formData.append("publishDate", date);
    formData.append("isActived", courses.isActived);
    formData.append("approver", "Admin");
    formData.append("approveStatus", 3);
    CourseService.updateCourse(formData)
      .then(() => {
        dispatch(loadingToggleAction(false));
        swal("Success!", "Approved Successful", "success");
        history.push("/course");
      })
      .catch((error) => {
        console.log(error);
      });
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
  };

  return (
    <>
      {props.showLoading && <Loader />}
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
            <div className="card-header d-block">
              <div className="course-img pb-3">
                <ReactPlayer
                  url={courses.videoUrl}
                  width="730px"
                  height="300px"
                  playing={true}
                  controls={true}
                  muted={true}
                />
              </div>
              <div className="d-flex flex-wrap mt-3">
                <h3 className="me-auto">{courses.name}</h3>
                <h3
                  className={
                    courses.approveStatus === 1
                      ? "badge badge-xl badge-warning"
                      : courses.approveStatus === 3
                      ? "badge badge-xl badge-success"
                      : "badge badge-xl badge-danger"
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
            <div className="card-body pt-0 ms-3 align-items-center flex-wrap course-detail-title">
              <div className="d-flex align-items-center guest-bx">
                <div
                  id="carouselExampleControls"
                  className="carousel slide me-3 mt-4"
                >
                  <div className="carousel-inner">
                    <img
                      src={courses.image}
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <h5 className="text-primary">Course ID #{courses.id}</h5>
                  <h4 className="card-title mb-0">{courses.classUrl}</h4>
                </div>
              </div>
              <div className="d-flex d-inline-block align-items-center mt-4 course-detail-infor">
                <div className="col-5 mb-sm-0">
                  <p className="mb-2">
                    <i className="far fa-calendar-minus scale3 me-2"></i>Create
                    Date
                  </p>
                  <h4 className="mb-0 card-title">
                    {new Date(courses.createTime).toLocaleString()}
                  </h4>
                </div>
                <div className="col-3 mb-sm-0">
                  <p className="mb-2">
                    <i className="far fa-clock scale3 me-2"></i>Estimate Hours
                  </p>
                  <h4 className="mb-0 card-title">
                    {courses.estimateHour} hours
                  </h4>
                </div>
                <div className="col-4 mb-sm-0">
                  <p className="mb-2">
                    <i className="fas fa-money-bill-wave scale3 me-2"></i>Price
                  </p>
                  <h4 className="mb-0 card-title">{courses.price} VND</h4>
                </div>
              </div>
              <div className="mt-4">
                <p class="card-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. A,
                  minima! Eligendi minima illum itaque harum aliquam vel, sunt
                  magni dolorem! Cum quaerat est cupiditate saepe quidem, fugiat
                  in at magni ad provident distinctio eum tempore laboriosam
                  adipisci, tempora cumque ex quis unde voluptatem consequuntur.
                  Excepturi quibusdam accusamus deleniti officiis ullam
                  repellendus magni unde? Saepe quibusdam vel, ipsum numquam
                  ratione tempore.
                </p>
              </div>
            </div>
            {courses.approveStatus === 1 ? (
              <div class="d-flex justify-content-between align-items-center card-footer">
                <div className="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox1"
                    required
                    onClick={onCheckboxClick}
                  />
                  <label
                    className="form-check-label text-primary fs-16"
                    htmlFor="customCheckBox1"
                  >
                    Admin already checked all conditions
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={isDisabled}
                  onClick={handleChangeStatus}
                >
                  Approve
                </button>
              </div>
            ) : (
              <div class="d-flex justify-content-between align-items-center card-footer">
                <p class=" text-dark d-inline card-text">
                  Approved at {new Date(courses.publishDate).toLocaleString()}
                </p>
                <button className="btn btn-primary">
                  Approved{" "}
                  <span class="btn-icon-end">
                    <i class="fa fa-check"></i>
                  </span>
                </button>
              </div>
            )}
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
                  <i className="fas fa-briefcase"></i>
                  <span className="overflow-hidden">{mentors.mentor.job}</span>
                </li>
                <li>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>
                    {mentors.mentor.address}, {mentors.mentor.country}
                  </span>
                </li>
              </ul>
            </div>
            <div className="card-body">
              <h3 className="text-align-center">More Information</h3>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <span className="mb-0 title">Publish Date</span> :
                  <span className="text-black ms-2">
                    {courses.publishDate === null
                      ? "Course Not Approve By Admin"
                      : new Date(courses.publishDate).toLocaleString()}
                  </span>
                </li>
                <li className="list-group-item">
                  <span className="mb-0 title">Update Date</span> :
                  <span className="text-black ms-2">
                    {courses.updateTime === null
                      ? "Course Not Update By Mentor"
                      : courses.updateTime}
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
                  <span className="text-black ms-2">{courses.discount} %</span>
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
                <li className="list-group-item">
                  <span className="mb-0 title">Approver</span> :
                  <span className="text-black desc-text ms-2">
                    {courses.approver === null ? "Not Yet" : courses.approver}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(CourseDetail);

import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Tab, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import Loader from "../../loader";
import { loadingToggleAction } from "../../../store/actions/AuthActions";

///Import
import Approved from "./Status/Approved/Approved";
import Pending from "./Status/Pending/Pending";
import Reject from "./Status/Reject/Reject";

import MentorService from "../../../services/api/mentor/MentorService";

const MentorList = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  //useState For Search
  const [search, setSearch] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  //useState For Render
  const [loading, setLoading] = useState(true);
  const [mentors, setMentors] = useState([]);

  //Search Function
  const handleFilter = (e) => {
    if (e.target.value === "") {
      setMentors(search);
    } else {
      const filterResult = search.filter((item) =>
        item.fullName.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setMentors(filterResult);
    }
    setFilterValue(e.target.value);
  };

  //Fetch Data Api
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      dispatch(loadingToggleAction(true));
      try {
        const response = await MentorService.getMentors();
        setMentors(response.data);
        setSearch(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
      dispatch(loadingToggleAction(false));
    };
    fetchData();
  }, []);

  const editMentor = (e, id) => {
    e.preventDefault();
    history.push(`./${id}-mentor-edit`);
  };

  const sort = 5;
  let paggination = Array(Math.ceil(mentors.length / sort))
    .fill()
    .map((_, i) => i + 1);

  const activePag = useRef(0);
  const jobData = useRef(
    mentors.slice(activePag.current * sort, (activePag.current + 1) * sort)
  );

  const onClick = (i) => {
    activePag.current = i;
    jobData.current = mentors.slice(
      activePag.current * sort,
      (activePag.current + 1) * sort
    );
  };

  useEffect(() => {
    jobData.current = mentors.slice(
      activePag.current * sort,
      (activePag.current + 1) * sort
    );
  });

  // const chackbox = document.querySelectorAll(".sorting_1 input");
  // const motherChackBox = document.querySelector(".sorting_asc input");
  // // console.log(document.querySelectorAll(".sorting_1 input")[0].checked);
  // const chackboxFun = (type) => {
  //   for (let i = 0; i < chackbox.length; i++) {
  //     const element = chackbox[i];
  //     if (type === "all") {
  //       if (motherChackBox.checked) {
  //         element.checked = true;
  //       } else {
  //         element.checked = false;
  //       }
  //     } else {
  //       if (!element.checked) {
  //         motherChackBox.checked = false;
  //         break;
  //       } else {
  //         motherChackBox.checked = true;
  //       }
  //     }
  //   }
  // };
  return (
    <>
      {props.showLoading && <Loader />}
      <Tab.Container defaultActiveKey="All">
        <div className="row">
          <div className="col-xl-12">
            <div className="d-flex mb-4 justify-content-between align-items-center flex-wrap">
              {/* <div className="card-tabs mt-3 mt-sm-0 mb-xxl-0 mb-4">
                <Nav as="ul" className="nav nav-tabs">
                  <Nav.Item as="li" className="nav-item">
                    <Nav.Link className="nav-link" eventKey="All">
                      All Mentor
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item as="li" className="nav-item">
                    <Nav.Link className="nav-link" eventKey="Approved">
                      Approved
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item as="li" className="nav-item">
                    <Nav.Link className="nav-link" eventKey="Pending">
                      Pending
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item as="li" className="nav-item">
                    <Nav.Link className="nav-link" eventKey="Reject">
                      Reject
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div> */}
              <div className="table-search">
                <div className="input-group search-area mb-xxl-0 mb-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search here"
                    value={filterValue}
                    onInput={(e) => handleFilter(e)}
                  />
                  <span className="input-group-text">
                    <i className="flaticon-381-search-2"></i>
                  </span>
                </div>
              </div>
            </div>
            <Tab.Content>
              <Tab.Pane eventKey="All">
                <div className="table-responsive">
                  <div
                    id="example2_wrapper"
                    className="dataTables_wrapper no-footer"
                  >
                    <table
                      id="example2"
                      className="table card-table default-table display mb-4 dataTablesCard dataTable no-footer"
                    >
                      <thead>
                        <tr role="row">
                          {/* <th className="sorting_asc bg-none">
                            <div className="form-check  style-1">
                              <input
                                type="checkbox"
                                onClick={() => chackboxFun("all")}
                                className="form-check-input"
                                id="checkAll"
                                required=""
                              />
                            </div>
                          </th> */}
                          <th>Full Name</th>
                          <th>Job</th>
                          <th>Address</th>
                          <th>Qualification</th>
                          <th>Gender</th>
                          <th>Contact</th>
                          <th>Status</th>
                          <th className="bg-none"></th>
                        </tr>
                      </thead>
                      {!loading && (
                        <tbody>
                          {jobData.current.map((mentor) => {
                            return (
                              <tr role="row" className="odd" key={mentor.id}>
                                <td>
                                  <div className="media-bx">
                                    <img
                                      className="me-3 rounded"
                                      src={mentor.image}
                                      alt=""
                                    />
                                    <div>
                                      <h4 className="mb-0 mt-1">
                                        <Link
                                          to={`./${mentor.id}-mentor-detail`}
                                          className="text-black"
                                        >
                                          {mentor.fullName}
                                        </Link>
                                      </h4>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div>
                                    <h5>{mentor.job}</h5>
                                  </div>
                                </td>
                                <td>
                                  <div>
                                    <h5 className="font-w600">
                                      {mentor.address}
                                    </h5>
                                    <span>{mentor.country}</span>
                                  </div>
                                </td>
                                <td>
                                  <div>
                                    <h5>{mentor.qualification}</h5>
                                  </div>
                                </td>
                                <td>
                                  <h5>{mentor.gender}</h5>
                                </td>
                                <td>
                                  <div className="text-nowrap">
                                    <span className="text-black font-w500">
                                      <i className="fas fa-phone-volume me-2 text-primary"></i>
                                      {mentor.phone}
                                    </span>
                                  </div>
                                </td>
                                <td>
                                  <span
                                    className={
                                      mentor.approveStatusId === 1
                                        ? "text-warning font-w600"
                                        : mentor.approveStatusId === 3
                                        ? "text-success font-w600"
                                        : mentor.approveStatusId === 4
                                        ? "text-danger font-w600"
                                        : "text-muted font-w600"
                                    }
                                  >
                                    {mentor.approveStatusId === 1
                                      ? "PENDING"
                                      : mentor.approveStatusId === 3
                                      ? "APPROVED"
                                      : mentor.approveStatusId === 4
                                      ? "REJECT"
                                      : "NOT REQUEST"}
                                  </span>
                                </td>
                                <td>
                                  <Dropdown className="dropdown">
                                    <Dropdown.Toggle
                                      as="div"
                                      className="btn-link i-false"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z"
                                          stroke="#262626"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M18 12C18 12.5523 18.4477 13 19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12Z"
                                          stroke="#262626"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M4 12C4 12.5523 4.44772 13 5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12Z"
                                          stroke="#262626"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="dropdown-menu">
                                      <Dropdown.Item
                                        className="dropdown-item"
                                        onClick={(e, id) =>
                                          editMentor(e, mentor.id)
                                        }
                                      >
                                        Edit
                                      </Dropdown.Item>
                                      {/* <Dropdown.Item className="dropdown-item">
                                        Delete
                                      </Dropdown.Item> */}
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      )}
                    </table>
                    <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
                      <div className="dataTables_info">
                        Showing {activePag.current * sort + 1} to{" "}
                        {mentors.length > (activePag.current + 1) * sort
                          ? (activePag.current + 1) * sort
                          : mentors.length}{" "}
                        of {mentors.length} entries
                      </div>
                      <div
                        className="dataTables_paginate paging_simple_numbers"
                        id="example2_paginate"
                      >
                        <Link
                          className="paginate_button previous disabled"
                          to="/mentor"
                          onClick={() =>
                            activePag.current > 0 &&
                            onClick(activePag.current - 1)
                          }
                        >
                          <i
                            className="fa fa-angle-double-left"
                            aria-hidden="true"
                          ></i>
                        </Link>
                        <span>
                          {paggination.map((number, i) => (
                            <Link
                              key={i}
                              to="/mentor"
                              className={`paginate_button  ${
                                activePag.current === i ? "current" : ""
                              } `}
                              onClick={() => onClick(i)}
                            >
                              {number}
                            </Link>
                          ))}
                        </span>

                        <Link
                          className="paginate_button next"
                          to="/mentor"
                          onClick={() =>
                            activePag.current + 1 < paggination.length &&
                            onClick(activePag.current + 1)
                          }
                        >
                          <i
                            className="fa fa-angle-double-right"
                            aria-hidden="true"
                          ></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="Approved">
                <Approved />
              </Tab.Pane>
              <Tab.Pane eventKey="Pending">
                <Pending />
              </Tab.Pane>
              <Tab.Pane eventKey="Reject">
                <Reject />
              </Tab.Pane>
            </Tab.Content>
          </div>
        </div>
      </Tab.Container>
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
export default connect(mapStateToProps)(MentorList);

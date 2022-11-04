import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Tab } from "react-bootstrap";

import SubjectService from "../../../services/api/subject/SubjectService";

const DropdownBlog = () => {
  return (
    <>
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
          <Dropdown.Item className="dropdown-item">Edit</Dropdown.Item>
          <Dropdown.Item className="dropdown-item">Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

const SubjectList = () => {
  // const [data, setData] = useState(
  //   document.querySelectorAll("#room_wrapper tbody tr")
  // );

  //useState For Search
  const [search, setSearch] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  //useState For Render
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState(null);

  //Search Function
  const handleFilter = (e) => {
    if (e.target.value === "") {
      setSubjects(search);
    } else {
      const filterResult = search.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSubjects(filterResult);
    }
    setFilterValue(e.target.value);
  };

  //Fetch Data Api
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await SubjectService.getSubjects();
        setSubjects(response.data);
        setSearch(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // const sort = 10;
  // const activePag = useRef(0);
  // const [test, settest] = useState(0);

  // // Active data
  // const chageData = (frist, sec) => {
  //   for (var i = 0; i < data.length; ++i) {
  //     if (i >= frist && i < sec) {
  //       data[i].classList.remove("d-none");
  //     } else {
  //       data[i].classList.add("d-none");
  //     }
  //   }
  // };

  // // use effect
  // useEffect(() => {
  //   setData(document.querySelectorAll("#room_wrapper tbody tr"));
  //   //chackboxFun();
  // }, [test]);

  // // Active pagginarion
  // activePag.current === 0 && chageData(0, sort);
  // // paggination
  // let paggination = Array(Math.ceil(data.length / sort))
  //   .fill()
  //   .map((_, i) => i + 1);

  // // Active paggination & chage data
  // const onClick = (i) => {
  //   activePag.current = i;
  //   chageData(activePag.current * sort, (activePag.current + 1) * sort);
  //   settest(i);
  // };

  const chackbox = document.querySelectorAll(".sorting_7 input");
  const motherChackBox = document.querySelector(".sorting_asc_7 input");
  // console.log(document.querySelectorAll(".sorting_1 input")[0].checked);
  const chackboxFun = (type) => {
    for (let i = 0; i < chackbox.length; i++) {
      const element = chackbox[i];
      if (type === "all") {
        if (motherChackBox.checked) {
          element.checked = true;
        } else {
          element.checked = false;
        }
      } else {
        if (!element.checked) {
          motherChackBox.checked = false;
          break;
        } else {
          motherChackBox.checked = true;
        }
      }
    }
  };
  return (
    <>
      <Tab.Container defaultActiveKey="All">
        <div className="row">
          <div className="col-xl-12">
            <div className="d-flex mb-4 justify-content-between align-items-center flex-wrap">
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
              <Link
                to={"/create-subject"}
                className="btn btn-primary mb-xxl-0 mb-4"
              >
                <i className="far fa-plus-square me-2"></i>New
              </Link>
            </div>
            <Tab.Content>
              <Tab.Pane eventKey="All">
                <div className="table-responsive">
                  <div
                    id="room_wrapper"
                    className="dataTables_wrapper no-footer"
                  >
                    <table className="table card-table display mb-4 dataTablesCard booking-table room-list-tbl dataTable no-footer">
                      <thead>
                        <tr role="row">
                          <th className="sorting_asc_7 bg-none">
                            <div className="form-check  style-1">
                              <input
                                type="checkbox"
                                onClick={() => chackboxFun("all")}
                                className="form-check-input"
                                id="checkAll"
                                required=""
                              />
                            </div>
                          </th>
                          <th>Major Name</th>
                          <th>Major</th>

                          <th>Detail</th>
                          <th className="bg-none"></th>
                        </tr>
                      </thead>
                      {!loading && (
                        <tbody>
                          {subjects.map((subject) => {
                            return (
                              <tr role="row" className="odd" key={subject.id}>
                                <td className="sorting_7">
                                  <div className="form-check   style-1">
                                    <input
                                      type="checkbox"
                                      onClick={() => chackboxFun()}
                                      className="form-check-input"
                                      id="customCheckBox21"
                                      required=""
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div className="guest-bx">
                                    <div
                                      id="carouselExampleControls"
                                      className="carousel slide me-3"
                                    >
                                      <div className="carousel-inner">
                                        <img
                                          src={subject.image}
                                          className="d-block w-100"
                                          alt="..."
                                        />
                                      </div>
                                    </div>
                                    <div>
                                      <span className="text-primary">
                                        #{subject.id}
                                      </span>
                                      <h4 className="mb-0 mt-1">
                                        <Link
                                          className="text-black"
                                          to={"./course-detail"}
                                        >
                                          {subject.name}
                                        </Link>
                                      </h4>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <span className="text-dark font-w600">
                                    {subject.major.name}
                                  </span>
                                </td>
                                <td>
                                  <div>
                                    <span className="fs-16">
                                      {subject.detail}
                                    </span>
                                  </div>
                                </td>
                                <td>
                                  <DropdownBlog />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      )}
                    </table>
                    {/* <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
                      <div className="dataTables_info">
                        Showing {activePag.current * sort + 1} to{" "}
                        {data.length > (activePag.current + 1) * sort
                          ? (activePag.current + 1) * sort
                          : data.length}{" "}
                        of {data.length} entries
                      </div>
                      <div
                        className="dataTables_paginate paging_simple_numbers mb-0"
                        id="example2_paginate"
                      >
                        <Link
                          className="paginate_button previous disabled"
                          to="/guest-list"
                          onClick={() =>
                            activePag.current > 0 &&
                            onClick(activePag.current - 1)
                          }
                        >
                          <i className="fa fa-angle-double-left"></i> Previous
                        </Link>
                        <span>
                          {paggination.map((number, i) => (
                            <Link
                              key={i}
                              to="/guest-list"
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
                          to="/guest-list"
                          onClick={() =>
                            activePag.current + 1 < paggination.length &&
                            onClick(activePag.current + 1)
                          }
                        >
                          Next <i className="fa fa-angle-double-right"></i>
                        </Link>
                      </div>
                    </div> */}
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </div>
        </div>
      </Tab.Container>
    </>
  );
};

export { DropdownBlog };
export default SubjectList;

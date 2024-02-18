/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  faExclamationCircle,
  faPlus,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import Select from "react-select";
import { useGetUserRoleQuery } from "../../../redux/api/apiSlice";
const UserCreation = () => {
  const { data } = useGetUserRoleQuery(undefined);

  const handleCreateUser = () => {};
  const options = data?.map(({ _id, user_role_name }) => ({
    value: _id,
    label: user_role_name,
  }));

  return (
    <div className="container-fluid p-0 m-0">
      <nav class="navbar navbar-expand-lg" style={{ background: "#CBF3F0" }}>
        <div class="container">
          <div
            class="collapse navbar-collapse d-flex justify-content-start align-items-center"
            id="navbarNav"
          >
            <ul class="navbar-nav ">
              <li class="nav-item nav-button-active">
                <a class="active nav-link text-uppercase">User List</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link text-uppercase
          "
                  href="#"
                >
                  Add User(s)
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="container">
        <div className="shadow-lg mt-5 p-5 rounded-4">
          <div className="d-flex justify-content-between align-items-center border-bottom">
            <p>
              <FontAwesomeIcon
                style={{ fontSize: "20px", color: "#00B987" }}
                icon={faUserAlt}
              />
              <FontAwesomeIcon
                style={{ fontSize: "14px", color: "#00B987" }}
                icon={faPlus}
              />
              &nbsp;
              <span style={{ color: "#000", fontWeight: "700" }}>
                Add user(s)
              </span>
            </p>
            <p style={{ fontSize: "20px", color: "red" }}>
              <FontAwesomeIcon icon={faExclamationCircle}></FontAwesomeIcon>
            </p>
          </div>
          <div className="mt-5">
            <Form onSubmit={handleCreateUser}>
              <div className="d-flex justify-content-between align-items-center">
                <div className="w-100 ">
                  <Form.Label htmlFor="inputPassword5" className="text-dark">
                    First name
                  </Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="User's first name"
                      name="firstname"
                      required
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      //   value={email} onChange={(e) => setEmail(e.target.value)}
                      style={{ border: "1px solid #00B987" }}
                    />
                  </InputGroup>
                </div>

                <div className="w-100 ms-2">
                  <Form.Label htmlFor="inputPassword5" className="text-dark">
                    Last name
                  </Form.Label>
                  <InputGroup className="mb-3 ">
                    <Form.Control
                      placeholder="User's last name"
                      name="lastname"
                      required
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      //   value={email} onChange={(e) => setEmail(e.target.value)}

                      style={{ border: "1px solid #00B987" }}
                    />
                  </InputGroup>
                </div>
                <div className="w-100 ms-2">
                  <Form.Label htmlFor="inputPassword5" className="text-dark">
                    Mobile No
                  </Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="User's mobile no"
                      name="mobileno"
                      required
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      //   value={email} onChange={(e) => setEmail(e.target.value)}
                      style={{ border: "1px solid #00B987" }}
                    />
                  </InputGroup>
                </div>
                <div className="w-100 ms-2">
                  <Form.Label htmlFor="inputPassword5" className="text-dark">
                    User role
                  </Form.Label>
                  <Select
                    class="form-select"
                    className=" mb-3"
                    aria-label="Default select example"
                    name="itemType"
                    options={options}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? "#00B987" : "#00B987",
                      }),
                    }}
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary25: "#CBF3F0",
                        primary: "#00B987",
                      },
                    })}
                    // style={{ border: "1px solid #00B987" }}
                    // value={typeOption.find((x)=>x.value==itemInformation.itemType)}
                    onChange={(e) => {
                        console.log(e.value)
                      //   itemInformation.itemType = e.value;
                    }}
                  ></Select>
                </div>
              </div>
            </Form>
          </div>
        </div>
        <div className="d-flex justify-content-end mt-5">
          <div className="d-flex justify-content-end">
            <button
              className="btn text-uppercase rounded-4"
              style={{
                border: "1px solid #00B987",
                color: "#00B987",
                fontWeight: "700",
                outline: "none",
              }}
            >
              Reset
            </button>{" "}
            &nbsp;&nbsp;&nbsp;
            <button
              className="btn text-uppercase rounded-4"
              style={{
                background: "#00B987",
                color: "#fff",
                fontWeight: "700",
                outline: "none",
                border: "none",
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCreation;

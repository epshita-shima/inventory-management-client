/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  faExclamationCircle,
  faPlus,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import Select from "react-select";
import "./UserCreation.css";
import UserRoleEntryModal from "../../UserRoleInformation/Insert/UserRoleEntryModal";
import { useGetUserRoleQuery } from "../../../redux/features/userrole/userroleApi";

const UserCreation = () => {
  const { data } = useGetUserRoleQuery(undefined);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    mobileNo: '',
  });
console.log(formData)
  const [password, setPassword] = useState("LC00");
  const [isActive, setIsActive] = useState(true);
  const [roleId, setRoleId] = useState("");
  const [validated, setValidated] = useState(false);
  console.log(validated)
  const handleCreateUser = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);

    // Check if any field is empty
    const isEmpty = Object.values(formData).some(value => value === '');
    if (isEmpty) {
      return;
    }
    // Handle form submission, for example, send data to backend
    console.log('Form submitted:', formData);
  };
  
  const handleChange = (e) => {
    const values = formData;
    values[e.target.name] = e.target.value;
    setFormData(values);
  };

  const options = data?.map(({ _id, userrolename }) => ({
    value: _id,
    label: userrolename,
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
            <Form  validated={validated} onSubmit={handleCreateUser}>
              <div className="d-flex justify-content-between align-items-center">
                <div className="w-100 ">
                  <Form.Group controlId="formInput" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="User's first name"
                      className="input-with-bottom-border"
                      value={formData.firstname}
                      onChange={(e)=>handleChange(e)}
                    />
                    <Form.Control.Feedback type="invalid">Please provide a firstname.</Form.Control.Feedback>
                  </Form.Group>
                </div>

                <div className="w-100 ms-2">
                  <Form.Group controlId="formInput" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="User's last name"
                      className="input-with-bottom-border"
                      value={formData.lastname}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">Please provide a lastname.</Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="w-100 ms-2">
                  <Form.Group controlId="formInput" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Mobile no"
                      className="input-with-bottom-border"
                      value={formData.mobileNo}
                      onChange={handleChange}
                    />
                     <Form.Control.Feedback type="invalid">Please provide a mobile.</Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="w-100 ms-2">
                  <Form.Group controlId="formInput" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Password"
                      className="input-with-bottom-border"
                      value={password}
                      style={{background:'transparent'}}
                      // onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div className="d-flex justify-content-between align-items-center w-100 ms-2">
                  <div className="w-100">
                    <Select
                      class="form-select"
                      className=" mb-3"
                      aria-label="Default select example"
                      name="itemType"
                      options={options}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: state.isFocused ? "#fff" : "#fff",
                          border: "none",
                          borderBottom: "1px solid #00B987",
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
                        console.log(e.value);
                        setRoleId(e.value);
                        //   itemInformation.itemType = e.value;
                      }}
                    ></Select>
                  </div>
                  <div className="mt-3 ms-2">
                    <FontAwesomeIcon
                      className="border align-middle text-center p-2 fs-3 rounded-5 text-light"
                      style={{ background: "#00B987" }}
                      icon={faPlus}
                      data-toggle="modal"
                      data-target="#exampleModal"
                    />
                  </div>
                </div>
                {validated && Object.entries(formData).map(([fieldName, value]) => (
        value === '' && <p key={fieldName} className="text-danger ">{`${fieldName} is required.`}</p>
      ))}
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
              onClick={handleCreateUser}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <UserRoleEntryModal></UserRoleEntryModal>
    </div>
  );
};

export default UserCreation;

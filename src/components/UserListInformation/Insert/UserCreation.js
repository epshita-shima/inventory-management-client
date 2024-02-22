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
import { useGetAllMenuItemsQuery } from "../../../redux/features/menus/menuApi";
import Menu from "./Menu";


const UserCreation = () => {
  const { data: userRoleData, isError: userRoleIsError, isLoading: userRoleIsLoading } = useGetUserRoleQuery();
  const { data: menuItems, isError: menuItemsIsError, isLoading: menuItemsIsLoading } = useGetAllMenuItemsQuery();

  const [password, setPassword] = useState("LC00");
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    mobileNo: '',
    password:'LC00',
    roleId:''
  });
  if(menuItemsIsLoading){
    return <p>Loading...</p>
  }
console.log(menuItems)
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
    const { name, value } = e.target;
    if (!(name in formData)) {
      console.error(`Field "${name}" does not exist in formData state.`);
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const options = userRoleData?.map(({ _id, userrolename }) => ({
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
                <div className="w-100">
                  <div >
                  <Form.Group controlId="formInput">
                    <Form.Control
                      type="text"
                      name='firstname'
                      placeholder="User's first name"
                      className="input-with-bottom-border"
                      value={formData.firstname}
                      onChange={(e)=>handleChange(e)}
                      isInvalid={validated && formData.firstname === ''}
                    />
                    <Form.Control.Feedback className="mt-2" type="invalid">Please provide a firstname.</Form.Control.Feedback>
                    {validated && formData.lastname === '' && <div style={{ height: '0px' }}></div>}
                  </Form.Group>
                  </div>
                  {/* <div className="">
                  {validated && formData.firstname === '' && <p className="text-danger ">{`Firstname is required.`}</p>}
                  </div> */}
                </div>

                <div className="w-100 ms-2">
                  <div>
                  <Form.Group controlId="formInput" >
                    <Form.Control
                      type="text"
                      name='lastname'
                      placeholder="User's last name"
                      className="input-with-bottom-border"
                      value={formData.lastname}
                      onChange={handleChange}
                      isInvalid={validated && formData.lastname === ''}
                    />
                    <Form.Control.Feedback  type="invalid">Please provide a lastname.</Form.Control.Feedback>
                    {validated && formData.lastname === '' && <div style={{ height: '0px' }}></div>}
                  </Form.Group>
                  </div>
                  
                </div>
                <div className="w-100 ms-2">
                  <Form.Group controlId="formInput">
                    <Form.Control
                      type="text"
                      name='mobileNo'
                      placeholder="Mobile no"
                      className="input-with-bottom-border"
                      value={formData.mobileNo}
                      onChange={handleChange}
                      isInvalid={validated && formData.lastname === ''}
                    />
                     <Form.Control.Feedback type="invalid">Please provide a mobile.</Form.Control.Feedback>
                     {/* {validated && formData.lastname === '' && <div style={{ height: '20px' }}></div>} */}
                  </Form.Group>
                 
                </div>
                <div className="w-100 ms-2">
                  <Form.Group controlId="formInput">
                    <Form.Control
                      type="text"
                      placeholder="Password"
                      className="input-with-bottom-border"
                      value={password}
                      style={{background:'transparent'}}
                      isInvalid={validated && formData.password === ''}
                    />
                    <Form.Control.Feedback type="invalid">Please provide a password.</Form.Control.Feedback>
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
                        setFormData({...formData,['roleId']:e.value})
                      }}
                    ></Select>
                    
                     <div className="">
                  {validated && formData.roleId === '' && <p className="text-danger ">{`User role is required.`}</p>}
                  </div>
                  </div>
                  <div className=" ms-2">
                    <FontAwesomeIcon
                      className="border align-middle text-center p-2 fs-3 rounded-5 text-light"
                      style={{ background: "#00B987" }}
                      icon={faPlus}
                      data-toggle="modal"
                      data-target="#exampleModal"
                    />
                  </div>
                </div>
               
              </div>
           
            </Form>
          </div>
          <div className="mt-5">
<h4 className="fw-bold">Select Menu</h4>
<div className="accordion">
      {menuItems.map((item, index) => (
        <Menu key={index} item={item} />
      ))}
    </div>
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
            </button>
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

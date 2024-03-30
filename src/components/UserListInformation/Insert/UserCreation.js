/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  faExclamationCircle,
  faPlus,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import Select from "react-select";
import "./UserCreation.css";
import UserRoleEntryModal from "../../UserRoleInformation/Insert/UserRoleEntryModal";
import { useGetUserRoleQuery } from "../../../redux/features/userrole/userroleApi";
import { useGetAllMenuItemsQuery } from "../../../redux/features/menus/menuApi";

import {
  useCreateSerialNoMutation,
  useGetSerialNoQuery,
} from "../../../redux/api/apiSlice";
import {
  useCreateUserMutation,
  useGetSingleUserQuery,
} from "../../../redux/features/user/userApi";
import swal from "sweetalert";
import TreeView from "./TreeView";

import { useNavigate, useParams } from "react-router-dom";

const UserCreation = () => {
  const { id } = useParams();
  var [isUpdate] = useState(id ? true : false);
  const [clickedCheckboxes, setClickedCheckboxes] = useState([]);
  const [singleUserData, setSingleUserData] = useState([]);
const [serialValue, setSerialValue]=useState([])

  const {
    data: userRoleData,
    isError: userRoleIsError,
    isLoading: userRoleIsLoading,
  } = useGetUserRoleQuery();
  const {
    data: menuItems,
    isError: menuItemsIsError,
    isLoading: menuItemsIsLoading,
  } = useGetAllMenuItemsQuery();
  const { data: serialNo } = useGetSerialNoQuery(undefined);
  const [createSerialNo] = useCreateSerialNoMutation();
  const [createNewUser] = useCreateUserMutation();
console.log(JSON.stringify(menuItems))
  const navigate = useNavigate();
  useEffect(()=>{
    if( serialNo && serialNo.length > 0){
      const maxSerialNoObject = serialNo?.reduce((max, current) => {
        return current.serialNo > max.serialNo ? current : max;
      })
      setSerialValue(maxSerialNoObject)
    }
  },[serialNo])


  const [password, setPassword] = useState("LC00");
  const [validated, setValidated] = useState(false);
  const parentIds = [];
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    mobileNo: "",
    password: "LC00",
    roleId: "",
    username: "",
    isactive: true,
    menulist: [],
  });


  function mergePermissions(mainData, permissionsData) {
    // Helper function to merge permissions for items items recursively
    console.log(permissionsData)
    function mergeDropdownPermissions(mainDropdown, permissionsDropdown) {
      if (!mainDropdown || !permissionsDropdown.length===0) {
        return [];
      }
      return mainDropdown.map((mainItem) => {
        const permissionsItem = permissionsDropdown?.find(
          (permItem) => permItem && permItem._id === mainItem._id
        );
        if (permissionsItem) {
          // Merge permissions for the current items item
          return { ...mainItem, ...permissionsItem };
        }
        if (mainItem.items && permissionsItem && permissionsItem.items) {
          // If items items exist in both datasets, merge permissions recursively
          return {
            ...mainItem,
            items: mergeDropdownPermissions(
              mainItem.items,
              permissionsItem.items
            ),
          };
        }
        return mainItem;
      });
    }

    return mainData?.map((mainItem) => {
      console.log(mainItem)
      const permissionsItem = permissionsData?.find(
        (permItem) =>((permItem.parentIds).reduce((acc, key) => {
           // You can set any default value here
          return key===mainItem._id;
      }, {}))
        //  permItem && permItem.parentIds === mainItem._id
      );
      console.log(permissionsItem)
      if (permissionsItem && mainItem.items && permissionsItem.items) {
        // Merge permissions for the current main item's items items
        return {
          ...mainItem,
          items: mergeDropdownPermissions(
            mainItem.items,
            permissionsItem
          ),
        };
      }
      return mainItem;
    });
  }

  const mergedData = mergePermissions(menuItems,  formData?.menulist );
  console.log(JSON.stringify(mergedData));

  if (menuItemsIsLoading) {
    return <p>Loading...</p>;
  }
 
 
  //   const mergeCheckboxIntoDropdown = (items, clickedCheckboxes) => {
  //     return items.map(item => {
  //       const clickedCheckbox = clickedCheckboxes.find(checkbox => checkbox.childId === item._id);
  //       if (clickedCheckbox) {
  //         // Merge the clicked checkbox data into the items item
  //         return {
  //           ...item,
  //           trackId: clickedCheckbox.childId,
  //           permissions: [],
  //           insert: clickedCheckbox.insert,
  //           update: clickedCheckbox.update,
  //           pdf: clickedCheckbox.pdf,
  //           delete: clickedCheckbox.delete,
  //           isChecked: clickedCheckbox.isChecked,
  //           parentIds: clickedCheckbox.parentIds
  //         };
  //       } else if (item.items) {
  //         // Recursively merge into nested dropdowns
  //         return {
  //           ...item,
  //           items: mergeCheckboxIntoDropdown(item.items, clickedCheckboxes)
  //         };
  //       }
  //       return item;
  //     });
  //   };
  
  //   const clickedCheckboxe = clickedCheckboxes.filter(checkbox => checkbox.parentIds.includes(dataItem._id));
  
  //   if (clickedCheckboxe.length > 0) {
  //     // Clone dataItem to avoid modifying the original array
  //     const clonedDataItem = { ...dataItem };
  //     // Merge the checkbox data into the items array
  //     clonedDataItem.items = mergeCheckboxIntoDropdown(clonedDataItem.items, clickedCheckboxe);
  //     return clonedDataItem;
  //   }
  //   return dataItem;
  // });
  const mergedArray = mergedData.map(dataItem => {
    const mergeCheckboxIntoDropdown = (items, clickedCheckboxes) => {
      return items.map(item => {
        const clickedCheckbox = clickedCheckboxes.find(checkbox => checkbox.childId === item._id);
        const isChecked = clickedCheckbox ? clickedCheckbox.isChecked : false;
        const insert = clickedCheckbox ? clickedCheckbox.insert : false;
        const update = clickedCheckbox ? clickedCheckbox.update : false;
        const pdf = clickedCheckbox ? clickedCheckbox.pdf : false;
        const del = clickedCheckbox ? clickedCheckbox.delete : false;
        const parentIds = clickedCheckbox ? clickedCheckbox.parentIds : [];
        const trackId= clickedCheckbox ? clickedCheckbox.childId :item._id
        
        if (item.items) {
          return {
            ...item,
            trackId,
            isChecked,
            insert,
            update,
            pdf,
            delete: del,
            parentIds,
            items: mergeCheckboxIntoDropdown(item.items, clickedCheckboxes)
          };
        }
  
        return {
          ...item,
          trackId,
          isChecked,
          insert,
          update,
          pdf,
          delete: del,
          parentIds
        };
      });
    };
  
    const clickedCheckboxe = clickedCheckboxes.filter(checkbox => checkbox.parentIds.includes(dataItem._id));
  
    return {
      ...dataItem,
      items: mergeCheckboxIntoDropdown(dataItem.items, clickedCheckboxe)
    };
  });
  // const mergedArray = mergedData.map(dataItem => {
  //   const mergeCheckboxIntoDropdown = (items, clickedCheckboxes) => {
  //     let parentIsChecked = false; // Local variable to track if any child is checked
  //     const updatedDropdown = items.map(item => {
  //       const clickedCheckbox = clickedCheckboxes.find(checkbox => checkbox.childId === item._id);
  //       const isChecked = clickedCheckbox ? clickedCheckbox.isChecked : false;
  //       const insert = clickedCheckbox ? clickedCheckbox.insert : false;
  //       const update = clickedCheckbox ? clickedCheckbox.update : false;
  //       const pdf = clickedCheckbox ? clickedCheckbox.pdf : false;
  //       const del = clickedCheckbox ? clickedCheckbox.delete : false;
  //       const parentIds = clickedCheckbox ? clickedCheckbox.parentIds : [];
  //       const trackId= clickedCheckbox ? clickedCheckbox.childId : item._id;
  
  //       // Check if any child item is checked
  //       if (isChecked) {
  //         parentIsChecked = true;
  //       }
  
  //       // Recursively merge checkboxes into nested dropdowns
  //       if (item.items) {
  //         return {
  //           ...item,
  //           trackId,
  //           isChecked,
  //           insert,
  //           update,
  //           pdf,
  //           delete: del,
  //           parentIds,
  //           items: mergeCheckboxIntoDropdown(item.items, clickedCheckboxes)
  //         };
  //       }
  
  //       return {
  //         ...item,
  //         trackId,
  //         isChecked,
  //         insert,
  //         update,
  //         pdf,
  //         delete: del,
  //         parentIds
  //       };
  //     });
  
  //     // Update parent's isChecked field if any child is checked
  //     if (parentIsChecked) {
  //       return updatedDropdown.map(item => {
  //         return {
  //           ...item,
  //           isChecked: true
  //         };
  //       });
  //     }
  
  //     return updatedDropdown;
  //   };
  
  //   const clickedCheckboxe = clickedCheckboxes.filter(checkbox => checkbox.parentIds.includes(dataItem._id));
  //   console.log(clickedCheckboxe)

  //   return {
  //     ...dataItem,
  //     items: mergeCheckboxIntoDropdown(dataItem.items, clickedCheckboxe)
  //   };
  // });
  
  const handleCreateUser = (e) => {
    e.preventDefault();
  
    const dataWithoutMenulistId = {
      ...formData,
      username: formData.firstname + "-0" + serialValue?.serialNo,
      menulist: mergedArray.map(item => {
        const { _id, items, ...itemWithoutId } = item;
    
        const dropdownWithoutIds = items.map(d => {
          const { _id, ...dropdownItemWithoutId } = d;
          return dropdownItemWithoutId;
        });
    
        return {
          ...itemWithoutId,
          items: dropdownWithoutIds
        };
      })
    };
    
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);

    const serialData = {
      serialNo: serialNo?.serialNo,
      type: "user",
      year: "2024",
      makeby: "shima",
      updateby: "",
    };
    // Check if any field is empty
    const isEmpty = Object.values(dataWithoutMenulistId ).some(
      (value) => value === "" || value?.length === 0
    );
  
    if (isEmpty) {
      swal("Not possible", "Please fill up form correctly", "warning");
      return;
    } else {
      createSerialNo(serialData);
      createNewUser(dataWithoutMenulistId);
      swal("Done", "Data Save Successfully", "success");
      navigate("/user-list-data");
    }
    // Handle form submission, for example, send data to backend
    console.log("Form submitted:", JSON.stringify(dataWithoutMenulistId ));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
   
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
    <div className="container-fluid p-0 m-0" style={{
      alignItems: "center",
      position: "absolute",
      top: "10%",
      overflow:"scroll",
      width:'95%',
      height:'80%'
    }}>
      {/* <nav class="navbar navbar-expand-lg" style={{ background: "#CBF3F0" }}>
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
                  {isUpdate ? "Update User" : "Add User(s)"}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}
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
              <span
                style={{
                  color: "#000",
                  fontWeight: "700",
                  letterSpacing: ".5px",
                }}
              >
                {isUpdate ? "Update user" : "Add user(s)"}
              </span>
            </p>
            <p style={{ fontSize: "20px", color: "red" }}>
              <FontAwesomeIcon icon={faExclamationCircle}></FontAwesomeIcon>
            </p>
          </div>
          <div className="mt-5">
            <Form validated={validated} onSubmit={handleCreateUser}>
              <div className="d-flex justify-content-between align-items-center">
                <div className="w-100">
                  <div>
                    <Form.Group controlId="formInput">
                      <Form.Control
                        type="text"
                        name="firstname"
                        placeholder="User's first name"
                        className="input-with-bottom-border"
                        value={
                          isUpdate
                            ? singleUserData?.firstname
                            : formData.firstname
                        }
                        onChange={(e) => handleChange(e)}
                        isInvalid={validated && formData.firstname === ""}
                      />
                      <Form.Control.Feedback className="mt-2" type="invalid">
                        Please provide a firstname.
                      </Form.Control.Feedback>
                      {validated && formData.lastname === "" && (
                        <div style={{ height: "0px" }}></div>
                      )}
                    </Form.Group>
                  </div>
                  {/* <div className="">
                  {validated && formData.firstname === '' && <p className="text-danger ">{`Firstname is required.`}</p>}
                  </div> */}
                </div>

                <div className="w-100 ms-2">
                  <div>
                    <Form.Group controlId="formInput">
                      <Form.Control
                        type="text"
                        name="lastname"
                        placeholder="User's last name"
                        className="input-with-bottom-border"
                        value={
                          isUpdate
                            ? singleUserData?.lastname
                            : formData.lastname
                        }
                        onChange={handleChange}
                        isInvalid={validated && formData.lastname === ""}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a lastname.
                      </Form.Control.Feedback>
                      {validated && formData.lastname === "" && (
                        <div style={{ height: "0px" }}></div>
                      )}
                    </Form.Group>
                  </div>
                </div>
                <div className="w-100 ms-2">
                  <Form.Group controlId="formInput">
                    <Form.Control
                      type="text"
                      name="mobileNo"
                      placeholder="Mobile no"
                      className="input-with-bottom-border"
                      value={
                        isUpdate ? singleUserData?.mobileNo : formData.mobileNo
                      }
                      onChange={handleChange}
                      isInvalid={validated && formData.lastname === ""}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a mobile.
                    </Form.Control.Feedback>
                    {/* {validated && formData.lastname === '' && <div style={{ height: '20px' }}></div>} */}
                  </Form.Group>
                </div>
                <div className="w-100 ms-2">
                  <Form.Group controlId="formInput">
                    <Form.Control
                      type="text"
                      placeholder="Password"
                      className="input-with-bottom-border"
                      value={isUpdate ? singleUserData?.password : password}
                      style={{ background: "transparent" }}
                      isInvalid={validated && formData.password === ""}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a password.
                    </Form.Control.Feedback>
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
                      value={
                        isUpdate
                          ? options?.find(
                              (x) => x.value == singleUserData?.roleId
                            )
                          : options?.find((x) => x.value == formData.roleId)
                      }
                      // style={{ border: "1px solid #00B987" }}
                      // value={typeOption.find((x)=>x.value==itemInformation.itemType)}
                      onChange={(e) => {
                        if (isUpdate) {
                          setSingleUserData({
                            ...singleUserData,
                            ["roleId"]: e.value,
                          });
                        } else {
                          setFormData({ ...formData, ["roleId"]: e.value });
                        }
                      }}
                    ></Select>

                    <div className="">
                      {validated && formData.roleId === "" && (
                        <p className="text-danger ">{`User role is required.`}</p>
                      )}
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
            {
              <TreeView
                isUpdate={isUpdate}
                singleUserData={singleUserData?.menulist}
                data={mergedData}
                // userUPdateData={userUPdateData}
                clickedCheckboxes={clickedCheckboxes}
                setClickedCheckboxes={setClickedCheckboxes}
                parentIds={parentIds}
              
              />
            }
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

import {
  faPlus,
  faTrash,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import Select from "react-select";
import {
  useGetAllMenuItemsQuery,
  useCreateMenuMutation,
  useUpdateMenuMutation,
} from "../../../redux/features/menus/menuApi";
import "./CreateMenu.css";
import * as Yup from "yup";
import { InputGroup } from "react-bootstrap";
import swal from "sweetalert";

const CreateMenu = () => {
  const ArrayHelperRef = useRef();
  const [parentMenuName, setParentMenuName] = useState("");
  const [menuType, setMenuType] = useState("");
  const [createMenu] = useCreateMenuMutation();
  const [updateMenu] = useUpdateMenuMutation();
  const selectInputRef = useRef();
  const [selectedTopParentValue, setSelectedTopParentValue] = useState(null);
  console.log(menuType);
  const {
    data: menuItems,
    isError: menuItemsIsError,
    isLoading: menuItemsIsLoading,
  } = useGetAllMenuItemsQuery();

  const menuTypeOptions = [
    { value: "child", label: "Child" },
    { value: "parent", label: "Parent" },
  ];

  const flattenOptions = (options) => {
    const flattenRecursive = (options, parentLabel) => {
      let result = [];
      options?.forEach((option) => {
        if (option.isParent == true) {
          result.push({
            value: option._id,
            label: option.label,
          });
        } else {
          // result.push({
          //   value: option._id,
          //   label: parentLabel ? `${parentLabel} > ${option.label}` : option.label,
          // });
        }
        if (option.items && option.items.length > 0) {
          result = result.concat(flattenRecursive(option.items, option.label));
        }
      });
      return result;
    };
    return flattenRecursive(options);
  };
  const flattenedOptions = flattenOptions(menuItems);
  console.log(flattenedOptions);
  const flattenOptionsData = (options) => {
    const flattenRecursive = (options, parentLabel) => {
      let result = [];
      options?.forEach((option) => {
        if (option.isParent == true) {
          result.push({
            value: option._id,
            label: option.label,
            trackId: option.trackId,
          });
        } else {
          // result.push({
          //   value: option._id,
          //   label: parentLabel ? `${parentLabel} > ${option.label}` : option.label,
          // });
        }
        if (option.items && option.items.length > 0) {
          result = result.concat(flattenRecursive(option.items, option.label));
        }
      });
      return result;
    };
    return flattenRecursive(options);
  };
  const flattenedOptionsData = flattenOptionsData(menuItems);
  console.log(flattenedOptionsData);

  const handleSubmit = async (e, values) => {
    e.preventDefault();
    console.log(values);
    const modelMenuInsert = {
      children: [],
      label: parentMenuName.label,
      url: "#",
      permissions: [],
      items: [],
      isParent: "",
      _id: parentMenuName.value,
      trackId: parentMenuName.trackId,
    };
    try {
      values.detailsData.forEach((item) => {
        console.log(item);
        if( item.menu_name == "")
        {
          swal("Not Possible!", "Please take valid input", {
            icon: "warning",
          });
          return
        }
        
        else if (menuType == "child" && parentMenuName.value == undefined) {
          swal("Not possible", "Please select parent name", "warning");
        }
         else {
          if (parentMenuName) {
            values.detailsData.forEach((item) => {
              console.log(item.menu_type);
              modelMenuInsert.items.push({
                children: [],
                label: item.menu_name,
                url: "#",
                permissions: [],
                items: [],
                trackId: parentMenuName.value,
                isParent: menuType == "parent" ? true : false,
              });
            });

            // swal("Done", "Data Save Successfully", "success");
            console.log(modelMenuInsert);
            // values.detailsData.forEach((item) => {
            //   item.menu_name = "";
            // });
            // updateMenu(modelMenuInsert);
           
         
          } else {
            values.detailsData.forEach((item) => {
              if( item.menu_name == "")
                {
                  swal("Not Possible!", "Please take valid input", {
                    icon: "warning",
                  });
                }
              else{
                function convertToMenuItem(data) {
                  const { parentmenu, detailsData } = data;
                  console.log(detailsData);
                  const menuItems = detailsData?.map((item) => {
                    return {
                      children: [],
                      label: item.menu_name,
                      url: "#",
                      permissions: [],
                      items: [],
                      isParent: menuType == "parent" ? true : false,
                    };
                  });
                  return {
                    parentmenu,
                    menuItems,
                  };
                }
    
                const convertedData = convertToMenuItem(values);
                console.log(JSON.stringify(convertedData.menuItems));
    
                swal({
                  title: "Are you sure this menus are top parent ?",
                  text: "It will show as a top heading, because you are not select any parent",
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                }).then((willDelete) => {
                  if (willDelete) {
                    // deleteUser(activeUser?._id);
                    swal("Done", "Data Save Successfully", {
                      icon: "success",
                    });
                    //  createMenu(convertedData.menuItems);
                    // values.parentmenu = "";
                    // values.detailsData.forEach((item) => {
                    //   item.menu_name = "";
                    // });
                    // values.detailsData=[]
                  } else {
                    swal(" Cancel! Saving data ");
                  }
                });
              }
            })
         
            
          }
        }
      });

      // swal("Done", "Data Saved Successfully", "success");
    } catch (error) {
      console.error("Error saving data:", error);
      swal("Error", "Failed to save data. Please try again later.", "error");
    }
  };

  return (
    <div
      className="container-fluid usercreation-table"
      style={{
        overflowY: "scroll",
        height: "500px",
      }}
    >
      <div class="container overflow-hidden">
        <div className="shadow-lg mt-2 mt-sm-5 mt-md-5 mt-lg-5 p-5 rounded-4">
          <div className="d-flex justify-content-between align-items-center ">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon
                style={{
                  fontSize: "14px",
                  color: "#fff",
                  backgroundColor: "#00B987",
                  borderRadius: "50px",
                  padding: "3px",
                }}
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
                Create Menu
              </span>
            </div>
          </div>
          <div>
            <div className="d-flex justify-content-between align-items-center w-75">
              <div className="w-50 mt-4">
                <label htmlFor="">Parent Name</label>
                <Select
                  class="form-select"
                  className="mb-3 mt-1"
                  aria-label="Default select example"
                  name="itemType"
                  isDisabled={menuType=='parent'}
                  options={flattenedOptions}
                  // value={flattenedOptions?.find((x) => x.value == parentMenuName.value)}
                  // ref={selectInputRef}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: state.isFocused ? "#fff" : "#fff",
                      border: "1px solid #00B987",
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
                  value={flattenedOptions?.find(
                    (x) => x.value == selectedTopParentValue
                  )}
                  onChange={(e) => {
                    setSelectedTopParentValue(e.value);
                    const filterData = flattenedOptionsData.find(
                      (x) => x.value == e.value
                    );
                    console.log(filterData);
                    setParentMenuName(filterData);
                  }}
                ></Select>
              </div>
              <div className=" mt-4" style={{ width: "40%" }}>
                <label htmlFor="">Menu Type</label>
                <Select
                  class="form-select"
                  className="mb-3 mt-1"
                  aria-label="Default select example"
                  name="menuType"
                  
                  options={menuTypeOptions}
                  // value={menuTypeOptions?.find((x) => x.value == menuType.value)}
                  // ref={selectInputRef}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: state.isFocused ? "#fff" : "#fff",
                      border: "1px solid #00B987",
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
                  // value={menuTypeOptions?.find(
                  //   (x) => x.value == selectedTopParentValue
                  // )}
                  onChange={(e) => {
                    console.log(e);
                    if (e.value == "child") {
                      setMenuType(e.value);
                    } else {
                      setMenuType(e.value);
                    }
                  }}
                ></Select>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-4">
            <button
              type="submit"
              form="menucreation-form"
              className="border-0 "
              style={{
                backgroundColor: "#00B987",
                color: "white",
                padding: "5px 10px",
                fontSize: "14px",
                borderRadius: "5px",
              }}
            >
              Save
            </button>
            <button
              className="border-0 "
              style={{
                backgroundColor: "#00B987",
                color: "white",
                padding: "5px 10px",
                fontSize: "14px",
                borderRadius: "5px",
                marginLeft: "5px",
              }}
              onClick={() => {
                ArrayHelperRef.current.push({
                  menu_type: menuType,
                  menu_name: "",
                });
              }}
            >
              <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> Add Row
            </button>
          </div>
          <div className="mt-3">
            <Formik
              initialValues={{
                parentmenu: parentMenuName,
                detailsData: [
                  {
                    menu_type: menuType,
                    menu_name: "",
                  },
                ],
              }}
              validationSchema={Yup.object({
                detailsData: Yup.array().of(
                  Yup.object().shape({
                    menu_type: Yup.string().required("Required"),
                    menu_name: Yup.string().required("Required"),
                  })
                ),
              })}
              onSubmit={(values, formik) => {
                formik.resetForm();
              }}
              render={({ values, setFieldValue }) => (
                <Form
                  id="menucreation-form"
                  onSubmit={(e) => {
                    handleSubmit(e, values);
                  }}
                >
                  <FieldArray
                    name="detailsData"
                    render={(arrayHelpers) => {
                      ArrayHelperRef.current = arrayHelpers;
                      const details = values.detailsData;
                      return (
                        <div>
                          <div
                            className=" flex-1 items-center d-flex-nowrap"
                            style={{ height: "250px", overflowY: "auto" }}
                          >
                            <table className="table w-full table-bordered ">
                              <thead className="w-100">
                                <tr>
                                  <th className="bg-white text-center align-middle text-[#581C87] ">
                                    Sl
                                  </th>

                                  <th className="bg-white text-center align-middle text-[#581C87] text-[13px]">
                                    Menu Name
                                    <span className="text-danger fw-bold fs-2">
                                      *
                                    </span>
                                  </th>
                                  <th className="bg-white text-center align-middle text-[#581C87] text-[13px]">
                                    Action
                                  </th>
                                </tr>
                              </thead>
                              {details && details.length > 0
                                ? details.map((detail, index) => {
                                    return (
                                      <tbody>
                                        <tr key={index}>
                                          <td className="bg-white text-center align-middle">
                                            {index + 1}
                                          </td>
                                          {/* <td className="text-center align-middle">
                                            <div class="d-flex align-items-center justify-content-center">
                                              <span
                                                style={{
                                                  color: "orangered",
                                                  fontWeight: "bold",
                                                  fontSize: "16px",
                                                }}
                                              >
                                                C
                                              </span>
                                              <div class="form-switch ms-2">
                                                <input
                                                  type="checkbox"
                                                  class="form-check-input"
                                                  name={`detailsData.${index}.menu_type`}
                                                  id="site_state"
                                                  onClick={(e) => {
                                                    setFieldValue(
                                                      `detailsData.${index}.menu_type`,
                                                      e.target.checked
                                                    );
                                                  }}
                                                />
                                              </div>
                                              <label
                                                for="site_state"
                                                class="form-check-label"
                                                style={{
                                                  color: "#00B987",
                                                  fontWeight: "bold",
                                                  fontSize: "16px",
                                                  marginTop: "5px",
                                                  marginLeft: "5px",
                                                }}
                                              >
                                                P
                                              </label>
                                            </div>
                                            <span className="text-danger">
                                              <ErrorMessage
                                                name={`detailsData.${index}.menu_type`}
                                              />
                                            </span>
                                          </td> */}
                                          <td className="text-center align-middle">
                                            <Field
                                              type="text"
                                              name={`detailsData.${index}.menu_name`}
                                              placeholder="Parent / Child"
                                              value={detail?.menu_name}
                                              style={{
                                                border: "1px solid #00B987",
                                                padding: "5px",
                                                width: "75%",
                                                borderRadius: "5px",
                                              }}
                                              onClick={(e) => {
                                                console.log(menuType);
                                                if (menuType == "") {
                                                  swal(
                                                    "Not possible",
                                                    "Please select menu type",
                                                    "warning"
                                                  );
                                                } else {
                                                  if (menuType == "parent") {
                                                    setFieldValue(
                                                      `detailsData.${index}.menu_name`,
                                                      e.target.value
                                                    );
                                                    setFieldValue(
                                                      `detailsData.${index}.menu_type`,
                                                      true
                                                    );
                                                  } else {
                                                    setFieldValue(
                                                      `detailsData.${index}.menu_name`,
                                                      e.target.value
                                                    );
                                                    setFieldValue(
                                                      `detailsData.${index}.menu_type`,
                                                      false
                                                    );
                                                  }
                                                }
                                              }}
                                            />
                                            <br />
                                            <span className="text-danger">
                                              <ErrorMessage
                                                name={`detailsData.${index}.menu_name`}
                                              />
                                            </span>
                                          </td>
                                          <td className="text-center align-middle">
                                            <button
                                              type="button"
                                              className=" border-0 rounded  bg-transparent"
                                              onClick={() => {
                                                arrayHelpers.remove(index, 1);
                                              }}
                                            >
                                              <FontAwesomeIcon
                                                icon={faXmarkCircle}
                                                className="text-danger fs-1"
                                              ></FontAwesomeIcon>
                                            </button>
                                          </td>
                                        </tr>
                                      </tbody>
                                    );
                                  })
                                : null}
                            </table>
                          </div>
                        </div>
                      );
                    }}
                  />
                </Form>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMenu;

import {
  faPlus,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import {
  useGetAllMenuItemsQuery,
  useCreateMenuMutation,
  useUpdateMenuMutation,
} from "../../../redux/features/menus/menuApi";
import "./CreateMenu.css";
import * as Yup from "yup";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const CreateMenu = () => {
  const ArrayHelperRef = useRef();
  const [parentMenuName,setParentMenuName] = useState("");
  const [menuType, setMenuType] = useState('');
  const [createMenus] = useCreateMenuMutation();
  const [updateMenu] = useUpdateMenuMutation();
  const navigate = useNavigate();
  const [selectedTopParentValue, setSelectedTopParentValue] = useState(null);
console.log(parentMenuName)
  useEffect(()=>{
    if(localStorage.length>0){

    }
    else{
      navigate('/')
    }
  },[navigate])
  
  const {
    data: menuItems,
  } = useGetAllMenuItemsQuery();

 
  const menuTypeOptions = [
    { value: "child", label: "Child" },
    { value: "parent", label: "Parent" },
  ];

  const initialValues={
    parentmenu: parentMenuName,
    detailsData: [
      {
        menu_type: menuType,
        menu_name: "",
      },
    ],
  }
  const parentMenuOptions = (options) => {
    const parentMenuRecursive = (options, parentLabel) => {
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
          result = result.concat(parentMenuRecursive(option.items, option.label));
        }
      });
      return result;
    };
    return parentMenuRecursive(options);
  };
  const parentOptions = parentMenuOptions(menuItems);
  console.log(parentOptions);

  const flattenOptionsData = (options) => {
    const parentMenuRecursive = (options, parentLabel) => {
      let result = [];
      options?.forEach((option) => {
        if (option.isParent == true) {
          result.push({
            value: option._id,
            label: option.label,
            trackId: option.trackId,
          });
        } else {
        }
        if (option.items && option.items.length > 0) {
          result = result.concat(parentMenuRecursive(option.items, option.label));
        }
      });
      return result;
    };
    return parentMenuRecursive(options);
  };
  const flattenedOptionsData = flattenOptionsData(menuItems);
  console.log(flattenedOptionsData);
  console.log(menuType !=='',menuType )
  const handleSubmit = async (e, values,resetForm) => {
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
      isInserted: false,
      isUpdated: false,
      isPDF: false,
      isRemoved: false,
      isChecked: false,
    };
    try {
      values.detailsData.forEach((item) => {
        if (item.menu_name == "") {
          swal("Not Possible!", "Data Not Found", {
            icon: "warning",
          });
          setSelectedTopParentValue(null)
          setMenuType('')
          return;
        } else if (menuType == "child" && parentMenuName.value == undefined) {
          swal("Not possible", "Please select parent name", "warning");
        }
      });

      if (parentMenuName) {
        console.log('parentMenuName',parentMenuName)
        var errorCount = 0;
        values.detailsData.forEach((item) => {
          if (item.menu_name == "") {
            errorCount++;
          }
          const convertmenuName = item?.menu_name
            .toLowerCase()
            .replace(/\s+/g, "-");

          modelMenuInsert.items.push({
            children: [],
            label: item.menu_name,
            url: `${
              menuType == "parent" ? "#" : `/main-view/${convertmenuName}`
            }`,
            permissions: [],
            items: [],
            trackId: parentMenuName.value,
            isParent: menuType == "parent" ? true : false,
            isInserted: false,
            isUpdated: false,
            isPDF: false,
            isRemoved: false,
            isChecked: false,
          });
        });
        console.log(errorCount);
        console.log(modelMenuInsert);
        if (errorCount ==0) {
          console.log('updateMenu')
          updateMenu(modelMenuInsert);
          swal("Done", "Data Save Successfully", "success");
          // navigate("/main-view/menu-list");
          resetForm({values:{parentmenu: '',
          detailsData: [
            {
              menu_type: "",
              menu_name: "",
            },
          ],}})
         setSelectedTopParentValue(null)
          setMenuType('')
        } else {
          swal("Not Possible!", "Data Not Found", {
            icon: "warning",
          });
          setMenuType('')
          setSelectedTopParentValue(null)
        }
      } else {
        values.detailsData.forEach((item) => {
          if (item.menu_name == "") {
            swal("Not Possible!", "Data Not Found", {
              icon: "warning",
            });
            setMenuType('')
            setSelectedTopParentValue(null)
          } else {
            if (menuType == "child" && parentMenuName.value == undefined) {
              swal(
                "Not Possible!",
                "Please select parent name because you are select menu type as a child",
                {
                  icon: "warning",
                }
              );
            } else {
              function convertToMenuItem(data) {
                const { parentmenu, detailsData } = data;
                console.log(detailsData);
                const menuItems = detailsData?.map((item) => {
                  const convertmenuName = item?.menu_name
                    .toLowerCase()
                    .replace(/\s+/g, "-");

                  return {
                    children: [],
                    label: item.menu_name,
                    url: `${
                      menuType == "parent"
                        ? "#"
                        : `/main-view/${convertmenuName}`
                    }`,
                    permissions: [],
                    items: [],
                    isParent: menuType == "parent" ? true : false,
                    isInserted: false,
                    isUpdated: false,
                    isPDF: false,
                    isRemoved: false,
                    isChecked: false,
                  };
                });
                return {
                  parentmenu,
                  menuItems,
                };
              }

              const convertedData = convertToMenuItem(values);
              swal({
                title: "Are you sure this menus are top parent ?",
                text: "It will show as a top heading, because you are not select any parent",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              }).then((willDelete) => {
                if (willDelete) {
                  swal("Done", "Data Save Successfully", {
                    icon: "success",
                  });
                  createMenus(convertedData.menuItems);
                  // navigate("/main-view/menu-list");
                  resetForm({values:{parentmenu: '',
                  detailsData: [
                    {
                      menu_type: "",
                      menu_name: "",
                    },
                  ],}})
                 setSelectedTopParentValue(null)
                  setMenuType('')
                } else {
                  swal(" Cancel! Saving data ");
                }
              });
            }
          }
        });
      }
   
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
                 options={parentOptions}
                 value={selectedTopParentValue  !=null ? parentOptions?.find(
                  (x) => x.value === selectedTopParentValue
                ) :''}
                onChange={(e) => {
                  setSelectedTopParentValue(e.value);
                  const filterData = flattenedOptionsData.find(
                    (x) => x.value == e.value
                  );
                  console.log(filterData);
                  setParentMenuName(filterData);
                }}
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
                 value={menuType !=='' ? menuTypeOptions?.find(
                  (x) => x.value === menuType
                ) : null}
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
              disabled={menuType == '' && parentMenuName.value == undefined}
              style={{
                backgroundColor: `${
                  menuType === '' && parentMenuName.value === undefined
                    ? "gray"
                    : "#00B987"
                }`,
                color: "white",
                padding: "5px 10px",
                fontSize: "14px",
                borderRadius: "5px",
                width: "100px",
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
              initialValues={initialValues}
              validationSchema={Yup.object({
                detailsData: Yup.array().of(
                  Yup.object().shape({
                    menu_type: Yup.string().required("Required"),
                    menu_name: Yup.string().required("Required"),
                  })
                ),
              })}
              onSubmit={(values,  { setSubmitting ,resetForm}) => {
                resetForm({ values: initialValues });
                setSubmitting(false)
              }}
              >
           {({ values,resetForm, setFieldValue,isSubmitting }) => (
                <Form
                  id="menucreation-form"
                  onSubmit={(e) => {
                    handleSubmit(e, values,resetForm);
                  }}
                >
                  <FieldArray
                    name="detailsData"
                    render={(arrayHelpers) => {
                      ArrayHelperRef.current = arrayHelpers;
                      const details = values.detailsData;
                      return (
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
                                  console.log(detail)
                                    return (
                                      <tbody>
                                        <tr key={index}>
                                          <td className="bg-white text-center align-middle">
                                            {index + 1}
                                          </td>
                                       
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
                                                if (menuType == '') {
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
                      );
                    }}
                  />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMenu;

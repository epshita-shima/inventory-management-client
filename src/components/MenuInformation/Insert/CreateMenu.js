import {
  faPlus,
  faTrash,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import Select from "react-select";
import { useGetAllMenuItemsQuery, useCreateMenuMutation, useUpdateMenuMutation } from "../../../redux/features/menus/menuApi";
import "./CreateMenu.css";
import * as Yup from "yup";
import { InputGroup } from "react-bootstrap";
import swal from "sweetalert";

const CreateMenu = () => {
  const ArrayHelperRef = useRef();
  const [parentMenuName, setParentMenuName] = useState('');
  const [createMenu]=useCreateMenuMutation()
  const [updateMenu]=useUpdateMenuMutation()
  const {
    data: menuItems,
    isError: menuItemsIsError,
    isLoading: menuItemsIsLoading,
  } = useGetAllMenuItemsQuery();
//   const flattenOptions = (options) => {
//     const flattenRecursive = (options, parentLabel) => {
//       console.log(options, parentLabel)
//       let result = [];
//       options?.forEach((option) => {
//         result.push({
//           value: option._id,
//           label: parentLabel ? `${option.label}` : option.label,
//         });
//         if (option.items && option.items.length > 0) {
//           result = result.concat(flattenRecursive(option.items, option.label));
//         }
//       });
//       return result;
//     };
//     return flattenRecursive(options);
//   };
// console.log(JSON.stringify(menuItems))
//   const flattenedOptions = flattenOptions(menuItems);
console.log(menuItems)

const flattenOptions = (options) => {
  const flattenRecursive = (options, parentLabel) => {
    let result = [];
    options?.forEach((option) => {
      if (option.isParent==true) {
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
const flattenOptionsData = (options) => {
  const flattenRecursive = (options, parentLabel) => {
    let result = [];
    options?.forEach((option) => {
      if (option.isParent==true) {
        result.push({
          value: option._id,
          label: option.label,
          trackId:option.trackId
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
console.log(flattenedOptionsData)
const handleSubmit = async (e, values) => {
  e.preventDefault();
  console.log(parentMenuName.value)
  try {
    values.detailsData.forEach((item) => {
    console.log(item)
      if (item.isChild==false && parentMenuName.value ==undefined || item.parent_ChildName=='') {
        swal("Not possible", "Please select parent name", "warning");
      }
      else{
        if (parentMenuName) {
          const modelMenuInsert = {
            children: [],
            label: parentMenuName.label,
            url: "#",
            permissions: [],
            items: [],
            isParent: true,
            _id: parentMenuName.value,
            trackId:parentMenuName.trackId
          };
    
          values.detailsData.forEach((item) => {
            console.log(item.isChild)
            modelMenuInsert.items.push({
              children: [],
              label: item.parent_ChildName,
              url: "#",
              permissions: [],
              items: [],
              trackId: parentMenuName.value,
              isParent: item.isChild ? true : false
            });
          });
          console.log(parentMenuName.value)
        
          swal("Done", "Data Save Successfully", "success");
       
        updateMenu(modelMenuInsert);
        values.parentmenu=''
        values.detailsData.forEach((item) => {
          item.parent_ChildName=''
        }
        )

        } else {
          function convertToMenuItem(data) {
            const { parentmenu, detailsData } = data;
            console.log(detailsData)
            const menuItems = detailsData?.map(item => {
              return {
                children: [],
                label: item.parent_ChildName,
                url: "#",
                permissions: [],
                items: [],
                isParent: item.isChild ? true : false,
              };
            });
            return {
              parentmenu,
              menuItems
            };
          }
    
          const convertedData = convertToMenuItem(values);
          console.log(JSON.stringify(convertedData.menuItems))
          swal("Done", "Data Save Successfully", "success");
         createMenu(convertedData.menuItems);
         values.parentmenu=''
         values.detailsData.forEach((item) => {
          item.parent_ChildName=''
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
          
            <div className="w-50 mt-4">
              <label htmlFor="">Sub Parent Name</label>
              <Select
                class="form-select"
                className="mb-3 mt-1"
                aria-label="Default select example"
                name="itemType"
                options={flattenedOptions}
                
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
                onChange={(e) => {
                  console.log(e)
                  const filterData=flattenedOptionsData.find((x)=>x.value==e.value)
                  console.log(filterData)
                  setParentMenuName(filterData);
                }}
              ></Select>
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
                  isChild: false,
                  parent_ChildName: "",
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
                    isChild: false,
                    parent_ChildName: "",
                  },
                ],
              }}
              validationSchema={Yup.object({
                detailsData: Yup.array().of(
                  Yup.object().shape({
                    isChild: Yup.string().required("Required"),
                    parent_ChildName: Yup.string().required("Required"),
                  })
                ),
              })}
              onSubmit={(values, formik) => {
                formik.resetForm();
              }}
              render={({ values, setFieldValue }) => (
                <Form id='menucreation-form' 
                  onSubmit={(e) => {
                    handleSubmit(e,values);
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
                                    Menu Type
                                    <span className="text-danger fw-bold fs-2">
                                      *
                                    </span>
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
                                          <td className="text-center align-middle">
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
                                                  name={`detailsData.${index}.isChild`}
                                                  id="site_state"
                                                  onClick={(e) => {
                                                    setFieldValue(
                                                      `detailsData.${index}.isChild`,
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
                                                name={`detailsData.${index}.isChild`}
                                              />
                                            </span>
                                          </td>
                                          <td className="text-center align-middle">
                                            <Field
                                              type="text"
                                              name={`detailsData.${index}.parent_ChildName`}
                                              placeholder="Parent / Child"
                                              value={detail.parent_ChildName}
                                              style={{
                                                border: "1px solid #00B987",
                                                padding: "5px",
                                                width: "75%",
                                                borderRadius: "5px",
                                              }}
                                              onClick={(e) => {
                                                setFieldValue(
                                                  `detailsData.${index}.parent_ChildName`,
                                                  e.target.value
                                                );
                                              }}
                                            />
                                            <br />
                                            <span className="text-danger">
                                              <ErrorMessage
                                                name={`detailsData.${index}.parent_ChildName`}
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
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import {
  useGetAllMenuItemsQuery,
  useGetSingleMenuQuery,
} from "../../../redux/features/menus/menuApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { ErrorMessage, Form, Field, FieldArray, Formik } from "formik";

const UpdateMenu = () => {
  const ArrayHelperRef = useRef();
  const { id } = useParams();

  const { data: singleMenu, isLoading: singleMenuLoading } =
    useGetSingleMenuQuery(id);
  const [singleMenuData, setSingleMenuData] = useState([]);
  const [singleMatchedMenuData, setSingleMatchedMenuData] = useState([]);
  console.log(singleMenuData);
  console.log(singleMenu);

  const {
    data: menuItems,
    isError: menuItemsIsError,
    isLoading: menuItemsIsLoading,
  } = useGetAllMenuItemsQuery();

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

  const updatedSingleData = (data) => {
    data?.items?.find((items) => console.log(items._id, id));
    const matchedData = data?.items?.find((items) => items._id == id);
    console.log(matchedData?.items?.length);
    if (matchedData?.items?.length > 0) {
      return matchedData;
    }
    return data
  };
  const tableUpdatedData = updatedSingleData(singleMenu);
  console.log(tableUpdatedData);
  useEffect(() => {
    setSingleMenuData(tableUpdatedData);
    // setSingleMenuData(singleMenu)
  }, [singleMenu, tableUpdatedData]);
  const menuTypeOptions = [
    { value: "child", label: "Child" },
    { value: "parent", label: "Parent" },
  ];
  const handleSubmit = () => {};

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
                Update Menu
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
                  // isDisabled={menuType == "parent"}
                  options={flattenedOptions}
                  value={flattenedOptions?.find(
                    (x) => x.value == singleMenuData?._id
                  )}
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
                    setSingleMenuData((prev) => ({
                      ...prev, // Copy previous state
                      _id: e.value, // Update _id property with new value
                      label: e.label,
                    }));
                    setSingleMenuData((prevState) => {
                      const updatedItems = [...prevState.items]; // Create a new array
                      updatedItems[0] = { ...updatedItems, trackId: e.value }; // Create a new object for the item with updated label
                      return { ...prevState, items: updatedItems }; // Return a new object with updated items array
                    });
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
                  isDisabled={singleMenuData?.items?.length > 0 ? true : false}
                  value={menuTypeOptions?.find(
                    (x) =>
                      x.value ==
                      `${singleMenuData?.isParent == true ? "parent" : "child"}`
                  )}
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
                      setSingleMenuData((prev) => ({
                        ...prev, // Copy previous state
                        isParent: false, // Update _id property with new value
                      }));
                    } else {
                      setSingleMenuData((prev) => ({
                        ...prev, // Copy previous state
                        isParent: true, // Update _id property with new value
                      }));
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
                  //   menu_type: menuType,
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
                // parentmenu: parentMenuName,
                detailsData: [
                  {
                    // menu_type: menuType,
                    menu_name: "",
                  },
                ],
              }}
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
                              
                              {singleMenuData?.items?.map((detail, index) => {
                                return (
                                  <tbody>
                                    <tr key={index}>
                                      <td className="bg-white text-center align-middle">
                                        {index + 1}
                                      </td>

                                      <td className="text-center align-middle">
                                        <Field
                                          type="text"
                                          //   name={`detailsData.${index}.menu_name`}
                                          placeholder="Menu Name"
                                          value={detail?.label}
                                          style={{
                                            border: "1px solid #00B987",
                                            padding: "5px",
                                            width: "75%",
                                            borderRadius: "5px",
                                          }}
                                          onChange={(e) => {
                                            // setSingleMenuData((prevState) => {
                                            //   const temp_details = {
                                            //     ...prevState,
                                            //   };
                                            //   const temp__items =
                                            //     temp_details.items;
                                            //   temp__items[index]["label"] =
                                            //     e.target.value;
                                            //   return temp_details;
                                            // });
                                            setSingleMenuData((prevState) => {
                                              const updatedItems = [
                                                ...prevState.items,
                                              ]; // Create a new array
                                              updatedItems[index] = {
                                                ...updatedItems[index],
                                                label: e.target.value,
                                              }; // Create a new object for the item with updated label
                                              return {
                                                ...prevState,
                                                items: updatedItems,
                                              }; // Return a new object with updated items array
                                            });
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
                              })}
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

export default UpdateMenu;

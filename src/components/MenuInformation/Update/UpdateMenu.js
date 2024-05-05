import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import {
  useGetAllMenuItemsQuery,
  useGetSingleChangeParentMenuQuery,
  useGetSingleMenuQuery,
  useUpdateSingleMenuMutation,
} from "../../../redux/features/menus/menuApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { ErrorMessage, Form, Field, FieldArray, Formik } from "formik";
import "./UpdateMenu.css";

const UpdateMenu = () => {
  const ArrayHelperRef = useRef();
  const { id } = useParams();

  const [singleMenuData, setSingleMenuData] = useState([]);
  const [singleMatchedMenuData, setSingleMatchedMenuData] = useState([]);
  const [mainData, setMainData] = useState([]);
  const [changingParentId, setChangingParentId] = useState("");
  const [changeParentData, setChangeParentData] = useState([]);
  const { data: singleMenu, isLoading: singleMenuLoading } =
    useGetSingleMenuQuery(id);

  const { data: changeParent } =
    useGetSingleChangeParentMenuQuery(changingParentId);
    const[updateSingleMenu]=useUpdateSingleMenuMutation()
  console.log(JSON.stringify(singleMenuData));
  console.log(JSON.stringify(singleMenu));
  console.log(mainData);
  console.log(changeParent);
  console.log(changeParentData);
  const {
    data: menuItems,
    isError: menuItemsIsError,
    isLoading: menuItemsIsLoading,
  } = useGetAllMenuItemsQuery();
  console.log(menuItems);

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
    const matchedData = data?.items?.find((items) => {
      if (items._id == id) {
        console.log("checked");
      } else {
        if (items.items.length > 0) {
          const matchingChild = items.items.find((x) => x._id == id);
          console.log(matchingChild);
          return matchingChild;
        }
      }
    });
    console.log(matchedData);
    if (matchedData?.items?.length > 0) {
      return matchedData;
    }
    return data;
  };
  const tableUpdatedData = updatedSingleData(singleMenu);
  console.log(tableUpdatedData);
  function separateItem(data, id) {
    console.log(data);
    return data?.items?.find((item) => item?._id === id);
  }

  // Example usage: Separating the "PI Report" item
  const piReportItem = separateItem(tableUpdatedData, id);
  console.log(piReportItem);

  useEffect(() => {
    setSingleMenuData(tableUpdatedData);
    setMainData(singleMenu);
    setChangeParentData(changeParent);
  }, [singleMenu, changeParent, tableUpdatedData]);

  useEffect(() => {
    if (singleMenu !== undefined) {
      const index = singleMenu?.items?.findIndex(
        (item) => item._id === singleMenuData?._id
      );
      let indexTest = -1; // Initialize indexTest to -1

      menuItems.some((data, i) => {
        let index = -1; // Initialize index to -1

        if (data.items.length > 0) {
          data.items.some((child, i) => {
            if (child.items.length > 0) {
              const thirdIndex = child?.items?.findIndex(
                (item) => item._id === singleMenuData?._id
              );
              if (thirdIndex !== -1) {
                index = thirdIndex; // Set index to thirdIndex
                return true; // Break out of the loop
              }
            } else {
              const secondIndex = data?.items?.findIndex(
                (item) => item._id === singleMenuData?._id
              );
              if (secondIndex !== -1) {
                index = secondIndex; // Set index to secondIndex
                return true; // Break out of the loop
              }
            }
          });
        } else {
          const firstIndex = menuItems?.items?.findIndex(
            (item) => item._id === singleMenuData?._id
          );
          if (firstIndex !== -1) {
            index = firstIndex; // Set index to firstIndex
            return true; // Break out of the loop
          }
        }

        if (index !== -1) {
          indexTest = index; // Update indexTest if index is not -1
          return true; // Break out of the outer loop
        }

        return false;
      });

      console.log(indexTest);
      console.log(singleMenuData);
      console.log(index);
      console.log(singleMenuData);
      // If index is found, replace the item
      if (index !== -1) {
        const updatedItems = [...singleMenu?.items]; // Create a copy of the items array
        updatedItems[index] = singleMenuData;

        // Update the main data with the replaced portion
        setMainData((prevState) => ({
          ...prevState,
          items: updatedItems,
        }));
      } else {
        if (changeParent !== undefined) {
          if (changeParent._id === singleMenuData?._id) {
          } else {
            const index = changeParent.items?.findIndex(
              (item) => item._id === singleMenuData?._id
            );
            if (index !== 1) {
              console.log("hello");
            }
          }

          console.error("Item not found for replacement");
        }
      }
    }
  }, [singleMenu, menuItems, changeParent, singleMenuData]);

  const menuTypeOptions = [
    { value: "child", label: "Child" },
    { value: "parent", label: "Parent" },
  ];

  const removeItem = (index) => {
    setSingleMenuData((prev) => {
      const temp__details = [...prev.items];
      if (temp__details.length > 1) temp__details.splice(index, 1);
      return {
        ...prev,
        items: [...temp__details],
      };
    });
  };
  const handleSubmit = () => {
    updateSingleMenu(changeParentData)
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
                    console.log(e.value);
                    setChangingParentId(e.value);
                    const updatedPiReportItem = {
                      ...piReportItem,
                      trackId: e.value, // Update trackId with the new value
                    };
                    console.log(updatedPiReportItem)
                 
                    setChangeParentData((prev) => ({
                      ...prev, // Copy previous state
                      items: prev?.items?.concat(updatedPiReportItem),
                    }));
                    // let index = singleMenu?.findIndex(
                    //   (item) => item.id == e.value
                    // );

                    // setSingleMenuData((prevState) => {
                    //   const updatedItems = [...prevState.items];
                    //   console.log(updatedItems); // Create a new array
                    //   updatedItems.map((data, index) => {
                    //     // updatedItems[index] = { ...updatedItems, trackId: e.value };
                    //     console.log(data.trackId);
                    //     // return data.trackId=e.value
                    //   });
                    //   // Create a new object for the item with updated label
                    //   return { ...prevState, items: updatedItems }; // Return a new object with updated items array
                    // });
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
                setSingleMenuData((prev) => {
                  const temp__details = [...prev.items];
                  temp__details.push({
                    label: "",
                    url: "",
                    permissions: [],
                    trackId: "",
                    items: [],
                    isParent: false,
                    isChecked: false,
                    isInserted: false,
                    isRemoved: false,
                    isUpdated: false,
                    isPDF: false,
                  });
                  return {
                    ...prev,
                    items: [...temp__details],
                  };
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
                                            removeItem(index);
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

import {
  faArrowAltCircleLeft,
  faPlus,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import swal from "sweetalert";
import Select from "react-select";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "./InserRmItemInfo.css";
import InsertItemSizeInfoModal from "../../../SizeInformation/Insert/InsertItemSizeInfoModal";
import { useGetAllItemSizeQuery } from "../../../../redux/features/itemsizeinfo/itemSizeInfoApi";
import InsertUnitInfoModal from "./../../../UnitInformation/Insert/InsertUnitInfoModal";
import { useGetAllItemUnitQuery } from "../../../../redux/features/itemUnitInfo/itemUnitInfoApi";
import { useInsertItemInformationMutation } from "../../../../redux/features/iteminformation/iteminfoApi";
import { useNavigate } from "react-router-dom";
const InsertRmItemInfo = () => {
  const ArrayHelperRef = useRef();
  const [startDate, setStartDate] = useState(new Date());
  const { data: itemSize } = useGetAllItemSizeQuery(undefined);
  const { data: itemUnitData } = useGetAllItemUnitQuery(undefined);
  const [insertIteminfo] = useInsertItemInformationMutation();
  const navigate = useNavigate();
  const getUser = localStorage.getItem("user");
  const getUserParse = JSON.parse(getUser);
  const makebyUser = getUserParse[0].username;

  const itemSizeConvertSelectOption = (options) => {
    let result = [];
    options?.forEach((option) => {
      result.push({
        value: option._id,
        label: option.categoryInfo,
      });
    });
    return result;
  };

  const itemSizeConvertedOptions = itemSizeConvertSelectOption(itemSize);

  const itemUnitConvertSelectOption = (options) => {
    let result = [];
    options?.forEach((option) => {
      result.push({
        value: option._id,
        label: option.unitInfo,
      });
    });
    return result;
  };

  const itemUnitConvertedOptions = itemUnitConvertSelectOption(itemUnitData);

  const initialValues = {
    detailsData: [
      {
        categoryId: "",
        itemName: "",
        unitId: "",
        openingStock: "",
        description: "",
        itemStatus: false,
        openingDate: startDate,
        ladgerApproveStatus: false,
        ladgerApproveDate: null,
        makeBy: makebyUser,
        updateBy: null,
        makeDate: new Date().toLocaleDateString("en-CA"),
        updateDate: null,
      },
    ],
  };

  const handleSubmit = async (e, values, resetForm) => {
    e.preventDefault();

    try {
      const response = await insertIteminfo(values.detailsData);
      console.log(response.data.status);
      if (response.data.status === 200) {
        swal("Done", "Data Save Successfully", "success");
        resetForm();
      } else {
        swal(
          "Not Possible!",
          "An problem occurred while creating the data",
          "error"
        );
      }
    } catch (err) {
      console.error(err);
      swal("Relax!", "An problem occurred while creating the data", "error");
    }
  };
  return (
    <div
      className=" row px-4 mx-4"
      style={{
        overflowY: "scroll",
        height: "500px",
      }}
    >
      <div class="overflow-hidden">
        <div className="shadow-lg mt-2 mt-sm-5 mt-md-5 mt-lg-5 p-5 rounded-4">
          <div className="d-flex justify-content-between align-items-center ">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon
                style={{
                  fontSize: "14px",
                  color: "#000",
                  // backgroundColor: "#00B987",
                  backgroundColor: "#2DDC1B",
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
                Create (RM) Item Info
              </span>
            </div>
            <div>
              <button
                style={{
                  backgroundColor: "#E55566",
                  outline: "none",
                  border: "none",
                  color: "white",
                  height: "25px",
                }}
                onClick={() => {
                  navigate("/main-view/item-list-(rm)");
                }}
              >
                <FontAwesomeIcon icon={faArrowAltCircleLeft}></FontAwesomeIcon>{" "}
                Back to ItemList
              </button>
            </div>
          </div>
          <div>
            <div className="text-right"></div>
          </div>

          <div className="mt-3">
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object({
                detailsData: Yup.array().of(
                  Yup.object().shape({
                    categoryId: Yup.string().required("Required"),
                    itemName: Yup.string().required("Required"),
                    unitId: Yup.string().required("Required"),
                    openingStock: Yup.string().required("Required"),
                    description: Yup.string().required("Required"),
                  })
                ),
              })}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                resetForm({ values: initialValues });
                setSubmitting(false);
              }}
            >
              {({
                values,
                resetForm,
                setFieldValue,
                isSubmitting,
                errors,
                touched,
                isValid,
                dirty,
              }) => (
                <Form
                  id="itemcreation-form"
                  onSubmit={(e) => {
                    handleSubmit(e, values, resetForm);
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="">
                      <label htmlFor="">Opening Stock Date</label>
                      <DatePicker
                        dateFormat="y-MM-dd"
                        className="text-center custom-datepicker ms-2"
                        //   value={isEdit ? updateOpeningStore?.OpeningDate : startDate}
                        calendarClassName="custom-calendar"
                        selected={startDate}
                        required
                        onChange={(startDate) => {
                          if (startDate > new Date()) {
                            swal({
                              title: "Select Valid Date",
                              text: "Date should be equal or earlier than today",
                              icon: "warning",
                              button: "OK",
                            });
                          } else {
                            setStartDate(startDate.toLocaleDateString("en-CA"));
                          }
                        }}
                      />
                    </div>
                    <div className="d-flex mt-4 mb-4">
                      <button
                        type="submit"
                        form="itemcreation-form"
                        className="border-0 "
                        style={{
                          backgroundColor:
                            isValid && dirty ? "#2DDC1B" : "gray",
                          color: "white",
                          padding: "5px 10px",
                          fontSize: "14px",
                          borderRadius: "5px",
                          width: "100px",
                        }}
                        disabled={!(isValid && dirty)}
                      >
                        Save
                      </button>
                      <div
                        className="border-0 "
                        style={{
                          // backgroundColor: "#00B987",
                          backgroundColor: "#2DDC1B",
                          color: "black",
                          padding: "5px 10px",
                          fontSize: "14px",
                          borderRadius: "5px",
                          marginLeft: "5px",
                        }}
                        onClick={() => {
                          console.log("ArrayHelperRef ");
                          ArrayHelperRef.current.push({
                            categoryId: "",
                            itemName: "",
                            unitId: "",
                            openingStock: "",
                            description: "",
                            itemStatus: false,
                            openingDate: startDate,
                            ladgerApproveStatus: false,
                            ladgerApproveDate: null,
                            makeBy: makebyUser,
                            updateBy: null,
                            makeDate: new Date().toLocaleDateString("en-CA"),
                            updateDate: null,
                          });
                        }}
                      >
                        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> Add
                        Row
                      </div>
                    </div>
                  </div>

                  <FieldArray
                    name="detailsData"
                    render={(arrayHelpers) => {
                      ArrayHelperRef.current = arrayHelpers;
                      const details = values.detailsData;
                      return (
                        <div
                          className=" flex-1 items-center d-flex-nowrap"
                          style={{ height: "300px", overflowY: "auto" }}
                        >
                          <table className="table w-full table-bordered shadow-lg" >
                            <thead className="w-100">
                              <tr>
                                <th className="bg-white text-center align-middle text-[#581C87] ">
                                  Sl
                                </th>

                                <th className="bg-white text-center align-middle text-[#581C87] text-[13px]">
                                  Category Info
                                  <span className="text-danger fw-bold fs-2">
                                    *
                                  </span>
                                </th>
                                <th className="bg-white text-center align-middle text-[#581C87] text-[13px]">
                                  Item Name
                                  <span className="text-danger fw-bold fs-2">
                                    *
                                  </span>
                                </th>
                                <th className="bg-white text-center align-middle text-[#581C87] text-[13px]">
                                  Unit
                                  <span className="text-danger fw-bold fs-2">
                                    *
                                  </span>
                                </th>
                                <th className="bg-white text-center align-middle text-[#581C87] text-[13px]">
                                  Opening Stock
                                  <span className="text-danger fw-bold fs-2">
                                    *
                                  </span>
                                </th>
                                <th className="bg-white text-center align-middle text-[#581C87] text-[13px]">
                                  Item Description
                                  <span className="text-danger fw-bold fs-2">
                                    *
                                  </span>
                                </th>
                                <th className="bg-white text-center align-middle text-[#581C87] text-[13px]">
                                  Item Status
                                  <span className="text-danger fw-bold fs-2">
                                    *
                                  </span>
                                </th>
                                <th className="bg-white text-center align-middle text-[#581C87] text-[13px]">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {details && details.length > 0
                                ? details.map((detail, index) => {
                                    console.log(detail);
                                    return (
                                      <tr key={index}>
                                        <td className="text-center align-middle">
                                          {index + 1}
                                        </td>
                                        <td>
                                          <div className="w-100 d-flex justify-content-between mt-2">
                                            <div className="w-100">
                                              <Select
                                                class="form-select"
                                                className=" mb-3"
                                                aria-label="Default select example"
                                                name="categoryInfo"
                                                options={
                                                  itemSizeConvertedOptions
                                                }
                                                value={itemSizeConvertedOptions.filter(
                                                  (x) =>
                                                    x.value == detail.categoryId
                                                )}
                                                styles={{
                                                  control: (
                                                    baseStyles,
                                                    state
                                                  ) => ({
                                                    ...baseStyles,
                                                    borderColor: state.isFocused
                                                      ? "#fff"
                                                      : "#fff",
                                                    border: "1px solid #2DDC1B",
                                                  }),
                                                  menu: (provided) => ({
                                                    ...provided,
                                                    zIndex: 9999,
                                                  }),
                                                }}
                                                theme={(theme) => ({
                                                  ...theme,
                                                  colors: {
                                                    ...theme.colors,
                                                    primary25: "#B8FEB3",
                                                    primary: "#2DDC1B",
                                                  },
                                                })}
                                                onChange={(e) => {
                                                  setFieldValue(
                                                    `detailsData.${index}.categoryId`,
                                                    e.value
                                                  );
                                                }}
                                              ></Select>

                                              {touched.detailsData?.[index]
                                                ?.categoryId &&
                                                errors.detailsData?.[index]
                                                  ?.categoryId && (
                                                  <div className="text-danger">
                                                    {
                                                      errors.detailsData[index]
                                                        .categoryId
                                                    }
                                                  </div>
                                                )}
                                            </div>
                                            <div className="ms-2">
                                              <FontAwesomeIcon
                                                className="border align-middle text-center p-2 fs-3 rounded-5 text-light"
                                                style={{
                                                  background: "#2DDC1B",
                                                }}
                                                icon={faPlus}
                                                data-toggle="modal"
                                                data-target="#exampleModal1"
                                              />
                                            </div>
                                          </div>
                                        </td>
                                        <td className="text-center align-middle">
                                          <Field
                                            type="text"
                                            name={`detailsData.${index}.itemName`}
                                            placeholder="item name"
                                            value={detail?.itemName}
                                            style={{
                                              border: "1px solid #2DDC1B",
                                              padding: "5px",
                                              width: "100%",
                                              borderRadius: "5px",
                                            }}
                                            onClick={(e) => {
                                              setFieldValue(
                                                `detailsData.${index}.itemName`,
                                                e.target.value
                                              );
                                            }}
                                          />
                                          <br />
                                          {touched.detailsData?.[index]
                                            ?.itemName &&
                                            errors.detailsData?.[index]
                                              ?.itemName && (
                                              <div className="text-danger">
                                                {
                                                  errors.detailsData[index]
                                                    .itemName
                                                }
                                              </div>
                                            )}
                                        </td>
                                        <td>
                                          <div className="w-100 d-flex justify-content-between mt-2">
                                            <div className="w-100">
                                              <Select
                                                class="form-select"
                                                className=" mb-3"
                                                aria-label="Default select example"
                                                name="unitinfo"
                                                options={
                                                  itemUnitConvertedOptions
                                                }
                                                value={itemUnitConvertedOptions.filter(
                                                  (x) =>
                                                    x.value == detail.unitId
                                                )}
                                                styles={{
                                                  control: (
                                                    baseStyles,
                                                    state
                                                  ) => ({
                                                    ...baseStyles,
                                                    borderColor: state.isFocused
                                                      ? "#fff"
                                                      : "#fff",
                                                    border: "1px solid #2DDC1B",
                                                  }),
                                                  menu: (provided) => ({
                                                    ...provided,
                                                    zIndex: 9999,
                                                  }),
                                                }}
                                                theme={(theme) => ({
                                                  ...theme,
                                                  colors: {
                                                    ...theme.colors,
                                                    primary25: "#B8FEB3",
                                                    primary: "#2DDC1B",
                                                  },
                                                })}
                                                onChange={(e) => {
                                                  setFieldValue(
                                                    `detailsData.${index}.unitId`,
                                                    e.value
                                                  );
                                                }}
                                              ></Select>
                                            </div>
                                            <div className="ms-2">
                                              <FontAwesomeIcon
                                                className="border align-middle text-center p-2 fs-3 rounded-5 text-light"
                                                style={{
                                                  background: "#2DDC1B",
                                                }}
                                                icon={faPlus}
                                                data-toggle="modal"
                                                data-target="#exampleModal3"
                                              />
                                            </div>
                                          </div>
                                        </td>
                                        <td className="text-center align-middle">
                                          <Field
                                            type="text"
                                            name={`detailsData.${index}.openingStock`}
                                            placeholder="opening stock"
                                            value={detail?.openingStock}
                                            style={{
                                              border: "1px solid #2DDC1B",
                                              padding: "5px",
                                              width: "100%",
                                              borderRadius: "5px",
                                              textAlign: "center",
                                            }}
                                            onClick={(e) => {
                                              setFieldValue(
                                                `detailsData.${index}.openingStock`,
                                                e.target.value
                                              );
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
                                          <Field
                                            type="textarea"
                                            name={`detailsData.${index}.description`}
                                            placeholder="description"
                                            value={detail?.description}
                                            style={{
                                              border: "1px solid #2DDC1B",
                                              padding: "5px",
                                              width: "100%",
                                              borderRadius: "5px",
                                              textAlign: "center",
                                            }}
                                            onClick={(e) => {
                                              setFieldValue(
                                                `detailsData.${index}.description`,
                                                e.target.value
                                              );
                                            }}
                                          />
                                          {touched.detailsData?.[index]
                                            ?.description &&
                                            errors.detailsData?.[index]
                                              ?.description && (
                                              <div className="text-danger">
                                                {
                                                  errors.detailsData[index]
                                                    .description
                                                }
                                              </div>
                                            )}
                                        </td>
                                        <td className="text-center align-middle">
                                          <div class="form-check">
                                            <input
                                              type="checkbox"
                                              id="flexCheckDefault"
                                              onClick={(e) => {
                                                setFieldValue(
                                                  `detailsData.${index}.itemStatus`,
                                                  e.target.checked
                                                );
                                              }}
                                            />
                                          </div>
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
                                    );
                                  })
                                : null}
                            </tbody>
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
      <InsertItemSizeInfoModal></InsertItemSizeInfoModal>
      <InsertUnitInfoModal></InsertUnitInfoModal>
    </div>
  );
};

export default InsertRmItemInfo;

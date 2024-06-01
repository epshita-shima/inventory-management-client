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
const InsertRmItemInfo = () => {
  const ArrayHelperRef = useRef();
  const [startDate, setStartDate] = useState(new Date());
  const { data: itemSize } = useGetAllItemSizeQuery(undefined);
  console.log(itemSize);
  const itemSizeConvertSelectOption = (options) => {
    console.log(options)
    let result = [];
    options?.forEach((option) => {
      result.push({
        value: option._id,
        label: option.sizeInfo,
      });
    });
    return result;
  };

  const itemSizeConvertedOptions = itemSizeConvertSelectOption(itemSize);
  console.log(itemSizeConvertedOptions);
  const initialValues = {
    detailsData: [
      {
        itemname: "",
        sizeId: "",
        unitId: "",
        openingStock: "",
        openingDate: startDate,
        ItemStatus: "",
        ladgerApproveStatus: false,
        LadgerApproveDate: null,
        makeBy: "",
        updateBy: null,
        makeDate: startDate,
        updateDate: null,
      },
    ],
  };
  console.log(startDate);
  const handleSubmit = async (e, values, resetForm) => {};
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
                Create Item Info
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
                  // navigate('/main-view/menu-list')
                }}
              >
                <FontAwesomeIcon icon={faArrowAltCircleLeft}></FontAwesomeIcon>{" "}
                Back to ItemList
              </button>
            </div>
          </div>
          <div>
            <div className="mt-4">
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
          </div>
          <div className="d-flex justify-content-between align-items-center mt-4">
            <button
              type="submit"
              form="itemcreation-form"
              className="border-0 "
              style={{
                backgroundColor: "#2DDC1B",
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
                // backgroundColor: "#00B987",
                backgroundColor: "#2DDC1B",
                color: "black",
                padding: "5px 10px",
                fontSize: "14px",
                borderRadius: "5px",
                marginLeft: "5px",
              }}
              onClick={() => {
                ArrayHelperRef.current.push({
                  itemname: "",
                  sizeId: "",
                  unitId: "",
                  openingStock: "",
                  openingDate: startDate,
                  ItemStatus: "",
                  ladgerApproveStatus: false,
                  LadgerApproveDate: null,
                  makeBy: "",
                  updateBy: null,
                  makeDate: "",
                  updateDate: null,
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
                    itemName: Yup.string().required("Required"),
                  })
                ),
              })}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                resetForm({ values: initialValues });
                setSubmitting(false);
              }}
            >
              {({ values, resetForm, setFieldValue, isSubmitting }) => (
                <Form
                  id="menucreation-form"
                  onSubmit={(e) => {
                    handleSubmit(e, values, resetForm);
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
                          style={{ height: "200px", overflowY: "auto" }}
                        >
                          <table className="table w-full table-bordered">
                            <thead className="w-100">
                              <tr>
                                <th className="bg-white text-center align-middle text-[#581C87] ">
                                  Sl
                                </th>

                                <th className="bg-white text-center align-middle text-[#581C87] text-[13px]">
                                  Item Name
                                  <span className="text-danger fw-bold fs-2">
                                    *
                                  </span>
                                </th>
                                <th className="bg-white text-center align-middle text-[#581C87] text-[13px]">
                                  Size Info
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

                                        <td className="text-center align-middle">
                                          <Field
                                            type="text"
                                            name={`detailsData.${index}.menu_name`}
                                            placeholder="item name"
                                            value={detail?.menu_name}
                                            style={{
                                              border: "1px solid #2DDC1B",
                                              padding: "5px",
                                              width: "75%",
                                              borderRadius: "5px",
                                            }}
                                            onClick={(e) => {}}
                                          />
                                          <br />
                                          <span className="text-danger">
                                            <ErrorMessage
                                              name={`detailsData.${index}.menu_name`}
                                            />
                                          </span>
                                        </td>

                                        <td>
                                          <div className="w-100 d-flex justify-content-between mt-2">
                                            <div className="w-100">
                                              <Select
                                                class="form-select"
                                                className=" mb-3"
                                                aria-label="Default select example"
                                                name="sizeinfo"
                                                  options={itemSizeConvertedOptions}
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
                                                }}
                                                theme={(theme) => ({
                                                  ...theme,
                                                  colors: {
                                                    ...theme.colors,
                                                    primary25: "#B8FEB3",
                                                    primary: "#2DDC1B",
                                                  },
                                                })}
                                                onChange={(e) => {}}
                                              ></Select>

                                              <div className=""></div>
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

                                        <td>
                                          <div className="w-100 d-flex justify-content-between mt-2">
                                            <div className="w-100">
                                              <Select
                                                class="form-select"
                                                className=" mb-3"
                                                aria-label="Default select example"
                                                name="unitinfo"
                                                //   options={options}
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
                                                }}
                                                theme={(theme) => ({
                                                  ...theme,
                                                  colors: {
                                                    ...theme.colors,
                                                    primary25: "#B8FEB3",
                                                    primary: "#2DDC1B",
                                                  },
                                                })}
                                                onChange={(e) => {}}
                                              ></Select>

                                              <div className=""></div>
                                            </div>
                                            <div className="ms-2">
                                              <FontAwesomeIcon
                                                className="border align-middle text-center p-2 fs-3 rounded-5 text-light"
                                                style={{
                                                  background: "#2DDC1B",
                                                }}
                                                icon={faPlus}
                                                data-toggle="modal"
                                                data-target="#exampleModal"
                                              />
                                            </div>
                                          </div>
                                        </td>
                                        <td className="text-center align-middle">
                                          <Field
                                            type="text"
                                            name={`detailsData.${index}.menu_name`}
                                            placeholder="opening stock"
                                            value={detail?.menu_name}
                                            style={{
                                              border: "1px solid #2DDC1B",
                                              padding: "5px",
                                              width: "75%",
                                              borderRadius: "5px",
                                            }}
                                            onClick={(e) => {}}
                                          />
                                          <br />
                                          <span className="text-danger">
                                            <ErrorMessage
                                              name={`detailsData.${index}.menu_name`}
                                            />
                                          </span>
                                        </td>
                                        <td className="text-center align-middle">
                                          <div class="form-check">
                                            <input
                                              type="checkbox"
                                              value=""
                                              id="flexCheckDefault"
                                              onClick={(e) => {
                                                console.log(e.target.checked);
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
    </div>
  );
};

export default InsertRmItemInfo;

import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, FieldArray, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Select from "react-select";
import swal from "sweetalert";
import { useGetAllSupplierInformationQuery } from "../../../redux/features/supplierInformation/supplierInfoApi";
import { supplierDropdown } from "../../Common/CommonDropdown/CommonDropdown";
import { useGetAllPurchaseOrderInformationQuery } from "../../../redux/features/purchaseorderinformation/purchaseOrderInfoApi";
import { useGetAllRMItemInformationQuery } from "../../../redux/features/iteminformation/rmItemInfoApi";
import InsertGRNDetailsInfo from "./InsertGRNDetailsInfo";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "./InsertGRNInfo.css";

const InsertGRNInfo = () => {
  const navigate = useNavigate();
  const getUser = localStorage.getItem("user");
  const getUserParse = JSON.parse(getUser);
  const makebyUser = getUserParse[0].username;
  const { data: supplierInfo } = useGetAllSupplierInformationQuery(undefined);
  const { data: purchaseOrderInfo } =
    useGetAllPurchaseOrderInformationQuery(undefined);
  const { data: rmItemInfo } = useGetAllRMItemInformationQuery(undefined);
  const [pOOptionsData, setPOOptionsData] = useState([]);
  const [totalGrandQuantity, setTotalGrandQuantity] = useState(0);
  const [totalGrandAmount, setTotalGrandAmount] = useState(0);
  const [startDate, setStartDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );

  const initialValues = {
    pOSingleId: "",
    supplierId: "",
    supplierPoNo: "",
    receiveDate: startDate,
    grandTotalQuantity: "",
    grandTotalAmount: totalGrandAmount,
    detailsData: [],
    isAccountPostingStatus: false,
    vocuherNo: "",
    voucherDate: "",
    makeBy: makebyUser,
    updateBy: null,
    makeDate: new Date(),
    updateDate: null,
  };
  const supplierOptions = supplierDropdown(supplierInfo);

  const handleSubmit = (e, values, resetForm) => {
    e.preventDefault();
    const modelData = {
      pOSingleId: values.pOSingleId,
      supplierId: values.supplierId,
      supplierPoNo: values.supplierPoNo,
      receiveDate: values.receiveDate,
      grandTotalQuantity: values.grandTotalQuantity,
      grandTotalAmount: values.grandTotalAmount,
      detailsData: [],
      isAccountPostingStatus: values.isAccountPostingStatus,
      vocuherNo: values.vocuherNo,
      voucherDate: values.voucherDate,
      makeBy: values.makeBy,
      updateBy: values.updateBy,
      makeDate: values.makeDate,
      updateDate: values.updateDate,
    };
    values.detailsData.map((item) => {
      modelData.detailsData.push({
        pOSingleId: values.pOSingleId,
        itemId: item.itemId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        amount: item.totalAmount,
      });
    });
    console.log(modelData);
    resetForm();
  };

  return (
    <div
      className=" row  mx-4"
      style={{
        overflowY: "scroll",
        height: "500px",
      }}
    >
      <div class="overflow-hidden">
        <div className="shadow-lg mt-2 mt-sm-4 mt-md-4 mt-lg-4  rounded-4">
          <div className="">
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object({
                detailsData: Yup.array().of(
                  Yup.object().shape({
                    itemId: Yup.string().required("Required"),
                    itemDescription: Yup.string().required("Required"),
                    quantity: Yup.string().required("Required"),
                    unitPrice: Yup.string().required("Required"),
                    totalAmount: Yup.string().required("Required"),
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
                  id="pocreation-form"
                  onSubmit={(e) => {
                    handleSubmit(e, values, resetForm);
                  }}
                >
                  <FieldArray
                    name="detailsData"
                    render={() => {
                      const details = values.detailsData;
                      console.log(values);
                      return (
                        <div className=" flex-1 items-center d-flex-nowrap mt-3 py-2 px-5">
                          <div>
                            <div className="d-flex justify-content-between align-items-center">
                              <h2
                                style={{ fontSize: "24px", fontWeight: "bold" }}
                              >
                                Goods Receive Note Form
                              </h2>
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
                                    navigate("/main-view/grn-list");
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faArrowAltCircleLeft}
                                  ></FontAwesomeIcon>
                                  Back to ItemList
                                </button>
                              </div>
                            </div>

                            <div class="row row-cols-2 row-cols-lg-3">
                              <div class="col-6 col-lg-4">
                                <label htmlFor="supplierId">
                                  Supplier Name
                                </label>
                                <div className="w-75 d-flex justify-content-between mt-2">
                                  <div className="w-100">
                                    <Select
                                      class="form-select"
                                      className="w-100 mb-3"
                                      aria-label="Default select example"
                                      name="sizeinfo"
                                      options={supplierOptions}
                                      defaultValue={{
                                        label: "Select Supplier Name",
                                        value: 0,
                                      }}
                                      value={supplierOptions.filter(function (
                                        option
                                      ) {
                                        return (
                                          option.value === values.supplierId
                                        );
                                      })}
                                      styles={{
                                        control: (baseStyles, state) => ({
                                          ...baseStyles,
                                          width: "100%",
                                          borderColor: state.isFocused
                                            ? "#fff"
                                            : "#fff",
                                          border: "1px solid #2DDC1B",
                                        }),
                                        menu: (provided) => ({
                                          ...provided,
                                          zIndex: 9999,
                                          height: "auto",
                                          // overflowY: "scroll",
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
                                        const poDate =
                                          new Date().toLocaleDateString(
                                            "en-CA"
                                          );
                                        const matchPoNo =
                                          purchaseOrderInfo.filter(
                                            (item) => item.supplierId == e.value
                                          );
                                        const createPODropdown = (options) => {
                                          let result = [];
                                          options?.forEach((option) => {
                                            result.push({
                                              value: option.poNo,
                                              label: option.poNo,
                                            });
                                          });
                                          return result;
                                        };
                                        const poOptions =
                                          createPODropdown(matchPoNo);
                                        setPOOptionsData(poOptions);
                                        setFieldValue("supplierId", e.value);
                                      }}
                                    ></Select>

                                    {touched.supplierId &&
                                      errors.supplierId && (
                                        <div className="text-danger">
                                          {errors.supplierId}
                                        </div>
                                      )}
                                  </div>
                                </div>
                              </div>
                              <div class="col-6 col-lg-4">
                                <label htmlFor="supplierId">
                                  Supplier PO Number
                                </label>
                                <div className="w-75 d-flex justify-content-between mt-2">
                                  <div className="w-100">
                                    <Select
                                      class="form-select"
                                      className="w-100 mb-3"
                                      aria-label="Default select example"
                                      name="supplierpono"
                                      options={pOOptionsData}
                                      isDisabled={
                                        pOOptionsData.length === 0 ||
                                        pOOptionsData.length === undefined
                                          ? true
                                          : false
                                      }
                                      defaultValue={{
                                        label: "Select Po No",
                                        value: 0,
                                      }}
                                      value={pOOptionsData.filter(function (
                                        option
                                      ) {
                                        return (
                                          option.value === values.supplierPoNo
                                        );
                                      })}
                                      styles={{
                                        control: (baseStyles, state) => ({
                                          ...baseStyles,
                                          width: "100%",
                                          borderColor: state.isFocused
                                            ? "#fff"
                                            : "#fff",
                                          border: "1px solid #2DDC1B",
                                        }),
                                        menu: (provided) => ({
                                          ...provided,
                                          zIndex: 9999,
                                          height: "auto",
                                          // overflowY: "scroll",
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
                                        const matchPoNo =
                                          purchaseOrderInfo.filter(
                                            (item) => item.poNo === e.value
                                          );
                                        setFieldValue(
                                          "detailsData",
                                          matchPoNo[0]?.detailsData
                                        );
                                        setFieldValue(
                                          "pOSingleId",
                                          matchPoNo[0]?._id
                                        );
                                        setFieldValue("supplierPoNo", e.value);
                                      }}
                                    ></Select>

                                    {touched.supplierId &&
                                      errors.supplierId && (
                                        <div className="text-danger">
                                          {errors.supplierId}
                                        </div>
                                      )}
                                  </div>
                                </div>
                              </div>

                              <div class="col-6 col-lg-4">
                                <label htmlFor="">Delivery Date</label>
                                <br />
                                <DatePicker
                                  dateFormat="y-MM-dd"
                                  className="text-center custom-datepicker mt-2"
                                  value={startDate}
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
                                      setStartDate(
                                        startDate.toLocaleDateString("en-CA")
                                      );
                                      setFieldValue(
                                        "receiveDate",
                                        startDate.toLocaleDateString("en-CA")
                                      );
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          {details.length === 0 ? null : (
                            <>
                              <div>
                                <h2
                                  style={{
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Details Information
                                </h2>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                  <div className="d-flex justify-content-between">
                                    <button
                                      type="submit"
                                      form="pocreation-form"
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
                                  </div>
                                  <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                      <label
                                        htmlFor="grandTotalQuantity"
                                        style={{ fontSize: "16px" }}
                                      >
                                        Grand Total Quantity
                                      </label>
                                      <Field
                                        type="text"
                                        name={`grandTotalQuantity`}
                                        placeholder="Grand Total Quantity"
                                        disabled
                                        value={totalGrandQuantity}
                                        style={{
                                          border: "1px solid #2DDC1B",
                                          padding: "5px",
                                          width: "50%",
                                          borderRadius: "5px",
                                          textAlign: "center",
                                          marginLeft: "10px",
                                          height: "38px",
                                        }}
                                      />
                                    </div>
                                    <div>
                                      <label
                                        htmlFor="grandTotalAmount"
                                        style={{ fontSize: "16px" }}
                                      >
                                        Grand Total Amount
                                      </label>
                                      <Field
                                        type="text"
                                        name={`grandTotalAmount`}
                                        placeholder="Grand Total Amount"
                                        disabled
                                        value={totalGrandAmount}
                                        style={{
                                          border: "1px solid #2DDC1B",
                                          padding: "5px",
                                          width: "50%",
                                          borderRadius: "5px",
                                          marginLeft: "10px",
                                          textAlign: "center",
                                          height: "38px",
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <InsertGRNDetailsInfo
                                details={details}
                                rmItemInfo={rmItemInfo}
                                setTotalGrandQuantity={setTotalGrandQuantity}
                                setTotalGrandAmount={setTotalGrandAmount}
                                setFieldValue={setFieldValue}
                                touched={touched}
                                errors={errors}
                                totalGrandAmount={totalGrandAmount}
                                totalGrandQuantity={totalGrandQuantity}
                              ></InsertGRNDetailsInfo>
                            </>
                          )}
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

export default InsertGRNInfo;

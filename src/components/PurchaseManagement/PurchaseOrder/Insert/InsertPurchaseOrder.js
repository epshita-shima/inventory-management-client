import { faPlus, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, FieldArray, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import * as Yup from "yup";
import Select from "react-select";
import {
  bankInformationDropdown,
  paymentInfoDropdown,
  rawMaterialItemDropdown,
  supplierDropdown,
} from "../../../Common/CommonDropdown/CommonDropdown";
import { useGetAllSupplierInformationQuery } from "../../../../redux/features/supplierInformation/supplierInfoApi";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import swal from "sweetalert";
import "./InsertPurchaseOrder.css";
import { useGetAllRMItemInformationQuery } from "../../../../redux/features/iteminformation/rmItemInfoApi";
import SupplierInsertModal from "../../../Common/CommonModal/SupplierInsertModal";
import { useGetAllPaymentInformationQuery } from "../../../../redux/features/paymnetinformation/paymentInfoApi";
import { useGetAllBankInformationQuery } from "../../../../redux/features/bankinformation/bankInfoAPi";
import { useInsertPurchaseOrderInformationMutation } from "../../../../redux/features/purchaseorderinformation/purchaseOrderInfoApi";
const InsertPurchaseOrder = () => {
  const ArrayHelperRef = useRef();
  const [activeSupplierModal, setActiveSupplierModal] = useState(false);
  const [activeItemInfoModal, setActiveItemInfoModal] = useState(false);
  const [acivePaymentModal, setAcivePaymentModal] = useState(false);
  const [aciveBankInfoModal, setAciveBankInfoModal] = useState(false);
  const [startDate, setStartDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );
  const { data: supplierInfo, isLoading } =
    useGetAllSupplierInformationQuery(undefined);
  const { data: itemInfo } = useGetAllRMItemInformationQuery(undefined);
  const { data: paymentTypeInfo } = useGetAllPaymentInformationQuery(undefined);
  const { data: bankInfo } = useGetAllBankInformationQuery(undefined);
  const [totalGrandQuantity, setTotalGrandQuantity] = useState("");
  const [totalGrandTotalAmount, setTotalGrandTotalAmount] = useState("");
  const [insertPurchaseOrderInfo] = useInsertPurchaseOrderInformationMutation();

  const initialValues = {
    supplierId: "",
    currencyId: "",
    paymentId: "",
    bankId: "",
    deliveryDate: "",
    grandTotalAmount: totalGrandTotalAmount,
    grandTotalQuantity: totalGrandQuantity,
    makeBy: "",
    updateBy: null,
    makeDate: new Date(),
    updateDate: null,
    detailsData: [
      {
        itemId: "",
        itemDescription: "",
        quantity: "",
        challanNo: "",
        unitPrice: "",
        totalAmount: "",
      },
    ],
  };
  const supplierOptions = supplierDropdown(supplierInfo);
  console.log(supplierOptions);
  const rawMaterialItemOptions = rawMaterialItemDropdown(itemInfo);
  const paymentTypeOptions = paymentInfoDropdown(paymentTypeInfo);
  const bankInfoOptions = bankInformationDropdown(bankInfo);
  const currencyOptions = [
    {
      value: "euro",
      label: "EURO",
    },
    {
      value: "taka",
      label: "TAKA",
    },
    {
      value: "dollar",
      label: "DOLLAR",
    },
  ];
  const handleSubmit = (e, values, resetForm) => {
    e.preventDefault();
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
        <div className=" mt-2 mt-sm-4 mt-md-4 mt-lg-4 px-4 rounded-4">
          <div className="mt-3">
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object({
                detailsData: Yup.array().of(
                  Yup.object().shape({
                    itemId: Yup.string().required("Required"),
                    itemDescription: Yup.string().required("Required"),
                    quantity: Yup.string().required("Required"),
                    challanNo: Yup.string().required("Required"),
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
                  id="clientcreation-form"
                  onSubmit={(e) => {
                    handleSubmit(e, values, resetForm);
                  }}
                >
                  {/* <div className="d-flex justify-content-between align-items-center">
                    <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>
                      
                    </h2>
                    <div className="d-flex mt-2 mb-4"></div>
                  </div> */}
                  <FieldArray
                    name="detailsData"
                    render={(arrayHelpers) => {
                      ArrayHelperRef.current = arrayHelpers;
                      const details = values.detailsData;
                      console.log(values);
                      return (
                        <div className=" flex-1 items-center d-flex-nowrap mt-3 shadow-lg py-2 px-5">
                          <div>
                            <h2
                              style={{ fontSize: "24px", fontWeight: "bold" }}
                            >
                              Purchase Order Form
                            </h2>
                            <div class="container">
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
                                          label: "Select Size",
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
                                    <div className="ms-2 mt-2">
                                      <FontAwesomeIcon
                                        className="border  align-items-center text-center p-2 fs-3 rounded-5 text-light "
                                        style={{
                                          background: "#2DDC1B",
                                        }}
                                        icon={faPlus}
                                        data-toggle="modal"
                                        data-target="#commonInsertModalCenter"
                                        onClick={() => {
                                          setActiveSupplierModal(true);
                                          setAcivePaymentModal(false);
                                          setActiveItemInfoModal(false);
                                          setAciveBankInfoModal(false);
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div class="col-6 col-lg-4">
                                  <label htmlFor="paymentId">Payment</label>
                                  <div className="w-75 d-flex justify-content-between mt-2">
                                    <div className="w-100">
                                      <Select
                                        class="form-select"
                                        className="w-100 mb-3"
                                        aria-label="Default select example"
                                        name="sizeinfo"
                                        options={paymentTypeOptions}
                                        defaultValue={{
                                          label: "Select Size",
                                          value: 0,
                                        }}
                                        value={paymentTypeOptions.filter(
                                          function (option) {
                                            return (
                                              option.value === values.paymentId
                                            );
                                          }
                                        )}
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
                                          setFieldValue("paymentId", e.value);
                                        }}
                                      ></Select>

                                      {touched.supplierId &&
                                        errors.supplierId && (
                                          <div className="text-danger">
                                            {errors.supplierId}
                                          </div>
                                        )}
                                    </div>
                                    <div className="ms-2 mt-2">
                                      <FontAwesomeIcon
                                        className="border  align-items-center text-center p-2 fs-3 rounded-5 text-light "
                                        style={{
                                          background: "#2DDC1B",
                                        }}
                                        icon={faPlus}
                                        data-toggle="modal"
                                        data-target="#commonInsertModalCenter"
                                        onClick={() => {
                                          setAcivePaymentModal(true);
                                          setActiveItemInfoModal(false);
                                          setActiveSupplierModal(false);
                                          setAciveBankInfoModal(false);
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div class="col-6 col-lg-4">
                                  <label htmlFor="bankId">
                                    Bank Information
                                  </label>
                                  <div className="w-75 d-flex justify-content-between mt-2">
                                    <div className="w-100">
                                      <Select
                                        class="form-select"
                                        className="w-100 mb-3"
                                        aria-label="Default select example"
                                        name="bankInformation"
                                        options={bankInfoOptions}
                                        defaultValue={{
                                          label: "Select Size",
                                          value: 0,
                                        }}
                                        value={bankInfoOptions.filter(function (
                                          option
                                        ) {
                                          return option.value === values.bankId;
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
                                          setFieldValue("bankId", e.value);
                                        }}
                                      ></Select>

                                      {touched.bankId && errors.bankId && (
                                        <div className="text-danger">
                                          {errors.bankId}
                                        </div>
                                      )}
                                    </div>
                                    <div className="ms-2 mt-2">
                                      <FontAwesomeIcon
                                        className="border  align-items-center text-center p-2 fs-3 rounded-5 text-light "
                                        style={{
                                          background: "#2DDC1B",
                                        }}
                                        icon={faPlus}
                                        data-toggle="modal"
                                        data-target="#commonInsertModalCenter"
                                        onClick={() => {
                                          setAciveBankInfoModal(true);
                                          setAcivePaymentModal(false);
                                          setActiveItemInfoModal(false);
                                          setActiveSupplierModal(false);
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div class="col-6 col-lg-4">
                                  <label htmlFor="">Delivery Date</label>
                                  <br />
                                  <DatePicker
                                    dateFormat="y-MM-dd"
                                    className="text-center custom-datepicker"
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
                                        setStartDate(
                                          startDate.toLocaleDateString("en-CA")
                                        );
                                        setFieldValue(
                                          "deliveryDate",
                                          startDate.toLocaleDateString("en-CA")
                                        );
                                      }
                                    }}
                                  />
                                </div>
                                <div class="col-6 col-lg-4">
                                  <label htmlFor="Currency">Currency</label>
                                  <br />
                                  <div className="w-75">
                                    <Select
                                      class="form-select"
                                      className="w-100 mb-3"
                                      aria-label="Default select example"
                                      name="bankInformation"
                                      options={currencyOptions}
                                      defaultValue={{
                                        label: "Select Size",
                                        value: 0,
                                      }}
                                      value={currencyOptions.filter(function (
                                        option
                                      ) {
                                        return (
                                          option.value === values.currencyId
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
                                        setFieldValue("currencyId", e.value);
                                      }}
                                    ></Select>
                                  </div>
                                  <br />
                                  {touched.currencyId && errors.currencyId && (
                                    <div className="text-danger">
                                      {errors.currencyId}
                                    </div>
                                  )}
                                </div>
                                <div class="col-6 col-lg-4">
                                  <label htmlFor="remarks">Remarks</label>
                                  <br />
                                  <textarea
                                    type="textarea"
                                    name={`remarks`}
                                    placeholder="Remarks"
                                    value={values.remarks}
                                    rows="2"
                                    style={{
                                      border: "1px solid #2DDC1B",
                                      padding: "5px",
                                      width: "73%",
                                      borderRadius: "5px",
                                    }}
                                    onChange={(e) => {
                                      setFieldValue(`remarks`, e.target.value);
                                    }}
                                  />
                                  {touched.remarks && errors.remarks && (
                                    <div className="text-danger">
                                      {errors.remarks}
                                    </div>
                                  )}
                                </div>
                                {/* <div class="col-6 col-lg-4"></div> */}
                              </div>
                            </div>
                          </div>

                          <div>
                            <h2
                              style={{ fontSize: "20px", fontWeight: "bold" }}
                            >
                              Details Information
                            </h2>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                              <div className="d-flex justify-content-between">
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
                                    color: "#fff",
                                    padding: "5px 10px",
                                    fontSize: "14px",
                                    borderRadius: "5px",
                                    marginLeft: "5px",
                                    width: "100px",
                                  }}
                                  onClick={() => {
                                    console.log("ArrayHelperRef ");
                                    ArrayHelperRef.current.push({
                                      itemId: "",
                                      itemDescription: "",
                                      quantity: "",
                                      challanNo: "",
                                      unitPrice: "",
                                      totalAmount: "",
                                    });
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faPlus}
                                  ></FontAwesomeIcon>
                                  Add Row
                                </div>
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
                                    value={totalGrandTotalAmount}
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

                          <div style={{ height: "300px", overflowY: "auto" }}>
                            <table className="table w-full table-bordered">
                              <thead className="w-100">
                                <tr>
                                  <th className="bg-white text-center  align-items-center  ">
                                    Sl
                                  </th>

                                  <th
                                    className="bg-white text-center  align-items-center"
                                    style={{ width: "20%" }}
                                  >
                                    Item Name
                                    <span className="text-danger fw-bold fs-2">
                                      *
                                    </span>
                                  </th>
                                  <th className="bg-white text-center  align-items-center ">
                                    Item Description
                                    <span className="text-danger fw-bold fs-2">
                                      *
                                    </span>
                                  </th>
                                  <th className="bg-white text-center  align-items-center ">
                                    Challan No
                                    <span className="text-danger fw-bold fs-2">
                                      *
                                    </span>
                                  </th>
                                  <th className="bg-white text-center  align-items-center ">
                                    Quantity
                                    <span className="text-danger fw-bold fs-2">
                                      *
                                    </span>
                                  </th>
                                  <th className="bg-white text-center  align-items-center ">
                                    Unit Price
                                    <span className="text-danger fw-bold fs-2">
                                      *
                                    </span>
                                  </th>

                                  <th className="bg-white text-center  align-items-center ">
                                    Total Amount
                                    <span className="text-danger fw-bold fs-2">
                                      *
                                    </span>
                                  </th>
                                  <th className="bg-white text-center  align-items-center ">
                                    Action
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {details && details.length > 0
                                  ? details.map((detail, index) => {
                                      let singleQuantity;
                                      let singleTotalAmount;
                                      let calGrandTotalQuantity = 0;
                                      let getCalGrandTotalQuantity = 0;
                                      let calTotalAmount = 0;
                                      let getCalTotalAmount = 0;
                                      for (let i = 0; i < details.length; i++) {
                                        singleQuantity = details[i].quantity;
                                        singleTotalAmount =
                                          details[i].totalAmount;
                                        console.log(singleTotalAmount);
                                        calGrandTotalQuantity +=
                                          +singleQuantity;
                                        getCalGrandTotalQuantity =
                                          Math.round(
                                            calGrandTotalQuantity * 100
                                          ) / 100;
                                        calTotalAmount += +singleTotalAmount;
                                        console.log(calTotalAmount);
                                        getCalTotalAmount =
                                          Math.round(calTotalAmount * 100) /
                                          100;
                                        console.log(getCalTotalAmount);

                                        setTotalGrandQuantity(
                                          getCalGrandTotalQuantity
                                        );
                                        setTotalGrandTotalAmount(
                                          getCalTotalAmount
                                        );
                                      }
                                      return (
                                        <tr key={index}>
                                          <td className="text-center  align-middle">
                                            {index + 1}
                                          </td>
                                          <td className="d-flex ">
                                            <div className="w-100 d-flex justify-content-between ">
                                              <div className="w-100">
                                                <Select
                                                  class="form-select"
                                                  className="w-100 mb-3"
                                                  aria-label="Default select example"
                                                  name="itemName"
                                                  options={
                                                    rawMaterialItemOptions
                                                  }
                                                  defaultValue={{
                                                    label: "Select Size",
                                                    value: 0,
                                                  }}
                                                  value={rawMaterialItemOptions.filter(
                                                    function (option) {
                                                      return (
                                                        option.value ===
                                                        detail.itemId
                                                      );
                                                    }
                                                  )}
                                                  styles={{
                                                    control: (
                                                      baseStyles,
                                                      state
                                                    ) => ({
                                                      ...baseStyles,
                                                      width: "100%",
                                                      borderColor:
                                                        state.isFocused
                                                          ? "#fff"
                                                          : "#fff",
                                                      border:
                                                        "1px solid #2DDC1B",
                                                    }),
                                                    menu: (provided) => ({
                                                      ...provided,
                                                      zIndex: 9999,
                                                      // height: "200px",
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
                                                    setFieldValue(
                                                      `detailsData.${index}.itemId`,
                                                      e.value
                                                    );
                                                  }}
                                                ></Select>

                                                {touched.itemId &&
                                                  errors.itemId && (
                                                    <div className="text-danger">
                                                      {errors.itemId}
                                                    </div>
                                                  )}
                                              </div>
                                              <div className="ms-2 mt-2">
                                                <FontAwesomeIcon
                                                  className="border  align-items-center text-center p-2 fs-3 rounded-5 text-light "
                                                  style={{
                                                    background: "#2DDC1B",
                                                  }}
                                                  icon={faPlus}
                                                  data-toggle="modal"
                                                  data-target="#commonInsertModalCenter"
                                                  onClick={() => {
                                                    setActiveItemInfoModal(
                                                      true
                                                    );
                                                    setAcivePaymentModal(false);
                                                    setActiveSupplierModal(
                                                      false
                                                    );
                                                    setAciveBankInfoModal(
                                                      false
                                                    );
                                                  }}
                                                />
                                              </div>
                                            </div>
                                            <br />
                                            {touched.detailsData?.[index]
                                              ?.itemId &&
                                              errors.detailsData?.[index]
                                                ?.itemId && (
                                                <div className="text-danger">
                                                  {
                                                    errors.detailsData[index]
                                                      .itemId
                                                  }
                                                </div>
                                              )}
                                          </td>

                                          <td className="text-center  align-items-center">
                                            <textarea
                                              type="textarea"
                                              name={`detailsData.${index}.itemDescription`}
                                              placeholder="Item description"
                                              value={detail?.itemDescription}
                                              rows="1"
                                              style={{
                                                border: "1px solid #2DDC1B",
                                                padding: "5px",
                                                width: "100%",
                                                borderRadius: "5px",
                                                height: "38px",
                                              }}
                                              onChange={(e) => {
                                                setFieldValue(
                                                  `detailsData.${index}.itemDescription`,
                                                  e.target.value
                                                );
                                              }}
                                            />
                                            <br />
                                            {touched.detailsData?.[index]
                                              ?.itemDescription &&
                                              errors.detailsData?.[index]
                                                ?.itemDescription && (
                                                <div className="text-danger">
                                                  {
                                                    errors.detailsData[index]
                                                      .itemDescription
                                                  }
                                                </div>
                                              )}
                                          </td>
                                          <td className="text-center  align-items-center">
                                            <Field
                                              type="text"
                                              name={`detailsData.${index}.challanNo`}
                                              placeholder="Challan no"
                                              value={detail?.challanNo}
                                              style={{
                                                border: "1px solid #2DDC1B",
                                                padding: "5px",
                                                width: "100%",
                                                borderRadius: "5px",
                                                height: "38px",
                                                textAlign: "center",
                                              }}
                                              onChange={(e) => {
                                                setFieldValue(
                                                  `detailsData.${index}.challanNo`,
                                                  e.target.value
                                                );
                                              }}
                                            />
                                            {touched.detailsData?.[index]
                                              ?.challanNo &&
                                              errors.detailsData?.[index]
                                                ?.challanNo && (
                                                <div className="text-danger">
                                                  {
                                                    errors.detailsData[index]
                                                      .challanNo
                                                  }
                                                </div>
                                              )}
                                          </td>
                                          <td className="text-center  align-items-center">
                                            <Field
                                              type="number"
                                              name={`detailsData.${index}.quantity`}
                                              placeholder="Quantity"
                                              value={detail?.quantity}
                                              style={{
                                                border: "1px solid #2DDC1B",
                                                padding: "5px",
                                                width: "100%",
                                                borderRadius: "5px",
                                                height: "38px",
                                                marginBottom: "5px",
                                                textAlign: "center",
                                              }}
                                              onChange={(e) => {
                                                setFieldValue(
                                                  `detailsData.${index}.quantity`,
                                                  e.target.value
                                                );
                                                const calculateTotalAmount =
                                                  e.target.value *
                                                  detail.unitPrice;

                                                setFieldValue(
                                                  `detailsData.${index}.totalAmount`,
                                                  calculateTotalAmount
                                                );
                                              }}
                                            />
                                            <br />
                                            {touched.detailsData?.[index]
                                              ?.quantity &&
                                              errors.detailsData?.[index]
                                                ?.quantity && (
                                                <div className="text-danger">
                                                  {
                                                    errors.detailsData[index]
                                                      .quantity
                                                  }
                                                </div>
                                              )}
                                          </td>

                                          <td className="text-center  align-items-center">
                                            <Field
                                              type="text"
                                              name={`detailsData.${index}.unitPrice`}
                                              placeholder="Unit Price"
                                              value={detail?.unitPrice}
                                              style={{
                                                border: "1px solid #2DDC1B",
                                                padding: "5px",
                                                width: "100%",
                                                borderRadius: "5px",
                                                height: "38px",
                                                marginBottom: "5px",
                                                textAlign: "center",
                                              }}
                                              onChange={(e) => {
                                                setFieldValue(
                                                  `detailsData.${index}.unitPrice`,
                                                  e.target.value
                                                );
                                                const calculateTotalAmount =
                                                  e.target.value *
                                                  detail.quantity;
                                                setFieldValue(
                                                  `detailsData.${index}.totalAmount`,
                                                  calculateTotalAmount
                                                );
                                              }}
                                            />
                                            <br />
                                            {touched.detailsData?.[index]
                                              ?.unitPrice &&
                                              errors.detailsData?.[index]
                                                ?.unitPrice && (
                                                <div className="text-danger">
                                                  {
                                                    errors.detailsData[index]
                                                      .unitPrice
                                                  }
                                                </div>
                                              )}
                                          </td>
                                          <td className="text-center  align-items-center">
                                            <Field
                                              type="text"
                                              name={`detailsData.${index}.totalAmount`}
                                              placeholder="Total Amount"
                                              value={detail?.totalAmount}
                                              disabled
                                              style={{
                                                border: "1px solid #2DDC1B",
                                                padding: "5px",
                                                width: "100%",
                                                borderRadius: "5px",
                                                height: "38px",
                                                textAlign: "center",
                                              }}
                                            />
                                          </td>
                                          <td className="text-center  align-middle">
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
      <SupplierInsertModal
        activeSupplierModal={activeSupplierModal}
        setActiveSupplierModal={setActiveSupplierModal}
        activeItemInfoModal={activeItemInfoModal}
        setActiveItemInfoModal={setActiveItemInfoModal}
        acivePaymentModal={acivePaymentModal}
        setAcivePaymentModal={setAcivePaymentModal}
        aciveBankInfoModal={aciveBankInfoModal}
        setAciveBankInfoModal={setAciveBankInfoModal}
      ></SupplierInsertModal>
    </div>
  );
};

export default InsertPurchaseOrder;

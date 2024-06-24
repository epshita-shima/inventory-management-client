import { faPlus, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, FieldArray, Form, Formik } from "formik";
import React, { useRef } from "react";
import * as Yup from "yup";
import Select from "react-select";
import { supplierDropdown } from "../../../Common/CommonDropdown/CommonDropdown";
import { useGetAllSupplierInformationQuery } from "../../../../redux/features/supplierInformation/supplierInfoApi";

const InsertPurchaseOrder = () => {
  const ArrayHelperRef = useRef();
  const { data: supplierInfo, isLoading } =
    useGetAllSupplierInformationQuery(undefined);
  const initialValues = {
    supplierId: "",
    currency: "",
    paymentId: "",
    bankId: "",
    deliveryDate: "",
    challanNo: "",
    grandTotalAmount: "",
    grandTotalQuantity: "",
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
        <div className="shadow-lg mt-2 mt-sm-4 mt-md-4 mt-lg-4 p-4 rounded-4">
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
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex mt-2 mb-4">
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
                            itemId: "",
                            itemDescription: "",
                            quantity: "",
                            challanNo: "",
                            unitPrice: "",
                            totalAmount: "",
                          });
                        }}
                      >
                        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> Add
                        Row
                      </div>
                    </div>
                  </div>

                  <div className="row shadow-lg">
                    <div className="col-md-12 p-5">
                      <div className="col-md-6">
                        <div>
                        <label htmlFor="supplierId">Supplier Name</label>
                          <div className="w-100 d-flex justify-content-between mt-2">
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
                                  return option.value === values.supplierId;
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
                                onChange={(e) => {}}
                              ></Select>

                              {touched.supplierId && errors.supplierId && (
                                <div className="text-danger">
                                  {errors.supplierId}
                                </div>
                              )}
                            </div>
                            <div className="ms-2 mt-2">
                              <FontAwesomeIcon
                                className="border align-middle text-center p-2 fs-3 rounded-5 text-light "
                                style={{
                                  background: "#2DDC1B",
                                }}
                                icon={faPlus}
                                data-toggle="modal"
                                data-target="#exampleModal1"
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                        <label htmlFor="paymentId">Payument</label>
                          <div className="w-100 d-flex justify-content-between mt-2">
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
                                  return option.value === values.supplierId;
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
                                onChange={(e) => {}}
                              ></Select>

                              {touched.supplierId && errors.supplierId && (
                                <div className="text-danger">
                                  {errors.supplierId}
                                </div>
                              )}
                            </div>
                            <div className="ms-2 mt-2">
                              <FontAwesomeIcon
                                className="border align-middle text-center p-2 fs-3 rounded-5 text-light "
                                style={{
                                  background: "#2DDC1B",
                                }}
                                icon={faPlus}
                                data-toggle="modal"
                                data-target="#exampleModal1"
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label htmlFor="Currency">Currency</label>
                          <Field
                            type="text"
                            name={`currency`}
                            placeholder="Currency"
                            value={values.currency}
                            style={{
                              border: "1px solid #2DDC1B",
                              padding: "5px",
                              width: "100%",
                              borderRadius: "5px",
                              height: "38px",
                            }}
                            onChange={(e) => {
                              setFieldValue(`currency`, e.target.value);
                            }}
                          />
                          <br />
                          {touched.currency && errors.currency && (
                            <div className="text-danger">{errors.currency}</div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div>
                          <label htmlFor="remarks">Remarks</label>
                          <textarea
                            type="textarea"
                            name={`remarks`}
                            placeholder="Remarks"
                            value={values.remarks}
                            rows="3"
                            style={{
                              border: "1px solid #2DDC1B",
                              padding: "5px",
                              width: "100%",
                              borderRadius: "5px",
                            }}
                            onChange={(e) => {
                              setFieldValue(`remarks`, e.target.value);
                            }}
                          />
                          {touched.remarks && errors.remarks && (
                            <div className="text-danger">{errors.remarks}</div>
                          )}
                        </div>
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
                          className=" flex-1 items-center d-flex-nowrap mt-3"
                          style={{ height: "300px", overflowY: "auto" }}
                        >
                          <table className="table w-full table-bordered">
                            <thead className="w-100">
                              <tr>
                                <th className="bg-white text-center align-middle  ">
                                  Sl
                                </th>

                                <th className="bg-white text-center align-middle ">
                                  Item Name
                                  <span className="text-danger fw-bold fs-2">
                                    *
                                  </span>
                                </th>
                                <th className="bg-white text-center align-middle ">
                                  Item Description
                                  <span className="text-danger fw-bold fs-2">
                                    *
                                  </span>
                                </th>
                                <th className="bg-white text-center align-middle ">
                                  Quantity
                                  <span className="text-danger fw-bold fs-2">
                                    *
                                  </span>
                                </th>
                                <th className="bg-white text-center align-middle ">
                                  Unit Price
                                  <span className="text-danger fw-bold fs-2">
                                    *
                                  </span>
                                </th>
                                <th className="bg-white text-center align-middle ">
                                  Challan No
                                  <span className="text-danger fw-bold fs-2">
                                    *
                                  </span>
                                </th>
                                <th className="bg-white text-center align-middle ">
                                  Total Amount
                                  <span className="text-danger fw-bold fs-2">
                                    *
                                  </span>
                                </th>
                                <th className="bg-white text-center align-middle ">
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
                                            name={`detailsData.${index}.itemId`}
                                            placeholder="Item Name"
                                            value={detail?.itemId}
                                            style={{
                                              border: "1px solid #2DDC1B",
                                              padding: "5px",
                                              width: "100%",
                                              borderRadius: "5px",
                                              height: "38px",
                                            }}
                                            onChange={(e) => {
                                              setFieldValue(
                                                `detailsData.${index}.itemId`,
                                                e.target.value
                                              );
                                            }}
                                          />
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

                                        <td className="text-center align-middle">
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

                                        <td className="text-center align-middle">
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
                                        <td className="text-center align-middle">
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
                                        <td className="text-center align-middle">
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
                                        <td className="text-center align-middle">
                                          <Field
                                            type="text"
                                            name={`detailsData.${index}.totalAmount`}
                                            placeholder="Total Amount"
                                            value={detail?.totalAmount}
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
                                                `detailsData.${index}.totalAmount`,
                                                e.target.value
                                              );
                                            }}
                                          />
                                          <br />
                                          {touched.detailsData?.[index]
                                            ?.totalAmount &&
                                            errors.detailsData?.[index]
                                              ?.totalAmount && (
                                              <div className="text-danger">
                                                {
                                                  errors.detailsData[index]
                                                    .totalAmount
                                                }
                                              </div>
                                            )}
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
    </div>
  );
};

export default InsertPurchaseOrder;

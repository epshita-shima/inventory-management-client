import { faPlus, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, FieldArray, Form, Formik } from "formik";
import React, { useRef } from "react";
import * as Yup from "yup";
import { useInsertPaymentInformationMutation } from "../../../../redux/features/paymnetinformation/paymentInfoApi";
import swal from "sweetalert";

const InsertPaymentOption = () => {
  const ArrayHelperRef = useRef();
  const[insertPaymentInfo,{isLoading}]=useInsertPaymentInformationMutation()
  const getUser = localStorage.getItem("user");
  const getUserParse = JSON.parse(getUser);
  const makebyUser = getUserParse[0].username;
  const initialValues = {
    detailsData: [
      {
        paymentType: "",
        makeBy:makebyUser,
        updateBy: null,
        makeDate: new Date(),
        updateDate: null,
      },
    ],
  };

  console.log(initialValues);
  const handleSubmit =async (e,values,resetForm) => {
    e.preventDefault();
  
    try {
      const response = await insertPaymentInfo(values.detailsData);
      console.log(response?.error?.data?.message);
      if (response?.data?.status === 200) {
        swal("Done", "Data Save Successfully", "success");
        resetForm();
      } else if((response?.error?.status === 400)){
        swal("Not Possible!", response?.error?.data?.message, "error");
      }
    } catch (err) {
      console.error(err);
      swal("Error", "An error occurred while creating the data", "error");
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
        <div className="shadow-lg mt-2 mt-sm-4 mt-md-4 mt-lg-4 p-4 rounded-4">
          <div className="mt-3">
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object({
                detailsData: Yup.array().of(
                  Yup.object().shape({
                    paymentType: Yup.string().required("Required"),
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
                  id="paymnetinfocreation-form"
                  onSubmit={(e) => {
                    handleSubmit(e, values, resetForm);
                  }}
                >
                  <div className="d-flex align-items-center mb-4">
                    <button
                      type="submit"
                      form="paymnetinfocreation-form"
                      className="border-0 "
                      style={{
                        backgroundColor: isValid && dirty ? "#2DDC1B" : "gray",
                        color: "white",
                        padding: "5px 10px",
                        fontSize: "14px",
                        borderRadius: "5px",
                        width: "100px",
                      }}
                      disabled={!(isValid && dirty)}
                    >
                     {isLoading ? 'Loading' :'Save'} 
                    </button>
                    <div
                      className="border-0 "
                      style={{
                        // backgroundColor: "#2DDC1B",
                        backgroundColor: "#2DDC1B",
                        color: "#fff",
                        padding: "5px 10px",
                        fontSize: "14px",
                        borderRadius: "5px",
                        marginLeft: "5px",
                      }}
                      onClick={() => {
                        ArrayHelperRef.current.push({
                          paymentType: '',
                          makeBy: makebyUser,
                          updateBy: null,
                          makeDate: new Date(),
                          updateDate: null,
                        });
                      }}
                    >
                      <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> Add Row
                    </div>

                    <div className="d-flex mt-2 mb-4"></div>
                  </div>
                  <FieldArray
                    name="detailsData"
                    render={(arrayHelpers) => {
                      ArrayHelperRef.current = arrayHelpers;
                      const details = values.detailsData;
                      console.log(values);
                      return (
                        <div
                          className=" flex-1 items-center d-flex-nowrap"
                          style={{ height: "400px", overflowY: "auto" }}
                        >
                          <table className="table w-full table-bordered">
                            <thead className="w-100">
                              <tr>
                                <th className="bg-white text-center align-middle  ">
                                  Sl
                                </th>

                                <th className="bg-white text-center align-middle ">
                                  Payment Type
                                  <span className="text-danger fw-bold fs-2">
                                    *
                                  </span>
                                </th>
                                <th className="bg-white text-center align-middle ">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            {details && details.length > 0
                              ? details?.map((detail, index) => {
                                  return (
                                    <tbody>
                                      <tr key={index}>
                                        <td className="bg-white text-center align-middle">
                                          {index + 1}
                                        </td>

                                        <td className="text-center align-middle">
                                          <Field
                                            type="text"
                                            name={`detailsData.${index}.paymentType`}
                                            placeholder="Payment Type"
                                            value={detail?.paymentType}
                                            style={{
                                              border: "1px solid #2DDC1B",
                                              padding: "5px",
                                              width: "75%",
                                              borderRadius: "5px",
                                            }}
                                            onClick={(e) => {
                                              setFieldValue(
                                                `detailsData.${index}.paymentType`,
                                                e.target.value
                                              );
                                            }}
                                          />
                                          <br />
                                          {touched.detailsData?.[index]
                                            ?.paymentType &&
                                            errors.detailsData?.[index]
                                              ?.paymentType && (
                                              <div className="text-danger">
                                                {
                                                  errors.detailsData[index]
                                                    .paymentType
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

export default InsertPaymentOption;

import {
  faArrowAltCircleLeft,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, FieldArray, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleClientInfoQuery,
  useInsertClientInformationMutation,
  useUpdateClientDetailsInfoMutation,
} from "../../../redux/features/clientinformation/clientInfoApi";
import swal from "sweetalert";

const InsertClientInformation = () => {
  const ArrayHelperRef = useRef();
  const { id } = useParams();
  const navigate = useNavigate();
  const [insertClientInfo] = useInsertClientInformationMutation();
  const [updateClientInfo] = useUpdateClientDetailsInfoMutation();
  const { data: singleClientInfo } = useGetSingleClientInfoQuery(id);
  const [clientData, setClientData] = useState([]);
  const getUser = localStorage.getItem("user");
  const getUserParse = JSON.parse(getUser);
  const makebyUser = getUserParse[0].username;
  const updatebyUser = getUserParse[0].username;
console.log(clientData)
  const initialValues = {
    detailsData: [
      {
        clientName: "",
        email: "",
        mobileNo: "",
        contactPerson: "",
        binNo: "",
        tinNo: "",
        address: "",
        remarks: "",
        isActive: true,
        clientApproveStatus: false,
        clientApproveDate: null,
        makeBy: makebyUser,
        updateBy: null,
        makeDate: new Date(),
        updateDate: null,
      },
    ],
  };

  useEffect(() => {
    setClientData(singleClientInfo);
  }, [singleClientInfo]);

  const handleSubmit = async (e, values, resetForm) => {
    e.preventDefault();
    try {
      if (id) {
        const response = await updateClientInfo(clientData);
        console.log(response.data.status);
        if (response.data.status === 200) {
          swal("Done", "Data Save Successfully", "success");
          navigate("/main-view/client-list");
        } else {
          swal(
            "Not Possible!",
            "An problem occurred while creating the data",
            "error"
          );
        }
      } else {
        const response = await insertClientInfo(values.detailsData);
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
        <div className="shadow-lg mt-2 mt-sm-4 mt-md-4 mt-lg-4 p-4 rounded-4">
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
                {id
                  ? "Update  Client Information"
                  : "Create Client Information"}
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
                  navigate("/main-view/client-list");
                }}
              >
                <FontAwesomeIcon icon={faArrowAltCircleLeft}></FontAwesomeIcon>
                Back to SupplierList
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
                    clientName: Yup.string().required("Required"),
                    email: Yup.string().required("Required"),
                    mobileNo: Yup.string()
                      .required("Required")
                      .min(11, "must be at least 11 characters long"),
                    contactPerson: Yup.string().required("Required"),
                    binNo: Yup.string().required("Required"),
                    tradeLicenceNo: Yup.string().required("Required"),
                    tinNo: Yup.string().required("Required"),
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
                        <div className="d-flex mt-4 mb-4">
                        </div>
                      </div> */}

                  <FieldArray
                    name="detailsData"
                    render={(arrayHelpers) => {
                      ArrayHelperRef.current = arrayHelpers;
                      const details = values.detailsData;
                      return (
                        <div className="row shadow-lg pt-5 pb-3 w-75 d-flex justify-content-center mx-auto">
                          <div className="col-md-12">
                            {details && details.length > 0
                              ? details.map((detail, index) => {
                                  console.log(detail);
                                  return (
                                    <div key={index}>
                                      <div>
                                        <div className="col-md-6">
                                          <div className="mb-2">
                                            <label htmlFor="email">
                                              Client Name
                                            </label>
                                            <Field
                                              type="text"
                                              name={`detailsData.${index}.clientName`}
                                              placeholder="Client Name"
                                              value={
                                                id
                                                  ? clientData?.clientName
                                                  : detail?.clientName
                                              }
                                              style={{
                                                border: "1px solid #2DDC1B",
                                                padding: "5px",
                                                width: "100%",
                                                borderRadius: "5px",
                                                height: "38px",
                                              }}
                                              onChange={(e) => {
                                                if (id) {
                                                  setClientData((prevData) => ({
                                                    ...prevData,
                                                    clientName: e.target.value,
                                                    updateBy: updatebyUser,
                                                    updateDate: new Date(),
                                                  }));
                                                } else {
                                                  setFieldValue(
                                                    `detailsData.${index}.clientName`,
                                                    e.target.value
                                                  );
                                                }
                                              }}
                                            />
                                            <br />
                                            {id
                                              ? ""
                                              : touched.detailsData?.[index]
                                                  ?.clientName &&
                                                errors.detailsData?.[index]
                                                  ?.clientName && (
                                                  <div className="text-danger">
                                                    {
                                                      errors.detailsData[index]
                                                        .clientName
                                                    }
                                                  </div>
                                                )}
                                          </div>
                                          <div className="mb-2">
                                            <label htmlFor="email">Email</label>
                                            <Field
                                              type="email"
                                              name={`detailsData.${index}.email`}
                                              placeholder="Email"
                                              value={
                                                id
                                                  ? clientData?.email
                                                  : detail?.email
                                              }
                                              style={{
                                                border: "1px solid #2DDC1B",
                                                padding: "5px",
                                                width: "100%",
                                                borderRadius: "5px",
                                                height: "38px",
                                              }}
                                              onChange={(e) => {
                                                if (id) {
                                                  setClientData((prevData) => ({
                                                    ...prevData,
                                                    email: e.target.value,
                                                    updateBy: updatebyUser,
                                                    updateDate: new Date(),
                                                  }));
                                                } else {
                                                  setFieldValue(
                                                    `detailsData.${index}.email`,
                                                    e.target.value
                                                  );
                                                }
                                              }}
                                            />
                                            <br />
                                            {id
                                              ? ""
                                              : touched.detailsData?.[index]
                                                  ?.email &&
                                                errors.detailsData?.[index]
                                                  ?.email && (
                                                  <div className="text-danger">
                                                    {
                                                      errors.detailsData[index]
                                                        .email
                                                    }
                                                  </div>
                                                )}
                                          </div>

                                          <div className="mb-2">
                                            <label htmlFor="mobileNo">
                                              Mobile Number
                                            </label>
                                            <Field
                                              type="number"
                                              name={`detailsData.${index}.mobileNo`}
                                              placeholder="Mobile Number"
                                              value={
                                                id
                                                  ? clientData?.mobileNo
                                                  : detail?.mobileNo
                                              }
                                              style={{
                                                border: "1px solid #2DDC1B",
                                                padding: "5px",
                                                width: "100%",
                                                borderRadius: "5px",
                                                height: "38px",
                                                marginBottom: "5px",
                                              }}
                                              onChange={(e) => {
                                                if (id) {
                                                  setClientData((prevData) => ({
                                                    ...prevData,
                                                    mobileNo: e.target.value,
                                                    updateBy: updatebyUser,
                                                    updateDate: new Date(),
                                                  }));
                                                } else {
                                                  setFieldValue(
                                                    `detailsData.${index}.mobileNo`,
                                                    e.target.value
                                                  );
                                                }
                                              }}
                                            />
                                            <br />
                                            {id
                                              ? ""
                                              : touched.detailsData?.[index]
                                                  ?.mobileNo &&
                                                errors.detailsData?.[index]
                                                  ?.mobileNo && (
                                                  <div className="text-danger">
                                                    {
                                                      errors.detailsData[index]
                                                        .mobileNo
                                                    }
                                                  </div>
                                                )}
                                          </div>
                                          <div className="mb-2">
                                            {" "}
                                            <label htmlFor="remarks">
                                              Remarks
                                            </label>
                                            <textarea
                                              type="textarea"
                                              name={`detailsData.${index}.remarks`}
                                              placeholder="Remarks"
                                              value={
                                                id
                                                  ? clientData?.remarks
                                                  : detail?.remarks
                                              }
                                              rows="3"
                                              style={{
                                                border: "1px solid #2DDC1B",
                                                padding: "5px",
                                                width: "100%",
                                                borderRadius: "5px",
                                              }}
                                              onChange={(e) => {
                                                if (id) {
                                                  setClientData((prevData) => ({
                                                    ...prevData,
                                                    remarks: e.target.value,
                                                    updateBy: updatebyUser,
                                                    updateDate: new Date(),
                                                  }));
                                                } else {
                                                  setFieldValue(
                                                    `detailsData.${index}.remarks`,
                                                    e.target.value
                                                  );
                                                }
                                              }}
                                            />
                                            {id
                                              ? ""
                                              : touched.detailsData?.[index]
                                                  ?.remarks &&
                                                errors.detailsData?.[index]
                                                  ?.remarks && (
                                                  <div className="text-danger">
                                                    {
                                                      errors.detailsData[index]
                                                        .remarks
                                                    }
                                                  </div>
                                                )}
                                          </div>
                                          
                                        </div>

                                        <div className="col-md-6">
                                        <div className="mb-2">
                                            <label htmlFor="conatctPerson">
                                              Contact Person
                                            </label>
                                            <Field
                                              type="text"
                                              name={`detailsData.${index}.contactPerson`}
                                              placeholder="Contact Person"
                                              value={
                                                id
                                                  ? clientData?.contactPerson
                                                  : detail?.contactPerson
                                              }
                                              style={{
                                                border: "1px solid #2DDC1B",
                                                padding: "5px",
                                                width: "100%",
                                                borderRadius: "5px",
                                                height: "38px",
                                                marginBottom: "5px",
                                              }}
                                              onChange={(e) => {
                                                if (id) {
                                                  setClientData((prevData) => ({
                                                    ...prevData,
                                                    contactPerson:
                                                      e.target.value,
                                                    updateBy: updatebyUser,
                                                    updateDate: new Date(),
                                                  }));
                                                } else {
                                                  setFieldValue(
                                                    `detailsData.${index}.contactPerson`,
                                                    e.target.value
                                                  );
                                                }
                                              }}
                                            />
                                            <br />
                                            {id
                                              ? ""
                                              : touched.detailsData?.[index]
                                                  ?.contactPerson &&
                                                errors.detailsData?.[index]
                                                  ?.contactPerson && (
                                                  <div className="text-danger">
                                                    {
                                                      errors.detailsData[index]
                                                        .contactPerson
                                                    }
                                                  </div>
                                                )}
                                          </div>
                                          <div className="mb-2">
                                            <label htmlFor="conatctPerson">
                                              Bin Number
                                            </label>
                                            <Field
                                              type="text"
                                              name={`detailsData.${index}.binNo`}
                                              placeholder="Bin Number"
                                              value={
                                                id
                                                  ? clientData?.binNo
                                                  : detail?.binNo
                                              }
                                              style={{
                                                border: "1px solid #2DDC1B",
                                                padding: "5px",
                                                width: "100%",
                                                borderRadius: "5px",
                                                height: "38px",
                                              }}
                                              onChange={(e) => {
                                                if (id) {
                                                  setClientData((prevData) => ({
                                                    ...prevData,
                                                    binNo: e.target.value,
                                                    updateBy: updatebyUser,
                                                    updateDate: new Date(),
                                                  }));
                                                } else {
                                                  setFieldValue(
                                                    `detailsData.${index}.binNo`,
                                                    e.target.value
                                                  );
                                                }
                                              }}
                                            />
                                            <br />
                                            {id
                                              ? ""
                                              : touched.detailsData?.[index]
                                                  ?.binNo &&
                                                errors.detailsData?.[index]
                                                  ?.binNo && (
                                                  <div className="text-danger">
                                                    {
                                                      errors.detailsData[index]
                                                        .binNo
                                                    }
                                                  </div>
                                                )}
                                          </div>

                                          <div className="mb-2">
                                            <label htmlFor="tradeLicenceNo">
                                              TIN Number
                                            </label>
                                            <Field
                                              type="text"
                                              name={`detailsData.${index}.tinNo`}
                                              placeholder="Tin No"
                                              value={
                                                id
                                                  ? clientData?.tinNo
                                                  : detail?.tinNo
                                              }
                                              style={{
                                                border: "1px solid #2DDC1B",
                                                padding: "5px",
                                                width: "100%",
                                                borderRadius: "5px",
                                                height: "38px",
                                              }}
                                              onChange={(e) => {
                                                if (id) {
                                                  setClientData((prevData) => ({
                                                    ...prevData,
                                                    tinNo: e.target.value,
                                                    updateBy: updatebyUser,
                                                    updateDate: new Date(),
                                                  }));
                                                } else {
                                                  setFieldValue(
                                                    `detailsData.${index}.tinNo`,
                                                    e.target.value
                                                  );
                                                }
                                              }}
                                            />
                                            <br />
                                            {id
                                              ? ""
                                              : touched.detailsData?.[index]
                                                  ?.tinNo &&
                                                errors.detailsData?.[index]
                                                  ?.tinNo && (
                                                  <div className="text-danger">
                                                    {
                                                      errors.detailsData[index]
                                                        .tinNo
                                                    }
                                                  </div>
                                                )}
                                          </div>

                                          <div className="mb-2">
                                            {" "}
                                            <label htmlFor="address">
                                              Address
                                            </label>
                                            <textarea
                                              type="textarea"
                                              name={`detailsData.${index}.address`}
                                              placeholder="Address"
                                              value={
                                                id
                                                  ? clientData?.address
                                                  : detail?.address
                                              }
                                              rows="3"
                                              style={{
                                                border: "1px solid #2DDC1B",
                                                padding: "5px",
                                                width: "100%",
                                                borderRadius: "5px",
                                              }}
                                              onChange={(e) => {
                                                if (id) {
                                                  setClientData((prevData) => ({
                                                    ...prevData,
                                                    address: e.target.value,
                                                    updateBy: updatebyUser,
                                                    updateDate: new Date(),
                                                  }));
                                                } else {
                                                  setFieldValue(
                                                    `detailsData.${index}.address`,
                                                    e.target.value
                                                  );
                                                }
                                              }}
                                            />
                                            {id
                                              ? ""
                                              : touched.detailsData?.[index]
                                                  ?.address &&
                                                errors.detailsData?.[index]
                                                  ?.address && (
                                                  <div className="text-danger">
                                                    {
                                                      errors.detailsData[index]
                                                        .address
                                                    }
                                                  </div>
                                                )}
                                          </div>
                                         
                                        </div>
                                      </div>
                                      <div className="col-md-12">
                                        <div className="d-flex justify-content-center">
                                          <button
                                            type="submit"
                                            form="clientcreation-form"
                                            className="border-0 "
                                            style={{
                                              backgroundColor: id
                                                ? "#2DDC1B"
                                                : isValid && dirty
                                                ? "#2DDC1B"
                                                : "gray",
                                              color: "white",
                                              padding: "5px 10px",
                                              fontSize: "14px",
                                              borderRadius: "5px",
                                              width: "20%",
                                            }}
                                            disabled={
                                              id ? false : !(isValid && dirty)
                                            }
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })
                              : null}
                            {/* </tbody>
                                  </table> */}
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
    </div>
  );
};

export default InsertClientInformation;

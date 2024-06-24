import {
  faArrowAltCircleLeft,
  faPlus,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, FieldArray, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { MakeBy } from "./../../Common/ListHeadingModal/MakeByPermission/MakeBy";
import {
  useGetAllCFTInfosQuery,
  useInsertCFTInfoMutation,
} from "../../../redux/features/cftinformation/cftInfosApi";
import "./InsertCFTInfo.css";
const InsertCFTInfo = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );
  const [insertCFTInfos, { isLoading }] = useInsertCFTInfoMutation();
  const { data: allCFTInfoData } = useGetAllCFTInfosQuery(undefined);
  const getUser = localStorage.getItem("user");
  const getUserParse = JSON.parse(getUser);
  const makebyUser = getUserParse[0].username;
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    openingDate: new Date().toLocaleDateString("en-CA"),
    isActive: true,
    makeBy: "Supper-026",
    makeDate: new Date(),
    updateBy: "",
    updateDate: "",
    closingDate: "",
    kgPerUnit: "",
    image:''
  });
  console.log(formData);
  const initialValues = {
    detailsData: [
      {
        openingDate: startDate,
        kgPerUnit: "",
        image: "",
        isActive: true,
        makeBy: makebyUser,
        makeDate: new Date(),
        updateBy: "",
        updateDate: new Date(),
        closingDate: null,
      },
    ],
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const date = new Date().toLocaleDateString("en-CA");
    if (type == "text") {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      if (date < value) {
        console.log("date is greater than value");
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const data = new FormData();
      data.append("image", file);
      data.append("openingDate", formData.openingDate);
      data.append("isActive", formData.isActive);
      data.append("makeBy", formData.makeBy);
      data.append("makeDate", formData.makeDate);
      data.append("updateBy", formData.updateBy);
      data.append("updateDate", formData.updateDate);
      data.append("closingDate", formData.closingDate);
      data.append("kgPerUnit", formData.kgPerUnit);
      data.delete(formData.image)
   
      try {
        const matchData = allCFTInfoData.find((x) => x.isActive == true);
        console.log(matchData);
        if (matchData) {
          swal("Not Possible!", "Plase Close the Active CFT", "error");
        } else if (matchData == undefined) {
          const response = await insertCFTInfos(data);
          console.log(response);
          console.log(response.data.status);

          if (response.data.status === 200) {
            swal("Done", "Data Save Successfully", "success");
            navigate('main-view/cft-info-list')
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
        // swal("Relax!", "An problem occurred while creating the data", "error");
      }
    }
    else{
      try {
        const matchData = allCFTInfoData.find((x) => x.isActive == true);
        console.log(matchData);
        if (matchData) {
          swal("Not Possible!", "Plase Close the Active CFT", "error");
        } else if (matchData == undefined) {
          const response = await insertCFTInfos(formData);
          console.log(response);
          console.log(response.data.status);

          if (response.data.status === 200) {
            swal("Done", "Data Save Successfully", "success");
            navigate('main-view/cft-info-list')
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
        // swal("Relax!", "An problem occurred while creating the data", "error");
      }
    }
  };

  // const handleSubmit = async (e, values, resetForm) => {
  //   e.preventDefault();
  //   if (values.detailsData[0].image) {
  //     const data = new FormData();
  //     console.log(values.detailsData[0].image);

  //     data.append("image", values.detailsData[0].image);
  //     data.append("openingDate", values.detailsData[0].openingDate);
  //     data.append("isActive", values.detailsData[0].isActive);
  //     data.append("makeBy", values.detailsData[0].makeBy);
  //     data.append("makeDate", values.detailsData[0].makeDate);
  //     data.append("updateBy", values.detailsData[0].updateBy);
  //     data.append("updateDate", values.detailsData[0].updateDate);
  //     data.append("closingDate", values.detailsData[0].closingDate);
  //     data.append("kgPerUnit", values.detailsData[0].kgPerUnit);
  //     console.log(data);
  //   }

  //   try {
  //     // const matchData = allCFTInfoData.find((x) => x.isActive == true);
  //     // console.log(matchData)
  //     // if (matchData) {
  //     //   swal("Not Possible!", "Plase Close the CFT", "error");
  //     // } else if (matchData ==undefined){

  //     // }
  //     const response = await insertCFTInfos(values.detailsData[0]);
  //     console.log(response);
  //     console.log(response.data.status);

  //     if (response.data.status === 200) {
  //       swal("Done", "Data Save Successfully", "success");
  //       resetForm();
  //     } else {
  //       swal(
  //         "Not Possible!",
  //         "An problem occurred while creating the data",
  //         "error"
  //       );
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     // swal("Relax!", "An problem occurred while creating the data", "error");
  //   }
  // };

  return (
    <div
      className="d-felx justify-content-center align-items-center row px-4 mx-auto "
      // style={{
      //   height: "500px",
      // }}
    >
      <div class="overflow-hidden">
        <div className="shadow-lg mt-2 mt-sm-5 mt-md-5 mt-lg-5 p-5 rounded-4">
          <div className="d-flex justify-content-between align-items-center mt-4 ">
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
                Create CFT Infos
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
                  navigate("/main-view/cft-info-list");
                }}
              >
                <FontAwesomeIcon icon={faArrowAltCircleLeft}></FontAwesomeIcon>{" "}
                Back to CFTInfoList
              </button>
            </div>
          </div>
          <div></div>
          <div className="mt-3">
            <div className="d-flex justify-content-center align-items-center w-100 ">
              <div className="card shadow-lg w-50 p-5">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div>
                    <label htmlFor="">Opening Date</label>
                    <br />
                    <input
                      type="date"
                      name="openingDate"
                      value={formData.openingDate}
                      onChange={handleChange}
                      placeholder="Opening Date"
                      style={{
                        border: "1px solid #2DDC1B",
                        padding: "5px",
                        height: "38px",
                        borderRadius: "5px",
                        width: "95%",
                        textAlign: "center",
                      }}
                    />
                  </div>
                  <div className="mt-3">
                    <label htmlFor=""> KG Per Cft</label>
                    <br />
                    <input
                      type="text"
                      name="kgPerUnit"
                      placeholder="kg per unit"
                      value={formData?.kgPerUnit}
                      onChange={handleChange}
                      style={{
                        border: "1px solid #2DDC1B",
                        padding: "4px",
                        width: "95%",
                        height: "38px",
                        borderRadius: "5px",
                        textAlign: "center",
                      }}
                    />
                  </div>
                  <div className="mt-2">
                    <label htmlFor="">Upload Image</label>
                    <input type="file" onChange={handleFileChange} />
                  </div>
                  <div
                    className="mt-4"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      type="submit"
                      disabled={isLoading || formData.kgPerUnit == ""}
                      style={{
                        backgroundColor:
                          formData.kgPerUnit == "" ? "gray" : "#2DDC1B",
                        color: "white",
                        padding: "5px 10px",
                        fontSize: "14px",
                        borderRadius: "5px",
                        width: "30%",
                        border: "none",
                        textAlign: "center",
                      }}
                    >
                      {isLoading ? "Uploading..." : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* <div className="mt-3">
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object({
                detailsData: Yup.array().of(
                  Yup.object().shape({
                    kgPerUnit: Yup.string().required("Required"),
                    image: Yup.string().required("Required"),
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
                  id="cftcreation-form"
                  onSubmit={(e) => {
                    handleSubmit(e, values, resetForm);
                  }}
                  encType="multipart/form-data"
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex mt-2 mb-4">
                      <button
                        type="submit"
                        form="cftcreation-form"
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
                  </div>
                  <FieldArray
                    name="values"
                    render={(arrayHelpers) => {
                      const details = values.detailsData;
                      console.log(values);
                      return (
                        <div
                          className=" flex-1 items-center d-flex-nowrap"
                          style={{ height: "300px", overflowY: "auto" }}
                        >
                          {details?.map((detail, index) => {
                            return (
                              <div className="d-flex justify-content-center align-items-center w-100 ">
                                <div className="card shadow-lg w-75 p-5">
                                  <div className="mb-2">
                                    <label htmlFor="">Opening Date</label>
                                    <br />
                                    <DatePicker
                                      dateFormat="y-MM-dd"
                                      className="text-center custom-datepicker "
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
                                            startDate.toLocaleDateString(
                                              "en-CA"
                                            )
                                          );
                                          setFieldValue(
                                            `detailsData.${index}.openingDate`,
                                            startDate.toLocaleDateString(
                                              "en-CA"
                                            )
                                          );
                                        }
                                      }}
                                    />
                                  </div>

                                  <div className="mt-3">
                                    <label htmlFor=""> KG Per Cft</label>
                                    <Field
                                      type="text"
                                      name={`detailsData.${index}.kgPerUnit`}
                                      placeholder="kg per unit"
                                      value={detail?.kgPerUnit}
                                      style={{
                                        border: "1px solid #2DDC1B",
                                        padding: "4px",
                                        width: "95%",
                                        height: "38px",
                                        borderRadius: "5px",
                                        textAlign: "center",
                                      }}
                                      onClick={(e) => {
                                        setFieldValue(
                                          `detailsData.${index}.kgPerUnit`,
                                          e.value
                                        );
                                      }}
                                    />
                                    <br />
                                    {touched.detailsData?.[index]?.kgPerUnit &&
                                      errors.detailsData?.[index]
                                        ?.kgPerUnit && (
                                        <div className="text-danger">
                                          {errors.detailsData[index].kgPerUnit}
                                        </div>
                                      )}
                                  </div>
                                  <div class="mt-3">
                                    <label for="formFile" class="form-label">
                                      Image Upload
                                    </label>
                                    <input
                                      id="file"
                                      name="image"
                                      type="file"
                                      onChange={(event) => {
                                        console.log(
                                          `detailsData.${index}.image`
                                        );
                                        setFieldValue(
                                          `detailsData.${index}.image`,
                                          event.currentTarget.files[0]
                                        );
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }}
                  />
                </Form>
              )}
            </Formik>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default InsertCFTInfo;

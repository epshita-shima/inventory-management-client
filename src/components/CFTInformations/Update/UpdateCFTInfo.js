/* eslint-disable jsx-a11y/img-redundant-alt */
import {
  faArrowAltCircleLeft,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {
  useGetSingleCFTInfoQuery,
  useUpdateCFTInfoMutation,
} from "../../../redux/features/cftinformation/cftInfosApi";
import { Form, InputGroup } from "react-bootstrap";

const UpdateCFTInfo = () => {
  const [startDate, setStartDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [singleCFTInfosData, setSingleCFTInfosData] = useState();
  const { data: singleCFTInfoData } = useGetSingleCFTInfoQuery(id);
  const [updateCFTInfoData] = useUpdateCFTInfoMutation();
  const navigate = useNavigate();
  const getUser = localStorage.getItem("user");
  const getUserParse = JSON.parse(getUser);
  const updatebyUser = getUserParse[0].username;
  console.log(id);
  console.log(singleCFTInfosData);
  console.log(singleCFTInfoData)
  useEffect(() => {
    if (singleCFTInfoData) {
      setSingleCFTInfosData({
        _id: singleCFTInfoData._id,
        openingDate: singleCFTInfoData.openingDate,
        kgPerUnit: singleCFTInfoData.kgPerUnit,
        isActive: singleCFTInfoData.isActive,
        closingDate: singleCFTInfoData.closingDate,
        makeBy: singleCFTInfoData.makeBy,
        makeDate: singleCFTInfoData.makeDate,
        updateBy: singleCFTInfoData.updateBy,
        updateDate: singleCFTInfoData.updateDate,
        image: null,
      });
    }
    setSingleCFTInfosData(singleCFTInfoData);
  }, [singleCFTInfoData]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", file);
    data.append("_id", singleCFTInfosData._id);
    data.append("openingDate", singleCFTInfosData.openingDate);
    data.append("isActive", singleCFTInfosData.isActive);
    data.append("makeBy", singleCFTInfosData.makeBy);
    data.append("makeDate", singleCFTInfosData.makeDate);
    data.append("updateBy", singleCFTInfosData.updateBy);
    data.append("updateDate", singleCFTInfosData.updateDate);
    data.append("closingDate", singleCFTInfosData.closingDate);
    data.append("kgPerUnit", singleCFTInfosData.kgPerUnit);
    data.delete(singleCFTInfosData.image)
    console.log(singleCFTInfosData?._id)

    try {
      const response = await updateCFTInfoData({ data, id });
      console.log(response.data.status);
      if (response.data.status === 200) {
        swal("Done", "Data Update Successfully", "success");
        navigate("/main-view/cft-info-list");
      } else {
        swal(
          "Not Possible!",
          "An problem occurred while updating the data",
          "error"
        );
      }
    } catch (err) {
      console.error(err);
      swal("Relax!", "An problem occurred while updating the data", "error");
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
                Update CFT Info
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
                Back to CFTinfoList
              </button>
            </div>
          </div>
          <div></div>

          <div className="mt-3">
            <Form
              id="itemcreation-form"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="d-flex justify-content-center align-items-center w-100 ">
                <div className="card shadow-lg w-50 p-5">
                  <Form.Label
                    htmlFor="inputPassword5"
                    style={{ color: "#032339", letterSpacing: "1px" }}
                  >
                    Opening Date
                  </Form.Label>
                  <div className="mb-2">
                    <DatePicker
                      dateFormat="y-MM-dd"
                      className="text-center custom-datepicker-update"
                      calendarClassName="custom-calendar"
                      selected={singleCFTInfosData?.openingDate}
                      value={singleCFTInfosData?.openingDate}
                      required
                      onChange={(startDate) => {
                        console.log(startDate);
                        if (startDate > new Date()) {
                          swal({
                            title: "Select Valid Date",
                            text: "Date should be equal or earlier than today",
                            icon: "warning",
                            button: "OK",
                          });
                        } else {
                          setStartDate(startDate.toLocaleDateString("en-CA"));
                          setSingleCFTInfosData((prevData) => ({
                            ...prevData,
                            openingDate: startDate.toLocaleDateString("en-CA"),
                            updateBy: updatebyUser,
                            updateDate: new Date(),
                          }));
                        }
                      }}
                    />
                  </div>
                  <Form.Label
                    htmlFor="inputPassword5"
                    style={{ color: "#032339", letterSpacing: "1px" }}
                  >
                    Closing Date
                  </Form.Label>
                  <div className="mb-2">
                    <DatePicker
                      dateFormat="y-MM-dd"
                      className="text-center custom-datepicker-update"
                      calendarClassName="custom-calendar"
                      selected={singleCFTInfosData?.closingDate}
                      value={
                        singleCFTInfosData?.closingDate
                          ? singleCFTInfosData?.closingDate
                          : startDate
                      }
                      required
                      onChange={(startDate) => {
                        console.log(startDate);
                        if (startDate > new Date()) {
                          swal({
                            title: "Select Valid Date",
                            text: "Date should be equal or earlier than today",
                            icon: "warning",
                            button: "OK",
                          });
                        } else {
                          setStartDate(startDate.toLocaleDateString("en-CA"));
                          setSingleCFTInfosData((prevData) => ({
                            ...prevData,
                            closingDate: startDate.toLocaleDateString("en-CA"),
                            isActive: false,
                            updateBy: updatebyUser,
                            updateDate: new Date(),
                          }));
                        }
                      }}
                    />
                  </div>
                  <Form.Label
                    htmlFor="inputPassword5"
                    style={{ color: "#032339", letterSpacing: "1px" }}
                  >
                    CFT per KG
                  </Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="cft per kg"
                      name="kgperunit"
                      required
                      aria-label="cft per kg"
                      aria-describedby="basic-addon2"
                      value={singleCFTInfosData?.kgPerUnit}
                      autoComplete="off"
                      onChange={(e) => {
                        setSingleCFTInfosData((prevData) => ({
                          ...prevData,
                          kgPerUnit: e.target.value,
                          updateBy: updatebyUser,
                          updateDate: new Date(),
                        }));
                      }}
                      style={{
                        border: "1px solid #B8FEB3",
                        background: "white",
                        zIndex: "0",
                      }}
                    />
                  </InputGroup>
                  <div className="mt-2">
                    <label htmlFor="">Upload Image</label>
                    <div className="d-flex">
                      <input type="file" onChange={handleFileChange} />
                      {singleCFTInfoData?.image ? (
                        <p>
                          <img
                            src={`${process.env.REACT_APP_BASE_URL}/${singleCFTInfoData?.image}`}
                            alt="Current CFT Image"
                            style={{ maxWidth: "100px", maxHeight: "50px" }}
                          />
                        </p>
                      ) : (
                        singleCFTInfoData?.image && (
                          <div>
                            <p>Current Image:</p>
                            <img
                              src={`${process.env.REACT_APP_BASE_URL}/${singleCFTInfoData?.image}`}
                              alt="Current CFT Image"
                              style={{ maxWidth: "100px", maxHeight: "50px" }}
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center mt-4 w-100">
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
                    width: "20%",
                  }}
                >
                  Update
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCFTInfo;

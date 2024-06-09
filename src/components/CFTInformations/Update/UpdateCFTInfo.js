import { faArrowAltCircleLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useGetSingleCFTInfoQuery, useUpdateCFTInfoMutation } from '../../../redux/features/cftinformation/cftInfosApi';
import { Form, InputGroup } from 'react-bootstrap';

const UpdateCFTInfo = () => {
    const [startDate, setStartDate] = useState(
        new Date().toLocaleDateString("en-CA")
      );
      const { id } = useParams();
      const [singleCFTInfosData, setSingleCFTInfosData] = useState();
      const { data: singleCFTInfoData } = useGetSingleCFTInfoQuery(id);
      const [updateCFTInfoData] = useUpdateCFTInfoMutation();
      const navigate = useNavigate();
      const getUser = localStorage.getItem("user");
      const getUserParse = JSON.parse(getUser);
      const updatebyUser = getUserParse[0].username;
      console.log(id);
      console.log(singleCFTInfosData);
    
      useEffect(() => {
        setSingleCFTInfosData(singleCFTInfoData);
      }, [singleCFTInfoData]);
    
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await updateCFTInfoData(singleCFTInfosData);
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
                      navigate('/main-view/cft-info-list')
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
                        Kg Per(Unit)
                      </Form.Label>
                      <InputGroup className="mb-3">
                        <Form.Control
                          placeholder="kg per unit"
                          name="kgperunit"
                          required
                          aria-label="kg per unit"
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
                            zIndex:'0'
                          }}
                        />
                      </InputGroup>
                      <Form.Label
                        htmlFor="inputPassword5"
                        style={{ color: "#032339", letterSpacing: "1px" }}
                      >
                       CFT Status
                      </Form.Label>
                      <div class="form-check">
                        <input
                          type="checkbox"
                          checked={singleCFTInfosData?.isActive}
                          id="flexCheckDefault"
                          onClick={(e) => {
                            setSingleCFTInfosData((prevData) => ({
                              ...prevData,
                              isActive: e.target.checked,
                              updateBy: updatebyUser,
                              updateDate: new Date(),
                            }));
                          }}
                        />
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
}

export default UpdateCFTInfo

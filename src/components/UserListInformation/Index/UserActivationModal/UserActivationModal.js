import React from "react";
import "./UserActivationModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const UserActivationModal = () => {
  return (
    <div
      class="modal fade"
      id="exampleModalLong"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLongTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              User Information
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <ul class="list-group rounded-4">
              <li class="list-group-item active">User Activation</li>
              <div className="mt-4">
                <table class="table">
                  <thead>
                    <tr>
                      <th className="text-center" scope="col">
                        Sl.
                      </th>
                      <th className="text-center" scope="col">
                        Full Name
                      </th>
                      <th className="text-center" scope="col">
                        User Name
                      </th>
                      <th className="text-center" scope="col">
                        Mobile No
                      </th>
                      <th className="text-center" scope="col">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center align-middle">
                      <td className="align-middle">1</td>
                      <td>
                        <input
                          type="text"
                          class="form-control bg-light"
                          placeholder=""
                          aria-label=""
                          readOnly
                          aria-describedby="basic-addon1"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          class="form-control bg-light"
                          placeholder=""
                          aria-label=""
                          readOnly
                          aria-describedby="basic-addon1"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          class="form-control bg-light"
                          placeholder=""
                          aria-label=""
                          readOnly
                          aria-describedby="basic-addon1"
                        />
                      </td>
                      <td className="align-middle ">
                        <input
                          type="checkbox"
                          aria-label="Checkbox for following text input"
                        />

                        {/* <FontAwesomeIcon style={{color:'#00B987'}} icon={faEyeSlash}/> */}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ul>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn"
              data-dismiss="modal"
              style={{
                background: "transparent",
                color: "#00B987",
                fontSize: "16px",
                borderRadius: "10px",
                border: "2px solid #00B987",
                textTransform: "uppercase",
              }}
            >
              Cancle
            </button>
            <button
              type="button"
              class="btn"
              style={{
                background: "#00B987",
                color: "white",
                fontSize: "16px",
                borderRadius: "10px",
                textTransform: "uppercase",
              }}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserActivationModal;

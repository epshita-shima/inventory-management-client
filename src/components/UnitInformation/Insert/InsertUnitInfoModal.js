import React, { useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import swal from 'sweetalert';

const InsertUnitInfoModal = () => {
    const [existingUserRoles, setExistingUserRoles] = useState([]);
  
    const [unitName, setUnitName] = useState("");
    const handleUserRoleHandle = () => {
        if (existingUserRoles.includes(unitName)) {
          alert("User role already exists!");
          return;
        }
        try {
          // Call the mutation to create a new user role
          const unitinfoFormData = {
            makeby: "",
            updateby: "",
            unitName: unitName,
          };
    
      
          swal("Done", "Save Successfully", "success");
          // Clear the input field after successful creation
          setUnitName("");
        } catch (error) {
          console.error("Error creating user role:", error);
        }
      };
  return (
    <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
           Unit Entry
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
        <div class="modal-body shadow-lg p-5 m-5">
          <div className="w-100 ms-2">
            <Form submit={handleUserRoleHandle}>
              <Form.Label htmlFor="inputPassword5" className="text-dark">
                User Roll
              </Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="User's roll"
                  name="userroll"
                  required
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={unitName}
                  onChange={(e) => setUnitName(e.target.value)}
                  style={{ border: "1px solid #00B987" }}
                />
              </InputGroup>
            </Form>
          </div>
        </div>
        <div class="modal-footer">
          <button
            className="btn text-uppercase rounded-4"
            data-dismiss="modal"
            style={{
              border: "1px solid #00B987",
              color: "#00B987",
              fontWeight: "700",
              outline: "none",
            }}
          >
            Cancle
          </button>
          <button
            className="btn text-uppercase rounded-4"
            style={{
              background: "#00B987",
              color: "#fff",
              fontWeight: "700",
              outline: "none",
              border: "none",
            }}
            onClick={handleUserRoleHandle}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default InsertUnitInfoModal

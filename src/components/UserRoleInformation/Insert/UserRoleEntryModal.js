import React, { useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap'

const UserRoleEntryModal = () => {
    const [userroll,setUserroll]=useState('')
    
  return (
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">User Entry</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body shadow-lg p-5 m-5">
      <div className="w-100 ms-2">
                  <Form>
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
                        value={userroll} onChange={(e) => setUserroll(e.target.value)}
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
            >
              Submit
            </button>
      </div>
    </div>
  </div>
</div>
  )
}

export default UserRoleEntryModal

import React, { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import {
  useUpdateUserPasswordMutation,
} from "../../redux/features/user/userApi";
import { useNavigate } from 'react-router-dom';
import './ChangePasswordModal.css'
const ChangePasswordModal = ({
  menuListData,
  singleUserData,
  setSingleUserData,
  resetPassword,
  changePassword,
}) => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const navigate=useNavigate()
  const [updateUserPassword] = useUpdateUserPasswordMutation();
  const queryParams = new URLSearchParams(window.location.search);
  const reset = queryParams.get('reset');
  const change = queryParams.get('change');
  
  console.log('Reset:', reset); // true
  console.log('Change:', change);
  useEffect(() => {
    setSingleUserData(menuListData);
  }, [setSingleUserData]);

  const handleChangePassword = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setSingleUserData((prev) => {
      const temp_data = prev;
      console.log(temp_data);
      temp_data[0]["password"] = value;
      return temp_data;
    });
  };

  const handleSaveChangePassword = (e) => {
    e.preventDefault();
    updateUserPassword(singleUserData[0]);
    console.log(JSON.stringify(singleUserData));
  };

  return (
    <div
      className="row w-100"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "10%",
      }}
    >
      <div className="col-11 mt-4 p-5">
        <h4
          style={{
            borderBottom: "1px solid gray",
            paddingBottom: "5px",
            color: "#23302C",
            fontWeight: "bold",
          }}
        >
          {reset==='true' ? "Reset Password" : ""}
          {change==='true' ? "Change Password" : ""}
        </h4>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="shadow-lg col-10 card mt-4 p-5 col-sm-8 col-md-8 col-lg-8">
            <Form onSubmit={handleSaveChangePassword}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label style={{ color: "#23302C" }}>
                  New Password
                </Form.Label>
                <Form.Control
                  type="password"
                  name="newPassword"
                  placeholder="Enter password"
                  onChange={(e) => handleChangePassword(e)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label style={{ color: "#23302C" }}>
                  Confirm Password
                </Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Password"
                  onChange={(e) => handleChangePassword(e)}
                />
                {passwordMismatch && (
                  <p style={{ color: "red" }}>Passwords do not match</p>
                )}
              </Form.Group>

              <div className="d-flex justify-content-between mt-5">
                <Button
                  variant="primary"
                  type="submit"
                  style={{
                    backgroundColor: "#0A203F",
                    border: "none",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                  onClick={()=>{
                    navigate('/user-list-data')
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  className="btn-disabled"
                  disabled={formData.newPassword !== formData.confirmPassword || formData.newPassword =='' || formData.confirmPassword ==''}
                  style={{
                    backgroundColor: "#1EDFBD",
                    border: "none",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;

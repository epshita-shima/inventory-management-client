import React, { useEffect, useRef, useState } from "react";
import { useUserLoginMutation } from "../../redux/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/features/user/userSlice";
import logImage from "../../assets/images/cta1.1.jpg";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGetAllUserQuery } from "../../redux/features/user/userApi";
import swal from "sweetalert";

const LoginWithUsername = ({singleUserData,setSingleUserData}) => {
  const [data] = useUserLoginMutation();
  const { data: user } = useGetAllUserQuery(undefined);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // Select isLoggedIn state
  const navigate = useNavigate();
  console.log(JSON.stringify(user))


const handleFocus = () => {
  setPassword(''); // Clearing the password value
};
  useEffect(() => {
    const userData = user?.filter(
      (item) => item.username == username && item.password == password
    );
    console.log(userData);
    setSingleUserData(userData)
  }, [user, password, username,setSingleUserData]);
  const handleLogin = (e) => {
    e.preventDefault();
    if(singleUserData.length > 0){
      navigate('/main-view')
      localStorage.setItem('user',JSON.stringify(singleUserData))
    }
    else{
      swal("Not Possible!", "Try Again!", "warning")
    }
  
  };
  return (
    <div className="row vh-100">
      <div className=" h-100 w-100 position-relative">
        <img className="h-100 w-100" src={logImage} alt="" />
      </div>
      <div
        className="shadow-lg position-absolute w-50 rounded-4"
        style={{
          top: "30%",
          left: "25%",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="p-4">
          <h2 className=" mb-3 text-center text-white text-uppercase">Login</h2>
          {isLoggedIn ? (
            navigate("/project") // Render success message if isLoggedIn is true
          ) : (
            <>
              <Form onSubmit={handleLogin}>
                <Form.Label htmlFor="inputPassword5" className="text-white">
                  Username
                </Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="User's username"
                    name="username"
                    required
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={username}
                    ref={inputRef}
                    onFocus={handleFocus}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border border-primary"
                  />
                </InputGroup>
                {/* <input type="username" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)} required /> */}
                <Form.Label htmlFor="inputPassword5" className="text-white">
                  Password
                </Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="User's password"
                    id="inputPassword5"
                    required
                    ref={inputRef}
                    onFocus={handleFocus}
                    aria-describedby="passwordHelpBlock"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-primary"
                  />
                </InputGroup>

                <div className="d-grid ">
                  <Button
                    type="submit"
                    size="md"
                    className=" mt-2 w-50 mx-auto"
                    style={{ background: "orange", border: "none" }}
                  >
                    Login
                  </Button>
               
                </div>
              </Form>
              {message && <p>{message}</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginWithUsername;

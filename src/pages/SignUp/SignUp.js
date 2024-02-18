// import React, { useState } from "react";
// import { Button, Form, InputGroup } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { createUser} from "../../redux/features/user/userSlice";
// import { Link, useNavigate } from "react-router-dom";
// import logImage from "../../assets/images/cta1.1.jpg"
// import { useAddNewUserMutation } from "../../redux/api/apiSlice";

// function SignUp() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     confirmpassword: "",
//   });
//   const [error, setError] = useState("");
//   const [password, setPassword] = useState("");
//   const [data,{isError,isLoading,isSuccess}]=useAddNewUserMutation()
//   const dispatch = useDispatch();
//   const navigate=useNavigate()
  
//   const isStrongPassword = (password) => {
//     // Check for minimum length
//     if (password.length < 8) {
//       return false;
//     }

//     // Check for at least one lowercase letter
//     if (!/[a-z]/.test(password)) {
//       return false;
//     }

//     // Check for at least one uppercase letter
//     if (!/[A-Z]/.test(password)) {
//       return false;
//     }

//     // Check for at least one digit
//     if (!/\d/.test(password)) {
//       return false;
//     }

//     // Check for at least one special character
//     if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
//       return false;
//     }

//     // If all criteria are met, the password is considered strong
//     return true;
//   };

//   const existing = useSelector((state) => state.user);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const inputName = e.target.name;
//     const newPassword = e.target.value;
//     console.log(newPassword);
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//     if (inputName == "password") {
//       if (!isStrongPassword(newPassword)) {
//         setError(
//           "Password must be at least 8 characters long and include lowercase, uppercase, digits, and special characters."
//         );
//       } else {
//         setError("");
//       }
//     }
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmpassword) {
//       alert("please check your password");
//     } else {
//       dispatch(createUser(formData));
//         data(formData)  
//     }
//   };

//   return (
//     <div className="container-fluid vh-100">
//       <div className=" h-100 w-100 position-relative" >
//       <img className="h-100 w-100" src={logImage} alt="" />
//       </div>
//       <div className="shadow-lg position-absolute rounded-4 p-4 w-50 " style={{top:'15%',left:'25%',backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
//         <h2 className="text-white text-center text-uppercase mb-3 ">Register Form</h2>
//         <Form onSubmit={handleSubmit}>
//           <Form.Label htmlFor="inputPassword5" className="text-white">Email</Form.Label>
//           <InputGroup className="mb-3">
//             <Form.Control
//               placeholder="User's email"
//               name="email"
//               required
//               aria-label="Recipient's username"
//               aria-describedby="basic-addon2"
//               value={formData.email}
//               onChange={handleChange}
//               className="border border-primary"
//             />
//             <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
//           </InputGroup>
//           <Form.Label htmlFor="inputPassword5" className="text-white">Password</Form.Label>
//           <InputGroup className="mb-3">
//             <Form.Control
//               type="password"
//               name="password"
//               placeholder="User's password"
//               id="inputPassword5"
//               required
//               aria-describedby="passwordHelpBlock"
//               value={formData.password}
//               onChange={handleChange}
//               className="border border-primary"
//             />
//             <Form.Text id="passwordHelpBlock" muted>
//               {error && <div style={{ color: "red" }}>{error}</div>}
//             </Form.Text>
//           </InputGroup>

//           <Form.Label htmlFor="inputPassword6" className="text-white">Confirm Password</Form.Label>
//           <Form.Control
//             type="password"
//             name="confirmpassword"
//             placeholder="Confirm password"
//             id="inputPassword6"
//             required
//             aria-describedby="passwordHelpBlock"
//             value={formData.confirmpassword}
//             onChange={handleChange}
//             className="border border-primary"
//           />

//           <div className="d-grid ">
//             <Button
//               type="submit"
//               size="md"
//               className=" mt-4 w-50 mx-auto"
//               style={{background:'orange',border:'none'}}
//             >
//               SignUp
//             </Button>
//             <p className=" mt-4 d-flex justify-content-between align-items-center mx-auto">
//             <small className="text-white">
//               Already have an acccount?
//               <Link className="text-warning fw-bold" to="/login">
//                 Please Login
//               </Link>
//             </small>
//             </p>
//           </div>
          
//           {existing?.isError && (
//             <div className="text-warning d-flex justify-content-between align-items-center mx-auto">{existing.error}</div>
//           )}
//         </Form>
//       </div>
//     </div>
//   );
// }

// export default SignUp;

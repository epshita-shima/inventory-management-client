// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../../redux/features/user/userSlice";
// import { Button, Form, InputGroup } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import logImage from "../../assets/images/cta1.1.jpg"
// function Login() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user, isLoading } = useSelector((state) => state.user);
//   const isExit = useSelector((state) => state.user);
//   console.log(isExit);
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(loginUser({ email: formData.email, password: formData.password }));
//   };

//   useEffect(() => {
//     console.log('hi',user.email)
//     if (user.email) {
//       navigate("/project");
//     }
//   }, [user.email, isLoading, navigate]);

//   return (
//     <div className="container-fluid   vh-100">
//       <div className=" h-100 w-100 position-relative" >
//       <img className="h-100 w-100" src={logImage} alt="" />
//       </div>
//       <div className="shadow-lg position-absolute w-50 rounded-4" style={{top:'30%',left:'25%',backgroundColor: 'rgba(0, 0, 0, 0.3)'}} >
//        <div className="p-4">
//        <h2 className=" mb-3 text-center text-white text-uppercase">Login</h2>
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
//           </InputGroup>

//           <div className="d-grid ">
//             <Button
//               type="submit"
//               size="md"
//               className=" mt-2 w-50 mx-auto"
//              style={{background:'orange',border:'none'}}
//             >
//               Login
//             </Button>
//             {isExit.isError ? (
//               <div className="text-warning mt-3 fw-bold d-flex justify-content-between align-items-center mx-auto">Please give valid email and password</div>
//             ) : (
//               ""
//             )}
//           </div>
//         </Form></div>
//        </div>
//     </div>
//   );
// }

// export default Login;

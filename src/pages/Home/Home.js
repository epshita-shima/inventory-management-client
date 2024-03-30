/* eslint-disable jsx-a11y/anchor-is-valid */
import Navbar from "../Navbar/Navbar";
import "../../components/NestedDropdown.css";
import { useGetNavbarQuery } from "../../redux/features/user/navbar/navbarApi";
import DynamicNestedDropdown from "../../components/DynamicNestedDropdown";
import { useGetAllUserQuery } from "../../redux/features/user/userApi";
import { useEffect, useState } from "react";
import { Menubar } from "primereact/menubar";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";
import ChangePasswordModal from "../Login/ChangePasswordModal";
import Footer from "../Footer/Footer";
import { Outlet, useNavigate } from "react-router-dom";
const Home = ({ singleUserData ,setChangePassword,setResetPassword}) => {
  const { data: user } = useGetAllUserQuery(undefined);
 
  const getMenulistData = sessionStorage?.getItem("user");

  const menuListData = JSON.parse(getMenulistData);
  console.log(menuListData)
  if(menuListData !==null ){
    var menuListSingleData = menuListData[0]?.menulist;
  }
  
  console.log(menuListSingleData);
  const [showComponent, setShowComponent] = useState(false);
  const navigate = useNavigate();

  // const navbarData = [
  //   {
  //     label: 'Home',
  //     link: '#',
  //     active: true,
  //   },
  //   {
  //     label: 'Link',
  //     link: '#',
  //     active: false,
  //   },
  //   {
  //     label: 'User Setting',
  //     link: '#',
  //     items: [
  //       {
  //         label: 'User Role',
  //         link: '#'
  //       },

  //       {
  //         label: 'User Profile',
  //         link: '#',
  //         items: [
  //           {
  //             label: 'User List',
  //             link: '/user-list-data'
  //           },
  //           {
  //             label: 'Create User',
  //             link: '#'
  //           },
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     label: 'Disabled',
  //     link: '#',
  //     disabled: true,
  //   },
  //   // {
  //   //   label: 'Departments',
  //   //   link: '#',
  //   //   items: [
  //   //     {
  //   //       label: 'Accounts Department',
  //   //       link: '#',
  //   //       items: [
  //   //         {
  //   //           label: 'Purchase Department',
  //   //           link: '#'
  //   //         },
  //   //         {
  //   //           label: 'Sales Department',
  //   //           link: '#',
  //   //           items: [
  //   //             {
  //   //               label: 'Purchase Department',
  //   //               link: '#'
  //   //             },
  //   //             {
  //   //               label: 'Sales Department',
  //   //               link: '#'
  //   //             },
  //   //             {
  //   //               label: 'Loan Department',
  //   //               link: '#'
  //   //             },
  //   //             {
  //   //               label: 'All Reports',
  //   //               link: '#'
  //   //             }
  //   //           ]
  //   //         },
  //   //         {
  //   //           label: 'Loan Department',
  //   //           link: '#'
  //   //         },
  //   //         {
  //   //           label: 'All Reports',
  //   //           link: '#'
  //   //         }
  //   //       ]
  //   //     },
  //   //      {
  //   //       label: 'Commercial Department',
  //   //       link: '#',
  //   //       items: [
  //   //         {
  //   //           label: 'Export Department',
  //   //           link: '#'
  //   //         },
  //   //         {
  //   //           label: 'Local Department',
  //   //           link: '#'
  //   //         },
  //   //         {
  //   //           label: 'All Department Reports',
  //   //           link: '#',
  //   //           items: [
  //   //             {
  //   //               label: 'Purchase Department',
  //   //               link: '#'
  //   //             },
  //   //             {
  //   //               label: 'Sales Department',
  //   //               link: '#'
  //   //             },
  //   //             {
  //   //               label: 'Loan Department',
  //   //               link: '#',
  //   //               items: [
  //   //                 {
  //   //                   label: 'Purchase Department',
  //   //                   link: '#'
  //   //                 },
  //   //                 {
  //   //                   label: 'Sales Department',
  //   //                   link: '#'
  //   //                 },
  //   //                 {
  //   //                   label: 'Loan Department',
  //   //                   link: '#',
  //   //                   items: [
  //   //                     {
  //   //                       label: 'Purchase Department',
  //   //                       link: '#'
  //   //                     },
  //   //                     {
  //   //                       label: 'Sales Department',
  //   //                       link: '#'
  //   //                     },
  //   //                     {
  //   //                       label: 'Loan Department',
  //   //                       link: '#'
  //   //                     },
  //   //                     {
  //   //                       label: 'All Reports',
  //   //                       link: '#' ,
  //   //                       items: [
  //   //                         {
  //   //                           label: 'Purchase Department',
  //   //                           link: '#'
  //   //                         },
  //   //                         {
  //   //                           label: 'Sales Department',
  //   //                           link: '#'
  //   //                         },
  //   //                         {
  //   //                           label: 'Loan Department',
  //   //                           link: '#',
  //   //                           items: [
  //   //                             {
  //   //                               label: 'Purchase Department',
  //   //                               link: '#'
  //   //                             },
  //   //                             {
  //   //                               label: 'Sales Department',
  //   //                               link: '#'
  //   //                             },
  //   //                             {
  //   //                               label: 'Loan Department',
  //   //                               link: '#'
  //   //                             },
  //   //                             {
  //   //                               label: 'All Reports',
  //   //                               link: '#'
  //   //                             }
  //   //                           ]
  //   //                         },
  //   //                         {
  //   //                           label: 'All Reports',
  //   //                           link: '#'
  //   //                         }
  //   //                       ]
  //   //                     }
  //   //                   ]
  //   //                 },
  //   //                 {
  //   //                   label: 'All Reports',
  //   //                   link: '#'
  //   //                 }
  //   //               ]
  //   //             },
  //   //             {
  //   //               label: 'All Reports',
  //   //               link: '#'
  //   //             }
  //   //           ]
  //   //         }
  //   //       ]
  //   //     }
  //   //   ]
  //   // },

  // ];

  const navbarData = [
    {
      _id: "65d1a288f98ea6dd01974174",
      label: "Home",
      link: "#",
      active: true,
    },
    {
      _id: "65d1a288f98ea6dd01974175",
      label: "Link",
      link: "#",
      active: false,
    },
    {
      label: "User Setting",
      url: "#",
      permissions: [],
      items: [
        {
          label: "User Role",
          url: "#",
          permissions: [],
          items: [],
        },
        {
          label: "User Profile",
          url: "#",
          permissions: [],
          items: [],
        },
        {
          label: "User List",
          url: "/user-list-data",
          permissions: [],
          items: [],
        },
        {
          label: "Create User",
          url: "#",
          permissions: [],
          items: [],
        },
      ],
    },
    {
      label: "Departments",
      url: "#",
      permissions: [],
      items: [
        {
          label: "Accounts Department",
          url: "#",
          permissions: [],
          items: [
            {
              label: "Purchase Department",
              url: "#",
              permissions: [],
            },
            {
              label: "Sales Department",
              url: "#",
              permissions: [],
              items: [
                {
                  label: "Purchase Department",
                  url: "#",
                  permissions: [],
                  items: [],
                },
                {
                  label: "Sales Department",
                  url: "#",
                  permissions: [],
                  items: [],
                },
                {
                  label: "Loan Department",
                  url: "#",
                  permissions: [],
                  items: [],
                },
                {
                  label: "All Reports",
                  url: "#",
                  permissions: [],
                  items: [],
                },
              ],
            },
            {
              label: "Loan Department",
              url: "#",
              permissions: [],
              items: [],
            },
            {
              label: "All Reports",
              url: "#",
              permissions: [],
              items: [],
            },
          ],
        },
        {
          label: "Commercial Department",
          url: "#",
          permissions: [],
          items: [
            {
              label: "Export Department",
              url: "#",
              permissions: [],
            },
            {
              label: "Local Department",
              url: "#",
              permissions: [],
            },
            {
              label: "All Department Reports",
              url: "#",
              permissions: [],
              items: [
                {
                  label: "Purchase Department",
                  url: "#",
                  permissions: [],
                  items: [],
                },
                {
                  label: "Sales Department",
                  url: "#",
                  permissions: [],
                  items: [],
                },
                {
                  label: "Loan Department",
                  url: "#",
                  permissions: [],
                  items: [
                    {
                      label: "Purchase Department",
                      url: "#",
                      permissions: [],
                      items: [],
                    },
                    {
                      label: "Sales Department",
                      url: "#",
                      permissions: [],
                      items: [],
                    },
                    {
                      label: "Loan Department",
                      url: "#",
                      permissions: [],
                      items: [
                        {
                          label: "Purchase Department",
                          url: "#",
                          permissions: [],
                          items: [],
                        },
                        {
                          label: "Sales Department",
                          url: "#",
                          permissions: [],
                          items: [],
                        },
                        {
                          label: "Loan Department",
                          url: "#",
                          permissions: [],
                          items: [],
                        },
                        {
                          label: "All Reports",
                          url: "#",
                          permissions: [],
                          items: [
                            {
                              label: "Purchase Department",
                              url: "#",
                              permissions: [],
                              items: [],
                            },
                            {
                              label: "Sales Department",
                              url: "#",
                              permissions: [],
                              items: [],
                            },
                            {
                              label: "Loan Department",
                              url: "#",
                              permissions: [],
                              items: [
                                {
                                  label: "Purchase Department",
                                  url: "#",
                                  permissions: [],
                                  items: [],
                                },
                                {
                                  label: "Sales Department",
                                  url: "#",
                                  permissions: [],
                                  items: [],
                                },
                                {
                                  label: "Loan Department",
                                  url: "#",
                                  permissions: [],
                                  items: [],
                                },
                                {
                                  label: "All Reports",
                                  url: "#",
                                  permissions: [],
                                  items: [],
                                },
                              ],
                            },
                            {
                              label: "All Reports",
                              url: "#",
                              permissions: [],
                              items: [],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      label: "All Reports",
                      url: "#",
                      permissions: [],
                      items: [],
                    },
                  ],
                },
                {
                  label: "All Reports",
                  url: "#",
                  permissions: [],
                  items: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#CBF3F0",
    height: "60px",
  };

  // Define your custom style for the Menubar
  const menubarStyle = {
    backgroundColor: "#CBF3F0",
    borderBottom: "1px solid #ccc",
  };
  const refreshBtnStyle = {
    backgroundColor: "#0A203F",
    color: "#fff",
  };
  // Define the menu items
  const filteredMenuItems = menuListSingleData?.map((menu) => {
    // Function to recursively filter items and update parent isChecked status
    const filterItems = (items) => {
      return items.filter((item) => {
        if (item.items && item.items.length > 0) {
          // Recursively filter nested items and update parent isChecked status
          item.items = filterItems(item.items);
          item.isChecked = item.items.some((child) => child.isChecked); // Update parent isChecked status
        }
        return item.isChecked === true;
      });
    };

    const filteredItems = filterItems(menu.items);

    return { ...menu, items: filteredItems };
  });

  const handleClick = () => {
    // setShowComponent(true); // Set showComponent state to true to render MyComponent
    setChangePassword(true)
    setResetPassword(false)
    navigate("/change-password");
  };

  const handleRefreshData = () => {
    console.log(menuListData)
    const userData = user?.filter(
      (item) => item?.username == menuListData[0]?.username && item.password == menuListData[0]?.password
    );
    sessionStorage.setItem('user',JSON.stringify(userData))
  };
  return (
    <div className="row" style={{ position: "relative", height: "100vh" }}>
      <div
        className="col d-flex justify-content-between align-items-center"
        style={cardStyle}
      >
        <div className="d-flex justify-content-between align-items-center">
          <button
            className="btn"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Menu Refresh"
            style={refreshBtnStyle}
            onClick={() => {
              sessionStorage.setItem(
                "menulist",
                JSON.stringify(singleUserData[0]?.menulist)
              );
            
            }}
          >
            <FontAwesomeIcon
              icon={faRefresh}
              className="fs-3"
              onClick={() => {
                handleRefreshData()
              }}
            ></FontAwesomeIcon>
          </button>
          <Menubar model={filteredMenuItems} style={menubarStyle} />
        </div>
        <div>
          <Dropdown>
            <Dropdown.Toggle
              variant="secondary"
              id="dropdown-basic"
              style={{
                backgroundColor: "#0A203F",
                color: "white",
                border: "none",
                outline: "none",
              }}
            >
         {
          menuListData !==null ? `     Hello, ${menuListData[0]?.firstname}
          ${menuListData[0]?.lastname}` :''
         }
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#" onClick={handleClick}>
                Change Password
              </Dropdown.Item>
              <Dropdown.Item href="#" onClick={() => {
                    sessionStorage.clear();
                    navigate("/login/user");
                  }}>
               Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {/* {showComponent && <ChangePasswordModal menuListData={menuListData} singleUserData={singleUserData} setSingleUserData={setSingleUserData}/>} */}

      {/* <Footer></Footer> */}
    </div>
  );
};

export default Home;

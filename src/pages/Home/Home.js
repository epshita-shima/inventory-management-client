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
import { faRefresh, faUser } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";
import ChangePasswordModal from "../Login/ChangePasswordModal";
import Footer from "../Footer/Footer";
import { Outlet, useNavigate } from "react-router-dom";
const Home = ({ singleUserData, setChangePassword, setResetPassword }) => {
  const { data: user, refetch } = useGetAllUserQuery(undefined);

  const getMenulistData = localStorage?.getItem("user");

  const menuListData = JSON.parse(getMenulistData);
  console.log(menuListData);
  if (menuListData !== null) {
    var menuListSingleData = menuListData[0]?.menulist;
   
  }

  console.log(JSON.stringify(menuListSingleData));
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
    setChangePassword(true);
    setResetPassword(false);
    const url = `change-password?reset=false&change=true`;
    window.open(url, "_blank");
  };

  const handleRefreshData = async () => {
    console.log(menuListData);
    await refetch().then(({ data }) => {
      const userData = data?.filter(
        (item) =>
          item?.username === menuListData[0]?.username &&
          item.password === menuListData[0]?.password
      );

      console.log(userData);
      // Update localStorage with the filtered userData
      localStorage.setItem("user", JSON.stringify(userData));
    });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-md d-flex justify-content-between align-items-center"
          style={cardStyle}
        >
          <div class="d-block d-md-none">
            <div className="d-flex justify-content-between align-items-center">
              {/* Dropdown button with custom icon */}
              <div className="position-relative">
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
                    <FontAwesomeIcon icon={faUser} className="fs-3">
                      {" "}
                    </FontAwesomeIcon>
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    style={{ overflowY: "auto", height: "150px",width
                    :'250px', backgroundColor:'#CBF3F0'}}
                  >
                    <Dropdown>
                    <Dropdown.Toggle 
                    // variant="secondary"
                    id="dropdown-basic1"
                    style={{
                      backgroundColor: "#0A203F",
                      color: "white",
                      border: "none",
                      outline: "none",
                      height:"28px"
                    }}
                      >
                    Menus
                    </Dropdown.Toggle>
                    
                    <Dropdown.Menu style={{overflowY:'auto', height: "150px", backgroundColor:'#CBF3F0'}}>
                    <Dropdown.Item onClick={handleRefreshData} style={{fontWeight:'bold'}}>
                      <FontAwesomeIcon icon={faRefresh} className="me-2" />
                      Refresh Data
                    </Dropdown.Item>
                    <Menubar model={filteredMenuItems} style={menubarStyle} />
                    </Dropdown.Menu>
                    </Dropdown>
                    {/* <div className="overflow-auto">
                      <Menubar model={filteredMenuItems} style={menubarStyle} />
                    </div> */}

                    <Dropdown.Item href="#" onClick={handleClick} style={{fontWeight:'bold'}}>
                      Change Password
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#"
                      style={{fontWeight:'bold'}}
                      onClick={() => {
                        localStorage.clear();
                        navigate("/");
                      }}
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              {/* Show name for large screens */}
              <span className="d-none d-md-block">
                {menuListData !== null
                  ? `Hello, ${menuListData[0]?.firstname} ${menuListData[0]?.lastname}`
                  : ""}
              </span>
            </div>
          </div>

          <div className="d-none d-md-flex justify-content-between align-items-center w-100">
            <div className="d-flex justify-content-between align-items-center ">
              <button
                className="btn"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Menu Refresh"
                style={refreshBtnStyle} // Limit button width
                onClick={handleRefreshData}
              >
                <FontAwesomeIcon
                  icon={faRefresh}
                  className="fs-3"
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
                  {menuListData !== null
                    ? `Hello, ${menuListData[0]?.firstname} ${menuListData[0]?.lastname}`
                    : ""}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#" onClick={handleClick}>
                    Change Password
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#"
                    onClick={() => {
                      localStorage.clear();
                      navigate("/");
                    }}
                  >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

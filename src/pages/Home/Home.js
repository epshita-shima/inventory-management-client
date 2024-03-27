/* eslint-disable jsx-a11y/anchor-is-valid */
import Navbar from '../Navbar/Navbar'
import '../../components/NestedDropdown.css'
import { useGetNavbarQuery } from '../../redux/features/user/navbar/navbarApi'
import DynamicNestedDropdown from '../../components/DynamicNestedDropdown'
import { useGetAllUserQuery } from '../../redux/features/user/userApi'
import { useEffect, useState } from 'react'
import { Menubar } from 'primereact/menubar';
import  './Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRefresh } from '@fortawesome/free-solid-svg-icons'
const Home = () => {
const getMenulistData=sessionStorage.getItem('menulist')
const menuListData=(JSON.parse(getMenulistData))

console.log(JSON.stringify(menuListData))
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
const menulits=[
  {
      "label": "User Setting",
      "url": "#",
      "permissions": [],
      "parentIds": [],
      "items": [
          {
              "label": "User Role",
              "url": "#",
              "permissions": [],
              "isChecked": true,
              "items": [],
              "trackId": "usersubitem-11",
              "insert": true,
              "update": false,
              "delete": false,
              "pdf": false,
              "_id": "65f169d9dda5e6e0b7089a2e"
          },
          {
              "label": "User Profile",
              "url": "#",
              "permissions": [],
              "isChecked": true,
              "items": [
                  {
                      "label": "User List",
                      "url": "/user-list-data",
                      "permissions": [],
                      "_id": "usersubitem-121",
                      "isParent": "false",
                      "trackId": "usersubitem-121",
                      "isChecked": true,
                      "insert": true,
                      "update": false,
                      "pdf": false,
                      "delete": false,
                      "parentIds": [
                          "65d9795d342fe067c0232fbb",
                          "usersubitem-12"
                      ]
                  },
                  {
                      "label": "Create User",
                      "url": "#",
                      "permissions": [],
                      "_id": "usersubitem-122",
                      "isParent": "false",
                      "trackId": "usersubitem-122",
                      "isChecked": true,
                      "insert": true,
                      "update": false,
                      "pdf": false,
                      "delete": false,
                      "parentIds": [
                          "65d9795d342fe067c0232fbb",
                          "usersubitem-12"
                      ]
                  }
              ],
              "trackId": "usersubitem-12",
              "insert": false,
              "update": false,
              "delete": false,
              "pdf": false,
              "_id": "65f169d9dda5e6e0b7089a2f"
          }
      ],
      "isChecked":true,
      "insert": false,
      "update": false,
      "delete": false,
      "pdf": false,
      "_id": "65f169d9dda5e6e0b7089a2d"
  },
  {
      "label": "Departments",
      "url": "#",
      "permissions": [],
      "parentIds": [],
      "items": [
          {
              "label": "Accounts Department",
              "url": "#",
              "permissions": [],
              "isChecked": true,
              "items": [
                  {
                      "label": "Purchase Department",
                      "url": "#",
                      "permissions": [],
                      "_id": "usersubitem-211",
                      "isParent": "false",
                      "trackId": "usersubitem-211",
                      "isChecked": true,
                      "insert": false,
                      "update": false,
                      "pdf": false,
                      "delete": false,
                      "parentIds": [
                          "65d9795d342fe067c0232fbc",
                          "usersubitem-21"
                      ]
                  },
                  {
                      "label": "Sales Department",
                      "url": "#",
                      "permissions": [],
                      "items": [
                          {
                              "label": "Purchase Department",
                              "url": "#",
                              "permissions": [],
                              "_id": "usersubitem-212-1",
                              "isParent": "false",
                              "trackId": "usersubitem-212-1",
                              "isChecked": true,
                              "insert": true,
                              "update": false,
                              "pdf": false,
                              "delete": false,
                              "parentIds": [
                                  "65d9795d342fe067c0232fbc",
                                  "usersubitem-21",
                                  "usersubitem-212"
                              ]
                          },
                          {
                              "label": "Sales Department",
                              "url": "#",
                              "permissions": [],
                              "_id": "usersubitem-212-2",
                              "trackId": "usersubitem-212-2",
                              "isChecked": false,
                              "insert": false,
                              "update": false,
                              "pdf": false,
                              "delete": false,
                              "parentIds": []
                          },
                          {
                              "label": "Loan Department",
                              "url": "#",
                              "permissions": [],
                              "_id": "usersubitem-212-3",
                              "trackId": "usersubitem-212-3",
                              "isChecked": true,
                              "insert": true,
                              "update": true,
                              "pdf": true,
                              "delete": true,
                              "parentIds": "usersubitem-212"
                          },
                          {
                              "label": "All Reports",
                              "url": "#",
                              "permissions": [],
                              "_id": "usersubitem-212-4",
                              "trackId": "usersubitem-212-4",
                              "isChecked": false,
                              "insert": false,
                              "update": false,
                              "pdf": false,
                              "delete": false,
                              "parentIds": []
                          }
                      ],
                      "_id": "usersubitem-212",
                      "isParent": "true",
                      "trackId": "usersubitem-212",
                      "isChecked": true,
                      "insert": false,
                      "update": false,
                      "pdf": false,
                      "delete": false,
                      "parentIds": []
                  },
                  {
                      "label": "All Reports",
                      "url": "#",
                      "permissions": [],
                      "_id": "usersubitem-213",
                      "trackId": "usersubitem-213",
                      "isChecked": false,
                      "insert": false,
                      "update": false,
                      "pdf": false,
                      "delete": false,
                      "parentIds": []
                  }
              ],
              "trackId": "usersubitem-21",
              "insert": false,
              "update": false,
              "delete": false,
              "pdf": false,
              "_id": "65f169d9dda5e6e0b7089a31"
          },
          {
              "label": "Commercial Department",
              "url": "#",
              "permissions": [],
              "isChecked": false,
              "items": [
                  {
                      "label": "Export Department",
                      "url": "#",
                      "permissions": [],
                      "_id": "usersubitem-221",
                      "trackId": "usersubitem-221",
                      "isChecked": false,
                      "insert": false,
                      "update": false,
                      "pdf": false,
                      "delete": false,
                      "parentIds": []
                  },
                  {
                      "label": "Local Department",
                      "url": "#",
                      "permissions": [],
                      "_id": "usersubitem-222",
                      "trackId": "usersubitem-222",
                      "isChecked": false,
                      "insert": false,
                      "update": false,
                      "pdf": false,
                      "delete": false,
                      "parentIds": []
                  },
                  {
                      "label": "All Department Reports",
                      "url": "#",
                      "permissions": [],
                      "items": [
                          {
                              "label": "Purchase Department",
                              "url": "#",
                              "_id": "usersubitem-223-1",
                              "trackId": "usersubitem-223-1",
                              "isChecked": false,
                              "insert": false,
                              "update": false,
                              "pdf": false,
                              "delete": false,
                              "parentIds": []
                          },
                          {
                              "label": "Sales Department",
                              "url": "#",
                              "permissions": [],
                              "_id": "usersubitem-223-2",
                              "trackId": "usersubitem-223-2",
                              "isChecked": false,
                              "insert": false,
                              "update": false,
                              "pdf": false,
                              "delete": false,
                              "parentIds": []
                          }
                      ],
                      "_id": "usersubitem-223",
                      "trackId": "usersubitem-223",
                      "isChecked": false,
                      "insert": false,
                      "update": false,
                      "pdf": false,
                      "delete": false,
                      "parentIds": []
                  }
              ],
              "trackId": "usersubitem-22",
              "insert": false,
              "update": false,
              "delete": false,
              "pdf": false,
              "_id": "65f169d9dda5e6e0b7089a32"
          },
          {
              "label": "All Reports",
              "url": "#",
              "permissions": [],
              "isChecked": false,
              "items": [],
              "trackId": "usersubitem-23",
              "insert": false,
              "update": false,
              "delete": false,
              "pdf": false,
              "_id": "65f169d9dda5e6e0b7089a33"
          }
      ],
      "isChecked": true,
      "insert": false,
      "update": false,
      "delete": false,
      "pdf": false,
      "_id": "65f169d9dda5e6e0b7089a30"
  }
]

  const navbarData=[
    {
        "_id": "65d1a288f98ea6dd01974174",
        "label": "Home",
        "link": "#",
        "active": true
    },
    {
        "_id": "65d1a288f98ea6dd01974175",
        "label": "Link",
        "link": "#",
        "active": false
    },
    {
      
        "label": "User Setting",
        "url": '#',
        "permissions": [],
        "items": [
            {
                "label": "User Role",
                "url": '#',
                "permissions": [],
                "items":[]
            },
            {
             
                "label": "User Profile",
                "url": '#',
                "permissions": [],
                "items":[]
            },
            {
             
                "label": "User List",
                "url": "/user-list-data",
                "permissions": [],
                "items":[]
            },
            {
             
                "label": "Create User",
                "url": '#',
                "permissions": [],
                "items":[]
            }
        ]
    },
      {
      label: 'Departments',
      "url": '#',
      "permissions": [],
      items: [            
        {
          label: 'Accounts Department',
          "url": '#',
          "permissions": [],
          items: [                
            {
              label: 'Purchase Department',
              "url": '#',
                "permissions": [],                 
            },
            {
              label: 'Sales Department',
              "url": '#',
                "permissions": [],
              items: [                
                {
                  label: 'Purchase Department',
                  "url": '#',
                "permissions": [], 
                "items":[]               
                },
                {
                  label: 'Sales Department',
                  "url": '#',
                  "permissions": [], 
                  "items":[]                 
                },
                {
                  label: 'Loan Department',
                  "url": '#',
                  "permissions": [], 
                  "items":[]                  
                },
                {
                  label: 'All Reports',
                  "url": '#',
                "permissions": [], 
                "items":[]                 
                }
              ]                  
            },
            {
              label: 'Loan Department',
              "url": '#',
                "permissions": [], 
                "items":[]                 
            },
            {
              label: 'All Reports',
              "url": '#',
                "permissions": [], 
                "items":[]                
            }
          ]
        },
         {
          label: 'Commercial Department',
          "url": '#',
          "permissions": [],
          items: [                
            {
              label: 'Export Department',
              "url": '#',
                "permissions": [],                 
            },
            {
              label: 'Local Department',
              "url": '#',
                "permissions": [],                 
            },
            {
              label: 'All Department Reports',
              "url": '#',
                "permissions": [],
              items: [                
                {
                  label: 'Purchase Department',
                  "url": '#',
                "permissions": [],
                "items":[]             
                },
                {
                  label: 'Sales Department',
                  "url": '#',
                "permissions": [],
                "items":[]                   
                },
                {
                  label: 'Loan Department',
                  "url": '#',
                  "permissions": [],
                  items: [                
                    {
                      label: 'Purchase Department',
                      "url": '#',
                      "permissions": [],
                      "items":[]               
                    },
                    {
                      label: 'Sales Department',
                      "url": '#',
                      "permissions": [],
                      "items":[]               
                    },
                    {
                      label: 'Loan Department',
                      "url": '#',
                      "permissions": [],
                      items: [                
                        {
                          label: 'Purchase Department',
                          "url": '#',
                          "permissions": [],
                          "items":[]                
                        },
                        {
                          label: 'Sales Department',
                          "url": '#',
                          "permissions": [],
                          "items":[]                  
                        },
                        {
                          label: 'Loan Department',
                          "url": '#',
                          "permissions": [],
                          "items":[]                  
                        },
                        {
                          label: 'All Reports',
                          "url": '#',
                          "permissions": [],
                          items: [                
                            {
                              label: 'Purchase Department',
                              "url": '#',
                              "permissions": [],
                              "items":[]                  
                            },
                            {
                              label: 'Sales Department',
                              "url": '#',
                              "permissions": [],
                              "items":[]                 
                            },
                            {
                              label: 'Loan Department',
                              "url": '#',
                              "permissions": [],
                              items: [                
                                {
                                  label: 'Purchase Department',
                                  "url": '#',
                              "permissions": [],
                              "items":[]                  
                                },
                                {
                                  label: 'Sales Department',
                                  "url": '#',
                              "permissions": [],
                              "items":[]                    
                                },
                                {
                                  label: 'Loan Department',
                                  "url": '#',
                              "permissions": [],
                              "items":[]                 
                                },
                                {
                                  label: 'All Reports',
                                  "url": '#',
                              "permissions": [],
                              "items":[]                  
                                }
                              ]                                    
                            },
                            {
                              label: 'All Reports',
                              "url": '#',
                              "permissions": [],
                              "items":[]                   
                            }
                          ]                  
                        }
                      ]                   
                    },
                    {
                      label: 'All Reports',
                      "url": '#',
                      "permissions": [],
                      "items":[]                   
                    }
                  ]                   
                },
                {
                  label: 'All Reports',
                  "url": '#',
                              "permissions": [],
                              "items":[]                   
                }
              ]                  
            }
          ]
        }
      ]
    },
]
// const updatePermissions = (apiData, nestedData) => {
//   // Iterate through the API data
//   for (const apiItem of apiData) {
//     // Find the matching item in the nested data
//     const nestedItem = nestedData.find((item) => item.label === apiItem.label);
    
//     // If a matching item is found, update its permissions
//     if (nestedItem) {
//       // If the item has a items, recursively update its permissions
//       if (apiItem.items && nestedItem.items) {
//         updatePermissions(apiItem.items, nestedItem.items);
//       }
      
//       // Update the item's permissions
//       apiItem.permissions = nestedItem.permissions;
//     }
//   }
// };

// // Call the function to update the permissions
// updatePermissions(apiData, nestedData);
const items = [
  {
      label: 'Home',
      icon: 'pi pi-home'
  },
  {
      label: 'Features',
      icon: 'pi pi-star',
      items: [
        {
            label: 'Apollo',
            icon: 'pi pi-palette'
        },
        {
            label: 'Ultima',
            icon: 'pi pi-palette'
        }
    ]
  },
  {
      label: 'Projects',
      icon: 'pi pi-search',
      items: [
          {
              label: 'Components',
              icon: 'pi pi-bolt'
          },
          {
              label: 'Blocks',
              icon: 'pi pi-server'
          },
          {
              label: 'UI Kit',
              icon: 'pi pi-pencil',
              
          },
          {
              label: 'Templates',
              icon: 'pi pi-palette',
              items: [
                  {
                      label: 'Apollo',
                      icon: 'pi pi-palette'
                  },
                  {
                      label: 'Ultima',
                      icon: 'pi pi-palette',
                      items: [
                        {
                            label: 'Apollo',
                            icon: 'pi pi-palette'
                        },
                        {
                            label: 'Ultima',
                            icon: 'pi pi-palette'
                        }
                    ]
                  }
              ]
          }
      ]
  },
  {
      label: 'Contact',
      icon: 'pi pi-envelope'
  }
];
const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '5px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
};

// Define your custom style for the Menubar
const menubarStyle = {
  backgroundColor: '#f0f0f0',
  borderBottom: '1px solid #ccc',
};

// Define the menu items
const filteredMenuItems = menuListData?.map(menu => {
  // Function to recursively filter items and update parent isChecked status
  const filterItems = items => {
    return items.filter(item => {
      if (item.items && item.items.length > 0) {
        // Recursively filter nested items and update parent isChecked status
        item.items = filterItems(item.items);
        item.isChecked = item.items.some(child => child.isChecked); // Update parent isChecked status
      }
      return item.isChecked === true;
    });
  };

  const filteredItems = filterItems(menu.items);

  return { ...menu, items: filteredItems };
});
console.log(filteredMenuItems)
  return (
    <div >
      {/* <Navbar data={menuListData}></Navbar> */}
     <div className=' d-flex justify-content-between align-items-center' style={cardStyle}>
     <div>
     <Menubar model={filteredMenuItems} style={menubarStyle} />
     </div>
      <div>
      <button
        class="btn btn-outline-success"
        onClick={() => {
          // handleSignOut();
        }}
      >
       <FontAwesomeIcon icon={faRefresh}></FontAwesomeIcon>
      </button>
      <button
        class="btn btn-outline-success"
        onClick={() => {
          // handleSignOut();
        }}
      >
        Logout
      </button>
      </div>
    </div>
   
   
    </div>
    
  )
}

export default Home

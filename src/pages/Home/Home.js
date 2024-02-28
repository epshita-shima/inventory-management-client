/* eslint-disable jsx-a11y/anchor-is-valid */
import Navbar from '../Navbar/Navbar'
import '../../components/NestedDropdown.css'
import { useGetNavbarQuery } from '../../redux/features/user/navbar/navbarApi'
import DynamicNestedDropdown from '../../components/DynamicNestedDropdown'

const Home = () => {

 const {data}=useGetNavbarQuery(undefined)
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
  //     dropdown: [                
  //       {
  //         label: 'User Role',
  //         link: '#'                  
  //       },
      
  //       {
  //         label: 'User Profile',
  //         link: '#',
  //         dropdown: [                
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
  //   //   dropdown: [            
  //   //     {
  //   //       label: 'Accounts Department',
  //   //       link: '#',
  //   //       dropdown: [                
  //   //         {
  //   //           label: 'Purchase Department',
  //   //           link: '#'                  
  //   //         },
  //   //         {
  //   //           label: 'Sales Department',
  //   //           link: '#',
  //   //           dropdown: [                
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
  //   //       dropdown: [                
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
  //   //           dropdown: [                
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
  //   //               dropdown: [                
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
  //   //                   dropdown: [                
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
  //   //                       dropdown: [                
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
  //   //                           dropdown: [                
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
 
  console.log(JSON.stringify(data))
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
        "dropdown": [
            {
                "label": "User Role",
                "url": '#',
                "permissions": [],
                "dropdown":[]
            },
            {
             
                "label": "User Profile",
                "url": '#',
                "permissions": [],
                "dropdown":[]
            },
            {
             
                "label": "User List",
                "url": "/user-list-data",
                "permissions": [],
                "dropdown":[]
            },
            {
             
                "label": "Create User",
                "url": '#',
                "permissions": [],
                "dropdown":[]
            }
        ]
    },
      {
      label: 'Departments',
      "url": '#',
      "permissions": [],
      dropdown: [            
        {
          label: 'Accounts Department',
          "url": '#',
          "permissions": [],
          dropdown: [                
            {
              label: 'Purchase Department',
              "url": '#',
                "permissions": [],                 
            },
            {
              label: 'Sales Department',
              "url": '#',
                "permissions": [],
              dropdown: [                
                {
                  label: 'Purchase Department',
                  "url": '#',
                "permissions": [], 
                "dropdown":[]               
                },
                {
                  label: 'Sales Department',
                  "url": '#',
                  "permissions": [], 
                  "dropdown":[]                 
                },
                {
                  label: 'Loan Department',
                  "url": '#',
                  "permissions": [], 
                  "dropdown":[]                  
                },
                {
                  label: 'All Reports',
                  "url": '#',
                "permissions": [], 
                "dropdown":[]                 
                }
              ]                  
            },
            {
              label: 'Loan Department',
              "url": '#',
                "permissions": [], 
                "dropdown":[]                 
            },
            {
              label: 'All Reports',
              "url": '#',
                "permissions": [], 
                "dropdown":[]                
            }
          ]
        },
         {
          label: 'Commercial Department',
          "url": '#',
          "permissions": [],
          dropdown: [                
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
              dropdown: [                
                {
                  label: 'Purchase Department',
                  "url": '#',
                "permissions": [],
                "dropdown":[]             
                },
                {
                  label: 'Sales Department',
                  "url": '#',
                "permissions": [],
                "dropdown":[]                   
                },
                {
                  label: 'Loan Department',
                  "url": '#',
                  "permissions": [],
                  dropdown: [                
                    {
                      label: 'Purchase Department',
                      "url": '#',
                      "permissions": [],
                      "dropdown":[]               
                    },
                    {
                      label: 'Sales Department',
                      "url": '#',
                      "permissions": [],
                      "dropdown":[]               
                    },
                    {
                      label: 'Loan Department',
                      "url": '#',
                      "permissions": [],
                      dropdown: [                
                        {
                          label: 'Purchase Department',
                          "url": '#',
                          "permissions": [],
                          "dropdown":[]                
                        },
                        {
                          label: 'Sales Department',
                          "url": '#',
                          "permissions": [],
                          "dropdown":[]                  
                        },
                        {
                          label: 'Loan Department',
                          "url": '#',
                          "permissions": [],
                          "dropdown":[]                  
                        },
                        {
                          label: 'All Reports',
                          "url": '#',
                          "permissions": [],
                          dropdown: [                
                            {
                              label: 'Purchase Department',
                              "url": '#',
                              "permissions": [],
                              "dropdown":[]                  
                            },
                            {
                              label: 'Sales Department',
                              "url": '#',
                              "permissions": [],
                              "dropdown":[]                 
                            },
                            {
                              label: 'Loan Department',
                              "url": '#',
                              "permissions": [],
                              dropdown: [                
                                {
                                  label: 'Purchase Department',
                                  "url": '#',
                              "permissions": [],
                              "dropdown":[]                  
                                },
                                {
                                  label: 'Sales Department',
                                  "url": '#',
                              "permissions": [],
                              "dropdown":[]                    
                                },
                                {
                                  label: 'Loan Department',
                                  "url": '#',
                              "permissions": [],
                              "dropdown":[]                 
                                },
                                {
                                  label: 'All Reports',
                                  "url": '#',
                              "permissions": [],
                              "dropdown":[]                  
                                }
                              ]                                    
                            },
                            {
                              label: 'All Reports',
                              "url": '#',
                              "permissions": [],
                              "dropdown":[]                   
                            }
                          ]                  
                        }
                      ]                   
                    },
                    {
                      label: 'All Reports',
                      "url": '#',
                      "permissions": [],
                      "dropdown":[]                   
                    }
                  ]                   
                },
                {
                  label: 'All Reports',
                  "url": '#',
                              "permissions": [],
                              "dropdown":[]                   
                }
              ]                  
            }
          ]
        }
      ]
    },
]

  return (
    <div>
      <Navbar data={data}></Navbar>
      {/* <DynamicNestedDropdown></DynamicNestedDropdown> */}
    </div>
  )
}

export default Home

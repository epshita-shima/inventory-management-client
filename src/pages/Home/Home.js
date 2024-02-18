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
  console.log(data)
  return (
    <div>
      <Navbar data={data}></Navbar>
      {/* <DynamicNestedDropdown></DynamicNestedDropdown> */}
    </div>
  )
}

export default Home

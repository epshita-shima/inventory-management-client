import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({children}) => {
const getUserFromSession=localStorage.getItem('user')
const getUser=JSON.parse(getUserFromSession)
const location = useLocation();
// const userIdFromSession=getUser[0]?._id
// console.log(getUser)
// const extractUserListForCurrentUser = (userData, userId) => {
//     let userList = null;
  
//     // Find the user object matching the provided userId
//     const currentUser = userData?.find(user => user._id === userId);
  
//     if (currentUser) {
//       // Loop through the menus of the current user
//       currentUser?.menulist?.forEach(menu => {
//         menu?.items?.forEach(subMenu => {
//           // Check if the subMenu is the "User Profile" menu
//           if (subMenu?.label === "User Profile") {
//             // Find the "User List" sub-item
//             const userListSubMenu = subMenu?.items.find(subItem => subItem?.label === "User List");
//             if (userListSubMenu) {
//               // Set the user list property
//               userList = userListSubMenu;
//             }
//           }
//         });
//       });
//     }
  
//     return userList;
//   };
  
//   // Call the function to get the user list for the current user
//   const permission = extractUserListForCurrentUser(activeUser, userIdFromSession);
//   console.log(permission?.url)
const extractUrlsAndIsChecked = (userData) => {
    const urlsAndIsChecked = [];
  
    // Loop through each user
    userData?.forEach(user => {
      // Loop through each menu item
      user.menulist.forEach(menuItem => {
        // Recursively traverse nested items
        const traverseItems = (items) => {
          items.forEach(item => {
            // Push URL and isChecked to the array
            urlsAndIsChecked.push({ url: item.url, isChecked: item.isChecked });
  
            // If the item has nested items, traverse them
            if (item.items && item.items.length > 0) {
              traverseItems(item.items);
            }
          });
        };
  
        traverseItems(menuItem.items);
      });
    });
  
    return urlsAndIsChecked;
  };
  
  // Call the function to get URLs and isChecked properties
  const data = extractUrlsAndIsChecked(getUser);
  console.log(data);
  const currentUrl = window.location.href;
  const pathname = new URL(currentUrl).pathname;
console.log(pathname)
  console.log(pathname); 
// Function to match a URL with the data
const matchUrlWithData = (data, url) => {
  // Iterate through the data array
  for (const item of data) {
    // Check if the URL matches
    console.log(item?.url,url)
    if (item?.url === url) {
      return item; // Return the matched item
    }
  }
  return null; // Return null if no match found
};

// Call the function to match the current URL with the data
const matchedItem = matchUrlWithData(data, pathname);

// Output the result
console.log(matchedItem);
if (!getUser || !matchedItem) {
    localStorage.clear();

    return <Navigate to="/" state={{ from: location }} replace />;
}
    return children;
}

export default RequireAuth

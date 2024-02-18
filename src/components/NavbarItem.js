import React, { useEffect, useRef, useState } from 'react';
import { createPopper } from '@popperjs/core';

const NavbarItem = ({ item,index }) => {

  // const handleDropdownToggle = () => {
  //   setDropdownVisible(!dropdownVisible);
  // };

  // const updateDropdownPlacement = () => {
  //   const buttonRect = buttonRef.current.getBoundingClientRect();
  //   const dropdownRect = dropdownRef.current.getBoundingClientRect();
  //   console.log(buttonRect.left,dropdownRect.width,buttonRef.current, dropdownRef.current)
  //   if (buttonRect.left < dropdownRect.width) {
  //     setPlacement('right');
  //   } else {
  //     setPlacement('left');
  //   }
  // };

  // useEffect(() => {
  //   if (dropdownVisible) {
  //     updateDropdownPlacement();

  //     const popperInstance = createPopper(buttonRef.current, dropdownRef.current, {
  //       placement: placement,
  //     });
  //   console.log(popperInstance)
  //     return () => {
  //       popperInstance.destroy();
  //     };
  //   }
  // }, [dropdownVisible, placement]);
 

  // useEffect(() => {
  //   const handleWindowResize = () => {
  //     if (dropdownRef.current) {
  //       const dropdownRect = dropdownRef.current.getBoundingClientRect();
  //       console.log(dropdownRect)
  //       const spaceLeft = dropdownRect.left;
  //       const spaceRight = window.innerWidth - dropdownRect.right;
  //       console.log(spaceLeft,spaceRight)
  //       setOpenLeft(spaceLeft < spaceRight);
  //     }
  //   };

  //   window.addEventListener('resize', handleWindowResize);

  //   // Initial check on mount
  //   handleWindowResize();

  //   return () => {
  //     window.removeEventListener('resize', handleWindowResize);
  //   };
  // }, []);

  // if (item.dropdown) {
  //   return (
  //     <li className={`nav-item dropdown dropend dropleft`} >
  //       <a href={item.link}  class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{item.label}</a>
  //       <ul id={`id${index}`} className={`dropdown-menu dropdown-menu-start`}  aria-labelledby="dropdownMenuButton" > 
  //         {item.dropdown?.map((subItem, index) => (
  //             <NavbarItem key={index} index={index+1} item={subItem} /> 
  //         ))} 
  //       </ul>
  //     </li>
  //   );
  // } else {
  //   return (
  //     <li className={`nav-item ${item.disabled} ? 'disabled' : '' `}>
  //       <a href={item.link} className={`${item.active} ? 'active' : '' nav-link`}>
  //         {item.label}
  //       </a>
  //     </li>
  //   );
  // }

//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const dropdownRef = useRef();
//   const buttonRef = useRef();

//   useEffect(() => {
//     const updatePlacement = () => {
//       if (buttonRef.current && dropdownRef.current) {
//         const buttonRect = buttonRef.current.getBoundingClientRect();
//         const dropdownRect = dropdownRef.current.getBoundingClientRect();
// console.log(buttonRect.left,dropdownRect.width)
//         if (buttonRect.left < dropdownRect.width) {
//           dropdownRef.current.classList.remove('dropdown-menu-start');
//           dropdownRef.current.classList.add('dropdown-menu-end');
//         } else {
//           dropdownRef.current.classList.remove('dropdown-menu-end');
//           dropdownRef.current.classList.add('dropdown-menu-start');
//         }
//       }
//     };

//     if (dropdownVisible) {
//       updatePlacement();
//     }
//   }, [dropdownVisible]);

//   const handleDropdownToggle = () => {
//     setDropdownVisible(!dropdownVisible);
//   };

//   if (item.dropdown) {
//     return (
//       <li className={`nav-item dropdown dropend dropleft`}>
//         <a
//           href={item.link}
//           className={` dropdown-toggle ${dropdownVisible ? 'show' : ''}`}
//           type="button"
//           id="dropdownMenuButton"
//           data-bs-toggle="dropdown"
//           aria-haspopup="true"
//           aria-expanded="false"
//           onClick={handleDropdownToggle}
//           ref={buttonRef}
//         >
//           {item.label}
//         </a>
//         <ul
//           id={`id${index}`}
//           className={`dropdown-menu`}
//           aria-labelledby="dropdownMenuButton"
//           ref={dropdownRef}
//         >
//           {item.dropdown?.map((subItem, index) => (
//             <NavbarItem key={index} index={index + 1} item={subItem} />
//           ))}
//         </ul>
//       </li>
//     );
//   } else {
//     return (
//       <li className={`nav-item ${item.disabled ? 'disabled' : ''}`}>
//         <a
//           href={item.link}
//           className={`${item.active ? 'active' : ''} nav-link`}
//         >
//           {item.label}
//         </a>
//       </li>
//     );
//   }

const [isOpen, setIsOpen] = useState(false);

const handleToggle = () => {
  setIsOpen(!isOpen);
};

return (
  <li className="dropdown-submenu">
    <a
      className={`dropdown-item ${item?.dropdown ? 'dropdown-toggle' : ''}`}
      href={item?.link}
      onClick={item?.dropdown ? handleToggle : null}
    >
      {item?.label}
    </a>
    {item?.dropdown && (
      <ul className={`dropdown-menu ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
        {item?.dropdown.map((subItem, index) => (
          <NavbarItem key={index} item={subItem} />
        ))}
      </ul>
    )}
  </li>
);

};


export default NavbarItem
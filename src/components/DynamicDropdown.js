import { useRef, useState } from "react";
import NavbarItem from "./NavbarItem";

const Dropdown = ({ item ,isRight}) => {
  // const [isOpen, setIsOpen] = useState(false);
  // const [isRightChild, setIsRightChild] = useState(false);
  // const [elements, setElements] = useState([]);
  // const dropdownRef = useRef();
  // const handleToggle = () => {
  //   setIsOpen(!isOpen);
  // };
  // console.log(dropdownRef)
  // console.log(elements,isRightChild)
  // // Check if the dropdown should open as a right child
  // const checkRightChild = () => {
  //   const dropdownMenu = document.querySelector('.dropdown-menu');
  //   const dropdownBounds = dropdownMenu.getBoundingClientRect();
  //   const windowWidth = window.innerWidth;
  //   const newElement = dropdownBounds.right;
  //   setElements(prevElements => [...prevElements, newElement]);
  //   const sum = elements?.reduce((acc, curr) => acc + curr, 0);
  //   console.log(sum,windowWidth)
  //   if (sum > windowWidth  && dropdownBounds.left > 0) {
  //     setIsRightChild(true);
  //   } 
  //    else {
  //     setIsRightChild(false);
  //   }
  //   console.log('enter')
  // };

  // return (
  //   <li className={`nav-item dropdown ${isOpen ? 'show' : ''}`} onClick={checkRightChild} ref={dropdownRef} >
  //     <a
  //       className="nav-link dropdown-toggle"
  //       href={item.link}
  //       role="button"
  //       aria-haspopup="true"
  //       aria-expanded={isOpen ? 'true' : 'false'}
  //       onClick={handleToggle}
  //       // onMouseEnter={checkRightChild}
  //     >
  //       {item.label}
  //     </a>
  //     {item.dropdown && (
  //       <ul
  //         className={`dropdown-menu  ${isOpen ? 'show' : ''} `}
  //         style={{ display: isOpen ? 'block' : 'none',}}
  //       >
  //         {item.dropdown.map((subItem, index) => (
  //           <NavbarItem key={index} item={subItem} />
  //         ))}
  //       </ul>
  //     )}
  //   </li>
  // );

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
console.log(isRight)
  return (
    <li className={`nav-item dropdown ${isOpen ? 'show' : ''}`}>
      <a
        className="nav-link dropdown-toggle"
        href={item.link}
        role="button"
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : 'false'}
        onClick={handleToggle}
      >
        {item.label}
      </a>
      {item.dropdown && (
        <ul className={`dropdown-menu ${isOpen ? 'show' : ''} ${isRight ? 'dropdown-menu-right' : ''}`}>
          {item.dropdown.map((subItem, index) => (
            <Dropdown key={index} item={subItem} isRight={!isRight} />
          ))}
        </ul>
      )}
    </li>
  );

}


export default Dropdown
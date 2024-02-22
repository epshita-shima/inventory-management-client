import React from 'react'


const Menu = ({ item }) => {
    
    return(
        <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${item.label.replace(/\s+/g, '')}`}>
        {item.label}
      </button>
    </h2>
    <div id={`collapse${item.label.replace(/\s+/g, '')}`} className="accordion-collapse collapse">
      <div className="accordion-body">
        <ul className="list-group">
          {item.dropdown.map((subItem, index) => (
            <li key={index} className="list-group-item">
              <a href={subItem.url}>{subItem.label}</a>
              <input type="checkbox" className="form-check-input" />
              {subItem.dropdown && subItem.dropdown.length > 0 && (
                <Menu item={subItem} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
    )
  };
  
  export default Menu;

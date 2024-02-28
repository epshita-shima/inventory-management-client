import React, { useState } from "react";

import "./Menu.css";
const Menu = ({ item, clickedCheckboxes, setClickedCheckboxes }) => {
  console.log(item);
  const handleCheckboxClick = (subItem) => {
    const isDuplicate = clickedCheckboxes?.some(
      (check) => check?.itemId === subItem?._id
    );

    if (!isDuplicate) {
      if (clickedCheckboxes === undefined) {
        setClickedCheckboxes((prevData) => [
          ...prevData,
          {
            subItemLabel: subItem?.label,
            itemLabel: subItem?.label,
            itemId: subItem?._id,
            insert: false,
            update: false,
            pdf: false,
          },
        ]);
      } else {
        setClickedCheckboxes((prevData) => [
          ...prevData,
          {
            subItemLabel: subItem?.label,
            itemLabel: subItem?.label,
            itemId: subItem?._id,
            insert: false,
            update: false,
            pdf: false,
          },
        ]);
      }

      console.log("Previous Array:", clickedCheckboxes);
    }
  };
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          style={{
            background: "#CBF3F0",
            color: "black",
            letterSpacing: "0.8px",
            fontWeight: "600",
          }}
          className="accordion-button fs-4 latter"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse${item.label.replace(/\s+/g, "")}`}
        >
          {item.label}
        </button>
      </h2>
      <div
        id={`collapse${item.label.replace(/\s+/g, "")}`}
        className="accordion-collapse collapse"
      >
        <div className="accordion-body">
          {item.dropdown && item.dropdown.length > 0 && (
            <ul className="list-group">
              {item?.dropdown?.map((subItem, index) => (
                <li key={index} className="list-group-item">
                {
                  subItem.dropdown ? '' :(  <input
                    type="checkbox"
                    id={`${subItem?._id}`}
                    name="check"
                    className="form-check-input  border-success me-2"
                    onClick={(e) => {
                      const { checked } = e.target;
                      if (checked) {
                        handleCheckboxClick(subItem);
                      } else {
                        const updatedData = clickedCheckboxes.filter(
                          (item) => item?.itemId !== subItem?._id
                        );
                        console.log(updatedData);
                        setClickedCheckboxes(updatedData);
                      }
                    }}
                  />)
                }
                  <a
                    href={subItem?.url}
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontWeight: "600",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {subItem?.label}
                  </a>

                  {subItem.dropdown && subItem.dropdown.length > 0 && (
                    <>
                      <Menu
                        item={subItem}
                        clickedCheckboxes={clickedCheckboxes}
                        setClickedCheckboxes={setClickedCheckboxes}
                      />
                    </>
                  )}

                <div>
                    <div className={`d-flex justify-content-between`}>
                      <div className="d-flex">
                        <label htmlFor="">Insert</label>
                        <input
                          type="checkbox"
                          id={`${subItem?._id}`}
                          className="form-check-input  border-success ms-1"
                          onClick={(e) => {
                            const { checked } = e.target;
                            const indexes = clickedCheckboxes.findIndex(
                              (item) => item.itemId === subItem._id
                            );
                            if (checked) {
                              setClickedCheckboxes((prev) => {
                                const tempDetails = [...prev];
                                console.log(index);
                                tempDetails[indexes]["insert"] = checked;
                                return tempDetails;
                              });
                            } else {
                              setClickedCheckboxes((prev) => {
                                const tempDetails = [...prev];
                                console.log(tempDetails[index]);
                                tempDetails[indexes]["insert"] = checked;
                                return tempDetails;
                              });
                            }
                          }}
                        />
                      </div>
                      <div className="d-flex">
                        <label htmlFor="">Update</label>
                        <input
                          type="checkbox"
                          className="form-check-input border-success ms-2"
                          onClick={(e) => {
                            const { checked } = e.target;
                            const indexes = clickedCheckboxes.findIndex(
                              (item) => item.itemId === subItem._id
                            );
                            if (checked) {
                              setClickedCheckboxes((prev) => {
                                const tempDetails = [...prev];
                                console.log(index);
                                tempDetails[indexes]["update"] = checked;
                                return tempDetails;
                              });
                            } else {
                              setClickedCheckboxes((prev) => {
                                const tempDetails = [...prev];
                                console.log(tempDetails[index]);
                                tempDetails[indexes]["update"] = checked;
                                return tempDetails;
                              });
                            }
                          }}
                        />
                      </div>
                      <div className="d-flex">
                        <label htmlFor="">PDF</label>
                        <input
                          type="checkbox"
                          className="form-check-input  border-success ms-2"
                          onClick={(e) => {
                            const { checked } = e.target;
                            const indexes = clickedCheckboxes.findIndex(
                              (item) => item.itemId === subItem._id
                            );
                            if (checked) {
                              setClickedCheckboxes((prev) => {
                                const tempDetails = [...prev];
                                console.log(index);
                                tempDetails[indexes]["pdf"] = checked;
                                return tempDetails;
                              });
                            } else {
                              setClickedCheckboxes((prev) => {
                                const tempDetails = [...prev];
                                console.log(tempDetails[index]);
                                tempDetails[indexes]["pdf"] = checked;
                                return tempDetails;
                              });
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div> 
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;

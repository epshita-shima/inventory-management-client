import React, { useEffect, useState } from "react";
import swal from "sweetalert";

const TreeNode = ({
  node,
  clickedCheckboxes,
  setClickedCheckboxes,
  parentIds,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isParentChecked, setIsParentChecked] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxClick = (subNode) => {
    const isDuplicate = clickedCheckboxes?.some(
      (check) => check?.itemId === subNode?._id
    );

    if (!isDuplicate) {
      if (clickedCheckboxes === undefined) {
        setClickedCheckboxes((prevData) => [
          ...prevData,
          {
            childId: subNode?._id,
            insert: false,
            update: false,
            pdf: false,
            delete: false,
            parentIds: parentIds,
          },
        ]);
      } else {
        setClickedCheckboxes((prevData) => [
          ...prevData,
          {
            childId: subNode?._id,
            insert: false,
            update: false,
            pdf: false,
            delete: false,
            parentIds: parentIds,
          },
        ]);
      }

      console.log("Previous Array:", clickedCheckboxes);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <table className="table table-bordered">
        <tbody>
          <tr className="">
            <td
              colSpan="2"
              style={{
                textAlign: "left",
                paddingLeft: "20px",
                background: "#00B987",
                color: "white",
                fontWeight: "bold",
              }}
              onClick={handleToggle}
            >
              {isOpen ? "-" : "+"} {node.label}
            </td>
          </tr>
          <tr></tr>
          {isOpen && node.dropdown && (
            <>
              {node.dropdown.map((subNode) => (
                <tr key={subNode._id}>
                  <td>
                    {subNode.dropdown ? (
                      <TreeNode
                        node={subNode}
                        clickedCheckboxes={clickedCheckboxes}
                        setClickedCheckboxes={setClickedCheckboxes}
                        parentIds={[...parentIds, node._id]}
                      />
                    ) : (
                      <>
                        <input
                          type="checkbox"
                          id={`${subNode?._id}`}
                          name="check"
                          className="form-check-input border-success me-2"
                          onClick={(e) => {
                            const { checked } = e.target;
                            if (checked) {
                              console.log(node.label, node._id);
                              parentIds.push(node._id);

                              handleCheckboxClick(subNode);
                            } else {
                              const updatedData = clickedCheckboxes.filter(
                                (item) => item?.childId !== subNode?._id
                              );

                              setClickedCheckboxes(updatedData);
                            }
                          }}
                        />
                        <label htmlFor="">{subNode.label}</label>
                      </>
                    )}
                  </td>

                  {subNode.dropdown ? (
                    ""
                  ) : (
                    <td className="d-flex justify-content-between align-items-center">
                      <div className="d-flex">
                        <input
                          type="checkbox"
                          id={`${subNode?._id}`}
                          className="form-check-input border-success me-2"
                          // checked={clickedCheckboxes.findIndex(
                          //   (item) => item.itemId === subNode._id
                          // ) !== -1}
                          onClick={(e) => {
                            const { checked } = e.target;
                            const indexes = clickedCheckboxes.findIndex(
                              (item) => item.childId === subNode._id
                            );

                            if (checked) {
                              if (indexes === -1) {
                                // Item does not exist in the array
                                swal(
                                  "Not possible",
                                  "Please select menu name",
                                  "warning"
                                );
                                e.target.checked = false;
                                return;
                              }

                              setClickedCheckboxes((prev) => {
                                const tempDetails = [...prev];
                                tempDetails[indexes]["insert"] = checked;
                                return tempDetails;
                              });
                            } else {
                              if (indexes === -1) {
                                // Item does not exist in the array
                                swal(
                                  "Not possible",
                                  "Please select menu name",
                                  "warning"
                                );
                                return;
                              }

                              setClickedCheckboxes((prev) => {
                                const tempDetails = [...prev];
                                tempDetails[indexes]["insert"] = checked;
                                return tempDetails;
                              });
                            }
                          }}
                        />
                        <label htmlFor="">Insert</label>
                      </div>
                      <div className="d-flex">
                        <input
                          type="checkbox"
                          className="form-check-input border-success me-2"
                          onClick={(e) => {
                            const { checked } = e.target;
                            const indexes = clickedCheckboxes.findIndex(
                              (item) => item.childId === subNode._id
                            );
                            if (checked) {
                              if (indexes === -1) {
                                // Item does not exist in the array
                                swal(
                                  "Not possible",
                                  "Please select menu name",
                                  "warning"
                                );
                                e.target.checked = false;
                                return;
                              }
                              setClickedCheckboxes((prev) => {
                                const tempDetails = [...prev];
                                tempDetails[indexes]["update"] = checked;
                                return tempDetails;
                              });
                            } else {
                              if (indexes === -1) {
                                // Item does not exist in the array
                                swal(
                                  "Not possible",
                                  "Please select menu name",
                                  "warning"
                                );
                                e.target.checked = false;
                                return;
                              }
                              setClickedCheckboxes((prev) => {
                                const tempDetails = [...prev];
                                tempDetails[indexes]["update"] = checked;
                                return tempDetails;
                              });
                            }
                          }}
                        />
                        <label htmlFor="">Update</label>
                      </div>
                      <div className="d-flex">
                        <input
                          type="checkbox"
                          className="form-check-input border-success me-2"
                          onClick={(e) => {
                            const { checked } = e.target;
                            const indexes = clickedCheckboxes.findIndex(
                              (item) => item.childId === subNode._id
                            );
                            if (checked) {
                              if (indexes === -1) {
                                // Item does not exist in the array
                                swal(
                                  "Not possible",
                                  "Please select menu",
                                  "warning"
                                );
                                e.target.checked = false;
                                return;
                              }
                              setClickedCheckboxes((prev) => {
                                const tempDetails = [...prev];
                                tempDetails[indexes]["delete"] = checked;
                                return tempDetails;
                              });
                            } else {
                              if (indexes === -1) {
                                // Item does not exist in the array
                                swal(
                                  "Not possible",
                                  "Please select menu",
                                  "warning"
                                );
                                e.target.checked = false;
                                return;
                              }
                              setClickedCheckboxes((prev) => {
                                const tempDetails = [...prev];
                                tempDetails[indexes]["delete"] = checked;
                                return tempDetails;
                              });
                            }
                          }}
                        />
                        <label htmlFor="">Delete</label>
                      </div>
                      <div className="d-flex">
                        <input
                          type="checkbox"
                          className="form-check-input border-success me-2"
                          onClick={(e) => {
                            const { checked } = e.target;
                            const indexes = clickedCheckboxes.findIndex(
                              (item) => item.childId === subNode._id
                            );
                            if (checked) {
                              if (indexes === -1) {
                                // Item does not exist in the array
                                swal(
                                  "Not possible",
                                  "Please select menu",
                                  "warning"
                                );
                                e.target.checked = false;
                                return;
                              }
                              setClickedCheckboxes((prev) => {
                                const tempDetails = [...prev];
                                tempDetails[indexes]["pdf"] = checked;
                                return tempDetails;
                              });
                            } else {
                              if (indexes === -1) {
                                // Item does not exist in the array
                                swal(
                                  "Not possible",
                                  "Please select menu",
                                  "warning"
                                );
                                e.target.checked = false;
                                return;
                              }
                              setClickedCheckboxes((prev) => {
                                const tempDetails = [...prev];
                                tempDetails[indexes]["pdf"] = checked;
                                return tempDetails;
                              });
                            }
                          }}
                        />
                        <label htmlFor="">PDF</label>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TreeNode;

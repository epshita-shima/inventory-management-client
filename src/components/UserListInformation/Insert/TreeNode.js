import React, { useEffect, useState } from "react";
import swal from "sweetalert";

const TreeNode = ({
  node,
  clickedCheckboxes,
  setClickedCheckboxes,
  parentIds,
  singleUserData,
  isUpdate,
 data
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isParentChecked, setIsParentChecked] = useState(false);
console.log(parentIds)
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
console.log(clickedCheckboxes.parentIds)
  // function convertToNestedObject(clickedCheckboxes, parentNode) {
  //   const nestedObject =[ {
  //     _id: parentNode._id,
  //     label: parentNode.label,
  //     url: parentNode.url,
  //     permissions: [],
  //     items: [],
  //   }];
  //   console.log(parentNode);
  //   if (parentNode.items && parentNode.items.length > 0) {
  //     parentNode.items.forEach((subNode) => {
  //       // Filter clickedCheckboxes to get only child data for the current subNode
  //       console.log(subNode);
  //       const childCheckboxes = clickedCheckboxes.filter(
  //         (checkbox) =>
  //           checkbox.childId === subNode._id &&
  //           checkbox.parentIds.includes(parentNode._id)
  //       );
  //       console.log(childCheckboxes, clickedCheckboxes);
  //       const nestedDropdown = {
  //         _id: subNode._id,
  //         label: subNode.label,
  //         url: subNode.url,
  //         permissions: [],
  //         isChecked:
  //           childCheckboxes.length > 0 ? childCheckboxes[0].isChecked : false,
  //         insert:
  //           childCheckboxes.length > 0 ? childCheckboxes[0].insert : false,
  //         update:
  //           childCheckboxes.length > 0 ? childCheckboxes[0].update : false,
  //         pdf: childCheckboxes.length > 0 ? childCheckboxes[0].pdf : false,
  //         delete:
  //           childCheckboxes.length > 0 ? childCheckboxes[0].delete : false,
  //         items: [],
  //       };

       

  //       if (subNode.items && subNode.items.length > 0) {
  //         nestedDropdown.items = convertToNestedObject(
  //           clickedCheckboxes,
  //           subNode
  //         );
  //         console.log(nestedDropdown.items);
  //       }

  //       nestedObject.items.push(nestedDropdown);
  //     });
  //   }
  //   console.log(nestedObject);
  //   return nestedObject;
  // }

  // Assuming node, clickedCheckboxes, and parentIds are available
//   const nestedObject = convertToNestedObject(clickedCheckboxes, node);
// console.log(nestedObject)
  const handleCheckboxClick = (subNode) => {
    console.log(subNode)
    console.log(parentIds)
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
            isChecked: true,
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
            isChecked: true,
            parentIds: parentIds,
          },
        ]);
      }

      console.log("Previous Array:", clickedCheckboxes);
    }
  };


  // const sendFunctionToParentComponent = () => {
  //   // const functionData = "Function data from child";
  //   sendFunctionToParent(nestedObject);
  // };

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
          {isOpen && node.items && (
            <>
              {node.items.map((subNode) => (
                <tr key={subNode._id}>
                  <td>
                    {subNode.items ? (
                      <TreeNode
                        node={subNode}
                        clickedCheckboxes={clickedCheckboxes}
                        setClickedCheckboxes={setClickedCheckboxes}
                        parentIds={[...parentIds, node._id]}
                        isUpdate={isUpdate}
                        singleUserData={singleUserData}
                      />
                    ) : (
                      <>
                        <input
                          type="checkbox"
                          id={`${subNode?._id}`}
                          // checked={subNode?.isChecked || false}
                          name="check"
                          className="form-check-input border-success me-2"
                          onClick={(e) => {
                            const { checked } = e.target;
                            
                            if (checked) {
                              parentIds.push(node._id);
                              console.log(node._id)
                              handleCheckboxClick(subNode);
                            } else {
                              const updatedData = clickedCheckboxes.filter(
                                (item) => item?.childId !== subNode?._id
                              );
                              console.log(updatedData)
                              setClickedCheckboxes(updatedData);
                            }
                          }}
                        />
                        <label htmlFor="">{subNode.label}</label>
                      </>
                    )}
                  </td>

                  {subNode.items ? (
                    ""
                  ) : (
                    <td className="d-flex justify-content-between align-items-center">
                      <div className="d-flex">
                        <input
                          type="checkbox"
                          id={`${subNode?._id}`}
                          // checked={subNode?.insert || false}
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
                          // checked={subNode?.update || false}
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
                          // checked={subNode?.delete || false}
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
                          // checked={subNode?.pdf || false}
                          className="form-check-input border-success me-2"
                          onClick={(e) => {
                            const { checked } = e.target;
                            const indexes = clickedCheckboxes.findIndex(
                              (item) => item.childId === subNode._id
                            );

                            if (checked) {
                              console.log(clickedCheckboxes);
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

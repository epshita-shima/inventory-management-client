import { Field } from "formik";
import React, { useEffect } from "react";

const UpdateGRNInfo = ({
  grnSingleData,
  setGRNSingleData,
  rmItemInfo,
  makebyUser,
  setTotalGrandQuantity,
  setTotalGrandAmount,
  setFieldValue,
  touched,
  errors,
  totalGrandAmount,
  totalGrandQuantity,
}) => {
console.log(grnSingleData)
const handleKeyUp = (e, index, detail) => {
    const inputValue = e.target.value;
  
    // Parse the input value as an integer
    const parsedValue = parseInt(inputValue, 10);
    if (isNaN(parsedValue)) {
      // Handle case where input is not a valid number
      return;
    }
  
    // Calculate the total amount
    const calculateTotalAmount = parsedValue * detail.unitPrice;
  
    // Update the state with the new values
    setGRNSingleData((prev) => {
      const temp_details = [...prev.detailsData];
      const newDetail = { ...temp_details[index] };
  
      newDetail["quantity"] = parsedValue;
      newDetail["amount"] = calculateTotalAmount;
  
      temp_details[index] = newDetail;
  
      // Calculate the grand total quantities and amounts
      const totalGrandQuantities = temp_details.reduce((total, item) => total + (parseFloat(item.quantity) || 0), 0);
      const totalGrandTotalAmounts = temp_details.reduce((total, item) => total + (item.amount || 0), 0);
  
      return {
        ...prev,
        detailsData: [...temp_details],
        updateBy: makebyUser,
        updateDate: new Date(),
        grandTotalQuantity: totalGrandQuantities,
        grandTotalAmount: totalGrandTotalAmounts,
      };
    });
  }
  
  return (
    <div
      className="shadow-lg p-4"
      style={{ height: "300px", overflowY: "auto" }}
    >
      <table className="table w-full table-bordered">
        <thead className="w-100">
          <tr>
            <th className="bg-white text-center  align-items-center  ">Sl</th>

            <th className="bg-white text-center  align-items-center">
              Item Name
            </th>
            <th className="bg-white text-center  align-items-center ">
              Quantity
            </th>

            <th className="bg-white text-center  align-items-center ">
              Amount
            </th>
          </tr>
        </thead>

        <tbody>
          {grnSingleData?.detailsData && grnSingleData?.detailsData.length > 0
            ? grnSingleData?.detailsData.map((detail, index) => {
                const matchingItem = rmItemInfo?.find(
                  (item) => item._id === detail.itemId
                );

                return (
                  <tr key={index}>
                    <td className="text-center  align-items-center">
                      {index + 1}
                    </td>
                    <td className="text-center  align-items-center">
                      <Field
                        type="text"
                        name={`detailsData.${index}.itemId`}
                        disabled
                        placeholder="Item Name"
                        value={matchingItem.itemName}
                        style={{
                          border: "1px solid #2DDC1B",
                          padding: "5px",
                          width: "100%",
                          borderRadius: "5px",
                          height: "38px",
                          marginBottom: "5px",
                          textAlign: "center",
                        }}
                        onKeyUp={(e) => {
                          setFieldValue(
                            `detailsData.${index}.itemId`,
                            e.target.value
                          );
                        }}
                      />
                      <br />
                      {touched.detailsData?.[index]?.itemId &&
                        errors.detailsData?.[index]?.itemId && (
                          <div className="text-danger">
                            {errors.detailsData[index].itemId}
                          </div>
                        )}
                    </td>
                    <td className="text-center  align-items-center">
                      <Field
                        type="text"
                        name={`detailsData.${index}.quantity`}
                        placeholder="Quantity"
                        value={!detail?.quantity ? 0 : detail?.quantity}
                        style={{
                          border: "1px solid #2DDC1B",
                          padding: "5px",
                          width: "100%",
                          borderRadius: "5px",
                          height: "38px",
                          marginBottom: "5px",
                          textAlign: "center",
                        }}
                        onChange={(e) => {handleKeyUp(e,index,detail)}}
                      />
                      <br />
                      {touched.detailsData?.[index]?.quantity &&
                        errors.detailsData?.[index]?.quantity && (
                          <div className="text-danger">
                            {errors.detailsData[index].quantity}
                          </div>
                        )}
                    </td>
                    <td className="text-center  align-items-center">
                      <Field
                        type="text"
                        name={`detailsData.${index}.amount`}
                        placeholder="Amount"
                        value={detail.amount}
                        disabled
                        style={{
                          border: "1px solid #2DDC1B",
                          padding: "5px",
                          width: "100%",
                          borderRadius: "5px",
                          height: "38px",
                          marginBottom: "5px",
                          textAlign: "center",
                        }}
                        onChange={(e) => {
                          console.log(e.target.value);
                          setFieldValue(
                            `detailsData.${index}.amount`,
                            e.target.value
                          );
                        }}
                      />
                      <br />
                      {touched.detailsData?.[index]?.totalAmount &&
                        errors.detailsData?.[index]?.totalAmount && (
                          <div className="text-danger">
                            {errors.detailsData[index].totalAmount}
                          </div>
                        )}
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default UpdateGRNInfo;

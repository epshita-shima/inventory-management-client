import { Field } from "formik";
import React, { useEffect } from "react";

const InsertGRNDetailsInfo = ({
  details,
  rmItemInfo,
  setTotalGrandQuantity,
  setTotalGrandAmount,
  setFieldValue,
  touched,
  errors,
  totalGrandAmount,
  totalGrandQuantity,
}) => {
  useEffect(() => {
    // Calculate the grand totals when details change
    let calGrandTotalQuantity = 0;
    let calTotalAmount = 0;

    details.forEach((detail) => {
      calGrandTotalQuantity += +detail.quantity || 0;
      calTotalAmount += +detail.totalAmount || 0;
    });

    setTotalGrandQuantity(calGrandTotalQuantity);
    setTotalGrandAmount(calTotalAmount);

    setFieldValue("grandTotalQuantity", calGrandTotalQuantity);
    setFieldValue("grandTotalAmount", calTotalAmount);
  }, [details, setFieldValue]);
  return (
    <div
      className="shadow-lg p-4"
      style={{ height: "300px", overflowY: "auto" }}
    >
      <table className="table w-full table-bordered">
        <thead className="w-100">
          <tr>
            <th className="bg-white text-center  align-items-center  ">Sl</th>

            <th
              className="bg-white text-center  align-items-center"
           
            >
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
          {details && details.length > 0
            ? details.map((detail, index) => {
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
                          console.log(e.target.value);
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
                        value={detail.quantity}
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
                          const calculateTotalAmount =
                            e.target.value * detail.unitPrice;

                          setFieldValue(
                            `detailsData.${index}.totalAmount`,
                            calculateTotalAmount
                          );
                          setFieldValue(
                            `detailsData.${index}.quantity`,
                            e.target.value
                          );
                          setFieldValue("grandTotalAmount", totalGrandAmount);
                          setFieldValue(
                            "grandTotalQuantity",
                            totalGrandQuantity
                          );
                        }}
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
                        name={`detailsData.${index}.totalAmount`}
                        placeholder="Amount"
                        value={detail.totalAmount}
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
                            `detailsData.${index}.totalAmount`,
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

export default InsertGRNDetailsInfo;
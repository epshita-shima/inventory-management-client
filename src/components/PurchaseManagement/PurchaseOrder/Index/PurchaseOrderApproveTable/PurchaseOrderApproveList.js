/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useMemo, useState } from "react";
import { useDeletePurchaseOrderInformationMutation } from "../../../../../redux/features/purchaseorderinformation/purchaseOrderInfoApi";
import DataTable from "react-data-table-component";

import FilterComponent from "../../../../Common/ListDataSearchBoxDesign/FilterComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import { useGetAllSupplierInformationQuery } from "../../../../../redux/features/supplierInformation/supplierInfoApi";
import { useGetAllPaymentInformationQuery } from "../../../../../redux/features/paymnetinformation/paymentInfoApi";

const PurchaseOrderApproveList = ({ permission, purchaseFilterApproveAllData }) => {
  const [purchaseInCash, setPurchaseInCash] = useState([]);
  const [purchaseInLCAtSight, setPurchaseInInLCAtSight] = useState([]);
  const [purchaseOrderList, setPurchaseOrderList] = useState(true);
  const [purchaseOrderApproveData, setPurchaseOrderApproveData] = useState([]);
  const [purchaseOrderUnApproveData, setPurchaseOrderUnApproveData] = useState(
    []
  );

  const { data: supplierInfo } = useGetAllSupplierInformationQuery(undefined);
  const { data: paymentData } = useGetAllPaymentInformationQuery(undefined);
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [deletePurchaseOrderInfo] = useDeletePurchaseOrderInformationMutation();

  useEffect(() => {
    const matches = purchaseFilterApproveAllData
      ?.map((ref) => {
        return paymentData?.find((payment) => payment._id === ref.paymentId);
      })
      .filter((match) => match !== undefined);

    const categorizedData = matches?.reduce((acc, curr) => {
      if (!acc[curr.paymentType]) {
        acc[curr.paymentType] = [];
      }
      acc[curr.paymentType].push(curr);
      return acc;
    }, {});
    setPurchaseInCash(categorizedData?.cash);
    setPurchaseInInLCAtSight(categorizedData?.lcatsight);

    const approvePurchaseData = purchaseFilterApproveAllData?.filter(
      (x) => x.approveStatus == true
    );

    const unApprovePurchaseData = purchaseFilterApproveAllData?.filter(
      (x) => x.approveStatus == false
    );

    setPurchaseOrderApproveData(approvePurchaseData);
    setPurchaseOrderUnApproveData(unApprovePurchaseData);
  }, [paymentData, purchaseFilterApproveAllData]);

  const columns = [
    {
      name: "Sl.",
      selector: (purchaseFilterApproveAllData, index) => index + 1,
      center: true,
      width: "60px",
    },
    {
      name: "PO Make Date",
      selector: (purchaseFilterApproveAllData) =>
        new Date(purchaseFilterApproveAllData?.makeDate).toLocaleDateString("en-CA"),
      sortable: true,
      center: true,
      filterable: true,
    },
    {
      name: "PO Number",
      selector: (purchaseFilterApproveAllData) => purchaseFilterApproveAllData?.poNo,
      sortable: true,
      center: true,
      filterable: true,
    },

    {
      name: "Supplier Name",
      selector: (purchaseFilterApproveAllData) => {
        const supplierName = supplierInfo?.find(
          (x) => x._id === purchaseFilterApproveAllData?.supplierId
        );
        return supplierName ? supplierName.supplierName : "N/A"; // Assuming 'sizeName' is the field that contains the size name
      },
      sortable: true,
      center: true,
      filterable: true,
    },

    {
      name: "Total Quantity",
      selector: (purchaseFilterApproveAllData) =>
        (purchaseFilterApproveAllData?.grandTotalQuantity).toLocaleString(),
      sortable: true,
      center: true,
      filterable: true,
    },
    {
      name: "Total Amount",
      selector: (purchaseFilterApproveAllData) =>
        (purchaseFilterApproveAllData?.grandTotalAmount).toLocaleString(),
      sortable: true,
      center: true,
      filterable: true,
      width: "180px",
    },

    {
      name: "Action",
      button: true,
      width: "100px",
      grow: 2,
      cell: (purchaseFilterApproveAllData) => (
        <div className="d-flex justify-content-between align-content-center">
          {permission?.isUpdated ? (
            <a
              target="_blank"
              className={` action-icon `}
              data-toggle="tooltip"
              data-placement="bottom"
              title="Update item"
              style={{
                color: `${
                  purchaseFilterApproveAllData?.items?.length == 0
                    ? "gray"
                    : "#2DDC1B"
                } `,
                border: `${
                  purchaseFilterApproveAllData?.items?.length == 0
                    ? "2px solid gray"
                    : "2px solid #2DDC1B"
                }`,
                padding: "3px",
                borderRadius: "5px",
                marginLeft: "10px",
              }}
              onClick={() => {
                console.log(console.log(purchaseFilterApproveAllData?._id));
                window.open(
                  `update-purchaseinfo/${purchaseFilterApproveAllData?._id}`
                );
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
            </a>
          ) : (
            ""
          )}
        </div>
      ),
    },
  ];

  const customStyles = {
    rows: {
      style: {
        textAlign: "center",
      },
    },
    headCells: {
      style: {
        backgroundColor: "#B8FEB3",
        color: "#000",
        fontWeight: "bold",
        textAlign: "center",
        letterSpacing: "0.8px",
      },
    },
    cells: {
      style: {
        borderRight: "1px solid gray",
      },
    },
  };

  const filteredItems = purchaseFilterApproveAllData?.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <div className="d-block d-sm-flex justify-content-center align-items-center ">
        {/* <div>
            <FontAwesomeIcon
              style={{ fontSize: "24px", color: "#2DDC1B", fontWeight: "bold" }}
              icon={faRefresh}
              onClick={() => refetch()}
            ></FontAwesomeIcon>
            &nbsp;
          </div> */}

        <div className="mt-2 mt-sm-0 ms-2 mb-2 mb-sm-0">
          <FilterComponent
            onFilter={(e) => setFilterText(e.target.value)}
            onClear={handleClear}
            filterText={filterText}
          />
        </div>
      </div>
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <div className="row">
      <div className="col userlist-table">
        <div className="shadow-lg ">
          <DataTable
            columns={columns}
            data={filteredItems}
            defaultSortField="name"
            customStyles={customStyles}
            striped
            pagination
            subHeader
            subHeaderComponent={subHeaderComponent}
          />
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderApproveList;

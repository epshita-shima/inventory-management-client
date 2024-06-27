/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useMemo, useState } from "react";
import { useGetAllPurchaseOrderInformationQuery } from "../../../../../redux/features/purchaseorderinformation/purchaseOrderInfoApi";
import DataTable from "react-data-table-component";
import ListHeading from "../../../../Common/ListHeading/ListHeading";
import FilterComponent from "../../../../Common/ListDataSearchBoxDesign/FilterComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faRefresh,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
import { useGetAllSupplierInformationQuery } from "../../../../../redux/features/supplierInformation/supplierInfoApi";
import { useGetAllPaymentInformationQuery } from "../../../../../redux/features/paymnetinformation/paymentInfoApi";

const PurchaseOderList = ({ permission }) => {
    const [purchaseInCash,setPurchaseInCash]=useState([])
    const [purchaseInLCAtSight,setPurchaseInInLCAtSight]=useState([])
  const { data: purchaseInfoData,isPurchaseloading, refetch } =
    useGetAllPurchaseOrderInformationQuery(undefined);
  const { data: supplierInfo } = useGetAllSupplierInformationQuery(undefined);
  const {data:paymentData}=useGetAllPaymentInformationQuery(undefined)
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [filterText, setFilterText] = useState("");

  
  useEffect(()=>{
    console.log(JSON.stringify(paymentData))
    const puchaseDataInCash=paymentData?.filter((x1)=>
        purchaseInfoData.some((x2)=>x1._id==x2.paymentId))
    // set(puchaseDataInCash)
    console.log(puchaseDataInCash)
    const matches = purchaseInfoData?.map(ref => {
        return paymentData?.find(payment => payment._id === ref.paymentId);
      }).filter(match => match !== undefined);
  
      const categorizedData = matches?.reduce((acc, curr) => {
        if (!acc[curr.paymentType]) {
          acc[curr.paymentType] = [];
        }
        acc[curr.paymentType].push(curr);
        return acc;
      }, {});
  setPurchaseInCash(categorizedData?.cash)
  setPurchaseInInLCAtSight(categorizedData?.lcatsight)
  },[paymentData, purchaseInfoData])
  const columns = [
    {
      name: "Sl.",
      selector: (purchaseInfoData, index) => index + 1,
      center: true,
      width: "60px",
    },
    {
      name: "PO Makedate",
      selector: (purchaseInfoData) =>
        new Date(purchaseInfoData?.makeDate).toLocaleDateString("en-CA"),
      sortable: true,
      center: true,
      filterable: true,
      width: "180px",
    },
    {
      name: "PO Number",
      selector: (purchaseInfoData) => purchaseInfoData?.poNo,
      sortable: true,
      center: true,
      filterable: true,
      width: "260px",
    },
    {
      name: "Supplier Name",
      selector: (purchaseInfoData) => {
        const supplierName = supplierInfo?.find(
          (x) => x._id === purchaseInfoData?.supplierId
        );
        return supplierName ? supplierName.supplierName : "N/A"; // Assuming 'sizeName' is the field that contains the size name
      },
      sortable: true,
      center: true,
      filterable: true,
    },

    {
      name: "Total Quantity",
      selector: (purchaseInfoData) => purchaseInfoData?.grandTotalQuantity,
      sortable: true,
      center: true,
      filterable: true,
    },
    {
      name: "Total Amount",
      selector: (purchaseInfoData) => purchaseInfoData?.grandTotalAmount,
      sortable: true,
      center: true,
      filterable: true,
    },
    // {
    //   name: "Status",
    //   button: true,
    //   width: "200px",
    //   grow: 2,
    //   cell: (purchaseInfoData) => (
    //     <div className="d-flex justify-content-between align-content-center">
    //       <a
    //         target="_blank"
    //         className="action-icon"
    //         style={{
    //           textDecoration: "none",
    //           color: "#000",
    //           fontSize: "14px",
    //           textAlign: "center",
    //         }}
    //         // href={`UpdateGroupName/${data?.GroupId}`}
    //       >
    //         {purchaseInfoData?.itemStatus == true ? <p className="text-success fw-bold">Active</p> : <p className="text-danger fw-bold">InActive</p>}
    //       </a>
    //     </div>
    //   ),
    // },
    {
      name: "Action",
      button: true,
      width: "200px",
      grow: 2,
      cell: (purchaseInfoData) => (
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
                  purchaseInfoData?.items?.length == 0 ? "gray" : "#2DDC1B"
                } `,
                border: `${
                  purchaseInfoData?.items?.length == 0
                    ? "2px solid gray"
                    : "2px solid #2DDC1B"
                }`,
                padding: "3px",
                borderRadius: "5px",
                marginLeft: "10px",
              }}
              onClick={() => {
                window.open(
                  `update-items-raw-material/${purchaseInfoData?._id}`
                );
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
            </a>
          ) : (
            ""
          )}

          {permission?.isRemoved ? (
            <a
              target="_blank"
              className="action-icon "
              data-toggle="tooltip"
              data-placement="bottom"
              title="Delete Item"
              style={{
                color: "red",
                border: "2px solid red",
                padding: "3px",
                borderRadius: "5px",
                marginLeft: "10px",
              }}
              onClick={() => {
                swal({
                  title: "Are you sure to delete this item?",
                  text: "If once deleted, this item will not recovery.",
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                }).then(async (willDelete) => {
                  //   if (willDelete) {
                  //     const response = await deleteRMItemInfo(
                  //       purchaseInfoData?._id
                  //     ).unwrap();
                  //     console.log(response);
                  //     if (response.status === 200) {
                  //       swal("Deleted!", "Your selected item has been deleted!", {
                  //         icon: "success",
                  //       });
                  //     } else {
                  //       swal(
                  //         "Error",
                  //         "An error occurred while creating the data",
                  //         "error"
                  //       );
                  //     }
                  //   } else {
                  //     swal(" Cancel! Your selected item is safe!");
                  //   }
                });
              }}
            >
              <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
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

  const filteredItems = purchaseInfoData?.filter(
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
        <div>
          <FontAwesomeIcon
            style={{ fontSize: "24px", color: "#2DDC1B", fontWeight: "bold" }}
            icon={faRefresh}
            onClick={() => refetch()}
          ></FontAwesomeIcon>
          &nbsp;
        </div>

        <div className="mt-2 mt-sm-0 ms-2 mb-2 mb-sm-0">
          <FilterComponent
            onFilter={(e) => setFilterText(e.target.value)}
            onClear={handleClear}
            filterText={filterText}
          />
        </div>
      </div>
    );
  }, [filterText, resetPaginationToggle, refetch]);
  if (isPurchaseloading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <button
          class="btn"
          style={{ backgroundColor: "#2DDC1B", color: "white" }}
          type="button"
          disabled
        >
          <span
            class="spinner-grow spinner-grow-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Loading...
        </button>
      </div>
    );
  }
  return (
    <div className="row px-5 mx-4">
      <ListHeading
      purchaseInCash={purchaseInCash}
      purchaseInLCAtSight={purchaseInLCAtSight}
      purchaseInfoData={purchaseInfoData}
      ></ListHeading>
      <div
        className="col userlist-table mt-4"
        style={{
          overflow: "scroll",
          height: "420px",
        }}
      >
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

export default PurchaseOderList;

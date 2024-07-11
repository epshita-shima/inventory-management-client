/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useMemo, useState } from "react";
import {
  useDeleteGRNInformationMutation,
  useGetAllGRNInformationQuery,
} from "../../../../redux/features/goodsreceivenoteinfo/grninfoApi";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from "sweetalert";
import {
  faDownload,
  faPenToSquare,
  faRefresh,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { useGetAllSupplierInformationQuery } from "../../../../redux/features/supplierInformation/supplierInfoApi";
import FilterComponent from "../../../Common/ListDataSearchBoxDesign/FilterComponent";
import { downloadPDF } from "../../../ReportProperties/HeaderFooter";
import { useGetCompanyInfoQuery } from "../../../../redux/features/companyinfo/compayApi";
import styles from "./GRNInfoList.css";
import { useGetAllPurchaseOrderInformationQuery } from "../../../../redux/features/purchaseorderinformation/purchaseOrderInfoApi";
import { downloadGRNPDF } from "../../../ReportProperties/handleGRNReport";

const GRNInfoList = ({ permission }) => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const {
    data: grnAllInformation,
    isLoading: isGRNLoading,
    refetch,
  } = useGetAllGRNInformationQuery(undefined);
  const { data: supplierInfo } = useGetAllSupplierInformationQuery(undefined);
  const { data: companyinfo } = useGetCompanyInfoQuery(undefined);
  const { data: purchaseInfoData } =
    useGetAllPurchaseOrderInformationQuery(undefined);
  const [deleteGRNInfo] = useDeleteGRNInformationMutation();
  const [selectSupplierPoNo, setSelectSupplierPoNo] = useState("");
  const [isTableDispaly, setIsTableDisplay] = useState(false);
  const [fromDate, setFromDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );
  const [toDate, setToDate] = useState(new Date().toLocaleDateString("en-CA"));
  const [pOOptionsData, setPOOptionsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isFetchAfterDeleteData, setIsFetchAfterDeleteData] = useState(false);
  const reportTitle = "GOODS RECEIPT REPORT";

  useEffect(() => {
    const createPODropdown = (options) => {
      let result = [];
      options?.forEach((option) => {
        result.push({
          value: option.poNo,
          label: option.poNo,
        });
      });
      return result;
    };
    const poOptions = createPODropdown(purchaseInfoData);
    setPOOptionsData(poOptions);
  }, [purchaseInfoData]);

  const temp_data=[
    {
      "receivedDate": "2023-01-01",
      "supplierName": "Supplier A",
      "pONo": "PO12345",
      "itemName": "Item 1",
      "GRNNo": "GRN123",
      "ChallanNo": "CH123",
      "receivedQty": 10,
      "Rate": 50,
      "Amount": 500
    },
    {
      "receivedDate": "2023-01-02",
      "supplierName": "Supplier B",
      "pONo": "PO12346",
      "itemName": "Item 2",
      "GRNNo": "GRN124",
      "ChallanNo": "CH124",
      "receivedQty": 20,
      "Rate": 60,
      "Amount": 1200
    },
    {
      "receivedDate": "2023-01-03",
      "supplierName": "Supplier C",
      "pONo": "PO12347",
      "itemName": "Item 3",
      "GRNNo": "GRN125",
      "ChallanNo": "CH125",
      "receivedQty": 30,
      "Rate": 70,
      "Amount": 2100
    },
    {
      "receivedDate": "2023-01-04",
      "supplierName": "Supplier D",
      "pONo": "PO12348",
      "itemName": "Item 4",
      "GRNNo": "GRN126",
      "ChallanNo": "CH126",
      "receivedQty": 40,
      "Rate": 80,
      "Amount": 3200
    },
    {
      "receivedDate": "2023-01-05",
      "supplierName": "Supplier E",
      "pONo": "PO12349",
      "itemName": "Item 5",
      "GRNNo": "GRN127",
      "ChallanNo": "CH127",
      "receivedQty": 50,
      "Rate": 90,
      "Amount": 4500
    },
    {
      "receivedDate": "2023-01-06",
      "supplierName": "Supplier F",
      "pONo": "PO12350",
      "itemName": "Item 6",
      "GRNNo": "GRN128",
      "ChallanNo": "CH128",
      "receivedQty": 60,
      "Rate": 100,
      "Amount": 6000
    },
    {
      "receivedDate": "2023-01-07",
      "supplierName": "Supplier G",
      "pONo": "PO12351",
      "itemName": "Item 7",
      "GRNNo": "GRN129",
      "ChallanNo": "CH129",
      "receivedQty": 70,
      "Rate": 110,
      "Amount": 7700
    },
    {
      "receivedDate": "2023-01-08",
      "supplierName": "Supplier H",
      "pONo": "PO12352",
      "itemName": "Item 8",
      "GRNNo": "GRN130",
      "ChallanNo": "CH130",
      "receivedQty": 80,
      "Rate": 120,
      "Amount": 9600
    },
    {
      "receivedDate": "2023-01-09",
      "supplierName": "Supplier I",
      "pONo": "PO12353",
      "itemName": "Item 9",
      "GRNNo": "GRN131",
      "ChallanNo": "CH131",
      "receivedQty": 90,
      "Rate": 130,
      "Amount": 11700
    },
    {
      "receivedDate": "2023-01-10",
      "supplierName": "Supplier J",
      "pONo": "PO12354",
      "itemName": "Item 10",
      "GRNNo": "GRN132",
      "ChallanNo": "CH132",
      "receivedQty": 100,
      "Rate": 140,
      "Amount": 14000
    },
    {
      "receivedDate": "2023-01-11",
      "supplierName": "Supplier K",
      "pONo": "PO12355",
      "itemName": "Item 11",
      "GRNNo": "GRN133",
      "ChallanNo": "CH133",
      "receivedQty": 110,
      "Rate": 150,
      "Amount": 16500
    },
    {
      "receivedDate": "2023-01-12",
      "supplierName": "Supplier L",
      "pONo": "PO12356",
      "itemName": "Item 12",
      "GRNNo": "GRN134",
      "ChallanNo": "CH134",
      "receivedQty": 120,
      "Rate": 160,
      "Amount": 19200
    },
    {
      "receivedDate": "2023-01-13",
      "supplierName": "Supplier M",
      "pONo": "PO12357",
      "itemName": "Item 13",
      "GRNNo": "GRN135",
      "ChallanNo": "CH135",
      "receivedQty": 130,
      "Rate": 170,
      "Amount": 22100
    },
    {
      "receivedDate": "2023-01-14",
      "supplierName": "Supplier N",
      "pONo": "PO12358",
      "itemName": "Item 14",
      "GRNNo": "GRN136",
      "ChallanNo": "CH136",
      "receivedQty": 140,
      "Rate": 180,
      "Amount": 25200
    },
    {
      "receivedDate": "2023-01-15",
      "supplierName": "Supplier O",
      "pONo": "PO12359",
      "itemName": "Item 15",
      "GRNNo": "GRN137",
      "ChallanNo": "CH137",
      "receivedQty": 150,
      "Rate": 190,
      "Amount": 28500
    },
    {
      "receivedDate": "2023-01-16",
      "supplierName": "Supplier P",
      "pONo": "PO12360",
      "itemName": "Item 16",
      "GRNNo": "GRN138",
      "ChallanNo": "CH138",
      "receivedQty": 160,
      "Rate": 200,
      "Amount": 32000
    },
    {
      "receivedDate": "2023-01-17",
      "supplierName": "Supplier Q",
      "pONo": "PO12361",
      "itemName": "Item 17",
      "GRNNo": "GRN139",
      "ChallanNo": "CH139",
      "receivedQty": 170,
      "Rate": 210,
      "Amount": 35700
    },
    {
      "receivedDate": "2023-01-18",
      "supplierName": "Supplier R",
      "pONo": "PO12362",
      "itemName": "Item 18",
      "GRNNo": "GRN140",
      "ChallanNo": "CH140",
      "receivedQty": 180,
      "Rate": 220,
      "Amount": 39600
    },
    {
      "receivedDate": "2023-01-19",
      "supplierName": "Supplier S",
      "pONo": "PO12363",
      "itemName": "Item 19",
      "GRNNo": "GRN141",
      "ChallanNo": "CH141",
      "receivedQty": 190,
      "Rate": 230,
      "Amount": 43700
    },
    {
      "receivedDate": "2023-01-20",
      "supplierName": "Supplier T",
      "pONo": "PO12364",
      "itemName": "Item 20",
      "GRNNo": "GRN142",
      "ChallanNo": "CH142",
      "receivedQty": 200,
      "Rate": 240,
      "Amount": 48000
    },
    {
      "receivedDate": "2023-01-21",
      "supplierName": "Supplier U",
      "pONo": "PO12365",
      "itemName": "Item 21",
      "GRNNo": "GRN143",
      "ChallanNo": "CH143",
      "receivedQty": 210,
      "Rate": 250,
      "Amount": 52500
    },
    {
      "receivedDate": "2023-01-22",
      "supplierName": "Supplier V",
      "pONo": "PO12366",
      "itemName": "Item 22",
      "GRNNo": "GRN144",
      "ChallanNo": "CH144",
      "receivedQty": 220,
      "Rate": 260,
      "Amount": 57200
    },
    {
      "receivedDate": "2023-01-23",
      "supplierName": "Supplier W",
      "pONo": "PO12367",
      "itemName": "Item 23",
      "GRNNo": "GRN145",
      "ChallanNo": "CH145",
      "receivedQty": 230,
      "Rate": 270,
      "Amount": 62100
    },
   
  ]
  
  useEffect(() => {
    if (isFetchAfterDeleteData) {
      // setFilteredData(grnAllInformation);
      handleFilter();
      setIsFetchAfterDeleteData(false);
    }
  }, [isFetchAfterDeleteData, grnAllInformation]);

  console.log(filteredData);

  const columns = [
    {
      name: "Sl.",
      selector: (filteredData, index) => index + 1,
      center: true,
      width: "50px",
    },
    {
      name: "Receive Date",
      selector: (filteredData) => filteredData?.receiveDate,
      sortable: true,
      center: true,
      filterable: true,
    },
    {
      name: "GRNNo",
      selector: (filteredData) => filteredData?.grnSerialNo,
      sortable: true,
      center: true,
      filterable: true,
    },
    {
      name: "ChallanNo",
      selector: (filteredData) => filteredData?.challanNo,
      sortable: true,
      center: true,
      filterable: true,
    },
    {
      name: "supplierName",
      selector: (filteredData) => {
        const supplier = supplierInfo?.find(
          (x) => x._id === filteredData?.supplierId
        );
        return supplier ? supplier.supplierName : "N/A";
      },
      sortable: true,
      center: true,
      filterable: true,
      width: "180px",
    },

    {
      name: "Supplier PO Number",
      selector: (filteredData) => filteredData?.supplierPoNo,
      sortable: true,
      center: true,
      filterable: true,
      width: "240px",
    },
    {
      name: "Total Received Quantity",
      selector: (filteredData) => filteredData?.grandTotalReceivedQuantity,
      sortable: true,
      center: true,
      filterable: true,
      width: "210px",
    },

    {
      name: "Action",
      button: true,
      width: "120px",
      grow: 2,
      cell: (filteredData) => (
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
                  filteredData?.items?.length === 0 ? "gray" : "#2DDC1B"
                } `,
                border: `${
                  filteredData?.items?.length === 0
                    ? "2px solid gray"
                    : "2px solid #2DDC1B"
                }`,
                padding: "3px",
                borderRadius: "5px",
                marginLeft: "10px",
              }}
              onClick={() => {
                //already posted in accounting system
                if (filteredData.isAccountPostingStatus === true) {
                  swal(
                    "Can not Update!",
                    "Because already posted in accounting system",
                    "error"
                  );
                } else {
                  window.open(`update-grn-info/${filteredData?._id}`);
                }
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
                if (filteredData.isAccountPostingStatus === true) {
                  swal(
                    "Can not Update!",
                    "Because already posted in accounting system",
                    "error"
                  );
                }else{
                  swal({
                    title: "Are you sure to delete this item?",
                    text: "If once deleted, this item will not recovery.",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  }).then(async (willDelete) => {
                    if (willDelete) {
                      const response = await deleteGRNInfo(
                        filteredData?._id
                      ).unwrap();
                      console.log(response);
                      if (response.status === 200) {
                        swal("Deleted!", "Your selected item has been deleted!", {
                          icon: "success",
                        });
                        await refetch();
  
                        setIsFetchAfterDeleteData(true);
                      } else {
                        swal(
                          "Error",
                          "An error occurred while creating the data",
                          "error"
                        );
                      }
                    } else {
                      swal(" Cancel! Your selected item is safe!");
                    }
                  });
                }
                
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

  const filteredItems = filteredData?.filter(
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
      <div className="d-block d-sm-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-end align-items-center">
          <div className="table-head-icon d-flex">
            <div class="dropdown">
              <button
                class="btn btn-download dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <a
                    class="dropdown-item"
                    href="#"
                    onClick={() => {
                      console.log(filteredData,companyinfo)
                      if (companyinfo?.length !== 0 || undefined) {
                        downloadGRNPDF(temp_data,supplierInfo,{ companyinfo }, reportTitle);
                      }
                    }}
                  >
                    PDF
                  </a>
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    href="#"
                    onClick={() => {
                      //   handleDownload(
                      //     extractedAllData,
                      //     companyinfo,
                      //     reportTitle
                      //   );
                    }}
                  >
                    Excel
                  </a>
                </li>
              </ul>
            </div>
          </div>
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
  }, [filterText, resetPaginationToggle, companyinfo, reportTitle]);

  const handleFilter = async () => {
    if (isGRNLoading) {
      console.log("loading");
    } else {
      let filtered = grnAllInformation;
      if (fromDate && toDate && selectSupplierPoNo !== "") {
        filtered = await grnAllInformation.filter((item) => {
          const itemDate = new Date(item.receiveDate);
          const isDateInRange =
            itemDate >= new Date(fromDate) && itemDate <= new Date(toDate);
          const isPonumberMatch = item.supplierPoNo === selectSupplierPoNo;
          return isDateInRange && isPonumberMatch;
        });
      } else if (fromDate && toDate) {
        filtered = await grnAllInformation?.filter((item) => {
          const itemDate = new Date(item.receiveDate);
          return itemDate >= new Date(fromDate) && itemDate <= new Date(toDate);
        });
      } else if (selectSupplierPoNo) {
        filtered = await grnAllInformation.filter(
          (item) => item.supplierPoNo === selectSupplierPoNo
        );
      }

      setFilteredData(filtered);
      if (filtered?.length !== 0) {
        setIsTableDisplay(true);
      } else {
        setIsTableDisplay(false);
        swal({
          title: "Sorry!",
          text: "No Data Available.",
          icon: "warning",
          button: "OK",
        });
      }
      // setFilteredData(filtered);
      refetch();
    }
  };

  return (
    <div className="row px-5 mx-4 ">
      <div
        className="col userlist-table mt-4"
        style={{
          overflow: "scroll",
          height: "480px",
        }}
      >
        <div>
          <h3 className="fw-bold mt-2">Goods Receive Note (GRN) List</h3>
          <hr />
          <div className="d-flex justify-content-between align-items-center w-75">
            <div className="w-25">
              <label htmlFor="">From Date</label>
              <br />
              <DatePicker
                dateFormat="y-MM-dd"
                className="text-center custom-datepicker2 "
                calendarClassName="custom-calendar2"
                selected={fromDate}
                required
                onChange={(fromDate) => {
                  console.log(fromDate);
                  if (fromDate > new Date()) {
                    swal({
                      title: "Select Valid Date",
                      text: "Date should be equal or earlier than today",
                      icon: "warning",
                      button: "OK",
                    });
                  } else {
                    setFromDate(fromDate?.toLocaleDateString("en-CA"));
                  }
                }}
              />
            </div>
            <div className="w-25">
              <label htmlFor="">To Date</label>
              <br />
              <DatePicker
                dateFormat="y-MM-dd"
                className="text-center custom-datepicker2 "
                calendarClassName="custom-calendar2"
                selected={toDate}
                required
                onChange={(toDate) => {
                  console.log(toDate);
                  if (toDate > new Date()) {
                    swal({
                      title: "Select Valid Date",
                      text: "Date should be equal or earlier than today",
                      icon: "warning",
                      button: "OK",
                    });
                  } else {
                    setToDate(toDate?.toLocaleDateString("en-CA"));
                  }
                }}
              />
            </div>
            <div style={{ width: "35%" }}>
              <div className="w-100">
                <label htmlFor="">Supplier PONo</label>
                <br />
                <div className="w-100">
                  <Select
                    class="form-select"
                    className="w-100"
                    aria-label="Default select example"
                    name="poinfo"
                    options={pOOptionsData}
                    defaultValue={{
                      label: "Select Supplier PONo",
                      value: 0,
                    }}
                    value={pOOptionsData.filter(function (option) {
                      return option.value === selectSupplierPoNo;
                    })}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        width: "100%",
                        borderColor: state.isFocused ? "#fff" : "#fff",
                        border: "1px solid #2DDC1B",
                      }),
                      menu: (provided) => ({
                        ...provided,
                        zIndex: 9999,
                        height: "auto",
                        // overflowY: "scroll",
                      }),
                    }}
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary25: "#B8FEB3",
                        primary: "#2DDC1B",
                      },
                    })}
                    onChange={(e) => {
                      setSelectSupplierPoNo(e.value);
                    }}
                  ></Select>
                </div>
              </div>
            </div>
            <div>
              <button
                className="border-0 "
                style={{
                  backgroundColor: "#2DDC1B",
                  color: "white",
                  padding: "5px 10px",
                  fontSize: "14px",
                  borderRadius: "5px",
                  width: "100px",
                  height: "38px",
                  marginLeft: "10px",
                  marginTop: "25px",
                }}
                onClick={handleFilter}
              >
                Show
              </button>
            </div>
            <div>
              <button
                className="border-0 "
                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "5px 10px",
                  fontSize: "14px",
                  borderRadius: "5px",
                  width: "100px",
                  height: "38px",
                  marginLeft: "10px",
                  marginTop: "25px",
                }}
                onClick={() => {
                  setFromDate(new Date()?.toLocaleDateString("en-CA"));
                  setToDate(new Date()?.toLocaleDateString("en-CA"));
                  setSelectSupplierPoNo("");
                  setIsTableDisplay(false);
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {isTableDispaly ? (
          <div className=" ">
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
        ) : null}
      </div>
    </div>
  );
};

export default GRNInfoList;

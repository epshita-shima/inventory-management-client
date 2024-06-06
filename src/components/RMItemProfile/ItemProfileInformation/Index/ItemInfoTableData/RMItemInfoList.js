/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import React, { useState ,useEffect,useMemo} from 'react'
import { useGetAllCategoryInfoQuery } from '../../../../../redux/features/categoryInfo/categoryInfoApi';
import { useGetAllItemUnitQuery } from '../../../../../redux/features/itemUnitInfo/itemUnitInfoApi';
import { useGetCompanyInfoQuery } from '../../../../../redux/features/companyinfo/compayApi';
import ListHeading from '../../../../Common/ListHeading/ListHeading';
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FilterComponent from './FilterComponent';
import { faDownload, faPenToSquare, faRefresh, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useGetAllRMItemInformationQuery } from '../../../../../redux/features/iteminformation/rmItemInfoApi';

const RMItemInfoList = ({permission}) => {
    const { data: categoryInfoData } = useGetAllCategoryInfoQuery(undefined);
    const { data: itemUnitInfo } = useGetAllItemUnitQuery(undefined);
    const { data: companyinfo } = useGetCompanyInfoQuery(undefined);
    const { data: rmItemInfoData,isRmItemLoading,refetch} =useGetAllRMItemInformationQuery(undefined)
    const [filterText, setFilterText] = React.useState("");
    const [extractedDataForReport, setExtractedDataForReport] = useState([]);
    const [extractedInActiveDataForReport, setExtractedInActiveDataForReport] = useState([]);
    const [resetPaginationToggle, setResetPaginationToggle] =React.useState(false);
    // const [deleteItemInfo] = useDeleteItemInfoMutation();
    const[rmItemActiveStatus,setItemActiveStaus]=useState([])
    const[rmItemInActiveStatus,setItemInActiveStatus]=useState([])
    var reportTitle = "All Active Item List";

    console.log(categoryInfoData)
    
    useEffect(() => {
      const rmItemActiveStatus = rmItemInfoData?.filter((item) => item.itemStatus==true);
      const rmItemInActiveStatus = rmItemInfoData?.filter((item) => item.itemStatus == false);
      console.log(rmItemActiveStatus)
      console.log(rmItemInActiveStatus)
      const extractedFields = rmItemActiveStatus?.map((item) => {
        const category = categoryInfoData?.find((x) => x._id === item.categoryId);
        const unit = itemUnitInfo?.find((x) => x._id === item?.unitId);
        console.log(category)
        return{
          openingDate:item.openingDate,
          itemName: item.itemName,
          categoryId: category ? category.categoryInfo : "N/A",
          unitId: unit ? unit.unitInfo : "N/A",
          openingStock:item.openingStock
        }
      });
  
      const extractedInactiveFields = rmItemInActiveStatus?.map((item) => {
        const category = categoryInfoData?.find((x) => x._id === item.categoryId);
        const unit = itemUnitInfo?.find((x) => x._id === rmItemInfoData?.unitId);
     
        return{
          openingDate:item.openingDate,
          itemName: item.itemName,
          categoryId: category ? category.categoryInfo : "N/A",
          unitId: unit ? unit.unitInfo : "N/A",
          openingStock:item.OpeningStock
        }
      });
      setItemActiveStaus(rmItemActiveStatus)
      setItemInActiveStatus(rmItemInActiveStatus)
      setExtractedDataForReport(extractedFields);
      setExtractedInActiveDataForReport(extractedInactiveFields);
    }, [itemUnitInfo,rmItemInfoData?.unitId,categoryInfoData,rmItemInfoData]);
  
  
    const columns = [
      {
        name: "Sl.",
        selector: (rmItemInfoData, index) => index + 1,
        center: true,
        width: "60px",
      },
      {
        name: "Opening Date",
        selector: (rmItemInfoData) => rmItemInfoData?.openingDate,
        sortable: true,
        center: true,
        filterable: true,
      },
      {
        name: "Item Name",
        selector: (rmItemInfoData) => rmItemInfoData?.itemName,
        sortable: true,
        center: true,
        filterable: true,
      },
      {
        name: "Item Category",
        selector: (rmItemInfoData) => {
          const category = categoryInfoData?.find((x) => x._id === rmItemInfoData?.categoryId);
          console.log(category)
          return category ? category.categoryInfo : "N/A"; // Assuming 'sizeName' is the field that contains the size name
        },
        sortable: true,
        center: true,
        filterable: true,
      },
      {
        name: "Item Unit",
        selector: (rmItemInfoData) => {
          const unit = itemUnitInfo?.find((x) => x._id === rmItemInfoData?.unitId);
          return unit ? unit.unitInfo : "N/A"; // Assuming 'sizeName' is the field that contains the size name
        },
        sortable: true,
        center: true,
        filterable: true,
      },
      {
        name: "Opening Stock",
        selector: (rmItemInfoData) => rmItemInfoData?.openingStock,
        sortable: true,
        center: true,
        filterable: true,
      },
      {
        name: "Action",
        button: true,
        width: "200px",
        grow: 2,
        cell: (rmItemInfoData) => (
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
                    rmItemInfoData?.items?.length == 0 ? "gray" : "#2DDC1B"
                  } `,
                  border: `${
                    rmItemInfoData?.items?.length == 0
                      ? "2px solid gray"
                      : "2px solid #2DDC1B"
                  }`,
                  padding: "3px",
                  borderRadius: "5px",
                  marginLeft: "10px",
                }}
                onClick={() => {
                  window.open(`update-items-rm/${rmItemInfoData?._id}`);
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
                    if (willDelete) {
                      const response = await deleteItemInfo(
                        rmItemInfoData?._id
                      ).unwrap();
                      console.log(response);
                      if (response.status === 200) {
                        swal("Deleted!", "Your selected item has been deleted!", {
                          icon: "success",
                        });
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
  
    const filteredItems = rmItemInfoData?.filter(
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
        
          <div className="d-flex justify-content-end align-items-center">
            <div className="table-head-icon d-flex ">
              <div>
                <FontAwesomeIcon icon={faRefresh} onClick={()=>refetch()}></FontAwesomeIcon> &nbsp;
              </div>
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
                        if (companyinfo?.length !== 0 || undefined) {
                          downloadPDF({ companyinfo }, reportTitle);
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
                        handleDownload(extractedDataForReport, companyinfo, reportTitle);
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
    }, [
      filterText,
      resetPaginationToggle,
      companyinfo,
      extractedDataForReport,
      reportTitle,
      refetch
    ]);
  
    return (
      <div className="row px-5 mx-4">
        <ListHeading 
        rmItemInfoData={rmItemInfoData}
        rmItemActiveStatus={rmItemActiveStatus}
        rmItemInActiveStatus={rmItemInActiveStatus}
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
        <table id="my-table" className="d-none">
          <thead>
            <tr>
              <th>Sl.</th>
              <th>Opening Date</th>
              <th>Item Name</th>
              <th>Size Info</th>
              <th>Unit Info</th>
              <th>Opening Stock</th>
            </tr>
          </thead>
          <tbody>
            {extractedDataForReport?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.openingDate}</td>
                <td>{item.itemName}</td>
                <td>{item.sizeId}</td>
                <td>{item.unitId}</td>
                <td>{item.openingStock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default RMItemInfoList

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo } from 'react'

import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import FilterComponent from './FilterComponent';
import { useGetAllItemSizeQuery } from '../../../../../redux/features/itemsizeinfo/itemSizeInfoApi';
import { useGetAllItemUnitQuery } from '../../../../../redux/features/itemUnitInfo/itemUnitInfoApi';

const IteminfoList = ({permission, itemInfoData}) => {
    console.log(permission)
    const {data:itemSizeInfo}=useGetAllItemSizeQuery(undefined)
    const {data:itemUnitInfo}=useGetAllItemUnitQuery(undefined)
    const [filterText, setFilterText] = React.useState("");
    
      const columns = [
        {
          name: "Sl.",
          selector: (itemInfoData, index) => index + 1,
          center: true,
          width: "60px",
        },
        {
          name: "Item Name",
          selector: (itemInfoData) => itemInfoData?.itemName,
          sortable: true,
          center: true,
          filterable: true,
        },
        {
          name: "Item Size",
          selector: (itemInfoData) => {
            const size = itemSizeInfo?.find((x) => x._id === itemInfoData?.sizeId);
            return size ? size.sizeInfo : 'N/A'; // Assuming 'sizeName' is the field that contains the size name
          },
          sortable: true,
          center: true,
          filterable: true,
        },
        {
          name: "Item Unit",
          selector: (itemInfoData) => {
            const size = itemUnitInfo?.find((x) => x._id === itemInfoData?.unitId);
            return size ? size.unitInfo : 'N/A'; // Assuming 'sizeName' is the field that contains the size name
          },
          sortable: true,
          center: true,
          filterable: true,
        },
    
        {
          name: "Action",
          button: true,
          width: "200px",
          grow: 2,
          cell: (itemInfoData) => (
            <div className="d-flex justify-content-between align-content-center">
              {permission?.isUpdated ? (
                <a
                  target="_blank"
                  className={` action-icon `}
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Update item"
                
                  style={{
                    color: `${itemInfoData?.items?.length==0 ? 'gray' : '#2DDC1B'} `,
                    border:`${itemInfoData?.items?.length==0 ? '2px solid gray' : '2px solid #2DDC1B'}`,
                    padding: "3px",
                    borderRadius: "5px",
                    marginLeft: "10px",
                  }}
                  onClick={() => {
                    window.open(`update-items/${itemInfoData?._id}`);
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
                  title="Delete user"
                  style={{
                    color: "red",
                    border: "2px solid red",
                    padding: "3px",
                    borderRadius: "5px",
                    marginLeft: "10px",
                  }}
                  onClick={() => {
                    console.log(itemInfoData?.value)
                    swal({
                      title: "Are you sure?",
                      text: "Once deleted, you will not be able to recover this data!",
                      icon: "warning",
                      buttons: true,
                      dangerMode: true,
                    }).then((willDelete) => {
                      if (willDelete) {
                        // deleteMenu(itemInfoData?.value);
                        swal("Poof! Your data has been deleted!", {
                          icon: "success",
                        });
                      } else {
                        swal("Your data is safe!");
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
     
      const [resetPaginationToggle, setResetPaginationToggle] =
        React.useState(false);
      const filteredItems = itemInfoData?.filter(
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
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="d-flex justify-content-between align-items-center w-25">
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  letterSpacing: "0.8px",
                }}
              >
                Menu list
              </h2>
            </div>
            <FilterComponent
              onFilter={(e) => setFilterText(e.target.value)}
              onClear={handleClear}
              filterText={filterText}
            />
          </div>
        );
      }, [filterText, resetPaginationToggle]);
    
      return (
          <div className="row p-5 mx-4">
            <div
              className="col userlist-table"
              style={{
                overflow: "scroll",
                height: "450px",
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
}

export default IteminfoList

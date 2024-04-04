/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo } from 'react'
import { useGetAllMenuItemsQuery } from '../../../redux/features/menus/menuApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import swal from 'sweetalert'
import { useGetAllUserQuery } from '../../../redux/features/user/userApi'
import FilterComponent from './FilterComponent';
import DataTable from "react-data-table-component";

const MenuList = () => {
    const {data:menuItems}=useGetAllMenuItemsQuery(undefined)
    const { data: user } = useGetAllUserQuery(undefined);
    const getUserId = localStorage.getItem("user");
  const userSingleId = JSON.parse(getUserId);
  const userIdFromSession = userSingleId[0]?._id;
  const permidionData = user?.filter((user) => user._id == userIdFromSession);
  const extractUserListForCurrentUser = (userData, userId) => {
    let userList = null;

    // Find the user object matching the provided userId
    const currentUser = userData?.find((user) => user._id === userId);

    if (currentUser) {
      // Loop through the menus of the current user
      currentUser?.menulist?.forEach((menu) => {
        menu?.items?.forEach((subMenu) => {
          // Check if the subMenu is the "User Profile" menu
          if (subMenu?.label === "User Profile") {
            // Find the "User List" sub-item
            const userListSubMenu = subMenu?.items.find(
              (subItem) => subItem?.label === "User List"
            );
            if (userListSubMenu) {
              // Set the user list property
              userList = userListSubMenu;
            }
          }
        });
      });
    }

    return userList;
  };

  // Call the function to get the user list for the current user
  const permission = extractUserListForCurrentUser(
    permidionData,
    userIdFromSession
  );
    const flattenOptions = (options) => {
        const flattenRecursive = (options, parentLabel) => {
          let result = [];
          options?.forEach((option) => {
            result.push({
              value: option._id,
              label: parentLabel ? `${option.label}` : option.label,
            });
            if (option.items && option.items.length > 0) {
              result = result.concat(flattenRecursive(option.items, option.label));
            }
          });
          return result;
        };
        return flattenRecursive(options);
      };
   
      const flattenedOptions = flattenOptions(menuItems);
      console.log(flattenedOptions)
      const columns = [
        {
          name: "Sl.",
          selector: (flattenedOptions, index) => index + 1,
          center: true,
          width: "60px",
        },
        {
          name: "Menu Name",
          selector: (flattenedOptions) => flattenedOptions?.label,
          sortable: true,
          center: true,
          filterable: true,
        },  
    
        {
          name: "Action",
          button: true,
          width: "200px",
          grow: 2,
          cell: (flattenedOptions) => (
            <div className="d-flex justify-content-between align-content-center">
              {permission?.update ? (
                <a
                  target="_blank"
                  className="action-icon"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Update user"
                  style={{
                    color: "#56CCAD",
                    border: "2px solid #56CCAD",
                    padding: "3px",
                    borderRadius: "5px",
                    marginLeft: "10px",
                  }}
                  onClick={() => {
                    window.open(`user-update/${flattenedOptions?._id}`);
                    // handleActiveStatus(activeUser?._id);
                  }}
                >
                  <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                </a>
              ) : (
                ""
              )}
    
              {permission?.delete ? (
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
                    swal({
                      title: "Are you sure?",
                      text: "Once deleted, you will not be able to recover this data!",
                      icon: "warning",
                      buttons: true,
                      dangerMode: true,
                    }).then((willDelete) => {
                      if (willDelete) {
                        // deleteUser(activeUser?._id);
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
            backgroundColor: "#CBF3F0",
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
      const [filterText, setFilterText] = React.useState("");
      const [resetPaginationToggle, setResetPaginationToggle] =
        React.useState(false);
      const filteredItems = flattenedOptions?.filter(
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
            <div className="d-block">
           
             <FilterComponent
                onFilter={(e) => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
              />
           
            </div>
          );
        }, [
          filterText,
          resetPaginationToggle,
      
        ]);
  return (
  
    <div class="row d-flex justify-content-center align-items-center">
      <div
        className="col-10 userlist-table"
        style={{
          overflow: "scroll",
          height: "480px",
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

  )
}

export default MenuList

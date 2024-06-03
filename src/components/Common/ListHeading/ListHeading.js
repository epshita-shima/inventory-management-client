import React, { useEffect, useState } from 'react'
import { useGetAllMenuItemsQuery } from '../../../redux/features/menus/menuApi'

const ListHeading = ({user,setActiveUserModal,activeUser,setInActiveUserModal,inActiveUser,itemInfoData,
  itemActiveStatus,
  itemInActiveStatus}) => {
    const {data:menuListData}=useGetAllMenuItemsQuery(undefined)
  const [FGItemList,setFGItemList]=useState(false)
  const [menuList,setMenuList]=useState(false)
  const [totalTitle,setTotalTitle]=useState('')
  const [totalActiveTitle,setTotalActiveTitle]=useState('')
  const [totalInActiveTitle,setTotalInActiveTitle]=useState('')
const[grandTotal,setGrandTotal]=useState('')
const[totalActive,setTotalActive]=useState('')
const[totalInActive,setTotalInActive]=useState('')
  
const checkPathname = (data, pathname) => {
  if (data?.url === pathname) {
    return true;
  }

  if (data?.items && data.items.length >0) {
    return data?.items?.some(item => checkPathname(item, pathname));
  }

  return false;
};
const currentUrl = window.location.href;
const pathname = new URL(currentUrl).pathname;
const isPathnameExist = checkPathname(menuListData, pathname);

console.log(`Does the pathname '${pathname}' exist? ${isPathnameExist}`);

  useEffect(()=>{
    if(pathname=='/main-view/item-list-(fg)'){
      setFGItemList(true)
      setTotalTitle('Total Item')
      setTotalActiveTitle('Total Active Item')
      setTotalInActiveTitle('Total InActive Item')
      setGrandTotal(itemInfoData?.length)
      setTotalActive(itemActiveStatus?.length)
      setTotalInActive(itemInActiveStatus?.length)
    }
    if(pathname=='/main-view/user-setting'){
      setTotalTitle('Total User')
      setTotalActiveTitle('Total Active User')
      setTotalInActiveTitle('Total InActive User')
      setGrandTotal(user?.length)
      setTotalActive(activeUser?.length)
      setTotalInActive(inActiveUser?.length)
    }
    if(pathname=='/main-view/menu-list'){
      setMenuList(true)
      setTotalTitle('Total Menu')
      setTotalActiveTitle('Total Active Menu')
      setTotalInActiveTitle('Total InActive Menu')
    }
  },[pathname,itemInfoData,itemActiveStatus,itemInActiveStatus,user,activeUser,inActiveUser])
  return (
    <div>
    <div class="row">
      <div class="col-sm-3">
        <div
          class="cardbox shadow-lg"
          style={{ borderLeft: "12px solid #2DDC1B", borderRadius: "10px" }}
        >
          <div
            class="card-body"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            <p
              class="card-title"
              style={{
                color: "#8091a5",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              {totalTitle}
            </p>
            <h5
              class="card-text"
              style={{ color: "#000", fontSize: "30px", fontWeight: "700" }}
            >
              {grandTotal}
            </h5>
          </div>
        </div>
      </div>
      <div class="col-sm-3 mt-4 mt-sm-0">
        <div
          class="cardbox shadow-lg"
          style={{
            borderLeft: "12px solid  #B8FEB3",
            borderRadius: "10px",
          }}
        >
          <div
            class="card-body"
            data-toggle="modal"
            data-target="#exampleModalCenter"
            onClick={() => {
              
                setActiveUserModal(true);
            
            
            }}
          >
            <p
              class="card-title"
              style={{
                color: "#8091a5",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
             {totalActiveTitle}
            </p>
            <h5
              class="card-text"
              style={{ color: "#000", fontSize: "30px", fontWeight: "700" }}
            >
              {totalActive}
            </h5>
          </div>
        </div>
      </div>
      <div class="col-sm-3 mt-4 mt-sm-0">
        <div
          class="cardbox shadow-lg"
          style={{ borderLeft: "12px solid red", borderRadius: "10px" }}
        >
          <div
            class="card-body"
            data-toggle="modal"
            data-target="#exampleModalCenter"
            onClick={() => {
              setInActiveUserModal(true);
            }}
          >
            <p
              class="card-title"
              style={{
                color: "#8091a5",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
             {totalInActiveTitle}
            </p>
            <h5
              class="card-text"
              style={{ color: "#000", fontSize: "30px", fontWeight: "700" }}
            >
              {totalInActive}
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ListHeading

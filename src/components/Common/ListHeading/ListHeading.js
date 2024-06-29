import React, { useEffect, useMemo, useState } from "react";
import { useGetAllMenuItemsQuery } from "../../../redux/features/menus/menuApi";
import MenuIdCollection from "../MenuIdCollection/MenuIdCollection";

const ListHeading = ({
  user,
  setActiveDataModal,
  activeUser,
  setInActiveDataModal,
  inActiveUser,
  finishGoodInItemInfoData,
  finishGoodActiveStatus,
  finishGoodInActiveStatus,
  rmItemInfoData,
  rmItemActiveStatus,
  rmItemInActiveStatus,
  setActiveRawMeterialItemModal,
  cftInfosData,
  cftInfoActiveStatus,
  cftInfoInActiveStatus,
  supplierInfoData,
  supplierInfoActiveStatus,
  supplierInfoInActiveStatus,
  clientInfoData,
  clientInfoActiveStatus,
  clientInfoInActiveStatus,
  purchaseInfoData,
  purchaseInCash,
  purchaseInLCAtSight
}) => {
  const [totalTitle, setTotalTitle] = useState("");
  const [totalActiveTitle, setTotalActiveTitle] = useState("");
  const [totalInActiveTitle, setTotalInActiveTitle] = useState("");
  const [grandTotal, setGrandTotal] = useState("");
  const [totalActive, setTotalActive] = useState("");
  const [totalInActive, setTotalInActive] = useState("");
  // const [urls, setUrls] = useState([]);
  const currentUrl = window.location.href;
  const pathname = new URL(currentUrl).pathname;
  const getUserFromLocal = localStorage.getItem("user");
  const getUserFromLocalConvert = JSON.parse(getUserFromLocal);
  const getMenuListFromLOcalUser = getUserFromLocalConvert[0]?.menulist;

  const traverse = (items) => {
    const urls = [];
    items.forEach((item) => {
      if (item.url && item.url !== "#") {
        urls.push({
          menuId: item._id,
          headerLabelName: item.label,
          url: item.url,
        });
      }
      if (item.items && item.items.length > 0) {
        // Concatenate the arrays returned by recursive calls
        urls.push(...traverse(item.items));
      }
    });
    return urls; // Return the complete urls array after all iterations are done
  };

  const mainData = traverse(getMenuListFromLOcalUser);

  useEffect(() => {
    const searchItem = mainData?.filter((x) => x.url == pathname);
    const wordsURL = pathname.split("/");
    const repStr = wordsURL[2].replaceAll("-", " ");
    let grandTotal, totalActive, totalInActive;

    if (searchItem) {
      setTotalTitle(`Total ${searchItem[0]?.headerLabelName}`);
      setTotalActiveTitle(`Total Active ${searchItem[0]?.headerLabelName}`);
      setTotalInActiveTitle(`Total InActive ${searchItem[0]?.headerLabelName}`);

      if(searchItem[0]?.menuId == MenuIdCollection.purchaseorderlist){
        setTotalActiveTitle(`Total Purchase Order in Cash`);
      setTotalInActiveTitle(`Total Purchase Order in LC`);
      }
      console.log(searchItem[0]?.menuId == MenuIdCollection.rmItemList);
      if (searchItem[0]?.menuId == MenuIdCollection.fgItemList) {
        console.log("fg");
        grandTotal = finishGoodInItemInfoData?.length;
        totalActive = finishGoodActiveStatus?.length;
        totalInActive = finishGoodInActiveStatus?.length;
      } else if (searchItem[0]?.menuId == MenuIdCollection.userSeting) {
        console.log("fg");
        grandTotal = user?.length;
        totalActive = activeUser?.length;
        totalInActive = inActiveUser?.length;
      } else if (searchItem[0]?.menuId == MenuIdCollection.rmItemList) {
        console.log("rm");
        grandTotal = rmItemInfoData?.length;
        totalActive = rmItemActiveStatus?.length;
        totalInActive = rmItemInActiveStatus?.length;
      } else if (searchItem[0]?.menuId == MenuIdCollection.cftinfolist) {
        console.log("rm");
        grandTotal = cftInfosData?.length;
        totalActive = cftInfoActiveStatus?.length;
        totalInActive = cftInfoInActiveStatus?.length;
      } else if (searchItem[0]?.menuId == MenuIdCollection.supplierinfolist) {
        grandTotal = supplierInfoData?.length;
        totalActive = supplierInfoActiveStatus?.length;
        totalInActive = supplierInfoInActiveStatus?.length;
      }
       else if (searchItem[0]?.menuId == MenuIdCollection.clientinfolistId) {
        grandTotal = clientInfoData?.length;
        totalActive = clientInfoActiveStatus?.length;
        totalInActive = clientInfoInActiveStatus?.length;
      }
      else if(searchItem[0]?.menuId == MenuIdCollection.purchaseorderlist){
        grandTotal = purchaseInfoData?.length;
        totalActive = purchaseInCash?.length;
        totalInActive = purchaseInLCAtSight?.length;
      }

      setGrandTotal(grandTotal);
      setTotalActive(totalActive);
      setTotalInActive(totalInActive);
    }
  }, [
    mainData,
    pathname,
    finishGoodInItemInfoData,
    finishGoodActiveStatus,
    finishGoodInActiveStatus,
    user,
    activeUser,
    inActiveUser,
    rmItemInfoData,
    rmItemActiveStatus,
    rmItemInActiveStatus,
    cftInfosData,
    cftInfoActiveStatus,
    cftInfoInActiveStatus,
    supplierInfoData,
    supplierInfoActiveStatus,
    supplierInfoInActiveStatus,
    clientInfoData,
    clientInfoActiveStatus,
    clientInfoInActiveStatus,
    purchaseInfoData,
    purchaseInCash,
    purchaseInLCAtSight
  ]);

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
                const searchItem = mainData?.filter((x) => x.url == pathname);
                if(searchItem[0]?.menuId !== MenuIdCollection.purchaseorderlist){
                  setActiveDataModal(true);
                }
               
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
                const searchItem = mainData?.filter((x) => x.url == pathname);
                if(searchItem[0]?.menuId !== MenuIdCollection.purchaseorderlist){
                  setInActiveDataModal(true);
                }
                
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
  );
};

export default ListHeading;

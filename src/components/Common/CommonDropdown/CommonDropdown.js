
const supplierDropdown=(options)=>{
    let result = [];
    options?.forEach((option) => {
      result.push({
        value: option._id,
        label: option.supplierName,
      });
    });
    return result;
}
const rawMaterialItemDropdown=(options)=>{
    let result = [];
    options?.forEach((option) => {
      result.push({
        value: option._id,
        label: option.itemName,
      });
    });
    return result;
}


export {supplierDropdown,rawMaterialItemDropdown}
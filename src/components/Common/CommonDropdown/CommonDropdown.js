
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
const paymentInfoDropdown=(options)=>{
    let result = [];
    options?.forEach((option) => {
      result.push({
        value: option._id,
        label: option.paymentType,
      });
    });
    return result;
}
const bankInformationDropdown=(options)=>{
    let result = [];
    options?.forEach((option) => {
      result.push({
        value: option._id,
        label: option.bankName + '-' + option.branchName + '-' + option.routingNumber,
      });
    });
    return result;
}


export {supplierDropdown,rawMaterialItemDropdown,paymentInfoDropdown,bankInformationDropdown}
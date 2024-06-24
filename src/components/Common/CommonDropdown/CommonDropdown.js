
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
export {supplierDropdown}
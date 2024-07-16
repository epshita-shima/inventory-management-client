import * as ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const handleGRNDownload = (data, companyinfo, reportTitle) => {
  const fileName = reportTitle.toLowerCase().replace(/\s+/g, "");
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Userlist Report");
  const columnsToInclude = [
    "receiveDate",
    "supplierId",
    "supplierPoNo",
    "itemName",
    "grnSerialNo",
    "challanNo",
    "currency",
    "receiveQty",
    "unitPrice",
    "totalAmount"
  ];

  // Merge and center header information
  const headerLength = columnsToInclude.length > 0 ? Object.keys(columnsToInclude).length : 0;
  console.log(headerLength);
  worksheet.mergeCells(`A1:${String.fromCharCode(65 + headerLength - 1)}1`);
  worksheet.getCell("A1").value = `${companyinfo[0].companyName}`;
  worksheet.getCell("A1").font = {
    family: 2,
    size: 14,
    bold: true,
  };
  worksheet.getCell("A1").alignment = { horizontal: "center" };
  worksheet.getCell("A1").border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };

  worksheet.mergeCells(`A2:${String.fromCharCode(65 + headerLength - 1)}2`);
  worksheet.getCell("A2").value = `${companyinfo[0].companyAddress}`;
  worksheet.getCell("A2").alignment = { horizontal: "center" };
  worksheet.getCell("A2").font = {
    family: 2,
    size: 12,
    bold: true,
  };
  worksheet.getCell("A2").border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };

  worksheet.mergeCells(`A3:${String.fromCharCode(65 + headerLength - 1)}3`);
  worksheet.getCell("A3").value = `${reportTitle}`;
  worksheet.getCell("A3").alignment = { horizontal: "center" };
  worksheet.getCell("A3").font = {
    family: 2,
    size: 12,
    bold: true,
  };
  worksheet.getCell("A3").border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };

 

  const headerRow = worksheet.addRow(columnsToInclude);

  console.log(headerRow.values);

  headerRow.eachCell((cell) => {
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    cell.alignment = { horizontal: "center"};
    cell.font = { bold: true };
  });

  worksheet.columns = columnsToInclude.map((col) => ({
    header: col,
    key: col,
    width: 20
  }));

  let totalQuantity = 0;
  let totalAmount = 0;
  
  data.forEach(item => {
      totalQuantity += item.grandTotalQuantity;
      totalAmount += item.grandTotalAmount;
  });
  data.forEach((item) => {
    const itemName =
      item.detailsData.length > 0 ? item.detailsData[0].itemName : ""; // Extract itemName from detailsData
    const values = {
      receiveDate: item.receiveDate,
      supplierId: item.supplierId,
      supplierPoNo: item.supplierPoNo,
      itemName: itemName,
      grnSerialNo: item.grnSerialNo,
      challanNo: item.challanNo,
      currency:item.currency,
      receiveQty:item.grandTotalReceivedQuantity,
      unitPrice:item.unitPrice,
      totalAmount:item.grandTotalAmount
    };
    const footerValues = columnsToInclude.reduce((acc, col) => {
        if (col.key === 'grandTotalQuantity') {
            acc[col.key] = totalQuantity;
        } else if (col.key === 'grandTotalAmount') {
            acc[col.key] = totalAmount;
        } else {
            acc[col.key] = ''; // Leave other cells empty
        }
        return acc;
    }, {});
    
    const footerRow = worksheet.addRow(footerValues);

    
    // Add the row with values in the same order as columnsToInclude
    worksheet.addRow(columnsToInclude.map((col) => values[col]));
  });

  // Generate buffer
  workbook.xlsx.writeBuffer().then((buffer) => {
    // Save the Excel file
    saveAs(new Blob([buffer]), `${fileName}.xlsx`);
  });
};

export default handleGRNDownload;

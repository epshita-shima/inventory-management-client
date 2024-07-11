import jsPDF from "jspdf";

const downloadGRNPDF = async (data, supplierInfo, companyinfo, reportTitle) => {
  console.log(supplierInfo);

  const companyContact = companyinfo.companyinfo[0].companyContact;
  const companyEmail = companyinfo.companyinfo[0].companyEmail;
  const factoryAddress = companyinfo.companyinfo[0].footerAddress;

  const phoneNumber = companyContact.split(",")[0].split(": ")[1].trim();
  const contactEmail = companyEmail.split(",")[0].split(": ")[1].trim();
  const factoryConvertAddress = factoryAddress.replace("Factory Address:", "");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };
  const formattedDate = formatDate(data.makeDate);

  const doc = new jsPDF();
  addFooterForPO(doc, companyinfo, reportTitle);

  doc.setFontSize(10);
  doc.setFont("times", "bold");
  const xCoordinate = 10; // X coordinate for the label
  const labelWidth = 30; // Width allocated for labels
  let textY = 35;

  const finalRows = data?.map((row, index) => [
    // index + 1,
    // formattedDate,
    // supplierInfo
    //   ?.filter((rawItem) => rawItem._id === row.supplierId)
    //   .map((filteredItem) => filteredItem.supplierName)
    //   .join(", "),
    // row.supplierPoNo,
    // row.itemId,
    // row.grnSerialNo,
    // row.challanNo,
    // row.grandTotalReceivedQuantity,
    // row.unitPrice,
    // row.grandTotalAmount?.toLocaleString(),
    row.index + 1,
    row.receivedDate,
    row.supplierName,
    row.pONo,
    row.itemName,
    row.GRNNo,
    row.ChallanNo,
    row.receivedQty,
    row.Rate,
    row.Amount,
  ]);

  textY = addTableContent(doc, finalRows, textY + 10);
  // Add totals to the rows with colSpan

  function addTableContent(doc, finalRows, startY) {
    // finalRows.push([
    //   {
    //     content: "Total",
    //     colSpan: 3,
    //     styles: { halign: "right", fontStyle: "bold" },
    //   },
    //   data.grandTotalQuantity.toLocaleString(), // Grand total quantity
    //   "", // Empty cell for Unit Price
    //   data.grandTotalAmount.toLocaleString(), // Grand total amount
    // ]);

    doc.autoTable({
      head: [
        [
          "Sl.",
          "Received Date",
          "Supplier Name",
          "PO No",
          "Item Name",
          "GRN No",
          "Challan No",
          "Reeived Qty",
          "Rate",
          "Amount",
        ],
      ],
      body: finalRows,
      startY: startY,
      margin: { top: 50, bottom: 32, left: 10, right: 10 },
      headerStyles: {
        fillColor: [128, 128, 128],
        textColor: [255, 255, 255],
        halign: "center",
      },
      theme: "grid",
      tableWidth: "auto",
      tableLineWidth: 0.5,
      styles: {
        lineColor: [0, 0, 0],
        textColor: [0, 0, 0],
        font: "times",
        fontSize: 10,
        textAlign: "center",
      },
      didParseCell: function (data) {
        // Check if it's the last row
        // const rowIndex = data.row.index;
        // const totalRows = data.table.body.length;
        // const columnIndex = data.column.index;
        // data.cell.styles.halign = "center";
        // if (columnIndex === 3 || columnIndex === 5) {
        //   data.cell.styles.halign = "center";
        // }
        // if (columnIndex === 1) {
        //   data.cell.styles.halign = "left";
        // }
        // if (rowIndex === totalRows - 1) {
        //   data.cell.styles.fontStyle = "bold";
        // }
        // if (rowIndex === totalRows - 2) {
        //   data.cell.styles.fontStyle = "bold";
        // }
        // if (rowIndex === totalRows - 2 && columnIndex === 0) {
        //   data.cell.styles.halign = "right";
        //   data.cell.styles.fontStyle = "bold";
        // }
        // if (rowIndex === totalRows - 1) {
        //   data.cell.styles.halign = "left";
        //   data.cell.styles.fontStyle = "bold";
        //   data.cell.styles.fontSize = "11";
        // }
      },
    });
    return doc.previousAutoTable.finalY;
  }
  addContent(doc, xCoordinate, labelWidth, textY);

  function addContent(doc, xCoordinate, labelWidth, textY) {
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    const footerY = pageHeight - 35;

    const sections = 4;

    const sectionWidth = (pageWidth - 35) / sections;
    const margin = 5;

    const boxHeight = 6; // Define the height of each section's box

    for (let i = 0; i < sections; i++) {
      const startX = xCoordinate + i * (sectionWidth + margin);
      const endX = startX + sectionWidth;

      doc.line(startX, footerY, endX, footerY);

      doc.line(startX, footerY + boxHeight, endX, footerY + boxHeight);

      doc.line(startX, footerY, startX, footerY + boxHeight);

      doc.line(endX, footerY, endX, footerY + boxHeight);
    }

    const textYOffset = boxHeight / 2 + 1;

    const labels = [
      "Prepared By",
      "Checked By",
      "Store In - Charge",
      "Approved By",
    ];

    doc.setFontSize(8);
    for (let i = 0; i < sections; i++) {
      const startX = xCoordinate + i * (sectionWidth + margin);
      const centerX = startX + sectionWidth / 2;
      doc.text(labels[i], centerX, footerY + textYOffset, {
        align: "center",
      });
    }
  }

  // Save the PDF
  doc.save(`${reportTitle}.pdf`);
};

const addFooterForPO = (doc, companyinfo, reportTitle) => {
    const pageCount = doc.internal.getNumberOfPages(); // Get the total number of pages
    const detailsWidthPercentage = 0.8;
  
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
    
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
      const headerY = 10;
      const footerY = pageHeight - 20; // Adjusted to give space for the footer
  
      // Header content
      if (companyinfo && companyinfo?.companyinfo[0]) {
        if (companyinfo?.companyinfo[0]?.companyName) {
          var companyNameUpper = companyinfo?.companyinfo[0]?.companyName.toUpperCase();
        }
        if (companyinfo?.companyinfo[0]?.companyAddress) {
          var companyAddressUpper = companyinfo?.companyinfo[0]?.companyAddress.toUpperCase();
        }
      }
  
      const companyDetailsWidth = pageWidth * detailsWidthPercentage;
      doc.setFont("times", "normal", "bold");
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
  
      doc.text(companyNameUpper, pageWidth / 2, headerY + 7, {
        align: "center",
        maxWidth: companyDetailsWidth
      });
      doc.setFont("times", "normal", "bold");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
  
      doc.text(companyAddressUpper, pageWidth / 2, headerY + 14, {
        align: "center",
        maxWidth: companyDetailsWidth
      });
  
      doc.setFontSize(12);
      doc.setFont("times", "bold");
      doc.text(reportTitle, pageWidth / 2, headerY + 21, {
        align: "center",
        maxWidth: companyDetailsWidth
      });
  
      // Footer content
      doc.setFontSize(10);
      doc.setFont("times", "normal");
      doc.text("Page " + i + " of " + pageCount, pageWidth - 20, footerY, {
        align: "right"
      });
  
      // Software generated report aligned to the center
      doc.text("Software Generated report", pageWidth / 2, footerY, {
        align: "center"
      });
  
      // Copyright aligned to the left
      doc.text("Copyright@2024", 10, footerY, {
        align: "left"
      });
  
      doc.setLineWidth(0.5); // Calculate Y position for top line in footer
      doc.line(10, footerY - 7, pageWidth - 10, footerY - 7); // Draw line above footer
  
      doc.setFontSize(10);
      doc.setFont("times", "normal");
  
      const now = new Date();
      const dateStr = now.toLocaleDateString();
      const timeStr = now.toLocaleTimeString();
      doc.text(`Date: ${dateStr}  Time: ${timeStr}`, pageWidth - 20, footerY + 8, {
        align: "right"
      });
    }
  };
  

export { downloadGRNPDF };

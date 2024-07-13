import jsPDF from "jspdf";

const downloadGRNPDF = async (
  data,
  supplierInfo,
  rawItemInfo,
  companyinfo,
  reportTitle
) => {
  const doc = new jsPDF();


  const totalQuantity = data.reduce((accumulator, currentValue) => {
    const quantity = parseFloat(currentValue.grandTotalQuantity);
    return accumulator + (isNaN(quantity) ? 0 : quantity);
  }, 0);
  const totalAmount = data.reduce((accumulator, currentValue) => {
    const amount = parseFloat(currentValue.grandTotalAmount);
    return accumulator + (isNaN(amount) ? 0 : amount);
  }, 0);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  doc.setFontSize(10);
  doc.setFont("times", "bold");
  const xCoordinate = 10; // X coordinate for the label
  const labelWidth = 30; // Width allocated for labels
  let textY = 35;

  const groupedData = data.reduce((acc, row) => {
    const key = `${row.makeDate}_${row.supplierPoNo}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(row);
    return acc;
  }, {});

  const finalRows = [];
  console.log(finalRows);
  Object.keys(groupedData).forEach((key, index) => {
    const group = groupedData[key];
    const formattedDate = formatDate(group[0].makeDate);
    const supplierPONo = group[0].supplierPoNo;

    group.forEach((row, rowIndex) => {
      const itemNames = rawItemInfo
        ?.filter((item) =>
          row?.detailsData?.some((detail) => detail?.itemId === item._id)
        )
        .map((filteredItem) => filteredItem.itemName)
        .join(", ");

      const supplierName = supplierInfo
        ?.filter((rawItem) => rawItem._id === row.supplierId)
        .map((filteredItem) => filteredItem.supplierName)
        .join(", ");

      // Determine if it's the first row of the group
      const isFirstRow = rowIndex === 0;

      // Determine rowspan for receivedDate

      let rowspan = group.reduce(
        (acc, curr) => acc + curr.detailsData.length,
        0
      );
      finalRows.push([
        {
          content: isFirstRow? formattedDate : "",
          // rowSpan: isFirstRow? rowspan : 1,
          styles: { valign: "middle", halign: "center" },
        },
        {
          content:  supplierName,
          rowSpan: rowIndex === 0 ? 1 : 1,
        },
        {
          content:  supplierPONo ,
          rowSpan: rowIndex === 0 ? 1 : 1,
        },
        {
          content: itemNames,
          rowSpan: 1,
        },
        {
          content: row.grnSerialNo,
          rowSpan: 1,
        },
        {
          content: row.challanNo,
          rowSpan:1,
        },

        {
          content: row.grandTotalReceivedQuantity.toLocaleString(),
          rowSpan: 1,
        },
        {
          content: row.detailsData.map((item) => item.unitPrice).join(", "),
          rowSpan: 1,
        },
        {
          content: row.detailsData.map((item) => (item.amount).toLocaleString()).join(", "),
          rowSpan: 1,
        },
      ]);
    });
  });

  // const finalRows = data?.map((row, index) =>{
  //     const formattedDate = formatDate(row.makeDate);
  //   const itemNames = rawItemInfo
  //   ?.filter(item =>
  //     row?.detailsData?.some(detail => detail?.itemId === item?._id)
  //   )
  //   .map(filteredItem => filteredItem?.itemName)
  //   .join(",");

  //   return[
  //     formattedDate,
  //     supplierInfo
  //       ?.filter((rawItem) => rawItem._id === row.supplierId)
  //       .map((filteredItem) => filteredItem.supplierName)
  //       .join(", "),
  //     row.supplierPoNo,
  //     rawItemInfo
  //       ?.filter((item) =>
  //         row?.detailsData?.some((detail) => detail?.itemId === item?._id)
  //       )
  //       .map((filteredItem) => filteredItem?.itemName)
  //       .join(","),
  //     row.grnSerialNo,
  //     row.challanNo,
  //     row.grandTotalReceivedQuantity,
  //     row?.detailsData?.map((item) => {
  //       return item.unitPrice;
  //     }),
  //     row.grandTotalAmount?.toLocaleString(),
  //   ]
  // }

  // );

  textY = addTableContent(doc, finalRows, textY + 10);
  // Add totals to the rows with colSpan

  function addTableContent(doc, finalRows, startY) {
    finalRows.push([
      {
        content: "Grand Total",
        colSpan: 6,
        styles: { halign: "right", fontStyle: "bold" },
      },
      totalQuantity.toLocaleString(), // Grand total quantity
      "", // Empty cell for Unit Price
      totalAmount.toLocaleString(), // Grand total amount
    ]);

    doc.autoTable({
      // head: [
      //   [
      //     {
      //       content: "Received Date",
      //       styles: { valign: "middle", halign: "center" },
      //     },
      //     {
      //       content: "Supplier Name",
      //       styles: { valign: "middle", halign: "center" },
      //     },
      //     { content: "PO No", styles: { valign: "middle", halign: "center" } },
      //     {
      //       content: "Item Name",
      //       styles: { valign: "middle", halign: "center" },
      //     },
      //     { content: "GRN No", styles: { valign: "middle", halign: "center" } },
      //     {
      //       content: "Challan No",
      //       styles: { valign: "middle", halign: "center" },
      //     },
      //     {
      //       content: "Received Qty",
      //       styles: { valign: "middle", halign: "center" },
      //     },
      //     {
      //       content: "Unit Price",
      //       styles: { valign: "middle", halign: "center" },
      //     },
      //     { content: "Amount", styles: { valign: "middle", halign: "center" } },
      //   ],
      // ],
      // body: finalRows,
      html:"#my-grn-table",
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
        halign: "center",
      },
      didParseCell: function (data) {
        // const rowIndex = data.row.index;
        // const totalRows = data.table.body.length;

        // if (rowIndex === totalRows - 1) {
        //   data.cell.styles.fontStyle = "bold";
        // }
      },
  //  didDrawCell: function (data) {
  //     const rowIndex = data.row.index;
  //     const colIndex = data.column.index;

  //     // Adjust rowspan for Received Date cell
  //     if (colIndex === 0 && data.row.raw[0] === "") {
  //       const rowspan = finalRows[data.row.index].length;
  //       data.cell.rowSpan = rowspan;
  //     }
  //   },
      didDrawPage: (data) => {
        addFooterForPO(doc, companyinfo, reportTitle);
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
        var companyNameUpper =
          companyinfo?.companyinfo[0]?.companyName.toUpperCase();
      }
      if (companyinfo?.companyinfo[0]?.companyAddress) {
        var companyAddressUpper =
          companyinfo?.companyinfo[0]?.companyAddress.toUpperCase();
      }
    }

    const companyDetailsWidth = pageWidth * detailsWidthPercentage;
    doc.setFont("times", "normal", "bold");
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);

    doc.text(companyNameUpper, pageWidth / 2, headerY + 7, {
      align: "center",
      maxWidth: companyDetailsWidth,
    });
    doc.setFont("times", "normal", "bold");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    doc.text(companyAddressUpper, pageWidth / 2, headerY + 14, {
      align: "center",
      maxWidth: companyDetailsWidth,
    });

    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text(reportTitle, pageWidth / 2, headerY + 21, {
      align: "center",
      maxWidth: companyDetailsWidth,
    });

    // Footer content
    doc.setFontSize(10);
    doc.setFont("times", "normal");
    doc.text("Page " + i + " of " + pageCount, pageWidth - 20, footerY, {
      align: "right",
    });

    // Software generated report aligned to the center
    doc.text("Software Generated report", pageWidth / 2, footerY, {
      align: "center",
    });

    // Copyright aligned to the left
    doc.text("Copyright@2024", 10, footerY, {
      align: "left",
    });

    doc.setLineWidth(0.5); // Calculate Y position for top line in footer
    doc.line(10, footerY - 7, pageWidth - 10, footerY - 7); // Draw line above footer

    doc.setFontSize(10);
    doc.setFont("times", "normal");

    const now = new Date();
    const dateStr = now.toLocaleDateString();
    const timeStr = now.toLocaleTimeString();
    doc.text(
      `Date: ${dateStr}  Time: ${timeStr}`,
      pageWidth - 20,
      footerY + 8,
      {
        align: "right",
      }
    );
  }
};

export { downloadGRNPDF };

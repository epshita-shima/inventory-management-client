import jsPDF from "jspdf";
const downloadPOPDF = (data, companyinfo, reportTitle) => {
    const companyContact = companyinfo.companyinfo[0].companyContact;
    const companyEmail = companyinfo.companyinfo[0].companyEmail;
    // Method 2: Using split and trim (if the format is consistent)
    const phoneNumber = companyContact.split(',')[0].split(': ')[1].trim();
   const contactEmail=companyEmail.split(',')[0].split(': ')[1].trim()
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };
  const formattedDate = formatDate(data.makeDate);
  const formattedDelivaryDate=formatDate(data.deliveryDate)
  const fileName = reportTitle.toLowerCase().replace(/\s+/g, "");
  const doc = new jsPDF();

  addFooterForPO(doc, companyinfo, reportTitle);

  doc.setFontSize(10);
  doc.setFont("times", "bold");
  const xCoordinate = 10; // X coordinate for the label
  const labelWidth = 30; // Width allocated for labels
  const textY = 40;

  doc.text("Supplier PO No:", xCoordinate, textY);
  doc.text(`${data.poNo}`, xCoordinate + labelWidth, textY);

  // PO Date
  doc.text("PO Date:", xCoordinate, textY + 5);
  doc.text(`${formattedDate}`, xCoordinate + labelWidth, textY + 5);

  doc.text("Delivery Date:", xCoordinate, textY + 10);
  doc.text(`${formattedDelivaryDate}`, xCoordinate + labelWidth, textY + 10);

  const vendorInfoHeaderY = textY + 20; // Adjust this value for spacing
  addVendorInformationHeader(doc, vendorInfoHeaderY);

  doc.setFontSize(10);
  doc.setFont("times", "bold");
  const additionalTextY = vendorInfoHeaderY + 10;
  doc.text("Company:", xCoordinate, additionalTextY);
  doc.text(
    "MSA Universal Textile Mill Limited",
    xCoordinate + labelWidth,
    additionalTextY
  );
  doc.text("Address:", xCoordinate, additionalTextY + 5);
  doc.text("N/A", xCoordinate + labelWidth, additionalTextY + 5);
  doc.text("Mobile:", xCoordinate, additionalTextY + 10);
  doc.text("+880", xCoordinate + labelWidth, additionalTextY + 10);
  doc.text("Email:", xCoordinate, additionalTextY + 15);
  doc.text(
    "msa.universal@gmail.com",
    xCoordinate + labelWidth,
    additionalTextY + 15
  );

 

  const shipInfoHeaderY = textY + 55;
  addShipInformationHeader(doc, shipInfoHeaderY);

  doc.setFontSize(10);
  doc.setFont("times", "bold");
  const additionalShipTextY = shipInfoHeaderY + 10;
  doc.text("Company:", xCoordinate, additionalShipTextY);
  doc.text(
   `${companyinfo.companyinfo[0]?.companyName}`,
    xCoordinate + labelWidth,
    additionalShipTextY 
  );
  doc.text("Address:", xCoordinate, additionalShipTextY  + 5);
  doc.text(`${companyinfo.companyinfo[0]?.companyAddress}`, xCoordinate + labelWidth, additionalShipTextY  + 5);
  doc.text("Mobile:", xCoordinate, additionalShipTextY  + 10);
  doc.text(`${phoneNumber}`, xCoordinate + labelWidth, additionalShipTextY  + 10);
  doc.text("Email:", xCoordinate, additionalShipTextY  + 15);
  doc.text(
    `${contactEmail}`,
    xCoordinate + labelWidth,
    additionalShipTextY  + 15
  );

  const tableInfoHeaderY = textY + 85;
  doc.autoTable({
    html: "#my-tablePO",
    startY: tableInfoHeaderY,
    margin: { top: 50, bottom: 32, left: 10, right: 10 },
    headerStyles: {
      fillColor: [128, 128, 128], // Change the color here, e.g., red
      textColor: [255, 255, 255], // Header text color
    },
    theme: "grid",
    tableWidth: "auto",
    tableLineWidth: 0.5, // Border width for the whole table
    styles: {
      lineColor: [0, 0, 0], // Color for all borders
      textColor: [0, 0, 0],
      font: "times", // All text color
      fontSize: 10,
    },
    didParseCell: function (data) {
      // Check if it's the last row
      const rowIndex = data.row.index;
      const totalRows = data.table.body.length;
      const columnIndex = data.column.index;
      // Center align all cells by default
      console.log(columnIndex)
      data.cell.styles.halign = "center";
      // Apply specific styles for the second last row
    
      if(columnIndex === 3 || columnIndex===5){
        data.cell.styles.halign = "center";
      }
      if(rowIndex === totalRows - 2){
        data.cell.styles.fontStyle = "bold";
      }
      if (rowIndex === totalRows - 2 && columnIndex === 0 ) {
        data.cell.styles.halign = "right";
        data.cell.styles.fontStyle = "bold";
      }

      // Apply specific styles for the last row
      if (rowIndex === totalRows - 1) {
        data.cell.styles.halign = "left";
        data.cell.styles.fontStyle = "bold";
        data.cell.styles.fontSize = "11";
      }
    },
  });

  const conditionInfoHeaderY = textY + 135;
  conditionInformationHeader(doc, conditionInfoHeaderY);

  doc.setFontSize(10);
  doc.setFont("times", "bold");
  const additionalConditionTextY = conditionInfoHeaderY + 13;
  doc.text("Product", xCoordinate, additionalConditionTextY);
  doc.text(
    ":Product should be supplied as per Described quality and approved sample",
    xCoordinate + labelWidth,
    additionalConditionTextY
  );
  doc.text("Quality &", xCoordinate, additionalConditionTextY + 5);
  doc.text("Quantity", xCoordinate, additionalConditionTextY + 10);
  doc.text(
    ":Standard Quality should be maintained. Deviation in Quality should not be accepted or tolerable. ",
    xCoordinate + labelWidth,
    additionalConditionTextY + 5
  );
  doc.text("Payment Terms", xCoordinate, additionalConditionTextY + 15);
  doc.text(":Cash", xCoordinate + labelWidth, additionalConditionTextY + 15);
  doc.text("Packing", xCoordinate, additionalConditionTextY + 20);
  doc.text(
    ":In standard Packing System Should be Maintaine",
    xCoordinate + labelWidth,
    additionalConditionTextY + 20
  );
  doc.text("Remarks", xCoordinate, additionalConditionTextY + 25);
  doc.text(":N/A", xCoordinate + labelWidth, additionalConditionTextY + 25);

  // Space for each section

  // Draw lines
  const footerY = doc.internal.pageSize.height - 35;

  // Draw lines
  const lineWidth = (doc.internal.pageSize.width - 30) / 3; // Divide the width by 3 sections
  doc.line(xCoordinate, footerY, xCoordinate + lineWidth, footerY); // Checked by line
  doc.line(
    xCoordinate + lineWidth + 5,
    footerY,
    xCoordinate + 2 * lineWidth + 5,
    footerY
  ); // Prepared by line
  doc.line(
    xCoordinate + 2 * lineWidth + 10,
    footerY,
    xCoordinate + 3 * lineWidth + 10,
    footerY
  ); // Authorized by line

  // Add text centered below the lines
  const textYOffset = 5; // Y offset for the text to be placed below the lines

  // Calculate center positions
  const checkedByCenter = xCoordinate + lineWidth / 2;
  const preparedByCenter = xCoordinate + lineWidth + 5 + lineWidth / 2;
  const authorizedByCenter = xCoordinate + 2 * lineWidth + 10 + lineWidth / 2;

  // Add text centered under the lines
  doc.setFontSize(8);
  doc.text("Checked by", checkedByCenter, footerY + textYOffset, {
    align: "center",
  });
  doc.text("Prepared by", preparedByCenter, footerY + textYOffset, {
    align: "center",
  });
  doc.text("Authorized by", authorizedByCenter, footerY + textYOffset, {
    align: "center",
  });

  // Save the PDF
  doc.save(`${fileName}.pdf`);
};

const addVendorInformationHeader = (doc, startY) => {
  const headerY = startY; // Starting Y position for the header
  const pageWidth = doc.internal.pageSize.width;
  const headerHeight = 2; // Height of the header
  const padding = 2; // Padding inside the header

  // Set background color for the header
  doc.setFillColor(210, 210, 210);
  doc.rect(10, headerY, pageWidth - 20, headerHeight + padding * 2, "F");

  // Add the centered text inside the header
  doc.setFontSize(12);
  doc.setFont("times", "bold");
  doc.text(
    "VENDOR INFORMATION",
    pageWidth / 2,
    headerY + headerHeight + padding,
    {
      align: "center",
    }
  );
};

const addShipInformationHeader = (doc, startY) => {
  const headerY = startY; // Starting Y position for the header
  const pageWidth = doc.internal.pageSize.width;
  const headerHeight = 2; // Height of the header
  const padding = 2; // Padding inside the header

  // Set background color for the header
  doc.setFillColor(210, 210, 210);
  doc.rect(10, headerY, pageWidth - 20, headerHeight + padding * 2, "F");

  // Add the centered text inside the header
  doc.setFontSize(12);
  doc.setFont("times", "bold");
  doc.text(
    " SHIP TO INFORMATION",
    pageWidth / 2,
    headerY + headerHeight + padding,
    {
      align: "center",
    }
  );
};

const conditionInformationHeader = (doc, startY) => {
  const headerY = startY; // Starting Y position for the header
  const pageWidth = doc.internal.pageSize.width;
  const headerHeight = 2; // Height of the header
  const padding = 2; // Padding inside the header

  // Set background color for the header
  doc.setFillColor(210, 210, 210);
  doc.rect(10, headerY, pageWidth / 3, headerHeight + padding * 2, "F");

  // Add the centered text inside the header
  doc.setFontSize(12);
  doc.setFont("times", "bold");
  doc.text("TERMS AND CONDITIONS", 10, headerY + headerHeight + padding, {
    align: "left",
  });
};

const addFooterForPO = (doc, companyinfo, reportTitle) => {
  console.log(companyinfo);
  console.log(companyinfo?.companyinfo[0].companyName);
  const pageCount = doc.internal.getNumberOfPages(); // Get the total number of pages
  const logoWidthPercentage = 0.15; // 15% of page width for the logo
  const detailsWidthPercentage = 0.8;

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i); // Go to page i
    const headerHeight = 30; // Adjust this value according to your header height
    // Set space between elements
    const spaceBetween = 15; // Adjust this value as needed

    // Start Y position for content (table starts below header)
    // const contentStartY = headerHeight + spaceBetween;
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    console.log(pageHeight);
    const lineHeight = 7; // Adjust this value for line height
    const headerY = 10;
    const footerY = pageHeight - 10;

    // Header content
    if (companyinfo && companyinfo?.companyinfo[0]) {
      if (companyinfo?.companyinfo[0]?.companyName) {
        var companyNameUpper =
          companyinfo?.companyinfo[0]?.companyName.toUpperCase();
      }
    }

    // const detailsX = logoWidth + 20;

    const companyDetailsWidth = pageWidth * detailsWidthPercentage;
    doc.setFont("times", "normal", "bold");
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    // Set font to helvetica (or any other font you prefer)
    doc.text(companyNameUpper, doc.internal.pageSize.width / 2, headerY + 7, {
      align: "center",
      width: companyDetailsWidth,
    });

    doc.setFontSize(14);
    doc.setFont("times", "bold");
    doc.text(`${reportTitle}`, doc.internal.pageSize.width / 2, headerY + 16, {
      align: "center",
      width: companyDetailsWidth,
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
    doc.text("Copyright@2024", 10, footerY, { align: "left" });

    doc.setLineWidth(0.5); // Calculate Y position for top line in footer
    doc.line(10, footerY - 15, doc.internal.pageSize.width - 10, footerY - 15); // Draw line above footer

    doc.setFontSize(10);
    doc.setFont("times", "normal");
    if (companyinfo && companyinfo?.companyinfo[0]) {
      if (companyinfo?.companyinfo[0]?.footerAddress) {
        doc.text(
          companyinfo?.companyinfo[0]?.footerAddress,
          pageWidth - 57,
          footerY - 10,
          {
            align: "right",
          }
        );
      }
      if (companyinfo?.companyinfo[0]?.footerContact) {
        doc.text(
          companyinfo?.companyinfo[0]?.footerContact,
          pageWidth - 130,
          footerY - 5,
          {
            align: "right",
          }
        );
      }
    }
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

export { downloadPOPDF };

import jsPDF from "jspdf";

const downloadPDF = (companyinfo,reportTitle) => {
  const doc = new jsPDF();
  console.log(companyinfo)
  doc.autoTable({
    html: "#my-table",
    startY: 50,
    margin: { top: 50, bottom: 32 },
    headerStyles: {
      fillColor: [128, 128, 128], // Change the color here, e.g., red
      textColor: [255, 255, 255], // Header text color
    },
    theme: "grid",
    tableLineWidth: 0.5, // Border width for the whole table
    styles: {
      lineColor: [0, 0, 0], // Color for all borders
      textColor: [0, 0, 0],
      font: "times", // All text color
      fontSize: 10,
    },
    didParseCell: function (data) {
      data.cell.styles.halign = "center"; // Align all cell content to center
    },
  });

  // Add footer text to each page
  addFooter(doc, companyinfo,reportTitle);

  // Save the PDF
  doc.save("userlist.pdf");
};
const downloadAllPDF = (companyinfo,reportTitle) => {
  const doc = new jsPDF();
  console.log(companyinfo)
  doc.autoTable({
    html: "#my-table2",
    startY: 50,
    margin: { top: 50, bottom: 32 },
    headerStyles: {
      fillColor: [128, 128, 128], // Change the color here, e.g., red
      textColor: [255, 255, 255], // Header text color
    },
    theme: "grid",
    tableLineWidth: 0.5, // Border width for the whole table
    styles: {
      lineColor: [0, 0, 0], // Color for all borders
      textColor: [0, 0, 0],
      font: "times", // All text color
      fontSize: 10,
    },
    didParseCell: function (data) {
      data.cell.styles.halign = "center"; // Align all cell content to center
    },
  });

  // Add footer text to each page
  addFooter(doc, companyinfo,reportTitle);

  // Save the PDF
  doc.save("userlist.pdf");
};
const downloadInactivePDF = (companyinfo,reportTitle) => {
  const doc = new jsPDF();
  console.log(companyinfo)
  doc.autoTable({
    html: "#my-tableInactive",
    startY: 50,
    margin: { top: 50, bottom: 32 },
    headerStyles: {
      fillColor: [128, 128, 128], // Change the color here, e.g., red
      textColor: [255, 255, 255], // Header text color
    },
    theme: "grid",
    tableLineWidth: 0.5, // Border width for the whole table
    styles: {
      lineColor: [0, 0, 0], // Color for all borders
      textColor: [0, 0, 0],
      font: "times", // All text color
      fontSize: 10,
    },
    didParseCell: function (data) {
      data.cell.styles.halign = "center"; // Align all cell content to center
    },
  });

  // Add footer text to each page
  addFooter(doc, companyinfo,reportTitle);

  // Save the PDF
  doc.save("userlist.pdf");
};

const addFooter = (doc, companyinfo,reportTitle) => {
    console.log(companyinfo)
    console.log(companyinfo?.companyinfo[0].companyName)
    const pageCount = doc.internal.getNumberOfPages(); // Get the total number of pages
    const logoWidthPercentage = 0.15; // 15% of page width for the logo
    const detailsWidthPercentage = 0.8;

    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i); // Go to page i
      const headerHeight = 30; // Adjust this value according to your header height
      // Set space between elements
      const spaceBetween = 15; // Adjust this value as needed

      // Start Y position for content (table starts below header)
      const contentStartY = headerHeight + spaceBetween;
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
      console.log(pageHeight);
      const lineHeight = 7; // Adjust this value for line height
      const headerY = 10;
      const footerY = pageHeight - 10;

      // Header content

      // const logoWidth = pageWidth * logoWidthPercentage;
      // const logoHeight = logoWidth * (40 / 40);
      // doc.addImage(logoImage, 'PNG', 10, headerY, logoWidth,logoHeight);
      if (companyinfo && companyinfo?.companyinfo[0]) {
        if(companyinfo?.companyinfo[0]?.companyName){
         var companyNameUpper = companyinfo?.companyinfo[0]?.companyName.toUpperCase();
        }
      }
     
      // const detailsX = logoWidth + 20;

      const companyDetailsWidth = pageWidth * detailsWidthPercentage;
      doc.setFont("times", "italic");
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      // Set font to helvetica (or any other font you prefer)
      doc.text(companyNameUpper, doc.internal.pageSize.width / 2, headerY + 7, {
        align: "center",
        width: companyDetailsWidth,
      });
      doc.setLineWidth(0.5);
      doc.line(
        10,
        contentStartY,
        doc.internal.pageSize.width - 10,
        contentStartY
      ); // Change 10 to your left margin and right margin respectively

      doc.setFont("normal"); // Reset font style
      doc.setFontSize(10); // Reset font size
      // doc.setFont("helvetica");
      if (companyinfo && companyinfo?.companyinfo[0]) {
        if(companyinfo?.companyinfo[0]?.companyAddress){
            doc.text(
              companyinfo?.companyinfo[0]?.companyAddress,
                doc.internal.pageSize.width / 2,
                headerY + 14,
                { align: "center", width: companyDetailsWidth }
              );
        }
        if (companyinfo?.companyinfo[0].companyContact) {
            doc.text(
              companyinfo?.companyinfo[0]?.companyContact,
                doc.internal.pageSize.width / 2,
                headerY + 19,
                { align: "center", width: companyDetailsWidth }
              );
        }
        if (companyinfo?.companyinfo[0].companyEmail) {
            doc.text(
              companyinfo?.companyinfo[0]?.companyEmail,
                doc.internal.pageSize.width / 2,
                headerY + 24,
                { align: "center", width: companyDetailsWidth }
              );
        }
      }

      doc.setFontSize(14);
      doc.setFont("times", "bold");
      doc.text(
        `${reportTitle}`,
        doc.internal.pageSize.width / 2,
        headerY + 32,
        { align: "center", width: companyDetailsWidth }
      );

      // Footer content
      doc.setFontSize(10);
      doc.setFont("times", "italic");
      doc.text("Page " + i + " of " + pageCount, pageWidth - 20, footerY, { align: "right" });

      // Software generated report aligned to the center
      doc.text("Software Generated report", pageWidth / 2, footerY, { align: "center" });
      
      // Copyright aligned to the left
      doc.text("Copyright@2024", 20, footerY, { align: "left" });

      doc.setLineWidth(0.5); // Calculate Y position for top line in footer
      doc.line(
        10,
        footerY - 15,
        doc.internal.pageSize.width - 10,
        footerY - 15
      ); // Draw line above footer
if(companyinfo && companyinfo?.companyinfo[0]){
    if(companyinfo?.companyinfo[0]?.footerAddress){
        doc.text(companyinfo?.companyinfo[0]?.footerAddress, pageWidth / 2, footerY - 10, {
            align: "center",
          });
    }
    if(companyinfo?.companyinfo[0]?.footerContact){
        doc.text(companyinfo?.companyinfo[0]?.footerContact, pageWidth / 2, footerY - 5, {
            align: "center",
          });
    
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

export { downloadPDF,downloadAllPDF,downloadInactivePDF };

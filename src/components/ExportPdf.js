import jsPDF from 'jspdf';
export const exportPDFWithData = ({rows, tR, tP, selectedOption}) => {

    if (!tR.trim()) {
      alert("Please generate a coverage first before exporting to PDF.");
      return; // Exit the function early
    }

    const pdf = new jsPDF();

    const coverageNameMap = {
      nodeCoverage: "Node Coverage",
      edgeCoverage: "Edge Coverage",
      edgePairCoverage: "Edge-Pair Coverage"
    };
    const coverageName = coverageNameMap[selectedOption] || "Selected Coverage";

    pdf.setFontSize(18);
    pdf.text(`Graph Data and Test Details - ${coverageName}`, 14, 22); // Coordinates for the title

    pdf.setFontSize(18);
    pdf.text("Graph Data and Test Details", 14, 22); // Coordinates for the title

    
    const tableColumn = ["Source Node", "Outgoing Edges"];
    const tableRows = [];

    // Populate tableRows with your rows' data
    rows.forEach(row => {
      const rowData = [
        row.column1,
        row.column2,
      ];
      tableRows.push(rowData);
    });

    pdf.autoTable(tableColumn, tableRows, { startY: 30 });

    // Calculate startY dynamically based on previous content
    let startY = pdf.lastAutoTable ? pdf.lastAutoTable.finalY + 10 : 30;

    // Adding Test Requirements
    pdf.setFontSize(16);
    pdf.text(14, startY, "Test Requirements:");
    startY += 7; // Small space after the heading

    const maxWidth = 180; // Maximum width for text to fit in the PDF
    const requirements = tR.split("\n"); // Assuming each requirement is on a new line

    // Iterate through each requirement and split it if necessary
    requirements.forEach((requirement) => {
      const splitRequirement = pdf.splitTextToSize(requirement, maxWidth); // Split long text
      splitRequirement.forEach((line, index) => {
        pdf.text(14, startY + (6 * index), line); // Adjust vertical space between lines
      });
      startY += (splitRequirement.length * 6) + 1; // Increase startY for the next requirement based on the number of lines
    });

    let startYForPaths = startY + 5; // Increase space before starting paths

    // Adding Test Paths after Requirements
    pdf.text(14, startYForPaths, "Test Paths:");
    startYForPaths += 7; // Small space after the heading
    const paths = tP.split("\n\n"); // Assuming each path is separated by a double newline

    paths.forEach((path, index) => {
      pdf.text(14, startYForPaths + (6 * index), `Path ${index + 1}: ${path}`);
      startYForPaths += 6; // Adjust according to content
    });

    // Save the PDF
    pdf.save("graph_data.pdf");
  };
import { jsPDF } from 'jspdf';
// import View from './View.js';

class PDFView {
  generatePDF(opportunity) {
    const doc = new jsPDF();

    // Load the Deutsche Telekom logo
    const logo = new Image();
    logo.src = 'img/logo.jpg';

    // Once the logo is loaded, add it to the PDF
    logo.onload = function () {
      // Header Section
      doc.addImage(logo, 'JPEG', 10, 10, 50, 15);
      doc.setFontSize(18);
      doc.text('Deutsche Telekom Opportunity', 70, 20);

      // Banner Section
      doc.setFillColor(226, 0, 116); // Light purple
      doc.rect(10, 30, 190, 10, 'F'); // Filled rectangle
      doc.setTextColor(102, 102, 102);
      doc.setFontSize(12);
      doc.text('Join our team and shape the digital future!', 15, 36);

      // Opportunity Details
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      const experienceList = Array.isArray(opportunity.experience)
        ? opportunity.experience
        : [opportunity.experience];

      doc.text(`Title: ${opportunity.title}`, 10, 50);
      doc.text(`Type: ${opportunity.type}`, 10, 60);
      doc.text(`Location: ${opportunity.location}`, 10, 70);
      doc.text(`Description:`, 10, 80);
      doc.setFontSize(12);
      doc.text(opportunity.opportunityDescription || 'N/A', 10, 90, {
        maxWidth: 190,
      });

      doc.setFontSize(14);
      doc.text(`Experience Required: ${experienceList.join(', ')}`, 10, 120);
      doc.text(`Engagement Type: ${opportunity.engagementType}`, 10, 130);
      doc.text(`Deadline: ${opportunity.deadline}`, 10, 140);

      // Footer Section
      doc.setDrawColor(0, 0, 0);
      doc.line(10, 280, 200, 280); // Horizontal line
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(
        'Deutsche Telekom AG | Contact: jane.doe@telekom.com | www.telekom.com',
        10,
        285
      );

      // Save the PDF
      doc.save(`${opportunity.title.replace(/ /g, '_')}.pdf`);
    };
  }
}

export default new PDFView();

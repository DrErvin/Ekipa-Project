import { jsPDF } from 'jspdf';
// import View from './View.js';

class PDFView {
  generatePDF(opportunity) {
    const doc = new jsPDF();

    // Set the font to your custom Deutsche Telekom font
    doc.setFont('TeleNeoWeb-Bold', 'normal');

    // Deutsche Telekom color
    const pinkColor = [226, 0, 116];

    // --- Header Section ---
    // Pink rectangle
    doc.setFillColor(...pinkColor);
    doc.rect(20, 15, 173, 60, 'F');

    // Dotted pattern
    doc.setDrawColor(0);
    for (let i = 63; i < 159; i += 12) {
      doc.circle(i, 7.5, 1.5, 'F');
    }

    // Circular shape (top right)
    const circleShape = new Image();
    circleShape.src = 'img/circleShapePDF.jpg';
    circleShape.onload = function () {
      doc.addImage(circleShape, 'JPEG', 166.7, 0, 45, 39);
    };

    // Header text
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.text('Deutsche Telekom Opportunity', 25, 25);
    doc.text(`${opportunity.title}`, 25, 33);

    // Opportunity Information in Header
    const experienceList = Array.isArray(opportunity.experience)
      ? opportunity.experience
      : [opportunity.experience];

    const tagsList = Array.isArray(opportunity.tags)
      ? opportunity.tags
      : [opportunity.tags];

    doc.setFontSize(14);
    const headerInfo = [
      `Type: ${opportunity.type}`,
      `Location: ${opportunity.location}`,
      `Experience: ${experienceList.join(', ')}`,
      `Engagement: ${opportunity.engagementType}`,
      `Deadline: ${opportunity.deadline}`,
      `Tags: ${tagsList.join(', ')}`,
    ];
    doc.text(headerInfo.join('\n'), 25, 41);

    // --- Opportunity Details Section ---
    const yourProfileList = Array.isArray(opportunity.yourProfile)
      ? opportunity.yourProfile
      : [opportunity.yourProfile];

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    const details = [
      `Description: ${opportunity.opportunityDescription}`,
      `Profile: ${yourProfileList.join(', ')}`,
      `Benefits: ${opportunity.benefits.join(', ')}`,
      `Employee Info: ${opportunity.employeeInfo}`,
    ];
    doc.text(details.join('\n'), 20, 90);

    // --- Footer Section ---
    const logo = new Image();
    logo.src = 'img/logo2PDF.jpg'; // Ensure this image exists in your project
    logo.onload = function () {
      doc.addImage(logo, 'JPEG', 20, 240, 30, 35);

      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(
        'Deutsche Telekom AG | Contact: John Smith | johnsmith@example.com',
        20,
        280
      );

      // Save the PDF
      doc.save(`${opportunity.title.replace(/ /g, '_')}.pdf`);
    };
  }
}

export default new PDFView();

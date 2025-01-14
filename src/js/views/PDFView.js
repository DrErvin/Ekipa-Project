import { jsPDF } from 'jspdf';
// import View from './View.js';

class PDFView {
  generatePDF(opportunity) {
    const doc = new jsPDF();

    // Ensure experience is always an array
    const experienceList = Array.isArray(opportunity.experience)
      ? opportunity.experience
      : [opportunity.experience];

    // Add opportunity details to the PDF
    doc.setFontSize(16);
    doc.text('Opportunity Details', 10, 10);
    doc.setFontSize(12);
    doc.text(`Title: ${opportunity.title}`, 10, 20);
    doc.text(`Type: ${opportunity.type}`, 10, 30);
    doc.text(`Location: ${opportunity.location}`, 10, 40);
    doc.text(`Description: ${opportunity.opportunityDescription}`, 10, 50);
    doc.text(`Experience Required: ${experienceList.join(', ')}`, 10, 60);
    doc.text(`Engagement Type: ${opportunity.engagementType}`, 10, 70);
    doc.text(`Deadline: ${opportunity.deadline}`, 10, 80);

    // Save the PDF
    doc.save(`${opportunity.title.replace(/ /g, '_')}.pdf`);
  }
}

export default new PDFView();

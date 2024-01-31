const { PDFDocument } = require('@pdf-lib/core');
const fs = require('fs/promises');

async function fillPdfForm(inputPdfPath, outputPdfPath, fieldData) {
  const pdfBytes = await fs.readFile(inputPdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();

  Object.keys(fieldData).forEach((fieldName) => {
    const field = form.getFieldByName(fieldName);
    if (field) {
      field.setText(fieldData[fieldName]);
    }
  });

  const modifiedPdfBytes = await pdfDoc.save();

  await fs.writeFile(outputPdfPath, modifiedPdfBytes);
}

const fieldData = {
  'FieldName1': 'Value1',
  'FieldName2': 'Value2',
  // Add more fields as needed
};

const inputPdfPath = 'path/to/your/input.pdf';
const outputPdfPath = 'path/to/your/output.pdf';

fillPdfForm(inputPdfPath, outputPdfPath, fieldData)
  .then(() => console.log('PDF filled successfully'))
  .catch((error) => console.error('Error:', error));

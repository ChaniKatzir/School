const db = require('../models');
const students = db.students
const student_per_subjects = db.student_per_subjects
const subject_marks = db.subject_marks
const student_per_manners = db.student_per_manners
const manners = db.manners
const manner_marks = db.manner_marks
const grade = db.grade
const assessments = db.assessments
const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs').promises;
const fontkit = require('@pdf-lib/fontkit');
const inputPdfPath = 'files\\reportFile.pdf';
const outputPdfPath = 'files\\filledReportFile.pdf';
async function fillPdfForm(inputPdfPath, outputPdfPath, fieldData) {
    const pdfBytes = await fs.readFile(inputPdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();

    // Register fontkit
    pdfDoc.registerFontkit(fontkit);

    // Load a font file that supports Hebrew (e.g., Arial Unicode MS)
    const fontBytes = await fs.readFile('./ARIAL.TTF'); // Replace with the correct path
    const font = await pdfDoc.embedFont(fontBytes);
    const customFont = await pdfDoc.embedFont(fontBytes);

    const page = pdfDoc.getPages()[0];
    const { width, height } = page.getSize();
    const fontSize = 12;

    for (const fieldName of Object.keys(fieldData)) {
        const textField = form.getTextField(fieldName);
        textField.updateAppearances(customFont);

        if (textField) {
            const text = fieldData[fieldName] || '';
            if (typeof text === 'string') {
                textField.setText(text);
            }
            form.updateFieldAppearances(customFont);
        }
    }

    // Save the modified PDF
    const finalPdfBytes = await pdfDoc.save();
    await fs.writeFile(outputPdfPath, finalPdfBytes);
}


exports.print = async (req, res) => {
    let allStudents = await students.findAll();
    allStudents.map(async (student, index) => {
        console.log("index",index,outputPdfPath.getPageCount);
        let name =await student.name;
        let classes = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח"];
        let marks = await subject_marks.findAll();
        marks =await marks.map( mark =>  mark.dataValues.name);
        let allAssessments = await assessments.findAll();
        allAssessments  = await allAssessments.map(assessment => assessment.dataValues.name);
        let MMarks = await manner_marks.findAll();
        MMarks =await MMarks.map(mark => mark.name );
        let allManners = await manners.findAll();
        allManners =await allManners.map(manner => manner.dataValues.name);
        let m1 = await student_per_subjects.findOne({ where: { student_id: student.id, subject_id: 1 } })
        let m2 = await student_per_subjects.findOne({ where: { student_id: student.id, subject_id: 2 } })
        let m3 = await student_per_subjects.findOne({ where: { student_id: student.id, subject_id: 3 } })
        let m4 = await student_per_subjects.findOne({ where: { student_id: student.id, subject_id: 4 } })
        let m5 = await student_per_subjects.findOne({ where: { student_id: student.id, subject_id: 5 } })
        let m6 = await student_per_subjects.findOne({ where: { student_id: student.id, subject_id: 6 } })
        let m7 = await student_per_subjects.findOne({ where: { student_id: student.id, subject_id: 7 } })
        let m8 = await student_per_subjects.findOne({ where: { student_id: student.id, subject_id: 8 } })
        let m9 = await student_per_subjects.findOne({ where: { student_id: student.id, subject_id: 9 } })
        let m10 = await student_per_subjects.findOne({ where: { student_id: student.id, subject_id: 10 } })
        let m11 = await student_per_subjects.findOne({ where: { student_id: student.id, subject_id: 11 } })
        let m12 = await student_per_subjects.findOne({ where: { student_id: student.id, subject_id: 12 } })
        let m13 = await student_per_subjects.findOne({ where: { student_id: student.id, subject_id: 13 } })
        let m14 = await student_per_subjects.findOne({ where: { student_id: student.id, subject_id: 14 } })
        let m15 = await student_per_subjects.findOne({ where: { student_id: student.id, subject_id: 15 } })
        let m16 = await student_per_subjects.findOne({ where: { student_id: student.id, subject_id: 16 } })
        let m17 = await student_per_subjects.findOne({ where: { student_id: student.id, subject_id: 17 } })
        let m18 = await student_per_subjects.findOne({ where: { student_id: student.id, subject_id: 18 } })
        let m19 = await student_per_subjects.findOne({ where: { student_id: student.id, subject_id: 19 } })
        let m20 = await student_per_subjects.findOne({ where: { student_id: student.id, subject_id: 20 } })
        let m21 = await student_per_subjects.findOne({ where: { student_id: student.id, subject_id: 21 } })
        let m22 = await student_per_subjects.findOne({ where: { student_id: student.id, subject_id: 22 } })
        let m23 = await student_per_subjects.findOne({ where: { student_id: student.id, subject_id: 23 } })
        let m24 = await student_per_subjects.findOne({ where: { student_id: student.id, subject_id: 24 } })
        let n1 = await student_per_manners.findOne({ where: { student_id: student.id, manner_id: 1 } })
        let n2 = await student_per_manners.findOne({ where: { student_id: student.id, manner_id: 2 } })
        let n3 = await student_per_manners.findOne({ where: { student_id: student.id, manner_id: 3 } })
        let n4 = await student_per_manners.findOne({ where: { student_id: student.id, manner_id: 4 } })
        let n5 = await student_per_manners.findOne({ where: { student_id: student.id, manner_id: 5 } })
        let n6 = await student_per_manners.findOne({ where: { student_id: student.id, manner_id: 6 } })
        let n7 = await student_per_manners.findOne({ where: { student_id: student.id, manner_id: 7 } })
        let n8 = await student_per_manners.findOne({ where: { student_id: student.id, manner_id: 8 } })
        let n9 = await student_per_manners.findOne({ where: { student_id: student.id, manner_id: 9 } })
        let n10 = await student_per_manners.findOne({ where: { student_id: student.id, manner_id: 10 } })
        let n11 = await student_per_manners.findOne({ where: { student_id: student.id, manner_id: 11 } })

        let currentClass = await grade.findOne({ where: { id: student.grade_id } })
        currentClass =  classes[year - currentClass.year];
        let period = "גליון מחצית "+ await req.params.periodA + " " +await req.params.periodB;
        const fieldData = {
            'date': req.params.date,
            'period': period,
            'name': name,
            'class': currentClass,
            '1mark': marks[m1?.dataValues.mark_id - 1],
            '2mark': marks[m2?.dataValues.mark_id - 1],
            '3mark': marks[m3?.dataValues.mark_id - 1],
            '4mark': marks[m4?.dataValues.mark_id - 1],
            '5mark': marks[m5?.dataValues.mark_id - 1],
            '6mark': marks[m6?.dataValues.mark_id - 1],
            '7mark': marks[m7?.dataValues.mark_id - 1],
            '8mark': marks[m8?.dataValues.mark_id - 1],
            '9mark': marks[m9?.dataValues.mark_id - 1],
            '10mark': marks[m10?.dataValues.mark_id - 1],
            '11mark': marks[m11?.dataValues.mark_id - 1],
            '12mark': marks[m12?.dataValues.mark_id - 1],
            '13mark': marks[m13?.dataValues.mark_id - 1],
            '14mark': marks[m14?.dataValues.mark_id - 1],
            '15mark': marks[m15?.dataValues.mark_id - 1],
            '16mark': marks[m16?.dataValues.mark_id - 1],
            '17mark': marks[m17?.dataValues.mark_id - 1],
            '18mark': marks[m18?.dataValues.mark_id - 1],
            '19mark': marks[m19?.dataValues.mark_id - 1],
            '20mark': marks[m20?.dataValues.mark_id - 1],
            '21mark': marks[m21?.dataValues.mark_id - 1],
            '22mark': marks[m22?.dataValues.mark_id - 1],
            '23mark': marks[m23?.dataValues.mark_id - 1],
            '24mark': marks[m24?.dataValues.mark_id - 1],
            '1assessment': allAssessments[m1?.dataValues.assessment_id - 1],
            '2assessment': allAssessments[m2?.dataValues.assessment_id - 1],
            '3assessment': allAssessments[m3?.dataValues.assessment_id - 1],
            '4assessment': allAssessments[m4?.dataValues.assessment_id - 1],
            '5assessment': allAssessments[m5?.dataValues.assessment_id - 1],
            '6assessment': allAssessments[m6?.dataValues.assessment_id - 1],
            '8assessment': allAssessments[m7?.dataValues.assessment_id - 1],
            '9assessment': allAssessments[m8?.dataValues.assessment_id - 1],
            '7assessment': allAssessments[m9?.dataValues.assessment_id - 1],
            '10assessment': allAssessments[m10?.dataValues.assessment_id - 1],
            '11assessment': allAssessments[m11?.dataValues.assessment_id - 1],
            '12assessment': allAssessments[m12?.dataValues.assessment_id - 1],
            '13assessment': allAssessments[m13?.dataValues.assessment_id - 1],
            '14assessment': allAssessments[m14?.dataValues.assessment_id - 1],
            '15assessment': allAssessments[m15?.dataValues.assessment_id - 1],
            '16assessment': allAssessments[m16?.dataValues.assessment_id - 1],
            '17assessment': allAssessments[m17?.dataValues.assessment_id - 1],
            '18assessment': allAssessments[m18?.dataValues.assessment_id - 1],
            '19assessment': allAssessments[m19?.dataValues.assessment_id - 1],
            '20assessment': allAssessments[m20?.dataValues.assessment_id - 1],
            '21assessment': allAssessments[m21?.dataValues.assessment_id - 1],
            '22assessment': allAssessments[m22?.dataValues.assessment_id - 1],
            '23assessment': allAssessments[m23?.dataValues.assessment_id - 1],
            '24assessment': allAssessments[m24?.dataValues.assessment_id - 1],
            '1manner': MMarks[n1?.dataValues.manner_id - 1],
            '2manner': MMarks[n2?.dataValues.manner_id - 1],
            '3manner': MMarks[n3?.dataValues.manner_id - 1],
            '4manner': MMarks[n4?.dataValues.manner_id - 1],
            '5manner': MMarks[n5?.dataValues.manner_id - 1],
            '6manner': MMarks[n6?.dataValues.manner_id - 1],
            '7manner': MMarks[n7?.dataValues.manner_id - 1],
            '8manner': MMarks[n8?.dataValues.manner_id - 1],
            '9manner': MMarks[n9?.dataValues.manner_id - 1],
            '10manner': MMarks[n10?.dataValues.manner_id - 1],
            '11manner': MMarks[n11?.dataValues.manner_id - 1],
            '1a': m1?.dataValues.home_work,
            '2a': m2?.dataValues.home_work,
            '3a': m3?.dataValues.home_work,
            '4a': m4?.dataValues.home_work,
            '5a': m5?.dataValues.home_work,
            '6a': m6?.dataValues.home_work,
            '7a': m7?.dataValues.home_work,
            '8a': m8?.dataValues.home_work,
            '9a': m9?.dataValues.home_work,
            '10a': m10?.dataValues.home_work,
            '11a': m11?.dataValues.home_work,
            '1b': m1?.dataValues.listening,
            '2b': m2?.dataValues.listening,
            '3b': m3?.dataValues.listening,
            '4b': m4?.dataValues.listening,
            '5b': m5?.dataValues.listening,
            '6b': m6?.dataValues.listening,
            '7b': m7?.dataValues.listening,
            '8b': m8?.dataValues.listening,
            '9b': m9?.dataValues.listening,
            '10b': m10?.dataValues.listening,
            '11b': m11?.dataValues.listening,
            '1c': m1?.dataValues.behavior,
            '2c': m2?.dataValues.behavior,
            '3c': m3?.dataValues.behavior,
            '4c': m4?.dataValues.behavior,
            '5c': m5?.dataValues.behavior,
            '6c': m6?.dataValues.behavior,
            '7c': m7?.dataValues.behavior,
            '8c': m8?.dataValues.behavior,
            '9c': m9?.dataValues.behavior,
            '10c': m10?.dataValues.behavior,
            '11c': m11?.dataValues.behavior,
        };
        fillPdfForm(inputPdfPath, `files\\${name}.pdf`, fieldData)
            .then(() => console.log('PDF filled successfully'))
            .catch((error) => console.error('Error:', error));
    })
}

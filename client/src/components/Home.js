import React, { useRef, useEffect, useContext, useState } from "react";
import { StatusContext, NameContext } from './context/Context';
import yudatatable from './table';
import { useCrudFunctions } from "../hooks/useCrudFunctions";
import { Dropdown } from 'primereact/dropdown';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { AutoComplete } from 'primereact/autocomplete';
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from 'primereact/progressspinner';
import { FileUpload } from 'primereact/fileupload';
import { Sidebar } from 'primereact/sidebar';
import { Avatar } from 'primereact/avatar';


const Home = () => {
    const context = useContext(StatusContext);
    const contextN = useContext(NameContext);
    const { getData, putData, deleteData, postData } = useCrudFunctions();
    const [class1, setClass1] = useState(null);
    const [subject, setSubject] = useState(null);
    const [items, setItems] = useState([]);
    const [dataf, setDataf] = useState();
    const [behavior, setBehavior] = useState([]);
    const [listening, setListening] = useState([]);
    const [hw, setHw] = useState([]);
    const [marks, setMarks] = useState([]);
    const [mark, setMark] = useState([]);
    const [assessments, setAssessments] = useState([]);
    const [assessment, setAssessment] = useState([]);
    const [students, setStudents] = useState();
    const [periodA, setPeriodA] = useState();
    const [periodB, setPeriodB] = useState();
    const [statusP, setStatusP] = useState(null);
    const [date, setDate] = useState();
    const [data, setData] = useState();
    const [m1, setm1] = useState([]);
    const [m2, setm2] = useState([]);
    const [m3, setm3] = useState([]);
    const [m4, setm4] = useState([]);
    const [m5, setm5] = useState([]);
    const [m6, setm6] = useState([]);
    const [m7, setm7] = useState([]);
    const [m8, setm8] = useState([]);
    const [m9, setm9] = useState([]);
    const [m10, setm10] = useState([]);
    const [m11, setm11] = useState([]);
    const [visible, setVisible] = useState()

    const abc = [{ letter: "א" }, { letter: "ב" }, { letter: "ג" }]
    let classes = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח"];
    let period = 1;
    const tableName = `תלמידי כיתה ${class1}`;
    const options = { selectableRows: "none", filterTypy: "dropdown" }
    const toast = useRef(null);
    const dropRef = useRef(null);

    let studentCalomns = [
        {
            name: `בחרי ציון ב${subject}`,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    let a = [...mark];
                    let val;
                    let x = tableMeta.rowIndex
                    if (data[x]) {
                        val = marks[data[x].mark_id]?.name;
                    }
                    else {
                        val = null;
                    }
                    return <Dropdown placeholder={val} value={mark[tableMeta.rowIndex]} onChange={(e) => (a[tableMeta.rowIndex] = e.value, setMark(a), setMark(a), console.log("11111111111mark", a))} options={marks} optionLabel="name" ></Dropdown>
                }
            }
        },
        {
            name: `בחרי הערכה ב${subject}`,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    let a = [...assessment];
                    let val;
                    let x = tableMeta.rowIndex
                    if (data[x]) {
                        val = assessments[data[x].assessment_id]?.name;
                    }
                    else {
                        val = null;
                    }
                    return <Dropdown placeholder={val} value={assessment[tableMeta.rowIndex]} onChange={(e) => (a[tableMeta.rowIndex] = e.value, setAssessment(a), setAssessment(a), console.log("2222222222222", a))} options={assessments} optionLabel="name" ></Dropdown>
                }
            }
        },
        {
            name: `התנהגות ב${subject}`,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    let a = [...behavior];
                    let val;
                    let x = tableMeta.rowIndex
                    console.log(data[x]);
                    if (data[x]) {
                        val = data[x].behavior;
                    }
                    else {
                        val = null;
                    }
                    return <Dropdown placeholder={val} value={behavior[tableMeta.rowIndex]} onChange={(e) => (a[tableMeta.rowIndex] = e.value, setBehavior(a), setBehavior(a))} options={abc} optionLabel="letter" ></Dropdown>
                }
            }
        },
        {
            name: `הקשבה ב${subject}`,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    let a = [...listening];
                    let val;
                    let x = tableMeta.rowIndex
                    if (data[x]) {
                        val = data[x].listening;
                    }
                    else {
                        val = null;
                    }
                    return <Dropdown placeholder={val} value={listening[tableMeta.rowIndex]} onChange={(e) => (a[tableMeta.rowIndex] = e.value, setListening(a), setListening(a))} options={abc} optionLabel="letter" ></Dropdown>
                }
            }
        },
        {
            name: `שיעורי בית ב${subject}`,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    let a = [...hw];
                    let val;
                    let x = tableMeta.rowIndex
                    if (data[x]) {
                        val = data[x].home_work;
                    }
                    else {
                        val = null;
                    }
                    return <Dropdown placeholder={val} value={hw[tableMeta.rowIndex]} onChange={(e) => (a[tableMeta.rowIndex] = e.value, setHw(a), setHw(a))} options={abc} optionLabel="letter" ></Dropdown>
                }
            }
        },
        {
            name: "first_name",
            label: "שם פרטי",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "last_name",
            label: "שם משפחה",
            options: {
                filter: true,
                sort: true,
            }
        },

    ]
    //יוצר רשימת כיתות א-ח
    const classSerch = (event) => {
        setItems(event.query ? [...Array(1).keys()].map(item => event.query + '-' + item) : classes);
    }
    //יוצר רשימת מקצועות
    const subjectSerch = async (event) => {
        let subjects = await getData("subjects");
        let newvalue = ["הליכות"];
        let sub = subjects.map(item => item.name);
        sub.unshift(...newvalue);
        console.log(sub);
        setItems(event.query ? [...Array(30).keys()].map(item => event.query + '-' + item) : sub);
    }
    //יוצר רשימת ציונים והערכות
    const marksSerch = async () => {
        let m = await getData("marks");
        m = m.map(item => ({ name: item.trim() }))
        console.log("before", m, marks);
        setMarks(m);
        console.log("after", m, marks);
        let a = await getData(`assessments/${subject}`);
        a = a.map(item => ({ name: item.trim() }))
        console.log("before", a, assessments);
        setAssessments(a);
        console.log("after", a, assessments);
        return;
    }
    //יוצר רשימת תלמידים בכיתה ומכניס לדאטה-אף
    const createTable = async () => {
        console.log("create table", assessments);
        let c = classes.indexOf(class1);
        let x = await getData(`students/${c}`);
        if (x) {
            setStudents(x);
            x.map(x => (x = { "first_name": x.first_name, "last_name": x.last_name }))
            setDataf(x)
        }
        return x;
    }
    //יוצר רשימת סטודנט פר סבג'קט
    const fechData = async (x) => {
        let a = [];
        x.map(async (row, index) => { a[index] = await getData(`sps/${row.first_name}/${row.last_name}/${subject}`); })
        return a;
    }
    //מציג שאלה האם לשמור
    const confirm = async () => {
        confirmDialog({
            message: "בלחיצה על אישור הנתונים הקודמים ידרסו וישמרו הנתונים הנוכחים. האם את רוצה לעדכן בכל אופן?",
            header: "עדכון הרשומות",
            accept: () => (accept(), setDataf(null)),
            reject: () => (reject(), setDataf(null))
        });
    }
    //מכניס נתונים לדאטה-בייס
    const accept = async () => {
        let dataObject = {};
        let x;
        if (subject == "הליכות") {
            data.map(async (row, index) => {
                if (row.length > 0) {
                    row.map(async (line, i) => {
                        let m = [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11];
                        if (m[line.manner_id - 1].length > 0) {
                            let mark = m[line.manner_id - 1][index];
                            m[line.manner_id - 1][index] = null;
                            if (mark) {
                                x = marks.findIndex(item => (item.name === mark.name))
                                dataObject = {
                                    period_id: period,
                                    mark_id: x + 1,
                                    manner_id: i + 1,
                                }
                                x = await putData(`spm/${line.id}`, dataObject)
                            }
                        }
                    })
                }
            })
            m1.map(async (m, i) => {
                if (m) {
                    x = marks.findIndex(item => (item.name === m.name));
                    dataObject = { student_id: students[i].id, period_id: period, mark_id: m ? x : null, manner_id: 1 }
                    const y = await postData(`spm/`, dataObject);
                    console.log(y, dataObject);
                }
            })
            m2.map(async (m, i) => {
                if (m) {
                    x = marks.findIndex(item => (item.name === m.name));
                    dataObject = { student_id: students[i].id, period_id: period, mark_id: m ? x : null, manner_id: 2 }
                    const y = await postData(`spm/`, dataObject);
                }
            })
            m3.map(async (m, i) => {
                if (m) {
                    x = marks.findIndex(item => (item.name === m.name));
                    dataObject = { student_id: students[i].id, period_id: period, mark_id: m ? x : null, manner_id: 3 }
                    console.log("dataObject", dataObject);
                    const y = await postData(`spm/`, dataObject);
                }
            })
            m4.map(async (m, i) => {
                if (m) {
                    x = marks.findIndex(item => (item.name === m.name));
                    dataObject = { student_id: students[i].id, period_id: period, mark_id: m ? x : null, manner_id: 4 }
                    const y = await postData(`spm/`, dataObject);
                }
            })
            m5.map(async (m, i) => {
                if (m) {
                    x = marks.findIndex(item => (item.name === m.name));
                    dataObject = { student_id: students[i].id, period_id: period, mark_id: m ? x : null, manner_id: 5 }
                    const y = await postData(`spm/`, dataObject);
                }
            })
            m6.map(async (m, i) => {
                if (m) {
                    x = marks.findIndex(item => (item.name === m.name));
                    dataObject = { student_id: students[i].id, period_id: period, mark_id: m ? x : null, manner_id: 6 }
                    const y = await postData(`spm/`, dataObject);
                }
            })
            m7.map(async (m, i) => {
                if (m) {
                    x = marks.findIndex(item => (item.name === m.name));
                    dataObject = { student_id: students[i].id, period_id: period, mark_id: m ? x : null, manner_id: 7 }
                    const y = await postData(`spm/`, dataObject);
                }
            })
            m8.map(async (m, i) => {
                if (m) {
                    x = marks.findIndex(item => (item.name === m.name));
                    dataObject = { student_id: students[i].id, period_id: period, mark_id: m ? x : null, manner_id: 8 }
                    const y = await postData(`spm/`, dataObject);
                }
            })
            m9.map(async (m, i) => {
                if (m) {
                    x = marks.findIndex(item => (item.name === m.name));
                    dataObject = { student_id: students[i].id, period_id: period, mark_id: m ? x : null, manner_id: 9 }
                    const y = await postData(`spm/`, dataObject);
                }
            })
            m10.map(async (m, i) => {
                if (m) {
                    x = marks.findIndex(item => (item.name === m.name));
                    dataObject = { student_id: students[i].id, period_id: period, mark_id: m ? x : null, manner_id: 10 }
                    const y = await postData(`spm/`, dataObject);
                }
            })
            m11.map(async (m, i) => {
                if (m) {
                    x = marks.findIndex(item => (item.name === m.name));
                    dataObject = { student_id: students[i].id, period_id: period, mark_id: m ? x : null, manner_id: 11 }
                    const y = await postData(`spm/`, dataObject);
                }
            })

        }
        else {
            data.map(async (row, index) => {
                if (row) {
                    dataObject = {
                        period_id: period,
                        mark_id: mark[index] ? marks.findIndex(ob => ob.name == mark[index].name) + 1 : null,
                        assessment_id: assessment[index] ? assessments.findIndex(ob => ob.name == assessment[index].name) + 1 : null,
                        behavior: behavior[index]?.letter ? behavior[index]?.letter : null,
                        listening: listening[index]?.letter ? listening[index]?.letter : null,
                        home_work: hw[index]?.letter ? hw[index]?.letter : null
                    }
                    console.log("dataObj", dataObject);
                    const x = await putData(`sps/${row.id}`, dataObject);
                }
                else {
                    const subject_id = await getData(`subjects/${subject}`);
                    // const student_id = await getData(`students/${dataf[index].first_name}/${dataf[index].last_name}`);
                    if (mark[index] || assessment[index] || behavior[index] || listening[index] || hw[index]) {
                        dataObject = {
                            student_id: students[index].id,
                            subject_id: subject_id.id,
                            period_id: period,
                            mark_id: mark[index] ? marks.findIndex(ob => ob.name == mark[index].name) + 1 : null,
                            assessment_id: assessment[index] ? assessments.findIndex(ob => ob.name == assessment[index].name) + 1 : null,
                            behavior: behavior[index]?.letter,
                            listening: listening[index]?.letter,
                            home_work: hw[index]?.letter
                        }
                        const x = await postData(`sps/`, dataObject);
                    }
                }
            })
        }

        setAssessment([]); setBehavior([]); setHw([]); setListening([]); setMark([]); setData(null); setm1([]); setm2([]); setm3([]); setm4([]); setm5([]); setm6([]); setm7([]); setm8([]); setm9([]); setm10([]); setm11([]);
        toast.current.show({ severity: 'info', summary: 'הציונים נשמרו בהצלחה', detail: 'הציונים נוספו למאגר הנתונים', life: 3000 })
    }
    //מבטל
    const reject = () => {
        setData(null); setAssessment([]); setBehavior([]); setHw([]); setListening([]); setMark([]);
        toast.current.show({ severity: 'warn', summary: 'השינויים בוטלו', life: 3000 })
    }
    //בודק תקינות של פלטים ומפעיל את המערכת
    const StartRun = async () => {
        if (!subject)
            toast.current.show({ severity: 'warn', summary: 'לא נבחר מקצוע', detail: 'בחרי מקצוע ואחר לחצי לאישור', life: 3000 })
        else if (!class1)
            toast.current.show({ severity: 'warn', summary: 'לא נבחר כיתה', detail: 'בחרי כיתה ואחר לחצי לאישור', life: 3000 })
        else if (subject == "הליכות") {
            await mannersMarksSerch();
            let x = await createTable();
            let a = await fechMannersData(x);
            return setData(a);
        }
        else {
            await marksSerch();
            let x = await createTable();
            let a = await fechData(x);
            setData(a);
        }
    }

    let mannersColumns = [{
        name: "התנהגות בתפילה",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta) => {
                let m = [...m1];
                let val;
                if (data[tableMeta.rowIndex]) {
                    data[tableMeta.rowIndex].map((row, index) => {
                        if (row.manner_id == 1) {
                            val = marks[row.mark_id - 1]?.name;
                        }
                    })
                }
                else {
                    val = null;
                }
                return <Dropdown placeholder={val} value={m1[tableMeta.rowIndex]} onChange={(e) => (m[tableMeta.rowIndex] = e.value, setm1(m), setm1(m), console.log(m, m1))} options={marks} optionLabel="name" ></Dropdown>
            }
        }
    },
    {
        name: "מתנהגת בדרך ארץ",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta) => {
                let m = [...m2];
                let val;
                if (data[tableMeta.rowIndex]) {
                    data[tableMeta.rowIndex].map((row, index) => {
                        if (row.manner_id == 2) {
                            val = marks[row.mark_id - 1]?.name;
                        }
                    })
                }
                else {
                    val = null;
                }
                return <Dropdown placeholder={val} value={m2[tableMeta.rowIndex]} onChange={(e) => (m[tableMeta.rowIndex] = e.value, setm2(m), setm2(m), console.log(m, m2))} options={marks} optionLabel="name" ></Dropdown>
            }
        }
    },
    {
        name: "יחסה לחברות",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta) => {
                let m = [...m3];
                let val;
                if (data[tableMeta.rowIndex]) {
                    data[tableMeta.rowIndex].map((row, index) => {
                        if (row.manner_id == 3) {
                            val = marks[row.mark_id - 1]?.name;
                        }
                    })
                }
                else {
                    val = null;
                }
                return <Dropdown placeholder={val} value={m3[tableMeta.rowIndex]} onChange={(e) => (m[tableMeta.rowIndex] = e.value, setm3(m), setm3(m), console.log(m, m3))} options={marks} optionLabel="name" ></Dropdown>
            }
        }
    },
    {
        name: "מקבלת תפקידים ומבצעת כהלכה",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta) => {
                let m = [...m4];
                let val;
                if (data[tableMeta.rowIndex]) {
                    data[tableMeta.rowIndex].map((row, index) => {
                        if (row.manner_id == 4) {
                            val = marks[row.mark_id - 1]?.name;
                        }
                    })
                }
                else {
                    val = null;
                }
                return <Dropdown placeholder={val} value={m4[tableMeta.rowIndex]} onChange={(e) => (m[tableMeta.rowIndex] = e.value, setm4(m), setm4(m), console.log(m, m4))} options={marks} optionLabel="name" ></Dropdown>
            }
        }
    },
    {
        name: "ציות לתקנון בית הספר",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta) => {
                let m = [...m5];
                let val;
                if (data[tableMeta.rowIndex]) {
                    data[tableMeta.rowIndex].map((row, index) => {
                        if (row.manner_id == 5) {
                            val = marks[row.mark_id - 1]?.name;
                        }
                    })
                }
                else {
                    val = null;
                }
                return <Dropdown placeholder={val} value={m5[tableMeta.rowIndex]} onChange={(e) => (m[tableMeta.rowIndex] = e.value, setm5(m), setm5(m), console.log(m, m5))} options={marks} optionLabel="name" ></Dropdown>
            }
        }
    },
    {
        name: "ספריה ומחברותיה נקיים ומסודרים",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta) => {
                let m = [...m6];
                let val;
                if (data[tableMeta.rowIndex]) {
                    data[tableMeta.rowIndex].map((row, index) => {
                        if (row.manner_id == 6) {
                            val = marks[row.mark_id - 1]?.name;
                        }
                    })
                }
                else {
                    val = null;
                }
                return <Dropdown placeholder={val} value={m6[tableMeta.rowIndex]} onChange={(e) => (m[tableMeta.rowIndex] = e.value, setm6(m), setm6(m), console.log(m, m6))} options={marks} optionLabel="name" ></Dropdown>
            }
        }
    },
    {
        name: "ספריה ומחברותיה מצויים כנדרש",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta) => {
                let m = [...m7];
                let val;
                if (data[tableMeta.rowIndex]) {
                    data[tableMeta.rowIndex].map((row, index) => {
                        if (row.manner_id == 7) {
                            val = marks[row.mark_id - 1]?.name;
                        }
                    })
                }
                else {
                    val = null;
                }
                return <Dropdown placeholder={val} value={m7[tableMeta.rowIndex]} onChange={(e) => (m[tableMeta.rowIndex] = e.value, setm7(m), setm7(m), console.log(m, m7))} options={marks} optionLabel="name" ></Dropdown>
            }
        }
    },
    {
        name: "מקשיבה בשיעורים",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta) => {
                let m = [...m8];
                let val;
                if (data[tableMeta.rowIndex]) {
                    data[tableMeta.rowIndex].map((row, index) => {
                        if (row.manner_id == 8) {
                            val = marks[row.mark_id - 1]?.name;
                        }
                    })
                }
                else {
                    val = null;
                }
                return <Dropdown placeholder={val} value={m8[tableMeta.rowIndex]} onChange={(e) => (m[tableMeta.rowIndex] = e.value, setm8(m), setm8(m), console.log(m, m8))} options={marks} optionLabel="name" ></Dropdown>
            }
        }
    },
    {
        name: "משתתפת בשיעורים",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta) => {
                let m = [...m9];
                let val;
                if (data[tableMeta.rowIndex]) {
                    data[tableMeta.rowIndex].map((row, index) => {
                        if (row.manner_id == 9) {
                            val = marks[row.mark_id - 1]?.name;
                        }
                    })
                }
                else {
                    val = null;
                }
                return <Dropdown placeholder={val} value={m9[tableMeta.rowIndex]} onChange={(e) => (m[tableMeta.rowIndex] = e.value, setm9(m), setm9(m), console.log(m, m9))} options={marks} optionLabel="name" ></Dropdown>
            }
        }
    },
    {
        name: "מכינה שיעורי בית",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta) => {
                let m = [...m10];
                let val;
                if (data[tableMeta.rowIndex]) {
                    data[tableMeta.rowIndex].map((row, index) => {
                        if (row.manner_id == 10) {
                            val = marks[row.mark_id - 1]?.name;
                        }
                    })
                }
                else {
                    val = null;
                }
                return <Dropdown placeholder={val} value={m10[tableMeta.rowIndex]} onChange={(e) => (m[tableMeta.rowIndex] = e.value, setm10(m), setm10(m), console.log(m, m10))} options={marks} optionLabel="name" ></Dropdown>
            }
        }
    },
    {
        name: "שמירת הזמנים",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta) => {
                let m = [...m11];
                let val;
                if (data[tableMeta.rowIndex]) {
                    data[tableMeta.rowIndex].map((row, index) => {
                        if (row.manner_id == 11) {
                            val = marks[row.mark_id - 1]?.name;
                        }
                    })
                }
                else {
                    val = null;
                }
                return <Dropdown placeholder={val} value={m11[tableMeta.rowIndex]} onChange={(e) => (m[tableMeta.rowIndex] = e.value, setm11(m), setm11(m), console.log("11", m, m11))} options={marks} optionLabel="name" ></Dropdown>
            }
        }
    },
    {
        name: "first_name",
        label: "שם פרטי",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "last_name",
        label: "שם משפחה",
        options: {
            filter: true,
            sort: true,
        }
    },
    ]

    //יוצר רשימת הליכות וציונים
    const mannersMarksSerch = async () => {
        let m = await getData("mannersMarks");
        m = m.map(item => ({ name: item }))
        setMarks(m);
        let a = await getData("manners");
        a = a.map(item => ({ name: item }))
        setAssessments(a)
        return;
    }

    //יוצר רשימת סטודנט פר מנרס
    const fechMannersData = async (x) => {
        let a = [];
        x.map(async (row, index) => {
            a[index] = await getData(`spm/${row.first_name}/${row.last_name}`);
        })
        console.log("data", a);
        return a;
    }

    const fetchDataFromDatabase = async () => { }

    // const updateReportWithData = async () => {
    //     const data = await fetchDataFromDatabase();

    //     // Update the placeholders with the fetched data
    //     document.getElementById('torahScore').textContent = data.torahScore;
    //     // Update other cells as needed
    // };

    const print = async () => {
        const semestere = [{ letter: "א" }, { letter: "ב" }];
        setDate(null); setPeriodA(null); setPeriodB(null);
        confirmDialog({
            message: <> <InputText placeholder="הכניסי את תאריך חלוקת התעודות" value={date} onChange={(e) => (console.log(e), setDate(e.target.value))} />
                <br /><br />
                <InputText placeholder="שנה'" value={periodB} onChange={(e) => ((console.log(e), setPeriodB(e.target.value)))} />
                <br /><br />
                <Dropdown placeholder="מחצית א'/ב'" value={periodA} onChange={(e) => ((console.log(e), setPeriodA(e.target.value)))} options={semestere} optionLabel="letter" />
                <br /><br /></>,
            header: "הדפסת התעודות",
            accept: () => (setStatusP(1)),
            reject: () => (reject(), setDate(null))
        });
    }

    const printFile = async () => {
        const a = await getData(`file/${date}/${periodA.letter}/${periodB}`);
        if (a) {
            setStatusP(null); setAssessment([]); setBehavior([]); setHw([]); setListening([]); setDate(null); setPeriodA(null); setPeriodB(null); setMark([]); setData(null); setm1([]); setm2([]); setm3([]); setm4([]); setm5([]); setm6([]); setm7([]); setm8([]); setm9([]); setm10([]); setm11([]);
            toast.current.show({ severity: 'info', summary: 'התעודות נשמרו בהצלחה', life: 3000 })
        }
    }

    useEffect(() => {
        if (periodA) {
            console.log("858585858", date, periodA, periodB);
            printFile();
        }
    }, [periodA]);

    const upload = async (event) => {
        if ("C:/נתונים/מורות.xlsx") {
            const body = { "fileName": "C:/נתונים/מורות.csv" }
            const a = await postData("teachers", body)
            console.log("00000000000",a);
        }
        if ("C:/נתונים/תלמידות.xlsx") {
            const body = { "fileName": "C:/נתונים/תלמידות.xlsx" }
            const a = await postData("students", body)
            console.log("1111111111",a);
        }
        if ("C:/נתונים/הערכות.xlsx") {
            const body = { "fileName": "C:/נתונים/הערכות.xlsx" }
            const a = await postData("assessments", body)
            console.log("2222222222",a);
        }
        console.log("ppppppppppppppppppp", event);
        const body = { "fileName": event?.target?.files[0]?.selectableFile }
        const a = postData("teachers", body)
        toast.current?.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    const op = useRef(null);
    return (<>
        <Toast ref={toast} position="top-center" />
        <ConfirmDialog />
        {statusP == 1 ? <ProgressSpinner /> :
            data && subject != "הליכות" ? <>
                <Button onClick={() => (setData(null), setSubject(null), setClass1(null))} label="חזרה בלי שמירה" />{"                   "}
                <Button onClick={() => confirm()} label="עדכון הרשומות" />{"                   "}
                <Button onClick={() => { marksSerch(); console.log(data); }} label="לחצי כאן כדי לראות את הציונים שכבר שמורים" />
                {yudatatable(dataf, studentCalomns, options, tableName)}
                <Button onClick={() => confirm()} label="עדכון הרשומות" />
            </> : data && subject == "הליכות" ? <>
                <Button onClick={() => (setData(null), setSubject(null), setClass1(null))} label="חזרה בלי שמירה" />{"                   "}
                <Button onClick={() => confirm()} label="עדכון הרשומות" />{"                   "}
                <Button onClick={() => { console.log(data); mannersMarksSerch(); }} label="לחצי כאן כדי לראות את הציונים שכבר שמורים" />
                {yudatatable(dataf, mannersColumns, options, tableName)}
            </> : <>
                <div className="form">
                    <Button className="left" onClick={() => print()} label="הדפסת תעודות" />
                    <br /><br /><br />
                    <Sidebar visible={visible} onHide={() => setVisible(false)} ref={op}>
                        <h2>הזנת נתונים</h2>
                        <p>
                            לצורך העלת הנתונים אנא וודאי שהקבצים נמצאים בכונן
                            <br />
                            "בתוך תיקיה בשם "נתונים C
                            <br />
                            <br />
                            :שמות ומבני הקבצים המועלים צריכים להיות
                            <br />
                            "מורות.xlsx"
                            <br />
                            A- שם פרטי ומשפחה
                            <br />
                            B-פלאפון
                            <br />
                            C-מספר זהות
                            <br />
                            <br />
                            "תלמידות.xlsx"
                            <br />
                            A-שם פרטי
                            <br />
                            B-שם משפחה
                            <br />
                            C-מספר מחזור
                            <br />
                            D-שנת התחלה
                            <br />
                            <br />
                            "הערכות.xlsx"
                            <br />
                            A- מקצוע
                            <br />
                            B- הערכה
                            <br />
                        </p>
                        <h5>לעדכון הנתונים אחרי וידוא תקינות לחצי על אישור</h5>
                        <Button label="אישור" onClick={() =>{ setVisible(false);upload()}} />
                    </Sidebar>
                    <Button className="left" label="הזנת נתונים למערכת" onClick={() => setVisible(true)} />
                    {/* <FileUpload className="left" mode="basic" name="demo[]" url="/api/upload" accept="csv/*" chooseLabel="העלאת קובץ מורות" maxFileSize={1000000} onUpload={()=>(onUpload())} /> */}
                    <br /><br />
                    <h1>שלום למורה {contextN?.name}</h1>
                    <AutoComplete placeholder="בחרי מקצוע" value={subject} suggestions={items} completeMethod={subjectSerch} onChange={(e) => setSubject(e.value)} dropdown /> <>{"             "}</>
                    <AutoComplete placeholder="בחרי כיתה" value={class1} suggestions={items} completeMethod={classSerch} onChange={(e) => setClass1(e.value)} dropdown />
                    <br /><br />
                    <Button label={"אישור"} onClick={async () => { StartRun() }}></Button>
                    <br /><br />
                </div>
            </>}

    </>)


};
export default Home 
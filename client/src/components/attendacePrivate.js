import React, { useState, useContext, useEffect, useRef } from "react";
import { useCrudFunctions } from "../hooks/useCrudFunctions";
import Context from "./context/Context"
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Calendar } from 'primereact/calendar';
import { Card } from 'primereact/card';
import CardA from './card';
import yudatatable from './table';
import { Toast } from 'primereact/toast';



export default function AttendacePrivate(props) {
    const [UseCalender, setUseCalender] = useState();
    const [names, setNames] = useState();
    const [data, setData] = useState();
    const [date, setDate] = useState();
    const [table, setTable] = useState();
    const [title, setTitle] = useState();
    const menu1 = useRef(null);
  const toast = useRef(null);
    const { putData, getData } = useCrudFunctions()
    const context = useContext(Context);
    const options = { selectableRows: "none", filterTypy: "dropdown" }

    const out = [{
        label: 'לקבלת דווח נוכחות',
        command: () => { func(`attendance/${context.id}`, 1, "נוכחות") }
    },
    {
        label: 'לקבלת הנוכחות האחרונה',
        command: () => { func(`attendance/last/${context.id}`, 2, "נוכחות אחרונה") }
    },
    {
        label: 'בחר נוכחות על פי תאריך',
        command: () => { setUseCalender(1) }
    }]
    const func = async (url, tp, ttl) => {
        let res = await getData(url);
        try {
            let x = res.response.status
            let err = res.message;
            toast.current.show({ severity: 'info', summary: 'לא נמצאו פריטים תואמים' })
        }
        catch {
            if (res.length == 0) {
                toast.current.show({ severity: 'info', summary: 'לא נמצאו פריטים תואמים' })
              }
            if (tp == 4) {
                setNames(["קוד שכר", "סכום לשעה", "השתתפות בנסיעות", "פנסיה", "מספר זהות"])
            }
            else
                setNames(["קוד נוכחות", "מספר זהות", "תאריך", "שעת כניסה", "שעת יציאה"])
            let arr = []
            if (tp == 1) {
                res.forEach(element => {
                    arr.push(Object.values(element));
                });
                setTitle(ttl)
                setTable(arr)
            }
            else {
                arr = Object.values(res)
                setTitle(ttl)
                setData(arr)
            }
        }
    }

    return (
        <>
            <Toast ref={toast} />

            {table ? <> {yudatatable(table, names, options, title)}
                <Button label="חזרה" rounded onClick={() => (setTable(null), setTitle(null), setNames(null))} />
            </> :
                data ? <> <CardA list={names} attend={data} title={title} />
                    <Button label="חזרה" rounded onClick={() => (setData(null), setTitle(null), setUseCalender(null), setDate(null), setNames(null))} /></> :
                    <>
                        {context.status == 1 || context.status == 2 ? <Button label="לדרישות שכר" rounded onClick={() => { func(`determination/${context.id}`, 4, "דרישות שכר") }} /> : <></>}
                        {<><Menu model={out} popup ref={menu1} />
                            <Button label="נוכחות" icon="pi pi-bars" onClick={(e) => menu1.current.toggle(e)} />  </>}
                        {UseCalender ? <Calendar value={date} onChange={(e) => { setDate(`${e.target.value.getFullYear()}/${e.target.value.toLocaleString("en-US", { month: "2-digit" })}/${e.target.value.toLocaleString("en-US", { day: "2-digit" })}`) }} showButtonBar placeholder="בחר תאריך" /> : <></>}
                        {date ? <Button label="אישור" rounded onClick={() => { func(`attendance/calender/${context.id}/${date}`, 3, `נוכחות ליום ${date}`) }} /> : <></>}
                        <CardA p={props.p} s={props.s} title={props.title}></CardA>
                    </>}
        </>)
}
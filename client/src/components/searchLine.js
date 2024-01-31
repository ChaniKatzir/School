import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';

export default function SearchLine(props) {
    const [date, setDate] = useState(null);

    const onChange = (selected, key) => {
        props.setObjUser((prev) => ({ ...prev, [key]: selected }))
    }
    return (
    <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex-auto" id={props.id}>
            <label className="font-bold block mb-2">
                {props.name}
            </label>
            {props.name == 'תאריך' ? <><Calendar value={date} key={props.counter} id={props.id} keyfilter={props.type} className="w-full" onChange={(e) => { if (props.type == 'int') onChange(parseInt(e.target.value), props.id); else onChange(e.target.value, props.id) }} showButtonBar /></> :
                <><InputText key={props.counter} id={props.id} keyfilter={props.type} placeholder={props.placeHolder} useGrouping={false} className="w-full" onChange={(e) => { setDate(e.value); if (props.type == 'int') onChange(parseInt(e.target.value), props.id); else onChange(e.target.value, props.id) }} />
                </>}
        </div>
    </div>
    )
}

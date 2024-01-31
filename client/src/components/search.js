
import React from 'react'; 
import { InputText } from "primereact/inputtext";

export default function Search(props) {
    return (
        <div className="card flex flex-wrap justify-content-center gap-3">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText placeholder={props.placeholder} />
            </span>
        </div>
    )
}
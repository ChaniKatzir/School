import React, { useContext } from "react";
import { StatusContext, NameContext } from './context/Context';


const Class = () => {
    const context = useContext(StatusContext);
    return (<>
        {context && (
        context.status == 1 ? <>,
        </> :
        <>
        </> )
        }
    </>)
};
export default Class
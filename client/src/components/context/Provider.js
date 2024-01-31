import { useState, useEffect } from "react";
import { StatusContext, NameContext } from './Context';

const UserProvider = ({ children, statusP, nameP }) => {
  const [name, setName] = useState();
  const [status, setStatus] = useState();

  useEffect(() => {
    setName(nameP);
    setStatus(statusP);
  }, [nameP]);

  return (<>
    <StatusContext.Provider value={status}>
      <NameContext.Provider value={name}>
        {children}
      </NameContext.Provider>
    </StatusContext.Provider>
  </>

  );
}
export default UserProvider;
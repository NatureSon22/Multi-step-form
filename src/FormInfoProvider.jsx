import { createContext, useContext, useState } from "react"

const InfoProvider = createContext();

const FormInfoProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({});
    const [plan, setPlan] = useState({});
    const [addOns, setAddOns] = useState([]);

    const value = {
        userInfo,
        setUserInfo,
        plan,
        setPlan,
        addOns,
        setAddOns
    }

    return (
        <InfoProvider.Provider value={value} >
            {children}
        </InfoProvider.Provider>
    )
}

export const useInfoProvider = () => useContext(InfoProvider);

export default FormInfoProvider;

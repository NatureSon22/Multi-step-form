import { useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";
import '../../css/add.css'
import ServiceOption from "./ServiceOption";
import { INFO, PRICEADD } from "../../data";

const AddPage = () => {
    const navigate = useNavigate();
    const [handleClick] = useOutletContext();
    const [checkbox, setCheckBox] = useState(() => {
        return (JSON.parse(sessionStorage.getItem('checkbox')) ||
        { 
            checkbox0: false,
            checkbox1: false,
            checkbox2: false
        })
    })


    const handleStep = (path, refNum) => {
        navigate(path);
        handleClick(refNum);
    }

    const handleCheck = (refNum) => {
        setCheckBox((prev) => {
            let currentPrev = {...prev}; 
            currentPrev = { 
                ...prev,
                [`checkbox${refNum}`]: !currentPrev[`checkbox${refNum}`]
            }
            sessionStorage.setItem('checkbox', JSON.stringify(currentPrev));
            return currentPrev;
        })
    }

    return (
        <div className="form--add form--wrap">
            <div className="form--header">
                <h1>Pick add-ons</h1>
                <p>Add-ons help enhance your gaming experience</p>
            </div>

            <div className="form--more">
                {INFO.map((info, index) => (
                    <ServiceOption 
                        key={index} 
                        label={info.label} 
                        description={info.desc}  
                        price={PRICEADD[index]} 
                        handleCheck={handleCheck} 
                        index={index}
                        isCheck={checkbox[`checkbox${index}`]} 
                    />
                ))}
            </div>

            <div className="form--buttons form--submit">
                <button className="sub--btn" onClick={() => handleStep('/plan', 1)} >Go Back</button>
                <button className="main--btn" onClick={() => handleStep('/summary', 3)} >Next Step</button>
            </div>
        </div>
    )
}

export default AddPage
import { useNavigate, useOutletContext } from "react-router-dom"
import { Link } from "react-router-dom";
import "../../css/summary.css"
import { useInfoProvider } from "../../FormInfoProvider";
import AddOn from "./AddOn";
import emailjs from '@emailjs/browser'
import Loading from '../../components/Loading'
import { useState } from "react";

const SummaryPage = () => {
    const [ load, setLoad ] = useState(false);
    const navigate = useNavigate();
    const [ handleClick ] = useOutletContext();
    const { userInfo, plan, addOns } = useInfoProvider();
    const addOnsTotal = addOns.reduce((acc, obj) => acc + obj.priceAdd, 0);
    const total = addOnsTotal + plan.price;

    const handleSubmit = async () => {
        const serviceId = import.meta.env.VITE_SERVICE_ID;
        const templateId = import.meta.env.VITE_TEMPLATE_ID;
        try {
            await emailjs.send(
                serviceId, 
                templateId,
                {
                    recipient: userInfo.email
                } 
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleStep = (path, refNum) => {
        if (refNum === 2) {
            navigate(path);
            handleClick(refNum);
        }
    
        if (refNum === 3) {
            setLoad(prev => !prev);

            setTimeout(() => {
                setLoad(prev => !prev);
                navigate(path);
                handleClick(refNum);
                handleSubmit();
                sessionStorage.clear();
            }, 2500);
        }
    }
    

    return (
        <>
            { load && <Loading></Loading> }
            <div className="form--summary form--wrap">
            <div className="form--header">
                <h1>Finishing up</h1>
                <p>Double-check everything looks OK before confirming.</p>
            </div>

            <div className="form--total" >
                <div className="form--item total--main">
                    <div className="total--main">
                        <p>{plan.tier} ({plan.type == "mo" ? "Monthly" : "Yearly"})</p>
                        <Link onClick={() => handleClick(1)} className="plan--change" to="/plan" >Change</Link>
                    </div>
                    <p className="total--plan" >${plan.price}/{plan.type}</p>
                </div>

                <hr />

                {
                    addOns.map((obj, index) => <AddOn info={obj} key={index} ></AddOn> )
                }

                <div className="form--total_summary">
                    <p>Total (per { plan.type == "mo" ? "month" : "year"})</p>
                    <p>${total}/{plan.type}</p>
                </div>
            </div>

            <div className="form--buttons form--submit">
                <button className="sub--btn" onClick={() => handleStep('/add', 2)} >Go Back</button>
                <button className="main--btn" onClick={() => handleStep('/success', 3)}>Confirm</button>
            </div>        
        </div>
        </>
    )
}

export default SummaryPage
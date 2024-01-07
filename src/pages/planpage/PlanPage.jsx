import arcade from '../../../assets/images/arcade.svg'
import advanced from '../../../assets/images/icon-advanced.svg'
import pro from '../../../assets/images/icon-pro.svg'
import { useNavigate, useOutletContext } from "react-router-dom";
import '../../css/plan.css'
import { useEffect, useState } from 'react';
import { useInfoProvider } from '../../FormInfoProvider';
import Tier from './Tier';
import { PRICEADD, PRICE } from '../../data';

const ICONS = [arcade, advanced, pro]

const PlanPage = () => {
    const navigate = useNavigate();
    const {plan, addOns, setAddOns, setPlan} = useInfoProvider();
    const [handleClick] = useOutletContext();
    const [toggle, setToggle] = useState(() => {
        return (
            JSON.parse(sessionStorage.getItem('toggle')) || false
        )
    });
    const [label, setLabel] = useState(() => {
        return (
            parseInt(sessionStorage.getItem('label')) || 0
        )
    });
    const [tier, setTier] = useState(() => {
        return (
            parseInt(sessionStorage.getItem('clickNum')) || 0
        )
    });

    useEffect(() => {
        setPlan({tier: PRICE[0].tier, price: !toggle ? PRICE[0].monthly : PRICE[0].yearly, type: !toggle ? "mo" : "yr"  });
    }, [])

    useEffect(() => {
        if (addOns && plan) {
            setAddOns((prev) => {
                return prev.map((obj, index) => {
                    let temp = { ...obj };
                    if (obj.type === "mo" && plan.type === "yr") {
                        temp = { ...temp, priceAdd: PRICEADD[index].yearly, type: "yr" };
                    } else if (obj.type === "yr" && plan.type === "mo") {
                        temp = { ...temp, priceAdd: PRICEADD[index].monthly, type: "mo" };
                    }
                    return temp;
                });
            });
        }
    }, [plan.type]);
    

    const handleStep = (path, ref) => {
        navigate(path);
        handleClick(ref);
    }

    const handleToggle = () => {
        setToggle(prev => {
            const newToggle = !prev;
            sessionStorage.setItem('toggle', JSON.stringify(newToggle));
            return newToggle;
        });
        setLabel(prev => {
            const newLabel = prev == 0 ? 1 : 0;
            sessionStorage.setItem('label', JSON.stringify(newLabel));
            return newLabel;
        })
    };

    return (
        <div className="form--plan form--wrap">
            <div className="form--header">
                <h1>Select your plan</h1>
                <p>You have the option of monthly or yearly billing</p>
            </div>

            <div className="form--tier">                
                {
                    PRICE.map((info, index) => {
                        return <Tier key={index} idx={index} imgSrc={ICONS[index]} tierName={info.tier} price={PRICE[index]} toggle={toggle} tier={tier} setTier={setTier} />
                    })
                }
            </div>

            <div className="form--toggle center">
                <div>
                    <p className={label === 0 ? "label" : ""} >Monthly</p>
                    <div className="main--toggle">
                        <div className={`circle ${toggle ? "toggle" : null}`} onClick={handleToggle} ></div>
                    </div>
                    <p className={label === 1 ? "label" : ""} >Yearly</p>
                </div>
            </div>

            <div className="form--submit">
                <button className='sub--btn' onClick={() => handleStep('/', 0)} >Go Back</button>
                <button className='main--btn' onClick={() => handleStep('/add', 2)} >Next Step</button>
            </div>
        </div>
    )
}

export default PlanPage
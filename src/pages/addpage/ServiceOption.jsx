import { useInfoProvider } from '../../FormInfoProvider';

const ServiceOption = (props) => {
    const {label, description, price, handleCheck, index, isCheck} = props;
    const {plan, setAddOns} = useInfoProvider();
    const priceAdd = plan.type === "mo" ? price.monthly : price.yearly;

    const handleAdd = () => {
        const addObj = { label, priceAdd, type: plan.type};
        setAddOns((prev) => {
            let currentPrev = prev ? [...prev] : [];
            
            const isFound = currentPrev.some(obj => 
                obj.label === addObj.label && obj.priceAdd === addObj.priceAdd
            );
            
            if (isFound) {
                currentPrev = currentPrev.filter(obj => 
                    obj.label !== addObj.label || obj.priceAdd !== addObj.priceAdd
                );
            } else {
                currentPrev.push(addObj); 
                currentPrev = currentPrev.map((obj) => {
                    if(obj.label === addObj.label) {
                        return {...obj, priceAdd: addObj.priceAdd};
                    }
                    return obj;
                });
            }

            return currentPrev;
        });
    }

    const handleClick = () => {
        handleCheck(index);
        handleAdd();
    }

    return (
        <div className={`form--service ${isCheck ? "checked" : null}`}>
            <div>
                <div className={`checkbox ${isCheck ? "checked" : null}`} onClickCapture={handleClick}></div>
                <div className="form--label">
                    <p>{label}</p>
                    <p>{description}</p>
                </div>
            </div>
            <p>+${priceAdd}/{plan.type}</p>
        </div>
    )
};

export default ServiceOption;

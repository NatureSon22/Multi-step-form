import { useEffect } from "react";
import { useInfoProvider } from "../../FormInfoProvider";

const Tier = (props) => {
    const {imgSrc, tierName, price, toggle, idx, tier, setTier} = props
    const {plan, setPlan} = useInfoProvider();
    let tierPrice = !toggle ? price.monthly : price.yearly;
    let tierType =  !toggle ? "mo" : "yr";

    useEffect(() => {
        if(plan !== null && plan.tier === tierName) {
            setPlan((prev) => ({...prev, price: tierPrice, type: tierType}));
        }
    }, [toggle])

    const setPlanType = () => {
        setPlan((prev) => ({...prev, price: tierPrice, type: tierType}));
    }

    const handleClick = () => {
        setTier(idx)
        setPlanType();
        sessionStorage.setItem('clickNum', JSON.stringify(idx));
    }

    return (
      <div className={idx === tier ? "clicked" : null} onClick={handleClick}>
        <div className='tier--img'>
          <img src={imgSrc} alt="" />
        </div>
        <div className='tier--info'>
          <p>{tierName}</p>
          <p>
            {
                !toggle ? `$${price.monthly}/mo` : `$${price.yearly}/yr`
            }
          </p>
          {toggle && <p>2 months free</p>}
        </div>
      </div>
    );
}

Tier.displayName = 'Tier';

export default Tier;

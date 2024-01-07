import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { useInfoProvider } from "../../FormInfoProvider";

const INPUT = {
    NAME: "input",
    EMAIL: "email",
    PHONE_NUMBER: "phone_number"
}

const ERROR = {
    EMPTY: "empty",
    INVALID: "invalid"
}

const PHONEREGEX = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
const EMAILREGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

const InfoPage = () => {
    const navigate = useNavigate();
    const [handleClick] = useOutletContext();
    const { setUserInfo } = useInfoProvider();
    const [nameInfo, setNameInfo] = useState({ name: '', isError: false, error: null });
    const [emailInfo, setEmailInfo] = useState({ email: '', isError: false, error: null });
    const [phoneNumberInfo, setPhoneNumberInfo] = useState({ phoneNumber: '', isError: false, error: null });


    useEffect(() => {
        const savedInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        if(savedInfo) {
            const { name, email, number } = savedInfo;
            setNameInfo((prev) => ({...prev, name: name}));
            setEmailInfo((prev) => ({ ...prev, email: email }));
            setPhoneNumberInfo((prev) => ({ ...prev, phoneNumber: number}))
        }
    }, [])

    const validateFields = () => {
        let hasError = false;
      
        const validateField = (field, regex, setError, errorType) => {
            if (!regex.test(field)) {
                setError((prev) => ({ ...prev, isError: true, error: errorType }));
                hasError = true;
            } else {
                setError((prev) => ({ ...prev, isError: false, error: null }));
            }
        };
      
        const emptyField = (fieldName, field, setError) => {
            if (field.length === 0) {
                setError((prev) => ({ ...prev, isError: true, error: ERROR.EMPTY }));
                hasError = true;
            } else {
                setError((prev) => ({ ...prev, isError: false, error: null }));
            }
        
            if (fieldName === 'email' && field.length > 0) {
                validateField(field, EMAILREGEX, setEmailInfo, ERROR.INVALID);
            }
        
            if (fieldName === 'phone' && field.length > 0) {
                validateField(field, PHONEREGEX, setPhoneNumberInfo, ERROR.INVALID);
            }
        };
      
        emptyField("name", nameInfo.name, setNameInfo);
        emptyField("email", emailInfo.email, setEmailInfo);
        emptyField("phone", phoneNumberInfo.phoneNumber, setPhoneNumberInfo);
      
        return hasError;
    };      
      

    const handleSubmit = (e) => {
        e.preventDefault();

        if(validateFields()) {
            return;
        }

        handleClick(1);
        setUserInfo((prev) => {
            const obj = { name: nameInfo.name, email: emailInfo.email, number: phoneNumberInfo.phoneNumber };
            sessionStorage.setItem('userInfo', JSON.stringify(obj));
            return obj;
        });
        navigate('/plan');
    }

    const handleInput = ({ type, val }) => {
        switch(type) {
            case INPUT.NAME:
                setNameInfo(prev => ({ ...prev, name: val }));
                break;
            case INPUT.EMAIL:
                setEmailInfo(prev => ({ ...prev, email: val }));
                break;
            case INPUT.PHONE_NUMBER:
                setPhoneNumberInfo(prev => ({ ...prev, phoneNumber: val }));
        }
    }

    return (
        <div className="form--info form--wrap">
            <div className="form--header">
                <h1>Personal Info</h1>
                <p>Please provide your name, email address, and phone number.</p>
            </div>

            <form className="form--main">
                <div className="form--field">
                    <div className="form--label">
                        <label htmlFor="user-name">Name</label>
                        {
                            (nameInfo.isError && nameInfo.error === ERROR.EMPTY) && <p className="label--error">This field is required</p>
                        }
                        
                    </div>
                    <input className={nameInfo.isError ? 'error' : null} type="text" id="user-name" placeholder="e.g. Stephen King"  value={nameInfo.name} onChange={(e) => handleInput({ type: INPUT.NAME, val: e.target.value })} autoComplete="name" />
                </div>

                <div className="form--field">
                    <div className="form--label">
                        <label htmlFor="email">Email Address</label>
                        {
                            emailInfo.isError ? 
                                (emailInfo.error === ERROR.EMPTY ? <p className="label--error">This field is required</p> : 
                                emailInfo.error === ERROR.INVALID ? <p className="label--error">Invalid email</p> : null)
                            : null
                        }
                    </div>
                    <input className={emailInfo.isError ? 'error' : null} type="text" id="email" placeholder="e.g. stephenking@lorem.com" value={emailInfo.email} onChange={(e) => handleInput({ type: INPUT.EMAIL, val: e.target.value })} autoComplete="on" />
                </div>

                <div className="form--field">
                    <div className="form--label">
                        <label htmlFor="phone">Phone Number</label>
                        {
                            phoneNumberInfo.isError ? 
                                (phoneNumberInfo.error === ERROR.EMPTY ? <p className="label--error">This field is required</p> : 
                                phoneNumberInfo.error === ERROR.INVALID ? <p className="label--error">Invalid phone number</p> : null)
                            : null
                        }
                    </div>
                    <input className={phoneNumberInfo.isError ? 'error' : null} type="text" id="phone" placeholder="e.g. + 1 234 567 890" value={phoneNumberInfo.phoneNumber} onChange={(e) => handleInput({ type: INPUT.PHONE_NUMBER, val: e.target.value })} />
                </div>
            </form>
            
            <div className="form--submit">
                    <input className="main--btn" type="submit" value={"Next Step"} onClick={handleSubmit} />
            </div>
        </div>
    )
}

export default InfoPage
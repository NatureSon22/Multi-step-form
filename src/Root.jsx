import { Outlet } from "react-router-dom"
import "./css/style.css"
import { useEffect, useState } from "react"
import FormInfoProvider from "./FormInfoProvider"
import { STEPTITLE } from "./data"
import FormStepItem from "./components/FormStepItem"
import emailjs from '@emailjs/browser'

const Root = () => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        emailjs.init(import.meta.env.VITE_EMAILJS_API_KEY)
    })

    const handleClick = (refNum) => {
        setStep(refNum);
    }

    return (
        <div className="wrapper">
            <div className="container">
                <div className="form--sidebar center">
                    <ul>
                        {
                            STEPTITLE.map(({title}, index) => {
                                return <FormStepItem key={index} stepNumber={index} title={title} step={step} ></FormStepItem>
                            })
                        }
                    </ul>
                </div>

                <div className="form--detail center">
                    <FormInfoProvider>
                        <Outlet context={[handleClick]} ></Outlet>
                    </FormInfoProvider>
                </div>
            </div>
        </div>
    )
}

export default Root
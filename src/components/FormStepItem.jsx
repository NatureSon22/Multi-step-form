const FormStepItem = (props) => {
    const { stepNumber, title, step } = props;
    return (
        <li>
            <div className={`form--link center ${stepNumber === step ? "clicked" : null}`}>
                <p>{stepNumber + 1}</p>
            </div>

            <div className="form--step">
                <p className="step--num">STEP {stepNumber + 1}</p>
                <p className="step--title">{title}</p>
            </div>
        </li>
    )
}

export default FormStepItem
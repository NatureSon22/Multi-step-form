import success from '../../../assets/images/icon-thank-you.svg'
import "../../css/success.css"

const Success = () => {
    return (
        <div className="form--success form--wrap center">
            <img src={success} alt="Success" />
            <h1>Thank you!</h1>
            <p>Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.</p>
        </div>
    )
}

export default Success
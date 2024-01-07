const AddOn = (props) => {
    const { label, priceAdd, type } = props.info

    return (
        <div className="form--item">
                <p>{label}</p>
                <p className="price" >+${priceAdd}/{type}</p>
        </div>
    )
}

export default AddOn
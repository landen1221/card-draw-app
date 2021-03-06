import './Card.css'

const Card = ({ image}) => {
    return (
        <div className="Card">
            <img src={image} alt=""/>
        </div>
    )
}

export default Card;
import { FaStarHalfAlt } from "react-icons/fa"; 
import { FaRegStar } from "react-icons/fa"; 
import { FaStar } from "react-icons/fa"; 
/* eslint-disable react/prop-types */

const Rating = ({value, text}) => {
  return (
    <div className="d-flex align-items-center">
        {Array.from([1,2,3,4,5]).map((_, id) => (
            <span key={id} className="text-warning">
                {value > id + 1? <FaStar /> : 
                value > id + 0.5 ? <FaStarHalfAlt /> :
                <FaRegStar />}
            </span>
        ))}
        <span className="ps-2 pt-1">{text && text} reviews</span>
    </div>
  )
}

export default Rating
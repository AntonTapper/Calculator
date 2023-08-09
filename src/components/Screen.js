import { TextFit } from "react-textfit";
import './Screen.css';

const Screen = ({ value }) => {
    return (
        <TextFit className="screen" mode="single" max={70}>
            {value}
        </TextFit>
    )
}
export default Screen
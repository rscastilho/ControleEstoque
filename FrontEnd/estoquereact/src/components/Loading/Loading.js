import React, { useState } from 'react'
import styles from './Loading.modules.css';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
// import PropagateLoader from "react-spinners/PropagateLoader";

const override ={
    display:"block",
    margin: "0 auto",
    borderColor: "red",
    width: "100px",
    top: "250px",
    
};



const Loading = ({ isLoading }) => {
    const [color] = useState("#84F10C")

    return (
            <ClimbingBoxLoader
                color={color}
                loading={isLoading}
                size={25}
                margin={100}
                speedMultiplier={1.5}
                css={override}
            />
    )
}

export default Loading
import React from "react";

import "./BarTop.scss";
import Logo from "../../../assets/img/png/LogoProvisorio.png";


export default function BarTop(){
    return(
        <img 
            className = "bar-top__logo"
            src = { Logo }
            alt = ""
        />
    )
}
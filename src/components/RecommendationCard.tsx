import { ReactNode } from "react";
import { NavLink } from "react-router-dom";



interface IProps {
    path : string;
    children : ReactNode;
    className?: string;
}
const RecommendationCard = ({path , children , className } : IProps) => {
    return (
        <NavLink to={path} className={`${className}`}>
            {children}
        </NavLink>
    )
}

export default RecommendationCard
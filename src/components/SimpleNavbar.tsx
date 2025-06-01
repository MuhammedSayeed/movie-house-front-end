import { Link } from "react-router-dom"


const SimpleNavbar = () => {
    return (
        <div className='flex justify-between items-center px-6 py-3'>
            <Link to={"/"}>
                <img className="w-[57px] min-w-[57px]" src="https://res.cloudinary.com/dndjbkrcv/image/upload/v1736884794/logo_vyce5m.png" />
            </Link>
        </div>
    )
}

export default SimpleNavbar
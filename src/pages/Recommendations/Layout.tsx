import { Outlet } from "react-router-dom"

const RecommendationsLayout = () => {
    return (
        <div className="h-screen px-6 grid grid-rows-[64px_1fr]">
            <div className=""></div>
            <div className="container mx-auto py-5">
                <Outlet />
            </div>
        </div>
    )
}

export default RecommendationsLayout
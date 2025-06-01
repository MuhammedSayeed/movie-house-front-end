
const BilboardSkeleton = () => {
    return (
        <div className="space-y-7 animate-pulse">
            <div className="w-[422px] h-[60px] bg-second/20 rounded-md"></div>
            <div className="space-y-2">
                <div className="w-[250px] h-[15px] bg-second/20 rounded-md"></div>
                <div className="w-[200px] h-[15px] bg-second/20 rounded-md"></div>
                <div className="w-[150px] h-[15px] bg-second/20 rounded-md"></div>
            </div>
            <div className="flex items-center gap-4 ">
                <div className="w-[43px] h-[28px] bg-second/20 rounded-md"></div>
                <div className="w-[49.14px] h-[29px] bg-second/20 rounded-md">
                    
                </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-[114.95px] h-[51px] bg-second/20 rounded-full"></div>
                <div className="w-[114.95px] h-[51px] bg-second/20 rounded-full"></div>
            </div>
        </div>
    )
}

export default BilboardSkeleton
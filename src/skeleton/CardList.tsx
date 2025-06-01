
const CardListSkeleton = () => {
  return (
    <div className="w-fit space-y-2 animate-pulse">
    <div className="rounded-md w-[171px] h-[256px] bg-second/20"></div>
    <div className="w-full flex justify-between ">
        <div className="bg-second/20 w-14 h-4 rounded-md"></div>
        <div className="bg-second/20 w-10 h-4 rounded-md"></div>
    </div>
    <div className="w-full flex justify-between">
        <div className="w-[77px] h-[28px] bg-second/20 rounded-md">
        </div>
        <div className="w-[39px] h-[24px] bg-second/20 rounded-md">
        </div>
    </div>
</div>
  )
}

export default CardListSkeleton
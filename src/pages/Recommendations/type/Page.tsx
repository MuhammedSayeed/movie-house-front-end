import RecommendationCard from "@/components/RecommendationCard";
import { Clapperboard, Tv } from "lucide-react";

const TypePage = () => {


  interface IType_Selection {
    label: string;
    icon: React.ReactNode;
    value: string;
  }

  const type_selections: IType_Selection[] = [
    { label: 'Movie', icon: <Clapperboard size={"35"} color="white" />, value: 'movie' },
    { label: 'Tv Show', icon: <Tv size={"35"} color="white" />, value: 'tv' },
  ]

  const renderTypes = type_selections.map(({ label, icon, value }) => (
    <RecommendationCard key={label} className="rounded-lg bg-second-dark min-w-[202px] px-6 py-6 flex items-center hover:scale-[1.05] transition-transform duration-300 ease-in-out" path={`/recommendations/${value}/genre`}>
      <div className="flex items-center gap-3">
        <div className="bg-second-extra-dark p-4 rounded-md">{icon}</div>
        <span className="text-white text-xl font-medium">{label}</span>
      </div>
    </RecommendationCard>

  ))

  return (
    <div className="space-y-6 mt-20 md:mt-52">
      <h1 className="text-3xl text-center text-white font-medium animate-pulse">Select Media Type</h1>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {renderTypes}
      </div>
    </div>
  )
}

export default TypePage
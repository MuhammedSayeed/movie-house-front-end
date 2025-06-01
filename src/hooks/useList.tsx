import { useCommon } from "./useCommon";



export const useList = () => {
  const { generateSkeletons } = useCommon();





  const RENDER_SKELETON = generateSkeletons(20, "cardList")


  return {
    RENDER_SKELETON
  }
}

import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import AuthLayout from "@/pages/auth/Layout";
import Signup from "@/pages/auth/signup/Page";
import ShowList from "@/pages/showList/Page";
import HomePage from "@/pages/Page";
import RootLayout from "@/pages/Layout";
import Login from "@/pages/auth/login/Page";
import Favorites from "@/pages/favorites/Page";
import ShowDetails from "@/pages/show/Page";
import RecommendationsLayout from "@/pages/Recommendations/Layout";
import TypePage from "@/pages/Recommendations/type/Page";
import GenrePage from "@/pages/Recommendations/genre/Page";
import ResultsPage from "@/pages/Recommendations/results/Page";
import ErrorHandler from "@/errors/ErrorHandler";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import Profile from "@/pages/Profile/Page";


const userDataString = localStorage.getItem("user");
const userData = userDataString ? JSON.parse(userDataString) : null;

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
                <Route index element={<HomePage />} />
                <Route path="show/:type/:genre" element={<ShowList />} />
                <Route path="favorites" element={<ProtectedRoutes isAllowed={userData} redirectPath="/" ><Favorites /></ProtectedRoutes>} />
                <Route path="show-details/:type/:id" element={<ShowDetails />} />
                <Route path="show-details/:type/:id" element={<ShowDetails />} />
                <Route path="recommendations" element={<ProtectedRoutes isAllowed={userData} redirectPath="/"><RecommendationsLayout /></ProtectedRoutes>}>
                    <Route index element={<Navigate to={"/recommendations/type"} />} />
                    <Route path="type" element={<TypePage />} />
                    <Route path=":type/genre" element={<GenrePage />} />
                    <Route path=":type/:genre/:label/results" element={<ResultsPage />} />
                </Route>
                <Route path="profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Route>
            <Route path="/auth" element={<ProtectedRoutes isAllowed={!userData} redirectPath="/"><AuthLayout /></ProtectedRoutes>}>
                <Route index element={<Navigate to="signin" replace />} />
                <Route path="signup" element={<Signup />} />
                <Route path="signin" element={<Login />} />
            </Route>

        </>
    )
)

export default router;
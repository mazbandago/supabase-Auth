import { createBrowserRouter } from "react-router-dom";
import Signing from "./components/Signing";
import Header from "./components/Header";
import Dashboard from "./routes/Dashboard";
import SignUp from "./components/SignUp";
import RootRedirect from "./routes/RootRedirect";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
    {
        path:"/",
        element: <RootRedirect/>
    },
    {
        path:"/signin",
        element: <Signing/>
    },
    {
        path:"/dashboard",
        element:(
            <ProtectedRoute>
                <Header/>
                <Dashboard/>
             </ProtectedRoute>
        ),
    },
    {
        path:"/signup",
        element:<SignUp/>
    }
])
    
export default router

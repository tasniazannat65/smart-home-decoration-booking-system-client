import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Services from "../Pages/Services/Services";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import Login from "../Pages/Authentication/Login";
import SignUp from "../Pages/Authentication/SignUp";
import DashboardLayout from "../Layouts/DashboardLayout";
import PageError from "../Components/Shared/ErrorHandle/PageError";
import PrivateRoute from "./PrivateRoute";
import CoverageArea from "../Pages/CoverageArea/CoverageArea";
import Loading from "../Components/Shared/Loading/Loading";
import ServiceDetails from "../Pages/Services/ServiceDetails";
import Profile from "../Pages/DashboardPage/Profile/Profile";
import MyBooking from "../Pages/DashboardPage/Booking/MyBooking";
import PaymentHistory from "../Pages/DashboardPage/Payment/PaymentHistory";
import DecoratorRoute from "./DecoratorRoute";
import AssignedProject from "../Pages/DashboardPage/Decorator/AssignedProject/AssignedProject";
import ProjectStatusUpdate from "../Pages/DashboardPage/Decorator/ProjectStatus/ProjectStatusUpdate";
import TodaySchedule from "../Pages/DashboardPage/Decorator/Schedule/TodaySchedule";
import EarningSummary from "../Pages/DashboardPage/Decorator/EarningSummary/EarningSummary";
import DecoratorPaymentHistory from "../Pages/DashboardPage/Decorator/PaymentHistory/DecoratorPaymentHistory";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        errorElement: <PageError/>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/services',
                Component: Services
            },
            {
                path: '/services/:id',
                Component: ServiceDetails
            },
            {
                path: '/about',
                Component: About
            },
            {
                path: '/contact',
                Component: Contact
            },
            {
                path: '/coverage',
                Component: CoverageArea,
                loader: ()=> fetch('/services_area.json').then(res=> res.json()),
                hydrateFallbackElement: <Loading/>
            }
        ]
    },
    {
        path: '/login',
        Component: Login
        
    },
    {
        path: '/sign-up',
        Component: SignUp
        
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <DashboardLayout/>
        </PrivateRoute>,
        children: [
            {
                path: '/dashboard/profile',
                Component: Profile
            },
            {
                path: '/dashboard/my-booking',
                Component: MyBooking
            },
            {
                path: '/dashboard/payment-history',
                Component: PaymentHistory
            },
            {
                path: '/dashboard/assigned-projects',
                element: <DecoratorRoute>
                    <AssignedProject/>
                </DecoratorRoute>

            },
            {
                path: '/dashboard/project-status/:id',
                element: <DecoratorRoute>
                    <ProjectStatusUpdate/>
                </DecoratorRoute>

            },
            {
                path: '/dashboard/today-schedule',
                element: <DecoratorRoute>
                    <TodaySchedule/>
                </DecoratorRoute>

            },
            {
                path: '/dashboard/earnings',
                element: <DecoratorRoute>
                    <EarningSummary/>
                </DecoratorRoute>

            },
            {
                path: '/dashboard/earnings-history',
                element: <DecoratorRoute>
                    <DecoratorPaymentHistory/>
                </DecoratorRoute>

            },


        ]
    }
    
])
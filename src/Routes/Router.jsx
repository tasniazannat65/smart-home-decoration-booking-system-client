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
import Profile from "../Pages/DashboardPage/Shared/Profile/Profile";
import MyBooking from "../Pages/DashboardPage/User/Booking/MyBooking";
import PaymentHistory from "../Pages/DashboardPage/User/Payment/PaymentHistory";
import DecoratorRoute from "./DecoratorRoute";
import AssignedProject from "../Pages/DashboardPage/Decorator/AssignedProject/AssignedProject";
import TodaySchedule from "../Pages/DashboardPage/Decorator/Schedule/TodaySchedule";
import EarningSummary from "../Pages/DashboardPage/Decorator/EarningSummary/EarningSummary";
import DecoratorPaymentHistory from "../Pages/DashboardPage/Decorator/PaymentHistory/DecoratorPaymentHistory";
import PaymentSuccess from "../Pages/DashboardPage/User/paymentSuccess/PaymentSuccess";
import PaymentCancel from "../Pages/DashboardPage/User/PaymentCancel/PaymentCancel";
import AdminRoute from "./AdminRoute";
import ManageServices from "../Pages/DashboardPage/Admin/ManageServices/ManageServices";
import ManageDecorators from "../Pages/DashboardPage/Admin/ManageDecorators/ManageDecorators";
import AssignDecorators from "../Pages/DashboardPage/Admin/AssignDecorators/AssignDecorators";
import BookingManagement from "../Pages/DashboardPage/Admin/Bookings/BookingManagement";
import Revenue from "../Pages/DashboardPage/Admin/Revenue/Revenue";
import Analytics from "../Pages/DashboardPage/Admin/Analytics/Analytics";
import DashboardHome from "../Pages/DashboardHome/DashboardHome";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <PageError />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/services",
        Component: Services,
      },
      {
        path: "/services/:id",
        Component: ServiceDetails,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/coverage",
        Component: CoverageArea,
        loader: () => fetch("/services_area.json").then((res) => res.json()),
        hydrateFallbackElement: <Loading />,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/sign-up",
    Component: SignUp,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "/dashboard/profile",
        Component: Profile,
      },
      {
        path: "/dashboard/my-booking",
        Component: MyBooking,
      },
      {
        path: "/dashboard/payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "/dashboard/payment-cancel",
        Component: PaymentCancel,
      },
      {
        path: "/dashboard/payment-history",
        Component: PaymentHistory,
      },
      {
        path: "/dashboard/assigned-projects",
        element: (
          <DecoratorRoute>
            <AssignedProject />
          </DecoratorRoute>
        ),
      },
     
      {
        path: "/dashboard/today-schedule",
        element: (
          <DecoratorRoute>
            <TodaySchedule />
          </DecoratorRoute>
        ),
      },
      {
        path: "/dashboard/earnings",
        element: (
          <DecoratorRoute>
            <EarningSummary />
          </DecoratorRoute>
        ),
      },
      {
        path: "/dashboard/earnings-history",
        element: (
          <DecoratorRoute>
            <DecoratorPaymentHistory />
          </DecoratorRoute>
        ),
      },
      {
        path: '/dashboard/manage-services',
        element: <AdminRoute>
        <ManageServices/>
        </AdminRoute>
      },
      {
        path: '/dashboard/manage-decorators',
        element: <AdminRoute>
        <ManageDecorators/>
        </AdminRoute>
      },
      {
        path: '/dashboard/assign-decorators',
        element: <AdminRoute>
        <AssignDecorators/>
        </AdminRoute>
      },
      {
        path: '/dashboard/booking-management',
        element: <AdminRoute>
        <BookingManagement/>
        </AdminRoute>
      },
     
      {
        path: '/dashboard/revenue',
        element: <AdminRoute>
        <Revenue/>
        </AdminRoute>
      },
      {
        path: '/dashboard/analytics',
        element: <AdminRoute>
        <Analytics/>
        </AdminRoute>
      },

    ],
  },
]);

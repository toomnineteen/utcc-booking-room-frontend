import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "../layouts/Layout";

// import LayoutAdmin from "../layouts/LayoutAdmin";
// import PageHomeAdmin from "../pages/admin/PageHomeAdmin";

import PageHome from "../pages/PageHome";
import PageBookingRoom from "../pages/PageBookingRoom";
import PageHomeBookingEdit from "../components/user/PageHomeBookingEdit";
import Page404 from "../components/Page404";
import PageListRoom from "../pages/PageListRoom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <PageHome /> },
      { path: "list-room", element: <PageListRoom /> },
      { path: "booking-room", element: <PageBookingRoom /> },
      { path: "edit/booking/room/:bookingId", element: <PageHomeBookingEdit />,},
      { path: "*", element: <Page404 /> },
    ],
  },
  // {
  //   path: "/admin",
  //   element: <LayoutAdmin />,
  //   children: [{ index: true, element: <PageHomeAdmin /> }],
  // },
]);
const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;

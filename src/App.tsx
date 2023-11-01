import React from 'react';
import { MantineProvider } from "@mantine/core";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Signin from "./pages/Signin";
import Index from "./pages/Index";
import theme from "./theme";
import ReferenceId from "./pages/Reference/ReferenceId";
import AuthProvider from "./services/AuthContextProvider";
import { ModalsProvider } from "@mantine/modals";
import Appointment from "./pages/Appointment/Appointment";
import AppointmentDashboard from "./pages/Appointment/AppointmentDashboard";

function App() {
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <AuthProvider>
            <ModalsProvider>
                <RouterProvider router={router} />
            </ModalsProvider>
        </AuthProvider>
    </MantineProvider>
  );
}

/* Adding browser based routing */
const router = createBrowserRouter([
    {path: '/', element: <Index />},
    {path: '/signin', element: <Signin />},
    {path: '/reference/:refId', element: <ReferenceId />},
    {path: '/appointment', element: <Appointment/>},
    {path: '/dashboard', element: <AppointmentDashboard/>}
]);

export default App;

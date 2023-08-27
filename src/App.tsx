import React from 'react';
import { MantineProvider } from "@mantine/core";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Signin from "./pages/Signin";
import Index from "./pages/Index";
import ReferenceIndex from "./pages/Reference/Index";
import theme from "./theme";
import ReferenceId from "./pages/Reference/ReferenceId";
import AuthProvider from "./services/AuthContextProvider";

function App() {
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </MantineProvider>
  );
}

/* Adding browser based routing */
const router = createBrowserRouter([
    {path: '/', element: <Index />},
    {path: '/signin', element: <Signin />},
    {path: '/reference', element: <ReferenceIndex />},
    {path: '/reference/:redId', element: <ReferenceId />}
]);

export default App;

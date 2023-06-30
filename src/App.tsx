import React from 'react';
import { MantineProvider } from "@mantine/core";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Signin from "./pages/Signin";
import Index from "./pages/Index";
import theme from "./theme";

function App() {
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

/* Adding browser based routing */
const router = createBrowserRouter([
    {path: '/', element: <Index />},
    {path: '/signin', element: <Signin />}
]);

export default App;

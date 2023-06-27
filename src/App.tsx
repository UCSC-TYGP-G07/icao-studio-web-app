import React from 'react';
import {MantineProvider, Text} from "@mantine/core";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Text>ICAO-Studio-Web-App</Text>
    </MantineProvider>
  );
}

export default App;

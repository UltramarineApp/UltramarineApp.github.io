import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { WagmiConfig } from "wagmi";

import { chains, client } from "./wagmi";

import { MantineProvider } from "@mantine/core";
import { createHashRouter, RouterProvider } from "react-router-dom";

import Layout from "./routes/layout";
import Index from "./routes/index";
import Games from "./routes/games";
import Game from "./routes/game";
import History from "./routes/history";
import Nft from "./routes/nft";

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/games",
        element: <Games />,
      },
      {
        path: "/games/:gameAddress",
        element: <Game />,
      },
      {
        path: "/games/:gameAddress/:id",
        element: <Game />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <MantineProvider
          theme={{ colorScheme: "dark" }}
          withGlobalStyles
          withNormalizeCSS
        >
          <RouterProvider router={router} />
        </MantineProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);

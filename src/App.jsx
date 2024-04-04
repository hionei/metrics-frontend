import "./App.css";
import Layout from "./layouts/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import routes from "./routes";
import Page404 from "./pages/Page404";
import Main from "./pages/Main";
import Monitor from "./pages/Monitor";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { RPC_URL, EXPLORER_URL } from "./config";

const projectId = "prj_gMcJ7AZpBwfD7jJhQ2ORUqST2enE";

// 2. Set chains
const songbirdNet = {
  chainId: 19,
  name: "Songbird",
  currency: "SGB",
  explorerUrl: EXPLORER_URL[19],
  rpcUrl: RPC_URL[19],
};

const flareNet = {
  chainId: 14,
  name: "Flare",
  currency: "FLR",
  explorerUrl: EXPLORER_URL[14],
  rpcUrl: RPC_URL[14],
};

// 3. Create a metadata object
const metadata = {
  name: "Flare Universe",
  description: "Flare Universe encourage users to manage their assets easily",
  url: "https://flareuniverse.com", // origin must match your domain & subdomain
  icons: ["https://avatars.flareuniverse.com/"],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  // enableEIP6963: true, // true by default
  // enableInjected: true, // true by default
  // enableCoinbase: true, // true by default
  // rpcUrl: "...", // used for the Coinbase SDK
  // defaultChainId: 1, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [songbirdNet, flareNet],
  projectId,
  enableAnalytics: false, // Optional - defaults to your Cloud configuration
});

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <Page404 />,
      children: [
        { path: "/", element: <Main /> },
        { path: "/metrics", element: <Monitor /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

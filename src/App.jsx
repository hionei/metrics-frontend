import "./App.css";
import Layout from "./layouts/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import routes from "./routes";
import Page404 from "./pages/Page404";
import Main from "./pages/Main";
import Delegators from "./pages/Delegators";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { RPC_URL, RPC_URL_FLARE } from "./config";

const projectId = "YOUR_PROJECT_ID";

// 2. Set chains
const songbirdNet = {
  chainId: 19,
  name: "Songbird",
  currency: "SGB",
  explorerUrl: "https://songbird-explorer.flare.network",
  rpcUrl: RPC_URL,
};

const flareNet = {
  chainId: 14,
  name: "Flare",
  currency: "FLR",
  explorerUrl: "https://flare-explorer.flare.network/",
  rpcUrl: RPC_URL_FLARE,
};

// 3. Create a metadata object
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
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
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <Page404 />,
      children: [
        { path: "/", element: <Main /> },
        { path: "/delegators", element: <Delegators /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

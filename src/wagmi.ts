import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient } from "wagmi";
import { goerli, filecoinHyperspace } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider, webSocketProvider } = configureChains(
  [goerli, filecoinHyperspace],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My wagmi + RainbowKit App",
  chains,
});

export const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export { chains };

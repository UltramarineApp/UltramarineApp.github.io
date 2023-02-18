import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient } from "wagmi";
import { polygonMumbai, filecoinHyperspace } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const { chains, provider, webSocketProvider } = configureChains(
  [polygonMumbai, filecoinHyperspace],
  [
    publicProvider(),
    jsonRpcProvider({
      rpc: (chain) => ({
        http:
          chain.id === 80001
            ? `https://quiet-tame-night.matic-testnet.discover.quiknode.pro/c4cc8d71e82b83496f7bbbed7b0e368a6a318f75/`
            : "",
      }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Ultramarine App",
  chains,
});

export const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export { chains };

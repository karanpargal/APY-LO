import './App.css';
import AppLayout from './components/layout/app-layout';
import { useRoutes } from 'react-router-dom';
import { Lending } from './pages/Lending';
import { Home } from './pages/Home';
import { Borrowing } from './pages/Borrowing';

// import {
//   makeAgoricChainStorageWatcher,
//   AgoricChainStoragePathKind as Kind,
// } from '@agoric/rpc';
// import {
//   makeAgoricWalletConnection,
//   suggestChain,
// } from '@agoric/web-components';

// type Wallet = Awaited<ReturnType<typeof makeAgoricWalletConnection>>;

// const ENDPOINTS = {
//   RPC: 'http://localhost:26657',
//   API: 'http://localhost:1317',
// };

// const setup = async () => {
//   watcher.watchLatest<Array<[string, unknown]>>(
//     [Kind.Data, 'published.agoricNames.instance'],
//     instances => {
//       console.log('got instances', instances);
//       useAppStore.setState({
//         offerUpInstance: instances.find(([name]) => name === 'offerUp')!.at(1),
//       });
//     },
//   );

//   watcher.watchLatest<Array<[string, unknown]>>(
//     [Kind.Data, 'published.agoricNames.brand'],
//     brands => {
//       console.log('Got brands', brands);
//       useAppStore.setState({
//         brands: fromEntries(brands),
//       });
//     },
//   );
// };

// const connectWallet = async () => {
//   await suggestChain('https://local.agoric.net/network-config');
//   const wallet = await makeAgoricWalletConnection(watcher, ENDPOINTS.RPC);
//   useAppStore.setState({ wallet });
//   const { pursesNotifier } = wallet;
//   for await (const purses of subscribeLatest<Purse[]>(pursesNotifier)) {
//     console.log('got purses', purses);
//     useAppStore.setState({ purses });
//   }
// };

// const makeOffer = (giveValue: bigint, wantChoices: Record<string, bigint>) => {
//   const { wallet, offerUpInstance, brands } = useAppStore.getState();
//   if (!offerUpInstance) throw Error('no contract instance');
//   if (!(brands && brands.IST && brands.Item))
//     throw Error('brands not available');

//   const value = makeCopyBag(entries(wantChoices));
//   const want = { Items: { brand: brands.Item, value } };
//   const give = { Price: { brand: brands.IST, value: giveValue } };

//   wallet?.makeOffer(
//     {
//       source: 'contract',
//       instance: offerUpInstance,
//       publicInvitationMaker: 'makeTradeInvitation',
//     },
//     { give, want },
//     undefined,
//     (update: { status: string; data?: unknown }) => {
//       if (update.status === 'error') {
//         alert(`Offer error: ${update.data}`);
//       }
//       if (update.status === 'accepted') {
//         alert('Offer accepted');
//       }
//       if (update.status === 'refunded') {
//         alert('Offer rejected');
//       }
//     },
//   );
// };

function App() {
  const element = useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/lending',
      element: <Lending />,
    },
    {
      path: '/borrowing',
      element: <Borrowing />,
    },
  ]);

  // const { wallet, purses } = useAppStore(({ wallet, purses }) => ({
  //   wallet,
  //   purses,
  // }));
  // const istPurse = purses?.find(p => p.brandPetname === 'IST');
  // const itemsPurse = purses?.find(p => p.brandPetname === 'Item');

  // const tryConnectWallet = () => {
  //   connectWallet().catch(err => {
  //     switch (err.message) {
  //       case 'KEPLR_CONNECTION_ERROR_NO_SMART_WALLET':
  //         alert('no smart wallet at that address');
  //         break;
  //       default:
  //         alert(err.message);
  //     }
  //   });
  // };

  return (
    <main className="">
      <AppLayout>{element}</AppLayout>
    </main>
  );
}

export default App;

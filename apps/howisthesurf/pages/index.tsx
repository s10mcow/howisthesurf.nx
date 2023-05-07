import Home from '../modules/Home';
import Head from 'next/head';

export function Index() {
  return (
    <>
      <Head>
        <title>howisthe.surf</title>
      </Head>
      <Home />
    </>
  );
}

export default Index;

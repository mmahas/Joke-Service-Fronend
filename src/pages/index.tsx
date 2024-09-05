import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';

const Index = () => {
  const history = useRouter();

  useEffect(() => {
    void history.push('/jokes/submit');
  }, []);

  return (
    <>
      <Head>
        <title>Mahas Milhar Code94 Assignment</title>
        <meta name="description" content="Mahas Milhar" />
        <link rel="icon" href={'/joker.png'} />
      </Head>
    </>
  );
};

export default Index;

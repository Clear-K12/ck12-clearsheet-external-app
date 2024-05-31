
import PaymentCard from '@components/paymentcard';
import COMMONCONSTANT from '@constants/commonConstant';
import { Configuration } from '@environment/startUp';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Security } from 'guard/security';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
const Subscription = () => {
  const router: any = useRouter();
  const stripePromise = loadStripe(Configuration.StripePublicKey);
  const [userData, setUserData] = useState();
  const appearance = {
    theme: 'default',
  };
  const options: any = {
    mode: 'subscription',
    amount: 900,
    currency: 'usd',
    appearance,
  };

  useEffect(() => {
    if (!(router.query && router.query.cc)) {
      router.push(COMMONCONSTANT.ROUTEPATH.SIGNUP);
    }else{
      let parse = JSON.parse(Security.decryption(router.query.cc))
      setUserData(parse);
    }
  }, [router.query])

  return (
    <>
      <Head>
        <link
          href="/static/css/subscription.css"
          rel="stylesheet"
          key="signupcss"
        ></link>
      </Head>
      <Elements stripe={stripePromise} options={options}>
        <PaymentCard userData={userData} />
      </Elements>
    </>
  )
}
export default Subscription

import PaymentCard from '@components/paymentcard';
import COMMONCONSTANT from '@constants/commonConstant';
import { Configuration } from '@environment/startUp';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
const Subscription = () => {
  const router = useRouter();
  const stripePromise = loadStripe(Configuration.StripePublicKey);
  const appearance = {
    theme: 'default',
  };
  const options: any = {
    mode: 'subscription',
    amount: 9,
    currency: 'usd',
    appearance,
  };

  useEffect(() => {
    if (!(router && router.query && router.query.cc)) {
      router.push(COMMONCONSTANT.ROUTEPATH.SIGNUP);
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
        <PaymentCard />
      </Elements>
    </>
  )
}
export default Subscription
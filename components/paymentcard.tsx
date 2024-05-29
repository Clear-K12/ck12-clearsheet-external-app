import ALERTMESSAGES from '@constants/alertMessages';
import { ToastrService } from '@services/Toastr';
import { CommonService } from '@services/api/common_service';
import {
  PaymentElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import Loader from './common/loader';
import { Configuration } from '@environment/startUp';

const PaymentCard = () => {
  const stripe: any = useStripe();
  const elements: any = useElements();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false)
    }, 1000);
  }, []);

  const handle_submit = async (event: any) => {
    event.preventDefault();
    if (!stripe || !elements) {
      ToastrService.error(ALERTMESSAGES.DEFAULT);
      return;
    }
    setIsLoading(true);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      ToastrService.error(ALERTMESSAGES.DEFAULT);
      setIsLoading(false);
      return;
    }
    await CommonService.get_client_secret().then(async (resp) => {
      const { error } = await stripe.confirmSetup({
        // Elements instance
        elements,
        confirmParams: {
          return_url: Configuration.SiteUrl+'subscriptionsuccess',
        },
        clientSecret: resp
      });
      if (error) {
        ToastrService.error(ALERTMESSAGES.DEFAULT);
      }
    });
    setIsLoading(false);
  }

  const paymentElementOptions: any = {
    layout: "tabs",
  };
  return (
    <>
      {showLoader ? <Loader /> :
        <>
          <div className="plan-heading text-center mt-4">
            <label htmlFor="">Subscription for </label>
            <h4 className='text-center fw-600'>Clearly a Pro </h4>
          </div>
          <form id="payment-form" onSubmit={handle_submit}>
            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <button disabled={isLoading || !stripe || !elements} id="submit">
              <span id="button-text">
                {isLoading ? <div className="buttonspinner"></div> : "Subscribe"}
              </span>
            </button>
          </form>
          <div id="card-element"></div>
        </>
      }
    </>
  )
}
export default PaymentCard
import ALERTMESSAGES from '@constants/alertMessages';
import { ToastrService } from '@services/Toastr';
import { CommonService } from '@services/api/common_service';
import {
  PaymentElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { Configuration } from '@environment/startUp';
import { Security } from 'guard/security';
import { useRouter } from 'next/router';

const ParentPaymentCard = (props: any) => {
  const { userData } = props;
  const navigation = useRouter();
  const stripe: any = useStripe();
  const elements: any = useElements();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [validationError,setValidationError] = useState<{cardHolderName:string}>({cardHolderName:''})
  const [extraFields,setExtraFields] = useState<{cardHolderName:string}>({cardHolderName:''});

  const handle_submit = async (event: any) => {
    event.preventDefault();
    if (!stripe || !elements) {
      ToastrService.error(ALERTMESSAGES.DEFAULT);
      return;
    }
    setIsLoading(true);

    const { error: submitError } = await elements.submit();
    const isError = isValidate();
    if (submitError || isError) {
      //ToastrService.error(ALERTMESSAGES.DEFAULT);
      setIsLoading(false);
      return;
    }
    
    await CommonService.get_client_secret().then(async (resp) => {
      let user = Security.encryption(JSON.stringify({ userData: userData.signupData, childrenCount: props.childrenCount }))
      const { error } = await stripe.confirmSetup({
        // Elements instance
        elements,
        confirmParams: {
          return_url: Configuration.SiteUrl + 'paymentsuccess?cc=' + user,
          payment_method_data:{
            billing_details:{
              name:extraFields.cardHolderName
            }
          },
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

  const isValidate = () => {
    let error = false;
    if(!extraFields.cardHolderName){
      validationError.cardHolderName = 'Name is required';
      error = true;
      setValidationError({...validationError});
    }
    return error;
  }
  return (
    <>
      <>
        <form id="payment-form" onSubmit={handle_submit}>
          <label className='label'>Card Holder Name</label>
          <input
            type="text"
            className={validationError.cardHolderName ? 'invalid' : ''}
            placeholder="Cardholder Name"   
            onChange={(e)=> { 
              setExtraFields({...extraFields,cardHolderName:e.target.value});
              setValidationError({...validationError,cardHolderName:''});
            }}       
          />
          <span className='Error'>{validationError.cardHolderName}</span>
          <PaymentElement id="payment-element" options={paymentElementOptions} />
          <button disabled={isLoading || !stripe || !elements} id="submit" style={{backgroundColor: "#e84dc1"}}>
            <span id="button-text">
              {isLoading ? <div className="buttonspinner"></div> : "Complete Purchase"}
            </span>
          </button>
        </form>
        <div id="card-element"></div>
      </>
    </>
  )
}
export default ParentPaymentCard
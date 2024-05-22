import {
  CardElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
const Card = (props:any) => {
  const {add_subscription} = props;
  const style = {
    base: {
      color: '#32325d',
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  }
  const stripe: any = useStripe();
  const elements = useElements();

  const handle_submit = async (event:any) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card_element = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: card_element,
    });
    add_subscription(paymentMethod.id)
  }
  return (
    <>
      <div className="form-group">
        <label htmlFor="card-element">Credit or debit card</label>
        <div id="card-element" className="form-control" style={{ height: "2.4em", paddingTop: ".7em" }}>
          <CardElement options={{ hidePostalCode: true, style: style }} />
          <button className='btn' onClick={handle_submit}>Submit</button>
        </div>
      </div>
    </>
  )
}
export default Card
import Card from "@components/card"
import CommonMessageModal from "@components/modal/common/commonMessageModal"
import COMMONCONSTANT from "@constants/commonConstant"
import { CommonService } from "@services/api/common_service"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { Security } from "guard/security"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Payment = () => {
  const navigation = useRouter();
  const [showMessageModal, setShowMessageModal] = useState<boolean>(false);
  const [userData,setUserData] = useState<any>();
  const stripePromise = loadStripe('pk_test_51PIVHwSD0o3O8hYFe9YuUxxzmHlVFJihrgxQWmHHCYQgdJTcxWSSDruasPxhx6QOLv4TGwnXAlVEVXqLEPFbQEsc001D7LZVyw');

  useEffect(()=>{
    if(navigation.isReady && navigation.query.cc){
      let param = JSON.parse(
        Security.decryption(navigation.query.cc?.toString())
      );
      console.log(param,"sdasd")
      setUserData(param.userData);
    }
  },[navigation.isReady])
console.log(userData)
  const add_subscription = (payment_method_id: string) => {
    let reqobj = {
      paymentMethodId: payment_method_id,
      subscriptionId: 2,
      userId: 0,
      name: userData.firstName + ' ' + userData.lastName,
      email: userData.email
    }
    console.log(reqobj)
    CommonService.add_subscription(reqobj).then((resp) => {
      setShowMessageModal(true);
      setTimeout(() => {
        navigation.push(COMMONCONSTANT.ROUTEPATH.SIGNUP);
      }, 3000);
    })
  }
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" />
      </Head>
      <Elements stripe={stripePromise}>
        <Card add_subscription={add_subscription} />
      </Elements>

      {showMessageModal &&
        <CommonMessageModal
          showMessageModal={showMessageModal}
          setShowMessageModal={setShowMessageModal}
          showPropsMessage={true}
          title={"Verify Your Email"}
          message={
            "Welcome to ClearSheets. You are almost ready to stop grading papers and to start your Worksheet Revolution! We sent you an email, please check your email and click the verify email link we sent. Check your spam folder if you do not find the email."
          }
        />
      }
    </>
  )
}

export default Payment
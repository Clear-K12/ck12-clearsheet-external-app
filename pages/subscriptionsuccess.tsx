
import ALERTMESSAGES from "@constants/alertMessages";
import COMMONCONSTANT from "@constants/commonConstant";
import { ToastrService } from "@services/Toastr";
import { CommonService } from "@services/api/common_service";
import { Security } from "guard/security";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
const DynamicSubscriptionModal = dynamic(() => import('@components/modal/common/subscriptionsuccessModal'), {
  ssr: false
})
const SubscriptionSuccess = () => {
  const router = useRouter();
  const { setup_intent, cc } = router.query;
  const [showContent,setShowContent] = useState<boolean>(false);
  useEffect(() => {
    if (cc) {
      let user_parse = JSON.parse(Security.decryption(cc?.toString()));
      let user_data = user_parse.userData;
      if (user_data && setup_intent) {
        setShowContent(true);
        let reqobj = {
          subscriptionId: 2,
          userId: 0,
          name: user_data.firstName + ' ' + user_data.lastName,
          email: user_data.email,
          intent: setup_intent
        }
        CommonService.add_subscription(reqobj).then(async () => {
          setTimeout(() => {
            window.location.href = COMMONCONSTANT.ROUTEPATH.AFTERSUBSCRIPTION;
          }, 1000);
        }).catch((e)=>{
          ToastrService.error(ALERTMESSAGES.DEFAULT+" login to your account and activate subscription from account settings");
        });
      }else{
        router.push(COMMONCONSTANT.ROUTEPATH.SIGNUP);
      } 
    }
  }, [setup_intent,cc]);
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" />
      </Head>
      {showContent &&  <div>
        <DynamicSubscriptionModal />
      </div>}     
      <ToastContainer limit={1} />
    </>
  )
}
export default SubscriptionSuccess;
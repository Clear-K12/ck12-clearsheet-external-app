
import ALERTMESSAGES from "@constants/alertMessages";
import COMMONCONSTANT from "@constants/commonConstant";
import { Configuration } from "@environment/startUp";
import { ToastrService } from "@services/Toastr";
import { CommonService } from "@services/api/common_service";
import { SecureService } from "guard/secureService";
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
  const [email,setEmail] = useState<string>('');
  useEffect(() => {
    if (cc) {
      let user_parse = JSON.parse(Security.decryption(cc?.toString()));
      let user_data = user_parse.userData;
      setEmail(user_data.email);
      SecureService.encryptsetItem(
        'email',
        user_data.email
      );
      if (user_data && setup_intent) {   
        let reqobj = {
          subscriptionId: 2,
          userId: user_data.userId,
          name: user_data.firstName + ' ' + user_data.lastName,
          email: user_data.email,
          intent: setup_intent
        }        
        CommonService.add_subscription(reqobj).then(async () => {
          if(user_data.userId > 0){
            window.location.href = Configuration.LoginUrl;
          }else{           
            router.push(COMMONCONSTANT.ROUTEPATH.VERIFY);
          }          
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
      {/* {showContent &&  <div>
        {/* <DynamicSubscriptionModal /> */}
      {/* </div>}      */}
      <ToastContainer limit={1} />
    </>
  )
}
export default SubscriptionSuccess;
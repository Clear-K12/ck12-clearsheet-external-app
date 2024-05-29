
import ALERTMESSAGES from "@constants/alertMessages";
import COMMONCONSTANT from "@constants/commonConstant";
import { ToastrService } from "@services/Toastr";
import { CommonService } from "@services/api/common_service";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
const DynamicSubscriptionModal = dynamic(()=>import('@components/modal/common/subscriptionsuccessModal'),{
  ssr:false
})
const SubscriptionSuccess = () => {
  const router = useRouter();
  const { setup_intent } = router.query;
  useEffect(() => {
    let user_data = localStorage.getItem('userdata');
    if (user_data && setup_intent) {
      let user_parse = JSON.parse(user_data);
      let reqobj = {
        subscriptionId: 2,
        userId: 0,
        name: user_parse.firstName + ' ' + user_parse.lastName,
        email: user_parse.email,
        intent: setup_intent
      }
      CommonService.add_subscription(reqobj).then(async () => {
        setTimeout(() => {
          router.push(COMMONCONSTANT.ROUTEPATH.SIGNUP);
        }, 500);
      }).catch((e)=>{
        ToastrService.error(ALERTMESSAGES.DEFAULT+" login to your account and activate subscription from account settings");
      });
    } 
  }, [setup_intent]);
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" />
      </Head>
      <div>
        <DynamicSubscriptionModal />
      </div>
      <ToastContainer limit={1}/>
    </>
  )
}
export default SubscriptionSuccess;
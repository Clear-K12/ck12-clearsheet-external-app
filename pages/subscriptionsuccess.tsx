
import SubscriptionSuccessModal from "@components/modal/common/subscriptionsuccessModal";
import ALERTMESSAGES from "@constants/alertMessages";
import COMMONCONSTANT from "@constants/commonConstant";
import { ToastrService } from "@services/Toastr";
import { CommonService } from "@services/api/common_service";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SubscriptionSuccess = () => {
  const router = useRouter();
  const { setup_intent } = router.query;
  useEffect(() => {
    let user_data = localStorage.getItem('userdata');
    if (user_data) {
      let user_parse = JSON.parse(user_data);
      let reqobj = {
        subscriptionId: 2,
        userId: 0,
        name: user_parse.firstName + ' ' + user_parse.lastName,
        email: user_parse.email,
        intent: setup_intent
      }
      CommonService.add_subscription(reqobj).then(async () => {
        // setTimeout(() => {
        //   router.push(COMMONCONSTANT.ROUTEPATH.SIGNUP);
        // }, 2000);
      });
    } else {
      ToastrService.error(ALERTMESSAGES.DEFAULT);
    }
  }, []);
  return (
    <>
      <SubscriptionSuccessModal />
    </>
  )
}
export default SubscriptionSuccess;
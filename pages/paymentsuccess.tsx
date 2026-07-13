import Loader from "@components/common/loader";
import COMMONCONSTANT from "@constants/commonConstant";
import { Configuration } from "@environment/startUp";
import { IParentSignup, IParentSubscriptionReqObj } from "@interface/ICommon";
import { CommonService } from "@services/api/common_service";
import { Security } from "guard/security";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MultiStudentIcon = () => (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="ps-trust-icon">
        <circle cx="12" cy="12" r="5" stroke="#d50aa2" strokeWidth="1.8" fill="none" />
        <circle cx="24" cy="12" r="5" stroke="#d50aa2" strokeWidth="1.8" fill="none" />
        <path d="M3 30 C3 23 21 23 21 30" stroke="#d50aa2" strokeWidth="1.8" fill="none" />
        <path d="M21 26 C21 21 33 21 33 28" stroke="#d50aa2" strokeWidth="1.8" fill="none" />
    </svg>
);

const PaymentSuccess = () => {
    const router = useRouter();
    const { setup_intent, cc } = router.query;
    const [childrenCount, setChildrenCount] = useState<number>(0);
    const [userData, setUserData] = useState<IParentSignup | null>(null);
    const [showContent, setShowContent] = useState<boolean>(false);

    useEffect(() => {  
        if (cc) {
            let user_parse = JSON.parse(Security.decryption(cc?.toString()));
            let user_data = user_parse.userData;
            setChildrenCount(user_parse.childrenCount);
            setUserData(user_data);
            if (user_data && setup_intent) {
                let reqobj: IParentSubscriptionReqObj = {
                    subscriptionId: 11,
                    firstName: user_data.firstName,
                    lastName: user_data.lastName,
                    email: user_data.email,
                    password: user_data.password,
                    stateId: 44,
                    intent: setup_intent.toString(),
                    productId: 2,
                    childrenCount: user_parse.childrenCount
                }
                CommonService.add_parent_subscription(reqobj).then(async (resp: boolean) => {
                    if (resp) {
                        setShowContent(true);
                    } else {
                        router.push(COMMONCONSTANT.ROUTEPATH.PARENTSIGNUP);
                    }
                }).catch((e) => {
                    router.push(COMMONCONSTANT.ROUTEPATH.PARENTSIGNUP);
                });
            } else { 
                router.push(COMMONCONSTANT.ROUTEPATH.PARENTSIGNUP);
            }
        }
    }, [setup_intent, cc]);

    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
                />
                <link rel="stylesheet" href="/static/css/parentsignup.css" key="parentsignupcss" />
            </Head>
            {showContent ? (
                <div className="ps-page">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="ps-card text-center">

                                    {/* Green check icon */}
                                    <svg className="ps-success-icon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="40" cy="40" r="40" fill="#d50aa2" />
                                        <path d="M24 40 L35 51 L56 29" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                    </svg>

                                    <p className="ps-success-title">Payment Successful!</p>
                                    <p className="ps-success-sub">
                                        Thank you for subscribing to Crystal Instruction.<br />Your parent account has been created.
                                    </p>

                                    <hr className="ps-divider" />

                                    {/* Order summary + receipt row */}
                                    <div className="row text-left mt-3">
                                        <div className="col-md-6 mb-3 mb-md-0">
                                            <p className="ps-payment-section-title">Order Summary</p>
                                            <div className="ps-order-row">
                                                <span className="ps-order-label">Children</span>
                                                <span className="ps-order-value">{childrenCount}</span>
                                            </div>
                                            <div className="ps-order-row">
                                                <span className="ps-order-label">Price per child</span>
                                                <span className="ps-order-value">$249.00</span>
                                            </div>
                                            <hr className="ps-order-divider" />
                                            <div className="ps-order-total">
                                                <div>
                                                    <p className="ps-order-total-label">Total Paid Today</p>
                                                    <p className="ps-order-billed">Billed annually</p>
                                                </div>
                                                <span className="ps-order-total-amount">${(childrenCount * 249).toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3 mb-md-0 d-flex align-items-start">
                                            <div className="ps-receipt-box w-100">
                                                <div className="d-flex">
                                                    <svg className="ps-envelope-icon mr-2" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect x="3" y="8" width="30" height="20" rx="3" stroke="#d50aa2" strokeWidth="2" fill="none" />
                                                        <path d="M3 11 L18 21 L33 11" stroke="#d50aa2" strokeWidth="2" fill="none" />
                                                    </svg>
                                                    <div>
                                                        <p className="ps-receipt-title">Receipt Emailed</p>
                                                        <p className="ps-receipt-note">A receipt has been emailed to</p>
                                                        <p className="ps-receipt-email">{userData?.email}</p>
                                                        <p className="ps-receipt-note">Please check your inbox (and spam folder) if you don&apos;t see it.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <hr className="ps-divider" />

                                    {/* What's Next */}
                                    <div className="text-center mt-3">
                                        <MultiStudentIcon />
                                        <p className="ps-whats-next-title">What&apos;s Next?</p>
                                        <p className="ps-whats-next-sub">
                                            You can now sign in to your account to add and manage your children,<br />
                                            create assignments, and track their progress.
                                        </p>
                                        <a href={Configuration.LoginUrl} className="ps-btn-signin text-center w-100 mb-3">Go to Sign In</a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : <Loader />}
        </>
    );
}

export default PaymentSuccess;
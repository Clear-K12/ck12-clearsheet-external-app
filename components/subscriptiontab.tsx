import COMMONCONSTANT from "@constants/commonConstant"
import { ToastrService } from "@services/Toastr"
import { Security } from "guard/security"
import Head from "next/head"
import { useRouter } from "next/router"
type Props = {
  signupData:any
}
const SubscriptionTab = ({signupData}:Props) => {
  const navigation = useRouter();
  const set_free = () => {
    ToastrService.success("Free licenese assigned")
    setTimeout(()=>{
      navigation.push(COMMONCONSTANT.ROUTEPATH.SIGNUP)
    },1000)
  }

  const activate_pro = () => {
    console.log(signupData);
    localStorage.setItem('userdata',JSON.stringify(signupData));
    navigation.push({
      pathname: COMMONCONSTANT.ROUTEPATH.SUBSCRIPTION,
      query: {
        cc: JSON.stringify({
          'paying': 'payingsubscription'
        })
      }
    }, COMMONCONSTANT.ROUTEPATH.SUBSCRIPTION);
  }

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="/static/css/subscription.css"
          rel="stylesheet"
          key="signupcss"
        ></link>
      </Head>
      <div className="col-md-12 px-4">
        <div className="row">
          <div className="pricing-plan-wrap mx-auto">
            <div className="my-account mb-4">
              <div className="justify-content-between">
                <div className="row">
                  <div className="col-md-6">
                    <div className="subscripion-box">
                      <h5 className="f-16 fw-600">Free <span className="fw-300">(Limited Features)</span></h5>
                      <span className="g-price">$0</span>
                      <p className="grey-text">
                        Lifetime access. <br />
                        No credit card needed.
                      </p>
                      <button className="btn getstarted-btn cursor-pointer">
                        Get Started
                      </button>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="subscripion-box">
                      <h5 className="d-flex align-items-center f-16 fw-600">
                        {" "}
                        <img
                          src="/static/imgs/crown.png"
                          alt=""
                          style={{ width: "30px" }}
                        />
                        Clearly a Pro  <span className="fw-300">(Full Featured)</span>
                      </h5>
                      <span className="p-price">
                        $9 <sub>/month</sub>
                      </span>
                      <p className="grey-text">
                        Billed monthly.{" "}
                        <span className="pink-text">1st Month Free</span>.
                        <br /> Everything in free, plus more.
                      </p>                      
                      <button className="btn upgrade-btn cursor-pointer" onClick={activate_pro}>
                        Upgrade to Clearly a Prooo
                      </button>                      
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="clearsheet-launch-section mb-3">
              <div className="cls-header">
                <h1 className="text-center mb-0">ClearSheets Launch Special</h1>
                <p className="text-center">For a limited time only.</p>
              </div>

              <div className="offer-box">
                <div>
                  <h2 className="text-center">
                    {" "}
                    ClearSheets is offering the <span>
                      First Month Free
                    </span>{" "}
                    for all Clearly a Pro account signups
                  </h2>
                  <p className="f-16 text-center">
                    This allows a worry-free opportunity to try all premium features for 30 days at no cost or obligation.
                  </p>
                  <span className="plan-cancel mx-auto">
                    Cancel anytime to avoid being charged.
                  </span>
                </div>
              </div>
            </div>

            <div className="compare-feature-section">
              <div className="py-3">
                <h4 className="text-center f-18 fw-600">
                  Compare features with Clearly a Pro Plan
                </h4>
                <p className="text-center">
                  Find the subscription that makes the most sense for you or
                  your school.
                </p>
              </div>

              <div className="feature-list">
                <div className="table-row">
                  <div className="header">Features list</div>
                  <div className="header">Free</div>
                  <div className="header">Clearly a Pro</div>
                </div>

                <div className="table-row">
                  <div className="cell">User Limits</div>
                  <div className="cell">
                    <div className="plan-name">Free</div>
                    Unlimited
                  </div>


                  <div className="cell">
                    <div className="plan-name ">Clearly a Pro</div>
                    Unlimited
                    <p>
                      (Max 2 teachers per school, then must get a school
                      license.)
                    </p>
                  </div>
                </div>

                <div className="table-row">
                  <div className="cell">Number of Worksheets Allowed</div>
                  <div className="cell">
                    <div className="plan-name">Free</div>
                    Unlimited
                  </div>
                  <div className="cell">
                    <div className="plan-name ">Clearly a Pro</div>
                    Unlimited</div>
                </div>
                <div className="table-row">
                  <div className="cell">Assignments</div>
                  <div className="cell">
                    <div className="plan-name">Free</div>
                    Unlimited
                  </div>
                  <div className="cell">
                    <div className="plan-name ">Clearly a Pro</div>
                    Unlimited</div>
                </div>
                <div className="table-row">
                  <div className="cell">AI Tokens</div>
                  <div className="cell">
                    <div className="plan-name">Free</div>10 Free AI Tokens</div>
                  <div className="cell">
                    <div className="plan-name">Clearly a Pro</div>50 AI Tokens per month</div>
                </div>
                <div className="table-row">
                  <div className="cell">Games</div>
                  <div className="cell">
                    <div className="plan-name">Free</div>
                    Try Games 3 times</div>
                  <div className="cell">
                    <div className="plan-name">Free</div>
                    Unlimited Game Usage</div>
                </div>
                <div className="table-row">
                  <div className="cell">Assignment Reports</div>
                  <div className="cell">
                    <div className="plan-name">Free</div>
                    <span className="d-flex">

                      <img
                        src="/static/imgs/included-icon.svg"
                        className="mr-2"
                        alt=""
                      />
                      Included
                    </span>
                  </div>
                  <div className="cell">
                    <div className="plan-name">Clearly a Pro</div>
                    <span className="d-flex">
                      <img
                        src="/static/imgs/included-icon.svg"
                        className="mr-2"
                        alt=""
                      />
                      Included
                    </span>
                  </div>
                </div>
                <div className="table-row">
                  <div className="cell">Crystal Reports</div>
                  <div className="cell">
                    <div className="plan-name">Free</div>
                    <span className="d-flex">
                      <img
                        src="/static/imgs/included-icon.svg"
                        className="mr-2"
                        alt=""
                      />
                      Included
                    </span>
                  </div>
                  <div className="cell">
                    <div className="plan-name">Clearly a Pro</div>
                    <span className="d-flex">
                      <img
                        src="/static/imgs/included-icon.svg"
                        className="mr-2"
                        alt=""
                      />
                      Included
                    </span>
                  </div>
                </div>
                <div className="table-row">
                  <div className="cell">Clear Monitor</div>
                  <div className="cell">
                    <div className="plan-name">Free</div>
                    <span className="d-flex">
                      <img
                        src="/static/imgs/not-included-icon.svg"
                        className="mr-2"
                        alt=""
                      />
                      Included
                    </span>
                  </div>
                  <div className="cell">
                    <div className="plan-name">Clearly a Pro</div>
                    <span className="d-flex">
                      <img
                        src="/static/imgs/included-icon.svg"
                        className="mr-2"
                        alt=""
                      />
                      Included
                    </span>
                  </div>
                </div>
                <div className="table-row">
                  <div className="cell">Clear Curriculum</div>
                  <div className="cell">
                    <div className="plan-name">Free</div>
                    <span className="d-flex">
                      <img
                        src="/static/imgs/not-included-icon.svg"
                        className="mr-2"
                        alt=""
                      />
                      Included
                    </span>
                  </div>
                  <div className="cell">
                    <div className="plan-name">Clearly a Pro</div>
                    <span className="d-flex">
                      <img
                        src="/static/imgs/included-icon.svg"
                        className="mr-2"
                        alt=""
                      />
                      Included
                    </span>
                  </div>
                </div>
                <div className="table-row">
                  <div className="cell">Clearsheets Studio</div>
                  <div className="cell">
                    <div className="plan-name">Free</div>
                    <span className="d-flex">
                      <img
                        src="/static/imgs/not-included-icon.svg"
                        className="mr-2"
                        alt=""
                      />
                      Included
                    </span>
                  </div>
                  <div className="cell">
                    <div className="plan-name">Clearly a Pro</div>
                    <span className="d-flex">
                      <img
                        src="/static/imgs/included-icon.svg"
                        className="mr-2"
                        alt=""
                      />
                      Included
                    </span>
                  </div>
                </div>
                <div className=" upgrade-btn-row">
                  <div> &nbsp;</div>
                  <div>
                    <div className="plan-name text-center mb-2">Free</div>
                    <button className=" btn outline-btn" onClick={set_free}>Get Started</button>
                  </div>
                  <div>
                    <div className="plan-name text-center mb-2">Clearly a Pro</div>
                    <button className=" btn outline-btn " onClick={activate_pro}>Get Started</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default SubscriptionTab
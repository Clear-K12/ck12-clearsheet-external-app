import Head from "next/head";
import React from "react";

const Subscription = () => {
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

      <div className="w-100">
        <div className="progress-container">
          <div className="progress" id="progress"></div>
          <div className="d-flex flex-column">
            <div className="circle success">
              <img src="/static/imgs/check.png" alt="" />
            </div>
            <p>Step 1</p>
          </div>

          <div className="d-flex flex-column">
            <div className="circle success">
              <img src="/static/imgs/check.png" alt="" />
            </div>
            <p>Step 2</p>
          </div>

          <div className="d-flex flex-column">
            <div className="circle active">3</div>
            <p>Step 3</p>
          </div>
        </div>
      </div>
      <div className="col-md-12 px-4">
        <div className="row">
          <div className="pricing-plan-wrap mx-auto">
            <div className="my-account mb-4">
              <div className="justify-content-between">
                <div className="row">
                  <div className="col-md-6">
                    <div className="subscripion-box">
                      <h5 className="f-16 fw-600">
                        Free <span className="fw-300">(Limited Features)</span>
                      </h5>
                      <span className="g-price">$0</span>
                      <p className="grey-text">
                        2 Free ClearLessons Up Front
                        <br />
                        2 Free ClearSheets Assignments Up Front
                        <br />
                        +1 Additional each month for both
                        <br />
                        Renews monthly.
                      </p>
                      <button className="btn getstarted-btn">
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
                        Crystal Instruction Pro{" "}
                        <span className="fw-300">(Full Featured)</span>
                      </h5>
                      <span className="p-price">
                        $9 <sub>/month</sub>
                      </span>
                      <p className="grey-text">
                        Billed monthly.{" "}
                        <span className="pink-text">1st Month Free</span>.
                        <br /> Unlimited ClearLessons and ClearSheets activity.
                      </p>
                      <button className="btn upgrade-btn">
                        Upgrade to Crystal Instruction Pro
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="clearsheet-launch-section mb-3">
              <div className="cls-header-launch">
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
                    for all Crystal Instruction Pro account signups
                  </h2>
                  <p className="f-16 text-center">
                    This allows a worry-free opportunity to try all premium
                    features for 30 days at no cost or obligation.
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
                  Compare features with Crystal Instruction Pro
                </h4>
                <p className="text-center">
                  Find the subscription that makes the most sense for you or
                  your school.
                </p>
              </div>

              <div className="feature-list">
                <div className="table-row">
                  <div className="header">Crystal Instruction</div>
                  <div className="header">Free</div>
                  <div className="header">Crystal Instruction Pro</div>
                </div>

                <div className="table-row">
                  <div className="cell">User Limits</div>
                  <div className="cell">
                    <div className="plan-name">Free</div>
                    Unlimited Students
                  </div>

                  <div className="cell">
                    <div className="plan-name ">Crystal Instruction Pro</div>
                    Single Grade &amp; Subject - 125 Students
                    <br />
                    Self-Contained &amp; All Subjects - 30 Students
                    <p>(Max 2 Pro accounts per school)</p>
                  </div>
                </div>

                <div className="table-row">
                  <div className="cell">Monthly Activity Limit</div>
                  <div className="cell">
                    <div className="plan-name">Free</div>
                    2 Free ClearLessons
                    <br />
                    2 Free ClearSheets Assignments
                    <br />
                    +1 Additional each month for both
                  </div>
                  <div className="cell">
                    <div className="plan-name ">Crystal Instruction Pro</div>
                    <span className="d-flex">
                      <img
                        src="/static/imgs/included-icon.svg"
                        className="mr-2"
                        alt=""
                      />
                      Unlimited
                    </span>
                  </div>
                </div>
                <div className="table-row">
                  <div className="cell">ClearLessons</div>
                  <div className="cell">
                    <div className="plan-name">Free</div>
                    <span className="d-flex">
                      <img
                        src="/static/imgs/not-included-icon.svg"
                        className="mr-2"
                        alt=""
                      />
                      Limited
                    </span>
                  </div>
                  <div className="cell">
                    <div className="plan-name ">Crystal Instruction Pro</div>
                    <span className="d-flex">
                      <img
                        src="/static/imgs/included-icon.svg"
                        className="mr-2"
                        alt=""
                      />
                      Unlimited
                    </span>
                  </div>
                </div>
                <div className="table-row">
                  <div className="cell">ClearSheets Auto-Graded</div>
                  <div className="cell">
                    <div className="plan-name">Free</div>
                    <span className="d-flex">
                      <img
                        src="/static/imgs/not-included-icon.svg"
                        className="mr-2"
                        alt=""
                      />
                      Limited
                    </span>
                  </div>
                  <div className="cell">
                    <div className="plan-name">Crystal Instruction Pro</div>
                    <span className="d-flex">
                      <img
                        src="/static/imgs/included-icon.svg"
                        className="mr-2"
                        alt=""
                      />
                      Unlimited
                    </span>
                  </div>
                </div>
                <div className="table-row">
                  <div className="cell">
                    ClearSheets Printable Worksheet Library
                  </div>
                  <div className="cell">
                    <div className="plan-name">Free</div>
                    <span className="d-flex">
                      <img
                        src="/static/imgs/included-icon.svg"
                        className="mr-2"
                        alt=""
                      />
                      Unlimited
                    </span>
                  </div>
                  <div className="cell">
                    <div className="plan-name">Crystal Instruction Pro</div>
                    <span className="d-flex">
                      <img
                        src="/static/imgs/included-icon.svg"
                        className="mr-2"
                        alt=""
                      />
                      Unlimited
                    </span>
                  </div>
                </div>
                <div className="table-row">
                  <div className="cell">ClearSheets Video Feedback</div>
                  <div className="cell">
                    <div className="plan-name">Free</div>
                    <span className="d-flex">
                      <img
                        src="/static/imgs/not-included-icon.svg"
                        className="mr-2"
                        alt=""
                      />
                      Limited
                    </span>
                  </div>
                  <div className="cell">
                    <div className="plan-name">Crystal Instruction Pro</div>
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
                  <div className="cell">Skill Builder ClearSheets</div>
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
                    <div className="plan-name">Crystal Instruction Pro</div>
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
                  <div className="cell">TEKS Based Lessons and Worksheets</div>
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
                    <div className="plan-name">Crystal Instruction Pro</div>
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
                  <div className="cell">Luna&apos;s Knowledge Hub</div>
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
                    <div className="plan-name">Crystal Instruction Pro</div>
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
                  <div className="cell">Crytal Reports</div>
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
                    <div className="plan-name">Crystal Instruction Pro</div>
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
                  <div className="cell">Lesson Summaries</div>
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
                    <div className="plan-name">Crystal Instruction Pro</div>
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
                        src="/static/imgs/included-icon.svg"
                        className="mr-2"
                        alt=""
                      />
                      Included
                    </span>
                  </div>
                  <div className="cell">
                    <div className="plan-name">Crystal Instruction Pro</div>
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
                  <div className="cell">My Lessons</div>
                  <div className="cell">
                    <div className="plan-name">Free</div>
                    <span className="d-flex">
                      <img
                        src="/static/imgs/not-included-icon.svg"
                        className="mr-2"
                        alt=""
                      />
                      Not Included
                    </span>
                  </div>
                  <div className="cell">
                    <div className="plan-name">Crystal Instruction Pro</div>
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
                  <div className="cell">Small Groups Creation</div>
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
                    <div className="plan-name">Crystal Instruction Pro</div>
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
                    <button className=" btn outline-btn">Get Started</button>
                  </div>
                  <div>
                    <div className="plan-name text-center mb-2">
                      Crystal Instruction Pro
                    </div>
                    <button className=" btn outline-btn ">Upgrade</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscription;

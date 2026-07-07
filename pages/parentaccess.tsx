import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { COMMONCONSTANT } from "@constants/index";
import Image from "next/image";

const FamilyIllustration = () => (
  <Image src="/static/imgs/parent.png" alt="school" width={300} height={160} className="at-illustration" />

);

/* Detail row icons */
const PersonIcon = () => (
  <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="pa-detail-icon">
    <circle cx="14" cy="9" r="5" stroke="#e84dc1" strokeWidth="1.5" fill="none" />
    <path d="M5 24 C5 18 23 18 23 24" stroke="#e84dc1" strokeWidth="1.5" fill="none" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="pa-detail-icon">
    <rect x="3" y="5" width="22" height="20" rx="3" stroke="#e84dc1" strokeWidth="1.5" fill="none" />
    <line x1="3" y1="11" x2="25" y2="11" stroke="#e84dc1" strokeWidth="1.5" />
    <line x1="9" y1="3" x2="9" y2="8" stroke="#e84dc1" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="19" y1="3" x2="19" y2="8" stroke="#e84dc1" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="8" y="15" width="4" height="4" rx="1" fill="#e84dc1" opacity="0.5" />
    <rect x="16" y="15" width="4" height="4" rx="1" fill="#e84dc1" opacity="0.5" />
  </svg>
);

const CancelIcon = () => (
  <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="pa-detail-icon">
    <circle cx="14" cy="14" r="10" stroke="#e84dc1" strokeWidth="1.5" fill="none" />
    <line x1="10" y1="10" x2="18" y2="18" stroke="#e84dc1" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="18" y1="10" x2="10" y2="18" stroke="#e84dc1" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/* Feature star icon */
const StarIcon = () => (
  <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="pa-feature-star">
    <polygon
      points="11,2 13.5,8.5 20.5,8.5 15,13 17,20 11,16 5,20 7,13 1.5,8.5 8.5,8.5"
      fill="#01263f"
    />
  </svg>
);

/* Trust bar icons */
const ShieldIcon = () => (
  <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="pa-trust-icon">
    <path d="M18 3 L32 9 L32 18 C32 25 25 31 18 33 C11 31 4 25 4 18 L4 9 Z" stroke="#e84dc1" strokeWidth="2" fill="none" />
    <path d="M12 18 L16 22 L24 14" stroke="#e84dc1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const HomeGradeIcon = () => (
  <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="pa-trust-icon">
    <path d="M5 18 L18 6 L31 18" stroke="#e84dc1" strokeWidth="2" fill="none" strokeLinecap="round" />
    <rect x="10" y="18" width="16" height="12" rx="1" stroke="#e84dc1" strokeWidth="2" fill="none" />
    <rect x="15" y="22" width="6" height="8" rx="1" stroke="#e84dc1" strokeWidth="1.5" fill="none" />
    <circle cx="14" cy="15" r="2" fill="#e84dc1" opacity="0.6" />
  </svg>
);

const ParentAccess = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
        />
        <link
          href="/static/css/parentaccess.css"
          rel="stylesheet"
          key="parentaccesscss"
        />
      </Head>

      <div className="pa-page">
        <div className="container">

          {/* Page header */}
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 text-center mb-4">
              <h1 className="pa-title">Parent Access</h1>
              <p className="pa-subtitle">
                Support your child&apos;s writing growth at home with Crystal Instruction.<br />
                Full access to powerful tools and resources for just{" "}
                <span className="pa-subtitle-price">$249 per year.</span>
              </p>
            </div>
          </div>

          {/* Main content row */}
          <div className="row justify-content-center">

            {/* Left: Pricing card */}
            <div className="col-md-5 mb-4">
              <div className="pa-card d-flex flex-column align-items-center h-100">
                <FamilyIllustration />

                <div className="pa-price-block text-center">
                  <span className="pa-price-amount">$249</span>
                  <span className="pa-price-period">per year</span>
                </div>

                <ul className="pa-detail-list w-100">
                  <li className="pa-detail-item">
                    <PersonIcon />
                    <div>
                      <p className="pa-detail-label">For One Child</p>
                      <p className="pa-detail-sub">$249 per child, per year</p>
                    </div>
                  </li>
                  <li className="pa-detail-item">
                    <CalendarIcon />
                    <div>
                      <p className="pa-detail-label">Full Access for 12 Months</p>
                      <p className="pa-detail-sub">Unlimited access for one full year</p>
                    </div>
                  </li>
                  <li className="pa-detail-item">
                    <CancelIcon />
                    <div>
                      <p className="pa-detail-label">Cancel Anytime</p>
                      <p className="pa-detail-sub">No long-term commitments</p>
                    </div>
                  </li>
                </ul>

                <button
                  className="pa-btn-primary btn btn-block mt-auto"
                  onClick={() => router.push(COMMONCONSTANT.ROUTEPATH.PARENTSIGNUP)}
                >
                  Continue
                </button>
              </div>
            </div>

            {/* Right: Features list */}
            <div className="col-md-6 mb-4">
              <h2 className="pa-features-title">What&apos;s included with Parent Access</h2>
              <ul className="pa-feature-list">
                <li className="pa-feature-item">
                  <div className="pa-feature-icon-wrap pa-feature-icon-wrap--image">
                    <Image src="/static/imgs/lightblub.svg" alt="Adaptive Lessons" width={44} height={44} />
                  </div>
                  <div>
                    <p className="pa-feature-label">Adaptive Lessons</p>
                    <p className="pa-feature-desc">
                      Interactive lessons with built-in feedback and skill checks.
                    </p>
                  </div>
                </li>
                <li className="pa-feature-item">
                  <div className="pa-feature-icon-wrap pa-feature-icon-wrap--image">
                    <Image src="/static/imgs/worksheets.svg" alt="Digital Worksheets" width={44} height={44} />
                  </div>
                  <div>
                    <p className="pa-feature-label">Digital Worksheets</p>
                    <p className="pa-feature-desc">
                      Engaging, printable worksheets to reinforce skills and support learning at home.
                    </p>
                  </div>
                </li>
                <li className="pa-feature-item">
                  <div className="pa-feature-icon-wrap pa-feature-icon-wrap--pink">
                     <Image src="/static/imgs/teks.svg" alt="Digital Worksheets" width={44} height={44} />
                  </div>
                  <div>
                    <p className="pa-feature-label">Built to the TEKS</p>
                    <p className="pa-feature-desc">
                      All lessons and activities are aligned to Texas standards for grades 2–5.
                    </p>
                  </div>
                </li>
                <li className="pa-feature-item">
                  <div className="pa-feature-icon-wrap">
                     <Image src="/static/imgs/subjects.svg" alt="Digital Worksheets" width={44} height={44} />
                  </div>
                  <div>
                    <p className="pa-feature-label">Math, Elar and Science</p>
                    <p className="pa-feature-desc">
                      Comprehensive coverage of core subjects to build strong academic foundations.
                    </p>
                  </div>
                </li>
                <li className="pa-feature-item">
                  <div className="pa-feature-icon-wrap">
                    <Image src="/static/imgs/reporting.svg" alt="Digital Worksheets" width={44} height={44} />
                  </div>
                  <div>
                    <p className="pa-feature-label">Actionable Reporting</p>
                    <p className="pa-feature-desc">
                      Track progress with detailed reports and insights that help your child grow.
                    </p>
                  </div>
                </li>
                <li className="pa-feature-item">
                  <div className="pa-feature-icon-wrap">
                    <Image src="/static/imgs/classcade.svg" alt="Digital Worksheets" width={44} height={44} />
                  </div>
                  <div>
                    <p className="pa-feature-label">Free ClassCade Access</p>
                    <p className="pa-feature-desc">
                      Game-based reward system to improve academic outcomes.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom trust bar */}
          <div className="row justify-content-center">
            <div className="col-md-11">
              <div className="pa-trust-bar d-flex align-items-center">
                <div className="pa-trust-item flex-fill">
                  <ShieldIcon />
                  <div>
                    <p className="pa-trust-label">Safe. Secure. Private.</p>
                    <p className="pa-trust-sub">Your information is always protected. We never share your data.</p>
                  </div>
                </div>
                <div className="pa-trust-divider d-none d-md-block"></div>
                <div className="pa-trust-item flex-fill">
                  <HomeGradeIcon />
                  <div>
                    <p className="pa-trust-label">For Grades 2–5</p>
                    <p className="pa-trust-sub">Crystal Instruction is designed for students in grades 2 through 5.</p>
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

export default ParentAccess;

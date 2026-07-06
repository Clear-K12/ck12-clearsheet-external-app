import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { COMMONCONSTANT } from "@constants/index";
import Image from "next/image";

const SchoolIllustration = () => (
   <Image src="/static/imgs/school.png" alt="school" width={350} height={180} className="at-illustration" />

);

const FamilyIllustration = () => (
 <Image src="/static/imgs/parent.png" alt="Family Illustration" width={350} height={180} className="at-illustration" />
);

const TeacherIcon = () => (
  <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="at-for-icon">
    <rect x="2" y="4" width="18" height="14" rx="2" stroke="#d50aa2" strokeWidth="1.5" fill="none" />
    <line x1="2" y1="10" x2="20" y2="10" stroke="#d50aa2" strokeWidth="1.5" />
    <line x1="24" y1="4" x2="24" y2="18" stroke="#d50aa2" strokeWidth="1.5" />
    <circle cx="22" cy="22" r="4" stroke="#d50aa2" strokeWidth="1.5" fill="none" />
    <line x1="22" y1="19" x2="22" y2="22" stroke="#d50aa2" strokeWidth="1.2" />
    <line x1="22" y1="22" x2="24" y2="24" stroke="#d50aa2" strokeWidth="1.2" />
  </svg>
);

const CoachIcon = () => (
  <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="at-for-icon">
    <circle cx="14" cy="9" r="5" stroke="#d50aa2" strokeWidth="1.5" fill="none" />
    <path d="M6 24 C6 18 22 18 22 24" stroke="#d50aa2" strokeWidth="1.5" fill="none" />
    <circle cx="21" cy="12" r="3" stroke="#d50aa2" strokeWidth="1.2" fill="none" />
    <line x1="21" y1="15" x2="21" y2="19" stroke="#d50aa2" strokeWidth="1.2" />
    <line x1="19" y1="17" x2="23" y2="17" stroke="#d50aa2" strokeWidth="1.2" />
  </svg>
);

const AdminIcon = () => (
  <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="at-for-icon">
    <circle cx="14" cy="9" r="5" stroke="#d50aa2" strokeWidth="1.5" fill="none" />
    <path d="M4 24 C4 18 24 18 24 24" stroke="#d50aa2" strokeWidth="1.5" fill="none" />
    <rect x="20" y="14" width="8" height="6" rx="1" stroke="#d50aa2" strokeWidth="1.2" fill="none" />
    <line x1="22" y1="17" x2="26" y2="17" stroke="#d50aa2" strokeWidth="1.2" />
  </svg>
);

const LeaderIcon = () => (
  <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="at-for-icon">
    <circle cx="10" cy="10" r="4" stroke="#d50aa2" strokeWidth="1.5" fill="none" />
    <circle cx="20" cy="10" r="4" stroke="#d50aa2" strokeWidth="1.5" fill="none" />
    <path d="M2 24 C2 18 18 18 18 24" stroke="#d50aa2" strokeWidth="1.5" fill="none" />
    <path d="M18 20 C18 16 28 16 28 22" stroke="#d50aa2" strokeWidth="1.5" fill="none" />
  </svg>
);

const ParentIcon = () => (
  <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="at-for-icon">
    <circle cx="14" cy="9" r="5" stroke="#d50aa2" strokeWidth="1.5" fill="none" />
    <path d="M5 24 C5 18 23 18 23 24" stroke="#d50aa2" strokeWidth="1.5" fill="none" />
  </svg>
);

const HomeschoolIcon = () => (
  <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="at-for-icon">
    <path d="M4 14 L14 5 L24 14" stroke="#d50aa2" strokeWidth="1.5" fill="none" />
    <rect x="8" y="14" width="12" height="10" rx="1" stroke="#d50aa2" strokeWidth="1.5" fill="none" />
    <rect x="12" y="18" width="4" height="6" rx="1" stroke="#d50aa2" strokeWidth="1.2" fill="none" />
  </svg>
);

const BookIcon = () => (
  <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="at-for-icon">
    <rect x="4" y="4" width="20" height="20" rx="2" stroke="#d50aa2" strokeWidth="1.5" fill="none" />
    <line x1="14" y1="4" x2="14" y2="24" stroke="#d50aa2" strokeWidth="1.5" />
    <line x1="4" y1="9" x2="14" y2="9" stroke="#d50aa2" strokeWidth="1.2" />
    <line x1="4" y1="14" x2="14" y2="14" stroke="#d50aa2" strokeWidth="1.2" />
    <line x1="4" y1="19" x2="14" y2="19" stroke="#d50aa2" strokeWidth="1.2" />
  </svg>
);

const AccountType = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
        />
        <link
          href="/static/css/accounttype.css"
          rel="stylesheet"
          key="accounttypecss"
        />
      </Head>

      <div className="at-page">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center mb-2">
              <h1 className="at-title">Choose Your Account Type</h1>
              <p className="at-subtitle">Select the option that best describes you to get started.</p>
            </div>
          </div>

          <div className="row justify-content-center">
            {/* Schools & Districts Card */}
            <div className="col-md-5 mb-4">
              <div className="at-card d-flex flex-column align-items-center h-100">
                <SchoolIllustration />
                <h2 className="at-card-title">Schools &amp; Districts</h2>
                <p className="at-card-desc text-center">
                  Implement Crystal Instruction for classrooms, <br /> campuses, and districts.
                </p>
                <hr className="at-card-border" />
                <div className="at-for-section w-100">
                  <p className="at-for-label">For:</p>
                  <ul className="at-for-list list-unstyled">
                    <li className="at-for-item d-flex align-items-center">
                      <TeacherIcon />
                      <span>Teachers</span>
                    </li>
                    <li className="at-for-item d-flex align-items-center">
                      <CoachIcon />
                      <span>Instructional Coaches</span>
                    </li>
                    <li className="at-for-item d-flex align-items-center">
                      <AdminIcon />
                      <span>Campus Administrators</span>
                    </li>
                    <li className="at-for-item d-flex align-items-center">
                      <LeaderIcon />
                      <span>District Leaders</span>
                    </li>
                  </ul>
                </div>
                <button
                  className="at-btn-primary btn btn-block mt-auto"
                  onClick={() => router.push(COMMONCONSTANT.ROUTEPATH.SIGNUP)}
                >
                  Continue
                </button>
              </div>
            </div>

            {/* Parents & Guardians Card */}
            <div className="col-md-5 mb-4">
              <div className="at-card d-flex flex-column align-items-center h-100">
                <FamilyIllustration />
                <h2 className="at-card-title">Parents &amp; Guardians</h2>
                <p className="at-card-desc text-center">
                  Support your child&apos;s writing growth <br /> at home.
                </p>
                <hr className="at-card-border" />
                <div className="at-for-section w-100">
                  <p className="at-for-label">For:</p>
                  <ul className="at-for-list list-unstyled">
                    <li className="at-for-item d-flex align-items-center">
                      <ParentIcon />
                      <span>Parents</span>
                    </li>
                    <li className="at-for-item d-flex align-items-center">
                      <ParentIcon />
                      <span>Guardians</span>
                    </li>
                    <li className="at-for-item d-flex align-items-center">
                      <HomeschoolIcon />
                      <span>Homeschool Families</span>
                    </li>
                    <li className="at-for-item d-flex align-items-center">
                      <BookIcon />
                      <span>At-Home Learning</span>
                    </li>
                  </ul>
                </div>
                <button
                  className="at-btn-outline btn btn-block mt-auto"
                  onClick={() => router.push(COMMONCONSTANT.ROUTEPATH.PARENTACCESS)}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-12">
              <div className="at-footer d-flex justify-content-center align-items-center">
                <div className="at-footer-icon">?</div>
                <span>Not sure which option is right for you?</span>
                <a href="#" className="at-learn-more ml-1">Learn more</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountType;

import React, { useEffect, useState } from "react";
import Head from "next/head";
import COMMONCONSTANT from "@constants/commonConstant";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Configuration } from "@environment/startUp";
import ParentPaymentCard from "@components/parentpaymentcard";
import Select, { StylesConfig } from "react-select";
import { CommonService } from "@services/api/common_service";
import { StateList, IParentSignup } from "@interface/ICommon";
import { ToastrService } from "@services/Toastr";
import { ToastContainer } from "react-toastify";
import Loader from "@components/common/loader";

const stripePromise = loadStripe(Configuration.StripePublicKey);
const stripeOptions: any = {
  mode: "subscription",
  amount: 19900,
  currency: "usd",
  appearance: { theme: "default" },
};

/* ── Step 1 icons ───────────────────────────────────────────────── */
const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="#999" strokeWidth="1.5" fill="none" />
    <circle cx="12" cy="12" r="3" stroke="#999" strokeWidth="1.5" fill="none" />
  </svg>
);

const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20C5 20 1 12 1 12a18.09 18.09 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22" stroke="#999" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M14.12 14.12A3 3 0 119.88 9.88" stroke="#999" strokeWidth="1.5" fill="none" />
  </svg>
);

const EmailHintIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ps-input-hint-icon">
    <rect x="1" y="3" width="14" height="10" rx="2" stroke="#d50aa2" strokeWidth="1.2" fill="none" />
    <path d="M1 5 L8 9.5 L15 5" stroke="#d50aa2" strokeWidth="1.2" fill="none" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="ps-trust-icon">
    <path d="M18 3 L32 9 L32 18 C32 25 25 31 18 33 C11 31 4 25 4 18 L4 9 Z" stroke="#d50aa2" strokeWidth="2" fill="none" />
    <path d="M12 18 L16 22 L24 14" stroke="#d50aa2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

/* ── Step 2 icons ───────────────────────────────────────────────── */

const HomeGradeIcon = () => (
  <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="ps-trust-icon">
    <path d="M5 18 L18 6 L31 18" stroke="#d50aa2" strokeWidth="2" fill="none" strokeLinecap="round" />
    <rect x="10" y="18" width="16" height="12" rx="1" stroke="#d50aa2" strokeWidth="2" fill="none" />
    <rect x="15" y="22" width="6" height="8" rx="1" stroke="#d50aa2" strokeWidth="1.5" fill="none" />
    <circle cx="14" cy="15" r="2" fill="#d50aa2" opacity="0.6" />
  </svg>
);

const BookIcon = () => (
  <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="ps-info-icon">
    <rect x="4" y="4" width="28" height="28" rx="3" stroke="#d50aa2" strokeWidth="2" fill="none" />
    <line x1="18" y1="4" x2="18" y2="32" stroke="#d50aa2" strokeWidth="2" />
    <line x1="4" y1="11" x2="18" y2="11" stroke="#d50aa2" strokeWidth="1.5" />
    <line x1="4" y1="18" x2="18" y2="18" stroke="#d50aa2" strokeWidth="1.5" />
    <line x1="4" y1="25" x2="18" y2="25" stroke="#d50aa2" strokeWidth="1.5" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="ps-info-icon">
    <path d="M18 3 L32 9 L32 18 C32 25 25 31 18 33 C11 31 4 25 4 18 L4 9 Z" stroke="#d50aa2" strokeWidth="2" fill="none" />
    <path d="M12 18 L16 22 L24 14" stroke="#d50aa2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const MultiStudentIcon = () => (
  <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="ps-trust-icon">
    <circle cx="12" cy="12" r="5" stroke="#d50aa2" strokeWidth="1.8" fill="none" />
    <circle cx="24" cy="12" r="5" stroke="#d50aa2" strokeWidth="1.8" fill="none" />
    <path d="M3 30 C3 23 21 23 21 30" stroke="#d50aa2" strokeWidth="1.8" fill="none" />
    <path d="M21 26 C21 21 33 21 33 28" stroke="#d50aa2" strokeWidth="1.8" fill="none" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="ps-check-icon">
    <circle cx="10" cy="10" r="9" fill="#d50aa2" opacity="0.15" />
    <path d="M6 10 L9 13 L14 7" stroke="#d50aa2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

/* ── Main component ─────────────────────────────────────────────── */

interface StateOption {
  label: string;
  value: number;
}

const selectStyles: StylesConfig<any> = {
  control: (styles, { isFocused }) => ({
    ...styles,
    borderColor: isFocused ? '#d50aa2' : '#d0d8e0',
    borderRadius: '8px',
    fontSize: '0.9rem',
    boxShadow: 'none',
    minHeight: '36px',
    '&:hover': { borderColor: '#d50aa2' },
  }),
  placeholder: (styles) => ({ ...styles, color: '#999', fontSize: '0.9rem' }),
  singleValue: (styles) => ({ ...styles, color: '#333' }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isSelected ? '#d50aa2' : isFocused ? '#f0faf9' : undefined,
    color: isSelected ? '#fff' : '#333',
    fontSize: '0.9rem',
  }),
  indicatorSeparator: () => ({ display: 'none' }),
};

const ParentSignup = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<any>({});
  const [childrenCount, setChildrenCount] = useState<number>(1);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<IParentSignup>({
    firstName: "",
    lastName: "",
    stateId: 0,
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });
  const [selectedState, setSelectedState] = useState<StateOption | null>(null);
  const [stateOptions, setStateOptions] = useState<StateOption[]>([]);

  useEffect(() => {
    CommonService.get_state_listByActive(true).then((resp: StateList[]) => {
      if (resp) {
        setStateOptions(resp.map((item) => ({
          label: item.stateName,
          value: item.stateId,
        })));
      }
    });
  }, []);

  const handleStateChange = (option: StateOption | null) => {
    setSelectedState(option);
    setFormData((prev) => ({ ...prev, stateId: option?.value ?? 0 }));
    setValidationError((prev: any) => { const next = { ...prev }; delete next.stateId; return next; });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationError((prev: any) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleNext = async () => {
    const errors: any = {};
    const emailRegex = /^[a-zA-Z0-9+_.-]+@(?:[a-zA-Z0-9+_.-]+\.)+[A-Za-z]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;

    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.stateId) errors.stateId = "State is required";

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.confirmEmail.trim()) {
      errors.confirmEmail = "Please confirm your email";
    } else if (formData.email !== formData.confirmEmail) {
      errors.confirmEmail = "Email addresses do not match";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      errors.password = "Use 8+ characters with a mix of letters, numbers, and symbols";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setValidationError(errors);
    if (Object.keys(errors).length > 0) return;
    
    setIsLoading(true);
    const exists = await CommonService.is_duplicate_email(formData.email);
    setIsLoading(false);
    if (exists) {
      ToastrService.error("An account with this email already exists. Please sign in.");
      return;
    }

    setCurrentStep(2);
  };

  const progressFill = currentStep === 2 ? "100%" : "0%";

  return (
    <>
      <ToastContainer limit={1} />
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
        />
        <link
          href="/static/css/parentsignup.css"
          rel="stylesheet"
          key="parentsignupcss"
        />
        <link
          href="/static/css/subscription.css"
          rel="stylesheet"
          key="subscriptioncss"
        />
      </Head>

      {isLoading && <Loader />}
      <div className="ps-page">
        <div className="container">

          {/* ── STEP HEADER ── */}
          {!paymentSuccess && (
          <div className="row justify-content-center">
            <div className="col-12 col-md-7 text-center">
              <h1 className="ps-title">
                {currentStep === 1 ? "Sign Up" : "Almost There!"}
              </h1>
              {currentStep === 2 && (
                <p className="ps-step2-subtitle">
                  Add your children and complete your payment to get started.
                </p>
              )}

              {/* Progress bar */}
              {currentStep !== 2 && (
                <div className="ps-progress-wrap">
                  <div className="ps-progress-line">
                    <div className="ps-progress-line-fill" style={{ width: progressFill }} />
                  </div>

                  <div className="ps-step">
                    <div className={`ps-step-circle ${currentStep >= 2 ? "completed" : currentStep >= 1 ? "active" : ""}`}>
                      {currentStep >= 2 ? (
                        <svg viewBox="0 0 14 14" fill="none" width="14" height="14">
                          <path d="M2 7 L6 11 L12 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : "1"}
                    </div>
                    <span className={`ps-step-label ${currentStep >= 1 ? "active" : ""}`}>
                      Parent Information
                    </span>
                  </div>

                  <div className="ps-step">
                    <div className={`ps-step-circle ${currentStep >= 2 ? "active" : ""}`}>2</div>
                    <span className={`ps-step-label ${currentStep >= 2 ? "active" : ""}`}>
                      Plan &amp; Payment
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          )}

          {/* ══════════════════════════════════════════════════════════
              STEP 1 — Parent Information
          ══════════════════════════════════════════════════════════ */}
          {currentStep === 1 && (
            <>
              <div className="row justify-content-center">
                <div className="col-12 col-md-7 text-center">
                  <p className="ps-section-title">Let&apos;s start with your information.</p>
                  <p className="ps-section-sub">This will be used to create your parent account.</p>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-12 col-md-9">
                  <div className="ps-card">

                    {/* First Name + Last Name */}
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          placeholder="Enter your first name"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={validationError.firstName ? "input-error" : ""}
                          autoComplete="off"
                        />
                        {validationError.firstName && (
                          <span className="ps-validation-error">{validationError.firstName}</span>
                        )}
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          placeholder="Enter your last name"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={validationError.lastName ? "input-error" : ""}
                          autoComplete="off"
                        />
                        {validationError.lastName && (
                          <span className="ps-validation-error">{validationError.lastName}</span>
                        )}
                      </div>
                    </div>

                    {/* State */}
                    <div className="form-group">
                      <label htmlFor="stateId">State</label>
                      <Select
                        inputId="stateId"
                        value={selectedState}
                        options={stateOptions}
                        onChange={handleStateChange}
                        placeholder="Select your state"
                        styles={selectStyles}
                        className={validationError.stateId ? "input-error" : ""}
                      />
                      {validationError.stateId && (
                        <span className="ps-validation-error">{validationError.stateId}</span>
                      )}
                    </div>

                    {/* Email Address */}
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleChange}
                        className={validationError.email ? "input-error" : ""}
                        autoComplete="off"
                      />
                      {validationError.email ? (
                        <span className="ps-validation-error">{validationError.email}</span>
                      ) : (
                        <p className="ps-input-hint">
                          <EmailHintIcon />
                          Your email address will also be your username when signing in to Crystal Instruction.
                        </p>
                      )}
                    </div>

                    {/* Confirm Email */}
                    <div className="form-group">
                      <label htmlFor="confirmEmail">Confirm Email Address</label>
                      <input
                        type="email"
                        id="confirmEmail"
                        name="confirmEmail"
                        placeholder="Re-enter your email address"
                        value={formData.confirmEmail}
                        onChange={handleChange}
                        className={validationError.confirmEmail ? "input-error" : ""}
                        autoComplete="off"
                      />
                      {validationError.confirmEmail ? (
                        <span className="ps-validation-error">{validationError.confirmEmail}</span>
                      ) : (
                        <p className="ps-input-hint">
                          Please re-enter your email address to make sure it&apos;s correct.
                        </p>
                      )}
                    </div>

                    {/* Password + Confirm Password */}
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="password">Password</label>
                        <div className="ps-input-wrap">
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            className={validationError.password ? "input-error" : ""}
                            autoComplete="new-password"
                          />
                          <button
                            type="button"
                            className="ps-eye-btn"
                            onClick={() => setShowPassword((v) => !v)}
                            aria-label="Toggle password visibility"
                          >
                            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                          </button>
                        </div>
                        {validationError.password ? (
                          <span className="ps-validation-error">{validationError.password}</span>
                        ) : (
                          <p className="ps-input-hint">
                            Use 8 or more characters with a mix of letters, numbers, and symbols.
                          </p>
                        )}
                      </div>

                      <div className="form-group col-md-6">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div className="ps-input-wrap">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={validationError.confirmPassword ? "input-error" : ""}
                            autoComplete="new-password"
                          />
                          <button
                            type="button"
                            className="ps-eye-btn"
                            onClick={() => setShowConfirmPassword((v) => !v)}
                            aria-label="Toggle confirm password visibility"
                          >
                            {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                          </button>
                        </div>
                        {validationError.confirmPassword && (
                          <span className="ps-validation-error">{validationError.confirmPassword}</span>
                        )}
                      </div>
                    </div>

                    <button className="ps-btn-next btn btn-block" onClick={handleNext} disabled={isLoading}>
                      Next
                    </button>

                    <p className="ps-login-hint">
                      Already have an account?{" "}
                      <a href={COMMONCONSTANT.ROUTEPATH.LOGINURL} className="ps-login-link">
                        Log in
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust bar */}
              <div className="row justify-content-center">
                <div className="col-12 col-md-9">
                  <div className="ps-trust-bar d-flex align-items-center">
                    <div className="ps-trust-item flex-fill">
                      <ShieldIcon />
                      <div>
                        <p className="ps-trust-label">Safe. Secure. Private.</p>
                        <p className="ps-trust-sub">
                          Your information is always protected.<br />We never share your data.
                        </p>
                      </div>
                    </div>
                    <div className="ps-trust-divider d-none d-md-block mx-3" style={{ width: 1, alignSelf: "stretch", background: "#e0e6ed" }} />
                    <div className="ps-trust-item flex-fill">
                      <MultiStudentIcon />
                      <div>
                        <p className="ps-trust-label">Manage Multiple Students</p>
                        <p className="ps-trust-sub">
                          Add and manage multiple children<br />from a single parent account.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ══════════════════════════════════════════════════════════
              STEP 2 — Plan & Payment
          ══════════════════════════════════════════════════════════ */}
          {currentStep === 2 && (
            <>
              {/* ── Step 2 content ── */}
              <>
                  <div className="row justify-content-center mt-3">

                    {/* Left: children count + info + features */}
                    <div className="col-md-7 mb-4">
                      <div className="ps-progress-wrap">
                        <div className="ps-progress-line">
                          <div className="ps-progress-line-fill" style={{ width: progressFill }} />
                        </div>

                        <div className="ps-step">
                          <div className={`ps-step-circle ${currentStep >= 2 ? "completed" : currentStep >= 1 ? "active" : ""}`}>
                            {currentStep >= 2 ? (
                              <svg viewBox="0 0 14 14" fill="none" width="14" height="14">
                                <path d="M2 7 L6 11 L12 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            ) : "1"}
                          </div>
                          <span className={`ps-step-label ${currentStep >= 1 ? "active" : ""}`}>
                            Parent Information
                          </span>
                        </div>

                        <div className="ps-step">
                          <div className={`ps-step-circle ${currentStep >= 2 ? "active" : ""}`}>2</div>
                          <span className={`ps-step-label ${currentStep >= 2 ? "active" : ""}`}>
                            Plan &amp; Payment
                          </span>
                        </div>
                      </div>
                      <div className="ps-card">

                        {/* How many children */}
                        <div className="ps-children-header">
                          <MultiStudentIcon />
                          <div className="ml-3">
                            <p className="ps-children-title">How many children will use Crystal Instruction?</p>
                            <p className="ps-children-sub">
                              You&apos;ll be able to add and manage each child inside your parent dashboard.
                            </p>
                          </div>
                        </div>

                        {/* Stepper */}
                        <div className="d-flex flex-column align-items-center mb-4">
                          <div className="ps-stepper d-flex align-items-center">
                            <button
                              className="ps-stepper-btn"
                              onClick={() => setChildrenCount((c) => Math.max(1, c - 1))}
                              aria-label="Decrease"
                            >
                              &#8722;
                            </button>
                            <span className="ps-stepper-count">{childrenCount}</span>
                            <button
                              className="ps-stepper-btn"
                              onClick={() => setChildrenCount((c) => c + 1)}
                              aria-label="Increase"
                            >
                              &#43;
                            </button>
                          </div>
                          <p className="ps-stepper-hint">$249 per child, per year</p>
                        </div>

                        {/* Grades info box */}
                        <div className="ps-info-box">
                          <BookIcon />
                          <div className="ml-3">
                            <p className="ps-info-box-title">For Students in Grades 2–5</p>
                            <p className="ps-info-box-sub">
                              Crystal Instruction is designed for students in grades 2–5
                              with interactive lessons and digital worksheets aligned to TEKS.
                            </p>
                          </div>
                        </div>

                        {/* What's included */}
                        <div className="ps-included-section">
                          {/* <ShieldCheckIcon /> */}
                          <div className="w-100">
                            <p className="ps-included-title">What&apos;s included with each child:</p>
                            <div className="row">
                              {[
                                "Adaptive Lessons",
                                "Digital Worksheets",
                                "Built to the TEKS",
                                "Math, Elar and Science",
                                "Actionable Reporting",
                                "Free ClassCade Access"
                              ].map((feat) => (
                                <div key={feat} className="col-md-12">
                                  <p className="ps-included-item d-flex align-items-center">
                                    <CheckIcon />
                                    <span style={{ fontSize: "16px" }}>{feat}</span>
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Right: Order summary + payment */}
                    <div className="col-md-5 mb-4">
                      <div className="ps-payment-card">

                        {/* Order summary */}
                        <div className="order-summary">
                          <p className="ps-payment-section-title">Order Summary</p>
                          <div className="ps-order-row">
                            <span className="ps-order-label">Children</span>
                            <span className="ps-order-value">{childrenCount}</span>
                          </div>
                          <div className="ps-order-row">
                            <span className="ps-order-label">Price per child</span>
                            <span className="ps-order-value">$249.00</span>
                          </div>
                          <hr className="ps-divider-border" />
                          <div className="ps-order-total">
                            <div>
                              <p className="ps-order-total-label">Total Due Today</p>
                              <p className="ps-order-billed">Billed annually</p>
                            </div>
                            <span className="ps-order-total-amount">${(childrenCount * 249).toFixed(2)}</span>
                          </div>
                        </div>

                        {/* Stripe Payment Form */}
                        <Elements stripe={stripePromise} options={stripeOptions}>
                          <ParentPaymentCard userData={{ signupData: formData }} childrenCount={childrenCount} />
                        </Elements>
                      </div>
                    </div>
                  </div>

                {/* Trust bar */}
                <div className="row justify-content-center">
                  <div className={`col-12 ${paymentSuccess ? "col-md-8" : "col-md-12"}`}>
                    <div className="ps-trust-bar d-flex align-items-center">
                      <div className="ps-trust-item flex-fill">
                        <ShieldIcon />
                        <div>
                          <p className="ps-trust-label">Safe. Secure. Private.</p>
                          <p className="ps-trust-sub">Your information is always protected. We never share your data.</p>
                        </div>
                      </div>
                      <div className="ps-trust-divider d-none d-md-block mx-3" style={{ width: 1, alignSelf: "stretch", background: "#e0e6ed" }} />
                      <div className="ps-trust-item flex-fill">
                        <MultiStudentIcon />
                        <div>
                          <p className="ps-trust-label">Manage Multiple Students</p>
                          <p className="ps-trust-sub">Add and manage multiple children from a single parent account.</p>
                        </div>
                      </div>
                      {!paymentSuccess && (
                        <>
                      <div className="ps-trust-divider d-none d-md-block mx-3" style={{ width: 1, alignSelf: "stretch", background: "#e0e6ed" }} />
                        <div className="ps-trust-item flex-fill">
                          <HomeGradeIcon />
                          <div>
                            <p className="ps-trust-label">For Grades 2–5</p>
                            <p className="ps-trust-sub">Interactive lessons and digital worksheets aligned to TEKS.</p>
                        </div>
                      </div>
                      </>
                      )}
                    </div>
                  </div>
                </div>
              </>
            </>
          )}

        </div>
      </div>
    </>
  );
};

export default ParentSignup;

import React, { useEffect, useState } from "react";
import { CommonService } from "../services/api/common_service";
import Select, { StylesConfig } from "react-select";
import {
  DistrictList,
  ReqInsertData,
  RoleList,
  SchoolList,
  StateList,
  UserRegisterData,
} from "@interface/ICommon";
import Loader from "@components/common/loader";
import { ToastrService } from "@services/Toastr";
import ALERTMESSAGES from "@constants/alertMessages";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import { Configuration } from "@environment/startUp";
import ReCAPTCHA from "react-google-recaptcha";
import { helper } from "utility/helper";
import CommonMessageModal from "@components/modal/common/commonMessageModal";
import COMMONCONSTANT from "@constants/commonConstant";
import { useRouter } from "next/router";
const Signup = () => {
  let router = useRouter();
  let recaptchaRef: any = React.createRef();
  interface type {
    label: string;
    value: number;
    name: string;
    email?: string;
    note?: string;
  }
  let rowkey = 0;
  let initial_data: UserRegisterData = {
    firstName: "",
    lastName: "",
    stateId: 0,
    districtId: 0,
    schoolId: 0,
    roleId: 0,
    email: "",
    password: "",
    confirm_password: "",
    schoolName: "",
    districtName: "",
    streetAddress: "",
    productId: 2
  };
  const [submitButton, showSubmitStep] = useState(false);
  const [selectedState, setSelectedState] = useState(null);

  const [selectoptions, setSelectOptions] = useState<type[]>();
  const [districtOptions, setDistrictOptions] = useState<type[]>();
  const [roleOptions, setRoleOptions] = useState<type[]>();
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectschoolOption, setSelectschoolOption] = useState<type[]>();
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [validationError, setValidationError] = useState<any>({});
  const [titleData, SetTitleData] = useState<Array<RoleList>>([]);
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [showExtraFieldFlag, setShowExtraFieldFlag] = useState<boolean>(false);
  const [captchaValue, SetCaptchaValue] = useState<any>();
  const [note, Setnote] = useState<string>();
  const [districtEmailExt, SetdistrictEmailExt] = useState<string>();
  const [signupData, setSignupData] = useState<UserRegisterData>(initial_data);
  const [showMessageModal, setShowMessageModal] = useState<boolean>(false);

  const colourStyles: StylesConfig<any> = {
    control: (styles, { isDisabled }) => ({
      ...styles,
      backgroundColor: "rgb(0 0 0 / 20%)",
      opacity: isDisabled ? "0.3" : "",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        color: "black",
      };
    },
    input: (styles) => ({ ...styles, color: "#fff" }),
    placeholder: (styles) => ({ ...styles, color: "#fff" }),
    singleValue: (styles, { data }) => ({ ...styles, color: "#fff" }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#fff",
    }),
  };
  useEffect(() => {
    getStateList();
    getRoleList();
    setShowLoader(false);
  }, []);
  const getStateList = () => {
    let state_option_list: Array<type> = [];
    CommonService.get_state_listByActive(true).then((resp: StateList[]) => {
      resp.map((item: StateList) => {
        let stateoptions: type = {
          label: item.stateName,
          value: item.stateId,
          name: "stateId",
          note: item.note,
        };
        state_option_list.push(stateoptions);
        setSelectOptions(state_option_list);
      });
    });
  };
  const getRoleList = () => {
    let RoleLists: any = [];
    let roles = COMMONCONSTANT.USERROLESIGNUP;
    roles.map((item: RoleList) => {
      let RoleOptions = {
        label: item.name,
        value: item.roleId,
        name: "roleId",
      };
      RoleLists.push(RoleOptions);
      setRoleOptions(RoleLists);
    });
  };
  const getDistrictList = (stateId: number) => {
    let distirct_option_list: any = [];

    CommonService.get_district_list(stateId).then((resp: DistrictList[]) => {
      if (resp) {
        resp.map((item: DistrictList) => {
          let districtoptions = {
            label: item.districtName,
            value: item.districtId,
            name: "districtId",
            email: item.email,
          };
          distirct_option_list.push(districtoptions);
          setDistrictOptions(distirct_option_list);
        });
      }
    });
  };
  const handle_filter = (e: any) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
    delete validationError[e.target.name];
  };
  const handle_dropdown = (e: any) => {
    if (e.name == "roleId") {
      setSelectedRole(e);
      setSignupData({ ...signupData, [e.name]: e.value });
    }
    if (e.name == "stateId") {
      setSelectedState(e);
      setSelectedDistrict(null);
      setSelectedSchool(null);
      setSelectschoolOption([]);
      getDistrictList(e.value);
      Setnote(e.note);
      setSignupData({
        ...signupData,
        [e.name]: e.value,
        districtId: 0,
      });
    } else if (e.name === "districtId") {
      setSelectedDistrict(e);
      setSelectedSchool(null);
      if (e.email) SetdistrictEmailExt(e.email);
      else SetdistrictEmailExt("");

      CommonService.get_elementary_school_list(
        signupData.stateId,
        e.value
      ).then((resp: SchoolList[]) => {
        if (resp) {
          let school_option_list: Array<type> = [];
          resp.map((item: SchoolList) => {
            let schoolOption: type = {
              label: item.schoolName,
              value: item.schoolId,
              name: "schoolId",
            };
            school_option_list.push(schoolOption);
          });
          setSelectschoolOption(school_option_list);
        }
      });
      setSignupData({
        ...signupData,
        ["districtName"]: e.label,
        [e.name]: e.value,
        schoolId: 0,
      });
    } else if (e.name === "schoolId") {
      setSignupData({ ...signupData, [e.name]: e.value });
      setSelectedSchool(e);
    }
    delete validationError[e.name];
  };
  const submit = () => {
    let errors: any = {};
    let regex = /^[a-zA-Z0-9+_.-]+@(?:[a-zA-Z0-9+_.-]+\.)+[A-Za-z]+$/;
    if (!signupData.email) {
      errors.email = "Email is required";
    } else if (!regex.test(signupData.email)) {
      errors.email = "Invalid email format";
    } else if (
      !checkEmailExtension(signupData.email.trim(), districtEmailExt)
    ) {
      errors.email = validationError.email;
    }
    if (!signupData.roleId) {
      errors.roleId = "Title is required";
    }
    if (!signupData.password) {
      errors.password = "Password is required";
    } else {
      if (!checkPassword(signupData.password)) {
        errors.password = validationError.password;
      }
    }
    if (!signupData.confirm_password) {
      errors.confirm_password = "Password is required";
    }
    if (
      signupData.password &&
      signupData.confirm_password &&
      signupData.password !== signupData.confirm_password
    ) {
      errors.confirm_password = "Password and Confirm password does not match";
    }
    setValidationError(errors);
    if (Object.keys(errors).length === 0) {
      let data: any = signupData;
      if (!showExtraFieldFlag) {
        delete data["streetAddress"];
        delete data["schoolName"];
        delete data["districtName"];
      }
      setShowLoader(true);
      CommonService.user_registration(data)
        .then((resp: any) => {
          if (resp) {
            reset_form();
            setShowLoader(false);
            showSubmitStep(false);
            setShowExtraFieldFlag(false);
            if (showExtraFieldFlag) {
              ToastrService.success(ALERTMESSAGES.Registration_Info);
            } else {
              ToastrService.success(ALERTMESSAGES.Registration);
            }
            document.getElementById("firstName")?.focus();
            setShowMessageModal(true);

            //  This is a temporary function. This is used to bypass the email verification process.
            setTimeout(() => {
              setShowMessageModal(false);
              window.parent.location.href = Configuration.LoginUrl+'?tabIndex=1';
            }, 5000);
          }
        })
        .catch((res: any) => {
          if (res.errors?.Email) {
            ToastrService.error(res.errors.Email);
          } else {
            ToastrService.error("Something went wrong.");
          }
          setShowLoader(false);
        });
    }
  };
  const next = () => {
    let errors: any = {};
    if (!signupData.firstName) {
      errors.firstName = "First Name is required";
    }
    if (!signupData.lastName) {
      errors.lastName = "Last Name is required";
    }
    if (!signupData.stateId) {
      errors.stateId = "State is required";
    }
    if (!signupData.districtId) {
      errors.districtId = "District is required";
    }
    if (showExtraFieldFlag) {
      if (!signupData.districtName) {
        errors.districtName = "District Name is required";
      }
      if (!signupData.schoolName) {
        errors.schoolName = "School Name is required";
      }
      if (!signupData.streetAddress) {
        errors.streetAddress = "Address is required";
      }
    } else {
      if (!signupData.schoolId) {
        errors.schoolId = "School is required";
      }
    }
    setValidationError(errors);
    if (Object.keys(errors).length === 0) {
      showSubmitStep(true);
      document.getElementById("firstName")?.focus();
      document.getElementById("roleId")?.focus();
    }
  };
  const reset_form = () => {
    setSelectedState(null);
    setSelectedDistrict(null);
    setSelectedSchool(null);
    setSelectedRole(null);
    setDistrictOptions([]);
    setSelectschoolOption([]);
    Setnote("");
    setSignupData({ ...initial_data });
  };
  const onChange = (e: any) => {
    SetCaptchaValue(e);
  };
  const checkEmailExtension = (current_email: string, validEmailExt: any) => {
    let errors: any = {};
    let ext = current_email.split("@");
    if (
      ext[1] != "" &&
      ext[1] != null &&
      validEmailExt != "" &&
      validEmailExt != null &&
      ext[1] === validEmailExt
    ) {
      delete validationError["email"];
      return true;
    } else if (validEmailExt == null || validEmailExt == "") {
      let arr = COMMONCONSTANT.COMMONEMAILLIST;
      let emailext = ext[1].trim().toLocaleLowerCase();
      if (arr.includes(emailext)) {
        errors.email = "Personal email is not allowed.";
      } else {
        delete validationError["email"];
        return true;
      }
    } else {
      errors.email =
        "We are currently only available to elementary school teachers and administrators, please enter your valid school email address with the district you are signing up under.";
    }
    setValidationError({
      ...validationError,
      email: errors.email,
    });

    return false;
  };
  const checkPassword = (value: any) => {
    let errors: any = {};
    if (helper.check_password(value)) {
      delete validationError["password"];
      return true;
    } else {
      errors.password =
        "Password must be at least 8 characters long contain a number , uppercase letter and a special character.";
    }
    setValidationError({
      ...validationError,
      password: errors.password,
    });

    return false;
  };

  const showExtraField = () => {
    let value = !showExtraFieldFlag;
    if (value) {
      setSignupData({ ...signupData, schoolId: 0 });
      setSelectedSchool(null);
    }
    setShowExtraFieldFlag(value);
  };
  return (
    <>
      <Head>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" />
        <link
          href="/static/css/signup.css"
          rel="stylesheet"
          key="signupcss"
        ></link>
      </Head>
      {showLoader && <Loader />}
      <ToastContainer />
      <div className="site-wrapper">
        <div className="content content-div">
  
          <div className="page-container inner-page-container-div">
            
            <div className="signupContainer">
              <div className="signupContainerInner">
                <div className="loginTop d-flex justify-content-center align-items-center m-auto">
                  <div className="singupSection w-100">
                    <form>
                   
                      {!submitButton ? (

                       
                        <div className="wrapper d-flex flex-wrap">

                           {/* <h3 className="heading">
                            Step <span className="stepnumber">1</span>
                          </h3>  */}

                        
                              <div className="w-100">
                                <div className="progress-container">
                                  <div className="progress" id="progress"></div>
                                  <div className="d-flex flex-column justify-content-center">
                                  <div className="circle active">1</div>
                                  <p>Step 1</p>
                                  </div>
                                  <div className="d-flex flex-column step-2 ">
                                  <div className="circle">2</div>
                                  <p>Step 2</p>
                                  </div>
                                
                                </div>
                              </div>
                           

                          
                          <div className="signup-box">
                          <div className="form-row w-100 ">

                        

                          <div className="form-group col-md-6 ">
                            <label>First Name</label>
                            <input
                              type="text"
                              name="firstName"
                              id="firstName"
                              value={signupData.firstName}
                              onChange={handle_filter}
                              autoComplete="off"
                            />
                            {validationError.firstName ? (
                              <span className="validation-error">
                                {validationError.firstName}
                              </span>
                            ) : (
                              ""
                            )}
                          </div>

                          <div className="form-group col-md-6">
                            <label>Last Name</label>
                            <input
                              type="text"
                              name="lastName"
                              id="lastName"
                              value={signupData.lastName}
                              onChange={handle_filter}
                              autoComplete="off"
                            />
                            {validationError.lastName ? (
                              <span className="validation-error">
                                {validationError.lastName}
                              </span>
                            ) : (
                              ""
                            )}
                          </div>

                          </div>


                         <div className="form-row w-100">
                              <div className="form-group  col-md-6">
                                <label>State</label>
                                <div className="">
                                  <Select
                                    name="stateId"
                                    value={selectedState}
                                    options={selectoptions}
                                    onChange={handle_dropdown}
                                    placeholder="Select State"
                                    id="stateId"
                                    styles={colourStyles}
                                  />
                                  {note != "" ? (
                                    <div className="info">{note}</div>
                                  ) : null}
                                  {validationError.stateId ? (
                                    <span className="validation-error">
                                      {validationError.stateId}
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                              <div className="form-group col-md-6">
                                <label>District</label>
                                <div className="">
                                  <Select
                                    name="districtId"
                                    value={selectedDistrict}
                                    options={districtOptions}
                                    onChange={handle_dropdown}
                                    placeholder="Select District"
                                    styles={colourStyles}
                                  />
                                  {validationError.districtId ? (
                                    <span className="validation-error">
                                      {validationError.districtId}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                </div>
                         </div>
                            <div className="form-row w-100">
                          <div className="form-group col-md-12">
                            <label>School </label>
                            <div className="">
                              <Select
                                name="schoolId"
                                value={selectedSchool}
                                options={selectschoolOption}
                                onChange={handle_dropdown}
                                placeholder="Select School"
                                styles={colourStyles}
                                isDisabled={showExtraFieldFlag}
                              />
                              {validationError.schoolId ? (
                                <span className="validation-error">
                                  {validationError.schoolId}
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                            {!showExtraFieldFlag ? (
                              <div className="info">
                                Don’t see your school or district,{" "}
                                <span
                                  className="info-link"
                                  onClick={showExtraField}
                                >
                                  click here to request
                                </span>{" "}
                                we add it
                              </div>
                            ) : null}
                            {showExtraFieldFlag ? (
                              <div className="extrafield">
                                <div className="form-group ">
                                  <label>District Name</label>
                                  <input
                                    type="text"
                                    name="districtName"
                                    id="districtName"
                                    value={signupData.districtName}
                                    onChange={handle_filter}
                                    disabled
                                  />
                                  {validationError.districtName ? (
                                    <span className="validation-error">
                                      {validationError.districtName}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div className="form-row w-100" >
                                <div className="form-group col-md-12 ">
                                  <label>School Name</label>
                                  <input
                                    type="text"
                                    name="schoolName"
                                    id="schoolName"
                                    value={signupData.schoolName}
                                    onChange={handle_filter}
                                    autoComplete="off"
                                  />
                                  {validationError.schoolName ? (
                                    <span className="validation-error">
                                      {validationError.schoolName}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                </div>
                              
                                <div className="form-group w-100">
                                  <label>Street Address</label>
                                  <input
                                    type="text"
                                    name="streetAddress"
                                    id="streetAddress"
                                    value={signupData.streetAddress}
                                    onChange={handle_filter}
                                    autoComplete="off"
                                  />
                                  {validationError.streetAddress ? (
                                    <span className="validation-error">
                                      {validationError.streetAddress}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                              
                                </div>
                                {showExtraFieldFlag ? (
                                  <div className="info">
                                    If you find your school,{" "}
                                    <span
                                      className="info-link"
                                      onClick={showExtraField}
                                    >
                                      click here to request
                                    </span>{" "}
                                    remove this field.
                                  </div>
                                ) : null}
                              </div>
                            ) : null}
                          </div>
                          </div>
                        </div>
                        </div>

                      ) : (
                        <div >
                          <div className="wrapper d-flex flex-wrap">
                            
                            <div className="w-100">
                                <div className="progress-container">
                                  <div className="progress" id="progress"></div>
                                  <div className="d-flex flex-column">
                                  <div className="circle success ">
                                    <img src="../check.png" alt="" />
                                  </div>
                                  <p>Step 1</p>
                                  </div>
                                  <div className="d-flex flex-column step-2">
                                  <div className="circle active">2</div>
                                  <p>Step 2</p>
                                  </div>
                                
                                </div>
                              </div>
                            <div className="signup-box">

                              <div className="form-row w-100 ">
                           
                            <div className="form-group col-md-6">
                              <label>Role</label>
                              <div className="">
                                <Select
                                  name="roleId"
                                  value={selectedRole}
                                  options={roleOptions}
                                  onChange={handle_dropdown}
                                  placeholder="Select Title"
                                  id="roleId"
                                  styles={colourStyles}
                                />
                                {validationError.roleId ? (
                                  <span className="validation-error">
                                    {validationError.roleId}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>

                            <div className="form-group col-md-6">
                              <label>Email</label>
                              <input
                                type="text"
                                name="email"
                                id="email"
                                value={signupData.email}
                                onChange={handle_filter}
                                onBlur={(e) => {
                                  checkEmailExtension(
                                    signupData.email,
                                    districtEmailExt
                                  );
                                }}
                                autoComplete="off"
                              />
                              {validationError.email ? (
                                <span className="validation-error">
                                  {validationError.email}
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                            </div>
                            <div className="form-row w-100 ">
                            <div className="form-group col-md-6">
                              <label>Password</label>
                              <input
                                type="password"
                                name="password"
                                id="password"
                                value={signupData.password}
                                onChange={handle_filter}
                                onBlur={(e) => {
                                  checkPassword(signupData.password);
                                }}
                                autoComplete="off"
                              />
                              {validationError.password ? (
                                <span className="validation-error">
                                  {validationError.password}
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="form-group col-md-6">
                              <label>Confirm password </label>
                              <input
                                type="password"
                                name="confirm_password"
                                id="confirm_password"
                                value={signupData.confirm_password}
                                onChange={handle_filter}
                                autoComplete="off"
                              />
                              {validationError.confirm_password ? (
                                <span className="validation-error">
                                  {validationError.confirm_password}
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                            </div>
                        
                          <div className="captcha">
                            <ReCAPTCHA
                              ref={recaptchaRef}
                              sitekey={Configuration.siteKey}
                              onChange={onChange}
                            />
                          </div>
                          </div>
                          </div>
                        </div>
                      )}
                      <div className="row loginFooter">
                        <div className="col-12 text-center">
                          {!submitButton ? (
                            <button
                              type="button"
                              className="btn btn-primary "
                              onClick={next}
                            >
                              Next
                            </button>
                          ) : (
                            <div>
                              <button
                                type="button"
                                className="btn btn-primary previousBtn"
                                onClick={() => {
                                  showSubmitStep(false);
                                }}
                              >
                                Previous
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={submit}
                                disabled={captchaValue ? false : true}
                              >
                                Submit
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CommonMessageModal
            showMessageModal={showMessageModal}
            setShowMessageModal={setShowMessageModal}
            showPropsMessage={true}
            title={"Congratulations!"}
            message={
              "Deep-sea adventurer! You've successfully registered for Underwater Math. Get ready to dive into the world of math and discover its hidden treasures. We're excited to have you aboard! You will now be redirected to the login page where you can start your journey. Thank you for choosing Underwater Math."
            }
          />
        </div>
      </div>
    </>
  );
};

export default Signup;

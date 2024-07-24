import Loader from "@components/common/loader";
import COMMONCONSTANT from "@constants/commonConstant";
import { DistrictList, RoleList, SchoolList, StateList } from "@interface/ICommon"
import { CommonService } from "@services/api/common_service";
import { ToastrService } from "@services/Toastr";
import React, { useEffect, useState } from "react"
import { helper } from "utility/helper";
const QuoteForm = () => {
  let intialValues = {
    name: '',
    email: '',
    stateId: 0,
    districtId: 0,
    schoolId: 0,
    noOfStudent: 0,
    roleId: 0,
    districtName: "",
    schoolName: "",
    streetAddress: "",
    quoteType: COMMONCONSTANT.QUOTETYPE.SCHOOL,
    noOfSchool: 0,
    comment:""
  }
  const [roles, setRoles] = useState<RoleList[]>([]);
  const [states, setStates] = useState<StateList[]>([]);
  const [districts, setDistircts] = useState<DistrictList[]>([]);
  const [schools, setSchools] = useState<SchoolList[]>([]);
  const [formData, setFormData] = useState(intialValues);
  const [emailExt, setEmailExt] = useState<string | undefined | null>('');
  const [validationError, setValidationError] = useState({ name: '', email: '', schoolId: '', noOfStudent: '', roleId: '', districtName: '', schoolName: '', streetAddress: '', noOfSchool: '', districtId: '' });
  const [showExtraFieldFlag, setShowExtraFieldFlag] = useState<boolean>(false);
  const [showDistrictExtraFieldFlag, setShowDistrictExtraFieldFlag] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  useEffect(() => {
    CommonService.get_state_list().then((resp) => {
      setStates(resp);
    })
    get_roles();
  }, []);

  const get_roles = () => {
    CommonService.get_role_list().then((resp) => {
      let respfilter = resp.filter((item)=>item.roleName !== 'Student' && item.roleName !== 'Parent');
      setRoles(respfilter);
    })
  }

  const handle_change = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (e.target.name === 'stateId') {
      CommonService.get_district_list(parseInt(e.target.value)).then((resp) => {
        setDistircts(resp);
      })
    }
    if (e.target.name === 'districtId') {
      setEmailExt(districts.find((item) => item.districtId === parseInt(e.target.value))?.email);
      let districtname = districts.find((item) => item.districtId === parseInt(e.target.value))?.districtName;
      if (districtname) {
        formData.districtName = districtname;
      }
      CommonService.get_school_list(parseInt(e.target.value)).then((resp) => {
        setSchools(resp);
      })
    }
    if(e.target.name === 'schoolId'){
      let schoolname = schools.find((item)=>item.schoolId === parseInt(e.target.value))?.schoolName;
      if(schoolname){
        formData.schoolName = schoolname;
      }
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
    validationError[e.target.name as keyof typeof validationError] = "";

  }

  const submit_form = (e: React.ChangeEvent<HTMLFormElement>) => {
    setShowLoader(true);
    let anyerror = false;
    e.preventDefault();
    if (formData.quoteType === COMMONCONSTANT.QUOTETYPE.SCHOOL) {
      if (showExtraFieldFlag) {
        if (!formData.districtName) {
          validationError.districtName = "District Name is required";
        }
        if (!formData.schoolName) {
          validationError.schoolName = "School Name is required";
        }
        if (!formData.streetAddress) {
          validationError.streetAddress = "Address is required";
        }
      } else {
        if (!formData.schoolId) {
          anyerror = true;
          validationError.schoolId = 'School is required';
        }
      }
      if (!formData.noOfStudent) {
        anyerror = true;
        validationError.noOfStudent = 'No of Students is required';
      }
      if (formData.noOfStudent > 10000) {
        anyerror = true;
        validationError.noOfStudent = 'No of Students should be less than 10000';
      }
    } else {
      if (showDistrictExtraFieldFlag) {
        if (!formData.districtName) {
          validationError.districtName = 'District Name is required'
        }
      } else {
        if (!formData.districtId) {
          validationError.districtId = "District is required"
        }
      }
      if (!formData.noOfSchool) {
        anyerror = true;
        validationError.noOfSchool = 'No of School is required';
      }
      if (formData.noOfSchool > 10000) {
        anyerror = true;
        validationError.noOfSchool = 'No of School should be less than 10000';
      }
    }
    if (!formData.name) {
      anyerror = true;
      validationError.name = 'Name is required';
    }
    if (!formData.email) {
      anyerror = true;
      validationError.email = 'Email is required';
    }
    let checkemail = helper.check_email_extension(formData.email, emailExt);
    if (checkemail !== '' && !showDistrictExtraFieldFlag) {
      anyerror = true;
      validationError.email = checkemail;
    }
    if (!formData.roleId) {
      anyerror = true;
      validationError.roleId = 'Role is required';
    }
    setValidationError({ ...validationError });
    if (!anyerror) {
      CommonService.add_school_district_quote(formData).then(() => {
        ToastrService.success("Thanks for your interest. We will reach out soon to fulfill your quote request.");
        setShowExtraFieldFlag(false);
        setShowDistrictExtraFieldFlag(false);
        setDistircts([]);
        setShowLoader(false);
        setTimeout(() => {
          setFormData(intialValues);
        }, 1000);
      })
    } else {
      setShowLoader(false);
    }
  }

  const showExtraField = () => {
    let value = !showExtraFieldFlag;
    if (value) {
      formData.schoolId = 0;
      formData.schoolName = "";
      setFormData({ ...formData });
    }
    setShowExtraFieldFlag(value);
  };

  const show_district_extra_field = () => {
    let value = !showDistrictExtraFieldFlag;
    if (value) {
      formData.districtId = 0
      setFormData({ ...formData });
      setValidationError({ ...validationError, districtId: '', email: '' });
    }
    setShowDistrictExtraFieldFlag(value);
  }

  const set_quote = (type: number) => {
    formData.quoteType = type;
    if (type === COMMONCONSTANT.QUOTETYPE.DISTRICT) {
      formData.districtId = 0;
      formData.districtName = '';
      formData.noOfStudent = 0;
    } else {
      formData.noOfSchool = 0;
      formData.schoolName = '';
      formData.streetAddress = '';
    }
    setFormData({ ...formData })
  }

  return (
    <>
      {showLoader && <Loader />}
      <div className="q-form-wrapper signupContainer">
        <div className="tabBx">
          <div className="tabTitle">Would you like a quote for your school or district? </div>
          <div className="tabGroup d-flex align-items-center">
            <div className={`cursor-pointer tab ${formData.quoteType === COMMONCONSTANT.QUOTETYPE.SCHOOL ? 'active' : ''}`} onClick={() => set_quote(COMMONCONSTANT.QUOTETYPE.SCHOOL)}>School Quote</div>
            <div className={`cursor-pointer tab ${formData.quoteType === COMMONCONSTANT.QUOTETYPE.DISTRICT ? 'active' : ''}`} onClick={() => set_quote(COMMONCONSTANT.QUOTETYPE.DISTRICT)}>District Quote</div>
          </div>
        </div>
        <div>
          <div className="singupSection">
            <form onSubmit={submit_form}>
              <div className="form-row">
                <div className="form-group col-md-6 ">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handle_change}
                    value={formData.name}
                  />
                  <div className="validation-error">{validationError.name}</div>
                </div>
                <div className="form-group col-md-6 ">
                  <label>Role</label>
                  <select className="form-control" name="roleId" onChange={handle_change} value={formData.roleId}>
                    <option value="">Select Role</option>
                    {roles.map((item) => (
                      <option key={item.roleId + "role"} value={item.roleId}>{COMMONCONSTANT.ROLES[item.roleId]}</option>
                    ))}
                  </select>
                  <div className="validation-error">{validationError.roleId}</div>
                </div>
                <div className="form-group col-md-6 ">
                  <label>State</label>
                  <select className="form-control" name="stateId" onChange={handle_change} value={formData.stateId}>
                    <option value="">Select State</option>
                    {states.map((item) => (
                      <option key={item.stateId + "state"} value={item.stateId}>{item.stateName}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-md-6 ">
                  <label>District</label>
                  <select className="form-control" name="districtId" onChange={handle_change} value={formData.districtId}>
                    <option value="">Select District</option>
                    {districts.map((item) => (
                      <option key={item.districtId + "district"} value={item.districtId}>{item.districtName}</option>
                    ))}
                  </select>
                  <div className="validation-error">{validationError.districtId}</div>
                </div>
                {formData.quoteType === COMMONCONSTANT.QUOTETYPE.SCHOOL && <div className="form-group col-md-6 ">
                  <label>Schools</label>
                  <select className="form-control" name="schoolId" onChange={handle_change} disabled={showExtraFieldFlag} value={formData.schoolId}>
                    <option value="">Select School</option>
                    {schools.map((item) => (
                      <option key={item.schoolId + "school"} value={item.schoolId}>{item.schoolName}</option>
                    ))}
                  </select>
                  <div className="validation-error">{validationError.schoolId}</div>
                </div>}
                <div className="form-group col-md-6 ">
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handle_change}
                    onBlur={() => {
                      if (!showDistrictExtraFieldFlag) {
                        setValidationError({ ...validationError, 'email': helper.check_email_extension(formData.email, emailExt) })
                      } else {
                        setValidationError({ ...validationError, 'email': '' });
                      }
                    }
                    }
                  />
                  <div className="validation-error">{validationError.email}</div>
                </div>
                {formData.quoteType === COMMONCONSTANT.QUOTETYPE.SCHOOL ?
                  <div className="form-group col-md-6 ">
                    <label>No of Students</label>
                    <input
                      type="number"
                      value={formData.noOfStudent}
                      name="noOfStudent"
                      onChange={handle_change}
                    />
                    <div className="validation-error">{validationError.noOfStudent}</div>
                  </div> :
                  <div className="form-group col-md-6 ">
                    <label>No of Schools</label>
                    <input
                      type="number"
                      name="noOfSchool"
                      value={formData.noOfSchool}
                      onChange={handle_change}
                    />
                    <div className="validation-error">{validationError.noOfSchool}</div>
                  </div>
                }
                 <div className="form-group col-md-12">
                    <label>Comment (optional)</label>
                    <textarea className="form-control" maxLength={2000} name="comment" value={formData.comment} onChange={handle_change}/>                    
                  </div>
              </div>
              {!showExtraFieldFlag && formData.quoteType === COMMONCONSTANT.QUOTETYPE.SCHOOL ?
                <div className="info">
                  Don’t see your school,{" "}
                  <span
                    className="info-link"
                    onClick={showExtraField}
                  >
                    click here
                  </span>{" "}
                  to add it
                </div>
                : !showDistrictExtraFieldFlag && formData.quoteType === COMMONCONSTANT.QUOTETYPE.DISTRICT ?
                  <div className="info">
                    Don’t see your district,{" "}
                    <span
                      className="info-link"
                      onClick={show_district_extra_field}
                    >
                      click here
                    </span>{" "}
                    to add it
                  </div>
                  : null}
              {showExtraFieldFlag && formData.quoteType === COMMONCONSTANT.QUOTETYPE.SCHOOL ? (
                <div className="extrafield">
                  <div className="form-row w-100" >
                    <div className="form-group col-md-6 ">
                      <label>District Name</label>
                      <input
                        type="text"
                        name="districtName"
                        id="districtName"
                        value={formData.districtName}
                        onChange={handle_change}
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
                    <div className="form-group col-md-6 ">
                      <label>School Name</label>
                      <input
                        type="text"
                        name="schoolName"
                        id="schoolName"
                        value={formData.schoolName}
                        onChange={handle_change}
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
                  <div className="form-row w-100" >
                    <div className="form-group col-md-12">
                      <label>Street Address</label>
                      <input
                        type="text"
                        name="streetAddress"
                        id="streetAddress"
                        value={formData.streetAddress}
                        onChange={handle_change}
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
                  </div>
                  {showExtraFieldFlag ? (
                    <div className="info">
                      If you find your school,{" "}
                      <span
                        className="info-link"
                        onClick={showExtraField}
                      >
                        click here
                      </span>{" "}
                      to remove this field.
                    </div>
                  ) : null}
                </div>
              ) : showDistrictExtraFieldFlag && formData.quoteType === COMMONCONSTANT.QUOTETYPE.DISTRICT ?
                <div className="extrafield">
                  <div className="form-row w-100" >
                    <div className="form-group col-md-6 ">
                      <label>District Name</label>
                      <input
                        type="text"
                        name="districtName"
                        id="districtName"
                        value={formData.districtName}
                        onChange={handle_change}
                      />
                      {validationError.districtName ? (
                        <span className="validation-error">
                          {validationError.districtName}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  {showDistrictExtraFieldFlag ? (
                    <div className="info">
                      If you find your district,{" "}
                      <span
                        className="info-link"
                        onClick={show_district_extra_field}
                      >
                        click here
                      </span>{" "}
                      to remove this field.
                    </div>
                  ) : null}
                </div>
                : null}
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
export default QuoteForm
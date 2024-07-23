import { DistrictList, RoleList, SchoolList, StateList } from "@interface/ICommon"
import { CommonService } from "@services/api/common_service";
import React, { useEffect, useState } from "react"
import { helper } from "utility/helper";

const SchoolQuoteForm = () => {
  let intialValues = {
    name:'',
    email:'',
    stateId:0,
    districtId:0,
    schoolId:0,
    noOfStudent:0,
    roleId:0
  }
  const [roles, setRoles] = useState<RoleList[]>([]);
  const [states, setStates] = useState<StateList[]>([]);
  const [districts, setDistircts] = useState<DistrictList[]>([]);
  const [schools,setSchools] = useState<SchoolList[]>([]);
  const [formData,setFormData] = useState(intialValues);
  const [emailExt,setEmailExt] = useState<string|undefined>('');
  const [validationError,setValidationError] = useState({name:'',email:'',schoolId:'',noOfStudent:'',roleId:''});
  useEffect(() => {
    CommonService.get_state_list().then((resp) => {
      setStates(resp);
    })
    get_roles();
  }, []);

  const get_roles = () => {
    CommonService.get_role_list().then((resp) => {
      setRoles(resp);
    })
  }

  const handle_change = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target.name === 'stateId') {
      CommonService.get_district_list(parseInt(e.target.value)).then((resp) => {
        setDistircts(resp);
      })
    }
    if(e.target.name === 'districtId'){
      console.log("dsd",districts.find((item)=>item.districtId === parseInt(e.target.value))?.email)
      setEmailExt(districts.find((item)=>item.districtId === parseInt(e.target.value))?.email);
      CommonService.get_school_list(parseInt(e.target.value)).then((resp)=>{
        setSchools(resp);
      })
    }
    setFormData({...formData,[e.target.name]:e.target.value});
    validationError[e.target.name as keyof typeof validationError] = "";
    
  }

  const submit_form = (e:React.ChangeEvent<HTMLFormElement>) => {
    let anyerror = false;
    e.preventDefault();
    if(!formData.name){
      anyerror = true;
      validationError.name = 'Name is required';
    }
    if(!formData.schoolId){
      anyerror = true;
      validationError.schoolId = 'School is required';
    }
    if(!formData.email){
      anyerror = true;
      validationError.email = 'Email is required';
    }
    let checkemail = helper.check_email_extension(formData.email,emailExt);
    if(checkemail !== ''){
      anyerror = true;
      validationError.email = checkemail;
    }
    if(!formData.noOfStudent){
      anyerror = true;
      validationError.noOfStudent = 'No of Students is required';
    }
    if(!formData.roleId){
      anyerror = true;
      validationError.roleId = 'Role is required'; 
    }
    setValidationError({...validationError});
    if(!anyerror){
      console.log("form submitted");
    }
  }
  return (

    <div className="q-form-wrapper ">
      <div className="signup-box singupSection">
        <form onSubmit={submit_form}>
        <div className="form-row">
          <div className="form-group col-md-6 ">
            <label>Name</label>
            <input
              type="text"
              name="name"
              onChange={handle_change}
            />
            <div className="validation-error">{validationError.name}</div>
          </div>        
          <div className="form-group col-md-6 ">
            <label>Role</label>
            <select className="form-control" name="roleId" onChange={handle_change}>
              <option value="">Select Role</option>
              {roles.map((item) => (
                <option key={item.roleId + "role"} value={item.roleId}>{item.roleName}</option>
              ))}
            </select>
            <div className="validation-error">{validationError.roleId}</div>
          </div>
          <div className="form-group col-md-6 ">
            <label>State</label>
            <select className="form-control" name="stateId" onChange={handle_change}>
              <option value="">Select State</option>
              {states.map((item) => (
                <option key={item.stateId + "state"} value={item.stateId}>{item.stateName}</option>
              ))}
            </select>
          </div>
          <div className="form-group col-md-6 ">
            <label>District</label>
            <select className="form-control" name="districtId" onChange={handle_change}>
              <option value="">Select District</option>
              {districts.map((item) => (
                <option key={item.districtId + "district"} value={item.districtId}>{item.districtName}</option>
              ))}
            </select>
          </div>
          <div className="form-group col-md-6 ">
            <label>Schools</label>
            <select className="form-control" name="schoolId" onChange={handle_change}>
              <option value="">Select School</option>
              {schools.map((item) => (
                <option key={item.schoolId+ "school"} value={item.schoolId}>{item.schoolName}</option>
              ))}
            </select>
            <div className="validation-error">{validationError.schoolId}</div>
          </div>
          <div className="form-group col-md-6 ">
            <label>Email</label>
            <input
              type="text"
              name="email"
              onChange={handle_change}
              onBlur={()=>setValidationError({...validationError,'email':helper.check_email_extension(formData.email,emailExt)})}
            />
            <div className="validation-error">{validationError.email}</div>
          </div>  
          <div className="form-group col-md-6 ">
            <label>No of Students</label>
            <input
              type="text"
              name="noOfStudents"
              onChange={handle_change}
            />
            <div className="validation-error">{validationError.noOfStudent}</div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  )
}
export default SchoolQuoteForm
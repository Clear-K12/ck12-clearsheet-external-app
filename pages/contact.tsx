import React, { useEffect, useState } from "react";
import { CommonService } from "../services/api/common_service";
import Select, { StylesConfig } from "react-select";
import {
  DistrictList,
  ReqInsertData,
  RoleList,
  StateList,
} from "@interface/ICommon";
import Loader from "@components/common/loader";
import { ToastrService } from "@services/Toastr";
import ALERTMESSAGES from "@constants/alertMessages";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const RequestMoreInfo = () => {
  interface type {
    label: string;
    value: number;
    name: string;
  }
  let rowkey = 0;
  let initial_data: ReqInsertData = {
    name: "",
    phone: "",
    email: "",
    roleId: 0,
    stateId: 0,
    districtId: 0,
    schoolId: 0,
    productId:2
  };
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

  // ,height:"40px", borderRadius: "40px", padding:"0"

  const [requestMoreData, setRequestMoreData] =
    useState<ReqInsertData>(initial_data);

  const colourStyles: StylesConfig<any> = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "#0c57b4",
      borderRadius: "40px",
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
    dropdownIndicator: base => ({
      ...base,
      color: "#fff"
    })
  
  };
  useEffect(() => {
    getStateList();
    getRoleList();
    setShowLoader(false);
  }, []);
  const getStateList = () => {
    let state_option_list: Array<type> = [];
    CommonService.get_state_list().then((resp: StateList[]) => {
      resp.map((item: any) => {
        let stateoptions = {
          label: item.stateName,
          value: item.stateId,
          name: "stateId",
        };
        state_option_list.push(stateoptions);
        setSelectOptions(state_option_list);
      });
    });
  };
  const getRoleList = () => {
    let RoleLists: any = [];
    CommonService.get_role_list().then((resp: RoleList[]) => {
      if (resp) {
        resp.map((item: any) => {
          let RoleOptions = {
            label: item.roleName,
            value: item.roleId,
            name: "roleId",
          };
          RoleLists.push(RoleOptions);
          setRoleOptions(RoleLists);
        });
      }
    });
  };
  const getDistrictList = (stateId: number) => {
    let distirct_option_list: any = [];

    CommonService.get_district_list(stateId).then((resp: DistrictList[]) => {
      if (resp) {
        resp.map((item: any) => {
          let districtoptions = {
            label: item.districtName,
            value: item.districtId,
            name: "districtId",
          };
          distirct_option_list.push(districtoptions);
          setDistrictOptions(distirct_option_list);
        });
      }
    });
  };
  const handle_filter = (e: any) => {
    setRequestMoreData({ ...requestMoreData, [e.target.name]: e.target.value });
    delete validationError[e.target.name];
  };
  const handle_dropdown = (e: any) => {
    if (e.name == "roleId") {
      setSelectedRole(e);
      setRequestMoreData({ ...requestMoreData, [e.name]: e.value });
    }
    if (e.name == "stateId") {
      setSelectedState(e);
      setSelectedDistrict(null);
      setSelectedSchool(null);
      setSelectschoolOption([]);
      getDistrictList(e.value);
      setRequestMoreData({
        ...requestMoreData,
        [e.name]: e.value,
        districtId: 0,
      });
    } else if (e.name === "districtId") {
      setSelectedDistrict(e);
      setSelectedSchool(null);
      CommonService.get_school_list(e.value).then((resp: any) => {
        if (resp) {
          let school_option_list: Array<type> = [];
          resp.map((item: any) => {
            let schoolOption = {
              label: item.schoolName,
              value: item.schoolId,
              name: "schoolId",
            };
            school_option_list.push(schoolOption);
            setSelectschoolOption(school_option_list);
          });
        }
      });
      setRequestMoreData({
        ...requestMoreData,
        [e.name]: e.value,
        schoolId: 0,
      });
    } else if (e.name === "schoolId") {
      setRequestMoreData({ ...requestMoreData, [e.name]: e.value });
      setSelectedSchool(e);
    }
    delete validationError[e.name];
  };
  const submit = () => {
    let errors: any = {};
    if (!requestMoreData.name) {
      errors.name = "Name is required";
    }
    if (requestMoreData.phone) {
      if (requestMoreData.phone.length > 10) {
        errors.phone = "Phone number should be of 10 digits";
      } else if (requestMoreData.phone.length < 10) {
        errors.phone = "Phone number must be of 10 digits";
      }
    }
    let regex = /^[a-zA-Z0-9+_.-]+@(?:[a-zA-Z0-9+_.-]+\.)+[A-Za-z]+$/;
    if (!requestMoreData.email) {
      errors.email = "Email is required";
    } else if (!regex.test(requestMoreData.email)) {
      errors.email = "Invalid email";
    }
    if (!requestMoreData.roleId) {
      errors.roleId = "Title is required";
    }
    if (!requestMoreData.stateId) {
      errors.stateId = "State is required";
    }
    if (!requestMoreData.districtId) {
      errors.districtId = "District is required";
    }
    if (!requestMoreData.schoolId) {
      errors.schoolId = "School is required";
    }
    setValidationError(errors);
    if (Object.keys(errors).length === 0) {
      setShowLoader(true);
      CommonService.insertRequestMoreInfo(requestMoreData).then(
        (resp: number) => {
          if (resp) {
            reset_form();
            setShowLoader(false);
            ToastrService.success(ALERTMESSAGES.LeadInsertSuccess);
          }
        }
      );
    }
  };
  const reset_form = () => {
    setSelectedState(null);
    setSelectedDistrict(null);
    setSelectedSchool(null);
    setSelectedRole(null);
    setDistrictOptions([]);
    setSelectschoolOption([]);
    setRequestMoreData({ ...initial_data });
  };

  return (
    <div>
      {showLoader && <Loader />}
      <ToastContainer />
      <form className="schoolpricingform" autoComplete="off">
        <div className="row">
          <div className="column">
       
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={requestMoreData.name}
              id="name"
              onChange={handle_filter}
            />
            {validationError.name ? (
              <span className="validation-error">{validationError.name}</span>
            ) : (
              ""
            )}
          </div>
          <div className="column">
          
            <input
              type="tel"
              placeholder="Phone"
              name="phone"
              id="phone"
              value={requestMoreData.phone}
              onChange={handle_filter}
            />
            {validationError.phone ? (
              <span className="validation-error">{validationError.phone}</span>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="row">
          <div className="column">
          
            <input
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              value={requestMoreData.email}
              onChange={handle_filter}
            />
            {validationError.email ? (
              <span className="validation-error">{validationError.email}</span>
            ) : (
              ""
            )}
          </div>
          <div className="column">
          
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
              <span className="validation-error">{validationError.roleId}</span>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="row">
          <div className="column">
          
            <Select
              name="stateId"
              value={selectedState}
              options={selectoptions}
              onChange={handle_dropdown}
              placeholder="Select State"
              id="stateId"
              styles={colourStyles}
            />
            {validationError.stateId ? (
              <span className="validation-error">
                {validationError.stateId}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="column">
          
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

        <div className="row">
          <div className="column">
           
            <Select
              name="schoolId"
              value={selectedSchool}
              options={selectschoolOption}
              onChange={handle_dropdown}
              placeholder="Select School"
              styles={colourStyles}
            />
            {validationError.schoolId ? (
              <span className="validation-error">
                {validationError.schoolId}
              </span>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="row text-center">          
            <input
              type="button"
              name="submit"
              value="Submit"
              className="button form-submit-btn "
              onClick={submit}
            />      
        </div>

        <div className="row">
          <div className="column" aria-colspan={2}></div>
        </div>
      </form>
    </div>
  );
};
export default RequestMoreInfo;

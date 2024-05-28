import APICONSTANT from "@constants/API";
import { DistrictList, RoleList, SchoolList, StateList } from "@interface/ICommon";
import axios from "axios";
import {setupInterceptorsTo} from "../api_Interceptors";
setupInterceptorsTo(axios);

export const CommonService = {
    get_district_list,
    get_state_list,
    get_state_listByActive,
    get_school_list,
    get_elementary_school_list,
    insertRequestMoreInfo,
    get_role_list,
    user_registration,
    get_client_secret,
    add_subscription
  };
  function get_district_list(stateid:number){
    let promise = new Promise((resolve, reject) => {
        axios.get(APICONSTANT.DISTRICTLIST+'?stateId='+stateid).then((resp: any) => {
        resolve(resp.data)
      }).catch((err:any)=>{
        reject(err);
      });
    });
    return promise as Promise<DistrictList[]>;
  }
  function get_state_listByActive(isActive:boolean){
    let promise = new Promise((resolve, reject) => {
        axios.get(APICONSTANT.STATELIST+"?isActive="+isActive).then((resp: any) => {
        resolve(resp.data)
      }).catch((err:any)=>{
        reject(err);
      });
    });
    return promise as Promise<StateList[]>;
  }
  function get_state_list(){
    let promise = new Promise((resolve, reject) => {
        axios.get(APICONSTANT.STATELIST).then((resp: any) => {
        resolve(resp.data)
      }).catch((err:any)=>{
        reject(err);
      });
    });
    return promise as Promise<StateList[]>;
  }
  function get_school_list(id:number){
    let promise = new Promise((resolve, reject) => {
        axios.get(APICONSTANT.SCHOOLLIST+"?DistrictId="+id).then((resp: any) => {
        resolve(resp.data)
      }).catch((err:any)=>{
        reject(err);
      });
    });
    return promise as Promise<SchoolList[]>;
  }
  function get_elementary_school_list(stateId:number,districtId:number){
    let promise = new Promise((resolve, reject) => {
        axios.post(APICONSTANT.ELEMENTARYSCHOOLLIST,{stateId:stateId,districtId:districtId}).then((resp: any) => {
        resolve(resp.data.elementrySchools)
      }).catch((err:any)=>{
        reject(err);
      });
    });
    return promise as Promise<SchoolList[]>;
  }
  function insertRequestMoreInfo(data:any){
    let promise = new Promise((resolve, reject) => {
        axios.post(APICONSTANT.INSERTREQUESTMOREINFO,data).then((resp) => {
        resolve(resp.data)
      }).catch((err)=>{
        reject(err);
      });
    });
    return promise as Promise<number>;
  }
  function get_role_list(){
    let promise = new Promise((resolve, reject) => {
      axios.get(APICONSTANT.ROLELIST).then((resp: any) => {
      resolve(resp.data.leadRolesList)
    }).catch((err:any)=>{
      reject(err);
    });
  });
  return promise as Promise<RoleList[]>;
  }
  function user_registration(data:any){
    let promise = new Promise((resolve, reject) => {
      axios.post(APICONSTANT.USERREGISTER,data).then((resp: any) => {
      resolve(resp.data)
    }).catch((err:any)=>{
      reject(err.response?.data);
    });
  });
  return promise;
  }
  function get_client_secret(){
    let promise = new Promise((resolve, reject) => {
      axios.get(
        APICONSTANT.GET_CLIENT_SECRET
      ).then(resp => {
        resolve(resp.data)
      }).catch((err) => {
        reject(err);
      })
    })
    return promise as Promise<string>;
  }
  function add_subscription(request_obj:any) {
    let promise = new Promise((resolve, reject) => {
      axios.post(APICONSTANT.ADDSUBSCRIPTION,request_obj).then(resp => {
        resolve(resp.data)
      }).catch((err) => {
        reject(err);
      })
    })
    return promise as Promise<boolean>;
  }

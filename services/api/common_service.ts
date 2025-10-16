import APICONSTANT from "@constants/API";
import { DistrictList, RoleList, SchoolList, StateList } from "@interface/ICommon";
import axios from "axios";
import { setupInterceptorsTo } from "../api_Interceptors";
import { Configuration } from "@environment/startUp";
import { IProductStateGrades, IProductStateGradesRequest } from "@interface/IProductStateGrades";
import { ISchoolPaidAccount } from "@interface/ISchoolPaidAccount";
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
  add_subscription,
  add_school_district_quote,
  GetProductStateGrades,
  resendEmail,
  getSchoolLicense,
  getSchoolPaidAccount,
  giveAccessToProduct
};
function get_district_list(stateid: number) {
  let promise = new Promise((resolve, reject) => {
    axios.get(APICONSTANT.DISTRICTLIST + '?stateId=' + stateid + '&productId=' + Configuration.ProductId).then((resp: any) => {
      resolve(resp.data)
    }).catch((err: any) => {
      reject(err);
    });
  });
  return promise as Promise<DistrictList[]>;
}
function get_state_listByActive(isActive: boolean) {
  let promise = new Promise((resolve, reject) => {
    axios.get(APICONSTANT.STATELIST + "?isActive=" + isActive + '&productId=' + Configuration.ProductId).then((resp: any) => {
      resolve(resp.data)
    }).catch((err: any) => {
      reject(err);
    });
  });
  return promise as Promise<StateList[]>;
}
function get_state_list() {
  let promise = new Promise((resolve, reject) => {
    axios.get(APICONSTANT.STATELIST).then((resp: any) => {
      resolve(resp.data)
    }).catch((err: any) => {
      reject(err);
    });
  });
  return promise as Promise<StateList[]>;
}
function get_school_list(id: number) {
  let promise = new Promise((resolve, reject) => {
    axios.get(APICONSTANT.SCHOOLLIST + "?DistrictId=" + id).then((resp: any) => {
      resolve(resp.data)
    }).catch((err: any) => {
      reject(err);
    });
  });
  return promise as Promise<SchoolList[]>;
}
function get_elementary_school_list(stateId: number, districtId: number) {
  let promise = new Promise((resolve, reject) => {
    axios.post(APICONSTANT.ELEMENTARYSCHOOLLIST, { stateId: stateId, districtId: districtId, productId: Configuration.ProductId }).then((resp: any) => {
      resolve(resp.data.elementrySchools)
    }).catch((err: any) => {
      reject(err);
    });
  });
  return promise as Promise<SchoolList[]>;
}
function insertRequestMoreInfo(data: any) {
  let promise = new Promise((resolve, reject) => {
    axios.post(APICONSTANT.INSERTREQUESTMOREINFO, data).then((resp) => {
      resolve(resp.data)
    }).catch((err) => {
      reject(err);
    });
  });
  return promise as Promise<number>;
}
function get_role_list() {
  let promise = new Promise((resolve, reject) => {
    axios.get(APICONSTANT.ROLELIST).then((resp: any) => {
      resolve(resp.data.leadRolesList)
    }).catch((err: any) => {
      reject(err);
    });
  });
  return promise as Promise<RoleList[]>;
}
function user_registration(data: any) {
  let promise = new Promise((resolve, reject) => {
    axios.post(APICONSTANT.USERREGISTER, data).then((resp: any) => {
      resolve(resp.data)
    }).catch((err: any) => {
      reject(err.response?.data);
    });
  });
  return promise;
}
function get_client_secret() {
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
function add_subscription(request_obj: any) {
  let promise = new Promise((resolve, reject) => {
    axios.post(APICONSTANT.ADDSUBSCRIPTION, request_obj).then(resp => {
      resolve(resp.data)
    }).catch((err) => {
      reject(err);
    })
  })
  return promise as Promise<boolean>;
}
function add_school_district_quote(request_obj: any) {
  let promise = new Promise((resolve, reject) => {
    axios.post(APICONSTANT.ADD_SCHOOL_DISTRICT_QUOTE, request_obj).then(resp => {
      resolve(resp.data)
    }).catch((err) => {
      reject(err);
    })
  })
  return promise as Promise<boolean>;
}
function GetProductStateGrades(request_obj: IProductStateGradesRequest) {
  let promise = new Promise((resolve, reject) => {
    axios.post(APICONSTANT.GETPRODUCTSTATEGRADES, request_obj).then(resp => {
      resolve(resp.data)
    }).catch((err) => {
      reject(err);
    })
  })
  return promise as Promise<IProductStateGrades[]>;
}

function resendEmail(email: string) {
  let promise = new Promise((resolve, reject) => {
    axios.post(APICONSTANT.ResendEmail, { email: email }).then(resp => {
      resolve(resp.data)
    }).catch((err) => {
      reject(err);
    })
  })
  return promise as Promise<boolean>;
}

function getSchoolLicense(school_id: number) {
  let promise = new Promise((resolve, reject) => {
    axios.get(APICONSTANT.GET_SCHOOL_LICENSE + "?schoolId=" + school_id+"&productId="+Configuration.ProductId).then(resp => {
      resolve(resp.data)
    }).catch((err) => {
      reject(err);
    })
  })
  return promise as Promise<string>;
}

function getSchoolPaidAccount(school_id:number){
  let promise = new Promise((resolve, reject) => {
    axios.get(APICONSTANT.GET_SCHOOL_PAID_ACCOUNT+"?schoolId="+school_id).then(resp => {
      resolve(resp.data)
    }).catch((err) => {
      reject(err);
    })
  })
  return promise as Promise<ISchoolPaidAccount[]>;
}

function giveAccessToProduct(userId:number,gradeId:number,typeOfClassroom:string){
  let promise = new Promise((resolve, reject) => {
    axios.post(APICONSTANT.GIVE_ACCESS_TO_PRODUCT, {userId:userId,gradeId:gradeId,classRoomType:typeOfClassroom}).then(resp => {
      resolve(resp.data)
    }).catch((err) => {
      reject(err);
    })
  })
  return promise as Promise<number>;
}
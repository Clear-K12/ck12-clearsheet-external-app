import { Configuration } from "@environment/startUp";
let APICONSTANT: any = {};

APICONSTANT = {
  DISTRICTLIST: Configuration.CrmUrl + "/api/District/GetDistrictForSignup",
  STATELIST:Configuration.CrmUrl + "/api/State",
  SCHOOLLIST:Configuration.CrmUrl+"/api/School/GetSchoolNames",
  ELEMENTARYSCHOOLLIST:Configuration.CrmUrl+"/api/School/GetElementrySchools",
  INSERTREQUESTMOREINFO:Configuration.CrmUrl+"/api/Lead",
  ROLELIST:Configuration.CrmUrl+"/api/Lead/GetLeadRoles",
  USERREGISTER:Configuration.StudentUrl+"api/Users/UserRegister",
  ADDSUBSCRIPTION:Configuration.StudentUrl+"api/Subscription/UserRegisterSubscription",
  GET_CLIENT_SECRET:"https://localhost:44388/api/Subscription/GetIntent"
}

export default APICONSTANT;

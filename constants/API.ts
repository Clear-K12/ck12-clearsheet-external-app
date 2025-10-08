import { Configuration } from "@environment/startUp";
let APICONSTANT: any = {};

APICONSTANT = {
  DISTRICTLIST: Configuration.CrmUrl + "/api/District/GetDistrictForSignup",
  STATELIST:Configuration.CrmUrl + "/api/State",
  SCHOOLLIST:Configuration.CrmUrl+"/api/School/GetSchoolNames",
  ELEMENTARYSCHOOLLIST:Configuration.CrmUrl+"/api/School/GetElementrySchools",
  INSERTREQUESTMOREINFO:Configuration.CrmUrl+"/api/Lead",
  ROLELIST:Configuration.CrmUrl+"/api/Lead/GetLeadRoles",
  USERREGISTER:"https://localhost:44388/api/Users/UserRegister",
  ADDSUBSCRIPTION:Configuration.StudentUrl+"/api/Subscription/UserRegisterSubscription",
  GET_CLIENT_SECRET:Configuration.StudentUrl+"/api/Subscription/GetIntent",
  ADD_SCHOOL_DISTRICT_QUOTE:Configuration.StudentUrl+"/api/WebsiteQuote",
  GETPRODUCTSTATEGRADES:"https://localhost:44388/api/Users/GetProductStateGrades"
}

export default APICONSTANT;


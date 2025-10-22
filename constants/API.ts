import { Configuration } from "@environment/startUp";
let APICONSTANT: any = {};

APICONSTANT = {
  DISTRICTLIST: Configuration.CrmUrl + "/api/District/GetDistrictForSignup",
  STATELIST:Configuration.CrmUrl + "/api/State",
  SCHOOLLIST:Configuration.CrmUrl+"/api/School/GetSchoolNames",
  ELEMENTARYSCHOOLLIST:Configuration.CrmUrl+"/api/School/GetElementrySchools",
  INSERTREQUESTMOREINFO:Configuration.CrmUrl+"/api/Lead",
  ROLELIST:Configuration.CrmUrl+"/api/Lead/GetLeadRoles",
  USERREGISTER:Configuration.StudentUrl+"/api/Users/UserRegister",
  ADDSUBSCRIPTION:Configuration.StudentUrl+"/api/Subscription/UserRegisterSubscription",
  GET_CLIENT_SECRET:Configuration.StudentUrl+"/api/Subscription/GetIntent",
  ADD_SCHOOL_DISTRICT_QUOTE:Configuration.StudentUrl+"/api/WebsiteQuote",
  GETPRODUCTSTATEGRADES:Configuration.StudentUrl+"/api/Users/GetProductStateGrades",
  ResendEmail:Configuration.StudentUrl+"/api/Users/ResendEmail",
  GET_SCHOOL_LICENSE:Configuration.CrmUrl+"/api/School/GetSchoolLicense",
  GET_SCHOOL_PAID_ACCOUNT:Configuration.StudentUrl+"/api/Subscription/GetSchoolPaidAccount",
  GIVE_ACCESS_TO_PRODUCT:Configuration.StudentUrl+"/api/Users/GiveAccessToProduct",
}

export default APICONSTANT;


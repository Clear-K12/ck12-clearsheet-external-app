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
}

export default APICONSTANT;

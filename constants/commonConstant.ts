let COMMONCONSTANT: any = {};

COMMONCONSTANT = {
  Environment: {
    LOCAL: "LOCAL",
    DEV: "DEV",
    PRODUCTION: "PRODUCTION",
  },
  ROUTEPATH: {
    // CONTACT: "/contact",
    SIGNUP: "/signup",
    PAYMENT:"/payment",
    SUBSCRIPTION:"/subscription",
    AFTERSUBSCRIPTION:"https://clearsheets.net",
    VERIFY:"/verify"
  },
  USERROLESIGNUP:[
    {
      "roleId": 7,
      "roleName": "DistrictAdmin",
      "name": "District Admin"
    },
    {
      "roleId": 8,
      "roleName": "InstructionalCoach",
      "name": "Instructional Coach"
    },
    {
      "roleId": 10,
      "roleName": "Principal",
      "name": "Principal"
    },
    {
      "roleId": 2,
      "roleName": "Teacher",
      "name": "Teacher"
    }
  ],
  COMMONEMAILLIST:["gmail.com","yahoo.com","hotmail.com","aol.com","hotmail.fr","hotmail.co.uk","msn.com","outlook.com","ymail.com"],
  QUOTETYPE:{
    "SCHOOL":4,
    "DISTRICT":5
  },
  ROLES:{
    7:'District Admin',
    8:'Instructional Coach',
    9:'Parent',
    1:'School Admin',
    3:'Student',
    2:'Teacher'
  },
  USERROLES:{
    SCHOOLADMIN:1,
    TEACHER:2,
    STUDENT:3,
    DISTRICTADMIN:7,
    INSTRUCTIONALCOACH:8,
    PARENT:9 
  },
  TRIALCONSTANT:{
    TRIAL:'Trial',
    FULL:'Full'
  },
  CLASSROOMTYPE:{
    SELFCONTAINED:'selfcontained',
    DEPARTMENTALIZED:'departmentalized'
  }
};

export default COMMONCONSTANT;
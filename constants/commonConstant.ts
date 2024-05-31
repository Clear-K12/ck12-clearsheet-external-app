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
    AFTERSUBSCRIPTION:"https://clearsheets.net"
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
  COMMONEMAILLIST:["gmail.com","yahoo.com","hotmail.com","aol.com","hotmail.fr","hotmail.co.uk","msn.com","outlook.com","ymail.com"]
};

export default COMMONCONSTANT;
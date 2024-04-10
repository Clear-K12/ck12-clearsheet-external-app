export const helper = {
  check_email_reg,
  get_user_role_id,
  check_password
};

function check_email_reg(value: any) {
  const emailexpression = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  if (value.match(emailexpression)) {
    return true;
  }
  return false;
}

function get_user_role_id(role: string) {
  const roles: any = {
    SchoolAdmin: 1,
    Teacher: 2,
    Student: 3,
    SystemAdmin: 4,
    ContentEmployee: 5,
  };
  if (roles[role]) {
    return roles[role];
  }
}
function check_password(value:any){
  const reg= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/;
  if(reg.test(value)){
    return true
  }
  return false
}

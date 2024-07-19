import COMMONCONSTANT from "@constants/commonConstant";

export const helper = {
  check_email_reg,
  get_user_role_id,
  check_password,
  check_email_extension
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
function check_password(value: any) {
  const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/;
  if (reg.test(value)) {
    return true
  }
  return false
}

function check_email_extension(current_email: string, validEmailExt: any) {
  let ext = current_email.split("@");
  if (ext.length >= 2) {
    if (validEmailExt == null || validEmailExt == "") {
      return "Please select district first";
    } else {
      let arr = COMMONCONSTANT.COMMONEMAILLIST;
      let emailext = ext[1].trim().toLocaleLowerCase();
      if (arr.includes(emailext)) {
        return "Personal email is not allowed.";
      } else if(emailext !== validEmailExt){
        return 'We are currently only available to elementary school teachers and administrators, please enter your valid school email address with the district you are signing up under.'
      }else{
        return "";
      }
    }
  }else{
    return "Please enter valid email";
  }

};
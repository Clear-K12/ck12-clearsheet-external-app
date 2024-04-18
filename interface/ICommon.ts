export interface StateList{
    stateId:number,
    stateName:string,
    note:string,
}
export interface DistrictList{
    districtId:number,
    districtName:string,
    email:string
}
export interface RoleList{
    roleId:number,
    roleName:string,
    name:string
}
export interface SchoolList{
    schoolId:number,
    schoolName:string,
    schoolNcesId:number
}
export interface ReqInsertData{
    name:string,
    phone:string,
    email:string,
    roleId:number,
    stateId:number,
    districtId:number,
    schoolId:number,
    productId:number
}
export interface UserRegisterData{
    firstName:string,
    lastName:string,
    stateId: number,
    districtId: number,
    schoolId: number,
    roleId: number,
    email:string,
    password:string,
    confirm_password:string,
    schoolName: string,
    districtName: string,
    streetAddress: string,
    productId: number
}
import { post, get } from './httpService'

 export function getFabu (data) {
  return get('/api/1/dashboard/getFabu', data)
}
 export function GetLingliao (data) {
  return get('/api/1/dashboard/GetLingliao', data)
}
 export function GetFaliao (data) {
  return get('/api/1/dashboard/GetFaliao', data)
}
 
 export function GetMaterialPlan (data) {
  return get('/api/1/dashboard/GetMaterialPlan', data)
}


 export function GetPgFinish (data) {
  return get('/api/1/dashboard/fl/GetPgFinish', data)
}
 
 export function GetFlPgLessthan3dByLine (data) {
  return get('/api/1/dashboard/fl/GetFlPgLessthan3dByLine', data)
}
 
 export function GetFlFaliaoProgress (data) {
  return get('/api/1/dashboard/fl/GetFlFaliaoProgress', data)
}
 export function GetFlMaterialPlan (data) {
  return get('/api/1/dashboard/fl/GetFlMaterialPlan', data)
}
 
 export function GetCpcShipRateOfMonth (data) {
  return get('/api/1/dashboard/cpc/GetCpcShipRateOfMonth', data)
}
 
 export function GetShipDiffDetailOfWeek (data) {
  return get('/api/1/dashboard/cpc/GetShipDiffDetailOfWeek', data)
}
 export function GetCpcWarehouseRateOfMonth (data) {
  return get('/api/1/dashboard/cpc/GetCpcWarehouseRateOfMonth', data)
}
 
 export function GetShipRateOfWeek (data) {
  return get('/api/1/dashboard/cpc/GetShipRateOfWeek', data)
}
 
//  export function GetShipDiffDetailOfWeek (data) {
//   return get('/api/1/dashboard/cpc/GetShipDiffDetailOfWeek', data)
// }
 
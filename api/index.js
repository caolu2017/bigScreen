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
 
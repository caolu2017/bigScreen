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
 
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
 
 export function GetWlTask (data) {
  return get('/api/1/dashboard/wl/GetWlTask', data)
}
 
 export function GetWlInv (data) {
  return get('/api/1/dashboard/wl/GetWlInv', data)
}
 
 export function GetLessthan3d (data) {
  return get('/api/1/dashboard/wl/GetLessthan3d', data)
}
 
 export function GetEffCounts (data) {
  return get('/api/1/dashboard/wl/GetEffCounts', data)
}
 
 export function GetDayRate (data) {
  return get('/api/1/dashboard/cj/GetDayRate', data)
}
 
 export function GetCjPgdetail (data) {
  return get('/api/1/dashboard/cj/GetCjPgdetail', data)
}
 
 export function GetWeekRate (data) {
  return get('/api/1/dashboard/cj/GetWeekRate', data)
}
 
 export function GetCjbp (data) {
  return get('/api/1/dashboard/cj/GetCjbp', data)
}
 export function GetCjBadrate (data) {
  return get('/api/1/dashboard/cj/GetCjBadrate', data)
}
 
 export function GetZlflPlan (data) {
  return get('/api/1/dashboard/GetZlflPlan', data)
}
 export function flGetFlflPlan (data) {
  return get('/api/1/dashboard/fl/GetFlflPlan', data)
}
 export function GetCjPlan (data) {
  return get('/api/1/dashboard/cj/GetCjPlan', data)
}
 
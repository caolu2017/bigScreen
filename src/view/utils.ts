
export const pxtorem = (px) =>{
  const base = Number(document.documentElement.style.fontSize.slice(0,-2))
  console.log('base', base)
  return ((base*px)/16) 
}
export const tovh = (h) =>{
  const pageNum = window.location.pathname.includes('/financialCockpit/overview')?'V1_P1_ZGSCWZL':'V1_P3_JTCWZL'
  const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  return pageNum=='V1_P1_ZGSCWZL'?height*(h/1080)/3:height*(h/1080)
}

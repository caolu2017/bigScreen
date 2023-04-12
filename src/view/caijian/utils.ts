import { useMainStore } from '@/store'

const allDataIndex = ()=>{
  const pageNum = window.location.pathname.includes('/financialCockpit/overview')?'V1_P1_ZGSCWZL':'V1_P3_JTCWZL'
  return useMainStore()?.userInfo?.allDataIndex?.filter(i=>i.ext2==pageNum)
}
const dataIndex = ()=>{
  const pageNum = window.location.pathname.includes('/financialCockpit/overview')?'V1_P1_ZGSCWZL':'V1_P3_JTCWZL'
  return useMainStore()?.userInfo?.dataIndex?.filter(i=>i.ext2==pageNum)
}

export const filterFiled = (filed, rest?) => {
  
  return allDataIndex()?.find(item=>item.dataIndexCode == filed)?.ext4 || rest
}

export const dataFormatter = ()=>{
  return [
    {
      '年累': {
        'num': 'operating_income',
        "title": filterFiled('operating_income', '营业总收入')+'(YTD)',
        "color": "operating_income_color",
        "type": {
          [filterFiled('operating_income_sply', '去年同期')]: 'operating_income_sply',
          ['年累' + filterFiled('operating_income_yoy', '同比')]: 'operating_income_yoy'
        }
      },
      "月度": {
        'num': 'operating_income',
        "title": filterFiled('operating_income', '营业总收入')+"(MTD)",
        "color": "operating_income_color",
        "type": {
          [filterFiled('operating_income_splm', '上月')]: "operating_income_splm",
          [filterFiled('operating_income_mom', '环比')]: "operating_income_mom"
        }
      }
    },
    {
      '年累': {
        "title": filterFiled('cost_of_sales', '营业总成本') +'(YTD)',
        'num': 'cost_of_sales',
        "color": "cost_of_sales_color",
        "type": {
          [filterFiled('cost_of_sales_sply', '去年同期')]: 'cost_of_sales_sply',
          ['年累' + filterFiled('cost_of_sales_yoy', '同比')]: 'cost_of_sales_yoy',
        }
      },
      "月度": {
        "title": filterFiled('cost_of_sales', '营业总成本')+"(MTD)",
        'num': 'cost_of_sales',
        "color": "cost_of_sales_color",
        "type": {
          [filterFiled('cost_of_sales_splm', '上月')]: "cost_of_sales_splm",
          [filterFiled('cost_of_sales_mom', '环比')]: "cost_of_sales_mom",
        }
      }
    },
    {
      '年累': {
        'num': 'total_profits',
        'title': filterFiled('total_profits', '利润总额') + '(YTD)',
        'color': 'total_profits_color',
        "type": {
          [filterFiled('total_profits_sply', '去年同期')]: 'total_profits_sply',
          ['年累' + filterFiled('total_profits_yoy', '同比')]: 'total_profits_yoy',
        }
      },
      "月度": {
        'num': 'total_profits',
        'title': filterFiled('total_profits', '利润总额') +'(MTD)',
        'color': 'total_profits_color',
        "type": {
          [filterFiled('total_profits_splm', '上月')]: "total_profits_splm",
          [filterFiled('total_profits_mom', '环比')]: "total_profits_mom"
        }
      }
    },
    {
      'title': filterFiled('total_assets', '资产'),
      'num': 'total_assets',
      'type': {
        [filterFiled('bop_assets', '期初')]: 'bop_assets',
        [filterFiled('assets_growth_data', '较期初增幅')]: 'assets_growth_data',
      },
      'color': 'assets_growth_color'
    },
    {
      'title': filterFiled('total_liabilities', '负债'),
      'num': 'total_liabilities',
      'type': {
        [filterFiled('bop_liabilities', '期初')]: 'bop_liabilities',
        [filterFiled('liabilities_growth_data', '较期初增幅')]: 'liabilities_growth_data'
      },
      'color': 'liabilities_growth_color'
    },
    {
      'title': filterFiled('owners_equity', '所有者权益'),
      'num': 'owners_equity',
      'type': {
        [filterFiled('bop_owners_equity', '期初')]: 'bop_owners_equity',
        [filterFiled('owners_equity_growth_data', '较期初增幅')]: 'owners_equity_growth_data'
      },
      'color': 'owners_equity_growth_color'
    },
  ]
}

export const dataType = {
'年累': 'YTD',
'月度': 'MTD'
}

export const filterNA = (filed, data, ignore?) => {
  // if(ignore) return data||'N/A'
  const active = dataIndex()?.find(item=>item['dataIndexCode'] == filed)
  return active?(!data || active?.flag!='Y' ?'N/A':data):'N/A'
}

export const pxtorem = (px) =>{
  const base = Number(document.documentElement.style.fontSize.slice(0,-2))
  return ((base*px)/16) 
}
export const tovh = (h) =>{
  const pageNum = window.location.pathname.includes('/financialCockpit/overview')?'V1_P1_ZGSCWZL':'V1_P3_JTCWZL'
  const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  return pageNum=='V1_P1_ZGSCWZL'?height*(h/1080)/3:height*(h/1080)
}

export const domStyles ={
  'g2-tooltip-marker':{display: 'none'},
  'g2-tooltip-title': {display: 'none'},
  'g2-tooltip': {
    background: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(10px)',
    boxShadow: 0,
    padding: `${pxtorem(6)}px 0`
  },
  'g2-tooltip-value': {
    color: '#ffffff',
    fontFamily: 'D-DIN',
    fontSize: pxtorem(24)+'px',
  },
  'g2-tooltip-name': {
    color: 'rgba(255,255,255,0.80)',
    fontWeight: 400,
    fontSize: pxtorem(16)+'px',
    textAlign: 'left',
  },
  'g2-tooltip-list-item': {
    width: pxtorem(240)+'px',
    margin: `${pxtorem(16)}px ${pxtorem(24)}px `,
    display: 'flex',
    justifyContent: 'space-between',
    alignitems: 'baseline'
  }
}

import React,{useState} from 'react'
import DropDown from '../Filter/DropDown'
import { Checkbox } from '@material-tailwind/react'

const SaleFilter = ({sale,reg,setFilt,filt}) => {
  
  const [saleChk,setSaleChk] = useState(true)
  const [regChk,setRegChk] = useState(false)

  const handleSaleChk = (e) => {
   e.preventDefault()
    if(e.target.checked){
      setSaleChk(true)
      setRegChk(false)
      setFilt(prev=>{return {...prev,isSale: true}})
    }else{
      setSaleChk(false)
      setFilt(prev=>{return {...prev,isSale:false}});
    }
  }

  const handleRegChk = (e) => {
    e.preventDefault()
    if(e.target.checked){
      setRegChk(true)
      setSaleChk(false)
      setFilt(prev=>{return {...prev,isSale:false}})
    }else{
      setRegChk(false)
      setFilt(prev=>{return {...prev,isSale:true}})
    }
  }

  return (
    <>
      <DropDown title="On Sale"  >
        {/* Item Start */}
        {sale?.length > 0 ?<div className='flex items-center' >
          <div className='flex items-center space-x-2' ><Checkbox name='sale' ripple={false} checked={saleChk} onChange={(e)=>handleSaleChk(e)} className='checked:bg-b3 checked:text-white' /><span className='flex text-sm w-max' >Yes</span></div>
          <div className="flex justify-end w-full text-xs" ><span>({sale.length > 0 ? sale[0].count : null})</span></div>
        </div>:null}
        {/* Item End */}
        {/* Item Start */}
        {reg?.length > 0 ? <div className='flex items-center' >
          <div className='flex items-center space-x-2' ><Checkbox name='sale' ripple={false} checked={regChk} onChange={(e)=>handleRegChk(e)} className='checked:bg-b3 checked:text-white' /><span className='flex text-sm w-max' >No</span></div>
          <div className="flex justify-end w-full text-xs" ><span>({reg.length > 0 ? reg[0].count : 0})</span></div>
        </div>:null}
        {/* Item End */}
      </DropDown>
    </>
  )
}

export default SaleFilter
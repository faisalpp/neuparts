import React, { useState } from 'react'
import TextInput from '../../TextInput/TextInput'
import Popup from '../Popup'
import Table from '../Table/Table'
import { Link } from 'react-router-dom'
import Toast from '../../../utils/Toast'
import {BiSearchAlt2} from 'react-icons/bi'
import {searchOrderByTitleOrModel} from '../../../api/admin/order'
import BtnLoader from '../../Loader/BtnLoader'
import { useDispatch, useSelector } from 'react-redux'
import {AddToCart} from '../../../store/adminSlice'
import {setSubTotal} from '../../../store/adminCart'

const SearchProduct = ({sstate,setsState,SelectProduct}) => {
  const [searchResult,setSearchResult] = useState([])
    const SearchRow = ({id,image,title,model,salePrice,regularPrice,stock,type,rating,isSale}) => {
        
        const dispatch = useDispatch()
        const cartId = useSelector((state)=>state?.admin?.cart?._id)
        
        const AddProduct = async (e) => {
         e.preventDefault()
          const res = await dispatch(AddToCart({cartId:cartId,productId:id}))
          // console.log(res.payload.price)
          if(res.payload.status === 200){
            dispatch(setSubTotal(res.payload.price))
            Toast('Product Added!','success',1000)
            setSearchResult([])
            setsState(false)
          }else if(res.payload.status === 500){
            Toast(res.res.payload.data.message,'error',1000)
          } else{
             Toast('Internal Server Error!','error',1000)
          }
        }
        
        return (
          <tr className="border-b border-l border-r border-b6 text-xs font-semibold">
          <td className="whitespace-nowrap flex justify-center px-5 py-3"><img src={image.find(item=>item.file === 'image').data} className='w-10' /></td>
          <td className="px-5 py-3"><Link to={`/product/${title.toLowerCase().replace(/\s/g,'-')}`} className='underline text-b6' >{title}</Link></td>
          <td className="whitespace-nowrap px-5 py-3">#{model}</td>
          <td className="whitespace-nowrap px-5 py-3 capitalize ">{type}</td>
          <td className="whitespace-nowrap px-5 py-3 text-b7 ">${salePrice}</td>
          <td className="whitespace-nowrap px-5 py-3 text-b7 ">${regularPrice}</td>
          <td className="whitespace-nowrap px-5 py-3">{stock}</td>
          <td className="whitespace-nowrap px-5 py-3 text-red-500">{stock > 0 ? <button type='button' onClick={e=>AddProduct(e)} className='bg-b6 text-white px-3 rounded-md py-1' >+</button>:<span type='button' className='bg-red-500 text-white px-3 text-[10px] rounded-md py-1' >Out of Stock</span>}</td>
        </tr>
        )
      }

      const NoRow = ({message}) => {
        return (
         <tr className="border-b border-l border-r border-b6 text-xs font-semibold">
          <td className='py-2 px-2' >{message}</td>
         </tr>
        )
    }

  const [errors,setErrors] = useState([])
  const [sTitle,setStitle] = useState('')
  const [sModel,setSmodel] = useState('')

  const [loading,setLoading] = useState({type:'',status:false})

  const searchProduct = async (e,query,type) => {
    e.preventDefault()
    if(query === ''){
     Toast('Query Required!','error',1000)
     return
    }
    setLoading({type:type,status:true})
    const res = await searchOrderByTitleOrModel({query:query,type:type})
    if(res.status === 200){
      setLoading({type:'',status:false})
      setSearchResult(res.data.result)
    }else{
      setLoading({type:'',status:false})
      Toast(res.data.message,'error',1000)
    }
  }

 

  return (
    <Popup zindex="z-[99]" width="w-9/12" state={sstate} setState={setsState} >
          <div className='flex flex-col items-center space-y-3 w-full' >
          <h3 className='font-semibold' >Add Product</h3>
          <div className='flex w-full space-x-2 items-center' >
           <div className='flex items-center space-x-1 w-full mt-5' >
            <TextInput disabled={sModel !== '' ? true : false } value={sTitle} onChange={(e)=>setStitle(e.target.value)} width="full" title="Search By Title" iscompulsory="false" type="text" error={errors && errors.includes('Title is Required!') ? true : false} errormessage="Title is Required!" placeholder="Whirlpool Refrigerator" />
            <button type="button" onClick={e=>searchProduct(e,sTitle,'title')} className='bg-b6 text-sm text-white px-2 py-1 h-10 rounded-lg mt-6' >{loading.status && loading.type === 'title' ? <BtnLoader style="w-4" />: <BiSearchAlt2/>}</button>
           </div>
           <div className='flex items-center space-x-1 w-full h-fit mt-5' >
            <TextInput disabled={sTitle !== '' ? true : false } width="full" title="Search By Model #" value={sModel} onChange={(e)=>setSmodel(e.target.value)} iscompulsory="false" type="text" error={errors && errors.includes('Title is Required!') ? true : false} errormessage="Title is Required!" placeholder="8342-D10M02Y2024" />
            <button type="button" onClick={e=>searchProduct(e,sModel,'model')} className='bg-b6 text-sm text-white px-2 py-1 h-10 rounded-lg mt-6' >{loading.status && loading.type === 'model' ? <BtnLoader style="w-4" />: <BiSearchAlt2/>}</button>
           </div>
          </div>

          <div>
            <h3 className='font-semibold text-sm' >Search Results</h3>
            <div className='flex flex-col px-2 border-[1px] border-b31 hf-72 overflow-x-hidden overflow-y-scroll mt-1 rounded-md' >
              {/* Seach Result Card Start */}
              <Table head={['Image','Title','Model #','Type','Sale Price','Regular Price','Stock','Action']} >
                {searchResult?.length > 0 ? searchResult?.map((product)=><SearchRow rating={product.rating} id={product._id} image={product.media} title={product.title} model={product.modelNo} regularPrice={product.regPrice} salePrice={product.salePrice} type={product.productType} stock={product.stock} isSale={product.isSale} />):
                 <NoRow message="No Products Found!" />
                }
              </Table>
              {/* Seach Result Card End */}
            </div>
          </div>

          </div>
         </Popup>
  )
}

export default SearchProduct
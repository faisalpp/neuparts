import React,{useState} from 'react'

const TextInputSuggestion = (props) => {

 const [suggestions,setSuggestions] = useState(props.suggestionList)
 const [isSg,setIsSg] = useState(false)

 const handleTxt = (e) => {
    const searchText = e.target.value;
    props.setState({...props.values,modelNo:searchText})

    // Filter the array to find partial matches
    let matchedSuggestions;
    if(e.target.value === ''){
      matchedSuggestions = props.suggestionList;
    }else{
       matchedSuggestions = props.suggestionList.filter(item =>
        item.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Update the suggestions stat
    setIsSg(true)
    setSuggestions(matchedSuggestions);
 }

  return (
    <div className={`flex flex-col space-y-1 ${props.width === 'full' ? 'w-full' : 'w-1/2'}`}>
    <div onMouseLeave={()=>setIsSg(false)} className="relative flex flex-col space-y-1">
      {props.title ? <h5 className='text-xs font-semibold' >{props.title} {props.iscompulsory === 'true' ? <i className='text-red-500' >*</i> : null}</h5> : null}<h5 className='text-red-500 text-xs' >{props.error ? props.errormessage : null}</h5>
      <input {...props} value={props.state} onChange={e=>handleTxt(e)} onFocus={()=>setIsSg(true)}   className={`text-sm outline-none border-[1px]  ${props.error ? 'border-red-500' : 'border-b31'} w-full px-4 h-10 rounded-lg placeholder:text-b25 text-xs`} />
      {isSg ? <div className='absolute z-40 -bottom-5 w-full flex flex-col px-2 border-[1px] border-[0,0,0,0,0.15] rounded-md' >
       {props.state.length > 0 && suggestions.length > 0 ? suggestions.map((item,index)=><span key={index} onClick={()=>props.setState({...props.values,modelNo:item})} className="cursor-pointer text-sm" >{item}</span>):<span className='text-sm' >No Suggestions</span>}
      </div>:null}
    </div>
    </div>
  )
}

export default TextInputSuggestion
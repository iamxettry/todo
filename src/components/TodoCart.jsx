"use client"
import getUrl from '../app/lib/getUrl'
import { useBoardStore } from '../store/Boardstore'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { HiXCircle } from 'react-icons/hi'

const TodoCart = ({todo,id,index,innerRef,dragHandleProps,draggableProps}) => {
  const [deleteTask]=useBoardStore(state=>[state.deleteTask])
  const [imageUrl, setImageUrl]=useState(null)
  useEffect(()=>{
    if (todo.image){
      const fetchImage=async ()=>{
        const url = await getUrl(todo.image)
        if (url) {
          setImageUrl(url.toString())
        }
      }
      fetchImage();
    }
  },[todo])
  return (
    <div  className="bg-white rounded-md space-y-2 drop-shadow-md my-2" {...dragHandleProps} {...draggableProps }  ref={innerRef}>
      <div className="flex justify-between items-center p-5 ">
        <p>{todo.title}</p>
        <button  className="text-red-500 hover:text-red-600">
          <HiXCircle onClick={()=>deleteTask(index,todo,id)}  className="ml-5 h-8 w-8"/>

       </button>
      </div>
      {
        imageUrl && (<div className=" h-full w-full rounded-b-md">
          <Image src={imageUrl} alt="Task Image" width={400} height={200} className="w-full object-contain rounded-b-md" />
        </div> )
      }
    </div>
  )
}

export default TodoCart
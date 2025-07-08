import React, { useCallback, useState } from 'react'

export  function UseModal() {
    const [showModal,setShowModal]=useState(false);
    const [ModalMessage,setModalMessage]=useState('')

    const triggerModal=useCallback((message)=>{
        setModalMessage(message);
        setShowModal(true)

       
    },[])
    return { showModal, ModalMessage, triggerModal, setShowModal };

  
}

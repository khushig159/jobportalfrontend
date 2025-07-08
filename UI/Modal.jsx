import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import '../src/style/Modal.css'

export default function Modal({ open, onClose, children }) {
  const dialog = useRef(null);

  useEffect(() => {
    const dialogNode = dialog.current;

    if (open && dialogNode) {
      if (!dialogNode.open) {
        dialogNode.showModal();
      }
    } else if (!open && dialogNode?.open) {
      dialogNode.close();
    }

    const handleCloseEvent = () => {
      onClose(); // sync state
    };

    dialogNode?.addEventListener("close", handleCloseEvent);

    return () => {
      dialogNode?.removeEventListener("close", handleCloseEvent);
    };
  }, [open, onClose]);


  // const preventBackdropClose = (e) => {
  //   e.stopPropagation();
  // };

  return createPortal(
    <dialog ref={dialog} className="modal">
    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
    {children}
    
        
      </div>
    </dialog>,
    document.getElementById("modal")
  );
}

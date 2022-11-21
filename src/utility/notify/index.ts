import { toast, TypeOptions } from "react-toastify"

export const notify = (msg, type: TypeOptions = 'success') => {
    toast(msg, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        type
    })
}

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const mensagemSucesso = (mensagem) => {
  toast.success(mensagem, { autoClose: 2000 })
}

export const mensagemErro = (mensagem) => {
  toast.error(mensagem, { autoClose: 2000 })
}

const ToastMessage = () => { }

export default ToastMessage
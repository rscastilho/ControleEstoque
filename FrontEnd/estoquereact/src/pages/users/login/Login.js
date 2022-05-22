import { useState, useContext,useEffect } from 'react'
import styles from './Login.module.css'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


import { Link, useNavigate } from 'react-router-dom'
import { AutContext } from '../../../context/AutContext';
import WebApi from '../../../api/WebApi';


const Login = () => {
    // const context = useContext(AutContext)
    const {setAuthentication} = useContext(AutContext)
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
    const navigate = useNavigate();
    const dadosLogin = {
        email,
        senha
    }

    // useEffect(()=>{
    //     localStorage.clear();
    //     console.log(localStorage)
    // },[])

    const handleLogin = (e) => {
        e.preventDefault();
        WebApi.post('usuarios/login', dadosLogin).then(resultado => {
            console.log(resultado.data)
            setMensagem(resultado.data)
            if (resultado.data.tokenUsuario.result) {
                const token = resultado.data.tokenUsuario.result;
                const nome = resultado.data.usuario.nome;
                const email = resultado.data.usuario.email;
                localStorage.setItem("token", JSON.stringify(token))
                localStorage.setItem("@nome", JSON.stringify(nome))
                localStorage.setItem("@email", JSON.stringify(email))
                WebApi.defaults.headers.Authorization = `Bearer ${token}`;
                setAuthentication(true);
                toast.success(`${resultado.data.mensagem}`, {autoClose: 1500, position:"bottom-right"})
                navigate('/')
             }           
             else{
                 toast.warning(resultado.data.mensagem, {autoClose: 1500, position:"bottom-right"})
             }
             
            }
        
        ).catch((error) => toast.warning(mensagem.mensagem + error.message, {autoClose: 2000, position:"bottom-right"}))
        


    }

    return (
        <div className={styles.principal}>

            <div className={styles.boxLogin}>
                <div className={styles.formLogin}>
                    <form>
                        <div>
                            <label> e-mail: </label>
                                <input type="email"
                                    className='form-control'
                                    placeholder='Digite seu email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value.toLocaleLowerCase().trim())}
                                    required/>
                        </div>
                        <div>
                            <label> Senha: </label>
                                <input type="password"
                                    className='form-control'
                                    placeholder='Digite sua senha'
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value.toLocaleLowerCase().trim())}
                                    required/>
                        </div>
                            
                        <div className={styles.botaoForm}>
                            {!email || !senha ?
                            <div>
                                <button type='submit' className={`btn btn-primary me-1 mt-4 ${styles.botoes}`} onClick={handleLogin} disabled>Login</button>
                            </div>
                            :
                            <div>
                                <button className={`btn btn-primary me-1 mt-4 ${styles.botoes}`} onClick={handleLogin}>Login</button>
                            </div>
                            
                        }
                        
                            <Link to='/register'>
                                <button className={`btn btn-secondary me-1 mt-4 ${styles.botoes}`} onClick={() => localStorage.clear()}>Registrar</button>
                            </Link>
                        </div>
                    </form>
                    <br />
                </div>
            </div>
            
        </div>
    )
}

export default Login
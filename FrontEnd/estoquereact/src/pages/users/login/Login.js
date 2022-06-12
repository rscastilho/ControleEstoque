import { useState, useContext, useCallback } from 'react'
import styles from './Login.module.css'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Link, useNavigate } from 'react-router-dom'
import { AutContext } from '../../../context/AutContext';
import WebApi from '../../../api/WebApi';
import {post} from '../../../Services/crudApi'
import {validaPerfil} from '../../../Services/validaPerfil'

const Login = () => {
    const {setAuthentication, setPerfil} = useContext(AutContext)
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
    const navigate = useNavigate();
    const dadosLogin = {
        email,
        senha
    }

    const handleLogin = (e) => {
        e.preventDefault();
        post('usuarios/login', dadosLogin).then(resultado => {
                setMensagem(resultado.data)
            if (resultado.data.tokenUsuario.result) {
                const token = resultado.data.tokenUsuario.result;
                const id = resultado.data.usuario.id;
                const nome = resultado.data.usuario.nome;
                const email = resultado.data.usuario.email;
                localStorage.setItem("token", JSON.stringify(token));
                localStorage.setItem("@id", JSON.stringify(id));
                localStorage.setItem("@nome", JSON.stringify(nome));
                localStorage.setItem("@email", JSON.stringify(email));
                WebApi.defaults.headers.Authorization = `Bearer ${token}`;
                setAuthentication(true);
                navigate('/')
                carregarPerfil();
                
             }           
             else{
                 toast.warning(resultado.data.mensagem, {autoClose: 1500, position:"bottom-right"})
             }
            }
        ).catch((error) => toast.warning(mensagem.mensagem + error.message, {autoClose: 2000, position:"bottom-right"}))
    }

    const carregarPerfil = useCallback(()=>{
        const token = JSON.parse(localStorage.getItem('token'));
        const setarPerfil = validaPerfil(token);
        localStorage.setItem('@perfil',JSON.stringify(setarPerfil))
        setPerfil(setarPerfil);
        
    },[setPerfil])

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
                                <button type='button' className={`btn btn-secondary me-1 mt-4 ${styles.botoes}`} onClick={() => {
                                    localStorage.clear()
                                    navigate('/register');
                                    }}>Registrar</button>
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
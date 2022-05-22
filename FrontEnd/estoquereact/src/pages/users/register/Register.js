import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css'
import { apis } from '../../../api/api'
import Login from '../login/Login';

const Register = () => {
    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [cpf, setCpf] = useState();
    const [senha, setSenha] = useState();

    const navigate = useNavigate();

    const dadosUsuario = {
        nome,
        email,
        cpf,
        senha
    }

    const handleRegister = (e) => {
        e.preventDefault();
        localStorage.clear();
        apis.register(dadosUsuario)

        // console.log(dadosUsuario)
    }

    const handleVoltar = () => {
        navigate('/login')
    }


    return (
        <div className={styles.principal}>
            <div className={styles.boxLogin}>
                <div className={styles.formLogin}>
                    <form>

                        <div>
                            <label> Nome:
                                <input type="text"
                                    className='form-control'
                                    placeholder='Digite seu nome'
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value.toLocaleLowerCase())}
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label> email:
                                <input type="text"
                                    className='form-control'
                                    placeholder='Digite seu email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value.toLocaleLowerCase().trim())}
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label> CPF:
                                <input type="text"
                                    className='form-control'
                                    placeholder='Digite seu CPF'
                                    value={cpf}
                                    onChange={(e) => setCpf(e.target.value.toLocaleLowerCase().trim())}
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label> senha:
                                <input type="password"
                                    className='form-control'
                                    placeholder='Digite sua senha'
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value.toLocaleLowerCase().trim())}
                                    required
                                ></input>
                            </label>
                        </div>
                        <div className={styles.botaoForm}>
                            {!nome || !email || !cpf || !senha ?
                                <button className='btn btn-primary btn-sm me-1 mt-2' onClick={handleRegister} disabled>Cadastrar</button>
                                :
                                <button className='btn btn-primary btn-sm me-1 mt-2' onClick={handleRegister} >Cadastrar</button>
                            }
                            <button className='btn btn-secondary btn-sm me-1 mt-2' onClick={handleVoltar}> Voltar</button>
                        </div>

                    </form>
                    <br />
                </div>

            </div>



        </div>
    )
}

export default Register




//   "nome": "string",
//   "email": "user@example.com",
//   "cpf": "string",
//   "senha": "string"

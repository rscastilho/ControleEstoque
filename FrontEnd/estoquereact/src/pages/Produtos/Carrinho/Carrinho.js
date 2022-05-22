import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Titulo from '../../../components/Titulo/Titulo';
import styles from './Carrinho.module.css'
import {BsPlusCircle, BsFileMinus} from 'react-icons/bs'


const Carrinho = () => {
    const [itens, setItens] = useState([]);
    const [exibirImagem, setExibirImagem] = useState(false)
    const [quantidade, setQuantidade] = useState(0);
    const [loop, setLoop] = useState(false);

    const handleLimparCarrinho = () => {
        localStorage.removeItem('carrinho')

    }

    const handleIncrementaQuantidade = (id)=>{

        const  carrinho =  JSON.parse(localStorage.getItem('carrinho'))
        let encontra = carrinho.find((x => x.id === id))
        if(encontra) {
            setQuantidade(encontra.quantidade +=1)
            setLoop(true)
        }
        localStorage.setItem('carrinho', JSON.stringify(carrinho))
        console.log(encontra)
        
        
        // let incrementa =   qtde[0].quantidade +1  
        // console.log(incrementa)
        

    }

    const handleDecrementaQuantidade = (id)=>{
        const  carrinho =  JSON.parse(localStorage.getItem('carrinho'))
        let encontra = carrinho.find((x => x.id === id))
        if(encontra) {
            if(encontra.quantidade <= 1){
                let carrinhoAtualiza = carrinho.filter((x => x.id !== id));
                localStorage.setItem('carrinho', JSON.stringify(carrinhoAtualiza))
                setLoop(true)        
                return
            } 
            encontra.quantidade -=1
            setLoop(true)

        }

        localStorage.setItem('carrinho', JSON.stringify(carrinho))
        console.log(encontra)
    }


    useEffect(() => {
        
            setItens(JSON.parse(localStorage.getItem('carrinho')))
            console.log(itens)
            setLoop(false)
        

    }, [loop])


    return (
        <div className='container'>
            {!itens ?
                <>
                    <Titulo titulo={'Carrinho de compra vazio'} />
                    <Link to='/'>
                        <button className='btn btn-sm btn-primary ' >Continuar comprando</button>
                    </Link>
                </> :
                <>
                    <Titulo titulo={'Carrinho de compra'} />

                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th onClick={() => setExibirImagem(!exibirImagem)}><button className='btn btn-sm btn-outline-secondary'>Imagem</button></th>
                                <th> Produtos </th>
                                <th> Quantidade </th>
                                <th> R$ Unitário </th>
                                <th> R$ Total </th>
                            </tr>
                        </thead>
                        <tbody>
                            {itens && itens.map((items) => (
                                <tr >
                                    <td key={items.id}>
                                        {exibirImagem &&
                                            <img src={`https://localhost:5001/recursos/imagens/${items.imagemUrl}`} alt={items.descricao} />
                                        }
                                    </td>
                                    <td>{items.descricao}</td>
                                    <td>
                                        <BsFileMinus className='me-2' size={20}
                                        onClick={()=> handleDecrementaQuantidade(items.id)}/>
                                        {items.quantidade} 
                                        <BsPlusCircle className='ms-2' size={20}
                                        onClick={()=> handleIncrementaQuantidade(items.id)}/> 
                                        </td>
                                    <td>R$ {items.valor}</td>
                                    <td> R$ {items.quantidade * items.valor}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className={`${styles.botoes}`}>
                        <div></div>
                        <Link to='/'>
                            <button onClick={() => handleLimparCarrinho()} className='btn btn-sm btn-warning me-2'>Limpar Carrinho</button>
                        </Link>
                        <Link to='/'>
                            <button className='btn btn-sm btn-primary ' >Continuar comprando</button>
                        </Link>
                        <div></div>
                    </div>

                </>
            }
        </div>
    )
}

export default Carrinho
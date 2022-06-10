import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styles from './InformacaoProduto.module.css'
import { getById } from './../../../Services/crudApi'
import error from '../../../assets/error-img.jpg'
import { UtilService } from '../../../Services/util'

const InformacaoProduto = (props) => {
    const [produto, setProduto] = useState('')
    const [loop, setLoop] = useState(true);

    useEffect(() => {
        if (loop) {
            getById(`produtos/pesquisarporid/${props.itemId}`)
                .then((resultado) => {
                    const product = resultado;
                    setProduto(product)
                    setLoop(false)
                })
        }
    }, [loop])

    return (
        <div className={`${styles.box}`}>
            {produto &&
                <div>
                    <div className={`${styles.titulo}`}>
                         {produto.data.descricao}
                    </div>
                    <hr />
                    <div>
                        
                        <img
                            className={styles.image}
                            src={`https://localhost:5001/recursos/imagens/${produto.data.imagemUrl}`}
                            alt={produto.data.descricao}
                            onError={(e) => {
                                e.target.onerror = null
                                e.target.src = error
                            }}
                        />
                    </div>
                    <div className={`${styles.detalhes}`}>
                        <span>
                            Descrição: {produto.data.descricao}
                        </span>
                        <span>
                            Estoque: {produto.data.quantidadeEstoque}
                        </span>
                        <span>
                            Valor unit.:{UtilService.formatCurrency(produto.data.valor)}
                        </span>
                    </div>
                </div>
            }


        </div>
    )
}

export default InformacaoProduto
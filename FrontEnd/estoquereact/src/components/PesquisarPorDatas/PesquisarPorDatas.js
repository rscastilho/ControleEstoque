import React, { useCallback, useState } from 'react'
import { getAll } from './../../Services/crudApi';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useMemo } from 'react';
import styles from './PesquisarPorDatas.module.css'

const PesquisarPorDatas = ({ setPedidos, pedidos }) => {
    const [dataInicial, setDataInicial] = useState('');
    const [dataFinal, setDataFinal] = useState('');
    const [dataInicialConvertida, setDataInicialConvertida] = useState('')
    const [dataFinalConvertida, setDataFinalConvertida] = useState('');



    const carregarPedidosPorData = useCallback(() => {
        if (dataInicialConvertida && dataFinalConvertida) {
            getAll(`/Pedidos/pedidospordata?dataInicial=${dataInicialConvertida}&dataFinal=${dataFinalConvertida}`)
                .then((resultado) => {
                    setPedidos(resultado.data)
                    console.log(resultado.data)
                })
                .catch((err) => console.log(err.message))

        } else {
            getAll(`/pedidos`).then((resultado) => {
                setPedidos(resultado.data)
            })

        }



    }, [dataFinalConvertida, dataInicialConvertida, setPedidos])


    const dataInicialFn = (informacao) => {
        setDataInicial(informacao)
        let dataConvertida = new Date(informacao).toLocaleDateString('pt-br', {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit"
        })
        setDataInicialConvertida(dataConvertida)
    }

    const dataFinalFn = (informacao) => {
        setDataFinal(informacao)
        let dataConvertida = new Date(informacao).toLocaleDateString('pt-br', {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit"
        })
        setDataFinalConvertida(dataConvertida)
    }

    const filtrar = useCallback(() => {
        carregarPedidosPorData()
    }, [carregarPedidosPorData])


    useMemo(() => {
        if (dataInicialConvertida && dataFinalConvertida) {
            carregarPedidosPorData()

        }


    }, [dataInicialConvertida, dataFinalConvertida, carregarPedidosPorData])

    return (
        <div >

            <form>
                <div className={`${styles.principal}`}>

                    <label className=''>                        Data inicial:
                        <DatePicker
                            selected={dataInicial}
                            dateFormat={"dd/MM/yyyy"}
                            onChange={(e) => { dataInicialFn(e) }}
                        />
                    </label>
                    <div>                        Data Final:

                        <DatePicker
                            selected={dataFinal}
                            dateFormat={"dd/MM/yyyy"}
                            onChange={(e) => { dataFinalFn(e) }}
                        />
                    </div>
                    <button
                        type='button'
                        onClick={filtrar}
                        className="btn btn-outline-dark me-4 btn-sm"
                    >
                        Pesquisar...
                    </button>
                </div>
            </form>
            <hr />
        </div>
    )
}

export default PesquisarPorDatas
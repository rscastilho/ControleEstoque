import React from 'react'
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2'
import { getAll } from '../../../../Services/crudApi';
import BotaoVoltar from '../../BotaoVoltar';
import Titulo from '../../../../components/Titulo/Titulo';
import { useMemo } from 'react';
import { useState } from 'react';

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)



const GraphValoresPedidos = () => {
    const [dados, SetDados] = useState([]);

    useMemo(() => {
        getAll('dashboard/valorespedidos').then((resultado) => {
            SetDados(resultado.data);
        })
    }, [])


    const data = {
        labels: dados.valor,
        datasets: [
            {
                label: 'Valores por pedido',
                data: dados.valor,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const options = {

        plugins: {
            legend: {
                display: false,
                position: "top",
            },
            title: {
                display: false,
                text: "Titulo do grafico"
            },
        },
    };


    return (
        <div>
            <Titulo titulo={"Valores por pedidos"} />

            {dados &&
            <>
                <Line options={options} data={data} width={'0px'}/>
                {dados.quantidadePedido} - Pedidos encontrados
            </>
            }
            <BotaoVoltar
                local={"/dashboard/pedidos"}
                nome={"Dashboard Pedidos"}
            />
        </div>

    )
}

export default GraphValoresPedidos
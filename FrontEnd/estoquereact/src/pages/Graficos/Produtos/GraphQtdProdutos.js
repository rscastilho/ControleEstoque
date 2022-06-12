import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS} from 'chart.js/'
import {Legend, Tooltip} from 'chart.js'

import Titulo from './../../../components/Titulo/Titulo';
ChartJS.register(
    Legend,
    Tooltip);

const GraphQtdProdutos = ({ produtos }) => {

    const [data, setData] = [{
        labels: produtos.map((produto) => produto.descricao),
        datasets: [{
            data: produtos.map((produto) => produto.quantidadeEstoque),
            backgroundColor: ['rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
            hoverOffset: 34,
            boderWidth: 0,
        }],

    }]


    const options = {
        plugins: {
            legend: {
                display: false
            }
        }

    }

    return (
        <div>
            <Titulo titulo={"Quantidade de produtos"} />
            <Doughnut data={data} options={options} />
        </div>
    )
}

export default GraphQtdProdutos
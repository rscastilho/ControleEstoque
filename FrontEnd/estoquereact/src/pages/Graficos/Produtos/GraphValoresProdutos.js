import React from 'react'
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS, Legend, Tooltip, ArcElement} from 'chart.js'
import Titulo from '../../../components/Titulo/Titulo';

const GraphValoresProdutos = ({ produtos }) => {

    const [data, setData] = [{
    labels: produtos.map((produto) => produto.descricao),

    datasets: [{
      label:"Valores dos produtos",
      data: produtos.map((produto) => produto.valor),
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
      fill: true,
      
    }],
     }]

     ChartJS.register(ArcElement, Legend, Tooltip)

     const options={
      plugins:{
        title:{
          display: false,
          text:'testando'
        }, 
        legend:{
          display:false
        }
        
        
      }
     }

  return (
    <div>
      <Titulo titulo={"Valores de produtos"}/>
      <Bar data={data} options={options} />
    </div>
  )
}

export default GraphValoresProdutos
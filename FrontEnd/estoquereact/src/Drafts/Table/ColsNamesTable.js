import React from 'react'

const ColsNamesTable = ({ itens }) => {
  
let coluna = Object.keys(itens[0] || itens)
let novo = Array.from(coluna);

return (
    <>
        {itens &&
            <thead>
                <tr>
                    {novo.map((x, i) => (<td key={i}>{x}</td>))}
                </tr>
            </thead>
        }
    </>
)
}

export default ColsNamesTable
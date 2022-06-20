import {MdEdit, MdDeleteForever} from 'react-icons/md'

const BotaoAcao = ({nome, handle, itens}) => {

    return (
        <>
            <button
                className={`btn btn-sm me-1 btn-outline-${nome === 'Editar' ? 'secondary' : 'danger'}`}
                onClick={() => handle(itens)}>
                    {nome ==='Editar' ?  
                    <>
                    <MdEdit size={20}/>
                    {nome}
                    </>:
                    <>
                    <MdDeleteForever size={20}/> 
                    {nome}
                    </> 
                    }
            </button>
        </>
    )
}

export default BotaoAcao
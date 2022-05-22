import {MdEdit, MdDeleteForever} from 'react-icons/md'

const BotaoAcao = (props) => {

    return (
        <>
            <button
                className={`btn btn-sm me-1 btn-outline-${props.nome === 'Editar' ? 'secondary' : 'danger'}`}
                onClick={() => props.handle(props.itens)}>
                    {props.nome ==='Editar' ?  
                    <>
                    <MdEdit size={20}/>
                    {props.nome}
                    </>:
                    <>
                    <MdDeleteForever size={20}/> 
                    {props.nome}
                    </> 
                    }
            </button>
        </>
    )
}

export default BotaoAcao
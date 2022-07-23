import React from 'react'
import styles from './TituloDashboard.module.css'

const TituloDashboard = ({ titulo }) => {
    return (
        <div>
            <span className={`${styles.titulo}`}>
                {titulo}
            </span>
        </div>
    )
}

export default TituloDashboard
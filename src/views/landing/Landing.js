import styles from './Landing.module.css'
import React from 'react'

import '../../components/buttons/button-base'

function Landing(props) {
  return (
    <div className={`${styles.landing}`}>
      <div className={`${styles.landing__main}`}>
        <button-base type='primary' label='First Button'></button-base>
      </div>
    </div>
  )
}

export default Landing

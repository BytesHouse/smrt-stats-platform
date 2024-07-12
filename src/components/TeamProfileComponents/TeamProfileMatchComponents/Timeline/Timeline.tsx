/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable postro4no/object-props */
import { useState } from 'react'
import cls from './Timeline.module.css'

export const Timeline = () => {
  const [state, setState] = useState();
  return (
    <div className={cls.wrapperTimeline}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 15px' }}>
        <div>0</div>
        <div>15</div>
        <div>30</div>
        <div>45+</div>
        <div>60</div>
        <div>75</div>
        <div>90</div>
      </div>
      <Possession isHome />
      <Possession />
      <div className={cls.nodata}>No data available</div>
    </div>)
}

const Possession = ({ isHome }: {isHome?: boolean}) => {
  const [state, setState] = useState();
  const styles = {
    alignItems: 'center',
    display: 'flex',
    height: '45px',
  }
  return <div style={isHome ? { ...styles, backgroundColor: '#C90F3299' } : { ...styles, backgroundColor: '#00448B99' }} />
}

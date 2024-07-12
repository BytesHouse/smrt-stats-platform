import React from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/user/userSlice';
import {
  CircleSc,
  InnerCircleSc,
  InputSc,
  OffsetContainerSc,
} from './styled';

type TFormationInfo = {
  offset_range_begin?: number,
  offset_range_end?: number,
}
export const Offset = ({ offset_range_begin, offset_range_end }: TFormationInfo) => {
  const dispatch = useDispatch()

  return (
    <OffsetContainerSc>
      -
      <InputSc
        type='number'
        placeholder='SEC'
        value={offset_range_begin}
        onChange={(e) => dispatch(userActions.changeOffsetBegin(e.target.value))}
      />
      <CircleSc>
        <InnerCircleSc />
      </CircleSc>
      <InputSc
        value={offset_range_end}
        onChange={(e) => dispatch(userActions.changeOffsetEnd(e.target.value))}
        type='number'
        placeholder='SEC'
      />
      +
    </OffsetContainerSc>
  )
}

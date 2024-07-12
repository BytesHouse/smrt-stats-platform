import { IconComponent } from 'assets/icons';
import {
  ScPenWrapper,
} from './styled';

type TPen = {
  setShowDraw: (show: boolean) => void,
}

export const Pen = ({ setShowDraw }: TPen) => (
  setShowDraw && (
    <ScPenWrapper
      // @ts-ignore
      onClick={() => setShowDraw((prev) => !prev)}
    >
      <IconComponent.PEN />
    </ScPenWrapper>
  )
)

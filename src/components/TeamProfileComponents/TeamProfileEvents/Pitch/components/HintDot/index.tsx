import type { TMarker } from '../../types';
import {
  ScHintWrapper,
  ScImg,
  ScMatchInfo,
  ScName,
  ScInfo,
  ScDivider,
  ScAction,
  ScRecipient,
} from './styled';

type THintProps = {
  marker: TMarker | null,
}

export const HintDot = ({ marker }: THintProps) => {
  if (!marker) return null
  return (
    <ScHintWrapper
      coord_x={Number(marker.coord_x)}
      coord_y={Number(marker.coord_y)}
    >
      {
        marker?.creator?.photo &&
        <ScImg src={marker?.creator?.photo} alt={marker?.creator?.display_name} />
      }
      <ScInfo>
        <ScName>{`${marker?.creator?.display_name ?? ''}`}</ScName>
        <ScMatchInfo>
          {`${marker?.match?.home_team?.name}  ${marker?.match?.away_team?.name}, ${marker?.match?.competition?.name ?? ''}`}
        </ScMatchInfo>
        <ScDivider />
        <ScMatchInfo>
          <div>
            <ScAction>{marker?.action}</ScAction>&nbsp;
            <ScRecipient>
              {marker.recipient && `to ${marker?.recipient?.display_name}`}
              {marker.second ? `on ${Math.floor(+marker.second / 60)} min of match` : ''}
            </ScRecipient>
          </div>
          {marker.recipient?.photo
                && <ScImg src={marker?.recipient?.photo ?? ''} alt={marker?.recipient?.display_name} />}
        </ScMatchInfo>
      </ScInfo>
    </ScHintWrapper>
  )
}

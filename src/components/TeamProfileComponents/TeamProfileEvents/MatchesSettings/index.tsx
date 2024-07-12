import {
  UiDropdown,
} from '../../../ui';
import cls from '../SelectEventsCard/SelectEventsCard.module.css';
import { Modal } from '../../../Modal/index';

type Option = {
  checked?: boolean,
  label: string,
  value: string | number,
}
type Props = {
  className?: string,
  competitions: Array<Option>,
  handleChangeSeason: (opt: Option) => void,
  handleResetSettings: () => void,
  handleSaveSettings: () => void,
  handleSelectedCompetition: () => void,
  handleSelectedCountMatches: (opt: Option) => void,
  isCompetition?: boolean,
  seasons: Array<Option>,
  selectedCountMatches: Array<Option>,
  withClose?: boolean,
}
export const MatchesSettings = ({
  className,
  competitions,
  handleChangeSeason,
  handleResetSettings,
  handleSaveSettings,
  handleSelectedCompetition,
  handleSelectedCountMatches,
  isCompetition,
  seasons,
  selectedCountMatches,
  withClose = false,
}: Props) => (
  <Modal
    withClose={withClose}
    onClose={handleSaveSettings}
    className={className}
  >
    <form
      className={cls.settingsform}
      onSubmit={handleSaveSettings}
    >
      <div className={cls.settingsform__item}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>
          Season
        </label>
        <UiDropdown
          onSelected={(val) => handleChangeSeason(val)}
          options={seasons}
          title={seasons?.find(({ checked }) => checked)?.label ?? ''}
        />
      </div>
      {/* TODO: убираем до лучших времен, потому что сезоны сейчас не привязаны  к датам */}
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      {/* <div className={cls.settingsform__item}> */}
      {/*  /!* eslint-disable-next-line jsx-a11y/label-has-associated-control *!/ */}
      {/*  <label>DATE:</label> */}
      {/*  <DatePicker */}
      {/*    wrapperClassName={cls.datepicker} */}
      {/*    selected={startDate} */}
      {/*    onChange={(date) => setStartDate(new Date(date))} */}
      {/*    selectsStart */}
      {/*    startDate={startDate} */}
      {/*    endDate={endDate} */}
      {/*    dateFormat='yyyy-MM-dd' */}
      {/*  /> */}
      {/*  &nbsp; - &nbsp; */}
      {/*  <DatePicker */}
      {/*    wrapperClassName={cls.datepicker} */}
      {/*    selected={endDate} */}
      {/*    onChange={(date) => setEndDate(new Date(date))} */}
      {/*    selectsEnd */}
      {/*    minDate={startDate} */}
      {/*    startDate={startDate} */}
      {/*    endDate={endDate} */}
      {/*    dateFormat='yyyy-MM-dd' */}
      {/*  /> */}
      {/* </div> */}
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      {!isCompetition &&
      <div className={cls.settingsform__item}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>
          competition
        </label>
        <UiDropdown
          onSelected={handleSelectedCompetition}
          multiChoose
          options={competitions}
          title={competitions?.find(({ checked }) => checked)?.label ?? ''}
        />
      </div>}
      <div className={cls.settingsform__item}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>
          pre-set
        </label>
        <UiDropdown
          onSelected={handleSelectedCountMatches}
          options={selectedCountMatches}
          title={selectedCountMatches?.find(({ checked }) => checked)?.label ?? ''}
        />
      </div>
      <div className={cls.settingsform_footer}>
        <button
          className={cls.settingsform__item}
          type='submit'
        >Accept
        </button>
        <button
          onClick={handleResetSettings}
          className={cls.settingsform__item}
          type='button'
        >reset
        </button>
      </div>
    </form>
  </Modal>
)

import './Stub.css';

const Stub = ({ setModalActive }) => (
  <div className='stub' onClick={() => setModalActive(false)}>
    <div className='content'>
      <p>We are dreadfully sorry, but this page is currently under construction.
        Our dev team is doing the best they can to present this page as soon as possible.
        If you would like to know more, please email at contact@smrtstats.com
      </p>
    </div>
  </div>
);

export default Stub;

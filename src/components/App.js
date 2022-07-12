import { v4 as uuidv4 } from 'uuid';
import './index.scss';

const App = () => {
  return <h1 className="test">{uuidv4()}</h1>;
};

export default App;

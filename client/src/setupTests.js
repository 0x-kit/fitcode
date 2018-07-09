import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Library to write expectations that just work a little bit better with React
Enzyme.configure({
  adapter: new Adapter()
});

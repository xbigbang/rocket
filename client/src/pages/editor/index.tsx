import * as ReactDOM from 'react-dom/client';
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root')!);   // ! 是非null和非undefined的类型断言，就是对document.getElementById('root')这个属性进行非空断言

root.render(<App/>);
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TestPage from './testModule/TestPage';

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<TestPage />} />
			</Routes>
		</Router>
	);
}

export default App;

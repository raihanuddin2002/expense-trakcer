import Balance from "./components/Balance";
import Form from "./components/Form";
import Layout from "./components/Layout";
import Transactions from "./components/Transactions/Transactions";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LimitedTrasactions from "./components/Transactions/LimitedTrasactions";

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={[<Balance key='1' />, <Form key='2' />, <LimitedTrasactions key='3' />]} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="*" element={<h1>404! Not Found Page</h1>} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;

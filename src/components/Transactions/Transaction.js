import { useDispatch } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import deleteImage from "../../assets/images/delete.svg";
import editImage from "../../assets/images/edit.svg";
import { getDeleteId } from "../../features/pagination/paginationSlice";
import {
    editActive,
    removeTransaction,
} from "../../features/transaction/transactionSlice";
import numberWithCommas from "../../utils/numberWithCommas";

export default function Transaction({ transaction }) {
    const { name, amount, type, id } = transaction || {};
    const dispatch = useDispatch();
    const match = useMatch('/');
    const navigate = useNavigate()

    const handleEdit = () => {
        dispatch(editActive(transaction));

        if (!match) navigate("/")
    };

    const handleDelete = () => {
        dispatch(getDeleteId(id));
        dispatch(removeTransaction(id));
    };

    return (
        <li className={`transaction ${type}`}>
            <p>{name}</p>
            <div className="right">
                <p>৳ {numberWithCommas(amount)}</p>
                <button className="link" onClick={handleEdit}>
                    <img alt="Edit" className="icon" src={editImage} />
                </button>
                <button className="link" onClick={handleDelete}>
                    <img alt="Delete" className="icon" src={deleteImage} />
                </button>
            </div>
        </li>
    );
}

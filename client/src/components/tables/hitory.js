import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/table.css';

const History = (props) => {
    const { account } = useAuth();
    let transactions = '';
    if (account) {
        transactions = account.history;
        if (props.filter === 'Deposit') {
            transactions = account.history.filter((item) => item.category === 'Deposit');
        }
        else if (props.filter === 'Withdraw') {
            transactions = account.history.filter((item) => item.category === 'Withdraw');

        }
        else
            transactions = account.history;
    }
    else
        transactions = ''
    return (
        <div className="table--responsive--md">
            <table className="table">
                <thead>
                    <tr>
                        <th>Transaction Type</th>
                        <th>Date</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                {transactions ?
                    <tbody>
                        {transactions.map(transaction => (
                            <tr key={transaction._id}>
                                <td className="trx-type" data-label="Transaction Type">{transaction.category}</td>
                                <td className="date" data-label="Date">{transaction.timestamp}</td>
                                <td className="amount" data-label="Amount">{transaction.amount}</td>
                            </tr>
                        ))}
                    </tbody> : null}
            </table>
        </div>
    )
}

export default History;
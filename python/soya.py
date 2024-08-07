import os
from dotenv import load_dotenv
from flask import Flask, jsonify
from beancount.loader import load_file
from beancount.core.data import Transaction, Balance, Open, Close, Note, Event, Price, Amount, Pad
from datetime import date, datetime

load_dotenv()

app = Flask(__name__)

beancount_entries = None


def convert_amount(amount):
    if (amount):
        return {
            "number": amount.number,
            "currency": amount.currency,
        }


def process_entry(entry):
    # 处理不同类型的条目
    if isinstance(entry, Transaction):
        return {
            "type": "Transaction",
            "date": entry.date.isoformat(),
            "meta": entry.meta,
            "payee": entry.payee,
            "narration": entry.narration,
            "postings": [
                {
                    "account": posting.account,
                    "price": convert_amount(posting.price),
                    "units": convert_amount(posting.units),
                    "cost": convert_amount(posting.cost),
                } for posting in entry.postings
            ]
        }
    elif isinstance(entry, Balance):
        return {
            "type": "Balance",
            "date": entry.date.isoformat(),
            "account": entry.account,
            "amount": convert_amount(entry.amount)
        }
    elif isinstance(entry, Pad):
        return {
            "type": "Pad",
            "date": entry.date.isoformat(),
            "account": entry.account,
            "source_account": entry.source_account,
        }
    elif isinstance(entry, Open):
        return {
            "type": "Open",
            "date": entry.date.isoformat(),
            "account": entry.account,
            "currencies": entry.currencies,
        }
    elif isinstance(entry, Price):
        return {
            "type": "Price",
            "meta": entry.meta,
            "date": entry.date.isoformat(),
            "currency": entry.currency,
            "amount": convert_amount(entry.amount),
        }
    elif isinstance(entry, Close):
        return {
            "type": type(entry).__name__,
            "date": entry.date.isoformat(),
            "account": entry.account,
        }
    elif isinstance(entry, Note):
        return {
            "type": "Note",
            "date": entry.date.isoformat(),
            "account": entry.account,
            "comment": entry.comment
        }
    elif isinstance(entry, Event):
        return {
            "type": "Event",
            "date": entry.date.isoformat(),
            "event_type": entry.type,
            "description": entry.description
        }
    else:
        return {
            "type": type(entry).__name__,
            "date": entry.date.isoformat(),
            "unknown": True,
        }


def convert_to_serializable(data):
    if isinstance(data, dict):
        return {k: convert_to_serializable(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [convert_to_serializable(i) for i in data]
    elif isinstance(data, tuple):
        return tuple(convert_to_serializable(i) for i in data)
    elif isinstance(data, (int, float, str, bool)) or data is None:
        return data
    elif isinstance(data, set):
        return list(convert_to_serializable(i) for i in data)
    else:
        return str(data)


@app.route('/api/load', methods=['GET'])
def get_entries():
    beancount_entries, errors, option = load_file(bean_file)
    print(option, errors)
    if beancount_entries is None:
        return jsonify({"error": "Beancount entries not loaded"}), 500
    entries_list = [process_entry(entry) for entry in beancount_entries]
    return jsonify({"entries": entries_list, "options": convert_to_serializable(option)}), 200


def start_server(bean_file):
    app.run(host='127.0.0.1', port=7000)


if __name__ == '__main__':
    bean_file = os.getenv('BEAN_FILE')
    start_server(bean_file)

import sys
from flask import Flask, jsonify
from beancount.loader import load_file
from beancount.core.data import Transaction, Balance, Open, Close, Note, Event, Posting, Amount
from datetime import date, datetime

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
    elif isinstance(entry, Open) or isinstance(entry, Close):
        return {
            "type": type(entry).__name__,
            "date": entry.date.isoformat(),
            "account": entry.account
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
            "date": entry.date.isoformat()
        }


@app.route('/api/get_entries', methods=['GET'])
def get_entries():
    beancount_entries, errors, option = load_file(bean_file)
    if beancount_entries is None:
        return jsonify({"error": "Beancount entries not loaded"}), 500
    entries_list = [process_entry(entry) for entry in beancount_entries]
    return jsonify(entries_list), 200


def start_server(bean_file):
    app.run(host='127.0.0.1', port=7000)


if __name__ == '__main__':
    bean_file = "/Users/xjmeng/Desktop/dev/soya/main.bean"
    start_server(bean_file)

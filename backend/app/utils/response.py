from flask import jsonify

def success_response(data=None, status_code=200):
    response = {
        "success": True,
        "data": data
    }
    return jsonify(response), status_code

def error_response(message, status_code=400):
    return jsonify({
        "success": False,
        "error": {
            "message": message,
            "code": status_code
        }
    }), status_code

def paginated_data(data, total):
    return {
        "items": data,
        "total": total
    }

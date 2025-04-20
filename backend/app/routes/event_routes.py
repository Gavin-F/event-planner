from flask import Blueprint, request
from ..services import event_service
from ..schemas.event_schema import EventSchema
from app.utils.exceptions import NotFoundError, ValidationError
from app.utils.response import paginated_data, success_response, error_response

events_bp = Blueprint("events", __name__)
event_schema = EventSchema()
events_schema = EventSchema(many=True)

@events_bp.route("/", methods=["GET"])
def get_events():
    try:
        page = int(request.args.get("page", 1))
        limit = int(request.args.get("limit", 10))
        events, total = event_service.get_all_events(page, limit)
        return success_response(paginated_data(events_schema.dump(events), total))
    except Exception as e:
        return error_response(str(e), 500)

@events_bp.route("/", methods=["POST"])
def create_event():
    try:
        data = request.json
        new_event = event_service.create_event(data)
        return success_response(event_schema.dump(new_event), status_code=201)
    except ValidationError as e:
        return error_response(str(e), 400)
    except Exception as e:
        return error_response(str(e), 500)

@events_bp.route("/<int:event_id>", methods=["GET"])
def get_event(event_id):
    try:
        event = event_service.get_event_by_id(event_id)
        return success_response(event_schema.dump(event))
    except NotFoundError as e:
        return error_response(str(e), 404)
    except Exception as e:
        return error_response(str(e), 500)

@events_bp.route("/<int:event_id>", methods=["PUT"])
def update_event(event_id):
    try:
        data = request.json
        updated_event = event_service.update_event(event_id, data)
        return success_response(event_schema.dump(updated_event))
    except NotFoundError as e:
        return error_response(str(e), 404)
    except ValidationError as e:
        return error_response(str(e), 400)
    except Exception as e:
        return error_response(str(e), 500)


@events_bp.route("/<int:event_id>", methods=["DELETE"])
def delete_event(event_id):
    try:
        event_service.delete_event(event_id)
        return success_response(status_code=204)
    except NotFoundError as e:
        return error_response(str(e), 404)
    except Exception as e:
        return error_response(str(e), 500)

@events_bp.route("/search", methods=["GET"])
def search_events():
    try:
        title = request.args.get("title", "")
        page = int(request.args.get("page", 1))
        limit = int(request.args.get("limit", 10))
        events, total = event_service.search_events(title, page, limit)
        return success_response(paginated_data(events_schema.dump(events), total))
    except Exception as e:
        return error_response(str(e), 500)

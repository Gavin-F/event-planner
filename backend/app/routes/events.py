from flask import Blueprint, request, jsonify
from ..services import event_service
from ..schemas.event_schema import EventSchema

events_bp = Blueprint("events", __name__)
event_schema = EventSchema()
events_schema = EventSchema(many=True)

@events_bp.route("/", methods=["GET"])
def get_events():
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))
    events, total = event_service.get_all_events(page, limit)
    return jsonify({"data": events_schema.dump(events), "total": total})

@events_bp.route("/", methods=["POST"])
def create_event():
    data = request.json
    new_event = event_service.create_event(data)
    return jsonify(event_schema.dump(new_event)), 201

@events_bp.route("/<int:event_id>", methods=["PUT"])
def update_event(event_id):
    data = request.json
    updated_event = event_service.update_event(event_id, data)
    return jsonify(event_schema.dump(updated_event))

@events_bp.route("/<int:event_id>", methods=["DELETE"])
def delete_event(event_id):
    event_service.delete_event(event_id)
    return "", 204

@events_bp.route("/search", methods=["GET"])
def search_events():
    title = request.args.get("title", "")
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))
    events, total = event_service.search_events(title, page, limit)
    return jsonify({"data": events_schema.dump(events), "total": total})

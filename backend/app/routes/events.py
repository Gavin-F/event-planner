from flask import Blueprint, request, jsonify
from ..services import event_service
from ..schemas.event_schema import EventSchema

events_bp = Blueprint("events", __name__)
event_schema = EventSchema()
events_schema = EventSchema(many=True)

@events_bp.route("/", methods=["GET"])
def get_events():
    events = event_service.get_all_events()
    return events_schema.jsonify(events)

@events_bp.route("/", methods=["POST"])
def create_event():
    data = request.json
    new_event = event_service.create_event(data)
    return event_schema.jsonify(new_event), 201

@events_bp.route("/<int:event_id>", methods=["PUT"])
def update_event(event_id):
    data = request.json
    updated_event = event_service.update_event(event_id, data)
    return event_schema.jsonify(updated_event)

@events_bp.route("/<int:event_id>", methods=["DELETE"])
def delete_event(event_id):
    event_service.delete_event(event_id)
    return "", 204

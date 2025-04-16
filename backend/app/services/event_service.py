from ..models import Event
from .. import db

def get_all_events():
    return Event.query.order_by(Event.start_date).all()

def get_event_by_id(event_id):
    return Event.query.get_or_404(event_id)

def create_event(data):
    event = Event(**data)
    db.session.add(event)
    db.session.commit()
    return event

def update_event(event_id, data):
    event = get_event_by_id(event_id)
    for key, value in data.items():
        setattr(event, key, value)
    db.session.commit()
    return event

def delete_event(event_id):
    event = get_event_by_id(event_id)
    db.session.delete(event)
    db.session.commit()

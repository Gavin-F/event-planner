from app.utils.exceptions import ValidationError
from ..models.event_model import Event
from .. import db

def get_all_events(page=1, limit=10):
    query = Event.query.order_by(Event.start_date)
    total = query.count()
    events = query.offset((page - 1) * limit).limit(limit).all()
    return events, total

def create_event(data):
    start_date = data.get("start_date")
    end_date = data.get("end_date")
    if start_date and end_date and end_date < start_date:
        raise ValidationError("End date must be after start date.") 

    event = Event(**data)
    db.session.add(event)
    db.session.commit()
    return event

def update_event(event_id, data):
    start_date = data.get("start_date")
    end_date = data.get("end_date")
    if start_date and end_date and end_date < start_date:
        raise ValidationError("End date must be after start date.") 
    event = Event.query.get_or_404(event_id)
    for key, value in data.items():
        setattr(event, key, value)
    db.session.commit()
    return event

def delete_event(event_id):
    event = Event.query.get_or_404(event_id)
    db.session.delete(event)
    db.session.commit()

def search_events(title, page=1, limit=10):
    query = Event.query.filter(Event.title.ilike(f"%{title}%")).order_by(Event.start_date)
    total = query.count()
    events = query.offset((page - 1) * limit).limit(limit).all()
    return events, total

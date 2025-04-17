from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from ..models.event_model import Event

class EventSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Event
        load_instance = True

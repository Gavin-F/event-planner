from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from ..models import Event

class EventSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Event
        load_instance = True

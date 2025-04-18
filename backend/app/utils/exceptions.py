class NotFoundError(Exception):
    """Raised when a resource is not found."""


class ValidationError(Exception):
    """Raised for bad input or missing fields."""


class ConflictError(Exception):
    """Raised for conflicting resources (e.g., duplicate title)."""

# Health Check Route
from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
async def health_check():
    """
    Health check endpoint for liveness probe.
    Returns 200 OK if the service is running.
    """
    return {
        "status": "healthy",
        "message": "Portfolio API is running",
        "version": "1.0.0"
    }

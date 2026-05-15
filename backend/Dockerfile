FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Expose port 7860 (default for Hugging Face Spaces)
EXPOSE 7860

# Command to run the application
# We use uvicorn to serve the FastAPI app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]

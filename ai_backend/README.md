# AI Backend Setup Guide

## Prerequisites
- Python 3.8+
- TensorFlow 2.14+
- pip (Python package manager)

## Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Train the model (optional):
```bash
python train_model.py
```

Note: The train_model.py expects training data in `data/train` and `data/validation` directories with subdirectories for "genuine" and "counterfeit" currency notes.

3. Run the AI service:
```bash
python app.py
```

The service will start on `http://localhost:8000`

## Endpoints

- `GET /health` - Health check
- `POST /analyze` - Analyze currency note image

## Testing

Test the health endpoint:
```bash
curl http://localhost:8000/health
```

Test with an image:
```bash
curl -X POST -F "file=@path/to/image.jpg" http://localhost:8000/analyze
```


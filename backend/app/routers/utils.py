from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import PlainTextResponse
import base64
import json
import yaml

router = APIRouter()

@router.post("/convert/utils/base64-encode")
async def base64_encode(text: str = Form(...)):
    try:
        encoded = base64.b64encode(text.encode('utf-8')).decode('utf-8')
        return PlainTextResponse(encoded)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/convert/utils/base64-decode")
async def base64_decode(text: str = Form(...)):
    try:
        decoded = base64.b64decode(text).decode('utf-8')
        return PlainTextResponse(decoded)
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid Base64 string")

@router.post("/convert/utils/json-to-yaml")
async def json_to_yaml(file: UploadFile = File(...)):
    try:
        content = await file.read()
        json_data = json.loads(content)
        yaml_data = yaml.dump(json_data)
        return PlainTextResponse(yaml_data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid JSON: {str(e)}")

@router.post("/convert/utils/yaml-to-json")
async def yaml_to_json(file: UploadFile = File(...)):
    try:
        content = await file.read()
        yaml_data = yaml.safe_load(content)
        json_data = json.dumps(yaml_data, indent=2)
        return PlainTextResponse(json_data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid YAML: {str(e)}")

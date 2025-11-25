from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import PlainTextResponse, JSONResponse
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


@router.post("/utils/hash")
async def generate_hash(file: UploadFile = File(...), algorithm: str = Form("sha256")):
    """
    Generate file hash/checksum
    Supported: md5, sha1, sha256, sha512
    """
    import hashlib
    
    try:
        algorithms = {
            'md5': hashlib.md5,
            'sha1': hashlib.sha1,
            'sha256': hashlib.sha256,
            'sha512': hashlib.sha512,
        }
        
        if algorithm.lower() not in algorithms:
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported algorithm. Use: {', '.join(algorithms.keys())}"
            )
        
        hasher = algorithms[algorithm.lower()]()
        contents = await file.read()
        hasher.update(contents)
        
        return JSONResponse(content={
            "filename": file.filename,
            "algorithm": algorithm.lower(),
            "hash": hasher.hexdigest(),
            "size_bytes": len(contents)
        })
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Hash failed: {str(e)}")

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

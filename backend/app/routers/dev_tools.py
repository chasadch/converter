from fastapi import APIRouter, Form, HTTPException
from fastapi.responses import PlainTextResponse, JSONResponse
import json
import uuid
import urllib.parse

router = APIRouter()

@router.post("/tools/json-format")
async def format_json(text: str = Form(...), minify: bool = Form(False)):
    """Format or minify JSON"""
    try:
        data = json.loads(text)
        if minify:
            result = json.dumps(data, separators=(',', ':'))
        else:
            result = json.dumps(data, indent=2)
        return PlainTextResponse(result)
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=400, detail=f"Invalid JSON: {str(e)}")


@router.post("/tools/uuid-generate")
async def generate_uuid(count: int = Form(1), version: int = Form(4)):
    """Generate UUID/GUID"""
    try:
        if count < 1 or count > 100:
            raise HTTPException(status_code=400, detail="Count must be 1-100")
        
        uuids = []
        for _ in range(count):
            if version == 1:
                uuids.append(str(uuid.uuid1()))
            elif version == 4:
                uuids.append(str(uuid.uuid4()))
            else:
                raise HTTPException(status_code=400, detail="Only UUID v1 and v4 supported")
        
        return JSONResponse(content={"uuids": uuids, "count": len(uuids)})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/tools/url-encode")
async def encode_url(text: str = Form(...)):
    """URL encode text"""
    try:
        encoded = urllib.parse.quote(text)
        return PlainTextResponse(encoded)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/tools/url-decode")
async def decode_url(text: str = Form(...)):
    """URL decode text"""
    try:
        decoded = urllib.parse.unquote(text)
        return PlainTextResponse(decoded)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/tools/lorem-ipsum")
async def generate_lorem_ipsum(
    paragraphs: int = Form(3),
    words_per_para: int = Form(50)
):
    """Generate Lorem Ipsum text"""
    try:
        lorem_words = [
            "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing",
            "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore",
            "et", "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam",
            "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip",
            "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in",
            "reprehenderit", "voluptate", "velit", "esse", "cillum", "fugiat", "nulla",
            "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident",
            "sunt", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est"
        ]
        
        import random
        result = []
        
        for _ in range(paragraphs):
            words = [random.choice(lorem_words) for _ in range(words_per_para)]
            words[0] = words[0].capitalize()
            para = ' '.join(words) + '.'
            result.append(para)
        
        return PlainTextResponse('\n\n'.join(result))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

from fastapi import APIRouter, Depends, HTTPException, Response, Request
from sqlalchemy.orm import Session
from passlib.hash import bcrypt
from jose import jwt, JWTError
from datetime import datetime, timedelta
from database import get_db
from models import User
from schemas import UserCreate, UserOut, LoginIn
import os

router = APIRouter(prefix="/auth", tags=["auth"])
JWT_SECRET = os.getenv("JWT_SECRET", "change_me")
JWT_ALG = os.getenv("JWT_ALG", "HS256")
ACCESS_MIN = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))

def make_token(sub: int):
    return jwt.encode({"sub": sub, "exp": datetime.utcnow()+timedelta(minutes=ACCESS_MIN)}, JWT_SECRET, algorithm=JWT_ALG)

def current_user(request: Request, db: Session = Depends(get_db)) -> User:
    token = request.cookies.get("access_token")
    if not token: raise HTTPException(401, "Not authenticated")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
        uid = payload.get("sub")
    except JWTError:
        raise HTTPException(401, "Invalid token")
    user = db.get(User, uid)
    if not user: raise HTTPException(401, "User not found")
    return user

@router.post("/register", response_model=UserOut)
def register(body: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter_by(email=body.email).first():
        raise HTTPException(400, "Email already registered")
    u = User(email=body.email, password_hash=bcrypt.hash(body.password), full_name=body.full_name)
    db.add(u); db.commit(); db.refresh(u)
    return u

@router.post("/login")
def login(body: LoginIn, response: Response, db: Session = Depends(get_db)):
    u = db.query(User).filter_by(email=body.email).first()
    if not u or not bcrypt.verify(body.password, u.password_hash):
        raise HTTPException(401, "Invalid credentials")
    response.set_cookie("access_token", make_token(u.id), httponly=True, samesite="lax", secure=False, max_age=ACCESS_MIN*60, path="/")
    return {"message": "logged_in"}

@router.post("/logout")
def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    return {"message": "logged_out"}

@router.get("/me", response_model=UserOut)
def me(u: User = Depends(current_user)):
    return u

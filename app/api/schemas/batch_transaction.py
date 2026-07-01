from typing import List

from pydantic import BaseModel

from app.api.schemas.transaction import TransactionRequest


class BatchTransactionRequest(BaseModel):

    transactions: List[TransactionRequest]
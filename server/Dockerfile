#=======================================
FROM python:3.13-slim AS builder

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

RUN curl -Ls https://astral.sh/uv/install.sh | sh
ENV PATH="/root/.local/bin:${PATH}"

WORKDIR /app
COPY requirements.txt .

RUN uv venv /venv

ENV VIRTUAL_ENV=/venv
ENV PATH="/venv/bin:${PATH}"

RUN uv pip install -r requirements.txt

#=======================================
FROM python:3.13-slim

WORKDIR /app

COPY --from=builder /venv /venv
COPY . .

ENV PATH="/venv/bin:${PATH}"

EXPOSE 8080
CMD ["uvicorn", "wsgi:app", "--host", "0.0.0.0", "--port", "8080"]
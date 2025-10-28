FROM python:3.10-alpine

RUN apk update
RUN apk add --no-cache gcc musl-dev sqlite-dev

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app
RUN pip install -r requirements.txt
COPY . /app
EXPOSE 8080
ENTRYPOINT [ "python" ]
CMD [ "run.py" ]

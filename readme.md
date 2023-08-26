# Hall Booking API

    This project provides APIs to manage room booking 

## API Documentation

### Create a new room

**Endpoint**: `http://localhost:3000/create-room`
**Method**: POST

Creates a new room

**Request Parameters**

Not required.

**Example Request**
request body : {"seat": 2, "amenities": ["wifi", "coffeemaker", "desk", "closet", "iron board"], "price": 1200 }
Note : Please specify the key names exactly as mentioned above.

**Example Response**
{
    "Message": "room created successfully",
    "data": [
        {
            "id": "100", "seat": 2,"amenities": ["wifi","coffeemaker","desk","closet","iron board"],"price": 1200
        }
    ]
}

### Book a new room

**Endpoint**: `http://localhost:3000/book-room`
**Method**: POST

Books a new room 

**Request Parameters**

Not required.

**Example Request**

request body :  {
        "custName":"Suresh",
        "date":"2023-08-09",
        "start":"22:01:00",
        "end":"23:55:00",
        "roomID":"100"
    }

Note : Please specify the key names exactly as mentioned above.
**Example Response**
1. Room ID is not valid
invalid room ID

2. Room Already Booked
room already booked for given time

3. Booking Confirmed
{
    "Message": "Booking confirmed",
    "data": [
        {
            "id": 1,
            "custName": "Suresh",
            "date": "2023-08-09",
            "start": "22:01:00",
            "end": "23:55:00",
            "roomID": "100"
        }
    ]
}

### List all rooms with booked data

**Endpoint**: `http://localhost:3000/list-rooms`
**Method**: GET

Retrieves a list of files from the designated folder.

**Request Parameters**

Not required.

**Example Request**

http://localhost:3000/list-rooms


**Example Response**
1.If Booking data is found 
[
    {
        "roomName": "Room 100",
        "bookingStatus": "Booked",
        "custName": "Suresh",
        "bookingDate": "2023-08-09",
        "startTime": "22:01:00",
        "endTime": "23:55:00"
    }
]

2. If no bookings are found
No Booking Data found

### List all customers with booked data

**Endpoint**: `http://localhost:3000/list-customers`
**Method**: GET

Retrieves a list of files from the designated folder.

**Request Parameters**

Not required.

**Example Request**

http://localhost:3000/list-customers


**Example Response**
1.If Customer data is found 
[
    {
        "custName": "Suresh",
        "roomName": "Room 100",
        "date": "2023-08-09",
        "startTime": "22:01:00",
        "endTime": "23:55:00"
    }
]

2. If no customer data is found
No Customer Data found

### List how many times a customer has booked room

**Endpoint**: `http://localhost:3000/booking-history/:custName`
**Method**: GET

Retrieves a list of files from the designated folder.

**Request Parameters**

Customer Name should be specified and is not case sensitive

**Example Request**

http://localhost:3000/booking-history/Suresh


**Example Response**
1.If Customer data is found 
[
    {
        "custName": "Suresh",
        "roomName": "Room 100",
        "date": "2023-08-09",
        "startTime": "22:01:00",
        "endTime": "23:55:00",
        "bookingID": 1
    }
]

2. If no customer booking history is not found
There is no booking history for this customer

## Installation and Setup

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Start the server using `npm run start`.
3. In case of Development environment, start the server using `npm run dev'.

## Usage

1. Make API requests using tools like Postman.
2. Refer to the API documentation for details on available endpoints (https://documenter.getpostman.com/view/28692061/2s9Y5YRhWP)



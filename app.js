const express = require('express');
const app = express();
app.use(express.json());

const rooms = [];
const bookedData = [];

/* API Endpoint to create room
    1. Room id is length of room array + 100
    2. get seat,amenities and price from request body and push them to array along with id as unique
    3. Send room array as response
*/

app.post('/create-room', (req, res) => {
    try {

          // Since req.body is a object, convert it to array using Object.values to get length
         if(Object.values(req.body).length!==3) {
            res.send("Data received is not in valid format");
        }
        else {
            const { seat, amenities, price } = req.body;
            const id = String(rooms.length + 100);
            rooms.push({ id, seat, amenities, price });
            res.send({ "Message": "room created successfully", "data": rooms });
        }
        
    }
    catch (error) {
        res.send("Error occured while creating room"+error);
    }
});

//API Endpoint to book room
app.post('/book-room', (req, res) => {
    try {
        const { custName, date, start, end, roomID } = req.body;
        
        const filteredRoom = rooms.find(room => room.id === roomID);
        /*
    1. If room id is not specified return text as room id is required or any of the required value is missing return data is not in valid format
    2. Check whether room exists if not send response as invalid room id
    3. if room id is correct then check whether room has last start time and end time
    4. If yes then compare last end time with the start time of new booking
    5. If last end time is  greater than start time then it means room is already booked and send response as room already booked
    6. Else book the room and send booking data as response
   */

        if (!roomID) {
            res.send("room id is required");
        }

        // Since req.body is a object, convert it to array using Object.keys to get length
        else if(Object.keys(req.body).length!==5) {
            res.send("Data received is not in valid format");
        }
        else if (!filteredRoom) {
            res.send("invalid room ID");
        }

        else {
            const startTime = new Date(`${date}T${start}`);
            const endTime = new Date(`${date}T${end}`);
            if (filteredRoom.endTime && filteredRoom.endTime > startTime) {
                res.send("room already booked for given time");
            }
            else {
                const id = bookedData.length + 1;
                filteredRoom.startTime = startTime;
                filteredRoom.endTime = endTime;
                bookedData.push({ id, custName, date, start, end, roomID });
                res.send({ "Message": "Booking confirmed", "data": bookedData });
            }

        }
    }
    catch (error) {
        res.send("Error occured while booking room");
    }

});

/*API Endpoint to list rooms
     1.Use map to iterate over every value in room array
     2. use find to get the booking data of each room
     3. the return the room name,booking status ,customer name,date,start time,end time for each room
     */

app.get('/list-rooms', (req, res) => {
    try {
        const roomList = rooms.map(room => {
            const booked = bookedData.find(booking => booking.roomID === room.id);
            return {
                roomName: `Room ${room.id}`,
                bookingStatus: booked ? 'Booked' : 'Available',
                custName: booked ? booked.custName : '',
                bookingDate: booked ? booked.date : '',
                startTime: booked ? booked.start : '',
                endTime: booked ? booked.end : '',
            };
        });

        if (bookedData.length === 0) {
            res.send("No Booking Data found");
        } else {
            res.send(roomList);
        }
    }
    catch (error) {
        res.send("error occurred: " + error);
    }

});

/*API Endpoint to list customers
     1.Use map to iterate over every value  in bookedData array
     2. use find to get the room id from rooms array
     3. the return the customer name,Room name,start time,end time
     */

app.get('/list-customers', (req, res) => {
    try {
        const custData = bookedData.map(booking => {
            const room = rooms.find(room => room.id === booking.roomID);
            return {
                custName: booking.custName,
                roomName: `Room ${room.id}`,
                date: booking.date,
                startTime: booking.start,
                endTime: booking.end
            };
        })
        if (custData.length === 0) {
            res.send("No Customer Data found");
        } else {
            res.send(custData);
        }
    }
    catch (error) {
        res.send("error occurred: " + error);
    }

});

/*API Endpoint to list how many times a  customer has booked rooms
1, Get the custome name from path params
2. Filter booked data using customer name
3. If customer has booking history return the booking history or return "There is no booking history for this customer"
*/

app.get('/booking-history/:custName', (req, res) => {
    try {
        const { custName } = req.params;
        const custHistory = bookedData.filter(booking => booking.custName.toLowerCase() === custName.toLowerCase());

        if (custHistory.length === 0) {
            res.send("There is no booking history for this customer");
        } else {

          const customerBookingHistory = custHistory.map(booking => ({
                custName: booking.custName,
                roomName: "Room "+booking.roomID,
                date: booking.date,
                startTime: booking.start,
                endTime: booking.end,
                bookingID: booking.id,
            }));

            res.send(customerBookingHistory);
        }
    }
    catch (error) {
        res.send("error occurred: " + error);
    }
});

app.listen(3000, () => {
    console.log('listening on port 3000');
})
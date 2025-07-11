import Event from "../../models/event.model.js";
import Booking from "../../models/booking.model.js";
import { tansformEvent, tranformBooking } from "./index.js";



    const  bookings = async (args, req) => {
    try {
      if(!req.isAuth){
        throw new Error("You are not authorized to get bookings");
      }
      const bookings = await Booking.find();
      return bookings?.map((booking) => {
        return tranformBooking(booking);
      });
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  const bookEvent = async (args, req) => {
   try {
     if(!req.isAuth){
        throw new Error("You are not authorized to book event");
      }
    const getEvent = await Event.findOne({ _id: args.eventId });
    if (!getEvent) {
      throw new Error("Event not found");
    }
    const booking = new Booking({
      event: getEvent,
      user: req.userId,
    });

    const res = await booking.save();
    return tranformBooking(res);
   } catch (error) {
      throw new Error(error);
   }
  }

  const cancelBooking = async (args, req) => {
    try {
      if(!req.isAuth){
        throw new Error("You are not authorized to cancel booking");
      }
      const booking = await Booking.findById(args.bookingId).populate("event");
      if (!booking) {
        throw new Error("Booking not found");
      }
      const event = tansformEvent(booking.event);

      await Booking.deleteOne({ _id: args.bookingId });
      return event;
    } catch (error) {
      throw new Error(error);
    }
  }


  export default {
    bookings,
    bookEvent,
    cancelBooking,
  }



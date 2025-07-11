import Event from "../../models/event.model.js";
import Booking from "../../models/booking.model.js";
import { tansformEvent, tranformBooking } from "./index.js";



    const  bookings = async () => {
    try {
      const bookings = await Booking.find();
      return bookings?.map((booking) => {
        return tranformBooking(booking);
      });
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  const bookEvent = async (args) => {
    const getEvent = await Event.findOne({ _id: args.eventId });
    if (!getEvent) {
      throw new Error("Event not found");
    }
    const booking = new Booking({
      event: getEvent,
      user: "686a22a094572b0d0b1d29f5",
    });

    const res = await booking.save();
    return tranformBooking(res);
  }

  const cancelBooking = async (args) => {
    try {
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



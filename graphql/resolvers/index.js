import Event from "../../models/event.model.js";
import User from "../../models/user.model.js";
import Booking from "../../models/booking.model.js";
import bcrypt from "bcryptjs";
import { graphqlHTTP } from "express-graphql";
import e from "cors";

const userfn = async (userId) => {
  try {
    const user = User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: eventList.bind(this, user.createdEvents),
    };
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const eventList = async (eventId) => {
  try {
    const events = await Event.find({ _id: { $in: eventId } });

    events.map((event) => {
      return {
        ...event._doc,
        _id: event.id,
        creator: userfn.bind(this, event.creator),
      };
    });

    return events;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const singelEvent = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    return {
      ...event._doc,
      _id: event.id,
      creator: userfn.bind(this, event.creator),
    };
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const resolvers = {
  events: async () => {
    try {
      const res = await Event.find();
      res.map((event) => {
        return {
          ...event._doc,
          _id: event.id,
          date: new Date(event._doc.date).toISOString,
          creator: userfn.bind(this, event._doc.creator),
        };
      });
      return res;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },
  createEvent: async (args) => {
    try {
      const event = new Event({
        name: args.eventInput.name,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: "686a22a094572b0d0b1d29f5",
      });
      const res = await event.save();

      let createdEvent;
      createdEvent = {
        ...res._doc,
        _id: res._doc._id.toString(),
        date: new Date(res._doc.date).toISOString,
        creator: userfn.bind(this, res._doc.creator),
      };

      const creator = await User.findById("686a22a094572b0d0b1d29f5");

      if (!creator) {
        throw new Error("User not found");
      }

      creator.createdEvents.push(event);

      await creator.save();

      return createdEvent;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },
  createUser: async (args) => {
    try {
      const userExist = User.findOne({ email: args.userInput.email });
      if (userExist) {
        throw new Error("User already exists");
      }
      const hashpass = bcrypt.hash(args.userInput.password, 12);
      const newUser = new User({
        email: args.userInput.email,
        password: hashpass,
      });
      const res = await newUser.save();

      console.log(res);
      return {
        ...res._doc,
        password: null,
        _id: res._doc._id.toString(),
      };
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  booking:async()=>{
    try {
        const bookings = await Booking.find();
        return bookings?.map((booking)=>{
            return{
                ...booking._doc,
                _id:booking.id,
                user :userfn.bind(this, booking._doc.user),
                event :singelEvent.bind(this, booking._doc.event),
                createdAt :new Date(booking._doc.createdAt).toISOString(),
                updatedAt :new Date(booking._doc.updatedAt).toISOString(),
            }
        })
    } catch (err) {
      console.log(err)
      throw new Error(err)
    }
  },
  bookEvent: async (args) => {
    const getEvent = await Event.findOne({ _id: args.eventId });
    if (!getEvent) {
      throw new Error("Event not found");
    }
    const booking = new Booking({
      event: getEvent,
      user: "686a22a094572b0d0b1d29f5",
    });

    const res = await booking.save();
    return{
      ...res._doc,
      _id:res.id,
      user :userfn.bind(this, res._doc.user),
      event :singelEvent.bind(this, res._doc.event),
      createdAt :new Date(res._doc.createdAt).toISOString(), 
      updatedAt :new Date(res._doc.updatedAt).toISOString(),
    }
  },
  cancelBooking: async (args) => {
    try {
      const booking = await Booking.findById(args.bookingId).populate("event");
    if (!booking) {
      throw new Error("Booking not found");
    }
    const event ={
      ...booking.event._doc,
      _id:booking.event.id,
      creator :userfn.bind(this, booking.event._doc.creator),
    }

    await Booking.deleteOne({ _id: args.bookingId });
    return event;
    } catch (error) {
      throw new Error(error);
    }
  },

};

export default resolvers;

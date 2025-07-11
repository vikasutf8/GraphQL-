import Event from "../../models/event.model.js";
import User from "../../models/user.model.js";
import Booking from "../../models/booking.model.js";

import { dateToString } from "../../helpers/date.js";


export const tansformEvent = (event) => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event._doc.date),
    creator: userfn.bind(this, event._doc.creator),
  };
};

export const tranformBooking = (booking) => {
  return {
    ...booking._doc,
    _id: booking.id,
    user: userfn.bind(this, booking._doc.user),
    event: singelEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt),
  };
};

export const userfn = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found in userfn");
    }
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

 export const eventList = async (eventId) => {
  try {
    const events = await Event.find({ _id: { $in: eventId } });

    events.map((event) => {
      return tansformEvent(event);
    });

    return events;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const singelEvent = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    return tansformEvent(event);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

// const resolvers = {
//   events: async () => {
//     try {
//       const res = await Event.find();
//       return res.map((event) => {
//         return tansformEvent(event);
//       });
//       // return res;  // as map return new array
//     } catch (err) {
//       console.log(err);
//       throw new Error(err);
//     }
//   },

//   createEvent: async (args) => {
//     try {
//       const event = new Event({
//         name: args.eventInput.name,
//         description: args.eventInput.description,
//         price: +args.eventInput.price,
//         date: new Date(args.eventInput.date),
//         creator: "686a22a094572b0d0b1d29f5",
//       });
//       const res = await event.save();
//       //what we Doing :: created an envent. that should be first stored in event database but other side user database also listing each events of that specific user created.. that new event object should be passed in users database are array of events
//       let createdEvent;
//       createdEvent = tansformEvent(res);

//       const creator = await User.findById("686a22a094572b0d0b1d29f5");

//       if (!creator) {
//         throw new Error("User not found");
//       }
//       creator.createdEvents.push(event);

//       await creator.save();
//       return createdEvent;
//     } catch (err) {
//       console.log(err);
//       throw new Error(err);
//     }
//   },

//   createUser: async (args) => {
//     try {
//       const userExist = User.findOne({ email: args.userInput.email });
//       if (userExist) {
//         throw new Error("User already exists");
//       }
//       const hashpass = bcrypt.hash(args.userInput.password, 12);
//       const newUser = new User({
//         email: args.userInput.email,
//         password: hashpass,
//       });
//       const res = await newUser.save();

//       console.log(res);
//       return {
//         ...res._doc,
//         password: null,
//         _id: res._doc._id.toString(),
//       };
//     } catch (err) {
//       console.log(err);
//       throw new Error(err);
//     }
//   },

//   bookings: async () => {
//     try {
//       const bookings = await Booking.find();
//       return bookings?.map((booking) => {
//         return tranformBooking(booking);
//       });
//     } catch (err) {
//       console.log(err);
//       throw new Error(err);
//     }
//   },

//   bookEvent: async (args) => {
//     const getEvent = await Event.findOne({ _id: args.eventId });
//     if (!getEvent) {
//       throw new Error("Event not found");
//     }
//     const booking = new Booking({
//       event: getEvent,
//       user: "686a22a094572b0d0b1d29f5",
//     });

//     const res = await booking.save();
//     return tranformBooking(res);
//   },

//   cancelBooking: async (args) => {
//     try {
//       const booking = await Booking.findById(args.bookingId).populate("event");
//       if (!booking) {
//         throw new Error("Booking not found");
//       }
//       const event = tansformEvent(booking.event);

//       await Booking.deleteOne({ _id: args.bookingId });
//       return event;
//     } catch (error) {
//       throw new Error(error);
//     }
//   },
// };

// export default resolvers;



import  userResolvers from "./users.js";
import  eventResolvers from "./events.js";
import  bookingResolvers from "./booking.js";


const resolvers = {
    ...userResolvers,
    ...eventResolvers,
    ...bookingResolvers,
} 

export default resolvers;
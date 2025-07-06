
import Event from "../../models/event.model.js";
import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import { graphqlHTTP } from "express-graphql";



const userfn = (userId) => {
  return User.findById(userId)
    .then((user) => {
      return {
        ...user._doc,
        _id: user.id,
        createdEvents: eventList.bind(this, user.createdEvents),
      };
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err);
    });
};

const eventList = (eventId) => {
  return Event.find({ _id: { $in: eventId } })
    .then((events) => {
      return events.map((event) => {
        return {
          ...event._doc,
          _id: event.id,
          creator: userfn.bind(this, event.creator),
        };
      });
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err);
    });
};


const resolvers={
      events: () => {
        return Event.find()
          .then((res) => {
            return res.map((event) => {
              return {
                ...event._doc,
                _id: event.id,
                date: new Date(event._doc.date).toISOString,
                creator: userfn.bind(this, event._doc.creator),
              };
            });
          })
          .catch((err) => {
            console.log(err);
            throw new Error(err);
          });
      },
      createEvent: (args) => {
        const event = new Event({
          name: args.eventInput.name,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date),
          creator: "686a22a094572b0d0b1d29f5",
        });
        let createdEvent;
        return event
          .save()
          .then((res) => {
            createdEvent = {
              ...res._doc,
              _id: res._doc._id.toString(),  
              date: new Date(res._doc.date).toISOString,   
              creator: userfn.bind(this, res._doc.creator),
            };
            return User.findById("686a22a094572b0d0b1d29f5");
          })
          .then((user) => {
            if (!user) {
              throw new Error("User not found");
            }
            user.createdEvents.push(event);
            return user.save();
          })
          .then((res) => {
            return createdEvent;
          })
          .catch((err) => {
            console.log(err);
            throw new Error(err);
          });
      },
      createUser: (args) => {
        return User.findOne({ email: args.userInput.email })
          .then((user) => {
            if (user) {
              throw new Error("User already exists");
            }
            return bcrypt.hash(args.userInput.password, 12);
          })
          .then((hashPass) => {
            const user = new User({
              email: args.userInput.email,
              password: hashPass,
            });
            return user
              .save()
              .then((res) => {
                console.log(res);
                return {
                  ...res._doc,
                  password: null,
                  _id: res._doc._id.toString(),
                };
              })
              .catch((err) => {
                console.log(err);
                throw new Error(err);
              });
          })
          .catch((err) => {
            console.log(err);
            throw new Error(err);
          });
      },
    }


    export default resolvers;
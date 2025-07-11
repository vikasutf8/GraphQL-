import Event from "../../models/event.model.js";
import User from "../../models/user.model.js";
import { tansformEvent } from "./index.js";



  const events = async () => {
    try {
      const res = await Event.find();
      return res.map((event) => {
        return tansformEvent(event);
      });
      // return res;  // as map return new array
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };

  const createEvent = async (args) => {
    try {
      const event = new Event({
        name: args.eventInput.name,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: "686a22a094572b0d0b1d29f5",
      });
      const res = await event.save();
      //what we Doing :: created an envent. that should be first stored in event database but other side user database also listing each events of that specific user created.. that new event object should be passed in users database are array of events
      let createdEvent;
      createdEvent = tansformEvent(res);

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
  };

 
  export default {
    events,
    createEvent,
  }
 
import Conversation from "../models/Conversation.js";

//create a conversation
export const createConversation = async (req, res, next) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    next(err);
  }
};

//get conversation of a user
export const getConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    next(err);
  }
};

//get conversation of two users
export const getConversationTwoUsers = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    next(err);
  }
};

// Supprimer une conversation
export const deleteConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.deleteOne({
      _id: req.params.id,
    });
    res.status(200).json(conversation);
  } catch (err) {
    next(err);
  }
}


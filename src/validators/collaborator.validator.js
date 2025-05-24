import Joi from '@hapi/joi';

export const newCollaboratorValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    noteId: Joi.required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
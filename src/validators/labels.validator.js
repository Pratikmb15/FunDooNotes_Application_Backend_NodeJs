import Joi from '@hapi/joi';

export const newLabelValidator = (req, res, next) => {
  const schema = Joi.object({
    labelName: Joi.string().required(),
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
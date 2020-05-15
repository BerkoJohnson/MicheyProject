import { ValidationMessage } from '../../interfaces/validation-messages';

export const PositionValidation: ValidationMessage = {
  title: [
    { type: 'required', message: 'Title is required' },
    {
      type: 'pattern',
      message: 'Title must contain only leters'
    }
  ]
};

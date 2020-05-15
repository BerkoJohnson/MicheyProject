import { ValidationMessage } from '../../interfaces/validation-messages';

export const electionValidation: ValidationMessage = {
  title: [
    { type: 'required', message: 'Title is required' },
    {
      type: 'pattern',
      message: 'Title must contain only numbers and letters'
    }
  ],
  school: [
    { type: 'required', message: 'Name of School is required' },
    {
      type: 'pattern',
      message: 'Name of School must contain only letters'
    }
  ],
  academicYear: [
    { type: 'required', message: 'Academic Year is required' },
    { type: 'pattern', message: 'Academic Year should like "2020/2021"' }
  ]
};

import { ValidationMessage } from '../../interfaces/validation-messages';

export const CandidateValidation: ValidationMessage = {
  room: [
    {
      type: 'required',
      message: 'Class is required'
    }
  ],
  name: [
    {
      type: 'required',
      message: 'Name is required'
    },
    {
      type: 'pattern',
      message: 'Name must contain only leters'
    }
  ],
  dob: [
    {
      type: 'required',
      message: 'Date of Birth is required'
    }
  ],
  gender: [
    {
      type: 'required',
      message: 'Gender is required'
    }
  ],
  nickname: [
    {
      type: 'required',
      message: 'Nickname is required'
    },
    {
      type: 'pattern',
      message: 'Nickname must contain only leters and numbers'
    }
  ],
  position: [
    {
      type: 'required',
      message: 'Position is required'
    }
  ],
  photo: [
    {
      type: 'required',
      message: 'Photo is required'
    }
  ]
};

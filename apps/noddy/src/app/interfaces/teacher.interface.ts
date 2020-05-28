interface Teacher {
  _id: string;
  personal: {
    firstName: string;
    lastName: string;
    otherNames?: string;
    gender: 'Male' | 'Female';
    dob: string;
  };
  contactDetail: {
    telephone: string[];
    email: string;
    address: string;
    residentialAddress: string;
  };
  eduBackground: {
    qualification: string;
    year: string;
  }[];
  others: {
    interests: string[];
  };
  createdAt?: string;
  updatedAt?: string;
}

export default Teacher;

export const getTrainings = async () => {
  // const response = await fetch('/api/v1/test', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // });
  // const data = await response.json();
  // return {
  //   status: response.status,
  //   body: data
  // };

  return {
    status: 200,
    body: mockTrainings,
  };
};

const mockTrainings = {
  startRange: '2024-01-14',
  endRange: '2024-01-21',
  content: [
    {
      date: '2024-01-14',
      dayOfWeek: 'Monday',
      trainings: [
        {
          id: 1,
          start: '10:00',
          end: '11:30',
          title: 'Training Title',
          description: 'Training description',
          instructor: {
            id: 1,
            fullName: 'Instructor Full Name'
          },
          areas: ['Area1', 'Area2'],
          intensity: 'Intermediate',
          level: 'Beginner',
          type: 'In-person',
          kind: 'Group',
          location: 'Room 2',
          totalPlaces: 10,
          freePlaces: 8,
          createdAt: '2023-05-27',
          createdBy: {
            id: 2,
            fullName: 'Admin Full Name',
            role: 'ROLE_ADMIN'
          }
        }
      ]
    }
  ]
};

export const getAreas = async () => {
  // const response = await fetch('/api/v1/test', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // });
  // const data = await response.json();
  // return {
  //   status: response.status,
  //   body: data
  // };

  return {
    status: 200,
    body: mockAreas,
  };
};

const mockAreas = [
  { value: 1, label: 'Area 1'},
  { value: 2, label: 'Area 2'},
  { value: 3, label: 'Area 3'}
];

export const getInstructors = async () => {
  // const response = await fetch('/api/v1/test', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // });
  // const data = await response.json();
  // return {
  //   status: response.status,
  //   body: data
  // };

  return {
    status: 200,
    body: mockInstructors,
  };
};

const mockInstructors = [
  { value: 1, label: 'Instructor 1'},
  { value: 2, label: 'Instructor 2'},
  { value: 3, label: 'Instructor 3'}
];
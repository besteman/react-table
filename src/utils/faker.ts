import { faker } from '@faker-js/faker';

type FakeData = {
  id: number;
  name: string;
  email: string;
  job: string;
  address: string;
  city: string;
  state: string;
};

export default function generateFakeData(seed: number, size: number) {
  faker.seed(seed);

  const fakeData: FakeData[] = [];

  for (let i = 0; i < size; i++) {
    fakeData.push({
      id: i + 1,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      job: faker.person.jobTitle(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
    });
  }
  return fakeData;
}

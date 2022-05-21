import { Injectable } from '@nestjs/common';
import axios from 'axios';

const BASE_URL = `https://www.hellofresh.com/gw/recipes/recipes/search?locale=en-US&country=US&`;
const DELETE_ME_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTUxOTE5MjgsImlhdCI6MTY1MjU2MjE4NSwiaXNzIjoic2VuZiIsImp0aSI6IjRkZWY5YTBlLTk3ODctNDBkYi05NzZhLWMxZDQ2OWU3ZjMzOCJ9.4j_4vQ0qmx0wOM_sRaZIEUrC0PzAufRoTtNdzxvQsVg`;

@Injectable()
export class HellofreshService {
  async findAll(query: string, page: number) {
    if (!query) {
      return 'No query was supplied';
    }
    const skip = page !== 1 ? page * 10 : 0;
    const response = await axios.get(
      `${BASE_URL}take=10&q=${query}&skip=${skip}`,
      {
        headers: { authorization: `Bearer ${DELETE_ME_TOKEN}` },
      },
    );

    return response.data;
  }
}

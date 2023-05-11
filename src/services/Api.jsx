import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34896738-a1699c1dbaaca5ea67d26887d';

export const fetchImgList = async (searchQuery, page) => {
  const response = await axios(
    `${BASE_URL}?q=${searchQuery}&key=${API_KEY}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
  );
  if (response.status === 404) {
    throw new Error('Error loading images from Pixabay', response.status);
  }
  return response.data;
};

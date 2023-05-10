import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

export const searchImgs = async (value, apiKey, page) => {
  const res = await axios.get(
    `/?q=${value}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return res.data;
};

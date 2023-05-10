import { Field, Formik } from 'formik';
import { AiOutlineSearch } from 'react-icons/ai';
import PropTypes from 'prop-types';
import {
  Header,
  Form,
  SerchButton,
  SearchFormButtonLabel,
} from './Searchbar.styled';
export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    await onSubmit(values);
    setSubmitting(false);
    resetForm();
  };

  return (
    <Header>
      <Formik initialValues={{ search: '' }} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form autoComplete="off">
            <SerchButton type="submit" disabled={isSubmitting}>
              <SearchFormButtonLabel>
                <AiOutlineSearch />
              </SearchFormButtonLabel>
            </SerchButton>
            <Field
              className="SearchForm-input"
              name="search"
              type="text"
              placeholder="Search images and photos"
            />
          </Form>
        )}
      </Formik>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

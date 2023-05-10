import { Component } from 'react';
import { GlobalStyle } from 'GlobalStyle';
import { Container, StartText } from './App.styled';
import * as API from 'searchApi/SearchApi';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';

const API_KEY = '34896738-a1699c1dbaaca5ea67d26887d';
export class App extends Component {
  state = {
    galleryItem: [],
    searchValue: '',
    page: 1,
    totalImgs: 0,
    status: 'idle',
  };
  async componentDidUpdate(prevProps, prevState) {
    const { searchValue, page } = this.state;
    if (prevState.searchValue !== searchValue || prevState.page !== page) {
      this.setState({ status: 'pending' });
      try {
        const res = await API.searchImgs(searchValue, API_KEY, page);
        if (res.totalHits === 0) {
          return this.setState({
            status: 'rejected',
          });
        }
        this.setState(e => ({
          galleryItem: [...e.galleryItem, ...res.hits],
          totalImgs: res.totalHits,
          status: 'resolved',
        }));
      } catch (error) {
        this.setState({
          status: 'rejected',
        });
      }
    }
  }
  onSubmit = values => {
    if (values.search === this.state.searchValue) {
      return;
    }
    this.setState({ searchValue: values.search, galleryItem: [], page: 1 });
  };
  onLoadMore = () => {
    this.setState(e => ({ page: e.page + 1 }));
  };
  render() {
    const { galleryItem, searchValue, totalImgs, status } = this.state;
    return (
      <Container>
        <GlobalStyle></GlobalStyle>
        <Searchbar onSubmit={this.onSubmit} />
        {status === 'idle' && <StartText>Please enter your request</StartText>}
        {status === 'rejected' && (
          <StartText>
            Sorry, no result at your request "{searchValue}"
          </StartText>
        )}
        <ImageGallery
          items={galleryItem}
          status={status}
          searchValue={searchValue}
        />
        {status === 'pending' && <Loader></Loader>}
        {galleryItem.length !== 0 &&
          totalImgs > 12 &&
          galleryItem.length % 2 === 0 && (
            <Button onClick={this.onLoadMore}></Button>
          )}
      </Container>
    );
  }
}

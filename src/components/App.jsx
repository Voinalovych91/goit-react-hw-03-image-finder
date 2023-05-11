import React from "react";
// import css from "../styles.module.css";

import Searchbar from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import Modal from "./Modal/Modal";
import * as API from "../services/pixabay_api";

import {AppWrapper} from "./App.styled"

export class App extends React.Component {

  state = {
    query : "",
    items: [],
    page: 1,
    isLoading: false,
    currentLargeImageURL: '',
    error: null,
  }


  onOpenLargeImg = (url) => {
    this.setState({
      currentLargeImageURL: url,
    })
  }

  toggleModal = () => {
    this.setState(() => ({
      currentLargeImageURL: "",
    }))
  }

  onSubmit = (query) =>{
    // console.log(query)
    if (query.trim().length === 0) {
      alert("Please, enter your request")
      return
    }

    this.setState({
      query,
      page: 1,
      items: [],
    })
  }

  onLoadMoreBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }))
  }


  addPictures  = async (query, page) => {
    try {
      this.setState({
        isLoading: true,
      });
      const images = await API.loadImage(query, page);
      this.setState(prevState => ({
        items: [...prevState.items, ...images],
        isLoading: false,
      }));
      if(images.length === 0) {
        alert("Wrong request. Please, enter another one");
      }
    } catch (error) {
      this.setState({
        error: error.message,
      })
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  componentDidUpdate (_, prevState) {
    if(prevState.page !== this.state.page || prevState.query !== this.state.query) {
      this.addPictures(this.state.query, this.state.page);
    }
  }

  render(){
    const {items, currentLargeImageURL, isLoading, error} = this.state;
    return(
      
      <AppWrapper>
        <Searchbar
          onSubmit={this.onSubmit}
          isLoading={isLoading}
        />
        
        {error && <p>{error}</p>}

        {items.length > 0 && <ImageGallery items={items} onClick={this.onOpenLargeImg}/>}

        {isLoading && <Loader/>}

        {items.length >= 12 && <Button onLoadMore={this.onLoadMoreBtn} isLoading={isLoading}/>}
        {currentLargeImageURL && <Modal onClose={this.toggleModal} url={currentLargeImageURL} />}

        {/* {this.state.isLoading && <Loader/>} */}

      </AppWrapper>
    )
  }
};



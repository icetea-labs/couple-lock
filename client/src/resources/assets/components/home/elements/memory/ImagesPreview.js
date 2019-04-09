import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class PreviewImages extends Component {
  constructor(props){
    super(props);
    this.state = {
      url: '',
      isOpen: false,
      slideIndex: null,
    }
  }

  getNewSlideIndex(step) {
    const slideIndex = this.state.slideIndex;
    const numberSlide = this.props.imgList.length;

    let newSlideIndex = slideIndex + step;

    if (newSlideIndex >= numberSlide) newSlideIndex = 0;
    else if (newSlideIndex < 0) newSlideIndex = numberSlide - 1;

    return newSlideIndex;
  }

  prevSlide = () => {
    this.setState({
      slideIndex: this.getNewSlideIndex(-1)
    });
  }

  nextSlide = () => {
    this.setState({
      slideIndex: this.getNewSlideIndex(1)
    });
  }

  setSlideIndex(index) {
    this.setState({
      slideIndex: index
    })
  }

  componentWillMount() {
    PubSub.subscribe('setImgUrl', (msg, url) =>{
      const newImgList = this.props.imgList.map(image => {
        return image.src
      })
      this.setState({
        url: url,
        slideIndex: newImgList.indexOf(url),
      });
    })
  }

  previewImage = () => {
    const className = (this.state.url.length > 0) ? 'popup_preview_image active' : 'popup_preview_image';
    if(this.state.url.length > 0){
      return(
        <div className={className}>
          <div className="popup_container">
            <div className="overlay" onClick={this.closePreviewImage}></div>
            <div className="slide_btn">
              <button className="btn_prev" onClick={this.prevSlide}>❮</button>
              <button className="btn_next" onClick={this.nextSlide}>❯</button>
            </div>
            <button className="btn_close" onClick={this.closePreviewImage}>×</button>
            <div className="slide_container">
              {
                this.props.imgList.length > 0 && this.props.imgList.map((image, index) => {
                  return (
                    <div key={index}>
                      <div className={`slide_content ${this.state.slideIndex === index ? "active" : ""}`}>
                        <div className="number_text">{`${index + 1} / ${this.props.imgList.length}`}</div>
                        <div className="caption_text">{image.title}</div>
                      </div>
                      <div className={`slide_item ${this.state.slideIndex === index ? "active" : ""}`} >
                        <img className="image" src={image.src} alt={image.title} />
                      </div>
                    </div>
                  )
                })
              }
            </div>
            {/* gallery */}
            <div className="gallery_img">
              {
                this.props.imgList.length > 0 && this.props.imgList.map((image, index) => {
                  return (
                    <div className="img_items">
                      <img
                      key={index}
                      src={image.src} 
                      alt={image.title}
                      className={`image ${this.state.slideIndex === index ? "active" : ""}`}
                      onClick={() => this.setSlideIndex(index)}
                      />
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      )
    }
  }

  closePreviewImage = () => {
    this.setState({ url: '' });
  }

  render() {
    return (
      <div className="full-page">
        { this.previewImage() }
      </div>
    );
  }
}

export default PreviewImages;
import React, { Component } from 'react';
import{ PhotoSwipe, PhotoSwipeUI_Default} from 'photoswipe';

class Slide extends Component {

  openPhotoSwipe = () => {
      var pswpElement = document.querySelectorAll('.pswp')[0];
  
      // build items array
      var items = [
          {
              src: 'https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg',
              w: 964,
              h: 1024
          },
          {
              src: 'https://farm7.staticflickr.com/6175/6176698785_7dee72237e_b.jpg',
              w: 1024,
              h: 683
          }
      ];
      
      // define options (if needed)
      var options = {
        // history & focus options are disabled on CodePen        
          history: false,
          focus: false,
  
          showAnimationDuration: 0,
          hideAnimationDuration: 0
          
      };
      
      var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
      gallery.init();
  }
  

  render() {
    return (
      <div>
        <button id="btn" onClick={this.openPhotoSwipe}>Open PhotoSwipe</button>

        <div className="pswp" tabindex="-1" role="dialog" aria-hidden="true">

            <div className="pswp__bg"></div>

            <div className="pswp__scroll-wrap">

                <div className="pswp__container">
                    <div className="pswp__item"></div>
                    <div className="pswp__item"></div>
                    <div className="pswp__item"></div>
                </div>

                <div className="pswp__ui pswp__ui--hidden">

                    <div className="pswp__top-bar">


                        <div className="pswp__counter"></div>

                        <button className="pswp__button pswp__button--close" title="Close (Esc)"></button>

                        <button className="pswp__button pswp__button--share" title="Share"></button>

                        <button className="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

                        <button className="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

                        
                        <div className="pswp__preloader">
                            <div className="pswp__preloader__icn">
                              <div className="pswp__preloader__cut">
                                <div className="pswp__preloader__donut"></div>
                              </div>
                            </div>
                        </div>
                    </div>

                    <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                        <div className="pswp__share-tooltip"></div> 
                    </div>

                    <button className="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
                    </button>

                    <button className="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
                    </button>

                    <div className="pswp__caption">
                        <div className="pswp__caption__center"></div>
                    </div>

                  </div>

                </div>

        </div>
      </div>
    );
  }
}

export default Slide;
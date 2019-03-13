import React, { Component } from 'react';
import axios from 'axios';
import PubSub from 'pubsub-js';

class PopularTag extends Component {

  constructor(props){
    super(props)
    this.state = {
      tagsAll: [],
      proposeId: null,
    }
  }

  componentDidMount() {
    axios.get('/api/tag/all')
    .then(res =>{
      this.setState({ tagsAll: res.data.data });
    })

    // get proposeId

    PubSub.subscribe('proposeIdTags', (msg, id) => {
      this.setState({ proposeId: id});
    })

  }

  componentWillMount(){
    PubSub.subscribe('proposeIdChangeTags', (msg, id) => {
      this.setState({ proposeId: id});
    })
  }

  showTags = () => {
    const {tagsAll} = this.state;
    if(tagsAll && tagsAll.length > 0){
      const show = tagsAll.map((item, index) => {
        return(
          <label key={index}>#<input className="tags_item" type="button" value={item} onClick={() => this.searchTags(item)} /></label>
        )
      })
      return show;
    }
  }

  searchTags = (tags) => {
    const {proposeId} = this.state;
    // console.log(proposeId);
    axios.get(`/api/memory/list?proposeId=${proposeId}&tags.includes=${tags}`)
    .then(res => {
      // console.log(res.data.data);
      PubSub.publish('filterTasg', res.data.data)
    })
    
  }
  
  resetFilterTags = () => {
    PubSub.publish('resetFilterTags');
  }

  render() {
    const {tagsAll} = this.state;
    return (
      <div className="popular_tags">
        {(tagsAll && tagsAll.length > 0) && <h3 className="title title_promises">Popular Tag</h3>}
        <div className="popular_tags__list">
          <label><input className="tags_item" type="button" value="↲ All" onClick={this.resetFilterTags} /></label>
          { this.showTags() }
        </div>
      </div>
    );
  }
}

export default PopularTag;
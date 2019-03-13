import React, { Component } from 'react';
import Suggestion from './SuggestionTags';
import { WithContext as ReactTags } from 'react-tag-input';
import axios from 'axios';

// const content = Suggestion.map((result) => {
//   return{
//     id: result,
//     text: result,
//   }
// })

const KeyCodes = {
  comma: 188,
  enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];


class TagsInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
        tags: [],
    };
  }

  componentDidMount() {
    axios.get('/api/tag/all')
    .then(result =>{
      const content = result.data.data.map((tags) => {
        return{
          id: tags,
          text: tags,
        }
      })
      this.setState({ suggestions: content});
    })
  }
  
  componentDidUpdate(prevProps, prevState){
    if(this.state.tags !== prevState.tags){
      this.props.getTags(this.state.tags);
    }
  }

  handleDelete = (i) => {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
  }

  handleAddition = (tag) => {
      this.setState(state => ({ tags: [...state.tags, tag] }));
  }

  render() {
    const { tags, suggestions } = this.state;
      return (
        <div className="tags_input">
            <p>Tags: </p>
            <ReactTags tags={tags}
                suggestions={suggestions}
                handleDelete={this.handleDelete}
                handleAddition={this.handleAddition}
                delimiters={delimiters} />
        </div>
    )
  }
}

export default TagsInput;
import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
 
class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      isShowPlace: true,
    };
  }
 
  changeAddress = address => {
    this.setState({ address });
  };
 
  selectAddress = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) =>
        console.log('Successfully got latitude and longitude', { lat, lng })
      )
    .catch(error => console.error('Error', error));
    this.setState({ 
      address: address,
      isShowPlace: false,
    });
    this.props.getLocation(address);
  };
  
 
  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.changeAddress}
        onSelect={this.selectAddress}
        googleCallbackName="myCallbackFunc"
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          this.state.isShowPlace && <div>
          <input
            {...getInputProps({
              placeholder: 'Search Places ...',
              className: 'location-search-input',
            })}
          />
          <div className="autocomplete-dropdown-container">
            {suggestions.map(suggestion => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;
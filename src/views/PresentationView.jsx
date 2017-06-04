import React from 'react';
import PropTypes from 'prop-types';

import IconButton from 'material-ui/IconButton';
import NavigationBack from 'material-ui/svg-icons/navigation/arrow-back';

import Carousel from 'nuka-carousel';
import EventView from './EventView';
import WeatherView from './WeatherView';

const EVENT_LIST_SLIDE_TYPE = 'eventList';
const EVENT_SLIDE_TYPE = 'event';
const IMAGE_SLIDE_TYPE = 'image';
const WEATHER_SLIDE_TYPE = 'weather';

export default class PresentationView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentSlideIndex: 0,
      currentSlide: props.presentation.slides[0],
    };
  }

  componentDidMount() {
    const currentSlide = this.props.presentation.slides[0];

    this.props.setAppTitle(currentSlide.title);
    this.props.hideAppBar(currentSlide.type === IMAGE_SLIDE_TYPE && !this.props.interactiveMode);
  }

  componentWillUnmount() {
    clearInterval(this.state.progressRefreshInterval);
  }

  onSlideChange(index) {
    const currentSlide = this.props.presentation.slides[index];
    this.setState({
      currentSlide,
      currentSlideIndex: index,
    });

    // set title
    this.props.setAppTitle(currentSlide.title);
    this.props.hideAppBar(currentSlide.type === IMAGE_SLIDE_TYPE && !this.props.interactiveMode);

    scroll(0, 0);
  }

  // it's a bit ugly to have the presentation handle event details...
  setSelectedEvent(event) {
    this.props.setAppTitle(event.shortTitle ? event.shortTitle : event.title);
    this.props.setAppBarIconElementLeft(
      <IconButton onClick={() => this.clearSelectedEvent()}><NavigationBack /></IconButton>,
    );

    this.setState({
      selectedEvent: event,
      eventDetailTimer: setTimeout(
        this.clearSelectedEvent.bind(this), this.props.presentation.pauseTimeOnTouch,
      ),
    });

    scroll(0, 0);
  }

  clearSelectedEvent() {
    this.props.setAppTitle(this.state.currentSlide.title);
    this.props.setAppBarIconElementLeft();

    if (this.state.eventDetailTimer) {
      clearTimeout(this.state.eventDetailTimer);
    }

    this.setState({ selectedEvent: null });
  }

  buildSlides(slides) {
    return slides.map((item, index) => {
      if (item.type === EVENT_LIST_SLIDE_TYPE) {
        return (
          <div key={item.id || index}>
            <EventView
              {...this.props}
              {...item}
              headerImage={this.props.presentation.headerImage}
              selectedEvent={this.state.selectedEvent}
              title={this.state.currentSlide ? this.state.currentSlide.title : ''}
              setSelectedEvent={value => this.setSelectedEvent(value)}
              clearSelectedEvent={() => this.clearSelectedEvent()}
            />
          </div>
        );
      } else if (item.type === IMAGE_SLIDE_TYPE) {
        return (
          <div
            key={item.id || index}
            style={{ backgroundImage: `url('${item.img}')`, backgroundSize: 'cover', height: '100vh' }}
          />
        );
      } else if (item.type === EVENT_SLIDE_TYPE) {
        return (
          <div key={item.id || index}>
            <EventView
              {...this.props}
              event={item.event}
              isStatic
            />
          </div>
        );
      } else if (item.type === WEATHER_SLIDE_TYPE) {
        return (
          <div key={item.id || index} className="weatherSlide">
            <WeatherView
              {...this.props}
              lat={item.lat}
              lon={item.lon}
              location={item.location}
            />
          </div>
        );
      }
      // Default case to avoid breaking
      return (<div className="slide unhandled" />);
    });
  }

  buildCarouselComponent() {
    const carouselSettings = {
      wrapAround: true,
      decorators: [],
      swiping: this.props.presentation.slides.length > 1,
      autoplay: (
        this.props.presentation.transitionTime && this.props.presentation.slides.length > 1
      ),
      autoplayInterval: (this.props.presentation.transitionTime ?
        this.props.presentation.transitionTime : 8000),
      afterSlide: currentSlide => this.onSlideChange(currentSlide),
    };

    const slides = this.buildSlides(this.props.presentation.slides);
    let wrapperStyle = {};

    if (this.props.presentation.disableTouch) wrapperStyle = { pointerEvents: 'none' };

    return (
      <div
        className="carouselWrapper"
        style={wrapperStyle}
        onTouchStart={() => this.props.hideAppBar(false)}
        onTouchEnd={event => this.props.onInteraction(event)}
      >
        <Carousel {...carouselSettings}>
          {slides}
        </Carousel>
        {this.props.presentation.footer && this.props.presentation.footer.text ?
          <div className="footerWrapper">
            <div className="footerContentWrapper">
              <h2>{this.props.presentation.footer.text}</h2>
            </div>
          </div> : ''
        }
        {this.props.presentation.displayIndicators && this.props.presentation.slides.length > 1 ?
          <div className="navDots">
            {this.props.presentation.slides.map(
              (item, index) => (
                <div
                  key={item.id || index}
                  className={`navDot ${(this.state.currentSlideIndex === index ? 'active' : 'inactive')}`}
                />
              ))
            }
          </div> : ''}
      </div>
    );
  }

  render() {
    // If slides have not yet been added to state, render nothing
    let carouselComponent = <div />;

    if (this.props.presentation.slides && this.props.presentation.slides.length > 0) {
      carouselComponent = this.buildCarouselComponent();
    }

    /*
     * render single EventView if in detail mode (selectedEvent is set),
     * else render slideshow.
     */
    return (
      <div className="kiosk-presentation">
        {this.state.selectedEvent ?
          <div>
            {this.props.presentation.slides.filter(
              item => item.type === EVENT_LIST_SLIDE_TYPE,
            ).map((item, index) =>
              (
                <div key={item.id || index}>
                  <EventView
                    {...this.props}
                    {...item}
                    selectedEvent={this.state.selectedEvent}
                    title={this.state.currentSlide ? this.state.currentSlide.title : ''}
                    setSelectedEvent={value => this.setSelectedEvent(value)}
                    clearSelectedEvent={() => this.clearSelectedEvent()}
                  />
                </div>
            ),
            )}
          </div> :
          carouselComponent}
      </div>
    );
  }
}

PresentationView.propTypes = {
  // Kiosk functions
  setAppTitle: PropTypes.func.isRequired,
  setAppBarIconElementLeft: PropTypes.func.isRequired,
  hideAppBar: PropTypes.func.isRequired,
  onInteraction: PropTypes.func.isRequired,
  // Kiosk attributes
  interactiveMode: PropTypes.bool,
  // Presentation data prop types
  presentation: PropTypes.shape({
    transitionTime: PropTypes.number,
    disableTouch: PropTypes.bool,
    pauseTimeOnTouch: PropTypes.number,
    displayIndicators: PropTypes.bool,
    slides: PropTypes.arrayOf(PropTypes.shape({})),
    headerImage: PropTypes.string,
    footer: PropTypes.object,
  }).isRequired,
};

PresentationView.defaultProps = {
  interactiveMode: false,
};

import React from 'react';
import PropTypes from 'prop-types';
import {FlatList} from 'react-native';

import SpaceItem from './SpaceItem';

const propTypes = {
  activeSpaceId: PropTypes.string,
  hasCalling: PropTypes.bool,
  onCallClick: PropTypes.func,
  onClick: PropTypes.func,
  spaces: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        avatarUrl: PropTypes.string,
        activityText: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.element
        ]),
        callStartTime: PropTypes.number,
        id: PropTypes.string,
        isDecrypting: PropTypes.bool,
        isUnread: PropTypes.bool,
        lastActivityTime: PropTypes.string,
        name: PropTypes.string,
        teamColor: PropTypes.string,
        teamName: PropTypes.string,
        type: PropTypes.string
      })
    ),
    // Can accept an object that can iterated with `forEach`
    PropTypes.object
  ])
};

const defaultProps = {
  activeSpaceId: '',
  hasCalling: false,
  onCallClick: () => {},
  onClick: () => {},
  spaces: []
};

export default function SpacesList({
  activeSpaceId,
  hasCalling,
  onCallClick,
  onClick,
  spaces
}) {
  function renderItem({item}) {
    return (
      <SpaceItem
        active={item.id === activeSpaceId}
        hasCalling={hasCalling}
        key={item.id}
        onCallClick={onCallClick}
        onClick={onClick}
        {...item}
      />
    );
  }

  return (
    <FlatList className="ciscospark-spaces-list"
      data={spaces}
      extraData={activeSpaceId}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
}

SpacesList.propTypes = propTypes;
SpacesList.defaultProps = defaultProps;

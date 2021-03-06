import React from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableOpacity, View} from 'react-native';

import Avatar from './Avatar';
import JoinCallButton from './JoinCallButton';

const rnStyles = {
  basicText: {
    // fontFamily: 'CiscoSans, Helvetica Neue, Arial'
    // fontFamily: 'Helvetica Neue, Arial'
  },
  activeText: {
    color: '#f5f5f5'
  },
  // avatarBorder: {
  //   height: 38,
  //   width: 38
  // },
  avatarGroup: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderRadius: 19,
    borderStyle: 'solid',
    borderWidth: 3,
    height: 38,
    width: 38
  },
  avatarWrapper: {
    flex: 0,
    alignItems: 'center',
    height: 38,
    width: 38,
    justifyContent: 'center'
  },
  callData: {
    flex: 0,
    height: '100%',
    width: 60
  },
  item: {
    height: 70,
    flexDirection: 'row',
    display: 'flex',
    paddingLeft: 24,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 8
  },
  itemActive: {
    backgroundColor: '#07c1e4'
  },
  lastActivity: {
    height: 16,
    overflow: 'hidden',
    fontSize: 12,
    color: '#999'
  },
  meta: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 0,
    paddingLeft: 8,
    paddingRight: 50,
    overflow: 'hidden'
  },
  teamName: {
    fontSize: 10
  },
  timestamp: {
    fontSize: 10,
    color: '#999'
  },
  title: {
    overflow: 'hidden',
    fontSize: 14,
    color: '#4f5051'
  },
  titleUnread: {
    fontWeight: '300'
  },
  unreadIndicator: {
    position: 'absolute',
    top: '46%', /* A bit of a hack but visually looks good */
    left: 8,
    width: 6,
    height: 6,
    backgroundColor: '#07c1e4',
    borderRadius: 3
  }
};

const propTypes = {
  active: PropTypes.bool,
  avatarUrl: PropTypes.string,
  activityText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  callStartTime: PropTypes.number,
  hasCalling: PropTypes.bool,
  id: PropTypes.string,
  // isDecrypting: PropTypes.bool,
  isUnread: PropTypes.bool,
  lastActivityTime: PropTypes.string,
  name: PropTypes.string,
  onCallClick: PropTypes.func,
  onClick: PropTypes.func,
  teamColor: PropTypes.string,
  teamName: PropTypes.string,
  type: PropTypes.string
};

const defaultProps = {
  active: false,
  activityText: '',
  avatarUrl: '',
  callStartTime: undefined,
  hasCalling: false,
  id: '',
  // isDecrypting: false,
  isUnread: false,
  lastActivityTime: '',
  name: '',
  onCallClick: () => {},
  onClick: () => {},
  teamColor: '',
  teamName: '',
  type: ''
};

function SpaceItem({
  active,
  activityText,
  avatarUrl,
  callStartTime,
  hasCalling,
  id,
  isUnread,
  lastActivityTime,
  name,
  onClick,
  onCallClick,
  teamName,
  teamColor,
  type
  // isDecrypting
}) {
  function handleClick() {
    return onClick(id);
  }

  // function handleKeyDown(e) {
  //   // If there is a keypress is Enter key
  //   if (e.keyCode && e.keyCode === 13) {
  //     return onClick(id);
  //   }
  //   return false;
  // }


  function handleCallClick(e) {
    if (type === 'direct' || hasCalling) {
      e.stopPropagation();
      return onCallClick(id);
    }
    return false;
  }

  // Show hover call and join in progress buttons
  const hasCallSupport = hasCalling && typeof onCallClick === 'function';

  // Size the avatar based on if there is a group border or not
  const avatarSize = type === 'group' ? 28 : 38;

  return (
    <TouchableOpacity
      className="space-item"
      style={[rnStyles.item, active && rnStyles.itemActive]}
      onPressIn={handleClick}
    >
      {
        isUnread &&
        <View className="space-unread-indicator" style={rnStyles.unreadIndicator} />
      }
      <View className="space-avatar-wrapper" style={rnStyles.avatarWrapper}>
        <View className="space-avatar-border" style={type === 'group' && rnStyles.avatarGroup}>
          <Avatar baseColor={teamColor} image={avatarUrl} name={name} size={avatarSize} />
        </View>
      </View>
      <View className="space-item-meta" style={rnStyles.meta}>
        { teamName ? (
          <View>
            <Text
              className="space-team-name"
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[rnStyles.basicText, rnStyles.teamName,
                {
                  color: active ? '#f5f5f5' : teamColor
                }
              ]}
            >
              {teamName.toUpperCase()}
            </Text>
          </View>
        ) : null }
        <Text className="space-title" numberOfLines={1} ellipsizeMode="tail" style={[rnStyles.basicText, rnStyles.title, isUnread && rnStyles.titleUnread, active && rnStyles.activeText]}>
          {name}
        </Text>
        <Text className="space-last-activity" numberOfLines={1} ellipsizeMode="tail" style={[rnStyles.basicText, rnStyles.lastActivity, active && rnStyles.activeText]}>
          {activityText}
        </Text>
      </View>
      <View className="space-item-call-data" style={rnStyles.callData}>
        {
          (!hasCallSupport || !callStartTime) &&
          <Text className="space-last-activity-time" style={[rnStyles.basicText, rnStyles.timestamp, active && rnStyles.activeText]}>
            {lastActivityTime}
          </Text>
        }
        {
          // Join call in progress
          hasCallSupport && callStartTime &&
          <View className="space-join-call">
            <JoinCallButton callStartTime={callStartTime} onJoinClick={handleCallClick} />
          </View>
        }
      </View>
    </TouchableOpacity>
  );
}

SpaceItem.propTypes = propTypes;
SpaceItem.defaultProps = defaultProps;

export default SpaceItem;

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import moment, {Moment} from 'moment';
import React, {useCallback} from 'react';
import {useIntl} from 'react-intl';
import {View, TouchableOpacity} from 'react-native';

import CompassIcon from '@components/compass_icon';
import CustomStatusExpiry from '@components/custom_status/custom_status_expiry';
import CustomStatusText from '@components/custom_status/custom_status_text';
import {CustomStatusDuration, CST} from '@constants/custom_status';
import {useTheme} from '@context/theme';
import {preventDoubleTap} from '@utils/tap';
import {changeOpacity, makeStyleSheetFromTheme} from '@utils/theme';

import DateTimePicker from './date_time_selector';

import type UserModel from '@typings/database/models/servers/user';

type Props = {
    currentUser: UserModel;
    duration: CustomStatusDuration;
    expiryTime?: string;
    handleItemClick: (duration: CustomStatusDuration, expiresAt: string) => void;

    isSelected: boolean;
    separator: boolean;
    showDateTimePicker?: boolean;
    showExpiryTime?: boolean;

};

const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) => {
    return {
        container: {
            backgroundColor: theme.centerChannelBg,
            display: 'flex',
            flexDirection: 'row',
            padding: 10,
        },
        textContainer: {
            marginLeft: 5,
            marginBottom: 2,
            alignItems: 'center',
            width: '70%',
            flex: 1,
            flexDirection: 'row',
            position: 'relative',
        },
        rightPosition: {
            position: 'absolute',
            right: 14,
        },
        divider: {
            backgroundColor: changeOpacity(theme.centerChannelColor, 0.2),
            height: 1,
            marginHorizontal: 16,
        },
        button: {
            borderRadius: 1000,
            color: theme.buttonBg,
        },
        customStatusExpiry: {
            color: theme.linkColor,
        },
    };
});

const ClearAfterMenuItem = ({currentUser, duration, expiryTime = '', handleItemClick, isSelected, separator, showDateTimePicker = false, showExpiryTime = false}: Props) => {
    const theme = useTheme();
    const intl = useIntl();
    const style = getStyleSheet(theme);

    const expiryMenuItems: { [key in CustomStatusDuration]: string } = {
        [CustomStatusDuration.DONT_CLEAR]: intl.formatMessage(CST[CustomStatusDuration.DONT_CLEAR]),
        [CustomStatusDuration.THIRTY_MINUTES]: intl.formatMessage(CST[CustomStatusDuration.THIRTY_MINUTES]),
        [CustomStatusDuration.ONE_HOUR]: intl.formatMessage(CST[CustomStatusDuration.ONE_HOUR]),
        [CustomStatusDuration.FOUR_HOURS]: intl.formatMessage(CST[CustomStatusDuration.FOUR_HOURS]),
        [CustomStatusDuration.TODAY]: intl.formatMessage(CST[CustomStatusDuration.TODAY]),
        [CustomStatusDuration.THIS_WEEK]: intl.formatMessage(CST[CustomStatusDuration.THIS_WEEK]),
        [CustomStatusDuration.DATE_AND_TIME]: intl.formatMessage({id: 'custom_status.expiry_dropdown.custom', defaultMessage: 'Custom'}),
    };

    const handleClick = preventDoubleTap(() => {
        handleItemClick(duration, expiryTime);
    });

    const handleCustomExpiresAtChange = useCallback((expiresAt: Moment) => {
        handleItemClick(duration, expiresAt.toISOString());
    }, [handleItemClick, duration]);

    return (
        <View>
            <TouchableOpacity
                testID={`clear_after.menu_item.${duration}`}
                onPress={handleClick}
            >
                <View style={style.container}>
                    <View style={style.textContainer}>
                        <CustomStatusText
                            text={expiryMenuItems[duration]}
                            theme={theme}
                            textStyle={{color: theme.centerChannelColor}}
                        />
                        {isSelected && (
                            <View style={style.rightPosition}>
                                <CompassIcon
                                    name={'check'}
                                    size={24}
                                    style={style.button}
                                />
                            </View>
                        )}
                        {showExpiryTime && expiryTime !== '' && (
                            <View style={style.rightPosition}>
                                <CustomStatusExpiry
                                    currentUser={currentUser}
                                    theme={theme}
                                    time={moment(expiryTime).toDate()}
                                    textStyles={style.customStatusExpiry}
                                    showTimeCompulsory={true}
                                    showToday={true}
                                />
                            </View>
                        )}
                    </View>
                </View>
                {separator && <View style={style.divider}/>}
            </TouchableOpacity>
            {showDateTimePicker && (
                <DateTimePicker
                    currentUser={currentUser}
                    theme={theme}
                    handleChange={handleCustomExpiresAtChange}
                />
            )}
        </View>
    );
};

export default ClearAfterMenuItem;